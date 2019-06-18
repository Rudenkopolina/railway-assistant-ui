import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Protected from '../../components/common/protected/container';
import './Statistics.css'
import UsageStatisticsChart from "../../components/UsageStatisticsChart";
import { withRouter } from 'react-router-dom';
import {
	getSpeechToTextStatistics,
	getTextProcessorStatistics,
	getTextToSpeechStatistics
} from "../../redux/actions/usageStatistics";
import {
	getDistinctConversationsStatistics,
	getStepsConversationsStatistics
} from "../../redux/actions/conversationStatistics";
import cx from "classnames";

class Statistics extends React.Component {

	componentWillMount() {
		const { user } = this.props.auth;

		let titles = [];

		if (user.permissions.ALLOWED_CONVERSATION_STATISTICS_VIEWING) {
			titles.push({
				name: 'Статистика разговоров',
				key: 'conversation_statistics',
				requiredRoles: 'ALLOWED_CONVERSATION_STATISTICS_VIEWING'
			});
			this.props.getDistinctConversationsStatistics();
			this.props.getStepsConversationsStatistics();
		}

		if (user.permissions.ALLOWED_USAGE_STATISTICS_VIEWING) {
			titles.push({
				name: 'Статистика использования сервисов',
				key: 'usage_statistics',
				requiredRoles: 'ALLOWED_USAGE_STATISTICS_VIEWING'
			});
			this.props.getSpeechToTextStatistics();
			this.props.getTextToSpeechStatistics();
			this.props.getTextProcessorStatistics();
		}

		this.setState({ titles: titles, activeTab: titles[0].key });
	}

	getContent = () => {
		const { activeTab } = this.state;
		switch (activeTab) {
			case 'conversation_statistics':
				return (
					<Protected requiredRoles='ALLOWED_CONVERSATION_STATISTICS_VIEWING'>

						<div className='statistics-card'>

							<div className='statistics-card-title'>
								<Icon name='conversation' className='statistics-icon' size='small'/>
								Общее число обращений:
							</div>

							<div className='statistics-card-content'>
								<UsageStatisticsChart stats={{"statistics": this.props.conversationStatistics.distinctConversations}}/>
							</div>

						</div>

						<div className='statistics-card'>

							<div className='statistics-card-title'>
								<Icon name='exchange' className='statistics-icon' size='small'/>
								Среднее количество шагов в обращении:
							</div>

							<div className='statistics-card-content'>
								<UsageStatisticsChart stats={{"statistics": this.props.conversationStatistics.stepsConversations}}/>
							</div>

						</div>

					</Protected>
				);
			case 'usage_statistics':
				return (
					<Protected requiredRoles='ALLOWED_USAGE_STATISTICS_VIEWING'>

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

					</Protected>
				);
			default:
				return;
		}
	};

	changeTab = tab => {
		this.setState({ activeTab: tab });
	};

	render() {
		return (
			<div className='statistics-wrapper container'>

				<div className='statistics-cards-wrapper'>

					<div className='statistics-header'>
						<div className='statistics-menu'>
							{this.state.titles.map(title => (
								<div
									key={title.key}
									className={cx('statistics-menu-item', {
										'statistics-menu-item-active': this.state.activeTab === title.key
									})}
									onClick={() => this.changeTab(title.key)}
								>
									{title.name}
								</div>
							))}
						</div>
					</div>
					{this.getContent()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ auth, usageStatistics, conversationStatistics }) => ({
	auth, usageStatistics, conversationStatistics
});

const mapDispatchToProps = dispatch => ({
	getSpeechToTextStatistics: () => dispatch(getSpeechToTextStatistics()),
	getTextToSpeechStatistics: () => dispatch(getTextToSpeechStatistics()),
	getTextProcessorStatistics: () => dispatch(getTextProcessorStatistics()),
	getDistinctConversationsStatistics: () => dispatch(getDistinctConversationsStatistics()),
	getStepsConversationsStatistics: () => dispatch(getStepsConversationsStatistics())
});


export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Statistics)
);