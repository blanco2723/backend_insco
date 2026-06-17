const express = require('express');
const carreraController = require('../controllers/carreraController');
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/rolesMiddleware')

const router = express.Router();    
router.get('/', verificarToken, carreraController.obtenerCarreras);
router.post('/', verificarToken, verificarRol('Administrador'),carreraController.crearCarrera);
router.put('/:id',verificarToken,verificarRol('Administrador','Docente'),carreraController.actualizarCarrera)
router.delete('/:id',verificarToken,verificarRol('Administrador'),carreraController.eliminarCarrera)

module.exports = router;