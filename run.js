var path = require('path');
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var frontendConfig = require('./webpack.config.js')[0];

new WebpackDevServer(webpack(frontendConfig), {
  publicPath: frontendConfig.output.publicPath,
  hot: true
}).listen(3000, 'localhost', function (err, result) {
  if(err) {
    console.log(err);
  }
  else {
    console.log('webpack dev server listening at http://localhost:3000/');
  }
});

var app = express();

app.use(express.static('.'));
console.log('Server listening');
app.listen(4000);
