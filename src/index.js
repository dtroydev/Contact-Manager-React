// ui library DOM attachment to root ui component
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
