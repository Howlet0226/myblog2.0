const Router = require('koa-router')
const router = new Router()
const blog = require('./blog/index')
const login = require('./login/login')
const count = require('./count/index')
const path = require('path')
const fs = require('fs')
// import 'highlight.js/styles/github.css';
const md = new require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
})
const getUploadDirName = require('../methods/getUploadDirName')
const getUploadFileExt = require('../methods/getUploadFileExt')
const addblogfun = require('../methods/addblog')
const checkDirExist = require('../methods/checkDirExist')
const logincheck = require('../methods/logincheck')
router.use('/blog', blog.routes(), blog.allowedMethods())
router.use('/user', login.routes(), login.allowedMethods())
router.use('/count', count.routes(), count.allowedMethods())
const body = require('koa-body')
router.post('/upload', body({
  multipart: true,
  formidable: {
    uploadDir: path.resolve(__dirname, '../../static/upload'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      const ext = getUploadFileExt(file.name);
      const dirname = getUploadDirName();
      const filename = Date.now() + Math.floor(Math.random() + 100)
      const dir = path.join(__dirname, `../../static/upload/${dirname}`);
      checkDirExist(dir);
      file.path = `${dir}/${filename}.${ext}`;
      file.fileapi = `http://localhost:8000/upload/${dirname}/${filename}.${ext}`
    }
  },

}), async (ctx, next) => {
  // console.log(path.join(ctx.request.files.photo.path));
  // console.log(ctx.request.files.photo);
  ctx.body = {
    "errno": 0,
    "data": [
      ctx.request.files.photo.fileapi,
    ]
  }
})

router.post('/uploadmd', body({
  multipart: true,
  formidable: {
    uploadDir: path.resolve(__dirname, '../../static/uploadmd'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      const ext = getUploadFileExt(file.name);
      const dir = path.join(__dirname, `../../static/uploadmd`);
      checkDirExist(dir);
      file.path = `${dir}/mdfile.${ext}`;
    }
  },
}), async (ctx, next) => {
  let islogin = await logincheck(ctx.session['sessionid'])
  console.log(islogin);
  if (!islogin) {
    ctx.body = {
      errcode: 1,
      message: '未登录'
    }
    return
  }
  // console.log(ctx.request.files);
  // console.log(ctx.request.files.photo);
  ctx.body = {
    "errno": 0,
    "data": [
      // ctx.request.files.photo.fileapi,
    ]
  }
})

router.post('/addmdblog', async (ctx, next) => {
  let islogin = await logincheck(ctx.session['sessionid'])
  console.log(islogin);
  if (!islogin) {
    ctx.body = {
      errcode: 1,
      message: '未登录'
    }
    return
  } else {
    let resulut = await new Promise((resolve, reject) => {
      fs.readFile(path.resolve(__dirname, '../../static/uploadmd/mdfile.md'), (err, data) => {
        if (err) throw err
        resolve(data)
        return
      })
    })
    await fs.unlink(path.resolve(__dirname, '../../static/uploadmd/mdfile.md'), (err, data) => {
      if (err) throw err
    })
    ctx.request.body.content = md.render(resulut.toString())
    let result1 = await addblogfun(ctx)
    if (result1) {
      ctx.body = {
        ercode: 0,
        message: '上传完毕'
      }
    }
  }
})
module.exports = router 
