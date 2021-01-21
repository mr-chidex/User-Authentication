const passport = require('passport');
const User = require('../model/user');
const { schemas } = require('../validator/auth');
const getToken = require('../validator/token');

module.exports = {
    signUp: async (req, res, next) => {
        const { value, error } = schemas.authSchema.validate(req.body);

        //validation check
        if (error) return res.status(400).json({ error: error.details[0].message })


        const { email, password, firstname, lastname } = value;

        //check if user already exist
        const user = await User.findOne({ "local.email": email });
        if (user) return res.status(400).json({ error: 'User already exist' });

        //save new user
        const newUser = new User({
            method: "local",
            local: {
                email,
                password,
                firstname,
                lastname
            }
        });

        console.log(newUser)
        await newUser.save();

        res.status(200).json({ message: 'User created', user: newUser });

    },

    signIn: async (req, res, next) => {
        const user = req.user
        const token = getToken(user._id)
        res.json({ user, token });
    },

    secret: async (req, res, next) => {
        res.json({ message: 'secret' });
    }
}