import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './styles.css'


class UsageStatisticsChart extends React.Component {
	render() {
		const { stats } = this.props;
		return (
			<div className='usage-statistics-chart-content'>
				{stats}
			</div>
		);
	}
}

UsageStatisticsChart.propTypes = {
	stats: PropTypes.object.isRequired
};

export default withRouter(UsageStatisticsChart);
