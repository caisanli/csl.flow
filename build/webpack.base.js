const path = require('path');

// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// html
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, './../dist')
  },
  resolve: {
    alias: { // 配置别名
      '@': path.resolve(__dirname, './../src'),
      '@ast': path.resolve(__dirname, './../src/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          // 替换style-loader
          MiniCssExtractPlugin.loader,
          // { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              // camelCase: true,
              modules: true
            }
          }
        ],
        exclude: /node_modules/
      },
      { // 图片文件
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240, //10K
                    esModule: false,
                    name: 'image/[name]_[hash:6].[ext]'
                }
            }
        ],
        exclude: /node_modules/
      },
      { // 字体文件
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10240, //10K
                    esModule: false,
                    name: 'fonts/[name]_[hash:6].[ext]'
                }
            }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};