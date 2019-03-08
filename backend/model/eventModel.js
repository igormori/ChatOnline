const mongoose = require('mongoose');

// ***** Model Schema  *****
const eventLogs = mongoose.Schema({
    user : String,
    date: String,
    time: String,
    event: String
})

module.exports = mongoose.model('eventLogs', eventLogs);

