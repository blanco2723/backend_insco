const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/rolesMiddleware');
const {
    obtenerContenidos,
    crearContenido,
    actualizarContenido,
    eliminarContenido
} = require('../controllers/contenidoController');


router.get('/', verificarToken, obtenerContenidos);
router.post('/', verificarToken, verificarRol('Administrador','Docente'),crearContenido);  
router.put('/:id',verificarToken,verificarRol('Administrador','Docente'),actualizarContenido);
router.delete('/:id',verificarToken,verificarRol('Administrador'),eliminarContenido);
module.exports = router;
