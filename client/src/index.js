import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'

import App from './App';
import './index.css';
import './config.js';
import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

