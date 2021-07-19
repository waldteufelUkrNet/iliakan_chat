const { MongoClient } = require('mongodb');

// Connection URL
const url    = 'mongodb://localhost:27017/',
      client = new MongoClient(url);

// Database Name
const dbName = 'ik_chat';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db         = client.db(dbName),
        collection = db.collection('documents');


  const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
  console.log('Inserted documents =>', insertResult);


  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())