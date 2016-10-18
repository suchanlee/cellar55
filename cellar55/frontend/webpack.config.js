var webpack = require('webpack');

module.exports = {
  entry: './scripts/index.tsx',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less', '.css']
  },
  module: {
    preLoaders: [
      { test: /\.tsx?$/, loader: 'tslint' }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
}
