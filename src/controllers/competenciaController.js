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
        const {asignatura_id,nombre, descripcion} = req.body
        const {data,error} = await supabase.from('competencias').insert([
            {asignatura_id,nombre, descripcion}
        ]).select()
        if(error){
            return res.status(400).json({message:'Error al crear la competencia'})
        }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

const actualizarCompetencia = async (req,res)=>{

    try{

        const {id} = req.params;

        const {
            descripcion,
            nombre,
            asignatura_id
        } = req.body;

        const {data,error} = await supabase
        .from('competencias')
        .update({
            descripcion,
            nombre,
            asignatura_id
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

const eliminarCompetencia = async (req,res)=>{

    try{

        const {id} = req.params;

        const {error} = await supabase
        .from('competencias')
        .delete()
        .eq('id',id);

        if(error){

            return res.status(400).json(error);

        }

        res.json({
            mensaje:'Competencia eliminada'
        });

    }catch(error){

        res.status(500).json(error);

    }

};


module.exports = {
    obtenerCompetencias,
    crearCompetencia,
    actualizarCompetencia,
    eliminarCompetencia
}   
