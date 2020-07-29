import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoggedinApp from './LoggedinApp';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';


//get login details
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

fetch('http://localhost:3000/api/v1.0/users/login/', {
  method: 'POST',
  headers: {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization' : 'Basic ' + window.btoa(username + ':' + password)
  },
}).then(res => {
  if(res.ok){
    ReactDOM.render(
      <Router>
        <LoggedinApp />
      </Router>,
      document.getElementById('root')
    );

  } else {
    ReactDOM.render(
      <Router>
        <App />
      </Router>,
      document.getElementById('root')
    );
  }
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
