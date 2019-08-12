import React from 'react';
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.css'

import { logout } from '../../redux/actions/auth';

class Account extends React.Component {
	logOut = () => {
		this.props.logout();
		sessionStorage.removeItem('jwtToken');
	};

	render() {
		const { user } = this.props;
		return (
			<div className='account container'>
				<div className='account-info-wrapper'>
					<div className='account-icon'>
						<Icon name='user' size='massive' />
					</div>
					<div className='account-info'>
						<div className='account-info-title'>
							Название организации:
						</div>
						<div className='account-info-value'>
							{user.group}
						</div>
					</div>
					<div className='account-info'>
						<div className='account-info-title'>
							Имя пользователя:
						</div>
						<div className='account-info-value'>
							{user.username}
						</div>
					</div>
					<div className='account-info'>
						<div className='account-info-title'>
							Роль:
						</div>
						<div className='account-info-value'>
							{user.privilege}
						</div>
					</div>
					<div className='account-out' onClick={this.logOut}>
						Выйти из системы
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({ auth }) => (auth);

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
