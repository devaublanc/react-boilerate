/*eslint no-undef: 0*/
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

// postcss
const webpackPostcssTools = require('webpack-postcss-tools');
const globalMap = webpackPostcssTools.makeVarMap('src/config/css/global.css');
const autoprefixer = require('autoprefixer');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssRebeccaPurple = require('postcss-color-rebeccapurple')
const postcssSvgInline = require('postcss-inline-svg')
const postcssCalc = require('postcss-calc')

const TARGET = process.env.npm_lifecycle_event;

const variablesMap = Object.assign({}, globalMap.vars);

const PATHS = {
    src: path.join(__dirname, 'src'),
    dev: path.join(__dirname, 'src/index.js'),
    build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;


/********************************************************************************************************************/
/********************************************************************************************************************/
/************************************************ COMMON ************************************************************/
/********************************************************************************************************************/
/********************************************************************************************************************/
const common = {

    // Add resolve.extensions.
    // '' is needed to allow imports without an extension.
    // Note the .'s before extensions as it will fail to match without!!!
    resolve: {
        modulesDirectories: [PATHS.src, 'node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        preLoaders: [
            {
                test: /\.css$/,
                loaders: ['postcss']
            },
            {
                test: /\.jsx?$/,
                loaders: ['eslint']
            }
        ],
        loaders: [
            {
                // Test expects a RegExp! Note the slashes!
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                // Enable caching for improved performance during development
                // It uses default OS directory by default. If you need something
                // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    postcss: [
        webpackPostcssTools.prependTildesToImports,
        autoprefixer,
        postcssCustomProperties({
            variables: variablesMap
        }),
        postcssRebeccaPurple,
        postcssSvgInline,
        postcssCalc()
    ]
};

/********************************************************************************************************************/
/********************************************************************************************************************/
/************************************************** DEV *************************************************************/
/********************************************************************************************************************/
/********************************************************************************************************************/
// Default configuration
if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        // Entry accepts a path or an object of entries. We'll be using the
        // latter form given it's convenient with more complex configurations.
        entry: {
            app: [
                'react-hot-loader/patch',
                'webpack-hot-middleware/client',
                PATHS.dev
            ]
        },
        output: {
            path: PATHS.build,
            filename: 'bundle.dev.js',
            publicPath: PATHS.build
        },
        devServer: {
            devtool: 'eval-source-map',

            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: {
                index: path.join(PATHS.build, 'index.html')
            },
            hot: true,
            inline: true,
            progress: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env so this is easy to customize.
            //
            // If you use Vagrant or Cloud9, set
            // host: process.env.HOST || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default
            // localhost
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new DashboardPlugin(new Dashboard().setData),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true
            })
        ]
    });
}

/********************************************************************************************************************/
/********************************************************************************************************************/
/************************************************ BUILD *************************************************************/
/********************************************************************************************************************/
/********************************************************************************************************************/
if (TARGET === 'build') {
    module.exports = merge(common, {
        // Entry accepts a path or an object of entries. We'll be using the
        // latter form given it's convenient with more complex configurations.
        entry: {
            app: PATHS.dev
        },
        output: {
            path: PATHS.build,
            filename: 'bundle.prod.js'
        },
        plugins: ([
            new webpack.optimize.DedupePlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ])
    });
}
