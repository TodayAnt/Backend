const express = require('express');
const router = express.Router();
const mailController = require('../controller/mail.controller');

router.get('/gmail', mailController.sendGmail);

module.exports = router;