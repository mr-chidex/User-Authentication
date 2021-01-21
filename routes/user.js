const expressPromise = require('express-promise-router');
const { signIn, signUp, secret } = require('../controllers/user');
const router = expressPromise();
const passport = require('passport');
const strategy = require('../validator/passport');

router.route('/api/signup')
    .post(signUp);

router.route('/api/signin')
    .post(passport.authenticate('local', { session: false }), signIn);

router.route('/api/facebook')
    .post(passport.authenticate('facebookToken', { session: false }), signIn);

router.route('/api/google')
    .post(passport.authenticate('googleToken', { session: false }), signIn);

router.route('/api/secret')
    .get(passport.authenticate('jwt', { session: false }), secret);

module.exports = router; 