const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TodoSchema = new mongoose.Schema({
   _id: {
      type: ObjectId,
      ref: "User",
   },
});
