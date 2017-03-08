/* global process:false */
'use strict';
const PREFIX = (process.env.NODE_ENV === 'development') ? '' : '/StyleGuide';

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
  var current_index = pages.indexOf(page);
  var previous_page = pages[current_index - 1] || pages[pages.length - 1];
  var next_page = pages[current_index + 1] || pages[0];
  return { previous_page, next_page }
}

module.exports = {getPage, parsePath, getUrl, getSiblingPages};
