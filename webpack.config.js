var path = require('path');
var SRC = path.join(__dirname, '/client/src/index.jsx');
var DIST = path.join(__dirname, '/client/dist');

module.exports = (env) => {
  return {
    mode: env.PRODUCTION ? 'production' : 'development',
    entry: SRC,
    output: {
      filename: 'main.js',
      path: DIST,
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
