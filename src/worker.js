'use strict';

var hljs = require('highlight.js');

onmessage = function(event) {
  var result = hljs.highlightAuto(event.data.text);
  postMessage({index: event.data.index, text: result.value});
}
