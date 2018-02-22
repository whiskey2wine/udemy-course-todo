const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server.');
    console.log(err);
    return;
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a8e3dd4420c7a29a8273ae0'),
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (error) => {
  //   console.log('Unable to fetch todos', error);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (error) => {
  //   console.log('Unable to fetch todos', error);
  // });

  db.collection('Users').find({ name: 'Bacon' }).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (error) => {
    console.log('Unable to fetch todos', error);
    console.log('test');
  });

  // client.close();
});

