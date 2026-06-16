const supabase = require('../config/supabase');
const obtenerProyectos = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('proyectos')
            .select(`*,
                articulaciones (
                id,descripcion
                )`)
            .order('id');
        if (error) {
            return res.status(400).json({ error: 'Error al obtener proyectos' });
        }
        res.json(data);
    }   catch (error) { 
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
};
const crearProyecto = async (req, res) => {
    try{
        const { articulacion_id,nombre,descripcion,gestion,estado } = req.body;
        const { data, error } = await supabase
            .from('proyectos')
            .insert([{ articulacion_id,nombre,descripcion,gestion,estado }])
            .select();
        if (error) {
            return res.status(400).json({ error: 'Error al crear proyecto' });
        }
        res.status(201).json(data);
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        res.status(500).json({ error: 'Error al crear proyecto' });
    }
};

module.exports = {
    obtenerProyectos,
    crearProyecto
};

