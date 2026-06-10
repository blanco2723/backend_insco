const supabase = require('../config/supabase');
const obtenerCompetencias = async (req, res) => {
    try {
        const {data,error} = await supabase.from('competencias').select(`*,asignaturas(id,nombre)`).order('id')
        if(error){
            return res.status(400).json({message:'Error al obtener las competencias'})
        }   
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}
const crearCompetencia = async (req, res) => {
    try {
        const {asignatura_id, nombre, descripcion} = req.body
        const {data,error} = await supabase.from('competencias').insert([
            {asignatura_id, descripcion}
        ]).select()
        if(error){
            return res.status(400).json({message:'Error al crear la competencia'})
        }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

module.exports = {
    obtenerCompetencias,
    crearCompetencia
}   
