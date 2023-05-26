const path                 = require('path');
const webpack              = require('webpack');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Path                 = require('path');
const fs = require('fs');

const getFiles = function (dir, files_){
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (let i in files){
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};

const pathSrc = path.resolve(__dirname, 'src');
const pages = getFiles(pathSrc).filter((item) => path.extname(item) === '.html');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: path.join('./assets/images', '[name].[contenthash][ext]'),
    },
    resolve: {
        alias: {
            fnt: Path.resolve(`${__dirname}/src/assets/fonts`),
            img: Path.resolve(`${__dirname}/src/assets/images`),
        },
    },
    mode: 'development',
    devServer: {
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        ...pages.map(page => {
            return new HtmlWebpackPlugin({
                title: 'page',
                template: page,
                filename: path.basename(page)
            })
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // {
        //     'postcss-preset-env': {
        //         browsers: 'last 2 versions',
        //     },
        // },
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ico|gif|png|jp(e)?g|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins:
                                    [
                                        'autoprefixer',
                                    ],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
};
