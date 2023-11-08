var express = require('express');
var router = express.Router();
let mongoose = require('./connect');

let member = mongoose.model('member', require('./schema/member'));

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');
  res.setHeader('Access-Conrol-Allow-Credentials', true);
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// get data
router.get('/get_member', function (req, res, next) {
  member.find(function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  })
});
// create data
router.post('/create_member', function (req, res, next) {
  member.insertMany(req.body, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  })
});
// update data
router.post('/update_member', function (req, res, next) {
  let condition = { _id: req.body._id }
  member.updateMany(condition, req.body, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            res.json(rs);
        }
    })
});
// delete data
router.post("/delete_member", function(req, res, next) {
  let condition = { _id: req.body._id };
  member.deleteOne(condition, function(err, rs) {
      if (err) {
          res.json(err);
      } else {
          res.json(rs);
      }
  });
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
module.exports = router;
