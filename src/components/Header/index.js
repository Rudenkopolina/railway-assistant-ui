import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import './styles.css'

const titles = {
		'/': 'Домашняя страница',
		'/account': 'Личный кабинет',
		'/answers':	'Ответы',
		'/history': 'История',
		'/employees': 'Сотрудники'
}

class Header extends React.Component {
	logOut = () => {
		this.props.logout();
	}

	render() {
    const title = this.props.match.path;
		return (
			<div className='header-wrapper'>
				<div>
					{titles[title]}
				</div>
				<div>
					{this.props.user}
					<Dropdown item icon='ellipsis horizontal' className='header-menu'>
						<Dropdown.Menu direction='left' className='header-menu-item'>
							<div className='header-menu-content' onClick={this.logOut}>Выйти</div>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
		);
	}
}

export default withRouter(Header);
