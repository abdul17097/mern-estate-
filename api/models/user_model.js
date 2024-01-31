const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7J2etxld0NfcGx9GVl84yn3yKvTehSnBWGTIY4gWvg&s"
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
