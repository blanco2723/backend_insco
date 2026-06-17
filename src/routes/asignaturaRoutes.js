const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const asignaturaController = require('../controllers/asignaturaController');
const verificarRol = require('../middlewares/rolesMiddleware')

router.get('/', verificarToken,asignaturaController.obtenerAsignaturas);   
router.post('/', verificarToken, verificarRol('Administrador'), asignaturaController.crearAsignatura);
router.put('/:id',verificarToken,verificarRol('Administrador','Docente'),asignaturaController.actualizarAsignatura);
router.delete('/:id',verificarToken,verificarRol('Administrador'),asignaturaController.eliminarAsignatura);

module.exports = router;
