const { GoogleGenerativeAI } =
require('@google/generative-ai');

const genAI =
new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model =
genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const generarCompetencia = async (req,res)=>{

    try{

        const {
            carrera,
            asignatura,
            anio
        } = req.body;


        const prompt = `
Actúa como experto en educación técnica tecnológica de Bolivia.

Genera una competencia profesional para:

Carrera: ${carrera}
Asignatura: ${asignatura}
Año: ${anio}

La competencia debe:

- Integrar conocimientos técnicos tecnológicos.
- Promover la resolución de problemas reales.
- Utilizar un verbo de desempeño al inicio.
- Tener entre 50 y 80 palabras.

Devuelve únicamente un JSON válido con este formato:

{
  "nombre":"Título corto de la competencia",
  "descripcion":"Competencia completa"
}`;

        const result = await model.generateContent(prompt);

const texto = result.response.text();

const json = JSON.parse(
    texto
    .replace('```json','')
    .replace('```','')
);

res.json(json);

    }catch(error){

    console.error("ERROR COMPLETO:");
    console.error(error);

    res.status(500).json({
        mensaje:'Error al generar competencia',
        detalle:error.message
    });

}

};

const generarContenidos = async (req,res)=>{

    try{

        const { competencia,cantidad } = req.body;

        const prompt = `
Actúa como experto curricular de la Educación Técnica Tecnológica de Bolivia.

Genera ${cantidad} contenidos curriculares relacionados con la siguiente competencia.
Competencia:

${competencia}

IMPORTANTE:
- Deben ser exactamente ${cantidad}.
- No generes más ni menos.

Devuelve únicamente un JSON válido segun la estructura:

{
  "contenidos":[
    {
      "nombre":"Contenido 1",
      "descripcion":"Descripción breve"
    }
  ]
}
`;

        const result =
        await model.generateContent(prompt);

        const texto =
        result.response.text();

        const json =
        JSON.parse(
            texto
            .replace('```json','')
            .replace('```','')
        );

        res.json(json);
        console.log(cantidad)

    }catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:'Error al generar contenidos'
        });

    }

};

module.exports = {
    generarCompetencia,
    generarContenidos
};