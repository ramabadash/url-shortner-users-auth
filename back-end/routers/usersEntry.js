const express = require('express');
const router = express.Router();
const { signUp } = require('../controller/users');

// localhost:3000/entry

//Sign up by newUser
router.post('/signUp', signUp);

module.exports = router;
