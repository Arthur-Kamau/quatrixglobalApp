// const LocalStrategy = require('passport-local').Strategy
// 

// // 

// function initialize(passport, getUserByPhone, getUserById) {
//   const authenticateUser = async (phone, password, done) => {
//     console.log("get user 1 " + phone);
//     const user = await getUserByPhone(phone);
//     if (user == null) {
//        return done(null, false, { "error": { "phone": 'No user with that phone' } });
//     }
//     // console.log("get user 2 " + password + " second " + user.password);
// try {
//   if (await bcrypt.compare(password, user.password)) {

//     return done(null, user)
//   } else {

//     return done(null, false, { "error": { "password": "You have entered an incorrect password" } });
//   }
// } catch (e) {
//   console.log("eerrrr  userr........ "+e);
//   return done(e)
// }
//   }

//   passport.use(new LocalStrategy({ usernameField: 'phone' }, authenticateUser))
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id))
//   })
// }

// module.exports = initialize

const passport = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt');
var usersModel = require('./model/user');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
  usernameField: 'phone',
  passwordField: 'password'
},
  async function (phonePar, password, cb) {

    try {
      var user = await usersModel.findOne({
        where: {
          phone: phonePar
        }
      })
        .then(res => {


          return res;
        });


      if (!user) {
        return cb(null, false, { "error": { "phone": 'phone not found.' } });
      }


      if (await bcrypt.compare(password, user.password)) {
        console.log("sucess ...........");

        return cb(null, { id: user.id }, {
          message: 'Logged In Successfully'
        })
      } else {

        return cb(null, false, { "error": { "password": "You have entered an incorrect password" } });
      }

    } catch (e) {

      return cb(e)
    }

  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  async function (jwtPayload, cb) {


// query postgres
    try {
      var res = await usersModel.findAll({
        where: {
          id: jwtPayload.id
        }
      }).then(res => {
        console.log("getUserById res" + JSON.stringify(res));
        return res;
      });

      return cb(null, res);
    } catch (e) {

      return cb(e)
    }

  }
));