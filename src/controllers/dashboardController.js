const supabase = require('../config/supabase');

const obtenerIndicadores = async (req, res) => {
    try {
        const { count:totalContenidos } = await supabase
            .from('contenidos')
            .select('*', { count: 'exact', head: true });
        const { count:totalSaberes } = await supabase
            .from('saberes')
            .select('*', { count: 'exact', head: true });
        const { count:totalArticulaciones } = await supabase
            .from('articulaciones')
            .select('*', { count: 'exact', head: true });

        const {count:totalProyectos} = await supabase
            .from('proyectos')
            .select('*', { count: 'exact', head: true });

        const { count:proyectoFinalizados } = await supabase
            .from('proyectos')
            .select('*', { count: 'exact', head: true })
            .eq('estado', 'finalizado');

        const porcentajeArticulaciones = totalContenidos > 0 ? ((totalArticulaciones / totalContenidos) * 100).toFixed(2) : '0.00';
        let nivel = '';
        

        if (porcentajeArticulaciones < 30) {
            nivel = 'Bajo';
        }
        else if (porcentajeArticulaciones < 70) {
            nivel = 'Medio';
        }
        else {
            nivel = 'Alto';
        }

        res.json({ totalContenidos, totalSaberes, totalArticulaciones, porcentajeArticulaciones, nivel });
    } catch (error) {
        console.error('Error al obtener indicadores:', error);
        res.status(500).json({ error: 'Error al obtener indicadores' });
    }
};

module.exports = {
    obtenerIndicadores
};