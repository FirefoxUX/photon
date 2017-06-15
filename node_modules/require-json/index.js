// @see http://nodejs.org/api/all.html#all_require_extensions
var fs = require('fs');

require.extensions['.json'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  // Parse the file content and give to module.exports
  content = JSON.parse(content);
  module.exports = content;
};
