import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import CEPList from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<CEPList />, document.getElementById('teste'));

registerServiceWorker();
