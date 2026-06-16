const supabase = require('../config/supabase');

const obtenerArticulaciones = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('articulaciones')
            .select(`*,contenidos(id,nombre),
                saberes(id,titulo)`).order('id', { ascending: true })
        if (error) {
            console.error('Error al obtener articulaciones:', error);
            return res.status(400).json({ error: 'Error al obtener articulaciones' });
        }
        res.json(data);
    } catch (error) {
        console.error('Error al obtener articulaciones:', error);
        res.status(500).json({ error: 'Error al obtener articulaciones' });
    }
};

const crearArticulacion = async (req, res) => {
try {
    const { contenido_id, saber_id, observacion,nivel } = req.body;
    const { data, error } = await supabase
        .from('articulaciones')
        .insert([{ contenido_id, saber_id, observacion,nivel }])
        .select();

    if (error) {
        console.error('Error al crear articulación:', error);
        return res.status(400).json({ error: 'Error al crear articulación' });
    }

    res.status(201).json(data[0]);
} catch (error) {
    console.error('Error al crear articulación:', error);
    res.status(500).json({ error: 'Error al crear articulación' });
}
};

module.exports = {
    obtenerArticulaciones,
    crearArticulacion
};  