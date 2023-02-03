const router = require('express').Router();
const HelloCtrl = require('../controllers/helloController');

router
  .route('/')
  .get(HelloCtrl.helloWorld);

module.exports = router;