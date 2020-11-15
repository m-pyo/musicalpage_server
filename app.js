const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose'); //mongoDB 연결
const config = require('./config/key');

const musicalRouter = require('./routes/musical');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/img',express.static('./public/images')); //이미지 위치 
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ limit:"50mb", extended: true })); //인수 - 용량제한 설정
app.use(bodyParser.json({ limit : "50mb" })); //인수 - 용량제한 설정
app.use(cors());

//mongoDB 연결
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB connected'))
    .catch(err=> console.log(err))

//뮤지컬 조회 관련 라우터
app.use('/musical',musicalRouter);

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
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;