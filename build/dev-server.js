
require('../config/check-versons')()
var config = require('../config')
var opn = require('opn') 
var path = require('path')
var express = require('express')
var webpack = require('webpack')


var webpackConfig = require('./webpack.dev.config')

var app = express()
var compiler = webpack(webpackConfig) 

var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: '/',
  quiet: true 
})
//官方释义：只能配合webpack-dev-middleware使用
var hotMiddleware = require('webpack-hot-middleware')(compiler)


compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})


app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
app.use(hotMiddleware)

app.use('/static', express.static('./static'))

var uri = 'http://localhost:'+config.dev.port

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
	if(config.dev.autoOpenBrowser){
		opn(uri)
	}
})

var server = app.listen(config.dev.port)
