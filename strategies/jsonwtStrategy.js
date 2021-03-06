const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const key = require("../setup/config");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secret;

module.exports = (passport) => {
   console.log("Token", opts.jwtFromRequest);
   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         User.findById(jwt_payload.id)
            .then((user) => {
               if (user) {
                  return done(null, user);
               }
               return done(null, false);
            })
            .catch((err) => console.log(err));
      })
   );
};
