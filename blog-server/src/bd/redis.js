const redis = require('redis')
const {REDIS_CONF} = require('../conf/bd')

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)

redisClient.on('err',err=>{
  console.log('is err' + err);
})

function set(key,val){
  const promise = new Promise((res,rej)=>{
    if(typeof val === 'object'){
      val = JSON.stringify(val)
    }
    redisClient.set(key,val,(err,val)=>{
      if(err){
        rej(err)
        return
      }else{
        redisClient.expire(key,20*60*1000)
        res(val)
      }
    })
  })
  return promise
}

function get(key){
  const promise = new Promise((res,rej)=>{
    if(typeof key != 'string'){
      res(undefined)
      return
    }
    redisClient.get(key,(err,val)=>{
      if(err){
        rej(err)
        return
      }
      // console.log('get val is '+ val);
      if(val == null){
        res(val)
        return
      }
      // console.log('in redis' + val);
        res(JSON.parse(val))
    })
  })

  return promise
}

module.exports = {
  get,
  set
}