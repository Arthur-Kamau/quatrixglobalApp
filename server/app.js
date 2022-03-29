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

    const hashedPassword = await bcrypt.hash("123456", 10)
    const user1 = await usersModel.create({ phone: "0722222222", password: hashedPassword });

    await user1.save();


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbConnect();


// passport
require('./passport');

// const initializePassport =

// initializePassport(
//   passport,
//  async phonePar => {

// var res = await usersModel.findOne({
//   where: {
//     phone: phonePar
//   }
// }).then(res => {

//   console.log("getUserByPhone res" + JSON.stringify(res));
//   return res;
// });

// return res;

//   },
//   async idPar => {
   
//   },
// )



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



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
