const JWT = require('jsonwebtoken');

module.exports = (user) => {
    return JWT.sign({
        iss: 'Mr-Chidex',
        sub: user,
        iat: new Date().getTime()
    }, process.env.SECRET, {expiresIn: '2h'});
}