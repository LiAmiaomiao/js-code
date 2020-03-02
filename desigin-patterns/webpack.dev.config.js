const path = require('path')
const HtmlWbpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/, //略过的文件
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWbpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './release'),
    open: true, //自动打开浏览器
    port: 9000
  }
}