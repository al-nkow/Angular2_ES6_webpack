// Remove artifacts needed only in development.
// Put the production output bundle files in the dist folder.

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(), // stops the build if there is an error.
        new webpack.optimize.UglifyJsPlugin({ // minifies the bundles
            mangle: {
                keep_fnames: true
            }
        }),
        // extracts embedded css as external files, adding cache-busting hash to the filename.
        // извлекает встроенный css во внешние файлы и добавляет hash к имени
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({ // use to define environment variables
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        // благодаря DefinePlugin возможно использовать переменные окружения
        // if (process.env.ENV === 'production') {
        //    enableProdMode();
        // }
        new webpack.LoaderOptionsPlugin({ // изменить настройки некоторых лоадеров
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        })
    ]
});
