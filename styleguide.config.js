const path = require('path');

// postcss
const webpackPostcssTools = require('webpack-postcss-tools');
const globalMap = webpackPostcssTools.makeVarMap('src/config/css/global.css');
const autoprefixer = require('autoprefixer');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssRebeccaPurple = require('postcss-color-rebeccapurple')
const postcssSvgInline = require('postcss-inline-svg')
const postcssCalc = require('postcss-calc')
const variablesMap = Object.assign({}, globalMap.vars);

module.exports = {
    title: 'Styleguide',
    components: './src/components/*/*.js',
    skipComponentsWithoutExample: true,
    getExampleFilename: function(componentpath) {
        return componentpath.replace(/\.js?$/, '.md');
    },
    updateWebpackConfig(webpackConfig) {
        // Your source files folder or array of folders, should not include node_modules
        const dir = path.join(__dirname, 'src/components');

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
            }
        ]);


        webpackConfig.postcss = [
            webpackPostcssTools.prependTildesToImports,
            autoprefixer,
            postcssCustomProperties({
                variables: variablesMap
            }),
            postcssRebeccaPurple,
            postcssSvgInline,
            postcssCalc()
        ];


        return webpackConfig;
    }
};
