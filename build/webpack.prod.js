const merge = require('webpack-merge');
const base = require('./webpack.base');
// 打包时先清空打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 静态资源拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLoader = require('./styleLoader');
// 拆分css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [StyleLoader('prod')]
  },
  plugins: [
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!build*', '!library']
    }),
    new CopyWebpackPlugin({
      patterns: ['./public']
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css'
    }),
    new BundleAnalyzerPlugin()
  ]
});