const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const UrlData = require('../DB/urlDataClass');

// localhost:3000/api
const BASEURL = "http://localhost:3000/api/get";

// Generates a new id and saves it in the database
router.post("/", (req, res) => {
    const longUrl = req.body.longUrl;
    const id = '_' + Math.random().toString(36).substr(2, 9);
    const shortUrl = `${BASEURL}/${id}`;
    const urlData = new UrlData(longUrl, id, shortUrl);
    const saveResult = urlData.saveToInfoDir();
    if(saveResult) res.send(saveResult);
    else res.send(shortUrl);
})

//Receives a request from a short URL and redirects it to the original site (long URL)
router.get("/get/:id", (req, res) => {
    const id = req.params.id;
    const infoFilePath = path.resolve(__dirname, "../DB/info.json");
    const currentData = JSON.parse(fs.readFileSync(infoFilePath));
    const urlDataObj = currentData[id];
    updateUrlGetCount(id); 
    res.status(301).header("Location", urlDataObj.longUrl).end();
})

module.exports = router;

//Increases the url entry counter each time you enter it
function updateUrlGetCount(id) {
    const infoFilePath = path.resolve(__dirname, "../DB/info.json");
    const currentData = JSON.parse(fs.readFileSync(infoFilePath));
    currentData[id].getCount += 1;
    fs.writeFileSync(`${infoFilePath}`, JSON.stringify(currentData));
}