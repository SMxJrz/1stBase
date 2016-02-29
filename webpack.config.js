var path = require("path");
var webpack = require("webpack");
var NgAnnotatePlugin = require("ng-annotate-webpack-plugin");

var libs = [
    'angular',
    'angular-animate',
    'angular-aria',
    'angular-material',
    'angular-mocks',
    'angular-ui-router',
    'lodash'
];

var plugins = [
    new NgAnnotatePlugin({
        add:true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
];

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: {
        libs:libs,
        bundle:['babel-polyfill', './app.js']
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    debug:true,
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel!imports?angular", include: /app|test/},
            { test: /\.css$/, loader: "style!css" },
            { test: /\.tpl\.html$/, loader: "raw" },
            { test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png'}
        ]
    },
    plugins: plugins
};