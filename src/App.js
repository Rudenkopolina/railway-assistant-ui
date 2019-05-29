import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import './App.css';

function App({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
