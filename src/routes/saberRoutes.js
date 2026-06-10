const express=require('express')
const router=express.Router()
const verificarToken=require('../middlewares/authMiddleware')
const {
    obtenerSaberes,
    obtenerSaberPorId,
    crearSaber,
    actualizarSaber,
    eliminarSaber
}=require('../controllers/saberController')

router.get('/',verificarToken,obtenerSaberes)
router.get('/:id',verificarToken,obtenerSaberPorId)
router.post('/',verificarToken,crearSaber)
router.put('/:id',verificarToken,actualizarSaber)
router.delete('/:id',verificarToken,eliminarSaber)

module.exports=router