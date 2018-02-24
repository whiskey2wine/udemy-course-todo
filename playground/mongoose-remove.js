const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');

// Todo.remove({}).then((result) => {
//   console.log(JSON.stringify(result, undefined, 2));
// });

Todo.findOneAndRemove({ _id: '5a91466d67c8684d407d9a7b' }).then((todo) => {
  console.log(JSON.stringify(todo, undefined, 2));
});

Todo.findByIdAndRemove('5a91466d67c8684d407d9a7b').then((todo) => {
  console.log(JSON.stringify(todo, undefined, 2));
});
