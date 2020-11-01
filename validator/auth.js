const Joi = require('joi');

module.exports = {
    schemas: {
        authSchema: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required().valid(Joi.ref('password'))
        })
    }
}  