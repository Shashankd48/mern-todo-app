const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TodoSchema = new mongoose.Schema(
   {
      userId: {
         type: ObjectId,
         required: true,
      },
      todo: {
         type: String,
         maxlength: 255,
         required: true,
      },
      markascompleted: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true, collection: "Todo" }
);

module.exports = mongoose.model("Todo", TodoSchema);
