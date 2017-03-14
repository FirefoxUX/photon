'use strict';

const {sources, pages} = mungeSources(require('json!../../contents/index.json'));
const { UPDATE_PATH } = require('redux-simple-router');
const { parsePath } = require('./utilities.js');

function mungeSources(sources) {
  let pages = []
  sources.forEach(source => {
    let sourcePages = source.pages || [source];
    sourcePages.forEach(page => {
      pages.push(Object.assign({'category':source.title}, page));
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
      url: '',
      header: '',
      header_description: '',
      header_links: [] };
  }
  switch (action.type) {
  case "@@router/INIT_PATH":
  case UPDATE_PATH:
    if (state.file === parsePath(action.payload.path)) {
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
  case 'UPDATE_HEADER':
    return Object.assign({}, state, {header: action.header || '', header_description: action.header_description || '', header_links: action.header_links});
  default:
    return state;
  }
}

module.exports = store;
