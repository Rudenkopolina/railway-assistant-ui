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
        fromDate: undefined,
        toDate: moment()
          .utc()
          .format('YYYY-MM-DD HH:mm:ss'),
        source: undefined,
        type: undefined,
        text: ''
      }
    };
  }

	componentDidUpdate(prevProps, prevState) {
		const { filter, currentPage } = this.state;
		if (filter !== prevState.filter) {
			this.props.getIntents(
				currentPage,
				filter.fromDate,
				filter.toDate,
				filter.source,
				filter.type,
        filter.text
			);
			this.props.getIntentsPages(
				filter.fromDate,
				filter.toDate,
				filter.source,
				filter.type,
        filter.text
			);
		}
	}

  componentWillMount() {
	const { user } = this.props.auth;
	const { filter, currentPage } = this.state;

    if (user.permissions.ALLOWED_HISTORY_VIEWING) {
      this.props.clearIntents();
      this.props.getIntents(
        currentPage,
        filter.fromDate,
        filter.toDate,
        filter.source,
        filter.type,
        filter.text
      );
      this.props.getIntentsPages(
        filter.fromDate,
        filter.toDate,
        filter.source,
        filter.type,
        filter.text
      );
      this.props.getAvailableIntents();
    }
  }

  onMoreClick = () => {
	const { filter, currentPage } = this.state;
    this.props.getIntents(
      currentPage + 1,
      filter.fromDate,
      filter.toDate,
      filter.source,
      filter.type,
      filter.text
    );
	this.setState((state, props)=> ({ currentPage: state.currentPage + 1 }));
  };

  onConversationClick = item => {
    this.setState({ visibleIntentsEditorModal: true, selectedMessage: item });
  };

  onSearchClick = filter => {
    this.props.clearIntents();
    if (!filter.toDate) {
      filter.toDate = this.state.activationTimestamp;
    }
    this.setState({ currentPage: 1, filter: filter });
  };

  onChangeIntent = (message, intent) => {
    this.setState({ visibleIntentsEditorModal: false, selectedMessage: {} });
    this.props.correctIntents(message, intent);
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
