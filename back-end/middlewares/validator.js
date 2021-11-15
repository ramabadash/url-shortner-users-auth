const UrlData = require('../models/urlData');
const BASEURL = 'https://ramas-url-shortener.herokuapp.com/api';

//Checks if the url is valid
exports.isValidHttpUrl = (req, res, next) => {
  let url;
  const { longUrl } = req.body;
  try {
    if (longUrl.length >= 1000) {
      throw { status: 400, messege: 'invalid URL' };
    }
    url = new URL(longUrl);
  } catch (_) {
    throw { status: 400, messege: 'invalid URL' };
  }
  console.log('http ok');
  if (url.protocol === 'http:' || url.protocol === 'https:') next();
};

//Check if url was shorten before
exports.checkLongUrlByUserName = async (req, res, next) => {
  try {
    const { longUrl, userName } = req.body;
    await UrlData.find({ userName, longUrl })
      .then((urlData) => {
        if (urlData.length !== 0) {
          //was shorten before, pass the short url next
          req.validatedShortUrl = urlData[0].shortUrl; // pass the old shorten url next
        }
        next();
      })
      .catch((error) => {
        next({ status: error.status, messege: error.messege });
      });
  } catch (error) {
    throw { status: error.status, messege: error.messege };
  }
};

// // Check custom word
exports.checkCustomWord = async (req, res, next) => {
  try {
    const { userName, customWord } = req.body;
    const { validatedShortUrl } = req;
    //Missing custom word
    if (!customWord) {
      throw {
        status: 400,
        messege: 'Must insert a custom word. You can try to shorten to a general address on the home page',
      };
    }
    // Does the url was shorten before
    if (validatedShortUrl) {
      const splitUrl = validatedShortUrl.split('/');
      const id = splitUrl[splitUrl.length - 1]; //Get ID from last place in url
      console.log(id + '' + customWord);
      //If Was shorten before with same word
      if (id === customWord) {
        console.log('yes');
        next();
      }
    }
    req.validatedShortUrl = '';
    // Check if custom word is in use
    UrlData.find({ userName, 'short-url-id': customWord })
      .then((urlDataObj) => {
        console.log(urlDataObj);
        if (urlDataObj.length > 0) {
          console.log('Word already in use');
          throw { status: 400, messege: 'Word already in use' };
        } else {
          next();
        }
      })
      .catch((error) => {
        throw { status: error.status, messege: error.messege };
      });
  } catch (error) {
    console.log('custom' + error);
    throw { status: error.status, messege: error.messege };
  }
};
