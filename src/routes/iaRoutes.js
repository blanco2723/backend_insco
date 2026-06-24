const express = require('express');

const router = express.Router();

const verificarToken = require('../middlewares/authMiddleware');

const iaController = require('../controllers/iaController');

router.post('/competencia',verificarToken,iaController.generarCompetencia);
router.post('/contenidos',verificarToken,iaController.generarContenidos);
router.post('/articulacion',verificarToken,iaController.generarArticulacion);
router.post('/saberes',verificarToken,iaController.generarIdeasSaberes);
router.post('/proyectos',verificarToken,iaController.generarIdeasProyecto);

router.post('/diagnostico-proyecto',verificarToken,iaController.generarDiagnosticoProyecto);
router.post('/justificacion-proyecto',verificarToken,iaController.generarJustificacionProyecto);
router.post('/objetivo-general-proyecto',verificarToken,iaController.generarObjetivoGeneralProyecto);
router.post('/objetivos-especificos-proyecto',verificarToken,iaController.generarObjetivosEspecificosProyecto);
router.post('/actividades-proyecto',verificarToken,iaController.generarActividadesProyecto);
router.post('/recursos-proyecto',verificarToken,iaController.generarRecursosProyecto);
router.post('/cronograma-proyecto',verificarToken,iaController.generarCronogramaProyecto);
router.post('/resultados-proyecto',verificarToken,iaController.generarResultadosProyecto);
router.post('/conclusiones-proyecto',verificarToken,iaController.generarConclusionesProyecto);

router.post('/proyecto-completo',verificarToken,iaController.generarProyectoCompleto);

module.exports = router;