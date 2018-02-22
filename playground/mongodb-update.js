const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  db
    .collection('Todos')
    .findOneAndUpdate(
      {
        _id: new ObjectID('5a8e5f85420c7a29a8273ae9'),
      },
      {
        $set: {
          completed: true,
        },
      },
      {
        returnOriginal: false,
      },
    )
    .then();

  // client.close();
});
