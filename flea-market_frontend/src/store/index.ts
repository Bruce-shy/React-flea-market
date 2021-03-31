import {
  createStore,
  compose,
  // applyMiddlewar,
  applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // 异步状态修改
import reducer from './reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
