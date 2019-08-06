import React from 'react';
import { connect } from 'react-redux';
import './History.css';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import HistoryTable from '../../components/HistoryTable';
import 'react-notifications/lib/notifications.css';
import {
  clearIntents,
  getIntents,
  getIntentsPages
} from '../../redux/actions/intentLogs';
import { getAvailableIntents } from '../../redux/actions/availableIntents';
import { correctIntents } from '../../redux/actions/intentLogs';
import IntentsEditorModal from '../../components/ConversationsTable/IntentsEditorModal';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      visibleModal: false,
      activationTimestamp: moment()
        .utc()
        .format('YYYY-MM-DD HH:mm:ss'),
      selectedConversation: {},
      visibleIntentsEditorModal: false,
      selectedMessage: {},
      filter: {
        fromDate: null,
        toDate: moment()
          .utc()
          .format('YYYY-MM-DD HH:mm:ss'),
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
  const { clearIntents, getIntents, getIntentsPages, getAvailableIntents } = this.props;

    if (user.permissions.ALLOWED_HISTORY_VIEWING) {
      clearIntents();
      getIntents(currentPage, filter);
      getIntentsPages(filter);
      getAvailableIntents();
    }
  }

  onMoreClick = () => {
  const { filter, currentPage } = this.state;
  const { getIntents } = this.props;
  getIntents(currentPage + 1, filter);
	this.setState((state, props)=> ({ currentPage: state.currentPage + 1 }));
  };

  onConversationClick = item => {
    this.setState({ visibleIntentsEditorModal: true, selectedMessage: item });
  };

  onSearchClick = filter => {
    const { clearIntents } = this.props;
    clearIntents();
    if (!filter.toDate) {
      this.setState((state, props) => ({
        filter: {...filter, toDate: state.activationTimestamp}, currentPage: 1
      }));
      return; 
    }
    this.setState({ filter, currentPage: 1 });
  };


  onChangeIntent = (message, intent) => {
    const { correctIntents } = this.props;
    this.setState({ visibleIntentsEditorModal: false, selectedMessage: {} });
    correctIntents(message, intent);
  };

  onIntentsModalClose = () => {
    this.setState({ visibleIntentsEditorModal: false, selectedMessage: {} });
  };

  render() {
    return (
      <div className='history-table-container container'>
        <IntentsEditorModal
          visible={this.state.visibleIntentsEditorModal}
          onModalClose={this.onIntentsModalClose}
          availableIntents={this.props.availableIntents.intents}
          message={this.state.selectedMessage}
          onChangeIntent={this.onChangeIntent}
        />
        <HistoryTable
          messages={this.props.intentLogs.intents}
          currentPage={this.state.currentPage}
          pages={this.props.intentLogs.pages}
          onConversationClick={this.onConversationClick}
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
