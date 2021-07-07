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
      path         = require('path'),
      debug        = require('debug')('app'),
      cookieParser = require('cookie-parser'),  // Cookies -> req.cookies / req.signedCookies
      bodyParser   = require('body-parser'),    // розбирає тіло POST-запиту, -> req.body. ...
      logger       = require('morgan'),         // логер результатів мережевих запитів
      createError  = require('http-errors'),

      // indexRouter  = require('./routes/index'),
      // usersRouter  = require('./routes/users'),
      // http         = require('http'),
      config       = require('./config'),
      log          = require('./libs/log')(module),
      port         = config.get('port');

let app = express();
app.listen(port);

// app.set('port', port);
// http.createServer(app).listen(port, function(){
//   console.log('Express server listening on port ' + port));
// });

// view engine setup
app.set('views', path.join(__dirname, 'templates/'));
app.set('view engine', 'ejs');

if (app.get('env') == 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(function(req,res,next){
  res.setHeader('Content-type', 'text/html; charset=utf-8');
  log.info('Express server listening on port: ' + port);
  res.render('index', { title: 'Hey', message: 'Hello there!'});
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Сторінку не знайдено'));
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