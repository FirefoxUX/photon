const React = require('react');
const ReactDOM = require('react-dom');

const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const thunkMiddleware = require('redux-thunk');
const createLogger = require('redux-logger');

const App = require('./components/App.jsx');
const reducer = require('./components/store.js');

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore)

var store = createStoreWithMiddleware(reducer);

ReactDOM.render(<Provider store={store}><App/></Provider>,
  document.querySelector('#mount'));
