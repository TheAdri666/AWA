const router = require('express').Router();
const EchoCtrl = require('../controllers/echoController');

router
  .route('/:id')
  .get(EchoCtrl.echo);

module.exports = router;