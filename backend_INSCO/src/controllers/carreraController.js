const supabase = require('../config/supabase');
const obtenerCarreras = async (req, res) => {
    try {   
        const {data,error} = await supabase.from('carreras').select('*').order('id')
        if(error){
            return res.status(400).json({message:'Error al obtener las carreras'})
        }  
        res.json(data)
    } catch (error) {   
        res.status(500).json({message:'Error del servidor'})
    }
}

const crearCarrera = async (req, res) => {
    try {
        const {nombre, descripcion} = req.body
        const {data,error} = await supabase.from('carreras').insert([
            {nombre, descripcion}
        ]).select() 
        if(error){
            return res.status(400).json({message:'Error al crear la carrera'})
        }   
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }   
}

const actualizarCarrera = async (req,res) =>{
    try{
const {id} = req.params
    const {
        nombre,
        descripcion
    }= req.body
    const {data,error} = await supabase.from('carreras').update({
        nombre,
        descripcion 
    }).eq('id',id).select()

    if(error){
        return res.status(400).json({message:'Error al actualizar'})
    }
    res.json(data)
    }catch(error){
        res.status(500).json({message:'Error del servidor'})
    }
 }

 const eliminarCarrera = async (req, res) => {
    try{
        const {id} = req.params
        const {error} = await supabase.from('carreras').delete().eq('id',id)
        if(error){
            return res.status(400).json({message:'error al eliminar Carrera'})
        }
        res.status(200).json({message:'Carrera eliminada correctamente'})
    }catch(error){
        res.status(500).json({message:'error del servidor'})
    }
 }

module.exports = {
    obtenerCarreras,
    crearCarrera,
    actualizarCarrera,
    eliminarCarrera
}
