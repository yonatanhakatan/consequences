const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const pxtorem = require('postcss-pxtorem');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

module.exports = {
  entry: ['babel-polyfill', './assets/react/app.js'],
  output: {
    path: path.resolve(__dirname, 'public/_build/'),
    publicPath: '/_build/',
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'assets/react'),
        exclude: /(node_modules|bower_components)/,
        loaders: ['eslint'],
      },
    ],
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'assets/react'), loaders: ['babel?cacheDirectory'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(jpe?g|png|gif)$/i, loaders: ['file'] },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'assets'),
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss!sass'
        ),
      },
    ],
  },
  plugins: [
    // Hash the files using MD5 so that their names change when content changes.
    new WebpackMd5Hash(),

    // Optimize the order that items are bundled.
    // This assures the hash is deterministic.
    new webpack.optimize.OccurenceOrderPlugin(),

    // Tells React to build in prod mode.
    // https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin(),

    new ExtractTextPlugin('app.css', {
      allChunks: true,
    }),
  ],
  postcss: () => (
    [autoprefixer, pxtorem]
  ),
  watchOptions: {
    poll: true,
  },
};
