module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }, {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: 'style-loader'
        }, {
          test: /\.css$/,
          loader: 'css-loader',
          exclude: /node_modules/,
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }
      ]
    },
    output: {
      path: __dirname + "/public/dist",
      filename: "main.js"
    }
};