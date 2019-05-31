import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Spinner from '../../components/Spinner'
import { logout } from '../../redux/actions/auth';

import './styles.css';


class Layout extends React.Component {
	render() {
    const { failed, pending } = this.props.responses;
		if (failed) {
			NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
		}
		return (
			<Fragment>
				{pending &&
					<div className='table-spinner'>
						<Spinner />
					</div>
				}
        <NotificationContainer />
				<Sidebar />
        <Header
          user={this.props.auth.user.username}
          logout={this.props.logout}
        />
        {this.props.children}
			</Fragment>
		);
	}
}

const mapStateToProps = ({ auth, responses }) => ({
	auth,
	responses
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
