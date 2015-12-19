'use strict';

const sources = require('json!../../contents/index.json');
const { UPDATE_PATH } = require('redux-simple-router');

function parsePath(path, sources) {
  path = path.split('/').concat([null, null]);
  path.shift();
  var [page, subpage] = path;
  page = sources.find(item => item.file === page);
  if (page) {
    subpage = page.subpages.find(item => item.file === subpage);
  }
  return [page, subpage];
}

function counter(state, action) {
  if (!state) {
    state = { sources: sources,
      page: null,
      subpage: null,
      text: ''};
  }
  var newState;
  switch (action.type) {
  case "@@router/INIT_PATH":
  case UPDATE_PATH:
    let [page, subpage] = parsePath(action.payload.path, state.sources);
    newState = Object.assign({}, state,
      {page: page,
        subpage: subpage,
        text: action.text || ''});
    return newState;
  case 'TEXT':
    newState = Object.assign({}, state, {text: action.text || ''});
    return newState;
  default:
    return state
  }
}

module.exports = counter;
