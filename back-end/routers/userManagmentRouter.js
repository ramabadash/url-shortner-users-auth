const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const UrlData = require('../DB/urlDataClass');
const {isValidHttpUrl, checkNewUser, checkCustomWord} = require("./helpers");

// localhost:3000/users
// const BASEURL = "http://localhost:3000/api";
const BASEURL = "https://ramas-url-shortener.herokuapp.com/api";

//Generate custom short url
router.post("/" ,(req, res) => {
    try {
        const longUrl = req.body.longUrl;
        const userName = req.body.userName;
        const customWord = req.body.customWord;
        if (!customWord)  throw {"status": 400, "messege": "Must insert a custom word. You can try to shorten to a general address on the home page"}; 
        checkNewUser(userName); //Open a new file if the user is new
        if ( !isValidHttpUrl(longUrl)) throw {"status": 400, "messege": "invalid URL"};
        const id = checkCustomWord(userName, customWord, longUrl); //Check if custom word is available
        const shortUrl = `${BASEURL}/${userName}/${id}`;
        const urlData = new UrlData(longUrl, id, shortUrl); //Create url data object
        const saveResult = urlData.saveToUserDir(userName, true);
        if(saveResult) res.send(saveResult); //The address has been shortened in the past.
        else res.send(shortUrl);
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
});
//Return array of user history by userName
router.get("/history/:userName", (req, res)=> {
    try {
        const userName = req.params.userName;
        checkNewUser(userName); // if no DB for the userName open new one
        const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
        const currentData = JSON.parse(fs.readFileSync(userFilePath));
        const historyObjArr = [];
        //Insert date and short URL from every urlData object
        for (let url in currentData) {
            const currentUrlData = {};
            currentUrlData["shortUrl"] = currentData[url]["shortUrl"];
            currentUrlData["date"] = currentData[url]["date"];
            historyObjArr.push(currentUrlData);
        }
        res.send(historyObjArr);
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
});

module.exports = router;

