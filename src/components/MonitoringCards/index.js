import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Table } from 'semantic-ui-react';

import './styles.css';

import StatusCard from './StatusCard';

class MonitoringCards extends React.Component {
  render() {
    return (<div className='monitoring-container'>
     <div className='monitoring-title'>История разговоров</div>
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
        )
  }
}
MonitoringCards.propTypes = {
  conversations: PropTypes.array.isRequired,
  pages: PropTypes.number.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onConversationClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  getFilteredConversations: PropTypes.func.isRequired
};

export default withRouter(MonitoringCards);
