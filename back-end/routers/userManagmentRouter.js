const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const UrlData = require('../DB/urlDataClass');
const { checkNewUser } = require('./helpers');
const { checkLongUrlByUserName, checkCustomWord, isValidHttpUrl } = require('../middlewares/validator');
const { createAndSaveCustomNewUrl } = require('../controller/urlData');
// localhost:3000/users
// const BASEURL = "http://localhost:3000/api";
const BASEURL = 'https://ramas-url-shortener.herokuapp.com/api';

//Generate custom short url
router.post('/', isValidHttpUrl, checkLongUrlByUserName, checkCustomWord, createAndSaveCustomNewUrl);

//Return array of user history by userName
router.get('/history/:userName', (req, res) => {
  try {
    const userName = req.params.userName;
    checkNewUser(userName); // if no DB for the userName open new one
    const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
    const currentData = JSON.parse(fs.readFileSync(userFilePath));
    const historyObjArr = [];
    //Insert date and short URL from every urlData object
    for (let url in currentData) {
      const currentUrlData = {};
      currentUrlData['shortUrl'] = currentData[url]['shortUrl'];
      currentUrlData['date'] = currentData[url]['date'];
      historyObjArr.push(currentUrlData);
    }
    res.send(historyObjArr);
  } catch (error) {
    throw { status: error.status, messege: error.messege };
  }
});

module.exports = router;
