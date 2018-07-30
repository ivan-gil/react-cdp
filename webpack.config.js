const path = require('path');
const webpack = require('webpack');
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');


const baseConfig = {
    context: path.join(__dirname, 'src'),
    entry: './app.js',

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(css|scss)?$/,
                // use: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            },
            {
                test: /\.(ttf|eot|svg|woff|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[name][hash].[ext]',
                },
            },
        ],
    },

    plugins: [
        new CaseSensitivePlugin(),
        new ExtractTextPlugin('[name].css'),
    ],
};

module.exports = (env, argv) => {
    let config = null;

    baseConfig.plugins.push(new HtmlWebpackPlugin({
        title: `React CDP ${argv.mode}`,
        hash: true,
        template: './index.html',
    }));

    baseConfig.plugins.push(new webpack.DefinePlugin({
        NODE_ENV: argv.mode,
    }));

    if (argv.mode === 'production') {
        config = Object.assign({}, baseConfig, prodConfig);
    } else if (argv.mode === 'development') {
        config = Object.assign({}, baseConfig, devConfig);
    } else {
        console.log(`Something went wrong, no config file for ${argv.mode} mode`);
        config = Object.assign({}, baseConfig, devConfig);
    }

    return config;
};
