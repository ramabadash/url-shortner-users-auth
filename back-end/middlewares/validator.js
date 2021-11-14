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
