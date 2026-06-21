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

const generarArticulacion = async (req,res)=>{

    try{

        const {
            contenido,
            saber
        } = req.body;

        const prompt = `
Actúa como especialista en educación técnica tecnológica y descolonización curricular.

Contenido Curricular:
${contenido}

Saber Comunitario:
${saber}

Genera:

1. Nivel de articulación (Alto, Medio o Bajo)
2. Observación pedagógica
3. Evidencia verificable
4. Propuesta de proyecto integrador

Devuelve únicamente JSON válido.

{
    "nivel":"",
    "observacion":"",
    "evidencia":"",
    "propuesta_proyecto":""
}
`;

        const result =
        await model.generateContent(prompt);

        const texto =
        result.response.text();

        const limpio =
        texto
        .replace(/```json/g,'')
        .replace(/```/g,'');

        const respuesta =
        JSON.parse(limpio);

        res.json(respuesta);

    }catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:'Error al generar articulación',
            error:error.message
        });

    }

};

const generarIdeasSaberes = async (req,res)=>{

    try{

        const {
            area_productiva,
            comunidad
        } = req.body;

        const prompt = `
Actúa como especialista boliviano en:

- Educación Técnica Tecnológica
- Descolonización curricular
- Saberes y conocimientos de pueblos indígena originario campesinos
- Modelo Educativo Sociocomunitario Productivo

Genera 10 posibles saberes comunitarios que puedan articularse con la carrera de Sistemas Informáticos.

Área Productiva:
${area_productiva}

Comunidad:
${comunidad || 'Bolivia'}

Los saberes deben relacionarse con:

- Tecnología
- Informática
- Bases de datos
- Desarrollo web
- Redes
- Digitalización
- Automatización
- Gestión de información

Pero vinculados al contexto comunitario boliviano.

Devuelve únicamente JSON válido:

[
    {
        "titulo":"",
        "descripcion":""
    }
]
`;

        const result =
        await model.generateContent(prompt);

        let texto =
        result.response.text();

        texto = texto
            .replace(/```json/g,'')
            .replace(/```/g,'');

        const ideas =
        JSON.parse(texto);

        res.json(ideas);

    }catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:'Error al generar ideas de saberes',
            error:error.message
        });

    }

};

const generarIdeasProyecto = async (req, res) => {

try {

    const {
        contenido,
        saber,
        observacion,
        nivel,
        propuesta
    } = req.body;

    const prompt = `


Actúa como experto en proyectos sociocomunitarios productivos y desarrollo de sistemas informáticos.

Basándote en:

Contenido: ${contenido}

Saber comunitario: ${saber}

Observación: ${observacion}

Nivel de articulación: ${nivel}

Propuesta inicial: ${propuesta}

Genera EXACTAMENTE 5 ideas de proyectos.

Devuelve únicamente un JSON válido con este formato:

[
{
"titulo":"...",
"descripcion":"..."
}
]

No agregues explicaciones.
No uses markdown.
No uses caracteres antes o después del JSON.

`;

    const result =
    await model.generateContent(prompt);

    const texto =
    result.response.text();

    const jsonLimpio =
    texto
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const ideas =
    JSON.parse(jsonLimpio);

    res.json(ideas);

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje:
        "Error al generar ideas de proyecto"
    });

}


};


module.exports = {
    generarCompetencia,
    generarContenidos,
    generarArticulacion,
    generarIdeasSaberes,
    generarIdeasProyecto
};