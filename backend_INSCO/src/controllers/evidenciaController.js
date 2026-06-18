const supabase = require('../config/supabase');

const obtenerEvidencias = async (req, res) => {
    try {
        const { data, error } = await supabase  
            .from('evidencias')
            .select(`*,proyectos(id,nombre)`)
            .order('id', { ascending: false })
        if (error) {
            return res.status(404).json({ mensaje: "Error al obtener evidencias", error })
        }   
        res.json(data)
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message })
    }   
}

const crearEvidencia = async (req, res) => {
    try {
        const { proyecto_id,titulo,descripcion, archivo_url, tipo} = req.body
        const { data, error } = await supabase
            .from('evidencias')
            .insert([{ proyecto_id,titulo,descripcion, archivo_url, tipo }])
            .select()
        if (error) {
            return res.status(400).json({ mensaje: "Error al crear evidencia", error })
        }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message })
    }   
}

module.exports = {
    obtenerEvidencias,
    crearEvidencia
}

