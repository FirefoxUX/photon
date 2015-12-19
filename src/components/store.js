'use strict';

const sources = require('json!../../contents/index.json');
const { UPDATE_PATH } = require('redux-simple-router');

function store(state, action) {
  if (!state) {
    state = { sources: sources, text: ''};
  }
  switch (action.type) {
  case "@@router/INIT_PATH":
  case UPDATE_PATH:
    return Object.assign({}, state, {text: ''});
  case 'TEXT':
    return Object.assign({}, state, {text: action.text || ''});
  default:
    return state;
  }
}

module.exports = store;
