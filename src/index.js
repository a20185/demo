import React from 'react';
import ReactDOM from 'react-dom';
// import { Input , Tree } from 'element-react';
// import 'element-theme-default';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<TreeView/> , document.getElementById('root'));
registerServiceWorker();
