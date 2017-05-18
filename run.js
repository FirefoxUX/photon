'use strict';

var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var frontendConfig = require('./webpack.config.js');

var pages = frontendConfig.pages
  .map(x => {
    if (x.directory) {
      return `/${x.directory}/${x.file}`;
    }
    return `/${x.file}`;
  });

new WebpackDevServer(webpack(frontendConfig), {
  publicPath: frontendConfig.output.publicPath,
  hot: true,
  contentBase: 'dist',
  proxy: [{
    context: pages,
    target: 'http://localhost:3000/index.html',
    pathRewrite: {'/.*\.html' : ''}
  }]
}).listen(3000, 'localhost', function () {});

var app = express();

app.use(express.static('.'));
app.listen(4000);
