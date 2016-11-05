const webpack = require('webpack');
const path = require('path');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint',
      },
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts',
        exclude: /node_modules/,
      },
    ],
  },
  entry: {
    'shiori-loader': './src/lib/shiori-loader.ts',
  },
  ts: {
    compilerOptions: {
      rootDir: 'src',
      outDir: 'dist',
      declarationDir: 'dist',
    },
  },
  output: {
    path: path.join(__dirname),
    filename: 'dist/lib/[name].js',
    library: 'shioriLoader',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
};
