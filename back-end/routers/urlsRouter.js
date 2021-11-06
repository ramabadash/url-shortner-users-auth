const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const UrlData = require('../DB/urlDataClass');
const {updateUrlGetCount, isValidHttpUrl, generateId, checkNewUser} = require("./helpers");

// localhost:3000/api
// const BASEURL = "http://localhost:3000/api";
const BASEURL = "https://ramas-url-shortener.herokuapp.com/api";

// Generates a new id and saves it in the database
router.post("/", (req, res) => {
    try {
        const longUrl = req.body.longUrl;
        const userName = req.body.userName;
        checkNewUser(userName); //Open a new file if the user is new
        if ( !isValidHttpUrl(longUrl)) throw {"status": 400, "messege": "invalid URL"};
        const id = generateId(userName);
        const shortUrl = `${BASEURL}/${userName}/${id}`;
        const urlData = new UrlData(longUrl, id, shortUrl); //Create url data object
        const saveResult = urlData.saveToUserDir(userName);
        if(saveResult) res.send(saveResult); //The address has been shortened in the past.
        else res.send(shortUrl); //New address return the new one.
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})

//Receives a request from a short URL and redirects it to the original site (long URL), base on the DB
router.get("/:userName/:id", (req, res) => {
    try {
        const userName = req.params.userName;
        const id = req.params.id;
        const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
        const currentData = JSON.parse(fs.readFileSync(userFilePath));
        const urlDataObj = currentData[id];
        if (!urlDataObj) throw {"status": 404 , "messege": "The website does not exist"};
        updateUrlGetCount(id, userName); //Update the count of the time of people use the short link
        res.status(301).header("Location", urlDataObj.longUrl).end();
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})

module.exports = router;
