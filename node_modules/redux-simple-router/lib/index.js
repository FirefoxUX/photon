'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeReducer = exports.UPDATE_PATH = undefined;
exports.pushPath = pushPath;
exports.replacePath = replacePath;
exports.syncReduxAndRouter = syncReduxAndRouter;

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants

var INIT_PATH = '@@router/INIT_PATH';
var UPDATE_PATH = exports.UPDATE_PATH = '@@router/UPDATE_PATH';
var SELECT_STATE = function SELECT_STATE(state) {
  return state.routing;
};

// Action creators

function initPath(path, state) {
  return {
    type: INIT_PATH,
    payload: {
      path: path,
      state: state,
      replace: false,
      avoidRouterUpdate: true
    }
  };
}

function pushPath(path, state) {
  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$avoidRouterUpdat = _ref.avoidRouterUpdate;
  var avoidRouterUpdate = _ref$avoidRouterUpdat === undefined ? false : _ref$avoidRouterUpdat;

  return {
    type: UPDATE_PATH,
    payload: {
      path: path,
      state: state,
      replace: false,
      avoidRouterUpdate: !!avoidRouterUpdate
    }
  };
}

function replacePath(path, state) {
  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref2$avoidRouterUpda = _ref2.avoidRouterUpdate;
  var avoidRouterUpdate = _ref2$avoidRouterUpda === undefined ? false : _ref2$avoidRouterUpda;

  return {
    type: UPDATE_PATH,
    payload: {
      path: path,
      state: state,
      replace: true,
      avoidRouterUpdate: !!avoidRouterUpdate
    }
  };
}

// Reducer

var initialState = {
  changeId: 1,
  path: undefined,
  state: undefined,
  replace: false
};

function update() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var _ref3 = arguments[1];
  var type = _ref3.type;
  var payload = _ref3.payload;

  if (type === INIT_PATH || type === UPDATE_PATH) {
    return _extends({}, state, {
      path: payload.path,
      changeId: state.changeId + (payload.avoidRouterUpdate ? 0 : 1),
      state: payload.state,
      replace: payload.replace
    });
  }
  return state;
}

// Syncing

function locationsAreEqual(a, b) {
  return a != null && b != null && a.path === b.path && (0, _deepEqual2.default)(a.state, b.state);
}

function createPath(location) {
  var pathname = location.pathname;
  var search = location.search;
  var hash = location.hash;

  var result = pathname;
  if (search) result += search;
  if (hash) result += hash;
  return result;
}

function syncReduxAndRouter(history, store) {
  var selectRouterState = arguments.length <= 2 || arguments[2] === undefined ? SELECT_STATE : arguments[2];

  var getRouterState = function getRouterState() {
    return selectRouterState(store.getState());
  };

  // To properly handle store updates we need to track the last route.
  // This route contains a `changeId` which is updated on every
  // `pushPath` and `replacePath`. If this id changes we always
  // trigger a history update. However, if the id does not change, we
  // check if the location has changed, and if it is we trigger a
  // history update. It's possible for this to happen when something
  // reloads the entire app state such as redux devtools.
  var lastRoute = undefined;

  if (!getRouterState()) {
    throw new Error('Cannot sync router: route state does not exist. Did you ' + 'install the routing reducer?');
  }

  var unsubscribeHistory = history.listen(function (location) {
    var route = {
      path: createPath(location),
      state: location.state
    };

    if (!lastRoute) {
      // `initialState` *should* represent the current location when
      // the app loads, but we cannot get the current location when it
      // is defined. What happens is `history.listen` is called
      // immediately when it is registered, and it updates the app
      // state with an UPDATE_PATH action. This causes problem when
      // users are listening to UPDATE_PATH actions just for
      // *changes*, and with redux devtools because "revert" will use
      // `initialState` and it won't revert to the original URL.
      // Instead, we specialize the first route notification and do
      // different things based on it.
      initialState = {
        changeId: 1,
        path: route.path,
        state: route.state,
        replace: false
      };

      // Also set `lastRoute` so that the store subscriber doesn't
      // trigger an unnecessary `pushState` on load
      lastRoute = initialState;

      store.dispatch(initPath(route.path, route.state));
    } else if (!locationsAreEqual(getRouterState(), route)) {
      // The above check avoids dispatching an action if the store is
      // already up-to-date
      var method = location.action === 'REPLACE' ? replacePath : pushPath;
      store.dispatch(method(route.path, route.state, { avoidRouterUpdate: true }));
    }
  });

  var unsubscribeStore = store.subscribe(function () {
    var routing = getRouterState();

    // Only trigger history update if this is a new change or the
    // location has changed.
    if (lastRoute.changeId !== routing.changeId || !locationsAreEqual(lastRoute, routing)) {

      lastRoute = routing;
      var method = routing.replace ? 'replaceState' : 'pushState';
      history[method](routing.state, routing.path);
    }
  });

  return function unsubscribe() {
    unsubscribeHistory();
    unsubscribeStore();
  };
}

exports.routeReducer = update;
