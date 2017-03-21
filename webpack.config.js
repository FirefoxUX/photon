/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var failPlugin = require('webpack-fail-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

var pages = require('./contents/index.json')
  .map(x => x.pages || [x])
  .reduce((acc, val) => acc.concat(val), [])
  .map(x => {
    return { from: 'index.html', to: `../${x.file}` }
  });
var templates = require('./contents/index.json')
  .map(x => x.pages || [x])
  .reduce((acc, val) => acc.concat(val), [])
  .map(x => {
    return new HtmlWebpackPlugin({
      filename: `../contents/${x.file}`,
      template: `./contents/${x.file}`,
      inject: false,
      inlineSource: '\.css$'
    });
  });

var entry = [
  './src/app.jsx'
];
var basePlugins = [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
  failPlugin,
  new CopyWebpackPlugin([
    ...pages,
    { from: 'index.html', to: '../' },
    { from: 'contents/index.json', to: '../contents/index.json' },
    { from: 'images', to: '../images' },
    { from: '404.html', to: '../' }
  ]),
  ...templates,
  new WriteFilePlugin()
];

var jsLoaders = ['babel?presets[]=react,presets[]=es2015'];
var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
var publicPath = '/StyleGuide/static/';
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
  stylelint: {
    configFile: path.join(__dirname, './.stylelintrc')
  },
  plugins: plugins,
  module: {
    preLoaders: [{
      test: /\.s?css$/,
      loader: 'stylelint',
      exclude: /node_modules/
    },{
      test: /\.jsx?$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.html$/,
      loader: 'ejs-compiled'
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
