const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { updateUrlGetCount } = require('./helpers');
const { isValidHttpUrl, checkLongUrlByUserName } = require('../middlewares/validator');
const { createAndSaveNewUrl } = require('../controller/urlData');

// localhost:3000/api
// const BASEURL = "http://localhost:3000/api";
const BASEURL = "https://ramas-url-shortener.herokuapp.com/api";

// Generates a new id and saves it in the database
router.post('/', isValidHttpUrl, checkLongUrlByUserName, createAndSaveNewUrl);

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
