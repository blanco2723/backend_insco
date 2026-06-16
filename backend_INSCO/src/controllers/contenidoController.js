const supabase = require('../config/supabase');

const obtenerContenidos = async (req, res) => {
    try {
        const {data,error} = await supabase.from('contenidos').select(`*,asignaturas(id,nombre)`).order('id')
        if(error){
            return res.status(400).json({message:'Error al obtener los contenidos'})
        }   
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }

}
const crearContenido = async (req, res) => {
    try {
        const {asignatura_id, nombre, descripcion} = req.body
        const {data,error} = await supabase.from('contenidos').insert([
            {asignatura_id, nombre, descripcion}
        ])
        if(error){
            return res.status(400).json({message:'Error al crear el contenido'})
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

module.exports = {
    obtenerContenidos,
    crearContenido
}   