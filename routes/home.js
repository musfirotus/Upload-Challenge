// routes home : Tampil dan Hapus Data
const express = require('express');
const router = express.Router();
const todoModel = require('../models/taskModel')
const homeController = require('../controllers/homeController')

/* GET home routing. */
router.route('/')
    .get(homeController.tampil)
    .post(homeController.add)
// Delete Data
router.get("/delete/:id", homeController.delete);
// Ubah data menjadi Done
router.get("/done/:id", homeController.done);
// Ubah data menjadi Undone
router.get("/undone/:id", homeController.undone);
router.get('/:id/detail', homeController.detail);
router.post('/det', homeController.details)


module.exports = router;