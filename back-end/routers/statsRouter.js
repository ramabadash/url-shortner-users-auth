const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

//Get stats for short url by id
router.get("/:userName/:id", (req, res)=> {
    try {
        const userName = req.params.userName;
        const id = req.params.id;
        const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
        const currentData = JSON.parse(fs.readFileSync(userFilePath));
        const urlDataObj = currentData[id];
        if (!urlDataObj) {
            throw {"status": 400 , "messege": "No such URL on our data base"};
        }
        res.send({"creationDate": urlDataObj.date, "redirectCount": urlDataObj.getCount , "originalUrl": urlDataObj.longUrl, "id": urlDataObj.id });
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})
module.exports = router;