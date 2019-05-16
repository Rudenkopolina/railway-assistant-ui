import React from 'react';
import { initAxiosInstance } from './helpers/axios'
import Answers from './components/Answers/Answers';
import LogIn from './components/Login/Login';
import Intents from './components/Intents/Intent-logs';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
const createBrowserHistory = require("history").createBrowserHistory;

function App() {
  const history = createBrowserHistory();
  initAxiosInstance(history);
  return (
    <Router>
        <Route exact path="/" render={() => (
          <Redirect to="/login"/>
        )}/>
        <Route path="/login" component={LogIn} />
        <Route path="/responses" component={Answers} />
        <Route path="/intents" component={Intents} />
      </Router>
  );
}

export default App;
