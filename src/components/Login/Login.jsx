import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
import './Login.css';

class Login extends React.Component {
  state = {
    login: '',
    password: ''
  }

  handleChange = (event, title) => {
    this.setState({ [title]: event.target.value })
  }

  render() {
    return (
      <div>
        <Grid textAlign='center' verticalAlign='middle' className="login-container">
          <Grid.Column className='login-form'>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large'>
              <Segment>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='Login'
                  value={this.state.login}
                  onChange={(e) => this.handleChange(e, 'login')}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e, 'password')}
                />
                <Button color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
