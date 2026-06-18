const supabase = require('../config/supabase');

const obtenerContenidos = async (req, res) => {
    try {
        const {data,error} = await supabase.from('contenidos').select(`
    *,
    competencias(
        id,
        nombre
    )
`).order('id')
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
        const {competencia_id, nombre, descripcion} = req.body
        const {data,error} = await supabase.from('contenidos').insert([
            {competencia_id, nombre, descripcion}
        ])
        if(error){
            return res.status(400).json({message:'Error al crear el contenido'})
        }
        res.json(data)
    } catch (error) {
        res.status(500).json({message:'Error del servidor'})
    }
}

const actualizarContenido = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nombre,
            descripcion,
            competencia_id
        } = req.body;

        const { data, error } = await supabase
            .from('contenidos')
            .update({
                nombre,
                descripcion,
                competencia_id
            })
            .eq('id', id)
            .select();

        if (error) {

            return res.status(400).json({
                mensaje: 'Error al actualizar'
            });

        }

        res.json(data);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

const eliminarContenido = async (req, res) => {

    try {

        const { id } = req.params;

        const { error } = await supabase
            .from('contenidos')
            .delete()
            .eq('id', id);

        if (error) {

            return res.status(400).json({
                mensaje: 'Error al eliminar'
            });

        }

        res.json({
            mensaje: 'Contenido eliminado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};


module.exports = {
    obtenerContenidos,
    crearContenido,
    actualizarContenido,
    eliminarContenido
}   