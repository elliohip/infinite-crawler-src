const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // Entry points for the application.
  entry: {
    main: './src/main.js',
  },
  // Output settings.
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'public', 'dist'),
  },
  // Module settings.
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'), // **Only** process .js files in 'src'
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]',
        },
      },
    ],
  },
  // Plugins.
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  // Development server configuration.
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  // Mode.
  devtool: 'inline-source-map',
  // Performance settings.
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  /*resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'phaser': path.join(__dirname, '/node_modules/phaser/dist/phaser.js')
    }
  },*/

  // mode: 'production',
  mode: 'development',
};
