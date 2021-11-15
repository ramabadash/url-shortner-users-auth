const express = require('express');
const router = express.Router();
const { getUrlStats } = require('../controller/urlData');

//Get stats for short url by id
router.get('/:userName/:id', getUrlStats);

module.exports = router;
