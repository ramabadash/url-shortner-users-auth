const UrlData = require('../models/urlData');
const moment = require('moment');

//Generates a new id and checks if it is unique, if not invents a new one and repeats the process. If unique will return it
async function generateId(userName) {
  const id = '_' + Math.random().toString(36).substr(2, 9);
  return UrlData.find({ userName: userName, 'short-url-id': id })
    .then((urlDataObj) => {
      if (urlDataObj) return id;
      else generateId(userName); //The id already exists, create a new one
    })
    .catch((error) => {
      return false;
    });
}

//Increases the url entry counter each time you enter it
async function updateUrlGetCount(id, userName) {
  try {
    const userObj = await UrlData.findOne({ userName, 'short-url-id': id }); //Find url data
    const updateGetCount = userObj.getCount + 1;
    const answer = await UrlData.findOneAndUpdate({ userName, 'short-url-id': id }, { getCount: updateGetCount }); //Update user get count
  } catch (error) {
    throw { status: error.status, messege: error.messege };
  }
}

async function updateLastEntey(id, userName) {
  try {
    const answer = await UrlData.findOneAndUpdate(
      { userName, 'short-url-id': id },
      { lastTimeUsed: moment().format('l') }
    ); //Update last entry
  } catch (error) {
    throw { status: error.status, messege: error.messege };
  }
}

module.exports = { generateId, updateUrlGetCount, updateIPEnteys, updateLastEntey };
