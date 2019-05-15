import React from 'react';
import './Login.css';
import axios from 'axios';

class Login extends React.Component {
  state = {
    login: '',
    password: ''
  };

  handleChange = (event, title) => {
    this.setState({ [title]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    return axios({
      method: 'post',
      headers: {'content-type': 'application/json', "Authorization":'Basic ' + new Buffer.from(this.state.login + ':' + this.state.password).toString('base64')},
      baseURL: `http://172.16.6.253:1000/api/auth/`,
    })
    .then(res => {
      console.log(res);
  });
}

  render() {
    return (
      <div className='flex'>
        <div className='login-container'>
          <p className='header-text'>Пожалуйста, выполните вход</p>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder='Введите логин'
              className='input'
              value={this.state.login}
              onChange={e => this.handleChange(e, 'login')}
            />
            <input
              placeholder='Введите пароль'
              className='input'
              type='password'
              value={this.state.password}
              onChange={e => this.handleChange(e, 'password')}
            />
            <input type='submit' value='Войти' className='login-button' />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
