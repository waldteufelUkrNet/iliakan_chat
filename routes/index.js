const express  = require('express'),
      router   = express.Router(),
      ObjectID = require('mongodb').ObjectID,
      User     = require('../models/user').User;

router.get('/', function(req,res,next){
  res.render('index', {title: "chat application"});
  // res.send('index');
});

router.get('/login.html', function(req,res,next){
  res.render('login');
});

router.post('/login', function(req,res,next){
  let username = req.body.name,
      userpass = req.body.pass;

  User.findOne({username: username}, function(err, user){
    if(err) return next(err);

    if (!user) {
      // create user
      User.create({username: username, password: userpass}, function(err, user){
        if(err) return res.sendStatus(400);

        // cookie
        req.session.user = user._id;
        res.sendStatus(200);
      });
    } else {
      // check password
      if ( user.checkPassword(userpass) ) {
        // cookie
        req.session.user = user._id;
        res.sendStatus(200);
      } else {
        return res.sendStatus(403);
      }
    }
  });
});

router.post('/logout', function(req,res,next){
  console.log("req.method", req.method);
  req.session.destroy(function(err) {
    console.log('destroyed');
    res.sendStatus(200);
    // серверний redirect() не спрацював, довелося використовувати
    // браузерний window.location.href
  });
});

router.get('/users', function(req,res,next){
  User.find({},function(err,users){
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/user/:id', function(req,res,next){
  try {
    let id = new ObjectID(req.params.id);
  } catch (e) {
    res.render('error',{status:'404',message:'такий користувач не зареєстрований'});
    return
  }
  User.findById(req.params.id,function(err, user){
    if (err) {
      return next(err);
    }
    if (!user) {
      // next(createError(404, 'Користувача не знайдено'));
      res.render('error',{status:'404',message:'такий користувач не зареєстрований'});
    }
    res.json(user);
  });
});

router.get('/chat', function(req,res,next){
  res.render('chat');

});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = router;