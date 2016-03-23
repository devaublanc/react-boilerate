/*eslint no-undef: 0*/
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

// postcss
const webpackPostcssTools = require('webpack-postcss-tools');
const colorsMap = webpackPostcssTools.makeVarMap('web_modules/app/css/colors.css');

const TARGET = process.env.npm_lifecycle_event;

var variablesMap = Object.assign({}, colorsMap.vars);

const PATHS = {
    // app: path.join(__dirname, 'app'),
    dev: path.join(__dirname, 'entries/dev.js'),
    prod: path.join(__dirname, 'entries/prod.js'),
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
        extensions: ['', '.js', '.jsx']
    },

    output: {
        path: PATHS.build,
        filename: 'bundle.dev.js'
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
                loader: 'babel'
            }
        ]
    },
    postcss: [
        webpackPostcssTools.prependTildesToImports,
        require('autoprefixer'),
        require('postcss-custom-properties')({
            variables: variablesMap
        }),
        require('postcss-color-rebeccapurple'),
        require('postcss-inline-svg'),
        require('postcss-calc')()
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
            app: PATHS.dev
        },
        devServer: {
            devtool: 'eval-source-map',

            contentBase: PATHS.build,

            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,
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
            new webpack.HotModuleReplacementPlugin()
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
        }
    });
}

/********************************************************************************************************************/
/********************************************************************************************************************/
/********************************************** PRODUCTION **********************************************************/
/********************************************************************************************************************/
/********************************************************************************************************************/

if (TARGET === 'deploy') {
    module.exports = merge(common, {
        // Entry accepts a path or an object of entries. We'll be using the
        // latter form given it's convenient with more complex configurations.
        entry: {
            app: PATHS.prod
        },

        output: {
            path: PATHS.build,
            filename: 'bundle.js',
            libraryTarget: 'commonjs2'
        },
        externals: [{
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            }
        }],
        plugins: ([
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ])
    });
}
