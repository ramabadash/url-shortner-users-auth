const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const BASEURL = 'http://localhost:8080';
const BASEURL = 'https://vry-short.herokuapp.com/';
const bcrypt = require('bcrypt');

exports.findUserName = (req, res, next) => {
  try {
    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(301).header('Location', '/').end();
      } else {
        return res.status(200).send(user.user.userName).end();
      }
    });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Sign up
exports.signUp = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    if (!userName || !email || !password) {
      throw { status: 400, messege: 'Must fiil all fields' };
    }
    if (await User.exists({ userName })) {
      throw { status: 400, messege: 'User Name is taken' };
    }
    const user = new User({ userName, password, email });
    user
      .save()
      .then(() => res.status(200).send(userName))
      .catch((error) => {
        next({ status: error.status, messege: error.messege });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Login
exports.login = async (req, res, next) => {
  try {
    //Check user name details
    const { userName, password } = req.body;
    const userObj = await User.find({ userName });
    if (userObj.length === 0) {
      next({ status: 401, messege: 'Wrong username, try to sign up?' });
      return;
    } else {
      //Check password
      const match = await bcrypt.compare(password, userObj[0].password);
      if (match) {
        //Password ok - Generate token
        const user = { userName };
        const token = generateAccessToken(user);
        return res.cookie('token', token).send(`${BASEURL}/home`).end();
      } else {
        throw { status: 401, messege: 'Wrong password!' };
      }
    }
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};
//Generate token
function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.SECRET, {
    expiresIn: '1h',
  });
}
