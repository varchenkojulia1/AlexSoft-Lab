const webpack = require('webpack');

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");



const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


const optimization = () => {
    const config = {

    };
    if (isProd){
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
        ]
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        open: true,
        port: 3000,
        hot: isDev,
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new PrettierPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|eot|woff2)$/,
                use: [
                    'file-loader'
                ]
            }

        ]
    }
}