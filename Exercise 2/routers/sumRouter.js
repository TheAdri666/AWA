const  router = require('express').Router();
const SumCtrl = require('../controllers/sumController');

router
  .route('/')
  .post(SumCtrl.sum);

module.exports = router;