var webpack = require('webpack');
// var PrettierPlugin = require('prettier-webpack-plugin');

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
      { test: /\.tsx?$/, loader: 'tslint' },
    ],
    loaders: [
      { test: /node_modules.*\.js$/, loader: 'source-map-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  // plugins: [
  //   new PrettierPlugin({
  //     extensions: ['.ts', '.tsx', '.less']
  //   })
  // ],
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
}
