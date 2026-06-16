const express=require('express')
const router=express.Router()
const verificarToken=require('../middlewares/authMiddleware')
const upload=require('../middlewares/uploadMiddleware')

const {
    subirArchivo
}=require('../controllers/storageController')

router.post('/upload',verificarToken,upload.single('archivo'),subirArchivo)

module.exports=router   