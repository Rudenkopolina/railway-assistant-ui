import React from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Protected from '../../components/common/protected/container';
import './styles.css'

const pageList = [
	{ key: '/account', value: 'Профиль', icon: 'user outline', requiredRoles: ''},
	{ key: '/answers', value: 'Ответы', icon: 'comments outline', requiredRoles: ['ALLOWED_ANSWERS_VIEWING', 'ALLOWED_KNOWLEDGEBASE_VIEWING']},
	{ key: '/history', value: 'История', icon: 'history', requiredRoles: 'ALLOWED_HISTORY_EDITING'},
	{ key: '/users', value: 'Сотрудники', icon: 'group', requiredRoles: 'ALLOWED_USERS_CREATION'},
	{ key: '/statistics', value: 'Статистика использования', icon: 'dashboard', requiredRoles: 'ALLOWED_USAGE_STATISTICS_VIEWING'}
];

class HomePage extends React.Component {
	render() {
		return (
			<div className='home-wrapper container'>
				<div className='cards-wrapper'>
					{pageList.map(item =>
						<Protected requiredRoles={item.requiredRoles} key={item.key}>
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
		);
	}
}

export default HomePage;
