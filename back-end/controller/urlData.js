const UrlData = require('../models/urlData');
const { generateId } = require('./helpers');
const moment = require('moment');

const BASEURL = 'https://ramas-url-shortener.herokuapp.com/api';

// create and save new urlData
exports.createAndSaveNewUrl = async (req, res, next) => {
  try {
    const { validatedShortUrl } = req;
    // Does the url was shorten before
    if (validatedShortUrl) {
      res.status(200).send(validatedShortUrl).end();
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
          console.log(error);
          next({ status: error.status, messege: error.messege });
        });
    }
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};
