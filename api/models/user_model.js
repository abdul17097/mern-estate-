const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        typeof: 'string',
        required: true,
        unique: true
    },
    password: {
        typeof:'string',
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;