var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')
var app = express();
var create_master =  require('./routes/create_master');
var import_file =  require('./routes/import_file');
var generate_qrcode =  require('./routes/generate_qrcode');
var sendmail =  require('./routes/sendmail');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload({ createParentPath: true, }))
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// console.log(__dirname)
app.use('/', create_master);
app.use('/', import_file);
app.use('/', generate_qrcode);
app.use('/', sendmail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');


});


// app.use(bodyParser.urlencoded({
//     limit: '5000mb',
//     parameterLimit: 100000,
//     extended: false
// }));

// app.use(bodyParser.json({
//     limit: '500mb'
// }));

const port = process.env.PORT || 4022;
const server = app.listen(port, () => {
    // console.log('Listening on port ' + server.address().port);
});
module.exports = app;