const router = require('koa-router')()
const addblogfun = require('../../methods/addblog')
const logincheck = require('../../methods/logincheck')
router.post('/', async (ctx, next) => {
  let islogin = await logincheck(ctx.session['sessionid'])
  if(!islogin){
    ctx.body = {
      errcode:1,
      message:'未登录'
    }
    return
  }
  let result =   await addblogfun(ctx)
  console.log(result);
  if (result) {
    ctx.body = {
      errcode: 0,
      inf: '添加完成'
    }
  }
})
module.exports = router