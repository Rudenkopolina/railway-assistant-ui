import React from 'react';
import axios from 'axios';
import './Login.css';

class Login extends React.Component {
  state = {
    login: '',
    password: ''
  };

  render() {
    return (
      <div className='flex'>
        <div className='login-container'>
          <p className='header-text'>Пожалуйста, выполните вход</p>
          <form>
            <input placeholder='Введите логин' className="input"
            />
            <input placeholder='Введите пароль' className="input"
            />
            <input type='submit' value='Войти' className='login-button'/>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
