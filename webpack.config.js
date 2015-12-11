/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var entry = [
  './src/app.jsx',
];
var plugins = [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  }),
];

var loaders = ['babel?presets[]=es2015,presets[]=react'];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      process: {env: {NODE_ENV: '"production"'}},
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
  ];
} else {
  entry = ['webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server'].concat(entry);
  plugins = [
    new webpack.DefinePlugin({
      process: {env: {NODE_ENV: '"development"'}},
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ];
  loaders = ['react-hot'].concat(loaders);
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
      test: /\.jsx?$/,
      loaders: loaders,
      exclude: /node_modules/
    }]
  }
};
