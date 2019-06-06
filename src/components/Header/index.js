import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react'
import './styles.css'

class Header extends React.Component {
	logOut = () => {
		this.props.logout();
	}

	render() {
		return (
			<div className='header-wrapper'>
				<div>
					<Icon name='user outline' />
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
