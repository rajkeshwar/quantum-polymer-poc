const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    '@webcomponents/webcomponentsjs/webcomponents-loader.js',
    './src/quantum-polymer-poc-app/quantum-polymer-poc-app.js'
  ],
  output: {
    // publicPath: path.resolve(__dirname, 'assets'),
    path: path.resolve(__dirname, 'build/default'),
    filename: 'app.bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", {
          loader: "sass-loader",
          options: {
            includePaths: ["./src/assets"]
          }
        }]
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};