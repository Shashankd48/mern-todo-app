const { validationResult } = require("express-validator");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Password encryption goes here
const encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   return hashedPassword;
};

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
   User.findOne({ email }, (error, user) => {
      if (user) {
         return res.status(400).json({
            error: "Account already exist",
         });
      }
   });
   password = await encryptPassword(password);
   const user = new User({
      name,
      email,
      password,
   });
   await user.save((err, user) => {
      if (err || !user) {
         return res.status(400).json({
            error: "Not able to save user In DB",
         });
      }
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      res.header("auth-token", token).json({
         token: token,
         message: "LoggedIn Successfully!",
      });
   });
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

   // Check email already exist
   User.findOne({ email }, (error, user) => {
      if (error || !user) {
         return res.status(400).json({
            error: "Account does not exist, please go to signup",
         });
      }
      // Compare hashed password
      bcrypt
         .compare(password, user.password)
         .then((result) => {
            if (!result) {
               return res.status(400).json({
                  error: "Invalid Password!",
               });
            } else {
               // Create and sign a token
               const token = jwt.sign({ _id: user._id }, process.env.SECRET);
               res.header("auth-token", token).json({
                  token: token,
                  message: "LoggedIn Successfully!",
               });
            }
         })
         .catch(() => {
            return res.status(500).json({
               error: "Unable to login, internal server error",
            });
         });
   });
};
