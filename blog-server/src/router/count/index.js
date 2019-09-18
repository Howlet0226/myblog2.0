const router = require('koa-router')()
const addcount = require('../../methods/addcount')
const addlove = require('../../methods/addlove')
router.get('/add', async (ctx, next) => {
  // console.log(123);
  if (ctx.cookies.get('viewed', {
    signed: true
  })) {
    ctx.query.isview = false;
  } else {
    ctx.cookies.set('viewed', true, {
      signed: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
  }
  await next()
})
router.get('/add', async (ctx, next) => {
  let result
  // console.log('ctx.query.isview is '+ ctx.query.isview);
  if (ctx.query.isview) {
    result = await addcount(true)
  } else {
    result = await addcount(false)
  }
  if (result) {
    // ctx.set('Cache-Control','max-age=3600000');
    ctx.body = {
      errcode: 0,
      result
    }
  }
})
router.get('/addlove',async (ctx,next)=>{
  let result = await addlove()
  ctx.set('Cache-Control','max-age=10080000');
  ctx.body = {
    errcode:0,
    result
  }
})
module.exports = router