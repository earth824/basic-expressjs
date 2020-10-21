const express = require('express');
const todoRouter = require('./routes/todo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public/'));

app.use('/todos', todoRouter);

app.use((req, res, next) => {
  const error = new Error();
  error.message = 'path not found';
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

const port = 8000;
app.listen(port, () => {
  console.log(`server starting on port ${port}`);
});