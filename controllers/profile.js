const Todo = require("../model/Todo");

exports.getAllTodo = (req, res) => {
   Todo.find({ userId: req.user._id })
      .then((todos) => {
         return todos.length > 0
            ? res.status(200).json({ error: false, todos })
            : res
                 .status(200)
                 .json({ error: true, msg: "No todos found", todos });
      })
      .catch((error) => {
         console.log("No Todo Found", error);
      });
};

exports.createTodo = (req, res) => {
   console.log("todo", req.body.todo);
   const newTodo = new Todo({
      todo: req.body.todo,
      userId: req.user._id,
   });
   newTodo
      .save()
      .then((todo) => {
         res.status(200).json({
            message: "Todo Added successfully! 👍",
            todo,
         });
      })
      .catch((error) => console.log("Failed to save todo in DB\n", error));
};

exports.removeTodo = (req, res) => {
   const { todoId } = req.params;
   Todo.deleteOne({ _id: todoId, userId: req.user._id })
      .then((todo) => {
         if (todo.deletedCount === 0) {
            return res.status(200).json({
               message: "Todo does not exist ❌",
               todo,
            });
         }
         res.status(200).json({
            message: "Todo Deleted Successfully ✔",
            todo,
         });
      })
      .catch((error) => console.log("Failed to delete todo❕\n", error));
};

exports.markAsCompleted = (req, res) => {
   const { todoId, toggle } = req.params;
   Todo.findOneAndUpdate(
      { _id: todoId, userId: req.user._id },
      { $set: { markascompleted: toggle } },
      { new: true },
      (error, todo) => {
         if (error || !todo) {
            res.status(400).json({
               message: "Cannot update Todo",
               error,
            });
         }
         res.status(200).json({
            message: "Todo marked as completed ✔",
            todo,
         });
      }
   );
};
