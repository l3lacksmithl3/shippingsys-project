var express = require('express');
var router = express.Router();
let mongoose = require('./connect');

let import_ = mongoose.model('data_logistic', require('./schema/data_logistic'));
let master = mongoose.model('master', require('./schema/master'));

router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');
    res.setHeader('Access-Conrol-Allow-Credentials', true);
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// get data
router.get('/get_import', function(req, res, next) {
    import_.find({ sendmail: 'false' }, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            res.json(rs);
        }
    })
});

router.get('/get_import_bydate', function(req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
        // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    import_.find({ sendmail: 'false' }, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            let arr = []
            if (rs != '') {
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = s_date.getDate()
                    let s5 = s_date.getMonth()
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s4 + '-' + (s5 + 1) + '-' + s6
                        // check 'today' == 'search date'
                    if (check_date == rs_date) {
                        arr.push(rs[i])
                    }
                }
                res.json(arr);
            }
        }
    })
});

router.post('/get_import_sortdate', function(req, res, next) {
    console.log(req.body);
    import_.find({ sendmail: 'false' }, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            let arr = []
            if (rs != '') {
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = (s_date.getDate() < 10 ? '0' : '') + (s_date.getDate());
                    const month = s_date.getMonth() + 1;
                    let s5 = month.toString().padStart(2,'0')
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s6 + '-' + s5 + '-' + s4
                        // check 'today' == 'search date'
                    if (req.body.date == rs_date) {
                        arr.push(rs[i])
                    }
                }
                res.json(arr);
            }
        }
    }).sort({
        "Delivery Note#": 1
    });
});
router.post('/get_import_sortdate_his', function(req, res, next) {
    import_.find(function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            let arr = []
            if (rs != '') {
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = (s_date.getDate() < 10 ? '0' : '') + (s_date.getDate());
                    const month = s_date.getMonth() + 1;
                    let s5 = month.toString().padStart(2,'0')
                    // let s5 = (s_date.getMonth() < 10 ? '0' : '') + (s_date.getMonth()+1);
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s6 + '-' + s5 + '-' + s4
                        // check 'today' == 'search date'
                    if (req.body.date == rs_date) {
                        arr.push(rs[i])
                    }
                }
                res.json(arr);
            }
        }
    }).sort({
        "Delivery Note#": 1
    });
});

router.post('/get_import_invoice', function(req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
        // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    import_.find({
        ['Delivery Note#']: req.body.invoice, sendmail: 'false' }, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            let arr = []
            if (rs != '') {
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = s_date.getDate()
                    let s5 = s_date.getMonth()
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s4 + '-' + (s5 + 1) + '-' + s6
                        // check 'today' == 'search date'
                    if (check_date == rs_date) {
                        arr.push(rs[i])
                    }
                }
                res.json(arr);
            }
        }
    })
});

router.post('/get_import_dataAMT', function(req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
        // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    import_.find({
        ['Prod Dept CD']: req.body.ProdDeptCD, sendmail: 'false' }, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            let arr = []
            if (rs != '') {
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = s_date.getDate()
                    let s5 = s_date.getMonth()
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s4 + '-' + (s5 + 1) + '-' + s6
                        // check 'today' == 'search date'
                    if (check_date == rs_date) {
                        arr.push(rs[i])
                    }
                }
                res.json(arr);
            }
        }
    })
});

// create data
router.post('/import_file', function(req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
        // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    import_.find(function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            // check get data rs != ''
            if (rs != '') {
                let arr = []
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = s_date.getDate()
                    let s5 = s_date.getMonth()
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s4 + '-' + (s5 + 1) + '-' + s6
                        // check 'today' == 'search date'
                    if (check_date == rs_date) {
                        for (let x = 0; x < req.body.length; x++) {
                            if (rs[i].story == req.body[x].story) {
                                let condition = { _id: rs[i]._id };
                                import_.deleteOne(condition, function(err, rs) {});
                            }
                        }
                    }
                }
                for (let x = 0; x < req.body.length; x++) {
                    if (req.body[x]['Prod Dept CD'].includes('66AA11')) {
                        arr.push(req.body[x])
                    }
                }
                import_.insertMany(arr, function(err, rs) {
                    if (err) {
                        res.json(err)
                    } else {
                        res.json(rs)
                    }
                })
            }
        }
    })
});
router.post('/update_import_file', function(req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
        // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    import_.find({ sendmail: 'false' }, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            // check get data rs != ''
            if (rs != '') {
                let arr = []
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = s_date.getDate()
                    let s5 = s_date.getMonth()
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s4 + '-' + (s5 + 1) + '-' + s6
                        // check 'today' == 'search date'
                    if (check_date == rs_date) {
                        let condition = { sendmail: req.body.sendmail }
                        import_.updateMany(condition, function(err, rs) {})
                    }
                }
                res.json(rs)
            }
        }
    })
});
router.post('/update_import', function(req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
        // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    import_.find({ sendmail: 'false' }, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            // check get data rs != ''
            if (rs != '') {
                let arr = []
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = s_date.getDate()
                    let s5 = s_date.getMonth()
                    let s6 = s_date.getFullYear()
                        // search date
                    let rs_date = s4 + '-' + (s5 + 1) + '-' + s6
                        // check 'today' == 'search date'
                    if (check_date == rs_date) {
                        let condition = { 'Delivery Note#': req.body.invoice }
                        import_.updateMany(condition, req.body, function(err, rs) {})
                    }
                }
                res.json(rs)
            }
        }
    })
});

// master
router.get('/get_model_master', function(req, res, next) {
    master.find(function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            res.json(rs);
        }
    })
});
router.post('/import_model_master', function(req, res, next) {
    master.deleteMany({}, function(err, rs) {
        if (err) {
            res.json(err);
        } else {
            master.insertMany(req.body, function(err, rs) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rs);
                }
            })
        }
    });
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
module.exports = router;

// router.post('/Uploadto2', function(req, res, next) {
//     let avatar = req.files.fileimg;
//     var pathserver = "D:/images/Equipment_Controls";
//     var pathservers = '/Equipment_Controls' + req.files.fileimg.name;
//     var path = pathservers;
//     avatar.mv(pathserver + pathservers);
//     res.json(path);
// });