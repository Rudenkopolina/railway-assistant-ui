import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  getConversations,
  clearConversations,
  getConversationsMessages,
  getConversationsPages,
  correctIntents
} from '../../redux/actions/conversationLogs';
import { getAvailableIntents } from '../../redux/actions/availableIntents';
import ConversationsTable from '../../components/ConversationsTable';
import './styles.css';

class LogsConversations extends React.PureComponent {
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
    const { getConversations, getConversationsPages } = this.props;
    if (filter !== prevState.filter) {
      getConversations(currentPage, filter);
      getConversationsPages(filter);
    }
  }

  componentDidMount() {
    const { user } = this.props.auth;
    const { filter, currentPage } = this.state;
    const {
      clearConversations,
      getConversations,
      getConversationsPages,
      getAvailableIntents
    } = this.props;

    if (user.permissions.ALLOWED_LOGS_VIEWING) {
      clearConversations(); // ??
      getConversations(currentPage, filter);
      getConversationsPages(filter);
      getAvailableIntents();
    }
  }

  onMoreClick = () => {
    const { filter, currentPage } = this.state;
    const { getConversations } = this.props;
    getConversations(currentPage + 1, filter);
    this.setState(state => ({ currentPage: state.currentPage + 1 }));
  };

  onSearchClick = filter => {
    const { clearConversations } = this.props;
    clearConversations();
    if (!filter.toDate) {
      this.setState(state => ({
        filter: { ...filter, toDate: state.activationTimestamp },
        currentPage: 1
      }));
      return;
    }
    this.setState({ filter, currentPage: 1 });
  };

  render() {
    const {getConversationsMessages, conversationLogs, availableIntents, correctIntents} = this.props;
    return (
      <div className='conversations-table-container'>
        <ConversationsTable
          conversations={conversationLogs}
          availableIntents={availableIntents} 
          currentPage={this.state.currentPage}
          onMoreClick={this.onMoreClick}
          getFilteredConversations={this.onSearchClick}
          correctIntents={correctIntents}
          getConversationsMessages={getConversationsMessages}           
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
