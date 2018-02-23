const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  // db
  //   .collection('Todos')
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID('5a8f8e13f3e4a0496084c01b'),
  //     },
  //     {
  //       $set: {
  //         completed: true,
  //       },
  //     },
  //     {
  //       returnOriginal: false,
  //     },
  //   )
  //   .then((result) => {
  //     console.log(result);
  //   });

  db
    .collection('Users')
    .findOneAndUpdate(
      {
        _id: new ObjectID('5a8f8ce8f3e4a0496084c019'),
      },
      {
        $set: {
          name: 'Babe',
        },
        $inc: {
          age: 1,
        },
      },
      {
        returnOriginal: false,
      },
    )
    .then((result) => {
      console.log(result);
    });

  // client.close();
});
