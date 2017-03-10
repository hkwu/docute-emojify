import fs from 'fs';
import path from 'path';
import merge from 'webpack-merge';
import webpack from 'webpack';

const common = {
  entry: './src/index.js',
  output: {
    library: 'docuteEmojify',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin(fs.readFileSync('./LICENSE', 'utf8').trim()),
  ],
};

const development = {
  output: {
    filename: 'docute-emojify.js',
  },
};

const production = {
  output: {
    filename: 'docute-emojify.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  ],
  devtool: 'source-map',
};

module.exports = (env) => {
  const { target } = env;

  switch (target) {
    case 'production':
      return merge(common, production);
    default:
      return merge(common, development);
  }
};
