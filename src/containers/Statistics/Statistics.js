import React from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Protected from '../../components/common/protected/container';

import UsageStatisticsChart from '../../components/UsageStatisticsChart';
import { withRouter } from 'react-router-dom';
import {
  getSpeechToTextStatistics,
  getTextProcessorStatistics,
  getTextToSpeechStatistics
} from '../../redux/actions/usageStatistics';
import {
  getDistinctConversationsStatistics,
  getDurationConversationsStatistics,
  getStepsConversationsStatistics
} from '../../redux/actions/conversationStatistics';
import cx from 'classnames';
import './styles.css';

const timeIntervals = ['24 часа', '72 часа', '15 дней', '30 дней'];
const timeIntervalsString = ['oneDay', 'threeDays', 'fifteenDays', 'thirtyDays'];
const statisticsHeaders = ['Общее число обращений:', 'Среднее количество шагов в обращении:', 'Средняя длительность обращения (в секундах):'];
const statisticsHeadersString = ['distinctConversations', 'stepsConversations', 'durationConversations'];
const usageStatisticsHeaders = ['Преобразователь голоса в текст, количество запросов:', 'Преобразователь текста в голос, количество запросов:', 'Обработчик текстовых сообщений, количество запросов:']
const usageStatisticsHeadersString = ['speechToText', 'textToSpeech', 'textProcessor']

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
      this.props.getDurationConversationsStatistics();
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
				{statisticsHeadersString.map((item, index) => (
					<div className='statistics-card' key={item + index}>
						<div className='statistics-card-title'>{statisticsHeaders[index]}</div>
						<div className='statistics-card-content'>
							<div className='statistics-card-content-table'>
								<Table celled>
									<Table.Body>
										{timeIntervalsString.map((time, index) => (
											<Table.Row key={time + index}>
												<Table.Cell className='table-td-padding'>{timeIntervals[index]}</Table.Cell>
												<Table.Cell className='table-td-padding'>
													{this.props.conversationStatistics[item][time]}
												</Table.Cell>
											</Table.Row>
										))}
									</Table.Body>
								</Table>
							</div>
							<div className='statistics-card-content-diagram'>
								<UsageStatisticsChart
									stats={{
										statistics: this.props.conversationStatistics[item].statistics
									}}
									label='Обращений'
								/>
							</div>
						</div>
					</div>
				))}
          </Protected>
        );
      case 'usage_statistics':
        return (
          <Protected requiredRoles='ALLOWED_USAGE_STATISTICS_VIEWING'>
				{usageStatisticsHeadersString.map((stat, index) => (
					<div className='statistics-card' key={stat + index}>
						<div className='statistics-card-title'>
							{usageStatisticsHeaders[index]}
						</div>
						<div className='statistics-card-content'>
							<UsageStatisticsChart
								stats={{
									statistics: this.props.usageStatistics[stat]
								}}
								label='Запросов'
							/>
						</div>
					</div>
				))}
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
      <div className='container'>
          <div className='statistics-header'>
            <div className='statistics-menu'>
              {this.state.titles.map(title => (
                <div
                  key={title.key}
                  className={cx('statistics-menu-item', {
                    'statistics-menu-item-active':
                      this.state.activeTab === title.key
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
    );
  }
}

const mapStateToProps = ({
  auth,
  usageStatistics,
  conversationStatistics
}) => ({
  auth,
  usageStatistics,
  conversationStatistics
});

const mapDispatchToProps = dispatch => ({
  getSpeechToTextStatistics: () => dispatch(getSpeechToTextStatistics()),
  getTextToSpeechStatistics: () => dispatch(getTextToSpeechStatistics()),
  getTextProcessorStatistics: () => dispatch(getTextProcessorStatistics()),
  getDistinctConversationsStatistics: () =>
    dispatch(getDistinctConversationsStatistics()),
  getStepsConversationsStatistics: () =>
    dispatch(getStepsConversationsStatistics()),
  getDurationConversationsStatistics: () =>
    dispatch(getDurationConversationsStatistics())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Statistics)
);