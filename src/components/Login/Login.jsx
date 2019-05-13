import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
import './Login.css';

class Login extends React.Component {
  state = {
    login: '',
    password: ''
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
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Login' />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
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
