const PATHS = require('./_config')

const webpack = require('webpack')
const webpackPostcssTools = require('webpack-postcss-tools')
const globalMap = webpackPostcssTools.makeVarMap('src/config/css/global.css')
const autoprefixer = require('autoprefixer')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssRebeccaPurple = require('postcss-color-rebeccapurple')
const postcssSvgInline = require('postcss-inline-svg')
const postcssCalc = require('postcss-calc')
const postCssHexRgba = require('postcss-hexrgba')

const variablesMap = Object.assign({}, globalMap.vars)


module.exports = {
    performance: {
        hints: false
    },
    target: 'web',

    resolve: {
        modules: [PATHS.src, PATHS.lib],
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader'
            },
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
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
                        'transform-decorators-legacy',
                        'babel-plugin-syntax-trailing-function-commas',
                        'babel-plugin-transform-class-properties',
                        'babel-plugin-transform-export-extensions',
                        'babel-plugin-transform-object-rest-spread',
                        'transform-runtime'
                    ]
                }
            },
            {
                test: /\.json?$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            },
            { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [
                    autoprefixer,
                    postcssCustomProperties({
                        variables: variablesMap
                    }),
                    postcssRebeccaPurple,
                    postcssSvgInline,
                    postcssCalc(),
                    postCssHexRgba
                ]
            }
        })
    ]
}
