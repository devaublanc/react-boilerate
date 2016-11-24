const path = require('path')

// postcss
const webpackPostcssTools = require('webpack-postcss-tools')
const globalMap = webpackPostcssTools.makeVarMap('src/config/css/global.css')
const autoprefixer = require('autoprefixer')
const postcssCustomProperties = require('postcss-custom-properties')
const postcssRebeccaPurple = require('postcss-color-rebeccapurple')
const postcssSvgInline = require('postcss-inline-svg')
const postcssCalc = require('postcss-calc')
const variablesMap = Object.assign({}, globalMap.vars)

const PATHS = {
    src: path.join(__dirname, 'src'),
    lib: path.join(__dirname, 'node_modules')
}

module.exports = {
    title: 'Documentation',
    sections: [
        {
            name: 'Components',
            components: 'src/components/*/*.js'
        },
        {
            name: 'Containers',
            components: 'src/containers/*/*.js'
        }
    ],
    skipComponentsWithoutExample: true,
    getExampleFilename: function(componentpath) {
        return componentpath.replace(/\.js?$/, '.md')
    },
    handlers: require('react-docgen').defaultHandlers.concat(function (documentation, docPath) {
        // Calculate a display name for components based upon the declared class name.
        if (docPath.value.type === 'ClassDeclaration' && docPath.value.id.type === 'Identifier') {
            documentation.set('displayName', docPath.value.id.name);

            // Calculate the key required to find the component in the module exports
            if (docPath.parentPath.value.type === 'ExportNamedDeclaration') {
                documentation.set('path', docPath.value.id.name);
            }
        }

        // The component is the default export
        if (docPath.parentPath.value.type === 'ExportDefaultDeclaration') {
            documentation.set('docPath', 'default');
        }
    }),
    updateWebpackConfig(webpackConfig) {
        // Your source files folder or array of folders, should not include node_modules
        const dir = path.join(__dirname, 'src')

        webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'src/components/StyleguideWrapper')
        webpackConfig.resolve.alias.components = path.join(__dirname, 'src/components')
        webpackConfig.resolve.alias.assets = path.join(__dirname, 'src/assets')
        webpackConfig.resolve.alias.config = path.join(__dirname, 'src/config')
        webpackConfig.resolve.alias.mocks = path.join(__dirname, 'src/mocks')
        webpackConfig.resolve.alias.helpers = path.join(__dirname, 'src/helpers')
        webpackConfig.resolve.alias.containers = path.join(__dirname, 'src/containers')
        webpackConfig.resolve.alias.actions = path.join(__dirname, 'src/actions')
        webpackConfig.resolve.alias.reducers = path.join(__dirname, 'src/reducers')
        webpackConfig.resolve.alias.middlewares = path.join(__dirname, 'src/middlewares')

        //webpackConfig.resolve.alias['react-redux'] = path.join(__dirname, '/src/mocks/react-redux.js');

        webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
            // Babel loader will use your project’s .babelrc
            {
                test: /\.jsx?$/,
                include: dir,
                loader: 'babel'
            },
            // Other loaders that is needed for your components
            {
                test: /\.css$/,
                include: dir,
                loaders: [
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g)$/i,
                loader: 'file',
                query: {
                    name: 'img/[name].[ext]'
                },
                include: PATHS.src
            },
            {
                test: /\.svg$/,
                loader: 'url?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]',
                include: PATHS.src
            },
            {
                test: /\.woff$/,
                loader: 'url?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]',
                include: PATHS.src
            },
            {
                test: /\.woff2$/,
                loader: 'url?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]',
                include: PATHS.src
            },
            {
                test: /\.[ot]tf$/,
                loader: 'url?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]',
                include: PATHS.src
            },
            {
                test: /\.eot$/,
                loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]',
                include: PATHS.src
            }
        ])


        webpackConfig.postcss = [
            webpackPostcssTools.prependTildesToImports,
            autoprefixer,
            postcssCustomProperties({
                variables: variablesMap
            }),
            postcssRebeccaPurple,
            postcssSvgInline,
            postcssCalc()
        ]


        return webpackConfig
    }
}
