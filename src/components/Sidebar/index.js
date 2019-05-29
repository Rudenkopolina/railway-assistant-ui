import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Icon, Popup, Dropdown } from 'semantic-ui-react'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Protected from '../common/protected/container'
import cx from 'classnames';
import { logout } from '../../redux/actions/auth';
import './styles.css'

const titles = {
		home: 'Домашняя страница',
		account: 'Личный кабинет',
		answers:	'Ответы',
		history: 'История',
		employees: 'Сотрудники'
}

class Sidebar extends React.Component {
	logOut = () => {
		this.props.logout();
		sessionStorage.removeItem('jwtToken');
	}

	render() {
    const { title, failed } = this.props;
		if (failed) {
			NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
		}
		return (
			<Fragment>
				<NotificationContainer />
				<div className='header-wrapper'>
					<div>
						{titles[title]}
					</div>
					<div>
						{this.props.user.username}
						<Dropdown item icon='ellipsis horizontal' className='header-menu'>
							<Dropdown.Menu direction='left' className='header-menu-item'>
								<div className='header-menu-content' onClick={this.logOut}>Выйти</div>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</div>
				<div className='sidebar-wrapper'>
					<Link to="/" className={cx({ 'sidebar-active-item': title === 'home' })}>
	          <Popup
	            content={titles.home}
	            position='right center'
	            trigger={
	              <Icon name='home' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'home' })} size='big' />
	            }
	          />
					</Link>
	        <Link to="/account" className={cx({ 'sidebar-active-item': title === 'account' })}>
	          <Popup
	            content={titles.account}
	            position='right center'
	            trigger={
	              <Icon name='user outline' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'account' })} size='big' />
	            }
	          />
	        </Link>
	        <Link to="/answers" className={cx({ 'sidebar-active-item': title === 'answers' })}>
	          <Popup
	            content={titles.answers}
	            position='right center'
	            trigger={
	              <Icon name='comments outline' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'answers' })} size='big' />
	            }
	          />
	        </Link>
					<Protected requiredRoles='ALLOWED_HISTORY_EDITING'>
		        <Link to="/history" className={cx({ 'sidebar-active-item': title === 'history' })}>
		          <Popup
		            content={titles.history}
		            position='right center'
		            trigger={
		              <Icon name='history' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'history' })} size='big' />
		            }
		          />
		        </Link>
					</Protected>
					<Protected requiredRoles='ALLOWED_USERS_CREATION'>
		        <Link to="/answers" className={cx({ 'sidebar-active-item': title === 'employees' })}>
		          <Popup
		            content={titles.employees}
		            position='right center'
		            trigger={
		              <Icon name='group' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'employees' })} size='big' />
		            }
		          />
		        </Link>
					</Protected>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ auth, responses }) => ({
	...auth,
	...responses
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
