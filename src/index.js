import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createBrowserHistory } from 'history';
import bootstrap from './bootstrap';

document.addEventListener('DOMContentLoaded', async () => {

  const preloadedState = {};
  const history = createBrowserHistory();
  const store = await bootstrap(preloadedState, { history });

  ReactDOM.render(
    <App store={store}
      history={history}
    />,
    document.getElementById('root')
  );
});
