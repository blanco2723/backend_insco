const supabase = require('../config/supabase');

const obtenerArticulaciones = async (req,res)=>{

    try{

        const {data,error} = await supabase
        .from('articulaciones')
        .select(`
            *,
            contenidos(
                id,
                nombre
            ),
            saberes(
                id,
                titulo
            )
        `)
        .order('id');

        if(error){

            return res.status(400).json({
                message:'Error al obtener articulaciones'
            });

        }

        res.json(data);

    }catch(error){

        res.status(500).json({
            message:'Error del servidor'
        });

    }

};

const crearArticulacion = async (req,res)=>{

    try{

        const {
            contenido_id,
            saber_id,
            observacion,
            nivel,
            evidencia,
            propuesta_proyecto,
        } = req.body;

        const creado_por = req.usuario.id;

        const {data,error} = await supabase
        .from('articulaciones')
        .insert([
            {
                contenido_id,
                saber_id,
                observacion,
                nivel,
                evidencia,
                propuesta_proyecto,
                creado_por
            }
        ])
        .select();

if (error) {
    console.log('SUPABASE ERROR:', error);

    return res.status(400).json({
        message: 'Error al crear articulación',
        error: error.message,
        details: error.details,
        hint: error.hint
    });
}

        res.status(201).json(data);

    }catch(error){

        res.status(500).json({
            message:'Error del servidor'
        });

    }

};

const actualizarArticulacion = async (req,res)=>{

    try{

        const {id} = req.params;

        const {
            contenido_id,
            saber_id,
            observacion,
            nivel,
            evidencia,
            propuesta_proyecto
        } = req.body;

        const {data,error} = await supabase
        .from('articulaciones')
        .update({
            contenido_id,
            saber_id,
            observacion,
            nivel,
            evidencia,
            propuesta_proyecto
        })
        .eq('id',id)
        .select();

        if(error){

            return res.status(400).json({
                message:'Error al actualizar'
            });

        }

        res.json(data);

    }catch(error){

        res.status(500).json({
            message:'Error del servidor'
        });

    }

};

const eliminarArticulacion = async (req,res)=>{

    try{

        const {id} = req.params;

        const {error} = await supabase
        .from('articulaciones')
        .delete()
        .eq('id',id);

        if(error){

            return res.status(400).json({
                message:'Error al eliminar'
            });

        }

        res.json({
            message:'Articulación eliminada'
        });

    }catch(error){

        res.status(500).json({
            message:'Error del servidor'
        });

    }

};

module.exports = {
    obtenerArticulaciones,
    crearArticulacion,
    actualizarArticulacion,
    eliminarArticulacion
};