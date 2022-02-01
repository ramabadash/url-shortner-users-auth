const express = require('express');
const router = express.Router();
const { isValidHttpUrl, checkLongUrlByUserName } = require('../middlewares/validator');
const { createAndSaveNewUrl, redirectShortUrl } = require('../controller/urlData');
const { checkTokenAuth } = require('../middlewares/validator');

// localhost:3000/api

// Generates a new id and saves it in the database
router.post('/', checkTokenAuth, isValidHttpUrl, checkLongUrlByUserName, createAndSaveNewUrl);

//Receives a request from a short URL and redirects it to the original site (long URL), base on the DB
router.get('/:userName/:id', redirectShortUrl);

module.exports = router;
