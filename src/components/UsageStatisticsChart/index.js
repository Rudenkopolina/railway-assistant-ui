import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './styles.css'
import { Chart } from "react-charts";


class UsageStatisticsChart extends React.Component {
	render() {
		const { stats } = this.props;
		let data = [];
		stats.statistics.forEach(record => {
			data.push([record.date, record.records]);
		});
		return (
			<Chart
				className='usage-statistics-chart-content'
				data={[
					{
						label: "Usages",
						data: data.reverse()
					}
				]}
				axes={[
					{ primary: true, type: "ordinal", position: "bottom" },
					{ type: "linear", position: "left" }
				]}
				tooltip
			/>
		);
	}
}

UsageStatisticsChart.propTypes = {
	stats: PropTypes.object.isRequired
};

export default withRouter(UsageStatisticsChart);
