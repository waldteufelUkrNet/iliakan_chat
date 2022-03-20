const express      = require('express'),
      path         = require('path'),
      debug        = require('debug')('app'),
      // bodyParser   = require('body-parser'),    // розбирає тіло POST-запиту, -> req.body. ...
      logger       = require('morgan'),         // логер результатів мережевих запитів
      createError  = require('http-errors'),
      helmet       = require('helmet'),
      // cookieParser = require('cookie-parser'),  // Cookies -> req.cookies / req.signedCookies
      session      = require('express-session'),
      mongoStore   = require('connect-mongo'),
      indexRouter  = require('./routes/index'),
      // usersRouter  = require('./routes/users'),
      http         = require('http'),
      Socket       = require('socket.io'),
      config       = require('./config'),
      log          = require('./libs/log')(module),
      port         = config.get('port'),
      app          = express(),
      server       = new http.Server(app),
      sio          = Socket(server);

server.listen(port);

// view engine setupapp.set('views', path.join(__dirname, 'templates/'));
app.set('view engine', 'pug');

// app.use(helmet());

if (app.get('env') == 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let sessionConfiguration = config.get('session');
sessionConfiguration.store = mongoStore.create({ mongoUrl: config.get('mongoose:uri') });
app.use(session( sessionConfiguration ));

app.use( require('./middleware/loadUser.js') );

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, '404: Сторінку не знайдено'));
});

// error handler
app.use( require('./error') );

// web sockets
sio.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('messageToServer', function(msg, callback) {
    console.log('message: ' + msg);
    socket.broadcast.emit('messageToClient', msg);
    callback()
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});