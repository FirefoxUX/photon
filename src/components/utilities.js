'use strict';

function parsePath(path) {
  return path.split('/').concat([null, null]).slice(1);
}

function getPages(path, sources) {
  var [page, subpage] = parsePath(path);
  page = sources.find(item => item.file === page);
  if (page) {
    subpage = page.subpages.find(item => item.file === subpage);
  }
  return [page, subpage];
}

module.exports = {getPages, parsePath};
