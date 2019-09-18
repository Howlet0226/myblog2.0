const blogmodel = require('../dbmodel/blog')
const mongoose = require('../bd/mongodb')
function delblog(id) {
  var _id = mongoose.Types.ObjectId(id)
  return new Promise((resolve, reject) => {
    blogmodel.remove({
      _id
    }, function (err, val) {
      if (err) {
        reject(err)
      } else {
        console.log(val);
        resolve(val)
      }
    })
  })
}
module.exports = delblog