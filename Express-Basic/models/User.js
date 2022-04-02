const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 20,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 30,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model("User", userSchema);