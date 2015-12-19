/* global process:false */

'use strict';

require('./styles/base.css');
require('./styles/colours.css');

const React = require('react');
const ReactDOM = require('react-dom');
const { Router, Route } = require('react-router');

const { createStore, applyMiddleware, combineReducers } = require('redux');
const { Provider } = require('react-redux');
const thunkMiddleware = require('redux-thunk');
const createLogger = require('redux-logger');
const { createHashHistory } = require('history');
const { syncReduxAndRouter, routeReducer, pushPath } = require('redux-simple-router');

const { getContent } = require('./components/actions.js');
const data = require('./components/store.js');
const App = require('./components/App.jsx');
const reducer = combineReducers(Object.assign({},
  {data: data},
  {routing: routeReducer}
));

const loggerMiddleware = createLogger();
var createStoreWithMiddleware;
if (process.env.NODE_ENV === 'development') {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )(createStore);
}

var store = createStoreWithMiddleware(reducer);

var history = createHashHistory({queryKey: false});
syncReduxAndRouter(history, store);

function onUpdate() {
  var {sources, page, subpage} = store.getState().data;
  var {path} = store.getState().routing;

  path = path.split('/').concat([null, null]);
  path.shift();
  path.shift();
  var subpath = path.shift();

  if (!page) {
    let url = '/' + sources[0].file;
    store.dispatch(pushPath(url));
    return;
  }
  if (subpath && !subpage) {
    let url = '/' + page.file;
    store.dispatch(pushPath(url));
    return;
  }
  if (page || subpage) {
    store.dispatch(getContent(subpage ? subpage.file : page.file));
  }
}

ReactDOM.render((<Provider store={store}>
    <Router history={history}
        onUpdate={onUpdate}
    >
      <Route component={App}
          path="*"
      />
    </Router>
  </Provider>),
  document.querySelector('#mount'));
