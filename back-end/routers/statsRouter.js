const express = require('express');
const router = express.Router();
const { getUrlStats } = require('../controller/urlData');
const { checkTokenAuth } = require('../middlewares/validator');

//Get stats for short url by id
router.get('/:userName/:id', checkTokenAuth, getUrlStats);

module.exports = router;
