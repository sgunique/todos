const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, { mode }) => {
  const isProd = mode === 'production';

  return (
    {
      entry: {
        server: isProd ? './server/prod-server.js' : './server/dev-server.js',
      },
      output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
      },
      target: 'node',
      node: {
        __dirname: false,
        __filename: false,
      },
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    }
  )
}