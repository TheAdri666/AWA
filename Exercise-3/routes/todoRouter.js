const router = require('express').Router();
const TodoCtrl = require('../controllers/todoController');

router
  .route('/')
  .post(TodoCtrl.addTodo);
  
module.exports = router;