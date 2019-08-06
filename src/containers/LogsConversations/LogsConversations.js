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
    const { getConversations, getConversationsPages } = this.props;
    if (filter !== prevState.filter) {
    getConversations(currentPage, filter);
    getConversationsPages(filter);
    }
  }

  componentDidMount() {
    const { user } = this.props.auth;
    const { filter, currentPage } = this.state;
    const { clearConversations, getConversations, getConversationsPages, getAvailableIntents } = this.props;

    if (user.permissions.ALLOWED_LOGS_VIEWING) {
      clearConversations();
      getConversations(currentPage, filter);
      getConversationsPages(filter);
      getAvailableIntents();
    }
  }

  onMoreClick = () => {
    const { filter, currentPage } = this.state;
    const { getConversations } = this.props;
    getConversations(currentPage + 1, filter)
    this.setState((state, props) => ({ currentPage: state.currentPage + 1 }));
  };

  onConversationClick = item => {
    const { getConversationsMessages } = this.props;
    getConversationsMessages(item.session);
    this.setState({ visibleModal: true, selectedConversation: item });
  };

  onModalClose = () => {
    this.setState({ visibleModal: false, selectedConversation: {} });
  };

  onIntentsModalClose = () => {
    this.setState({ visibleIntentsEditorModal: false, selectedMessage: {} });
  };

  onSearchClick = filter => {
    const { clearConversations } = this.props;
    clearConversations();
    if (!filter.toDate) {
      this.setState((state, props) => ({
        filter: {...filter, toDate: state.activationTimestamp}, currentPage: 1
      }));
      return;    
    }
    this.setState({ filter, currentPage: 1 });
  };

  onEditClick = message => {
    this.setState({
      visibleIntentsEditorModal: true,
      selectedMessage: message
    });
  };

  onChangeIntent = (message, intent) => {
    const { correctIntents } = this.props;
    this.setState({ visibleIntentsEditorModal: false, selectedMessage: {} });
    correctIntents(message, intent);
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
