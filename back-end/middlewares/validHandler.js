function validHandlerMiddleware (req, res, next) {
    const longUrl = req.body.longUrl;
    if (isValidHttpUrl(longUrl)) next();
    else throw {"status": 400, "messege": "invalid URL"};
      
}

module.exports = {validHandlerMiddleware}

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
  