import React from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Protected from '../../components/common/protected/container';
import './styles.css'

class HomePage extends React.Component {
	render() {
		return (
			<div className='home-wrapper container'>
				<div className='cards-wrapper'>
					<Link to="/answers">
						<div className='card'>
						<Icon name='comments outline' className='home-icon' size='big'/>
						Ответы
						</div>
					</Link>
					<Protected requiredRoles='ALLOWED_HISTORY_EDITING'>
						<Link to="/history">
							<div className='card'>
							<Icon name='history' className='home-icon' size='big'/>
							История
							</div>
						</Link>
					</Protected>
					<Link to="/account">
						<div className='card'>
						<Icon name='user outline' className='home-icon' size='big'/>
						Личный кабинет
						</div>
					</Link>
					<Protected requiredRoles='ALLOWED_USERS_CREATION'>
						<Link to="/answers">
							<div className='card'>
							<Icon name='group' className='home-icon' size='big'/>
							Сотрудники
							</div>
						</Link>
					</Protected>
				</div>
			</div>
		);
	}
}

export default HomePage;
