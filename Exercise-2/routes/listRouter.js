const router = require('express').Router();
const ListCtrl = require('../controllers/listController');

router
  .route('/')
  .post(ListCtrl.addToList);

module.exports = router;