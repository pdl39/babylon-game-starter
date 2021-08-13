const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const appDir = fs.realpathSync(process.cwd());

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(appDir, 'src'),
    historyApiFallback: true,
    hot: true,
    open: true,
    compress: true
  },
  output: {
    path: path.resolve(appDir, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/'
  }
});
