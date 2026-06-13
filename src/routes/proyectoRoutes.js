const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const { obtenerProyectos, crearProyecto } = require('../controllers/proyectoController');   
router.get('/', verificarToken, obtenerProyectos);
router.post('/', verificarToken, crearProyecto);
module.exports = router;
