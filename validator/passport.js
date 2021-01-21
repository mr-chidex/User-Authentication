const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../model/user');
const LocalStrategy = require('passport-local').Strategy;
const bcryptJs = require('bcryptjs');
const FacebookTokenStrategy = require("passport-facebook-token");
const GoogleTokenStrategy = require("passport-google-plus-token");

//jwt strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
}, async (payload, done) => {
    try {
        //find user from token
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }

        //if user exist
        done(null, user)

    }
    catch (error) {
        done(error, false);
    }
}));


//local strategy
passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {
    try {

        //find existing user
        const user = await User.findOne({ "local.email": email });
        if (!user) {
            return done(null, false);
        }

        //if user exist, check pasword
        const isEqual = await bcryptJs.compare(password, user.local.password);
        if (!isEqual) {
            return done(null, false);
        }

        //if password matches
        done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}));

//facebook strategy
passport.use("facebookToken", new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        //check if we already have a user with such id
        const user = await User.findOne({ "facebook.facebookId": profile.id });
        if (user) return done(null, user);

        //if no user, create new user
        const newUser = await new User({
            method: "facebook",
            facebook: {
                email: profile.emails[0].value,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                facebookId: profile.id
            }

        })

        await newUser.save();
        done(null, newUser)
    }
    catch (error) {
        done(error, false, error.message)
    }
}))


//googleOAuth
passport.use("googleToken", new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            //check if we already have a user with such id
            const user = await User.findOne({ "google.googleId": profile.id });
            if (user) return done(null, user);

            //if no user, create new user
            const newUser = await new User({
                method: "google",
                facebook: {
                    email: profile.emails[0].value,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    googleId: profile.id
                }
            })

            await newUser.save();
            done(null, newUser)
        }
        catch (error) {
            done(error, false, error.message)
        }
    }))