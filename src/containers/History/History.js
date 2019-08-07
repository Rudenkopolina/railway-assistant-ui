import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import HistoryTable from '../../components/HistoryTable';
import { clearIntents, getIntents, getIntentsPages, correctIntents } from '../../redux/actions/intentLogs';
import { getAvailableIntents } from '../../redux/actions/availableIntents';
import 'react-notifications/lib/notifications.css';
import './History.css';

class History extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      activationTimestamp: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
      filter: {
        fromDate: null,
        toDate: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        source: null,
        type: null,
        text: ''
      }
    };
  }

	componentDidUpdate(prevProps, prevState) {
    const { filter, currentPage } = this.state;
    const { getIntents, getIntentsPages } = this.props;
		if (filter !== prevState.filter) {
			getIntents(currentPage,	filter);
			getIntentsPages(filter);
		}
	}

  componentDidMount() {
	const { user } = this.props.auth;
  const { filter, currentPage } = this.state;
  const { 
    clearIntents, 
    getIntents, getIntentsPages, 
    getAvailableIntents 
  } = this.props;

    if (user.permissions.ALLOWED_HISTORY_VIEWING) {
      clearIntents(); //??
      getIntents(currentPage, filter);
      getIntentsPages(filter);
      getAvailableIntents();
    }
  }

  onMoreClick = () => {
  const { filter, currentPage } = this.state;
  const { getIntents } = this.props;
  getIntents(currentPage + 1, filter);
	this.setState(state => ({ currentPage: state.currentPage + 1 }));
  };

  onSearchClick = filter => {
    const { clearIntents } = this.props;
    clearIntents();
    if (!filter.toDate) {
      this.setState(state => ({
        filter: {...filter, toDate: state.activationTimestamp}, currentPage: 1
      }));
      return; 
    }
    this.setState({ filter, currentPage: 1 });
  };

  render() {
    const { intentLogs, availableIntents } = this.props;
    return (  
      <div className='history-table-container container'>
        <HistoryTable
          messages={intentLogs.intents}
          availableIntents={availableIntents}
          currentPage={this.state.currentPage}
          pages={intentLogs.pages}
          onMoreClick={this.onMoreClick}
          getFilteredConversations={this.onSearchClick}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, intentLogs, availableIntents }) => ({
  auth,
  intentLogs,
  availableIntents
});

const mapDispatchToProps = dispatch => ({
  getIntents: (page, fromDate, toDate, source, type, text) =>
    dispatch(getIntents(page, fromDate, toDate, source, type, text)),
  getIntentsPages: (fromDate, toDate, source, type, text) =>
    dispatch(getIntentsPages(fromDate, toDate, source, type, text)),
  clearIntents: () => dispatch(clearIntents()),
  getAvailableIntents: () => dispatch(getAvailableIntents()),
  correctIntents: (message, intent) => dispatch(correctIntents(message, intent))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(History)
);
