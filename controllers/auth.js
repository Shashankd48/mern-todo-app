const { validationResult } = require("express-validator");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const myKey = require("../setup/config");

exports.signup = async (req, res) => {
   // validate user data
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: true,
         msg: errors.array()[0].msg,
         parameter: errors.array()[0].param,
      });
   }
   var { name, email, password } = req.body;
   // Check email already exist
   User.findOne({ email })
      .then((user) => {
         if (user) {
            return res.status(400).json({
               error: "Account already exist",
            });
         }
         const newUser = new User({
            name,
            email,
            password,
         });
         // encrypt password here using bcrypt.js
         bcrypt.genSalt(10, (err, salt) => {
            if (err) {
               res.status(400).json({
                  error: "Failed to generate salt!",
               });
            }
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               if (err) throw err;
               newUser.password = hash;
               newUser
                  .save()
                  .then((user) => {
                     user.password = undefined;
                     user.__v = undefined;
                     res.status(200).json(user);
                  })
                  .catch((err) =>
                     console.log("Failed to save user in DB\n", err)
                  );
            });
         });
      })
      .catch((error) => console.log(error));
};

exports.login = async (req, res) => {
   const { email, password } = req.body.user;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: true,
         msg: errors.array()[0].msg,
         parameter: errors.array()[0].param,
      });
   }

   User.findOne({ email })
      .then((user) => {
         if (!user) {
            return res.status(400).json({
               error: "User not found!",
            });
         }
         bcrypt
            .compare(password, user.password)
            .then((isCorrect) => {
               if (isCorrect) {
                  //JWT authentication with passport.js strategy
                  const payload = {
                     id: user._id,
                     email: user.email,
                     name: user.name,
                  };
                  jwt.sign(
                     payload,
                     myKey.secret,
                     { expiresIn: "10d" },
                     (err, token) => {
                        if (err) {
                           console.log(err);
                           return res.status(500).json({
                              error: "Failed to generate token",
                              message: err,
                           });
                        }
                        return res.status(200).json({
                           id: user._id,
                           name: user.name,
                           token: token,
                        });
                     }
                  );
               } else {
                  res.status(400).json({
                     email,
                     error: "Incorrect Username or Password !",
                  });
               }
            })
            .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
};

exports.isSignedIn = async (req, res, next) => {};
