'use strict';

function getContent(file) {
  return (dispatch) => {
    return fetch(`contents/${file}.html`)
      .then(response => response.text())
      .then(text => dispatch({type: 'TEXT', text: text || ''}));
  }
}

module.exports = {
  getContent: getContent
};
