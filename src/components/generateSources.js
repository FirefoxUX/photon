'use strict';

var data = require('json!../../contents/index.json');

function generateSources() {
  return data.map(e => {
    let rv = {name: e.title, text: ''};
    fetch(`contents/${e.file}`).then(response => {
      return response.text();
    }).then(text => {
      rv.text = text;
    });
    return rv
  });
}

module.exports = generateSources;
