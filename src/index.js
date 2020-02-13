import ReactDOM from 'react-dom'
import Loader from '../src/components/loader/Loader';
import 'antd/dist/antd.less'  
import 'antd/dist/antd.css'
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "animate.css/animate.min.css";
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App';
import React from 'react';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//       navigator.serviceWorker.register('/ServiceWorker.js').then(function(registration) {
//         // Registration successful
//         console.log('ServiceWorker registration was successful with scope: ', registration.scope);
//       }, function(err) {
//         // Registration failed
//         console.log('ServiceWorker registration failed with error: ', err);
//       });
//     });
//   }


ReactDOM.render(<App>
    <Loader></Loader>
</App>,document.getElementById('root'));

