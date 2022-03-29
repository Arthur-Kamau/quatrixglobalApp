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

    //Assume there is a DB module pproviding a global UserModel
    // return UserModel.findOne({email, password})
    //     .then(user => {
    // if (!user) {
    //     return cb(null, false, {message: 'Incorrect email or password.'});
    // }

    // return cb(null, user, {
    //     message: 'Logged In Successfully'
    // });
    //     })
    //     .catch(err => {
    //         return cb(err);
    //     });

    try {
      var user = await usersModel.findOne({
        where: {
          phone: phonePar
        }
      })
        .then(res => {

          console.log("getUserByPhone res" + JSON.stringify(res));
          return res;
        });


      if (!user) {
        return cb(null, false, {"error" : { "phone": 'phone not found.' }});
      }


      if (await bcrypt.compare(password, user.password)) {
        console.log("sucess ...........");

        return cb(null, {id:user.id}, {
          message: 'Logged In Successfully'
        })
      } else {

        return cb(null, false, { "error": { "password": "You have entered an incorrect password" } });
      }

    } catch (e) {
      console.log("eerrrr  userr........ " + e);
      return cb(e)
    }

  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  function (jwtPayload, cb) {

    //find the user in db if needed
    return UserModel.findOneById(jwtPayload.id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));