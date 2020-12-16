const express = require('express');
const { indexPage } = require('../controller/index.controller');
const router = express.Router();
const Controller = require('../controller/post.controller');

router.get('/', indexPage);

router.get('/api/posts', Controller.getPosts);

module.exports = router;
  