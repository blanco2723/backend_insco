const express = require('express');

const router = express.Router();

const proyectoDesarrolloController =
require('../controllers/proyectoDesarrolloController');

const verificarToken =
require('../middlewares/authMiddleware');

router.get('/:proyectoId',verificarToken,proyectoDesarrolloController.obtenerProyectoDesarrollo);

router.post('/',verificarToken,proyectoDesarrolloController.crearProyectoDesarrollo);

router.put('/:id',verificarToken,proyectoDesarrolloController.actualizarProyectoDesarrollo);

module.exports = router;
