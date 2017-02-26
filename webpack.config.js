module.exports = require('./config/webpack.dev.js');



/*
entry: {
    // две точки входа - одна - приложение, другая - библиотеки, плагины итд
    // то есть стабильная часть приложения, которая не меняется
    app: 'src/app.ts',
    vendor: 'src/vendor.ts'
},
output: {
    // на выходе создаст два бандла с именами как в entry - см.выше
    // [name] заменяется на имя входного файла
    filename: '[name].js'
},

// как только вебпак встречает import - перед тем как добавить
// этот файл в бандл он прогоняет его через этот блок и если
// срабатывает выражение в test - применяется лоадер
rules: [
    {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
    },
    {
        test: /\.css$/,
        // с помощью ! лоадеры соединяются в цепочки
        // применяются последовательно СПРАВА налево!
        // сначала css-loader - получает файл из import ... url()
        // затем style-loader - вставляет css в <style> элемент на странице
        loaders: 'style-loader!css-loader'
    }
],

plugins: [
    new webpack.optimize.UglifyJsPlugin()
]
*/