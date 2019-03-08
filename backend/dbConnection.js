const mongoose = require('mongoose');

// *********** Connect to Mongo  ***********
console.log('Attempting to connect to mongoose');

mongoose.connect("mongodb://admin:admin1234@ds163255.mlab.com:63255/onlinechat", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo database!");
  })
  .catch(err => {
    console.error("App starting error:", err.stack);
  });