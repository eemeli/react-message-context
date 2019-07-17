const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(en|fi)\.(json|ya?ml)$/,
        type: 'javascript/auto',
        loader: 'messageformat-loader',
        options: { locale: ['en', 'fi'] }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}
