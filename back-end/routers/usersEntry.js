const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controller/users');
// localhost:3000/entry

//Sign up by newUser
router.post('/signUp', signUp);
//Login
router.post('/login', login);

module.exports = router;
