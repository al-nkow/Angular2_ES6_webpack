// общая часть конфигов (prod, dev, test)

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.js',
        'vendor': './src/vendor.js',
        'app': './src/main.js'
    },

    // как определять файлы когда у них отсутствуют расширения
    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            // {
            //     test: /\.ts$/,
            //     loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            // },
            // load and compile javascript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:"babel-loader"
            },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader' // для шаблонов компонентов
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
                // собирает в бандл картинки и шрифты
            },
            {
                test: /\.css$/, // styleUrl в компонентах
                // здесь исключены все файлы стилей в компонентах!
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader' // берет css и загружает его как строку
                // (возвращает из импорта строкой)
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        // Where Webpack finds that app has shared dependencies with vendor,
        // it removes them from app. - то есть удаляет повторяющийся код
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        // вебпак сам подключит в index.html все сгенерированные js и css файлы
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
