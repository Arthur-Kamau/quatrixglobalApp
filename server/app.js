var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require("./database");
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// routes 
var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');

// models

var usersModel = require('./model/user');
var tasksModel = require('./model/tasks');

var app = express();


// database
async function dbConnect(params) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('tables created ...');

    // create default user
    // const hashedPassword = await bcrypt.hash("123456", 10)
    // const user1 = await usersModel.create({ phone: "0722222222", password: hashedPassword });
    // await user1.save();

    // create tasks
    const today = new Date();
    const task1 = await tasksModel.create(
      {
        taskId: 23114, customerFirstName: "Sample", personnelFirstName: "John",
        personnelOtherName: "Doe", customerLastName: null, customerPhone: "+254725557691",
        agentId: null, assigned: today - 24 * 60 * 60 * 1000,
        inProgress: today, completed: today + 24 * 60 * 60 * 1000,
        deferred: null, status: "", location: "",
        gender: "", age: 1, accessCode: 1, splashPage: 1,
        mpesa: 0, autoplay: 1, comments: "", registration: "other"
      });
    await task1.save();
    const task2 = await tasksModel.create(
      {
        taskId: 23115, customerFirstName: "Mary", personnelFirstName: "John",
        personnelOtherName: "Otieno", customerLastName: null, customerPhone: "+254725007691",
        agentId: null, assigned: "2019-06-27T07:42:02.000Z",
        inProgress: "2019-06-27T08:03:17.000Z", completed: null,
        deferred: "2019-06-27T08:03:43.000Z", status: "Deferred", location: null,
        gender: null, age: null, accessCode: null, splashPage: null,
        mpesa: null, autoplay: null, comments: "no answer", registration: "self"
      });
    await task2.save();
    const task3 = await tasksModel.create(
      {
        taskId: 23116, customerFirstName: "Grace", personnelFirstName: "John",
        personnelOtherName: "Otieno", customerLastName: null, customerPhone: "+254729302372",
        agentId: 1983, assigned: "2019-06-27T07:42:02.000Z",
        inProgress: "2019-06-27T08:01:20.000Z", completed: "2019-06-27T08:01:57.000Z",
        deferred: null, status: "Completed", location: "chaka",
        gender: "Male", age: 40, accessCode: 1, splashPage: 1,
        mpesa: 1, autoplay: 1, comments: "", registration: "self"
      });
    await task3.save();


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbConnect();


// passport
require('./passport');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// asks
app.use('/tasks/assigned', passport.authenticate('jwt', { session: false }), tasksRouter);



/* POST login. */
app.post('/personnel/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json(info);
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret', {
        expiresIn: "24h" // it will be expired after 24 hours
      });
      return res.json(
        {
          "reset_password": 0,
          "accessToken": token,
          "expires_in": "24h"

        }
      );
    });
  })(req, res);
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
