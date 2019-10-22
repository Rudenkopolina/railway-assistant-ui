import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import StatusCard from './StatusCard';
import { LABELS } from '../../constants/labels_en'
import './styles.css';

class MonitoringCards extends React.Component {
  render() {
    const { monitoring, onItemUpdateClick } = this.props;
    return (
      <div className='container'>
        <div className='monitoring-title'>{LABELS.MONITORING}</div>
        <div className='monitoring-cards-wrapper'>
          {monitoring.items.map(item => (
            <StatusCard
              key={item.id}
              onUpdateClick={onItemUpdateClick}
              description={item.description}
              status={item.status}
              updated={item.updated}
              icon={item.icon}
              index={item.id}
              updating={item.updating}
            />
          ))}
        </div>
      </div>
    );
  }
}

MonitoringCards.propTypes = {
  monitoring: PropTypes.object.isRequired,
  onItemUpdateClick: PropTypes.func.isRequired
};

export default withRouter(MonitoringCards);
