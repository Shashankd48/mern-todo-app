const { validationResult } = require("express-validator");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const myKey = require("../setup/config");
const mailer = require("../setup/mailer");
const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");
const crypto = require("crypto");

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
               error: true,
               msg: "Account already exist",
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
                  error: true,
                  msg: "Failed to generate salt!",
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

                     // generate JWT auth
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
                                 error: true,
                                 msg: "Failed to generate token",
                                 decription: err,
                              });
                           }
                           return res.status(200).json({
                              error: false,
                              id: user._id,
                              name: user.name,
                              token: token,
                           });
                        }
                     );
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
   const { email, password } = req.body;
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
               error: true,
               msg: "User not found!",
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
                              erorr: true,
                              msg: "Failed to generate token",
                              decription: err,
                           });
                        }
                        return res.status(200).json({
                           error: false,
                           id: user._id,
                           name: user.name,
                           token: token,
                        });
                     }
                  );
               } else {
                  res.status(400).json({
                     error: true,
                     email,
                     msg: "Incorrect Username or Password !",
                  });
               }
            })
            .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
};

exports.resetPassword = async (req, res) => {
   try {
      // validate user data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({
            error: true,
            msg: errors.array()[0].msg,
            parameter: errors.array()[0].param,
         });
      }

      const { email } = req.body;

      const foundUser = await User.findOne({ email });

      if (!foundUser) {
         res.status(404).json({
            error: true,
            msg: "Account not found!",
            user: foundUser,
         });
      }

      const payload = {
         _id: foundUser._id,
         email: foundUser.email,
      };
      const token = jwt.sign(payload, myKey.secret, { expiresIn: "10min" });

      await User.updateOne(
         { _id: foundUser._id },
         { resetPasswordToken: token }
      );

      // send mail with defined transport object
      try {
         var source = fs.readFileSync(
            path.join(__dirname, "../views", "resetPassoword.hbs"),
            "utf8"
         );

         // Create email generator
         var template = Handlebars.compile(source);
         const data = {
            name: foundUser.name,
            url: `${myKey.clientUrl}/updatePassword/${token}`,
         };
         // let info = await mailer.sendMail({
         //    from: `"Particle Todo 🔑" <${myKey.email}>`, // sender address
         //    to: email, // list of receivers
         //    subject: "Reset Password", // Subject line
         //    html: template(data), // html body
         // });

         // console.log(info);
         // console.log("Message sent: %s", info.messageId);
         console.log(template(data));
         return res
            .status(200)
            .json({ error: false, template: data, token, foundUser });
      } catch (error) {
         return res.status(500).json({
            error: true,
            msg: "Can't not send email!",
            resError: error,
         });
      }
   } catch (error) {
      return res
         .status(500)
         .json({ error: true, msg: "Internal server error", resError: error });
   }
};

exports.updatePassword = async (req, res) => {
   try {
      const { password } = req.body;
      const { token } = req.params;

      const data = jwt.verify(token, myKey.secret);

      const salt = await bcrypt.genSalt(10);

      const encryptedPassword = await bcrypt.hash(password, salt);

      const updateUser = await User.updateOne(
         {
            _id: data._id,
            email: data.email,
         },
         { password: encryptedPassword }
      );

      return updateUser.nModified
         ? res.status(200).json({ error: false, data, updateUser, password })
         : res
              .status(500)
              .json({ error: true, msg: "Failed to update password" });
   } catch (error) {
      return res.status(500).json({ error: true, errorData: error });
   }
};
