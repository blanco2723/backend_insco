const express = require('express');
const carreraController = require('../controllers/carreraController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();    
router.get('/', verificarToken, carreraController.obtenerCarreras);
router.post('/', verificarToken, carreraController.crearCarrera);

module.exports = router;