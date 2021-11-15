const UrlData = require('../models/urlData');
const { generateId, updateUrlGetCount } = require('./helpers');
const moment = require('moment');

const BASEURL = 'https://ramas-url-shortener.herokuapp.com/api';

// create and save new urlData
exports.createAndSaveNewUrl = async (req, res, next) => {
  try {
    const { validatedShortUrl } = req;
    // Does the url was shorten before
    if (validatedShortUrl) {
      return res.status(200).send(validatedShortUrl).end();
    } else {
      //Generate and save new short URL
      const { longUrl, userName } = req.body;
      const id = await generateId(userName); //Choose uniq id for the user
      const shortUrl = `${BASEURL}/${userName}/${id}`; //Create the short url
      // Create All the data to save about the url
      const newUrlData = new UrlData({
        longUrl,
        shortUrl,
        date: moment().format('llll'),
        getCount: 0,
        userName,
        'short-url-id': id,
      });
      // Save the data
      newUrlData
        .save()
        .then(() => res.status(200).send(shortUrl))
        .catch((error) => {
          next({ status: error.status, messege: error.messege });
        });
    }
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

// create and save new custom urlData
exports.createAndSaveCustomNewUrl = async (req, res, next) => {
  try {
    const { longUrl, userName, customWord } = req.body;
    const { validatedShortUrl } = req;
    if (validatedShortUrl) {
      return res.status(200).send(validatedShortUrl).end();
    } else {
      const id = customWord;
      const shortUrl = `${BASEURL}/${userName}/${id}`;
      // Create All the data to save about the url
      const newUrlData = new UrlData({
        longUrl,
        shortUrl,
        date: moment().format('llll'),
        getCount: 0,
        userName,
        'short-url-id': id,
      });
      // Save the data
      newUrlData
        .save()
        .then(() => {
          console.log('save');
          return res.status(200).send(shortUrl).end();
        })
        .catch((error) => {
          console.log('catch save' + error);
          next({ status: error.status, messege: error.messege });
        });
    }
  } catch (error) {
    throw { status: error.status, messege: error.messege };
  }
};

//Receives a request from a short URL and redirects it to the original site (long URL), base on the DB
exports.redirectShortUrl = async (req, res, next) => {
  try {
    const { userName, id } = req.params;
    const urlDataObj = await UrlData.find({ userName, 'short-url-id': id });
    if (urlDataObj.length === 0) {
      throw { status: 404, messege: 'The website does not exist' };
    } else {
      updateUrlGetCount(id, userName); //Update the count of the time of people use the short link
      res.status(301).header('Location', urlDataObj[0].longUrl).end();
    }
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Get stats about urlData by userName and id
exports.getUrlStats = async (req, res, next) => {
  try {
    const { userName, id } = req.params;
    UrlData.find({ userName, 'short-url-id': id }).then((urlDataArr) => {
      if (urlDataArr.length === 0) throw { status: 400, messege: 'No such URL on our data base' };
      else {
        const urlDataObj = urlDataArr[0];
        res.send({
          creationDate: urlDataObj.date,
          redirectCount: urlDataObj.getCount,
          originalUrl: urlDataObj.longUrl,
          id: urlDataObj['short-url-id'],
        });
      }
    });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};
