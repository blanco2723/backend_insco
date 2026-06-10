const supabase = require('../config/supabase');

const obtenerSaberes = async (req, res) => {
    try {  
       
        const {data,error} = await supabase.from('saberes').select('*').order('id')
        if(error){
            return res.status(400).json({message:'Error al obtener los saberes'})
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

const obtenerSaberPorId = async (req, res) => {
    try {
        const {id} = req.params
        const {data,error} = await supabase.from('saberes').select('*').eq('id', id).single()
        if(error){
            return res.status(400).json({message:'Error al obtener el saber'})
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

const crearSaber = async (req, res) => {
    try {
                const {
            titulo,
            descripcion,
            area_productiva,
            comunidad
        } = req.body
        const {data,error} = await supabase.from('saberes').insert([
            {
            titulo,
            descripcion,
            area_productiva,
            comunidad
        }
    ])
    .select()
        if(error){
            return res.status(400).json({message:'Error al crear el saber'})
        }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

const actualizarSaber = async (req, res) => {
    try {
        const {id} = req.params
        const {
            titulo,
            descripcion,
            area_productiva,
            comunidad
        } = req.body
        const {data,error} = await supabase.from('saberes').update({
            titulo,
            descripcion,
            area_productiva,
            comunidad
        }).eq('id', id).select()
        if(error){
            return res.status(400).json({message:'Error al actualizar el saber'})
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

const eliminarSaber = async (req, res) => {
    try {
        const {id} = req.params
        const {error} = await supabase.from('saberes').delete().eq('id', id)
        if(error){
            return res.status(400).json({message:'Error al eliminar el saber'})
        }
        res.status(200).json({message:'Saber eliminado correctamente'})
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

module.exports = {
    obtenerSaberes,
    obtenerSaberPorId,
    crearSaber,
    actualizarSaber,
    eliminarSaber
}