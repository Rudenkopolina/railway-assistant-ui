import React from 'react';
import { connect } from 'react-redux';
import './LogsConversations.css';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  getConversations,
  clearConversations,
  getConversationsMessages,
  getConversationsPages
} from '../../redux/actions/conversationLogs';
import ConversationsTable from '../../components/ConversationsTable';
import ConversationModal from '../../components/ConversationsTable/ConversationModal';
import { getAvailableIntents } from '../../redux/actions/availableIntents';
import { correctIntents } from '../../redux/actions/conversationLogs';
import IntentsEditorModal from '../../components/ConversationsTable/IntentsEditorModal';

class LogsConversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      visibleModal: false,
      visibleIntentsEditorModal: false,
      activationTimestamp: moment()
        .utc()
        .format('YYYY-MM-DD HH:mm:ss'),
      selectedConversation: {},
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
    if (filter !== prevState.filter) {
      this.props.getConversations(
        currentPage,
        filter.fromDate,
        filter.toDate,
        filter.source,
        filter.type,
        filter.text
      );
      this.props.getConversationsPages(
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

    if (user.permissions.ALLOWED_LOGS_VIEWING) {
      this.props.clearConversations();
      this.props.getConversations(
        currentPage,
        filter.fromDate,
        filter.toDate,
        filter.source,
        filter.type,
        filter.text
      );
      this.props.getConversationsPages(
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
    this.props.getConversations(
      currentPage + 1,
      filter.fromDate,
      filter.toDate,
      filter.source,
      filter.type,
      filter.text
    );
    this.setState((state, props) => ({ currentPage: state.currentPage + 1 }));
  };

  onConversationClick = item => {
    this.props.getConversationsMessages(item.session);
    this.setState({ visibleModal: true, selectedConversation: item });
  };

  onModalClose = () => {
    this.setState({ visibleModal: false, selectedConversation: {} });
  };

  onIntentsModalClose = () => {
    this.setState({ visibleIntentsEditorModal: false, selectedMessage: {} });
  };

  onSearchClick = filter => {
    this.props.clearConversations();
    if (!filter.toDate) {
      filter.toDate = this.state.activationTimestamp;
    }
    this.setState({ filter: filter, currentPage: 1 });
  };

  onEditClick = message => {
    this.setState({
      visibleIntentsEditorModal: true,
      selectedMessage: message
    });
  };

  onChangeIntent = (message, intent) => {
    this.setState({ visibleIntentsEditorModal: false, selectedMessage: {} });
    this.props.correctIntents(message, intent);
  };

  render() {
    return (
      <div className='conversations-table-container container'>
        <IntentsEditorModal
          visible={this.state.visibleIntentsEditorModal}
          onModalClose={this.onIntentsModalClose}
          availableIntents={this.props.availableIntents.intents}
          message={this.state.selectedMessage}
          onChangeIntent={this.onChangeIntent}
        />
        <ConversationModal
          conversation={this.state.selectedConversation}
          messages={this.props.conversationLogs.selectedConversationMessages}
          visible={this.state.visibleModal}
          onModalClose={this.onModalClose}
          onEditClick={this.onEditClick}
        />
        <ConversationsTable
          conversations={this.props.conversationLogs.conversations}
          currentPage={this.state.currentPage}
          pages={this.props.conversationLogs.pages}
          onConversationClick={this.onConversationClick}
          onMoreClick={this.onMoreClick}
          getFilteredConversations={this.onSearchClick}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, conversationLogs, availableIntents }) => ({
  auth,
  conversationLogs,
  availableIntents
});

const mapDispatchToProps = dispatch => ({
  getConversations: (page, fromDate, toDate, source, type, text) =>
    dispatch(getConversations(page, fromDate, toDate, source, type, text)),
  getConversationsPages: (fromDate, toDate, source, type, text) =>
    dispatch(getConversationsPages(fromDate, toDate, source, type, text)),
  getConversationsMessages: session =>
    dispatch(getConversationsMessages(session)),
  clearConversations: () => dispatch(clearConversations()),
  getAvailableIntents: () => dispatch(getAvailableIntents()),
  correctIntents: (message, intent) => dispatch(correctIntents(message, intent))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LogsConversations)
);
