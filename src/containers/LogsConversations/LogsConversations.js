import React from 'react';
import { connect } from 'react-redux';
import './LogsConversations.css'
import { withRouter } from 'react-router-dom';
import moment from "moment";
import {
	getConversations,
	getConversationsPages
} from "../../redux/actions/conversationLogs";

class LogsConversations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			activationTimestamp: moment().utc().format("YYYY-MM-DD HH:mm:ss")
		};
	}

	componentWillMount() {
		const { user } = this.props.auth;

		if (user.permissions.ALLOWED_LOGS_VIEWING) {
			this.props.getConversations(this.state.currentPage, this.state.activationTimestamp);
			this.props.getConversationsPages();
		}
	}

	onMoreClick = () => {
		this.state.currentPage = this.state.currentPage + 1;
		this.props.getConversations(this.state.currentPage, this.state.activationTimestamp);
	};

	drawMoreButton = () => {
		if (this.state.currentPage < this.props.conversationLogs.pages) {
			return (
				<tfoot>
				<tr>
					<th colSpan="4">
						<div className='block-pagination'>
							<button className="ui right labeled icon button" onClick={this.onMoreClick}>
								<i className="right arrow icon"></i>Загрузить ещё
							</button>
						</div>
					</th>
				</tr>
				</tfoot>)
		}
	};

	render() {
		return (
			<div className='conversations-table-container container'>
				<table className="ui celled padded table">
					<thead>
					<tr>
						<th><div className="cell-header">Дата начала</div></th>
						<th><div className="cell-header">Дата конца</div></th>
						<th><div className="cell-header">Сессия</div></th>
						<th><div className="cell-header">Количество шагов</div></th>
					</tr>
					</thead>
					<tbody>
						{this.props.conversationLogs.conversations.map(conversation => {
							return (<tr>
								<td><div className="cell-body">{(moment(conversation.timestamp_start)).format('DD.MM.YYYY HH:mm:ss')}</div></td>
								<td><div className="cell-body">{(moment(conversation.timestamp_end)).format('DD.MM.YYYY HH:mm:ss')}</div></td>
								<td><div className="cell-body">{conversation.session}</div></td>
								<td><div className="cell-body">{conversation.iterations}</div></td>
							</tr>)
						})}
					</tbody>
					{this.drawMoreButton()}
				</table>
			</div>
		);
	}
}

const mapStateToProps = ({ auth, conversationLogs }) => ({
	auth, conversationLogs
});

const mapDispatchToProps = dispatch => ({
	getConversations: (id, initDate) => dispatch(getConversations(id, initDate)),
	getConversationsPages: () => dispatch(getConversationsPages())
});


export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LogsConversations)
);
