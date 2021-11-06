"use strict"
const path = require("path");
const fs = require("fs");

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
//Check if custom work of user is in use
function checkCustomWord(userName, word, longUrl) {
    const userFilePath = path.resolve(__dirname, `../DB/${userName}.json`);
    const currentData = JSON.parse(fs.readFileSync(userFilePath));
    if (currentData[word] && currentData[word].longUrl !== longUrl) {
      throw {"status": 400, "messege": `The word "${word}" is already in use`}; //The word already exists
    } else return word;
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

module.exports = {updateUrlGetCount, isValidHttpUrl, generateId, checkNewUser, checkCustomWord};