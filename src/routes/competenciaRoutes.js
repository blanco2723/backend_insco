const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const verificarRol = require('../middlewares/rolesMiddleware')
const {
    obtenerCompetencias,
    crearCompetencia,
    actualizarCompetencia,
    eliminarCompetencia
} = require('../controllers/competenciaController');

router.get('/', verificarToken, obtenerCompetencias);
router.post('/', verificarToken, verificarRol('Administrador'), crearCompetencia);
router.put('/:id',verificarToken,verificarRol('Administrador','Docente'),actualizarCompetencia);
router.delete('/:id',verificarToken,verificarRol('Administrador'),eliminarCompetencia);

module.exports = router;

