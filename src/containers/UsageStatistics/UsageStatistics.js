import React from 'react';
import { Icon } from 'semantic-ui-react';
import Protected from '../../components/common/protected/container';
import './UsageStatistics.css'
import UsageStatisticsChart from "../../components/UsageStatisticsChart";

class UsageStatistics extends React.Component {
	render() {
		return (
			<div className='statistics-wrapper container'>
				<div className='statistics-cards-wrapper'>

					<div className='statistics-card'>

						<div className='statistics-card-title'>
							<Icon name='microphone' className='statistics-icon' size='small'/>
							Преобразование голоса в текст
						</div>

						<div className='statistics-card-content'>
							<UsageStatisticsChart stats=""/>
						</div>

					</div>

					<div className='statistics-card'>
						<div className='statistics-card-title'>

							<Icon name='content' className='statistics-icon' size='small'/>
							Преобразование текста в голос
						</div>

						<div className='statistics-card-content'>
							<UsageStatisticsChart stats=""/>
						</div>

					</div>

					<div className='statistics-card'>

						<div className='statistics-card-title'>
							<Icon name='file alternate outline' className='statistics-icon' size='small'/>
							Обработчик сообщений
						</div>

						<div className='statistics-card-content'>
							<UsageStatisticsChart stats=""/>
						</div>

					</div>

				</div>
			</div>
		);
	}
}

export default UsageStatistics;
