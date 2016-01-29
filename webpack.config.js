/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entry = [
  './src/app.jsx'
];
var basePlugins = [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
];

var jsLoaders = ['babel?presets[]=es2015,presets[]=react'];
var cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
var publicPath = '/StyleGuide/static/';

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
    new webpack.NoErrorsPlugin()
  ]);
  jsLoaders = ['react-hot'].concat(jsLoaders);
  cssLoader = 'style!css!sass';
  publicPath = '/static/';
}

module.exports = [{
  devtool: 'source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'static'),
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
}, {
  entry: {
    controls: './src/styles/controls.scss'
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'css/deleteme.js'
  },
  plugins: basePlugins.concat([
    new ExtractTextPlugin('css/[name].css', {
      allChunks: true
    })
  ]),
  sassLoader: {
    outputStyle: 'expanded'
  },
  module: {
    loaders: [{
      test: /\.(svg|png)$/,
      loader: 'file'
    },{
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-minimize!sass-loader')
    }]
  }
}];
