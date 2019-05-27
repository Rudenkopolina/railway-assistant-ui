import React from 'react';
import {Link} from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react'
import cx from 'classnames';
import './styles.css'

class Sidebar extends React.Component {
	render() {
    const { title } = this.props;
		return (
			<div className='sidebar-wrapper'>
				<Link to="/" className={cx({ 'sidebar-active-item': title === 'home' })}>
          <Popup
            content='Домашняя старница'
            position='right center'
            trigger={
              <Icon name='home' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'home' })} size='big' />
            }
          />
				</Link>
        <Link to="/answers" className={cx({ 'sidebar-active-item': title === 'account' })}>
          <Popup
            content='Личный кабинет'
            position='right center'
            trigger={
              <Icon name='user outline' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'account' })} size='big' />
            }
          />
        </Link>
        <Link to="/answers" className={cx({ 'sidebar-active-item': title === 'answers' })}>
          <Popup
            content='Ответы'
            position='right center'
            trigger={
              <Icon name='comments outline' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'answers' })} size='big' />
            }
          />
        </Link>
        <Link to="/history" className={cx({ 'sidebar-active-item': title === 'history' })}>
          <Popup
            content='История'
            position='right center'
            trigger={
              <Icon name='history' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'history' })} size='big' />
            }
          />
        </Link>
        <Link to="/answers" className={cx({ 'sidebar-active-item': title === 'employees' })}>
          <Popup
            content='Сотрудники'
            position='right center'
            trigger={
              <Icon name='group' className={cx('sidebar-icon', { 'sidebar-active-icon': title === 'employees' })} size='big' />
            }
          />
        </Link>
			</div>
		);
	}
}

export default Sidebar;
