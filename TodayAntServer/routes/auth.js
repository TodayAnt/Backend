const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller')

router.get('/login', authController.loginPage)

router.get('/join', authController.registPage)

router.post('/login', authController.login);

router.post('/join', authController.regist);

router.post('/getNewToken', authController.getNewToken);


module.exports = router;
