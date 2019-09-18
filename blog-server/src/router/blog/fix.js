const router = require('koa-router')()
const fixblog = require('../../methods/fixblog')
const logincheck = require('../../methods/logincheck')
router.post('/', async (ctx, next) => {
  let islogin = await logincheck(ctx.session['sessionid'])
  console.log(islogin);
  if(!islogin){
    ctx.body = {
      errcode:1,
      message:'未登录'
    }
    return
  }
  let result = await fixblog(ctx)
  if (result) {
    ctx.body = {
      errcode: 0,
      state: 'OK'
    }
  } else {
    ctx.body = {
      errcode: 1,
      state: '失败'
    }
  }
})
module.exports = router