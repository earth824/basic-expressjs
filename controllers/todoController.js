const fs = require('fs');

const todoLists = JSON.parse(fs.readFileSync('./mocks/todo.json'));

exports.validateId = (req, res, next) => {
  const id = +req.params.id;
  const idx = todoLists.findIndex(el => el.id === id);

  if (idx === -1) {
    const error = new Error();
    error.statusCode = 404;
    error.message = 'Invalid Id';
    next(error);
  }

  req.idx = idx;
  next();
};

exports.getTodos = (req, res) => {
  const searchTask = req.query.search;

  if (searchTask) {
    const filteredTodoLists = todoLists.filter(el =>
      el.task.includes(searchTask))
    return res.status(200).send(filteredTodoLists);
  }

  res.status(200).send(todoLists);
};

exports.getTodo = (req, res) => {
  const id = +req.params.id;

  const todo = todoLists.filter(el => el.id === id);
  res.status(200).send({ todo: todo[0] });
};

exports.createTodo = (req, res) => {
  console.log(req.body)
  const newId = todoLists.length > 0 ? todoLists[todoLists.length - 1].id + 1 : 0;
  const newTodoList = {
    id: newId, task: req.body.task
  };

  todoLists.push(newTodoList);

  fs.writeFileSync('./mocks/todo.json', JSON.stringify(todoLists));
  res.status(201).send({ todo: newTodoList });
};

exports.updateTodo = (req, res) => {
  const id = +req.params.id;

  todoLists[req.idx] = { id: id, task: req.body.task };

  fs.writeFileSync('./mocks/todo.json', JSON.stringify(todoLists));
  res.status(200).send({ todo: todoLists[req.idx] });
};

exports.deleteTodo = (req, res) => {
  const id = +req.params.id;

  const newTodoLists = todoLists.filter(el => el.id !== id);
  fs.writeFileSync('./mocks/todo.json', JSON.stringify(newTodoLists));
  res.status(204).send();
};