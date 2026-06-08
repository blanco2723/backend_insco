const express = require('express');
const router = express.Router();
const { crearUsuario } = require('../controllers/authController');
const { login } = require('../controllers/authController');

router.post('/register', crearUsuario);
router.post('/login', login);


module.exports = router;
