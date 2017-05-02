/* global process:false */
'use strict';
const PREFIX = (process.env.NODE_ENV === 'development') ? '' : '/DesignSystem';

function parsePath(path) {
  return path.replace(PREFIX, '').replace(/#.*/, '').split('/').concat([null])[1];
}

function getPage(path, pages) {
  var page = parsePath(path);
  page = pages.find(item => item.file === page);
  return page;
}

function getUrl(page) {
  return PREFIX + '/' + page.file;
}

function getSiblingPages(page, pages) {
  const shown_pages = pages.filter(page => !page.hidden);
  var current_index = shown_pages.indexOf(page);
  var previous_page = shown_pages[current_index - 1] || shown_pages[shown_pages.length - 1];
  var next_page = shown_pages[current_index + 1] || shown_pages[0];
  return { previous_page, next_page }
}

module.exports = {getPage, parsePath, getUrl, getSiblingPages};
