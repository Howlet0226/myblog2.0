const mongooes = require('mongoose')
const {MONGODB_CONF} = require('../conf/bd')
mongooes.connect(`mongodb://${MONGODB_CONF.host}:${MONGODB_CONF.port}/${MONGODB_CONF.database}`,{ useNewUrlParser: true })
mongooes.connection.on('connected',function(){
  console.log('Mongoose connection open ')
})

module.exports = mongooes 