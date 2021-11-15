const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
    User.create({ userName, password, email })
      .then((newUser) => {
        newUser
          .save()
          .then(() => res.status(200).send(userName))
          .catch((error) => {
            next({ status: error.status, messege: error.messege });
          });
      })
      .catch((error) => next({ status: error.status, messege: error.messege }));
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Login
exports.login = async (req, res, next) => {
  try {
    //Check user name details
    const { userName, password, email } = req.body;
    const userObj = await User.find({ userName, password, email });
    if (userObj.length === 0) {
      next({ status: 401, messege: 'Wrong details' });
      return;
    } else {
      //Generate token
      const user = { userName };
      const token = generateAccessToken(user);
      return res.status(200).cookie('token', token).send(true);
    }
  } catch (error) {
    console.log(error);
    next({ status: error.status, messege: error.messege });
  }
};

//Generate token
function generateAccessToken(user) {
  return jwt.sign({ user }, 'secret', {
    expiresIn: '3600s',
  });
}
