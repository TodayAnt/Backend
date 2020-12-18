const express = require('express');
const interestController = require('../controller/interest.controller');
const router = express.Router();

router.get('/', interestController.interestPage);

router.get('/data', interestController.getInterest);

router.post('/', interestController.setInterest);

module.exports = router;
  