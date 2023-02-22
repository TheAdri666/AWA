const router = require('express').Router();
const BookCtrl = require('../controllers/bookController');

router
  .route('/')
  .post(BookCtrl.saveBook);

router
  .route('/:name')
  .get(BookCtrl.getBook);

module.exports = router;
