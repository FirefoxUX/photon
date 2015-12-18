/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entry = [
  './src/app.jsx'
];
var plugins = [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
];

var jsLoaders = ['babel?presets[]=es2015,presets[]=react'];
var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader');

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
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
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      process: {env: {NODE_ENV: '"development"'}}
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]);
  jsLoaders = ['react-hot'].concat(jsLoaders);
  cssLoader = 'style!css!sass';
}

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.s?css$/,
      loader: cssLoader
    },{
      test: /\.jsx?$/,
      loaders: jsLoaders,
      exclude: /node_modules/
    }]
  }
};
