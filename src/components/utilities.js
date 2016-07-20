'use strict';

function parsePath(path) {
  return path.split('/').concat([null])[1];
}

function getPage(path, pages) {
  var page = parsePath(path);
  page = pages.find(item => item.file === page);
  return page;
}

module.exports = {getPage, parsePath};
