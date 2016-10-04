const path = require('path');

module.exports = {
    title: 'Styleguide',
    components: './src/components/*/*.js',
    getExampleFilename: function(componentpath) {
        return componentpath.replace(/\.js?$/, '.md');
    },
    updateWebpackConfig(webpackConfig) {
        // Your source files folder or array of folders, should not include node_modules
        const dir = path.join(__dirname, 'src/components');
        webpackConfig.module.loaders.push(
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
        );
        return webpackConfig;
    }
};
