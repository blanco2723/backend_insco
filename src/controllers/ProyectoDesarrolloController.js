const supabase = require('../config/supabase');

const obtenerProyectoDesarrollo = async (req, res) => {

try {

    const { proyectoId } = req.params;

    const { data, error } = await supabase
        .from('proyecto_desarrollo')
        .select('*')
        .eq('proyecto_id', proyectoId)
        .single();

    if (error && error.code !== 'PGRST116') {

        return res.status(400).json({
            mensaje: 'Error al obtener desarrollo'
        });

    }

    res.json(data);
    console.log("DATA SUPABASE:", data);

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error del servidor'
    });

}


};

const crearProyectoDesarrollo = async (req, res) => {


try {

    const {
        proyecto_id,
        diagnostico,
        justificacion,
        objetivo_general,
        objetivos_especificos,
        actividades,
        recursos,
        resultados_esperados,
        cronograma,
        conclusiones
    } = req.body;

    const { data, error } = await supabase
        .from('proyecto_desarrollo')
        .insert([
            {
                proyecto_id,
                diagnostico,
                justificacion,
                objetivo_general,
                objetivos_especificos,
                actividades,
                recursos,
                resultados_esperados,
                cronograma,
                conclusiones
            }
        ])
        .select();

    if (error) {

        console.log(error);

        return res.status(400).json({
            mensaje: 'Error al crear desarrollo'
        });

    }

    res.status(201).json(data);

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error del servidor'
    });

}


};



const actualizarProyectoDesarrollo = async (req, res) => {

try {

    const { id } = req.params;

    const {
        diagnostico,
        justificacion,
        objetivo_general,
        objetivos_especificos,
        actividades,
        recursos,
        resultados_esperados,
        cronograma,
        conclusiones
    } = req.body;

    const { data, error } = await supabase
        .from('proyecto_desarrollo')
        .update({
            diagnostico,
            justificacion,
            objetivo_general,
            objetivos_especificos,
            actividades,
            recursos,
            resultados_esperados,
            cronograma,
            conclusiones,
            updated_at: new Date()
        })
        .eq('id', id)
        .select();

    if (error) {

        console.log(error);

        return res.status(400).json({
            mensaje: 'Error al actualizar desarrollo'
        });

    }

    res.json(data);

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error del servidor'
    });

}


};


module.exports = {
obtenerProyectoDesarrollo,
crearProyectoDesarrollo,
actualizarProyectoDesarrollo
};
