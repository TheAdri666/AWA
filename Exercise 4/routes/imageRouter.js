const router = require('express').Router();
const ImageCtrl = require('../controllers/imageController');

router
  .route('/')
  .post(ImageCtrl.addImages);

module.exports = router;
