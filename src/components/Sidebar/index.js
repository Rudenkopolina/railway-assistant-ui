import React from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react'
import Protected from '../common/protected/container'
import cx from 'classnames';
import './styles.css'


const pageList = [
	{ key: '/', value: 'Домашняя страница', icon: 'home', requiredRoles: ''},
	{ key: '/account', value: 'Профиль', icon: 'user', requiredRoles: ''},
	{ key: '/answers', value: 'Ответы', icon: 'comments', requiredAnyRoles: ['ALLOWED_ANSWERS_VIEWING', 'ALLOWED_KNOWLEDGEBASE_VIEWING']},
	{ key: '/users', value: 'Сотрудники', icon: 'group', requiredRoles: 'ALLOWED_USERS_CREATION'},
	{ key: '/statistics', value: 'Статистика использования', icon: 'dashboard', requiredAnyRoles: ['ALLOWED_USAGE_STATISTICS_VIEWING', 'ALLOWED_CONVERSATION_STATISTICS_VIEWING']},
	{ key: '/group/environment', value: 'Подключённое окружение', icon: 'plug', requiredRoles: ''},
	{ key: '/logs/conversations', value: 'История разговоров', icon: 'history', requiredRoles: 'ALLOWED_LOGS_VIEWING'},
	{ key: '/history/irrelevant', value: 'Нераспознанные намерения', icon: 'question circle', requiredRoles: 'ALLOWED_HISTORY_VIEWING'}
];

class Sidebar extends React.Component {
	render() {
    const title = this.props.match.path;
		return (
			<div className='sidebar-wrapper'>
				{pageList.map(item =>
					<Protected requiredRoles={item.requiredRoles} requiredAnyRoles={item.requiredAnyRoles} key={item.key}>
						<Link to={item.key} className={cx({ 'sidebar-active-item': title === item.key })}>
							<Popup
								content={item.value}
								position='right center'
								trigger={
									<Icon name={item.icon} className={cx('sidebar-icon', { 'sidebar-active-icon': title === item.key })} size='large' />
								}
							/>
						</Link>
					</Protected>
				)}
			</div>
		);
	}
}

export default withRouter(Sidebar);
