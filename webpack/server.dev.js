/* global require module __dirname */
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const res = p => path.resolve(__dirname, p);

const nodeModules = res("../node_modules");
const entry = res("../server/render.js");
const output = res("../buildServer");

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

externals["react-dom/server"] = "commonjs react-dom/server";
externals["react-helmet"] = "commonjs react-helmet";

module.exports = {
  name: "server",
  devtool: "source-map",
  target: "node",
  mode: "development",
  entry: ["regenerator-runtime/runtime.js", entry],
  externals,
  output: {
    path: output,
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: "url-loader?limit=10000"
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "css-loader/locals",
            options: {
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]"
            }
          },
          {
            loader: "stylus-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".css", ".styl"]
  },
  plugins: [
    new Dotenv({
      systemvars: true
    }),
    new WriteFilePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};
