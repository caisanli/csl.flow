const merge = require('webpack-merge');
const base = require('./webpack.base');
// 打包时先清空打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 静态资源拷贝
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 拆分css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
console.log(base)
module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true
                }
            }
        ],
        exclude: /node_modules/
    },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: ['./public']
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css'
    })
  ]
});