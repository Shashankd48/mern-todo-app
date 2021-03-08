const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/auth");
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
      check("user.email", "Email is required").isEmail(),
      check("user.password", "Password should be at 6 character long").isLength(
         {
            min: 6,
         }
      ),
   ],
   login
);

module.exports = router;
