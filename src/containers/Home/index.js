import React from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import './styles.css'

class HomePage extends React.Component {
	render() {
		return (
			<div className='home-wrapper container'>
				<div className='home-title'>Домашняя страница</div>
				<div className='cards-wrapper'>
					<Link to="/answers">
						<div className='card'>
						<Icon name='comments outline' className='home-icon' size='big'/>
						Ответы
						</div>
					</Link>
					<Link to="/history">
						<div className='card'>
						<Icon name='history' className='home-icon' size='big'/>
						История
						</div>
					</Link>
					<Link to="/answers">
						<div className='card'>
						<Icon name='user outline' className='home-icon' size='big'/>
						Личный кабинет
						</div>
					</Link>
					<Link to="/answers">
						<div className='card'>
						<Icon name='group' className='home-icon' size='big'/>
						Сотрудники
						</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default HomePage;
