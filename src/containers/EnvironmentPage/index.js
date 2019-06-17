import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './styles.css'
import {connect} from "react-redux";
import {getEnvironment} from "../../redux/actions/environment";
import {Icon} from "semantic-ui-react";
class EnvironmentPage extends React.Component {

	getIconByType = (type) => {
		switch (type) {
			case "telegram": return "telegram";
			case "viber": return "viber";
			case "PSTN": return "phone";
			default: return "question";
		}
	};

	getDescriptionByType = (environment) => {
		switch (environment.type) {
			case "telegram": return "@" + environment.account.username;
			case "viber": return "@" + environment.account.username;
			case "PSTN": return environment.account.telephone;
			default: return "@" + environment.account.username;
		}
	};

	drawCards = () => {
		return(this.props.environment.environment.map((environment, index) => {
				return <div className='environment-card'>
									<Icon name={this.getIconByType(environment.type)} className='environment-icon' size='big'/>
									<div className='environment-title'>
										{environment.account.name}
									</div>
									<div className='environment-description'>
										{this.getDescriptionByType(environment)}
									</div>
							</div>;
			}));
	};

	componentWillMount() {
		this.props.getEnvironment();
	}

	render() {
		return (
			<div className='environment-wrapper container'>
				<div className='environment-cards-wrapper'>
					{this.drawCards()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ environment }) => ({
	environment
});

const mapDispatchToProps = dispatch => ({
	getEnvironment: () => dispatch(getEnvironment()),
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(EnvironmentPage)
);
