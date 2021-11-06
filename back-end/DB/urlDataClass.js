"use strict"
const path = require("path");
const fs = require("fs");
const moment = require("moment");

class UrlData {
    constructor(_longUrl, _id, _shortUrl ,_date = moment().format('llll')) {
        this.longUrl = _longUrl ;
        this.shortUrl = _shortUrl ;
        this.id = _id ;
        this.date = _date ;
        this.getCount = 0 ;
    }
    saveToUserDir(userName, custom = false) {
        const userFilePath = path.resolve(__dirname, `./${userName}.json`);
        const currentData = JSON.parse(fs.readFileSync(userFilePath));
        //Check if Url was shorten before
        if(!custom) {
            for (let id in currentData) {
                if(currentData[id].longUrl === this.longUrl) {
                    return currentData[id].shortUrl;
                }
            }        
        } else { //Check if current custom word was used for the same long url
            if (currentData[this.id]) {
                if(currentData[this.id].longUrl === this.longUrl) {
                    return currentData[this.id].shortUrl;
                }
            }  
        }
        currentData[this.id] = this ;
        fs.writeFileSync(`${userFilePath}`, JSON.stringify(currentData));
    }
}

module.exports = UrlData;