'use strict';

const {sources, pages} = mungeSources(require('json!../../contents/index.json'));
const { UPDATE_PATH } = require('redux-simple-router');
const { parsePath } = require('./utilities.js');

function mungeSources(sources) {
  let pages = []
  sources.forEach(source => {
    let sourcePages = source.pages || [source];
    sourcePages.forEach(page => {
      page.category = source.title;
      page.directory = source.directory || '';
      pages.push(page);
    })
  })
  return {sources, pages};
}

function store(state, action) {
  if (!state) {
    state = {
      sources: sources,
      pages: pages,
      text: '',
      file: '',
      url: ''};
  }
  switch (action.type) {
  case "@@router/INIT_PATH":
  case UPDATE_PATH:
    if (state.file === parsePath(action.payload.path)[1]) {
      return Object.assign({}, state);
    }
    return Object.assign({}, state, {text: '', file: '', url: ''});
  case 'TEXT':
    if (action.text !== '&nbsp;' && action.file !== state.file) {
      // Previous fetch completed, ignore it.
      return state;
    }
    return Object.assign({}, state, {text: action.text || '', file: action.file});
  case 'URL':
    return Object.assign({}, state, {url: action.url || ''});
  default:
    return state;
  }
}

module.exports = store;
