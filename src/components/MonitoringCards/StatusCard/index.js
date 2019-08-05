import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';

class StatusCard extends React.Component {
  render() {
    const {
      index,
      status,
      updating,
      updated,
      description,
      onUpdateClick
    } = this.props;
    return (
      <div key={index} className='status-card'>
        <div className='status-card-description'>
          <div className='status-card-title'>{description}</div>
          <div className='status-card-update-status'>
            Обновлено {moment(updated).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        </div>
        <div className='status-card-actions'>
          {status && !updating && (
            <div className='status-card-tag status-enabled'>Активно</div>
          )}
          {!status && !updating && (
            <div className='status-card-tag status-disabled'>Не активно</div>
          )}
          {updating && (
            <div className='status-card-tag status-updating'>Обновляется</div>
          )}
          <Button
            basic
            color='blue'
            content='Обновить'
            onClick={() => onUpdateClick(index)}
            className='status-card-refresh-button'
          />
        </div>
      </div>
    );
  }
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
