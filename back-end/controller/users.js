const User = require('../models/user');

//Sign up
exports.signUp = async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    if (!userName || !email || !password) {
      throw { status: 400, messege: 'Must fiil all fields' };
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
