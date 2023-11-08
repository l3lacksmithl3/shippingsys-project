var express = require('express');
var router = express.Router();
let mongoose = require('./connect');
const nodemailer = require("nodemailer")
// var fs = require('fs-extra');
const path = require('path');
var pdf = require('html-pdf');


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
router.post('/sendmail', function (req, res, next) {
  console.log("req.body",req.body);
  let date1 = new Date();
  let s1 = (date1.getDate() < 10 ? '0' : '') + (date1.getDate());
  let s2 = (date1.getMonth() < 10 ? '0' : '') + (date1.getMonth() + 1);
  let s3 = date1.getFullYear()
  let s4 = (date1.getHours() < 10 ? '0' : '') + (date1.getHours())
  let s5 = (date1.getMinutes() < 10 ? '0' : '') + (date1.getMinutes())
  let s6 = (date1.getSeconds() < 10 ? '0' : '') + (date1.getSeconds())
  let date = s3 + s2 + s1 + '_' + s4 + s5 + s6
  var options = { format: 'Letter' };
  let html = `<html lang="en"><head>
  <meta charset="utf-8">
<style>
      body[_ngcontent-ymk-c54] {
        background-color: #fff;
        margin: 40px;
        font: 13px/20px normal Helvetica, Arial, sans-serif;
        color: #4F5155;
      }
      a[_ngcontent-ymk-c54] {
        color: #003399;
        background-color: transparent;
        font-weight: normal;
      }
      #print[_ngcontent-ymk-c54] {
        height:100%;
        color:white;
        font-size:14px;
        size: A4;
        margin: 0;
      }
      table[_ngcontent-ymk-c54] {
        border-collapse: collapse;
      }
      table[_ngcontent-ymk-c54], th[_ngcontent-ymk-c54], td[_ngcontent-ymk-c54] {
        border: 1px solid black;
        border-collapse: collapse;
        }
      @page {
        size: A4;
        margin: 0;
        }
      .book[_ngcontent-ymk-c54] {
        float: none;
        }
      .page[_ngcontent-ymk-c54] {
        width: 210mm;
        min-height: 297mm;
        margin: 10mm auto;
        }
      .subpage[_ngcontent-ymk-c54] {
        padding: 1cm;
        border: 1px black solid;
        box-shadow: 0 .5mm 2mm rgba(0, 0, 0, .3);
        height: 297mm;
        background: white;
        color: black;
        }
      td[_ngcontent-ymk-c54] {
        padding-left: 2mm;
        }
      tr.table-header[_ngcontent-ymk-c54], tr.table-header[_ngcontent-ymk-c54] > th[_ngcontent-ymk-c54] {
        border: 1px solid black;
        text-align: center;
        }
      tr.table-body[_ngcontent-ymk-c54], tr.table-body[_ngcontent-ymk-c54] > td[_ngcontent-ymk-c54] {
        border-left: 1px solid black;
        border-right: 1px solid black;
        }
      tr.table-body[_ngcontent-ymk-c54]:last-child {
        border-bottom: 1px solid black;
        }
      .chapter-title[_ngcontent-ymk-c54] {
        font-weight: bold;
        text-decoration: underline;
        }
      .break-after[_ngcontent-ymk-c54] {
        display: block;
        page-break-after: always;
        position: relative;
        }
      @media print {
        html[_ngcontent-ymk-c54], body[_ngcontent-ymk-c54] {
          width: 210mm;
          height: 297mm;
        }
        div[_ngcontent-ymk-c54] {
          overflow: initial !important;
          float: none !important;
        }
        .book[_ngcontent-ymk-c54] {
          float: none !important;
        }
        .page[_ngcontent-ymk-c54] {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
          float: none !important;
        }
      }
</style></head>
<body>
  <div _ngcontent-ymk-c54="" id="print">
  <table _ngcontent-ymk-c54="" class="table table-bordered" style="font-size: 14px; width: 100%; text-align: center; padding-top: 1%;">
    <thead _ngcontent-ymk-c54="">
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="12">KYOCERA (Thailand) Co.,Ltd.</th>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="11">AMT STOCK IN</th>
        <th _ngcontent-ymk-c54="" colspan="1">Page 1 of 2</th>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="11">FINISHED GOOD PRODUCT</th>
        <th _ngcontent-ymk-c54="" colspan="1" style="text-align: left;">No.</th>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="6">PRODUCT TYPE</th>
        <th _ngcontent-ymk-c54="" colspan="6">STATUS</th>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <td _ngcontent-ymk-c54="" colspan="3">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 25%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Mass</label>
          </div>
        </td>
        <td _ngcontent-ymk-c54="" colspan="3">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 23%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Other</label>
          </div>
        </td>
        <td _ngcontent-ymk-c54="" colspan="6">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 3%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Stock In</label>
          </div>
        </td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <td _ngcontent-ymk-c54="" colspan="3">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 25%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Prelaunch</label>
          </div>
        </td>
        <td _ngcontent-ymk-c54="" colspan="3"></td>
        <td _ngcontent-ymk-c54="" colspan="3" style="background-color: grey;"></td>
        <td _ngcontent-ymk-c54="" colspan="3"></td>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="2">MODEL NO.</th>
        <th _ngcontent-ymk-c54="" colspan="4">MODEL NAME</th>
        <th _ngcontent-ymk-c54="" colspan="1">Q'TY</th>
        <th _ngcontent-ymk-c54="" colspan="1">PALLET NO.</th>
        <th _ngcontent-ymk-c54="" colspan="2">INVOICE NO.</th>
        <th _ngcontent-ymk-c54="" colspan="2">REMARK</th>
      </tr>
    </thead>
    <tbody _ngcontent-ymk-c54="">`
    for(let i = 0 ; i < req.body.data.length; i++){
      html +=  `<tr _ngcontent-qpy-c54="" style="border: 1px solid black;">
      <td _ngcontent-qpy-c54="" width="20%" colspan="2" style="word-break: break-all;border: 1px solid black;">${req.body.data[i].model_no}</td>
      <td _ngcontent-qpy-c54="" width="20%" colspan="4" style="word-break: break-all;border: 1px solid black;">${req.body.data[i].model}</td>
      <td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="15%" colspan="1">${req.body.data[i].qty}</td>`
      if(req.body.data[i].type == 'Normal'){
  html +=   `<td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="10%" colspan="1">${req.body.data[i].total_pallet}</td>`
      }else{
  html +=   `<td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="10%" colspan="1">${req.body.data[i].total_pallet} (Box)</td>`
      }
  html +=    `<td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="20%" colspan="2">${req.body.data[i].invoice}</td>
      <td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="15%" colspan="2"></td>
    </tr>`
    }
  html +=  `</tbody>
      <tr _ngcontent-ymk-c54="">
        <td _ngcontent-ymk-c54="" colspan="6"></td>
        <td _ngcontent-ymk-c54="" colspan="1">${req.body.sum_all}</td>
        <td _ngcontent-ymk-c54="" colspan="5"></td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <th _ngcontent-ymk-c54="" colspan="1">ISSUED BY</th>
        <td _ngcontent-ymk-c54="" colspan="11"></td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <th _ngcontent-ymk-c54="" colspan="1">SECTION</th>
        <td _ngcontent-ymk-c54="" colspan="11"> AM-PD </td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <th _ngcontent-ymk-c54="" colspan="1">DATE</th>
        <td _ngcontent-ymk-c54="" colspan="11">${req.body.date}</td>
      </tr>
  </table>
  <table _ngcontent-ymk-c54="" class="table table-bordered" style="font-size: 14px; width: 100%; text-align: center; page-break-before: always;padding-top: 1%;">
    <thead _ngcontent-ymk-c54="">
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="12">KYOCERA (Thailand) Co.,Ltd.</th>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="11">AMT STOCK OUT</th>
        <th _ngcontent-ymk-c54="" colspan="1">Page 2 of 2</th>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="11">FINISHED GOOD PRODUCT</th>
        <th _ngcontent-ymk-c54="" colspan="1" style="text-align: left;">No.</th>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="6">PRODUCT TYPE</th>
        <th _ngcontent-ymk-c54="" colspan="6">STATUS</th>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <td _ngcontent-ymk-c54="" colspan="3">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 25%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Mass</label>
          </div>
        </td>
        <td _ngcontent-ymk-c54="" colspan="3">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 23%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Other</label>
          </div>
        </td>
        <td _ngcontent-ymk-c54="" colspan="3" style="background-color: grey;"></td>
        <td _ngcontent-ymk-c54="" colspan="3"></td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <td _ngcontent-ymk-c54="" colspan="3">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 25%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Prelaunch</label>
          </div>
        </td>
        <td _ngcontent-ymk-c54="" colspan="3"></td>
        <td _ngcontent-ymk-c54="" colspan="6">
          <div _ngcontent-ymk-c54="" class="form-check" style="padding-left: 3%;">
            <input _ngcontent-ymk-c54="" type="checkbox" value="" id="flexCheckChecked" class="form-check-input">
            <label _ngcontent-ymk-c54="" for="flexCheckChecked" class="form-check-label">Stock Out</label>
          </div>
        </td>
      </tr>
      <tr _ngcontent-ymk-c54="">
        <th _ngcontent-ymk-c54="" colspan="2">MODEL NO.</th>
        <th _ngcontent-ymk-c54="" colspan="4">MODEL NAME</th>
        <th _ngcontent-ymk-c54="" colspan="1">Q'TY</th>
        <th _ngcontent-ymk-c54="" colspan="1">PALLET NO.</th>
        <th _ngcontent-ymk-c54="" colspan="2">INVOICE NO.</th>
        <th _ngcontent-ymk-c54="" colspan="2">REMARK</th>
      </tr>
    </thead>
    <tbody _ngcontent-ymk-c54="">`
    for(let i = 0 ; i < req.body.data.length; i++){
      html +=  `<tr _ngcontent-qpy-c54="" style="border: 1px solid black;">
      <td _ngcontent-qpy-c54="" width="20%" colspan="2" style="word-break: break-all;border: 1px solid black;">${req.body.data[i].model_no}</td>
      <td _ngcontent-qpy-c54="" width="20%" colspan="4" style="word-break: break-all;border: 1px solid black;">${req.body.data[i].model}</td>
      <td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="15%" colspan="1">${req.body.data[i].qty}</td>`
      if(req.body.data[i].type == 'Normal'){
  html +=   `<td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="10%" colspan="1">${req.body.data[i].total_pallet}</td>`
      }else{
  html +=   `<td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="10%" colspan="1">${req.body.data[i].total_pallet} (Box)</td>`
      }
  html +=    `<td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="20%" colspan="2">${req.body.data[i].invoice}</td>
      <td _ngcontent-qpy-c54="" style="border: 1px solid black;" width="15%" colspan="2"></td>
    </tr>`
    }
  html +=  `</tbody>
      <tr _ngcontent-ymk-c54="">
        <td _ngcontent-ymk-c54="" colspan="6"></td>
        <td _ngcontent-ymk-c54="" colspan="1">${req.body.sum_all}</td>
        <td _ngcontent-ymk-c54="" colspan="5"></td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <th _ngcontent-ymk-c54="" colspan="1">ISSUED BY</th>
        <td _ngcontent-ymk-c54="" colspan="11"></td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <th _ngcontent-ymk-c54="" colspan="1">SECTION</th>
        <td _ngcontent-ymk-c54="" colspan="11"> AM-PD </td>
      </tr>
      <tr _ngcontent-ymk-c54="" style="text-align: left;">
        <th _ngcontent-ymk-c54="" colspan="1">DATE</th>
        <td _ngcontent-ymk-c54="" colspan="11">${req.body.date}</td>
      </tr>
  </table>
  </div>
</body></html>`

  pdf.create(html, options).toFile('./doc/AMPDF4040.X.FGINOUT-' + date + '.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
  setTimeout(() => {
  member.find(function(err, rs) {
      if (err) {
          res.json(err);
      } else {
        let fromm
        let pass
        let to = []
        for (let i = 0; i < rs.length; i++) {
          if(rs[i].status == 'admin'){
            fromm = rs[i].email
            pass = rs[i].pass
          }else{
            to.push(rs[i])
          }
        }
        let transporter = nodemailer.createTransport({
          // host: "mail.in.kyocera.co.jp",
          // port: 25,
          // secure: false, // true for 465, false for other ports
                maxConnections: 3, // 3<-----------ADD THIS LINE
                pool: true,        //<-----------ADD THIS LINE
                host: "smtp.office365.com",
                port: "587",
                secure: false,
                auth: {
                    user: fromm ,
                    pass: pass,
                },          
        });
        for (let x = 0; x < to.length; x++) {
            let info = transporter.sendMail({
              from: fromm,
              to: to[x].email, // list of receivers
              subject: "[Complete]Shipment Data Match With Shipping Label.", // Subject line
              text: 'Dear' + ' ' +to[x].name+ `-san ,

            I would like to inform about data shipping invoice data from logistic , please refer file as below.










        If there is any question, please do not hesitate to ask me.

  Thank you.




  Best regards,
  Ms.Supukporn Sompaogee.
  AMPD section
  Tel.1907
  Kyocera (Thailand) co.,ltd.`,

              attachments: [{
                filename: 'AMPDF4040.X.FGINOUT-'+date+'.pdf',
              path: './doc/AMPDF4040.X.FGINOUT-'+date+'.pdf'
              }],
            });
        }
        res.json([{
          Alert: "send Mail"
        }]);
      }
    })
  }, 10000);
});


// router.post('/sendmail', function (req, res, next) {
//   // console.log(req.files.pdfName);
//   // let avatar = req.files.pdfName;
//   // // var pathserver = "C:/xampp/htdocs";
//   // var pathserver = "D:/images/Equipment_Controls";
//   // // var imgname = new Date().getTime();
//   // var pathservers = '/Equipment_Controls/' + req.files.pdfName.name;
//   // var path = pathservers;
//   // avatar.mv(pathserver + pathservers);
//   // res.json(path);
//   var fs = require('fs')
//   let date = new Date();
//   let s5 = (date.getMonth() < 10 ? '0' : '') + (date.getMonth()+1);
//   let s3 = date.getFullYear()
//   let Month
//     switch (s5) {
//       case "01":
//       Month = "Jan";
//         break;
//         case "02":
//       Month = "Febr";
//         break;
//         case "03":
//       Month = "Mar";
//         break;
//         case "04":
//       Month = "Apr";
//         break;
//         case "05":
//       Month = "May";
//         break;
//         case "06":
//       Month = "Jun";
//         break;
//         case "07":
//       Month = "Jul";
//         break;
//         case "08":
//       Month = "Aug";
//         break;
//         case "09":
//       Month = "Sep";
//         break;
//         case "10":
//       Month = "Oct";
//         break;
//         case "11":
//       Month = "Nov";
//         break;
//         case "12":
//       Month = "Dec";
//         break;
//     }
//     let directoryFolder = ('C:/Users/Paniti-K/Desktop/shipping-project/src/assets/pdf/'+s3+'/')
//     let path = ('C:/Users/Paniti-K/Desktop/shipping-project/src/assets/pdf/'+s3+'/'+Month+'/')
//     if (!fs.existsSync(directoryFolder)) {
//       fs.mkdirSync(directoryFolder, { recursive: true });
//       fs.mkdirSync(path, { recursive: true });
//     }else if (!fs.existsSync(path)) {
//       fs.mkdirSync(path, { recursive: true });
//     }else{}

//     var oldPath = 'C:/Users/Paniti-K/Downloads/'+req.body.name
//     var newPath = 'C:/Users/Paniti-K/Desktop/shipping-project/src/assets/pdf/'+s3+'/'+Month+'/'
//     setTimeout(() => {
//     fs.copyFile(oldPath, newPath, function (err) {
//       if (err) throw err
//         console.log('Successfully renamed - AKA moved!')
//       })
//     member.find(function(err, rs) {
//         if (err) {
//             res.json(err);
//         } else {
//           let fromm
//           let to = []
//           for (let i = 0; i < rs.length; i++) {
//             if(rs[i].status == 'admin'){
//               fromm = rs[i].email
//             }else{
//               to.push(rs[i])
//             }
//           }
//           let transporter = nodemailer.createTransport({
//             host: "mail.in.kyocera.co.jp",
//             port: 25,
//             secure: false, // true for 465, false for other ports
//           });
//           for (let x = 0; x < to.length; x++) {
//               let info = transporter.sendMail({
//                 from: fromm,
//                 to: to[x].email, // list of receivers
//                 subject: "[Complete]Shipment Data Match With Shipping Label.", // Subject line
//                 text: 'Dear' + ' ' +to[x].name+ `-san ,

//               I would like to inform about data shipping invoice data from logistic , please refer file as below.










//           If there is any question, please do not hesitate to ask me.

//     Thank you.




//     Best regards,
//     Ms.Supukporn Sompaogee.
//     AMPD section
//     Tel.1907
//     Kyocera (Thailand) co.,ltd.`,

//                 attachments: [{
//                   filename: req.body.name,
//                 path: 'C:/Users/supukporn-s/Desktop/Ticket_IN-OUT/'+s3+'/'+Month+'/'+req.body.name
//                 }],
//               });
//           }
//           res.json([{
//             Alert: "send Mail"
//           }]);
//         }
//       })
//     }, 10000);
// });

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
module.exports = router;
