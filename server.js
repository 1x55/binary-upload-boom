const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
//keeps you logged in even, 
const session = require("express-session");
//session is argument 
const MongoStore = require("connect-mongo")(session);
//The method-override middleware is used to override HTTP verbs. This is particularly useful when there are HTTP clients (like some web browsers or proxies) that don’t support certain HTTP verbs such as PUT or DELETE. By using method-override, you can use POST requests to simulate PUT, DELETE, and other HTTP requests. This is done by including a special parameter in the POST request to indicate the real HTTP method you want to use1. 
const methodOverride = require("method-override");
//show us notification, same email...
const flash = require("express-flash");
//used to log HTTP requests and errors
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
