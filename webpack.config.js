var path = require('path');

module.exports = {
  mode: 'development',

  entry: './src/main.tsx',

  output: {
    filename: "./js/bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js',
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true
  }
};
