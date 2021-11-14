const mongoose = require('mongoose');

const UrlDataSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date, //check how it fits to moment lib - moment().format('llll')
    required: true,
    trim: true,
  },
  getCount: {
    type: Number,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  'short-url-id': {
    type: Number,
    required: true,
    trim: true,
  },
});

const UrlData = mongoose.model('UrlData', UrlDataSchema);

module.exports = UrlData;
