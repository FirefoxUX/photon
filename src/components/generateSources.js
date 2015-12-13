'use strict';

var data = require('json!../../contents/index.json');

function generateSources() {
  return data.map(e => ({name: e.title, text: e.file}));
}

module.exports = generateSources;
