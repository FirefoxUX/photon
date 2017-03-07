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

module.exports = {getPage, parsePath, getUrl};
