'use strict';

const sources = require('json!../../contents/index.json');
const { UPDATE_PATH } = require('redux-simple-router');

function store(state, action) {
  if (!state) {
    state = { sources: sources, text: '', file: '', url:'', section: null, sections: [] };
  }
  switch (action.type) {
  case "@@router/INIT_PATH":
  case UPDATE_PATH:
    return Object.assign({}, state, {text: '', file: '', url:'', section: null, sections: []});
  case 'TEXT':
    if (action.text !== '&nbsp;' && action.file !== state.file) {
      // Previous fetch completed, ignore it.
      return state;
    }
    return Object.assign({}, state, {text: action.text || '', file: action.file});
  case 'URL':
    return Object.assign({}, state, {url: action.url || ''});
  case 'NEW_SECTION':
    return Object.assign({}, state, {section: action.section});
  case 'NEW_SECTIONS':
    return Object.assign({}, state, {sections: action.sections});
  default:
    return state;
  }
}

module.exports = store;
