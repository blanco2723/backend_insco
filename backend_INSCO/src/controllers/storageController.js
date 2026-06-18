const supabase = require('../config/supabase');

const subirArchivo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mensaje: "No se ha proporcionado ningún archivo" })
        }
        const nombreArchivo =
            Date.now() +
            '-' +
            req.file.originalname;
        const { data, error } = await supabase.storage
            .from('evidencias')
            .upload(nombreArchivo, req.file.buffer, {
                contentType: req.file.mimetype
            })  
        if (error) {
            return res.status(500).json({ mensaje: "Error al subir el archivo", error })
        }
        const {data:urlData} = supabase.storage.from('evidencias').getPublicUrl(nombreArchivo)
        res.json({ mensaje: "Archivo subido exitosamente", url: urlData.publicUrl })
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message })
    }
}

module.exports = {
    subirArchivo
}
