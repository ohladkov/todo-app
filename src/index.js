import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import App from './components/App';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage.js';
import './index.css';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
