const Joi = require('joi');

module.exports = {
    schemas: {
        authSchema: Joi.object({
            email: Joi.string().email().required().normalize(),
            password: Joi.string().trim().required(),
            firstname: Joi.string().trim().required(),
            lastname: Joi.string().trim().required(),
        })
    }
}  