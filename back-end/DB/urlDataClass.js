"use strict"
const path = require("path");
const fs = require("fs");


class UrlData {
    constructor(_longUrl, _id, _shortUrl ,_date = new Date(Date.now())) {
        this.longUrl = _longUrl ;
        this.shortUrl = _shortUrl ;
        this.id = _id ;
        this.date = _date ;
        this.getCount = 0 ;
    }
    saveToUserDir(userName) {
        const userFilePath = path.resolve(__dirname, `./${userName}.json`);
        const currentData = JSON.parse(fs.readFileSync(userFilePath));
        for (let id in currentData) {
            if(currentData[id].longUrl === this.longUrl) {
                return currentData[id].shortUrl;
            }
        }        
        currentData[this.id] = this ;
        fs.writeFileSync(`${userFilePath}`, JSON.stringify(currentData));
    }
}

module.exports = UrlData;