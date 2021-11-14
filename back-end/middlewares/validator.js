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
    const urlData = await UrlData.find({ userName }, { longUrl });
    if (urlData !== null) {
      //was shorten before, pass the short url next
      req.shortUrl = urlData.shortUrl;
    }
    next();
  } catch (error) {
    throw { status: error.status, messege: error.messege };
  }
};
