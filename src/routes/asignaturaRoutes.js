const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const asignaturaController = require('../controllers/asignaturaController');

router.get('/', verificarToken,asignaturaController.obtenerAsignaturas);   
router.post('/', verificarToken, asignaturaController.crearAsignatura);

module.exports = router;
