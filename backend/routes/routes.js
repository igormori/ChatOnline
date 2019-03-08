const express = require('express');
const router = express.Router();
const eventController = require("../controller/eventController.js");
const users = require("../controller/usersController.js");
const history = require("../controller/historyController")
const register = require("../auth/AuthController")


//history routes
router.post('/history',history.registerHistory);
router.get('/history',history.getHistory);
router.get('/history/:room',history.getHistoryByRoom);

//eventLog routes
router.post('/eventLog', eventController.registerEvents);
router.get('/eventLog',eventController.getEvents);

//users routes
router.put('/users/room/:email',users.editRoom);
router.post('/users',users.registerUsers);
router.put('/users/:email',users.editOne);
router.get('/users/',users.getusers);
router.get('/users/:email',users.getOneUser);

//registration routes
router.post('/register',register.register);
router.get('/me',register.getMe)

//login routes
router.post('/login',register.login);
router.get('/logout',register.logout);


module.exports = router;