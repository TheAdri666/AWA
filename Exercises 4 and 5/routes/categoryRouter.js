const router = require('express').Router();
const CategoryCtrl = require('../controllers/categoryController');

router
  .route('/')
  .get(CategoryCtrl.getAllCategories);

router
  .route('/:name')
  .get(CategoryCtrl.getCategory)
  .post(CategoryCtrl.addCategory);

module.exports = router;
