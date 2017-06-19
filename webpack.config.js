const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//TODO add extract text plugin to extract css for production

module.exports = function() {

  return {
    entry: path.join(__dirname, 'app/index.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/' //sets base path for all assets
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.join(__dirname, 'app')],
          exclude: [path.join(__dirname, 'app/node_modules')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['transform-class-properties', 'transform-object-rest-spread']
            }
          }
        },
        {
          test: [/\.scss$/, /\.css$/],
          use: [
            {
              loader: 'style-loader' // creates style nodes from JS string
            },
            {
              loader: 'css-loader',
              options: {
                // translates CSS into CommonJS
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                // compiles Sass to CSS
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
        {
          test: [/\.svg$/, /\.png$/, /\.jpg$/],
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      alias: {
        components: path.join(__dirname, 'app/components'),
        shared: path.join(__dirname, 'app/shared')
      }
    },
    devServer: {
      historyApiFallback: true //forces react router to handle redirection from '/' when user hits refresh button from non-home route
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'app/index.html' })
    ]
  };
};
