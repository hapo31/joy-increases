const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isDev = process.env.NODE_ENV !== "production";

const outputPath = isDev
  ? path.join(__dirname, "dist")
  : path.join(__dirname, "docs");

const plugins = [
  new CopyWebpackPlugin([
    {
      from: path.join(__dirname, "index.html")
    },
    {
      from: path.join(__dirname, "favicon.ico")
    },
    {
      from: path.join(__dirname, "images/**/*")
    }
  ])
];

module.exports = {
  mode: isDev ? "development" : "production",
  entry: {
    script: path.join(__dirname, "./src/index.tsx")
  },
  devtool: isDev ? "source-map" : false,
  watch: isDev,
  devServer: {
    contentBase: outputPath
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".svg"]
  },
  output: {
    filename: "index.js",
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  plugins
};
