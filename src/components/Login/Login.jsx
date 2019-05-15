import React from 'react';
import './Login.css';

class Login extends React.Component {
  state = {
    login: '',
    password: ''
  };

  handleChange = (event, title) => {
    this.setState({ [title]: event.target.value });
  };

  render() {
    return (
      <div className='flex'>
        <div className='login-container'>
          <p className='header-text'>Пожалуйста, выполните вход</p>
          <form>
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
