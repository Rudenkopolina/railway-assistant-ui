import React from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Protected from '../../components/common/protected/container';
import './styles.css'

const pageList = [
	{ key: '/account', value: 'Профиль', icon: 'user', requiredRoles: ''},
	{ key: '/answers', value: 'Ответы', icon: 'comments', requiredAnyRoles: ['ALLOWED_ANSWERS_VIEWING', 'ALLOWED_KNOWLEDGEBASE_VIEWING']},
	{ key: '/history', value: 'История', icon: 'history', requiredRoles: 'ALLOWED_HISTORY_EDITING'},
	{ key: '/users', value: 'Сотрудники', icon: 'group', requiredRoles: 'ALLOWED_USERS_CREATION'},
	{ key: '/statistics', value: 'Статистика использования', icon: 'dashboard', requiredAnyRoles: ['ALLOWED_USAGE_STATISTICS_VIEWING', 'ALLOWED_CONVERSATION_STATISTICS_VIEWING']},
	{ key: '/group/environment', value: 'Подключённое окружение', icon: 'plug', requiredRoles: ''},
	{ key: '/logs/conversations', value: 'История разговоров', icon: 'history', requiredRoles: 'ALLOWED_LOGS_VIEWING'},
];

class HomePage extends React.Component {
	render() {
		return (
			<div className='home container'>
				<div className='home-wrapper'>
					<div className='cards-wrapper'>
						{pageList.map(item =>
							<Protected requiredRoles={item.requiredRoles} requiredAnyRoles={item.requiredAnyRoles} key={item.key}>
								<Link to={item.key}>
									<div className='card'>
										<Icon name={item.icon} className='home-icon' size='big'/>
										{item.value}
									</div>
								</Link>
							</Protected>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default HomePage;
