const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
console.log("Routes corriendo");

router.get('/', mainController.index);

module.exports = router;
