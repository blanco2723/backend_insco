const express = require('express');
const carreraController = require('../controllers/carreraController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRoles = require('../middlewares/rolesMiddleware')

const router = express.Router();    
router.get('/', verificarToken, carreraController.obtenerCarreras);
router.post('/', verificarToken, verificarRoles(['Administrador']), carreraController.crearCarrera);

module.exports = router;