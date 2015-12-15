'use strict';

var data = require('json!../../contents/index.json');

function generateSources() {
  return data.map(e => {
    e.text = '';
    fetch(`contents/${e.file}`).then(response => {
      return response.text();
    }).then(text => {
      e.text = text;
    });
    return e;
  });
}

module.exports = generateSources;
