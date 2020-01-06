const webpack = 
  require('webpack');
const HtmlWebpackPlugin = 
  require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = 
  require('html-webpack-inline-source-plugin');
const webpackPluginConfig = {
  template: './src/index.html',
  favicon: 'public/favicon.ico',
  // embed all javascript and css inline
  inlineSource: '.(js|css)$' 
};
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',  
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(webpackPluginConfig),
    new HtmlWebpackInlineSourcePlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  },
  devtool: 'eval-source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: {
          condition: true,
          filename(file) {
            return `${file}.LICENSE`;
          },
          banner(licenseFile) {
            return `License information can be found in ${licenseFile}`;
          },
        },
        sourceMap: false,
        extractComments: (node, comment) => { console.log(comment); return true; }
      })
    ]
  }
};