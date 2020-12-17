const express = require('express');
const { indexPage } = require('../controller/index.controller');
const router = express.Router();
const postController = require('../controller/post.controller');
const mailController = require('../controller/mail.controller');

router.get('/', indexPage);

router.get('/api/posts', postController.getPosts);

router.get('/api/gmail', mailController.sendGmail);

module.exports = router;
  