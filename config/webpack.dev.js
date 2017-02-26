// dev сборка вся основывается на использовании dev сервера
// несмотря на то что мы указываем вебпаку положить результирующие файлы в dist
// dev сервер хранит все их в памяти
// здесь path и output указываются для HtmlWebpackPlugin из webpack.common.js
// чтобы подключить файлы в index.html

var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    // все CSS стили заключены в общем js бандле!
    // ExtractTextPlugin вытащит их во внешние .css файлы,
    // которые будут подключены плагином HtmlWebpackPlugin в index.html в теги <link>
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
