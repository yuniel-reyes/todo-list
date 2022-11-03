const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js') // as an object for multiple entry points
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true // remove old bundles when running build
    },
    // devtool: 'inline-source-map', // keep track from where the source code is comming: debugging 
    // npm install -D webpack-dev-server
    devServer: {
        static: {directory: path.resolve(__dirname, 'dist')}, //what to serve
        port: 3000,
        hot: true,  // hot reloading: compiling any change inside src
        open: true // open browser automatically
    },
    // loaders
    // npm i -D style-loader css-loader
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],            
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }        
        ],
    },
    //plugins
    // npm i -D html-webpack-plugin
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo-App',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/template.html')
        }),
    ]
}