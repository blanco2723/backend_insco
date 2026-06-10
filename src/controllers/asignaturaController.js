const supabase = require('../config/supabase');

const obtenerAsignaturas = async (req, res) => {
    try {
        const {data,error} = await supabase.from('asignaturas').select('*').order('id')
        if(error){
            return res.status(400).json({message:'Error al obtener las asignaturas'})
        }   

        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }   
}

const crearAsignatura = async (req, res) => {
    try {
        const {carrera_id, nombre, anio, descripcion} = req.body
        const {data,error} = await supabase.from('asignaturas').insert([
            {carrera_id, nombre, anio, descripcion}
        ]).select()
        if(error){
            return res.status(400).json({message:'Error al crear la asignatura'})
        }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }   
}

module.exports = {
    obtenerAsignaturas,
    crearAsignatura
}   