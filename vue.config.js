const WorkerPlugin = require('worker-plugin')

module.exports = {
  configureWebpack: {
    output: {
      globalObject: "this"
    },
    plugins: [
      new WorkerPlugin()
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/random-string/'
    : '/'
}