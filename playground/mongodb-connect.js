const { MongoClient } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server.');
    console.log(err);
    return;
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false,
  }, (error, result) => {
    if (error) {
      console.log('Unable to insert todo', error);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // db.collection('Users').insertOne({
  //   name: 'Bacon',
  //   age: 22,
  //   location: 'Thailand',
  // }, (error, result) => {
  //   if (error) {
  //     console.log('Unable to insert user', error);
  //   }

  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});

