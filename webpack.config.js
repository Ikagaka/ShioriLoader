const webpack = require('webpack');
const tsconfig = require('./tsconfig.json');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {compilerOptions: tsconfig.compilerOptions},
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  entry: {
    'shiori-loader': './src/lib/shiori-loader.ts',
  },
  output: {
    path: path.join(__dirname),
    filename: 'dist/lib/[name].js',
    library: 'shioriLoader',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
