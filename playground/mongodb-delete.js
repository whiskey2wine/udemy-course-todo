// @flow
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  // deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({ name: 'Bacon' });

  db
    .collection('Users')
    .findOneAndDelete({
      _id: new ObjectID('5a8e629f420c7a29a8273aec'),
    })
    .then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
    });

  // client.close();
});
