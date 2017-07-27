var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader:"babel-loader" },
            {
                test: /\.(pug|jade)$/,
                loader: ['raw-loader', 'pug-html-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'

            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: 'null-loader'
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'),
            {}
        ),
    ]
};
