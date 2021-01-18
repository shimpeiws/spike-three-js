var path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/main.ts',

  output: {
    filename: "./js/bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true
  }
};
