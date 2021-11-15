const UrlData = require('../models/urlData');

//Checks if the url is valid
exports.isValidHttpUrl = (req, res, next) => {
  let url;
  const { longUrl } = req.body;
  try {
    if (longUrl.length >= 100) {
      throw { status: 400, messege: 'invalid URL' };
    }
    url = new URL(longUrl);
  } catch (_) {
    throw { status: 400, messege: 'invalid URL' };
  }
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
