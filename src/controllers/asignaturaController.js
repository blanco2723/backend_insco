const supabase = require('../config/supabase');

const obtenerAsignaturas = async (req, res) => {
    try {
         const { data, error } = await supabase
            .from('asignaturas')
            .select(`
                *,
                carreras(id,nombre)
            `)
            .order('carreras(id),anio');
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

 const actualizarAsignatura = async (req,res)=>{

    try{

        const {id} = req.params;

        const {
            nombre,
            descripcion,
            carrera_id,
            anio
        } = req.body;

        const {data,error} = await supabase
        .from('asignaturas')
        .update({
            nombre,
            descripcion,
            carrera_id,
            anio
        })
        .eq('id',id)
        .select();

        if(error){

            return res.status(400).json(error);

        }

        res.json(data);

    }catch(error){

        res.status(500).json(error);

    }

};

const eliminarAsignatura = async (req,res)=>{

    try{

        const {id} = req.params;

        const {error} = await supabase
        .from('asignaturas')
        .delete()
        .eq('id',id);

        if(error){

            return res.status(400).json(error);

        }

        res.json({
            mensaje:'Asignatura eliminada'
        });

    }catch(error){

        res.status(500).json(error);

    }

};

module.exports = {
    obtenerAsignaturas,
    crearAsignatura,
    actualizarAsignatura,
    eliminarAsignatura
}   