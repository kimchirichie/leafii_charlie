// IMPORT MODULES
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");

// DATABASE MODEL
var User = require("./models/user");

// ROUTER
var auth = require("./routes/auth");
var emailer = require("./routes/emailer");
var routes = require("./routes/index");
var traffic = require("./routes/traffic");
var users = require("./routes/users");

// SERVER OPRTATION
var app = express();

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// MIDDLEWARES
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// PASSPORT CONFIG
app.use(session({ secret: "h5jkht6938gfv9ydv8yas9df789234" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // flash message
passport.serializeUser(function(user, done) {
  console.log("Serialize User: " + user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("Deserialize User: " + id);
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

// ROUTER
// LOG TRAFFIC
app.use(/\/$/, traffic);
app.use("/", routes);
app.use("/auth", auth);
app.use("/contact", emailer);
app.use("/users", users);

// ASSETS
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


module.exports = app;
