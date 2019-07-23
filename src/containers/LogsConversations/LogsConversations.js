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
import {getAvailableIntents} from "../../redux/actions/availableIntents";
import {correctIntents} from "../../redux/actions/conversationLogs";
import IntentsEditorModal from "../../components/ConversationsTable/IntentsEditorModal";

class LogsConversations extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      currentPage: 1,
      visibleModal: false,
			visibleIntentsEditorModal: false,
			activationTimestamp: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
      selectedConversation: {},
			selectedMessage: {},
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
			this.props.clearConversations();
			this.props.getConversations(this.state.currentPage, this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
			this.props.getConversationsPages(this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
			this.props.getAvailableIntents();
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

	onIntentsModalClose = () => {
		this.setState({visibleIntentsEditorModal: false});
		this.setState({selectedMessage: {}});
	};

	onSearchClick = (filter) => {
		this.props.clearConversations();
		this.setState({"currentPage": 1});
		if (!filter.toDate) {
			filter.toDate = this.state.activationTimestamp;
		}
		this.setState({"filter": filter});
	};

	onEditClick = (message) => {
		this.setState({visibleIntentsEditorModal: true});
		this.setState({selectedMessage: message});
	};

	onChangeIntent = (message, intent) => {
		this.setState({visibleIntentsEditorModal: false});
		this.setState({selectedMessage: {}});
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
	auth, conversationLogs, availableIntents
});

const mapDispatchToProps = dispatch => ({
	getConversations: (page, fromDate, toDate, source, type) => dispatch(getConversations(page, fromDate, toDate, source, type)),
	getConversationsPages: (fromDate, toDate, source, type) => dispatch(getConversationsPages(fromDate, toDate, source, type)),
  getConversationsMessages: (session) => dispatch(getConversationsMessages(session)),
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
