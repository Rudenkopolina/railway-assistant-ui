import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { connectRouter, routerMiddleware } from 'connected-react-router';
// import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './reducers';
import compose from './compose';
// import axios from './helpers/axios';

export async function configureStore(preloadedState, { history }) {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunkMiddleware
        // routerMiddleware(history)
        // axiosMiddleware(axios)
      )
    )
  );
}
