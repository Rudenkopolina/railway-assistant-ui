import React from 'react';
import Answers from './components/Answers/Answers';
import LogIn from './components/Login/Login';
import Intents from './components/Intents/Intent-logs';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
        <Route exact path="/" render={() => (
          <Redirect to="/login"/>
        )}/>
        <Route path="/login" component={LogIn} />
        <Route path="/answers" component={Answers} />
        <Route path="/intents" component={Intents} />
      </Router>
  );
}

export default App;
