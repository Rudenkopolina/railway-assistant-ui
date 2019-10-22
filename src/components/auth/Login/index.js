import React from 'react';
import './styles.css';
import { Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from '../../../redux/actions/auth';
import UrlRestoringService from '../../../services/url_restoring_service';

import { LABELS } from '../../../constants/labels_en';
 
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    message: ''
  };

  componentDidUpdate({ auth: prevAuth }) {
		const { auth, history } = this.props;

		if (prevAuth.pending && !auth.pending) {
			if (!auth.user) {
				this.setState({ message: LABELS.INCORRECT_INPUT });
			} else {
				history.push(UrlRestoringService.getUrl() || '/');
			}
		}
	}

  handleChange = (event, title) => {
    this.setState({ [title]: event.target.value, message: '' });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <div className='login-wrapper'>
      <div className='login-background-image' />
      <div className='login-background' />
        <div className='login-card'>
          <span className='login-header-text'>{LABELS.LOGIN}</span>
          <Input
            placeholder={LABELS.LOGIN_INPUT}
            className='login-field'
            value={this.state.email}
            onChange={e => this.handleChange(e, 'email')}
            onKeyPress={this.onKeyPress}
          />
          <Input
            placeholder={LABELS.PASSWORD}
            className='login-field'
            type='password'
            value={this.state.password}
            onChange={e => this.handleChange(e, 'password')}
            onKeyPress={this.onKeyPress}
          />
          <div className='login-error-message'>{this.state.message}</div>
          <Button primary onClick={this.handleSubmit}>
          {LABELS.SIGN_UP}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
