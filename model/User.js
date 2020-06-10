const mongoose = require("mongoose");
var UserSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         maxlength: 32,
         minlength: 3,
      },
      email: {
         type: String,
         required: true,
         trim: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         trim: true,
         minlength: 6,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
