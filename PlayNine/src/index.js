import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GithubCards from './GithubCards';
import PlayNine from './PlayNine';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<GithubCards />, document.getElementById('root'));
ReactDOM.render(<PlayNine />, document.getElementById('root'));
registerServiceWorker();
