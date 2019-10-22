import React from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react'
import Protected from '../common/protected/container'
import cx from 'classnames';
import { LABELS } from '../../constants/labels_en';
import './styles.css' 


const pageList = [
	{ key: '/', value: LABELS.HOME, icon: 'home', requiredRoles: ''},
	{ key: '/account', value: LABELS.PROFILE, icon: 'user', requiredRoles: ''},
	{ key: '/answers', value: LABELS.ANSWERS, icon: 'comments', requiredAnyRoles: ['ALLOWED_ANSWERS_VIEWING', 'ALLOWED_KNOWLEDGEBASE_VIEWING']},
	{ key: '/users', value: LABELS.EMPLOYEES, icon: 'group', requiredRoles: 'ALLOWED_USERS_CREATION'},
	{ key: '/statistics', value: LABELS.USAGE_STATISTICS, icon: 'dashboard', requiredAnyRoles: ['ALLOWED_USAGE_STATISTICS_VIEWING', 'ALLOWED_CONVERSATION_STATISTICS_VIEWING']},
	{ key: '/group/environment', value: LABELS.CONNECTED_ENVIRONMENT, icon: 'plug', requiredRoles: ''},
	{ key: '/logs/conversations', value: LABELS.CONVERSATION_HISTORY, icon: 'history', requiredRoles: 'ALLOWED_LOGS_VIEWING'},
	{ key: '/history/irrelevant', value: LABELS.UNRECOGNIZED_INTENTS, icon: 'question circle', requiredRoles: 'ALLOWED_HISTORY_VIEWING'},
	{ key: '/monitoring', value: LABELS.MONITORING, icon: 'info circle', requiredRoles: 'ALLOWED_MONITORING_VIEWING'}
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
									<Icon name={item.icon} className={cx('sidebar-icon', { 'sidebar-active-icon': title === item.key })} size='big' />
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
