const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
   getAllTodo,
   createTodo,
   removeTodo,
   markAsCompleted,
} = require("../controllers/profile");

// @route    -  GET   /todo/api/profile/
// @desc    -   Get All todos
// @access  -   PRIVATE
router.get(
   "/",
   passport.authenticate("jwt", {
      session: false,
      failureRedirect: "/todo/api/profile/unAuthorized",
   }),
   getAllTodo
);

// @route    -  POST   /todo/api/profile/createtodo/
// @desc    -   Create new Todo
// @access  -   PRIVATE
router.post(
   "/createtodo",
   passport.authenticate("jwt", {
      session: false,
      failureRedirect: "/todo/api/profile/unAuthorized",
   }),
   createTodo
);

// @route    -  DELETE   /todo/api/profile/removetodo//:todoId
// @desc    -   Create new Todo
// @access  -   PRIVATE
router.delete(
   "/removetodo/:todoId",
   passport.authenticate("jwt", {
      session: false,
      failureRedirect: "/todo/api/profile/unAuthorized",
   }),
   removeTodo
);

// @route    -  PUT   /todo/api/profile/markascompleted/:todoId/:toggle
// @desc    -   Mark todo as completed
// @access  -   PRIVATE
router.put(
   "/markascompleted/:todoId/:toggle",
   passport.authenticate("jwt", {
      session: false,
      failureRedirect: "/todo/api/profile/unAuthorized",
   }),
   markAsCompleted
);

router.get("/unAuthorized", (req, res, next) => {
   return res.status(401).json({ error: true, msg: "Unauthorized!" });
});

module.exports = router;
