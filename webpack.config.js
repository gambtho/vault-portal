var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var path = require('path');


// Webpack Config
var webpackConfig = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'app': './app/app.module.ts',
        'vendor': './app/vendor.ts'
    },

    output: {
        path: './dist',
    },

    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
    // ],
    //
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader', exclude: /node_modules(\/|\\)rxjs/ }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader',
                query: {
                    doTypeCheck: true,
                    resolveGlobs: false,
                    externals: ['typings/main.d.ts']
                },
                include: path.resolve('app'),
                exclude: /node_modules/
            }
        ]
    }

};

// Our Webpack Defaults
var defaultConfig = {
    devtool: 'cheap-module-eval-source-map',
    cache: true,
    debug: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        noParse: [
            path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
            path.join(__dirname, 'node_modules', 'angular2', 'bundles')
        ]
    },

    resolve: {
        root: [ path.join(__dirname, 'src') ],
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },

    node: {
        global: 1,
        process: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    },
}


module.exports = webpackMerge(defaultConfig, webpackConfig);