module.exports = {
  devServer: {
    proxy: {
      '^/local-test': {
        target: 'http://localhost:13135',
        changeOrigion: true,
        pathRewrite: {'^/local-test': ''},
        logLevel: 'debug',
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
}