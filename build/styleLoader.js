/**
 * 样式loader配置
 */
const path = require('path')
// 拆分css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (env) {
    const base = {
        test: /\.(css|less)$/,
        use: [{
            loader: 'css-loader',
            options: {
                modules: {
                    mode: (resourcePath) => {
                        // 兼容window和mac的路径 将分隔符统一
                        resourcePath = resourcePath.split(path.sep).join('/');
                        if(/src\/pages\//.test(resourcePath) || /src\/components\//.test(resourcePath)) 
                            return 'local';
                        return 'global';
                    },
                    localIdentName: env === 'dev' ? '[path][name]__[local]--[hash:base64:5]':'[hash:base64]', // 自定义html显示的className
                },
                sourceMap: true,
                localsConvention: 'camelCase', // 将样式文件的 box-header 导入后 改为 boxHeader
            },
        }, {
            loader: require.resolve('less-loader'), // compiles Less to LESS
            options: {
                sourceMap: true,
            },
        }, {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    // 设置全局变量
                    path.resolve(__dirname, '../src/assets/css/theme.less'),
                ],
            },
        }]
        // ,
        // exclude: /node_modules/,
    }
    if (env === 'dev') {
        base.use.unshift({ loader: 'style-loader' })
        return base
    } else {
        base.use.unshift({ loader: MiniCssExtractPlugin.loader })
        return base
    }
}
