const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './assets/react/app.js'],
  output: {
    path: path.resolve(__dirname, 'public/_build/'),
    publicPath: '/_build/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
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
      { test: /\.json$/, loader: 'json' },
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
