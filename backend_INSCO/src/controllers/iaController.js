const genAI = require('../config/gemini');

const generarCompetencia = async (req,res)=>{

    try{

        const {
            carrera,
            asignatura,
            anio
        } = req.body;

        const model =
        genAI.getGenerativeModel({
            model:'gemini-2.5-flash'
        });

        const prompt = `
Actúa como experto en educación técnica tecnológica de Bolivia.

Genera una competencia profesional para:

Carrera: ${carrera}
Asignatura: ${asignatura}
Año: ${anio}

La competencia debe:

- Integrar conocimientos técnicos tecnológicos.
- Integrar saberes comunitarios.
- Tener enfoque productivo.
- Tener enfoque descolonizador.
- Promover la resolución de problemas reales.
- Utilizar un verbo de desempeño al inicio.
- Tener entre 50 y 80 palabras.

Devuelve únicamente la competencia.
`;

        const result =
        await model.generateContent(prompt);

        const texto =
        result.response.text();

        res.json({
            competencia:texto
        });

    }catch(error){

    console.error("ERROR COMPLETO:");
    console.error(error);

    res.status(500).json({
        mensaje:'Error al generar competencia',
        detalle:error.message
    });

}

};

module.exports = {
    generarCompetencia
};