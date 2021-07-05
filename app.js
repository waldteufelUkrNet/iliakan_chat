/* ↓↓↓ this was default ↓↓↓ */
  // const createError  = require('http-errors'),
  //   express      = require('express'),
  //   path         = require('path'),
  //   cookieParser = require('cookie-parser'),
  //   logger       = require('morgan'),

  //   indexRouter  = require('./routes/index'),
  //   usersRouter  = require('./routes/users')

  // port         = 3000;

  // let app = express();
  // app.listen(port);

  // // view engine setup
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'ejs');

  // app.use(logger('dev'));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  // app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, 'public')));

  // app.use('/', indexRouter);
  // app.use('/users', usersRouter);

  // // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   next(createError(404));
  // });

  // // error handler
  // app.use(function(err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};

  //   // render the error page
  //   res.status(err.status || 500);
  //   res.render('error');
// });

// module.exports = app;
/* ↑↑↑ /this was default ↑↑↑ */

const express      = require('express'),
      // createError  = require('http-errors'),
      path         = require('path'),
      // cookieParser = require('cookie-parser'),
      // logger       = require('morgan'),

      // indexRouter  = require('./routes/index'),
      // usersRouter  = require('./routes/users'),

      port         = 3000;

const http         = require('http');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port);
// app.set('port', port);
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

app.use(function(req,res,next){
  res.setHeader('Content-type', 'text/html; charset=utf-8');
  console.log('Express server listening on port ' + port);

  if (req.url == '/') {
    res.end('Головна сторінка');
  } else {
    next();
  }
});

app.use(function(req,res,next){
  if (req.url == '/forbidden') {
    next(new Error('Доступ заборонено'));
  } else {
    next();
  }
});

app.use(function(req,res,next){
  if (req.url == '/test'){
    res.end('Тестова сторіка');
  } else {
    next();
  }
});

app.use(function(req,res){
  res.status(404).send('Сторінку не знайдено :-(');
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