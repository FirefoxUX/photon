var ejs = require('ejs'),
  uglify = require('uglify-js');


module.exports = function (source) {
  this.cacheable && this.cacheable();
  var template = ejs.compile(source, {
    client: true,
    filename: '.',
    webpack: this
  });

  var ast = uglify.parser.parse(template.toString());

  return 'module.exports = ' + uglify.uglify.gen_code(ast, {beautify: true});
};
