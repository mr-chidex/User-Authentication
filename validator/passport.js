const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const User = require('../model/user');
const LocalStrategy = require('passport-local').Strategy;
const bcryptJs = require('bcryptjs');

//For accessing secret routes
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
}, async (payload, done) => {
    try{
        //find user from token
        const user = await User.findById(payload.sub);
        if(!user) {
            return done(null, false);
        }

        //if user exist
        done(null, user)

    }
    catch(error) {
        done(error, false);
    }
}));


//for signing in
passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {
        //find existing user
        const user = await User.findOne({email});
        if(!user) {
            return done(null, false);
        }

        //if user exist, check pasword
        const isEqual = await bcryptJs.compare(password, user.password);
        if(!isEqual) {
            return done(null, false);
        }

        //if password matches
        done(null, user);
    }
    catch(error){
        return done(error, false);
    }
}));