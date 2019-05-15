import React from 'react';
import Answers from './components/Answers/Answers';
import LogIn from './components/Login/Login';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
        <Route exact path="/" render={() => (
          <Redirect to="/login"/>
        )}/>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/answers" component={Answers} />
      </Router>
  );
}

export default App;
