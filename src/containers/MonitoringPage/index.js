import React from 'react';
import {withRouter} from 'react-router-dom';
import './styles.css'
import {connect} from "react-redux";
import {getMonitoring, updateMonitoringItem} from "../../redux/actions/monitoring";
import StatusCard from "../../components/MonitoringCards/StatusCard";
class MonitoringPage extends React.Component {

	componentWillMount() {
		this.props.getMonitoring();
	}

	onItemUpdateClick = (itemIndex) => {
		this.props.updateMonitoringItem(itemIndex);
	};

	render() {
		return (
			<div className='monitoring-wrapper container'>
				<div className='monitoring-cards-wrapper'>
					{this.props.monitoring.items.map((item, index) => {
						return (
							<StatusCard
								key={index}
								onUpdateClick={this.onItemUpdateClick}
								description={item.description}
								status={item.status}
								updated={item.updated}
								icon={item.icon}
								index={item.id}
								updating={item.updating}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ monitoring }) => ({
	monitoring
});

const mapDispatchToProps = dispatch => ({
	getMonitoring: () => dispatch(getMonitoring()),
	updateMonitoringItem: (id) => dispatch(updateMonitoringItem(id))
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MonitoringPage)
);