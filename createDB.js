const mongoose = require('./libs/mongoose'),
      config   = require('./config'),
      User     = require('./models/user').User;

// 1. drop db
// 2. create 3 users
// 3. close connection

async function dropAddandClose() {
  await mongoose.disconnect();
  let connection = mongoose.createConnection(config.get('mongoose:uri'));
  await connection.dropDatabase();

  await mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

  let user1 = new User({username:'Tom',password:'fvdksjva67yhijn'}),
      user2 = new User({username:'Ted',password:'dsfvae8y9ojkml3'}),
      user3 = new User({username:'Lev',password:'vfdmni78900icks'});

  await user1.save().then( console.log('ok') ).catch(console.error);
  await user2.save();
  await user3.save();

  mongoose.disconnect();
}
dropAddandClose();