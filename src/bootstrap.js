import { configureStore } from './redux/store';
import initialState from './redux/initialState';

export default async function (preloadedState = {}, { history }) {
  const state = initState(preloadedState);
  return configureStore(state, { history });
}

function initState(preloadedState) {
  return { ...initialState, ...preloadedState };
}
