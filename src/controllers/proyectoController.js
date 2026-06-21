const supabase = require('../config/supabase');

const obtenerProyectos = async (req, res) => {

try {

    const { data, error } = await supabase
        .from('proyectos')
        
        .select( `*, articulaciones( 
            id, 
            observacion, 
            nivel, 
            propuesta_proyecto, 
            contenidos( id, nombre ), 
            saberes( id, titulo ) )`)
        .order('id');

    if (error) {
        return res.status(400).json({
            message: 'Error al obtener proyectos'
        });
    }

    res.json(data);

} catch (error) {

    console.log(error);

    res.status(500).json({
        message: 'Error del servidor'
    });

}


};

const crearProyecto = async (req, res) => {

try {

    const {
        articulacion_id,
        nombre,
        descripcion,
        gestion,
        estado
    } = req.body;

    const { data, error } = await supabase
        .from('proyectos')
        .insert([
            {
                articulacion_id,
                nombre,
                descripcion,
                gestion,
                estado,
                creado_por: req.usuario.id
            }
        ])
        .select();

    if (error) {
        return res.status(400).json({
            message: 'Error al crear proyecto'
        });
    }

    res.status(201).json(data);

} catch (error) {

    console.log(error);

    res.status(500).json({
        message: 'Error del servidor'
    });

}

};

const actualizarProyecto = async (req, res) => {


try {

    const { id } = req.params;

    const {
        articulacion_id,
        nombre,
        descripcion,
        gestion,
        estado
    } = req.body;

    const { data, error } = await supabase
        .from('proyectos')
        .update({
            articulacion_id,
            nombre,
            descripcion,
            gestion,
            estado
        })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(400).json({
            message: 'Error al actualizar proyecto'
        });
    }

    res.json(data);

} catch (error) {

    console.log(error);

    res.status(500).json({
        message: 'Error del servidor'
    });

}


};

const eliminarProyecto = async (req, res) => {


try {

    const { id } = req.params;

    const { error } = await supabase
        .from('proyectos')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(400).json({
            message: 'Error al eliminar proyecto'
        });
    }

    res.json({
        message: 'Proyecto eliminado correctamente'
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        message: 'Error del servidor'
    });

}


};

module.exports = {
obtenerProyectos,
crearProyecto,
actualizarProyecto,
eliminarProyecto
};
