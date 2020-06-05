require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Database Connectivity
mongoose
   .connect(process.env.DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
   })
   .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
   .catch((error) => console.error("FAILED TO CONNECT DB"));

// import routes here
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

// other middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Routes middleware
app.use("/todo/api/auth", authRoute);
app.use("/todo/api/profile", profileRoute);

app.listen(port, () =>
   console.log(`App is running on localhost at port: ${port}`)
);
