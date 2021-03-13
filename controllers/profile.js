const { validationResult } = require("express-validator");
const Todo = require("../model/Todo");

exports.getAllTodo = async (req, res) => {
   const todos = await Todo.find({ userId: req.user._id }).select([
      "-__v",
      "-updatedAt",
      "-userId",
      "-createdAt",
   ]);
   return todos.length > 0
      ? res.status(200).json({ error: false, todos })
      : res.status(404).json({ error: true, msg: "No todos found", todos });
};

exports.createTodo = async (req, res) => {
   // validate user data
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({
         error: true,
         msg: errors.array()[0].msg,
         parameter: errors.array()[0].param,
      });
   }
   const todo = new Todo({
      todo: req.body.todo,
      userId: req.user._id,
   });
   await todo.save();

   return todo
      ? res.status(200).json({
           error: false,
           todo,
        })
      : res.status(400).json({
           error: true,
           todo,
           msg: "Failed to save todo!",
        });
};

exports.removeTodo = async (req, res) => {
   const { todoId } = req.params;
   const todo = await Todo.deleteOne({ _id: todoId, userId: req.user._id });

   return todo.deletedCount === 1
      ? res.status(200).json({
           error: false,
        })
      : res.status(400).json({
           error: true,
           message: "Todo does not exist ❌",
           todo,
        });
};

exports.markAsCompleted = async (req, res) => {
   const { todoId, toggle } = req.params;

   const todo = await Todo.updateOne(
      { _id: todoId, userId: req.user._id },
      { $set: { markascompleted: toggle } }
   );

   return todo.nModified === 1
      ? res.status(200).json({
           error: false,
        })
      : res.status(400).json({
           message: "Cannot update Todo",
           error: true,
        });
};
