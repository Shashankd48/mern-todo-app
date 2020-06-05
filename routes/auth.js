const express = require("express");
const router = express.Router();
const { home, login } = require("../controllers/auth");
// Test Get Router
router.get("/", home);
router.get("/login", login);

module.exports = router;
