const blogmodel = require('../dbmodel/blog')
function addblogFun(ctx) {
  var blog = new blogmodel({
    title: ctx.request.body.title,
    text: ctx.request.body.text,
    content: ctx.request.body.content,
    createtime: new Date(),
    author: 'howlet'
  })
  return new Promise((resolve, reject) => {
    blog.save(function (err, res) {
      if (err) {
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
}
module.exports = addblogFun