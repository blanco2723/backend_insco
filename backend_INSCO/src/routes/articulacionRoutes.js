const express = require('express');

const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');

const { obtenerArticulaciones, crearArticulacion } = require('../controllers/articulacionController');

router.get('/', verificarToken, obtenerArticulaciones);
router.post('/', verificarToken, crearArticulacion);

module.exports = router;
