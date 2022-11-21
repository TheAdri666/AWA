const router = require('express').Router();
const UserCtrl = require('../controllers/userController');

router
  .route('/')
  .put(UserCtrl.deleteTodo);

router
  .route('/:id')
  .get(UserCtrl.findUserByName)
  .delete(UserCtrl.deleteUser)
  
module.exports = router;