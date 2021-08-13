const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');
const appDir = fs.realpathSync(process.cwd());
const pk = require('./package.json');

module.exports = {
  entry: {
    main: path.resolve(appDir, pk.main)
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.tsx', '.ts', '.js', '.json'],
    mainFiles: ['index'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: ["ts-loader"]
      },
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      },
      {
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: ["html-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDir, pk.html),
      title: pk.name,
      favicon: pk.favicon,
    })
  ],
  appdir: appDir
}
