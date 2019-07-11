import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Spinner from '../../components/Spinner'
import { logout } from '../../redux/actions/auth';
import { stopAudio } from '../../redux/actions/audios';


import './styles.css';


class Layout extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.audios.playedId !== this.props.audios.playedId) {
			const audio = document.getElementById('audio');
			if (nextProps.audios.playedId) {
				audio.pause();
				audio.currentTime = 0;
				audio.load();
				audio.play();
				audio.onended = this.props.stopAudio;
			} else {
				audio.pause();
			}
		}
	}

	render() {
    const { failed, pending } = this.props.responses;
		if (failed) {
			NotificationManager.error('Something went wrong, try again.', 'Sorry :(');
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
				<audio
					preload='none'
					id='audio'
					onEnded={this.props.stopAudio}
				>
					<source src={this.props.audios.audioUrl} type='audio/ogg' />
				</audio>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ auth, responses, audios }) => ({
	auth,
	responses,
	audios
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout()),
	stopAudio: () => dispatch(stopAudio())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
