var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var User = require('../model/users')


exports.register =  function(req, res) {
  
  User.findOne({ email: req.body.email,user:req.body.user }).then(
    (result) => {
        if (result) {
          res.status(500).send("erro user already exists")
         
        } else {
          
          var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
          User.create({
            user : req.body.user,
            email : req.body.email,
            password : hashedPassword,
            room:1
      
          },
          function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
          });
  }
}).catch(err => {
    console.log(err)
});
  };

  exports.getMe =  function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
       // to
       User.findById(decoded.id, 
        { password: 0 }, // projection
        function (err, user) {
          if (err) return res.status(500).send("There was a problem finding the user.");
          if (!user) return res.status(404).send("No user found.");
          res.status(200).send(user);
      });   
    });
  };


  exports.login =function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      });
  };  

  exports.logout =function(req, res) {
    res.status(200).send({ auth: false, token: null });
  };