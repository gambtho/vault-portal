var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        'app': './app/app.module.ts',
        'vendor': './app/vendor.ts'
    },
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            { test: /\.html/, loader: 'html-loader' },
            { test: /\.ts$/, loader: 'ts-loader' }

        ],
        noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },

    devServer: {
        historyApiFallback: true
    }
};