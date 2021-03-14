require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

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

//Routes middleware
app.use("/todo/api/auth", authRoute);
app.use("/todo/api/profile", profileRoute);

// TODO: Server the static page and profuction build
// app.use(express.static("client/build"));
// app.use((req, res, next) => {
//    res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

app.listen(port, () =>
   console.log(`App is running on localhost at port: ${port}`)
);
