'use strict';

/**
 * Get new content, and notify the store.
 *
 * @param {function} dispatch - The Redux dispatcher.
 * @param {string} file - The name of the file we’re getting.
 */
function getContent(dispatch, file) {
  // Put something innocuous in the text to indicate we're loading.
  dispatch({type: 'TEXT', text: '&nbsp;', file: file});
  return fetch(`contents/${file}.html`)
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        return `Error loading ${file}.html`;
      }
      return response.text()
    }).then(text => dispatch({type: 'TEXT', text: text || '', file: file}));
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

module.exports = {
  getContent: getContent,
  loadUrl: loadUrl
};
