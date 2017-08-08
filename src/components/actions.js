'use strict';

const { PREFIX } = require('./utilities.js');

/**
 * Get new content, and notify the store.
 *
 * @param {function} dispatch - The Redux dispatcher.
 * @param {string} file - The name of the file we’re getting.
 */
function getContent(dispatch, page) {
  let file = page.file;
  if (page.directory !== '') {
    file = `${page.directory}/${page.file}`;
  }
  // Put something innocuous in the text to indicate we're loading.
  dispatch({type: 'TEXT', text: '&nbsp;', file: file});
  return fetch(`${PREFIX}/contents/${file}`)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        return `Error loading ${file}`;
      }
      return response.text()
    }).then(text => {
      dispatch({type: 'TEXT', text: text || '', file: file});
      if (window.location.hash) {
        window.location.replace(window.location);
      }
    });
}

/**
 * Get a url, and notify the store.
 *
 * @param {function} dispatch - The Redux dispatcher.
 * @param {string} url - The name of the url.
 */
function loadUrl(dispatch, url) {
  // Put something innocuous in the text to indicate we're loading.
  dispatch({type: 'URL', url: url});
}

function changeFeedbackMessage(dispatch, feedback_ask) {
  // Put something innocuous in the text to indicate we're loading.
  dispatch({type: 'FEEDBACK', feedback_ask: feedback_ask});
}

module.exports = {
  getContent: getContent,
  loadUrl: loadUrl,
  changeFeedbackMessage: changeFeedbackMessage
};
