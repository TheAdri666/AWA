const router = require('express').Router();
const ImageCtrl = require('../controllers/imageController');

router
  .route('/')
  .post(ImageCtrl.addImages);

router
  .route('/:id')
  .get(ImageCtrl.getImageById);

module.exports = router;
