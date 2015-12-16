'use strict';

const generateSources = require('./generateSources');

function counter(state, action) {
  if (!state) {
    const sources = generateSources();
    state = { sources: sources,
      selectedSourceName: sources[0].title,
      selectedSubpage: null };
  }
  var newState;
  switch (action.type) {
  case 'PAGE':
    newState = Object.assign({}, state,
      {selectedSourceName: action.data,
        selectedSubpage: null});
    return newState;
  case 'SUBPAGE':
    newState = Object.assign({}, state,
      {selectedSubpage: action.data});
    return newState;
  default:
    return state
  }
}

module.exports = counter;
