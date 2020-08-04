// routes home : Tampil dan Hapus Data
const express = require('express');
const router = express.Router();
const todoModel = require('../models/taskModel')
const homeController = require('../controllers/homeController')

/* GET home routing. */
router.route('/')
    .get(homeController.tampil)
    .post(homeController.add)
router.get("/delete/:id", homeController.delete);

module.exports = router;