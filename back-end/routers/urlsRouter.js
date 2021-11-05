const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const UrlData = require('../DB/urlDataClass');

// localhost:3000/api
const BASEURL = "http://localhost:3000/api";

// Generates a new id and saves it in the database
router.post("/", (req, res) => {
    try {
        const longUrl = req.body.longUrl;
        const userName = req.body.userName;
        checkNewUser(userName);
        if ( !isValidHttpUrl(longUrl)) throw {"status": 400, "messege": "invalid URL"};
        const id = generateId(userName);
        const shortUrl = `${BASEURL}/${userName}/${id}`;
        const urlData = new UrlData(longUrl, id, shortUrl);
        const saveResult = urlData.saveToUserDir(userName);
        if(saveResult) res.send(saveResult); //The address has been shortened in the past.
        else res.send(shortUrl);
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})

//Receives a request from a short URL and redirects it to the original site (long URL)
router.get("/:userName/:id", (req, res) => {
    try {
        const userName = req.params.userName;
        const id = req.params.id;
        const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
        const currentData = JSON.parse(fs.readFileSync(userFilePath));
        const urlDataObj = currentData[id];
        if (!urlDataObj) throw {"status": 404 , "messege": "The website does not exist"};
        updateUrlGetCount(id, userName); 
        res.status(301).header("Location", urlDataObj.longUrl).end();
    } catch (error) {
        console.log(error);
        throw {"status": error.status, "messege": error.messege};
    }
})

module.exports = router;

/*---------- HELPERS ----------*/

//Increases the url entry counter each time you enter it
function updateUrlGetCount(id, userName) {
    const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
    const currentData = JSON.parse(fs.readFileSync(userFilePath));
    currentData[id].getCount += 1;
    fs.writeFileSync(`${userFilePath}`, JSON.stringify(currentData));
}
//Checks if the url is valid
function isValidHttpUrl(string) {
    let url;
    try {
      if (string.length >= 1000) {
        return false;
      }
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
//Generates a new id and checks if it is unique, if not invents a new one and repeats the process. If unique will return it
function generateId(userName) {
    const id = '_' + Math.random().toString(36).substr(2, 9);
    const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
    const currentData = JSON.parse(fs.readFileSync(userFilePath));
    if (currentData[id]) return generateId(); //The id already exists, create a new one
    else return id;
}
//If new user open new file for data
function checkNewUser(userName) {
    const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
    if(!fs.existsSync(userFilePath)) {
        fs.writeFileSync(`${userFilePath}`, JSON.stringify({})); //Make new dir with empty object 
    }
    return;
}