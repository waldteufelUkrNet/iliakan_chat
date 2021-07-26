const createError = require('http-errors');
module.exports = function(req,res,next){
  if(!req.session.user) {
    next(createError(403, '403: Доступ заборонено'));
  } else {
    next();
  }
}