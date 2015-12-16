const React = require('react');
const ReactDOM = require('react-dom');

const { createStore } = require('redux');
const { Provider } = require('react-redux');

const App = require('./components/App.jsx');
const reducer = require('./components/store.js');

var store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App/></Provider>,
  document.querySelector('#mount'));
