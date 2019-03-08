const mongoose = require('mongoose');

const users= mongoose.Schema({
    user: String,
    email:String,
    password:String,
    date: String,
    time: String,
    room: String,
    connected: Boolean 
})

module.exports = mongoose.model('users', users);