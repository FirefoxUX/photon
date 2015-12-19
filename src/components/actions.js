'use strict';

function getContent(dispatch, file) {
  // Put something innocuous in the text to indicate we're loading.
  dispatch({type: 'TEXT', text: '&nbsp;'})
  return fetch(`contents/${file}.html`)
    .then(response => response.text())
    .then(text => dispatch({type: 'TEXT', text: text || ''}));
}

module.exports = {
  getContent: getContent
};
