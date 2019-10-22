import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './styles.css';
import { Chart } from 'react-charts';

function UsageStatisticsChart(props) {
  let [statistic, getStatistic] = useState({
    statistics: []
  });

  useEffect(() => {
    if (props.stats) {
      getStatistic((statistic = props.stats));
    }
  },[{ date: '', records: 0 }]);

  const computeChartValue = stats => {
    const data = stats.statistics.map(record => [record.date, parseInt(record.records)]);
    return data;
  };
  
  const data = useMemo(() => computeChartValue(statistic), [statistic]);

  return (
    <Chart
      className='usage-statistics-chart-content'
      data={[
        {
          label: props.label,
          data: data.reverse()
        }
      ]}
      axes={[
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left', scaleIntegersOnly: true }
      ]}
      tooltip
    />
  );
}

UsageStatisticsChart.propTypes = {
  stats: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default withRouter(UsageStatisticsChart);
