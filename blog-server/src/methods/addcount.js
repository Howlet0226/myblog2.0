const countmodel = require('../dbmodel/count')
function addcountfun(isview) {
  return new Promise((resolve, reject) => {
    if (isview) {
      console.log('isview is ' + isview);

      countmodel.updateOne({
        id: 1
      }, {
          $inc: {
            view: 1
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
    } else {
      countmodel.findOne({ id: 1 }, ['love', 'view'], function (err, res) {
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
}
module.exports = addcountfun