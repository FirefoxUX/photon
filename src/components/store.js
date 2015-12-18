'use strict';

const sources = require('json!../../contents/index.json');

function counter(state, action) {
  if (!state) {
    state = { sources: sources,
      selectedSourceName: sources[0].title,
      selectedSubpage: null,
      text: ''};
  }
  var newState;
  switch (action.type) {
  case 'PAGE':
    newState = Object.assign({}, state,
      {selectedSourceName: action.data,
        selectedSubpage: null,
        text: action.text});
    return newState;
  case 'SUBPAGE':
    newState = Object.assign({}, state,
      {selectedSubpage: action.data,
        text: action.text});
    return newState;
  default:
    return state
  }
}

module.exports = counter;
