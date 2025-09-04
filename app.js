require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const checkLoginMiddleware = require("./middleware/loggedIn");

var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blogRoutes');
var authRouter = require('./routes/authRoutes');

var app = express();
// db uri
const dbUri= process.env.dbUri;
mongoose.connect(dbUri).then(() => console.log('Connected!'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, 'public')));

// auth
app.use('/auth', authRouter);

// serve login/register
app.get("/login", checkLoginMiddleware, (req, res) => res.render("login", { title: 'Login'}));
app.get("/register", checkLoginMiddleware, (req, res) => res.render("register", { title: 'Register'}));

// blogs
app.use('/blogs', blogRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
