const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/', todoController.getTodos);
router.get('/:id', todoController.validateId, todoController.getTodo);
router.post('/', todoController.createTodo);
router.patch('/:id', todoController.validateId, todoController.updateTodo);
router.delete('/:id', todoController.validateId, todoController.deleteTodo);

module.exports = router;