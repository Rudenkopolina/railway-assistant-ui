import React from 'react';
import { connect } from 'react-redux';
import './History.css'
import { withRouter } from 'react-router-dom';
import moment from "moment";
import HistoryTable from "../../components/HistoryTable";
import 'react-notifications/lib/notifications.css';
import {
	clearIntents,
	getIntents,
	getIntentsPages
} from "../../redux/actions/intentLogs";
import {getAvailableIntents} from "../../redux/actions/availableIntents";
import {correctIntents} from "../../redux/actions/intentLogs";
import IntentsEditorModalHistory from "../../components/HistoryTable/IntentsEditorModalHistory";

class History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      currentPage: 1,
      visibleModal: false,
			activationTimestamp: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
      selectedConversation: {},
			visibleIntentsEditorModal: false,
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
			this.props.getIntents(this.state.currentPage, this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
			this.props.getIntentsPages(this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
		}
	}

	componentWillMount() {
		const { user } = this.props.auth;

		if (user.permissions.ALLOWED_HISTORY_VIEWING) {
			this.props.clearIntents();
			this.props.getIntents(this.state.currentPage, this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
			this.props.getIntentsPages(this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
			this.props.getAvailableIntents();
		}
	}

	onMoreClick = () => {
		this.props.getIntents(this.state.currentPage + 1, this.state.filter.fromDate, this.state.filter.toDate, this.state.filter.source, this.state.filter.type);
		this.setState({currentPage: this.state.currentPage + 1});
	};

	onConversationClick = (item) => {
		this.setState({visibleIntentsEditorModal: true});
		this.setState({
			selectedMessage: item
		});
  };

	onSearchClick = (filter) => {
		this.props.clearIntents();
		this.setState({"currentPage": 1});
		if (!filter.toDate) {
			filter.toDate = this.state.activationTimestamp;
		}
		this.setState({"filter": filter});
	};

	onChangeIntent = (message, intent) => {
		this.setState({visibleIntentsEditorModal: false});
		this.setState({selectedMessage: {}});
		this.props.correctIntents(message, intent);
	};

	onIntentsModalClose = () => {
		this.setState({visibleIntentsEditorModal: false});
		this.setState({selectedMessage: {}});
	};

	render() {
		return (
			<div className='history-table-container container'>
				<IntentsEditorModalHistory
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
	auth, intentLogs, availableIntents
});

const mapDispatchToProps = dispatch => ({
	getIntents: (page, fromDate, toDate, source, type) => dispatch(getIntents(page, fromDate, toDate, source, type)),
	getIntentsPages: (fromDate, toDate, source, type) => dispatch(getIntentsPages(fromDate, toDate, source, type)),
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
