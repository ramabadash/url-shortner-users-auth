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
    type: String,
    required: true,
    trim: true,
  },
  getCount: {
    type: Number,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  'short-url-id': {
    type: String,
    required: true,
    trim: true,
  },
  IP: [
    {
      type: String,
      trim: true,
    },
  ],
  lastTimeUsed: {
    type: String,
    trim: true,
  },
});

const UrlData = mongoose.model('UrlData', UrlDataSchema);

module.exports = UrlData;
