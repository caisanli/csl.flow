const path = require('path');

// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置style-loader
let styleLoader = {
    loader: null,
    options: {}
}

function resolve(_path) {
    return path.resolve(__dirname, _path);
}
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'js/bundle.js',
        path: resolve('./../dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 配置后缀识别
        alias: { // 配置别名
            '@': resolve('./../src'),
            '@ast': resolve('./../src/assets'),
            '@pages': resolve('./../src/pages'),
            '@comp': resolve('./../src/components'),
            '@assets': resolve('./../src/assets')
        }
    },
    optimization: { // 代码分隔
        splitChunks: {
            chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
            minSize: 30000,//合并前模块文件的体积
            minChunks: 1,//最少被引用次数
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',//自动命名连接符
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,//敲黑板
                    priority: -10//优先级更高
                },
                default: {
                    test: /[\\/]src[\\/]js[\\/]/,
                    minChunks: 2,//一般为非第三方公共模块
                    priority: -20,
                    reuseExistingChunk: true
                }
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
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
        
    ]
};