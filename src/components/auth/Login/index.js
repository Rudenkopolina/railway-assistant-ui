import React from 'react';
import './styles.css';
import { Input } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { login } from '../../../redux/actions/auth';
import UrlRestoringService from '../../../services/url_restoring_service';

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
				this.setState({ message: 'Неверный логин или пароль.' });
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

  render() {
    return (
      <div className='login-wrapper'>
      <div className='login-background-image' />
      <div className='login-background' />
      <div className='login-title'>Assistant Client</div>
        <div className='login-card'>
          <span className='login-header-text'>Пожалуйста, выполните вход</span>
          <Input
            placeholder='Введите логин'
            className='login-field'
            value={this.state.email}
            onChange={e => this.handleChange(e, 'email')}
          />
          <Input
            placeholder='Введите пароль'
            className='login-field'
            type='password'
            value={this.state.password}
            onChange={e => this.handleChange(e, 'password')}
          />
          <div className='login-error-message'>{this.state.message}</div>
          <button onClick={this.handleSubmit}  className='login-submit-button'>
            Войти
          </button>
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
