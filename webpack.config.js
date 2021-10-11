const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        main: [
            'webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&timeout=20000',
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'docs'),
        publicPath: '/',
        filename: '[name].js'
    },
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                // Loads the javacript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        //options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            excludeChunks: ['server']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ESLintPlugin({
            failOnError: false,
        })
    ]
}