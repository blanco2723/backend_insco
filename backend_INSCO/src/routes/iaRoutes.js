const express = require('express');

const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware');

const iaController = require('../controllers/iaController');

router.post('/competencia',verificarToken,iaController.generarCompetencia);

module.exports = router;