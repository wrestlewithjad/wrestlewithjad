import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import LogInOut from './components/LogInOut'
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware =applyMiddleware()(createStore);
//For redux, you need to wrap your top component in a store.  When the store gets a new state, it refreshes everything.
ReactDOM.render(
 <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
