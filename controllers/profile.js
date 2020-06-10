const Todo = require("../model/Todo");
const { ObjectId } = require("mongodb");

exports.getAllTodo = (req, res) => {
   const userId = req.params.userId;
   Todo.find({ userId: userId })
      .then((todos) => {
         res.status(200).json(todos);
      })
      .catch((error) => {
         console.log("No Todo Found", error);
      });
};

exports.createTodo = (req, res) => {
   const userId = req.params.userId;
   const newTodo = new Todo({
      todo: req.body.todo,
      userId: ObjectId(userId),
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
   const { userId, todoId } = req.params;
   Todo.deleteOne({ _id: todoId, userId: userId })
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
   const { userId, todoId, toggle } = req.params;
   Todo.findOneAndUpdate(
      { _id: todoId, userId: userId },
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
