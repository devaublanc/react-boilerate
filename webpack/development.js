const PATHS = require('./_config')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            PATHS.dev
        ],
        vendor: ['react']
    },
    output: {
        path: PATHS.build,
        filename: '[name].dev.js',
        publicPath: PATHS.build
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'react',
                        ['es2015', { 'modules': false }]
                    ],
                    plugins: [
                        'react-hot-loader/babel',
                        'transform-decorators-legacy',
                        'babel-plugin-syntax-trailing-function-commas',
                        'babel-plugin-transform-class-properties',
                        'babel-plugin-transform-export-extensions',
                        'babel-plugin-transform-object-rest-spread',
                        'transform-runtime'
                    ]
                }
            }
        ]
    },
    devServer: {
        contentBase: PATHS.build,

        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback:{
            index: path.join(PATHS.build, 'index.html')
        },
        hot: true,
        inline: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env so this is easy to customize.
        //
        // If you use Vagrant or Cloud9, set
        // host: process.env.HOST || '0.0.0.0'
        //
        // 0.0.0.0 is available to all network devices unlike default
        // localhost
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
}
