import React from 'react';
import './Login.css';
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
      <div className='flex'>
        <div className='login-container'>
          <p className='header-text'>Пожалуйста, выполните вход</p>
          <div >
            <input
              placeholder='Введите логин'
              className='login-input'
              value={this.state.email}
              onChange={e => this.handleChange(e, 'email')}
            />
            <input
              placeholder='Введите пароль'
              className='login-input'
              type='password'
              value={this.state.password}
              onChange={e => this.handleChange(e, 'password')}
            />
            <div className='login-error-message'>{this.state.message}</div>
            <input type='button' value='Войти' onClick={this.handleSubmit}  className='login-button' />
          </div>
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
