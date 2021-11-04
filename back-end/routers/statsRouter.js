const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/:id", (req, res)=> {
    try {
        const id = req.params.id;
        const infoFilePath = path.resolve(__dirname, "../DB/info.json");
        const currentData = JSON.parse(fs.readFileSync(infoFilePath));
        const urlDataObj = currentData[id];
        if (!urlDataObj) throw {"status": 404 , "messege": "The website does not exist"};
        res.send({"creationDate": urlDataObj.date, "redirectCount": urlDataObj.getCount , "originalUrl": urlDataObj.longUrl, "id": urlDataObj.id });
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})
module.exports = router;