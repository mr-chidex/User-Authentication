const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

//hash password before saving to DB
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcryptJs.genSalt(12);
        const hashedPassword = await bcryptJs.hash(this.password, salt);
        this.password = hashedPassword;
        this.confirmPassword = hashedPassword;
        next();
    }
    catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model('Users', userSchema);

