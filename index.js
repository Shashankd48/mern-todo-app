require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Connection to Database
require("./setup/dbConfig");

// import routes here
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");

// other middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Configuration for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

// TODO: Server the static page and profuction build
app.use(express.static("client/build"));

//Routes middleware
app.use("/todo/api/auth", authRoute);
app.use("/todo/api/profile", profileRoute);

app.listen(port, () =>
   console.log(`App is running on localhost at port: ${port}`)
);
