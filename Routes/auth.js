const express = require('express');
const { signin , signup } = require('../Controllers/UserController.js');

const router = express.Router();

router.post('/signup',signup);

router.post('/login',signin);

module.exports = router;
