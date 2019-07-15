import React from 'react';
import { connect } from 'react-redux';
import './LogsConversations.css'
import { withRouter } from 'react-router-dom';
import moment from "moment";
import {
  getConversations,
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
      activationTimestamp: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
      visibleModal: false,
      selectedConversation: {}
    };
	}

	componentWillMount() {
		const { user } = this.props.auth;

		if (user.permissions.ALLOWED_LOGS_VIEWING) {
			this.props.conversationLogs.conversations = [];
			this.props.getConversations(this.state.currentPage, this.state.activationTimestamp);
			this.props.getConversationsPages();
      this.props.getConversationsMessages("8bb4601f-d93e-4a5a-86eb-6e4b77ac1016");
		}
	}

	onMoreClick = () => {
		this.props.getConversations(this.state.currentPage + 1, this.state.activationTimestamp);
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
					getConversations={this.props.getConversations}
        />
			</div>
		);
	}
}

const mapStateToProps = ({ auth, conversationLogs }) => ({
	auth, conversationLogs
});

const mapDispatchToProps = dispatch => ({
	getConversations: (id, initDate) => dispatch(getConversations(id, initDate)),
	getConversationsPages: () => dispatch(getConversationsPages()),
  getConversationsMessages: (session) => dispatch(getConversationsMessages(session))
});


export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LogsConversations)
);
