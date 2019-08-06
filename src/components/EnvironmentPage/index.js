import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EnvironmentCard from './EnvironmentCard';
import './styles.css';

class EnvironmentPage extends React.Component {
  render() {
    const { environment } = this.props;
    return (
      <div>
        <div className='environment-header'>Подключенное окружение</div>
        <div className='environment-cards-wrapper'>
          {environment.map(environment => (
            <EnvironmentCard
              key={environment.account.id}
              environment={environment}
            />
          ))}
        </div>
      </div>
    );
  }
}

EnvironmentPage.propTypes = {
  environment: PropTypes.array.isRequired
};

export default withRouter(EnvironmentPage);
