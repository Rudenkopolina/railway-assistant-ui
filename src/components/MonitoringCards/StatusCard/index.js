import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';
import { LABELS } from '../../../constants/labels_en';

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
          {/* <div className='status-card-title'>{description}</div> */}
          <div className='status-card-title'>Asterisk IP Telephony Server</div>
          <div className='status-card-update-status'>
            {LABELS.UPDATED} {moment(updated).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        </div>
        <div className='status-card-actions'>
          {status && !updating && (
            <div className='status-card-tag status-enabled'>{LABELS.ACTIVE}</div>
          )}
          {!status && !updating && (
            <div className='status-card-tag status-disabled'>{LABELS.NON_ACTIVE}</div>
          )}
          {updating && (
            <div className='status-card-tag status-updating'>{LABELS.LOADING}</div>
          )}
          <Button
            basic
            color='blue'
            content={LABELS.REFRESH}
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
