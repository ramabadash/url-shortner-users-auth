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
    saveToInfoDir() {
        const infoFilePath = path.resolve(__dirname, "./info.json");
        const currentData = JSON.parse(fs.readFileSync(infoFilePath));
        for (let id in currentData) {
            if(currentData[id].longUrl === this.longUrl) {
                return currentData[id].shortUrl;
            }
        }        
        currentData[this.id] = this ;
        fs.writeFileSync(`${infoFilePath}`, JSON.stringify(currentData));
    }
    // updateGetCount() {
    //     this.getCount +=1;
    // }
}

module.exports = UrlData;