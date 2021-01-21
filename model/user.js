const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');
const { Schema } = require("mongoose");

const userSchema = new Schema({
    method: {
        type: String,
        required: true,
        enum: ["facebook", "google", "local"]
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        },
        firstname: { type: String },
        lastname: { type: String },
    },
    facebook: {
        email: {
            type: String,
            lowercase: true,
        },
        firstname: { type: String, },
        lastname: { type: String },
        facebookId: { type: String }
    },
    google: {
        email: {
            type: String,
            lowercase: true,
        },
        firstname: { type: String, },
        lastname: { type: String },
        googleId: { type: String }

    }
});

//hash password before saving to DB
userSchema.pre('save', async function (next) {
    try {
        if (this.method !== "local") return next();

        const salt = await bcryptJs.genSalt(12);
        const hashedPassword = await bcryptJs.hash(this.local.password, salt);
        this.local.password = hashedPassword;
        next();
    }
    catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Users', userSchema);

