const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const UrlData = require('../DB/urlDataClass');

// localhost:3000/api
const BASEURL = "http://localhost:3000/api/get";

// Generates a new id and saves it in the database
router.post("/", (req, res) => {
    try {
        const longUrl = req.body.longUrl;
        if ( !isValidHttpUrl(longUrl)) throw {"status": 400, "messege": "invalid URL"};
        const id = '_' + Math.random().toString(36).substr(2, 9);
        const shortUrl = `${BASEURL}/${id}`;
        const urlData = new UrlData(longUrl, id, shortUrl);
        const saveResult = urlData.saveToInfoDir();
        if(saveResult) res.send(saveResult); //The address has been shortened in the past.
        else res.send(shortUrl);
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})

//Receives a request from a short URL and redirects it to the original site (long URL)
router.get("/get/:id", (req, res) => {
    try {
        const id = req.params.id;
        const infoFilePath = path.resolve(__dirname, "../DB/info.json");
        const currentData = JSON.parse(fs.readFileSync(infoFilePath));
        const urlDataObj = currentData[id];
        if (!urlDataObj) throw {"status": 404 , "messege": "The website does not exist"};
        updateUrlGetCount(id); 
        res.status(301).header("Location", urlDataObj.longUrl).end();
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})

module.exports = router;

//Increases the url entry counter each time you enter it
function updateUrlGetCount(id) {
    const infoFilePath = path.resolve(__dirname, "../DB/info.json");
    const currentData = JSON.parse(fs.readFileSync(infoFilePath));
    currentData[id].getCount += 1;
    fs.writeFileSync(`${infoFilePath}`, JSON.stringify(currentData));
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