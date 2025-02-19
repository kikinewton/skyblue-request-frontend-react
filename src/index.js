import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'
import { HashRouter as Router } from "react-router-dom"
import { history } from "./util/browser-history"

ReactDOM.render(
    <Provider store={store}>
      <Router history={history} basename={process.env.PUBLIC_URL}>
      {/* <Router history={history}> */}
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
