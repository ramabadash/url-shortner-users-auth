const UrlData = require('../models/urlData');

//Generates a new id and checks if it is unique, if not invents a new one and repeats the process. If unique will return it
async function generateId(userName) {
  const id = '_' + Math.random().toString(36).substr(2, 9);
  return UrlData.find({ userName: userName, 'short-url-id': id })
    .then((urlDataObj) => {
      if (urlDataObj) return id;
      else generateId(userName); //The id already exists, create a new one
    })
    .catch((error) => false);
}

//Increases the url entry counter each time you enter it
async function updateUrlGetCount(id, userName) {
  try {
    console.log('yes');
    await UrlData.find({ userName, 'short-url-id': id })
      .then((urlDataArr) => {
        const urlDataObj = urlDataArr[0];
        urlDataObj.getCount++;
        urlDataObj
          .save()
          .then(() => {})
          .catch((error) => next({ status: error.status, messege: error.messege }));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    throw { status: error.status, messege: error.messege };
  }
}

module.exports = { generateId, updateUrlGetCount };
