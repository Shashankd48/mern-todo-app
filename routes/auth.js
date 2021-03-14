const express = require("express");
const router = express.Router();
const {
   login,
   signup,
   resetPassword,
   updatePassword,
} = require("../controllers/auth");
const { check } = require("express-validator");

// @route    -  POST /todo/api/auth/signup
// @desc    -   Signup routes
// @access  -   PUBLIC
router.post(
   "/signup",
   [
      check("name", "Name should be at least 3 character!").isLength({
         min: 3,
      }),
      check("email", "Email is required").isEmail(),
      check("password", "Password should be at 6 character long").isLength({
         min: 6,
      }),
   ],
   signup
);

// @route    -  POST   /todo/api/auth/login
// @desc    -   Login routes
// @access  -   PUBLIC
router.post(
   "/login",
   [
      check("email", "Email is required").isEmail(),
      check(
         "password",
         "Password should be at least 6 character long!"
      ).isLength({
         min: 6,
      }),
   ],
   login
);

// @route    -  POST   /todo/api/auth/resetPassword
// @desc    -   Login routes
// @access  -   PUBLIC
router.post(
   "/resetPassword",
   [check("email", "Email is required").isEmail()],
   resetPassword
);

// @route    -  POST   /todo/api/auth/resetPassword
// @desc    -   Login routes
// @access  -   PUBLIC
router.post(
   "/updatePassword/:token",
   [
      check("token", "Invalid Token").isLength({ min: 200 }),
      check("password", "Password must contain 6 character!").isLength({
         min: 6,
      }),
   ],
   updatePassword
);

module.exports = router;
