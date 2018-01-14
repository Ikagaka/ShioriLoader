const path = require("path");
const tsconfig = require("./tsconfig.json");

tsconfig.compilerOptions.target = "es5";

module.exports = {
  entry: {"shiori-loader": "./lib/shiori-loader.ts"},
  output: {
    library: "shioriLoader",
    libraryTarget: "umd",
    path: path.resolve("."),
    filename: "dist/lib/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {compilerOptions: tsconfig.compilerOptions},
      },
    ],
  },
  resolve: {
    extensions: [
      ".ts",
      ".js",
    ],
  },
  devtool: "source-map",
};
