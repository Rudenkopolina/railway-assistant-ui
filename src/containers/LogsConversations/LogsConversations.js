import React from 'react';
import { connect } from 'react-redux';
import './LogsConversations.css'
import { withRouter } from 'react-router-dom';
import {
	getSpeechToTextStatistics,
	getTextProcessorStatistics,
	getTextToSpeechStatistics
} from "../../redux/actions/usageStatistics";
import cx from "classnames";
import Filter from "../Answers/Answers";

class LogsConversations extends React.Component {

	componentWillMount() {
		/*const { user } = this.props.auth;
		if (user.permissions.ALLOWED_USAGE_STATISTICS_VIEWING) {
			this.props.getSpeechToTextStatistics();
			this.props.getTextToSpeechStatistics();
			this.props.getTextProcessorStatistics();
		}*/
	}

	render() {
		return (
			<div className='conversations-table-container container'>

			</div>
			/*<div className='statistics-wrapper container'>
				<div className='statistics-cards-wrapper'>

					<div className='statistics-card'>

						<div className='statistics-card-title'>
							<Icon name='microphone' className='statistics-icon' size='small'/>
							Преобразователь голоса в текст, количество запросов:
						</div>

						<div className='statistics-card-content'>
							<UsageStatisticsChart stats={{"statistics": this.props.usageStatistics.speechToText}}/>
						</div>

					</div>

					<div className='statistics-card'>
						<div className='statistics-card-title'>

							<Icon name='content' className='statistics-icon' size='small'/>
							Преобразователь текста в голос, количество запросов:
						</div>

						<div className='statistics-card-content'>
							<UsageStatisticsChart stats={{"statistics": this.props.usageStatistics.textToSpeech}}/>
						</div>

					</div>

					<div className='statistics-card'>

						<div className='statistics-card-title'>
							<Icon name='file alternate outline' className='statistics-icon' size='small'/>
							Обработчик текстовых сообщений, количество запросов:
						</div>

						<div className='statistics-card-content'>
							<UsageStatisticsChart stats={{"statistics": this.props.usageStatistics.textProcessor}}/>
						</div>

					</div>

				</div>
			</div>*/
		);
	}
}

const mapStateToProps = ({ auth, usageStatistics }) => ({
	auth, usageStatistics
});

const mapDispatchToProps = dispatch => ({
	getSpeechToTextStatistics: () => dispatch(getSpeechToTextStatistics()),
	getTextToSpeechStatistics: () => dispatch(getTextToSpeechStatistics()),
	getTextProcessorStatistics: () => dispatch(getTextProcessorStatistics()),
});


export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LogsConversations)
);
