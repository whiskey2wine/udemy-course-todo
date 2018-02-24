const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../model/todo');

const todosInit = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
  },
];

beforeEach((done) => {
  Todo.remove({})
    .then(() => Todo.insertMany(todosInit))
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text.';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todosInit[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todosInit[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    const hexID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/1234')
      .expect(404)
      .end(done);
  });
});

describe('DELECT /todos/:id', () => {
  it('should remove todo', (done) => {
    const hexID = todosInit[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID)
          .then((todo) => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    const hexID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/1234')
      .expect(404)
      .end(done);
  });
});
