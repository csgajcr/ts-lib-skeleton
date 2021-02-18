var path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/main/index.ts',
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
        libraryTarget: 'umd',
        library: process.env.npm_package_name,
    },
    mode: production ? 'production' : 'development',
    externals: {},
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: true,
                    ecma: 5,
                    mangle: false,
                },
                sourceMap: !production,
            }),
        ],
    },
}
