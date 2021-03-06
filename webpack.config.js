const path = require('path');
const webpack = require('webpack');

module.exports = {
    cache: true,

    debug: true,

    devtool: 'source-map',

    entry: [
        path.resolve (__dirname, 'src', 'index.js')
    ],

    eslint: {
        configFile: '.eslintrc',
        emitError: true,
        failOnError: true,
        failOnWarning: false,
        formatter: require('eslint-friendly-formatter')
    },

    externals: {
        'waddup': {
            amd: 'waddup',
            commonjs: 'waddup',
            commonjs2: 'waddup',
            root: 'waddup'
        }
    },

    module: {
        preLoaders: [
            {
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'eslint-loader',
                test: /\.js$/
            }
        ],

        loaders: [
            {
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'DEV_ONLY')
                ],
                loader: 'babel',
                test: /\.js$/
            }
        ]
    },

    output: {
        filename: 'qonductor.js',
        library: 'Qonductor',
        path: path.resolve(__dirname, 'dist'),
        umdNamedDefine: true
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ])
    ],

    resolve: {
        extensions: [
            '',
            '.js'
        ],

        fallback: [
            path.join (__dirname, 'src')
        ],

        root: __dirname
    }
};
