'use strict';

/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var failPlugin = require('webpack-fail-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

function mungeSources(sources) {
  let pages = []
  sources.forEach(source => {
    let sourcePages = source.pages || [source];
    sourcePages.forEach(page => {
      pages.push(Object.assign({'directory':source.directory}, page));
    })
  })
  return pages;
}

var pages = mungeSources(require('./contents/index.json'));

var pagePlugins = pages.map(x => {
  let filename = `${x.file}`;
  if (x.directory) {
    filename = `${x.directory}/${x.file}`
  }
  return [
    new HtmlWebpackPlugin({
      filename: `../${filename}`,
      template: `./index.html`,
      inject: true,
      inlineSource: '\.css$'
    }),
    new HtmlWebpackPlugin({
      filename: `../contents/${filename}`,
      template: `./contents/${filename}`,
      inject: false,
      inlineSource: '\.css$'
    })
  ];
})
.reduce((acc, val) => acc.concat(val), []);

var entry = [
  './src/app.jsx'
];
var basePlugins = [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
  failPlugin,
  new CopyWebpackPlugin([
    { from: 'index.html', to: '../' },
    { from: 'robots.txt', to: '../' },
    { from: 'contents/index.json', to: '../contents/index.json' },
    { from: 'images', to: '../images' },
    { from: 'interactives', to: '../interactives' },
    { from: '404.html', to: '../' }
  ]),
  new HtmlWebpackPlugin({
    filename: `../index.html`,
    template: `./index.html`,
    inject: true,
    inlineSource: '\.css$'
  }),
  ...pagePlugins,
  new WriteFilePlugin(),
  new StyleLintPlugin({
    configFile: path.join(__dirname, './.stylelintrc')
  })
];

var jsLoaders = ['babel?presets[]=react,presets[]=es2015'];
var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
var publicPath = '/photon/static/';
var plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins = basePlugins.concat([
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      process: {env: {NODE_ENV: '"production"'}}
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]);
} else if (process.env.NODE_ENV === 'staging') {
  plugins = basePlugins.concat([
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      process: {env: {NODE_ENV: '"staging"'}}
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]);
  publicPath = '/photon-staging/static/';
} else {
  entry = ['webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server'].concat(entry);
  plugins = basePlugins.concat([
    new webpack.DefinePlugin({
      process: {env: {NODE_ENV: '"development"'}}
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new DashboardPlugin()
  ]);
  jsLoaders = ['react-hot'].concat(jsLoaders);
  cssLoader = 'style!css!sass';
  publicPath = '/static/';
}

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: 'bundle.js',
    publicPath: publicPath
  },
  pages: pages,
  plugins: plugins,
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.html$/,
      loader: 'ejs-render'
    },{
      test: /\.(svg|png)$/,
      loader: 'file'
    },{
      test: /\.s?css$/,
      loader: cssLoader
    },{
      test: /\.jsx?$/,
      loaders: jsLoaders,
      exclude: /node_modules/
    }]
  }
};
