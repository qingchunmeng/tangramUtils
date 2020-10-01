const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CleanWebpackPlugin from 'clean-webpack-plugin';
// import ManifestPlugin from 'webpack-manifest-plugin';
//
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        publicPath: '',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        crossOriginLoading: 'anonymous',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: false,
                vendors: false,
                common: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        // new HtmlWebpackPlugin({
        //     title: '外部资源整合数据管理后台',
        //     hash: false,
        //     filename: 'index.html',
        //     template: './index.html',
        //     chunksSortMode: 'none',
        // }),
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin({
            fileName: 'cdnResource.json'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            import: true,
                            importLoaders: 1,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015']
                    }
                }
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: '@svgr/webpack',
                        options: {
                            babel: false,
                            icon: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: path.resolve(__dirname, 'src/common/svg'),
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 2000,
                        name() {
                            return 'images/[name].[ext]';
                        },
                        publicPath: '/'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    }
    // resolve: {
    //     alias: {
    //         containers: path.join(paths.src, 'containers'),
    //         components: path.join(paths.src, 'components'),
    //         common: path.join(paths.src, 'common'),
    //         util: path.join(paths.src, 'util'),
    //         actions: path.join(paths.src, 'actions'),
    //         reducer: path.join(paths.src, 'reducer'),
    //     },
    // },
};

module.exports = config;
