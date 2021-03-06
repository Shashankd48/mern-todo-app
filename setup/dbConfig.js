const mongoose = require("mongoose");
const key = require("./config");

// Database Connectivity
mongoose
   .connect(key.dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
   })
   .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
   .catch((error) => console.error("FAILED TO CONNECT DB"));
