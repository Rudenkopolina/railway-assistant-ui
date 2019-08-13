import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './styles.css';

class Header extends React.Component {
  logOut = () => {
    this.props.logout();
  };

  render() {
    return (
      <div className='header-wrapper'>
        {this.props.user}
        <Icon name='log out' className='header-icon' onClick={this.logOut} />
      </div>
    );
  }
}

export default withRouter(Header);
