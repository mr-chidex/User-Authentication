const expressPromise = require('express-promise-router');
const userController = require('../controllers/user');
const router = expressPromise();
const passport = require('passport');
const strategy = require('../validator/passport');

router.route('/signup')
    .post(userController.signUp);

router.route('/signin')
    .post(passport.authenticate('local', {session: false}) ,userController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', {session: false}) ,userController.secret);

module.exports = router; 