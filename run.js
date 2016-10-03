var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var frontendConfig = require('./webpack.config.js')[0];

new WebpackDevServer(webpack(frontendConfig), {
  publicPath: frontendConfig.output.publicPath,
  hot: true
}).listen(3000, 'localhost', function () {});

var app = express();

app.use(express.static('.'));
app.listen(4000);
