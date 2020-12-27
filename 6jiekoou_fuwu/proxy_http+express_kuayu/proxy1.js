var express = require('express');
//const proxy = require('http-proxy-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
// const proxyOptions={
//     target:'http://localhost:4000',
//     changeOrigin:true //处理跨域
// }

//静态服务
app.use(express.static(__dirname + '/'))
//反向代理
app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000'}));
//app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false }));
module.exports = app