var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var frontendConfig = require('./webpack.config.js')[0];

var pages = require('./contents/index.json')
  .map(x => x.pages || [x])
  .reduce((acc, val) => acc.concat(val), [])
  .map(x => {
    return `/${x.file}`
  });

new WebpackDevServer(webpack(frontendConfig), {
  publicPath: frontendConfig.output.publicPath,
  hot: true,
  proxy: [{
    context: pages,
    target: 'http://localhost:3000/index.html',
    pathRewrite: {'/.*\.html' : ''}
  }]
}).listen(3000, 'localhost', function () {});

var app = express();

app.use(express.static('.'));
app.listen(4000);
