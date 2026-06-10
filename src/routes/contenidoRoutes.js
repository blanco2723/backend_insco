const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const {
    obtenerContenidos,
    obtenerContenidoPorId,
    crearContenido,
    actualizarContenido,
    eliminarContenido
} = require('../controllers/contenidoController');

router.get('/', verificarToken, obtenerContenidos);
router.post('/', verificarToken, crearContenido);  

module.exports = router;
