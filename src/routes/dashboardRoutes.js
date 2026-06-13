const express = require('express'); 
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const { obtenerIndicadores } = require('../controllers/dashboardController');

router.get('/', verificarToken, obtenerIndicadores); 
module.exports = router;
