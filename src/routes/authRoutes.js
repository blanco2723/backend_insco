const express = require('express');
const router = express.Router();
const { crearUsuario } = require('../controllers/authController');
const { login } = require('../controllers/authController');
const { perfil } = require('../controllers/authController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/register', crearUsuario);
router.post('/login', login);
router.get('/perfil', verificarToken, perfil);


module.exports = router;
