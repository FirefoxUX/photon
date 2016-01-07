'use strict';

/**
 * Get new content, and notify the store.
 *
 * @param {function} dispatch - The Redux dispatcher.
 * @param {string} file - The name of the file we’re getting.
 */
function getContent(dispatch, file) {
  // Put something innocuous in the text to indicate we're loading.
  dispatch({type: 'TEXT', text: '&nbsp;'})
  return fetch(`contents/${file}.html`)
    .then(response => response.text())
    .then(text => dispatch({type: 'TEXT', text: text || ''}));
}

/**
 * Notifies the store that we’ve navigated to a new section.
 *
 * @param {function} dispatch - The Redux dispatcher.
 * @param {string} section - The title of the section we’ve navigated to.
 */
function newSection(dispatch, section) {
  // Put something innocuous in the text to indicate we're loading.
  dispatch({type: 'NEW_SECTION', section: section})
}

module.exports = {
  getContent: getContent,
  newSection: newSection
};
