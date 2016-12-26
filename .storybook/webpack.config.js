const path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../assets/react'),
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass'
        ]
      }
    ]
  }
}
