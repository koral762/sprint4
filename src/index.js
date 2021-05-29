import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import reportWebVitals from './reportWebVitals';
// import './assets/css/index.css'
import './assets/styles/styles.scss'
import { store } from "./store/store.js";



ReactDOM.render(
    <Provider store={store} >
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();