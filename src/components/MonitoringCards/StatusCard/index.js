import React from 'react';
import {withRouter} from 'react-router-dom';
import './styles.css'
import PropTypes from 'prop-types';
import {Icon, Popup} from "semantic-ui-react";
import moment from 'moment';
class StatusCard extends React.Component {

	componentWillMount() {

	}

	render() {
		return (
			<div key={this.props.index}
					 className={`status-card ${this.props.status ? 'status-card-enabled' : 'status-card-disabled'} ${this.props.updating ? 'status-card-updating' : ''}`}>
				<div className='status-card-updated'>
					<Icon name='redo alternate' className='status-card-refresh-icon'
								onClick={() => this.props.onUpdateClick(this.props.index)}/>
					<Popup
						content={<div
							className='status-card-updated-time'>Обновлено {moment(this.props.updated).format('DD.MM.YYYY HH:mm:ss')}</div>}
						position='right center'
						trigger={<Icon name='info' className='status-card-popup-icon'/>}
					/>
				</div>
				<Icon name={this.props.icon ? this.props.icon : 'hdd'} className='status-card-icon' size='big'/>
				<div className='status-card-description'>
					{this.props.description}
				</div>
			</div>
		);
	};
}

StatusCard.propTypes = {
	onUpdateClick: PropTypes.func.isRequired,
	description: PropTypes.string.isRequired,
	status: PropTypes.bool.isRequired,
	updated: PropTypes.string.isRequired,
	icon: PropTypes.string,
	index: PropTypes.number.isRequired,
	updating: PropTypes.bool.isRequired
};

export default withRouter(StatusCard);