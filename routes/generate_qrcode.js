var express = require('express');
var router = express.Router();
let mongoose = require('./connect');

let gen_qr = mongoose.model('generate_qrcode', require('./schema/generate_qrcode'));

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
router.get('/get_qrcode', function (req, res, next) {
    gen_qr.find(function (err, rs) {
        if (err) {
            res.json(err);
        } else {
            res.json(rs);
        }
    })
});
router.get('/get_qrcode_bydate', function (req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
    // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    gen_qr.find({ sendmail: 'false' }, function (err, rs) {
        if (err) {
            res.json(err);
        } else {
            const foo = rs.find(w=> w['Delivery Note#'] == 'C23C2703A')
            console.log(foo);

            let arr = []
            if (rs != '') {
                // console.log(rs);
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
            } else {
                res.json(rs);
            }
        }
    })
});
// get_qrcode sortdate
router.post('/get_qrcode_sortdate', function (req, res, next) {
    gen_qr.find({ sendmail: 'false' }, function (err, rs) {
        if (err) {
            res.json(err);
        } else {
            let arr = []
            if (rs != '') {
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = (s_date.getDate() < 10 ? '0' : '') + (s_date.getDate());
                    const month = s_date.getMonth() + 1;
                    let s5 = month.toString().padStart(2, '0')
                    let s6 = s_date.getFullYear()
                    // search date
                    let rs_date = s6 + '-' + s5 + '-' + s4
                    // check 'today' == 'search date'
                    if (req.body.date == rs_date) {
                        arr.push(rs[i])
                    }
                }
                res.json(arr)
            }
        }
    }).sort({
        "invoice": 1
    });
});
router.post('/get_qrcode_sortdate_his', function (req, res, next) {
    gen_qr.find(function (err, rs) {
        if (err) {
            res.json(err);
        } else {
            let arr = []
            if (rs != '') {
                for (let i = 0; i < rs.length; i++) {
                    let s_date = new Date(rs[i].date);
                    let s4 = (s_date.getDate() < 10 ? '0' : '') + (s_date.getDate());
                    const month = s_date.getMonth() + 1;
                    let s5 = month.toString().padStart(2, '0')
                    // let s5 = (s_date.getMonth() < 10 ? '0' : '') + (s_date.getMonth()+1);
                    let s6 = s_date.getFullYear()
                    // search date
                    let rs_date = s6 + '-' + s5 + '-' + s4
                    // check 'today' == 'search date'
                    if (req.body.date == rs_date) {
                        arr.push(rs[i])
                    }
                }
                res.json(arr)
            }
        }
    }).sort({
        "invoice": 1
    });
});
//  create data
router.post('/create_qrcode', function (req, res, next) {
    console.log("req", req.body);
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
    // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    gen_qr.find({ sendmail: 'false' }, function (err, rs) {
        if (err) {
            res.json(err);
        } else {
            // check get data rs != ''
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
                        for (let p = 0; p < req.body.length; p++) {
                            if (rs[i].model == req.body[p].model && rs[i].invoice == req.body[p].invoice) {
                                let condition = { model: req.body[p].model, invoice: req.body[p].invoice };
                                gen_qr.deleteMany(condition, function (err, rs) { });
                            }
                        }
                    }
                }
                gen_qr.insertMany(req.body, function (err, rs) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(rs);
                    }
                })
            } else {
                gen_qr.insertMany(req.body, function (err, rs) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(rs);
                    }
                })
            }
        }
    })
});

//  update data
router.post('/update_qrcode', function (req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
    // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    gen_qr.find({ sendmail: 'false' }, function (err, rs) {
        if (err) {
            res.json(err);
        } else {
            // check get data rs != ''
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
                        if (rs[i].invoice == req.body.invoice) {
                            let condition = { invoice: req.body.invoice };
                            gen_qr.updateMany(condition, req.body, function (err, rs) { });
                        }
                    }
                }
                res.json(arr)
            }
        }
    })
});

router.post('/update_qrcode_sendmail', function (req, res, next) {
    let date = new Date();
    let s1 = date.getDate()
    let s2 = date.getMonth()
    let s3 = date.getFullYear()
    // today
    let check_date = s1 + '-' + (s2 + 1) + '-' + s3
    gen_qr.find({ sendmail: 'false' }, function (err, rs) {
        if (err) {
            res.json(err);
        } else {
            // check get data rs != ''
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
                        let condition = { sendmail: req.body.sendmail }
                        gen_qr.updateMany(condition, function (err, rs) { })
                    }
                }
                res.json(rs)
            }
        }
    })
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
module.exports = router;