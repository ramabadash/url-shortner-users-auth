const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { checkLongUrlByUserName, checkCustomWord, isValidHttpUrl } = require('../middlewares/validator');
const { createAndSaveCustomNewUrl, getUserHistory } = require('../controller/urlData');
// localhost:3000/users
// const BASEURL = "http://localhost:3000/api";

//Generate custom short url
router.post('/', isValidHttpUrl, checkLongUrlByUserName, checkCustomWord, createAndSaveCustomNewUrl);

//Return array of user history by userName
router.get('/history/:userName', getUserHistory);

module.exports = router;
