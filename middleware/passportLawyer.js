const passport = require("passport");
const Lawyer = require("../models/Lawyer");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrKey,
};
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const lawyer = await Lawyer.findOne({ _id: jwt_payload._id }).select(
        "-password"
      );
      lawyer ? done(null, lawyer) : done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = isAuth= () =>
  passport.authenticate("jwt", { session: false });
