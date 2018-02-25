const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../model/todo');
const { User } = require('./../../model/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
  {
    _id: userOneId,
    email: 'jayakorn.karikan@gmail.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    email: 'whiskey2wine@gmail.com',
    password: 'userTwoPass',
  },
];

const todosInit = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
  },
];

const populateTodos = (done) => {
  Todo.remove({})
    .then(() => Todo.insertMany(todosInit))
    .then(() => done());
};

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todosInit, populateTodos, users, populateUsers,
};
