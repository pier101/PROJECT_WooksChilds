import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk'
import rootReducer from './modules'; 
import promiseMiddleware from 'redux-promise';
const logger = createLogger();
const store = createStore(rootReducer,applyMiddleware(promiseMiddleware,ReduxThunk,logger))

ReactDOM.render(
  
  <Provider store={store} >
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
