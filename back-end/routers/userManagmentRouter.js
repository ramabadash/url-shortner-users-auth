const express = require('express');
const router = express.Router();
const {
  checkLongUrlByUserName,
  checkCustomWord,
  isValidHttpUrl,
} = require('../middlewares/validator');
const {
  createAndSaveCustomNewUrl,
  getUserHistory,
  deleteUrlData,
} = require('../controller/urlData');
const { checkTokenAuth } = require('../middlewares/validator');

// localhost:3000/users
// const BASEURL = "http://localhost:3000/api";

//Generate custom short url
router.post(
  '/',
  checkTokenAuth,
  isValidHttpUrl,
  checkLongUrlByUserName,
  checkCustomWord,
  createAndSaveCustomNewUrl
);

//Return array of user history by userName
router.get('/history/:userName', checkTokenAuth, getUserHistory);

//Delete urlData
router.delete('/delete', checkTokenAuth, deleteUrlData);

module.exports = router;
