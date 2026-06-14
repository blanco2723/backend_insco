const express=require('express')
const router=express.Router()
const verificarToken=require('../middlewares/authMiddleware')

const {
    obtenerEvidencias,
    crearEvidencia
}=require('../controllers/evidenciaController') 

router.get('/',verificarToken,obtenerEvidencias)
router.post('/',verificarToken,crearEvidencia)  

module.exports=router
