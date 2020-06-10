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
         error: errors.array()[0].msg,
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
                     console.log("Failed to save user in DB\n", error)
                  );
            });
         });
      })
      .catch((error) => console.log(error));
};

exports.login = async (req, res) => {
   const { email, password } = req.body;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: errors.array()[0].msg,
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
                     { expiresIn: 3600 },
                     (error, token) => {
                        if (error) {
                           console.log(error);
                           return res.status(500).json({
                              message: "Failed to generate token",
                              error,
                           });
                        }
                        return res.status(200).json({
                           id: user._id,
                           token: `Bearer ${token}`,
                        });
                     }
                  );
               } else {
                  res.status(400).json({
                     email,
                     message: "Incorrect Password or Username!",
                  });
               }
            })
            .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
};
