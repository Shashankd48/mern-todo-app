const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
   getAllTodo,
   createTodo,
   removeTodo,
   markAsCompleted,
} = require("../controllers/profile");

// @route    -  GET   /todo/api/profile/:userId
// @desc    -   Get All todo , Home Page
// @access  -   PRIVATE
router.get("/", passport.authenticate("jwt", { session: false }), getAllTodo);

// @route    -  POST   /todo/api/profile/createtodo/:userId
// @desc    -   Create new Todo
// @access  -   PRIVATE
router.post(
   "/createtodo",
   passport.authenticate("jwt", { session: false }),
   createTodo
);

// @route    -  DELETE   /todo/api/profile/removetodo/:userId/:todoId
// @desc    -   Create new Todo
// @access  -   PRIVATE
router.delete(
   "/removetodo/:todoId",
   passport.authenticate("jwt", { session: false }),
   removeTodo
);

// @route    -  PUT   /todo/api/profile/markascompleted/:userId/:todoId/:toggle
// @desc    -   Mark todo as completed
// @access  -   PRIVATE
router.put(
   "/markascompleted/:todoId/:toggle",
   passport.authenticate("jwt", { session: false }),
   markAsCompleted
);

module.exports = router;
