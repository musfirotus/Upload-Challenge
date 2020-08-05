const express = require('express');
const router = express.Router();
const homeController = require('../controllers/usersController')

/* GET home routing. */


router.post('/users', homeController.details)

module.exports = router;
