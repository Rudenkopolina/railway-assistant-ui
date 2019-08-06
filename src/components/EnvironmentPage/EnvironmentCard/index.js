import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'semantic-ui-react';
import './styles.css';

class EnvironmentCard extends React.Component {
  getDescriptionByType = environment => {
    switch (environment.type) {
      case 'telegram':
      case 'viber':
        return '@' + environment.account.username;
      case 'PSTN':
        return environment.account.telephone;
      default:
        return '@' + environment.account.username;
    }
  };
  render() {
    const { environment } = this.props;
    return (
      <div key={environment.account.id} className='environment-card' >
        <div className='environment-title'>{environment.account.name}</div>
        <div className='environment-description'>{this.getDescriptionByType(environment)}</div>
        <Icon
          name={environment.type || 'question'}
          className='environment-icon'
          size='big'
        />
      </div>    
    );
  }
}

EnvironmentCard.propTypes = {
  environment: PropTypes.object.isRequired
};

export default EnvironmentCard;
