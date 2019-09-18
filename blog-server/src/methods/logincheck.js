const {get} = require('../bd/redis')
const  logincheck = (sessionId)=>{
  return new Promise((res,rej)=>{
    get(sessionId).then((val)=>{
      console.log(' val is '+ val);
      res(val)
      return 
    },err=>{
      rej(err)
      return 
    })
  })
}
module.exports = logincheck