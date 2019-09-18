const countmodel = require('../dbmodel/count')
function addcountfun(isview) {
  return new Promise((resolve, reject) => {
    countmodel.updateOne({
      id: 1
    }, {
        $inc: {
          love: 1
        }
      }, function (err, res) {
        if (err) {
          reject(err)
          console.log(err);

        } else {
          countmodel.findOne({ id: 1 }, ['view', 'love'], function (err, res) {
            if (err) {
              reject(err)
              console.log(err);
            } else {
              resolve(res)
              console.log(res);
            }
          })
        }
      })
  })
}
module.exports = addcountfun