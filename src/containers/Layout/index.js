import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { logout } from '../../redux/actions/auth';


class Layout extends React.Component {
	render() {
    const { failed } = this.props.responses;
		if (failed) {
			NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
		}
		return (
			<Fragment>
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
