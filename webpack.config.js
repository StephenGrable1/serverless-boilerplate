const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/Root/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./static/bundle/")
  },
  resolve: {
    extensions: [".js", ".scss", ".css"],
    alias: {
      utils: path.resolve(__dirname, "./src/global-variables/utils"),
      styles: path.resolve(__dirname, "./src/global-styles/")
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      utils: "utils"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-syntax-object-rest-spread"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },

      {
        test: /\.(png|jpg|gif|svg|wav)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "media/"
            }
          }
        ]
      }
    ]
  }
};
