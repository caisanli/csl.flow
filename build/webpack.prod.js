const merge = require('webpack-merge');
const base = require('./webpack.base');
// 打包时先清空打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 静态资源拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: ['./public']
    })
  ]
});