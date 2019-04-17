const mongoose = require('mongoose');

const rooms= mongoose.Schema({
    id: Number,
    name:String,
    createdDate:String,
    editDate: String,
    status: String,
})

module.exports = mongoose.model('rooms', rooms);