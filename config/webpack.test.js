// для тестов не нужны внешние css файлы и картинки со шрифтами
// потому для них используются null-loader - отключает лоадер

var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            // },
            { test: /\.js$/, exclude: /node_modules/, loader:"babel-loader" },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-html-loader'
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
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        )
    ]
}
