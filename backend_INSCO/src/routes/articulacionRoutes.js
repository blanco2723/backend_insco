const express = require('express');

const router = express.Router();

const articulacionController = require('../controllers/articulacionController');

const verificarToken = require('../middlewares/authMiddleware');

const verificarRol = require('../middlewares/rolesMiddleware');

router.get( '/',verificarToken,articulacionController.obtenerArticulaciones);
router.post('/',verificarToken,verificarRol('Administrador','Docente'),articulacionController.crearArticulacion);
router.put('/:id',verificarToken,verificarRol('Administrador','Docente'),articulacionController.actualizarArticulacion);
router.delete('/:id',verificarToken,verificarRol('Administrador'),articulacionController.eliminarArticulacion);

module.exports = router;