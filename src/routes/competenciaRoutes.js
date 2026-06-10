const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const {
    obtenerCompetencias,
    obtenerCompetenciaPorId,
    crearCompetencia,
    actualizarCompetencia,
    eliminarCompetencia
} = require('../controllers/competenciaController');

router.get('/', verificarToken, obtenerCompetencias);
router.post('/', verificarToken, crearCompetencia);

module.exports = router;

