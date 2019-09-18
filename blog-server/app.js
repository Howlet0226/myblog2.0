const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const path = require('path')
const static = require('koa-static')
const staticPath = './static'
console.log(path.resolve(__dirname,staticPath));
app.use(static(
  path.join(__dirname,staticPath)
))
app.keys = ['some secret hurr'];
app.use(session({
  key:'sessionid',
  maxAge: 20*60*1000,   //有效期
  sameSite:true
}, app))
const router = new Router()
const index = require('./src/router/index.js')
router.use('/api',index.routes(),index.allowedMethods())
app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8000,()=>{
  console.log('8000 is running');
})