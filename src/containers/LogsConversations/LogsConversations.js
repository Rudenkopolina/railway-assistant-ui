import React from 'react';
import { connect } from 'react-redux';
import './LogsConversations.css'
import { withRouter } from 'react-router-dom';
import moment from "moment";
import {
	getConversations,
	clearConversations,
  getConversationsMessages,
  getConversationsPages
} from "../../redux/actions/conversationLogs";
import ConversationsTable from "../../components/ConversationsTable";
import ConversationModal from "../../components/ConversationsTable/ConversationModal";

class LogsConversations extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      currentPage: 1,
      visibleModal: false,
			activationTimestamp: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
      selectedConversation: {},
			filter: {
				fromDate: undefined,
				toDate: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
				source: undefined,
				type: undefined
			}
    };
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.filter !== prevState.filter) {
			this.props.getConversations(this.state.currentPage, this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
			this.props.getConversationsPages(this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
		}
	}

	componentWillMount() {
		const { user } = this.props.auth;

		if (user.permissions.ALLOWED_LOGS_VIEWING) {
			this.props.conversationLogs.conversations = [];
			this.props.getConversations(this.state.currentPage, this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
			this.props.getConversationsPages(this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
		}
	}

	onMoreClick = () => {
		this.props.getConversations(this.state.currentPage + 1, this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
		this.setState({currentPage: this.state.currentPage + 1});
	};

	onConversationClick = (item) => {
	  this.props.getConversationsMessages(item.session);
	  this.setState({visibleModal: true});
    this.setState({
      selectedConversation: item
    });
  };

	onModalClose = () => {
    this.setState({visibleModal: false});
    this.setState({selectedConversation: {}});
  };

	onSearchClick = (filter) => {
		this.props.clearConversations();
		this.setState({"currentPage": 1});
		if (!filter.toDate) {
			filter.toDate = this.state.activationTimestamp;
		}
		this.setState({"filter": filter});
	};

	render() {
		return (
			<div className='conversations-table-container container'>
        <ConversationModal
          conversation={this.state.selectedConversation}
          messages={this.props.conversationLogs.selectedConversationMessages}
          visible={this.state.visibleModal}
          onModalClose={this.onModalClose}
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

const mapStateToProps = ({ auth, conversationLogs }) => ({
	auth, conversationLogs
});

const mapDispatchToProps = dispatch => ({
	getConversations: (page, fromDate, toDate, source, type) => dispatch(getConversations(page, fromDate, toDate, source, type)),
	getConversationsPages: (fromDate, toDate, source, type) => dispatch(getConversationsPages(fromDate, toDate, source, type)),
  getConversationsMessages: (session) => dispatch(getConversationsMessages(session)),
	clearConversations: () => dispatch(clearConversations())
});


export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LogsConversations)
);
