const express=require('express')
const router=express.Router()
const verificarToken=require('../middlewares/authMiddleware')
const verificarRol=require('../middlewares/rolesMiddleware')
const {
    obtenerSaberes,
    obtenerSaberPorId,
    crearSaber,
    actualizarSaber,
    eliminarSaber
}=require('../controllers/saberController')

router.get('/',verificarToken,verificarRol(['Administrador','Docente','Estudiante']),obtenerSaberes)
router.get('/:id',verificarToken,verificarRol(['Administrador','Docente','Estudiante']),obtenerSaberPorId)
router.post('/',verificarToken,verificarRol(['Administrador','Docente']),crearSaber)
router.put('/:id',verificarToken,verificarRol(['Administrador','Docente']),actualizarSaber)
router.delete('/:id',verificarToken,verificarRol(['Administrador']),eliminarSaber)

module.exports=router