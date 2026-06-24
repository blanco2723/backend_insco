const express = require('express');

const router = express.Router();

const proyectoController = require('../controllers/proyectoController');

const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/rolesMiddleware');

router.get(
'/',
verificarToken,
proyectoController.obtenerProyectos
);
router.get('/:id',verificarToken,proyectoController.obtenerProyectoPorId);

router.post(
'/',
verificarToken,
verificarRol('Administrador','Docente'),
proyectoController.crearProyecto
);

router.put(
'/:id',
verificarToken,
verificarRol('Administrador','Docente'),
proyectoController.actualizarProyecto
);

router.delete(
'/:id',
verificarToken,
verificarRol('Administrador'),
proyectoController.eliminarProyecto
);

module.exports = router;
