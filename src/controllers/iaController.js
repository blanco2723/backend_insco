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

const generarIA = async (genAI, prompt) => {

    const modelos = [
        "gemini-2.5-flash",
        "gemini-1.5-flash",
        "gemini-1.5-pro"
    ];

    let lastError;

    for (const m of modelos) {

        try {

            const model = genAI.getGenerativeModel({ model: m });

            const result = await model.generateContent(prompt);

            return result;

        } catch (error) {

            console.log(`Falló modelo ${m}, probando siguiente...`);

            lastError = error;

        }
    }

    throw lastError;
};


const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const generarConReintento = async (model, prompt, maxIntentos = 6) => {

    for (let i = 0; i < maxIntentos; i++) {

        try {
            return await model.generateContent(prompt);
        } catch (error) {

            const status = error?.status;

            if (status === 503) {

                // backoff exponencial: 2s, 4s, 8s, 16s...
                const espera = Math.pow(2, i) * 1000;

                console.log(`IA saturada. Reintento ${i + 1} en ${espera}ms`);

                await sleep(espera);

                continue;
            }

            throw error;
        }
    }

    throw new Error("IA no disponible después de múltiples reintentos");
};

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


const generarDiagnosticoProyecto = async (req,res)=>{

try{

    const {
        proyecto,
        contenido,
        saber,
        comunidad,
        observacion,
        area_productiva,
        nivel
    } = req.body;

    const prompt = `

Actúa como experto en proyectos sociocomunitarios productivos de Bolivia.

Genera un diagnóstico educativo y comunitario para un proyecto.

Datos:

Proyecto:
${proyecto}

Contenido curricular:
${contenido}

Saber comunitario:
${saber}

Comunidad:
${comunidad}

Área productiva:
${area_productiva}

Observación:
${observacion}

Nivel de articulación:
${nivel}
El diagnóstico debe considerar las necesidades,
características y contexto de la comunidad indicada,
relacionando el contenido curricular con los saberes
locales y el desarrollo sociocomunitario productivo.
El diagnóstico debe:

* Tener entre 2 y 4 párrafos.
* Identificar una necesidad o problema.
* Relacionar el contenido curricular con el saber comunitario.
* Estar redactado formalmente.
* Ser apto para un proyecto educativo.

Devuelve únicamente el texto.

`;


    const result =
    await model.generateContent(
        prompt
    );

    const texto =
    result.response.text();

    res.json({
        diagnostico:texto
    });

}catch(error){

    console.log(error);

    res.status(500).json({
        mensaje:
        'Error al generar diagnóstico'
    });

}


};

const generarJustificacionProyecto = async (req,res)=>{


try{

    const {
        proyecto,
        contenido,
        saber,
        comunidad,
        area_productiva,
        observacion,
        nivel
    } = req.body;

    const prompt = `


Actúa como especialista en proyectos sociocomunitarios productivos de Bolivia.

Genera la JUSTIFICACIÓN de un proyecto.

Datos:

Proyecto:
${proyecto}

Contenido curricular:
${contenido}

Saber comunitario:
${saber}

Comunidad:
${comunidad}

Área productiva:
${area_productiva}

Observación:
${observacion}

Nivel de articulación:
${nivel}

La justificación debe:

* Explicar la importancia del proyecto.
* Explicar el beneficio para la comunidad.
* Explicar el beneficio educativo.
* Relacionar el contenido curricular con el saber comunitario.
* Tener entre 3 y 5 párrafos.
* Redacción formal académica.

Devuelve únicamente la justificación. sin titulo solo el texto. 

`;


    const result =
    await model.generateContent(
        prompt
    );

    const texto =
    result.response.text();

    res.json({
        justificacion:texto
    });

}catch(error){

    console.log(error);

    res.status(500).json({
        mensaje:
        'Error al generar justificación'
    });

}


};

const generarObjetivoGeneralProyecto = async (req,res)=>{

try{

    const {
        proyecto,
        contenido,
        saber,
        comunidad,
        area_productiva,
        observacion,
        nivel
    } = req.body;

    const prompt = `

Actúa como especialista en proyectos sociocomunitarios productivos de Bolivia.

Genera UN SOLO objetivo general.

Datos:

Proyecto:
${proyecto}

Contenido curricular:
${contenido}

Saber comunitario:
${saber}

Comunidad:
${comunidad}

Área productiva:
${area_productiva}

Observación:
${observacion}

Nivel de articulación:
${nivel}

Instrucciones:

* Debe iniciar con un verbo en infinitivo.
* Debe ser claro y concreto.
* Debe relacionar el contenido curricular con el saber comunitario.
* Debe enfocarse en la solución del problema identificado.
* Debe redactarse en un solo párrafo.
* No usar numeraciones ni viñetas.
* No explicar el objetivo.

Ejemplos de verbos:

Desarrollar
Implementar
Diseñar
Fortalecer
Promover
Optimizar
Consolidar
Mejorar

Devuelve únicamente el objetivo general.

`;

    const result =
    await model.generateContent(
        prompt
    );

    const texto =
    result.response.text();

    res.json({
        objetivo:texto
    });

}catch(error){

    console.log(error);

    res.status(500).json({
        mensaje:
        'Error al generar objetivo general'
    });

}


};

const generarObjetivosEspecificosProyecto = async (req,res)=>{

try{

    const {
        proyecto,
        contenido,
        saber,
        comunidad,
        area_productiva,
        observacion,
        nivel
    } = req.body;

    const prompt = `
Actúa como especialista en proyectos sociocomunitarios productivos de Bolivia.

Genera exactamente 4 objetivos específicos.

Proyecto:
${proyecto}

Contenido curricular:
${contenido}

Saber comunitario:
${saber}

Comunidad:
${comunidad}

Área productiva:
${area_productiva}

Observación:
${observacion}

Nivel:
${nivel}

Reglas:
- Iniciar con verbo en infinitivo.
- Ser claros y medibles.

Genera entre 3 y 5 objetivos específicos.

Devuelve únicamente texto.

Formato:

1. Objetivo específico...

2. Objetivo específico...

3. Objetivo específico...
`;

    const result =
await model.generateContent(
    prompt
);

const texto =
result.response
.text()
.trim();

res.json({
    objetivos: texto
});

}catch(error){

    console.log(error);

    res.status(500).json({
        mensaje:'Error al generar objetivos específicos'
    });

}

};
const generarActividadesProyecto = async (req,res)=>{

try{

    const {
        proyecto,
        contenido,
        saber,
        comunidad,
        area_productiva,
        observacion,
        nivel,
        objetivos_especificos
    } = req.body;

    const prompt = `
Actúa como especialista en proyectos sociocomunitarios productivos de Bolivia.

Proyecto:
${proyecto}

Contenido curricular:
${contenido}

Saber comunitario:
${saber}

Comunidad:
${comunidad}

Área productiva:
${area_productiva}

Observación:
${observacion}

Nivel:
${nivel}

Objetivos específicos:
${objetivos_especificos}

Genera actividades concretas para cada objetivo específico.

Reglas:

- Mínimo 2 actividades por objetivo.
- Máximo 4 actividades por objetivo.
- Actividades realizables.
- Relacionadas con Sistemas Informáticos.
- Considerar la comunidad y el saber comunitario.

Devuelve únicamente texto.

Ejemplo:

OBJETIVO 1

- Actividad 1
- Actividad 2

OBJETIVO 2

- Actividad 1
- Actividad 2

OBJETIVO 3

- Actividad 1
- Actividad 2

`;

    const result =
    await model.generateContent(
        prompt
    );

    const texto =
    result.response
    .text()
    .trim();

    res.json({
        actividades:texto
    });

}catch(error){

    console.log(error);

    res.status(500).json({
        mensaje:
        'Error al generar actividades'
    });

}

};

const generarRecursosProyecto = async (req, res) => {

try {

    const {
        proyecto,
        actividades
    } = req.body;

    const prompt = `
Actúa como especialista en proyectos educativos sociocomunitarios productivos de Bolivia.

Proyecto:
${proyecto}

Actividades:
${actividades}

Genera los recursos necesarios para ejecutar el proyecto.

Clasifica en:

- Humanos
- Materiales
- Tecnológicos

Reglas:

- No uses JSON.
- Devuelve únicamente texto plano.
- Usa estructura clara por categorías.
- Lista con guiones.

Formato esperado:

RECURSOS HUMANOS
- Docente
- Estudiantes

RECURSOS MATERIALES
- Papelógrafos
- Marcadores

RECURSOS TECNOLÓGICOS
- Computadora
- Proyector
`;

    const result = await model.generateContent(prompt);

    const texto = result.response.text().trim();

    res.json({
        recursos: texto
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error al generar recursos'
    });

}

};

const generarCronogramaProyecto = async (req, res) => {

try {

    const {
        proyecto,
        actividades,
        fecha_inicio,
        fecha_fin
    } = req.body;

    const prompt = `
Actúa como especialista en planificación de proyectos educativos sociocomunitarios productivos en Bolivia.

Proyecto:
${proyecto}

Actividades:
${actividades}

Rango de fechas:
Inicio: ${fecha_inicio}
Fin: ${fecha_fin}

Tarea:
Organiza las actividades en un cronograma realista dentro del rango de fechas.

IMPORTANTE:
- Usa exclusivamente formato de fecha dd/mm/aaaa.
- No uses formato ISO ni textos como "enero de 2026".
- Todas las fechas deben respetar dd/mm/aaaa.

Reglas:

- Distribuye actividades en el tiempo.
- Considera semanas o fechas específicas.
- Mantén coherencia pedagógica.
- No uses JSON.
- Devuelve solo texto.

Formato obligatorio:

CRONOGRAMA DEL PROYECTO

Semana 1 (fecha - fecha)
- Actividad 1
- Actividad 2

Semana 2 (fecha - fecha)
- Actividad 3
- Actividad 4
`;

    const result = await generarConReintento(model, prompt);

    const texto = result.response.text().trim();

    res.json({
        cronograma: texto
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error al generar cronograma'
    });

}

};

const generarResultadosProyecto = async (req, res) => {

try {

    const {
        proyecto,
        actividades,
        cronograma
    } = req.body;

    const prompt = `
Actúa como especialista en proyectos sociocomunitarios productivos en Bolivia.

Proyecto:
${proyecto}

Actividades:
${actividades}

Cronograma:
${cronograma}

Genera los posibles resultados esperados del proyecto.

Reglas:

- Redacta resultados concretos y medibles.
- Relacionados con el impacto educativo y comunitario.
- No uses JSON.
- Devuelve solo texto.

Formato:

- Resultado 1
- Resultado 2
- Resultado 3
`;

    const result = await model.generateContent(prompt);

    const texto = result.response.text().trim();

    res.json({
        resultados: texto
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error al generar resultados'
    });

}

};

const generarConclusionesProyecto = async (req, res) => {

try {

    const {
        proyecto,
        objetivos_especificos,
        resultados
    } = req.body;

    const prompt = `
Actúa como especialista en evaluación de proyectos educativos sociocomunitarios productivos en Bolivia.

Proyecto:
${proyecto}

Objetivos específicos:
${objetivos_especificos}

Resultados esperados:
${resultados}

Genera conclusiones del proyecto.

Reglas:

- Deben reflejar logro de objetivos.
- Deben ser coherentes con resultados.
- No uses JSON.
- Devuelve solo texto.

Formato:

- Conclusión 1
- Conclusión 2
- Conclusión 3
`;

    const result = await model.generateContent(prompt);

    const texto = result.response.text().trim();

    res.json({
        conclusiones: texto
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje: 'Error al generar conclusiones'
    });

}

};


const generarProyectoCompleto = async (req, res) => {

try {

    const {
        proyecto,
        contenido,
        saber,
        comunidad,
        area_productiva,
        observacion,
        enfoque,
        fecha_inicio,
        fecha_fin
    } = req.body;

    const prompt = `
Actúa como especialista en proyectos sociocomunitarios productivos de Bolivia.

DATOS DEL PROYECTO

Nombre del proyecto:
${proyecto.nombre}

Descripción del proyecto:
${proyecto.descripcion}

Contenido curricular:
${contenido}

Saber comunitario:
${saber}

Comunidad:
${comunidad}

Área productiva:
${area_productiva}

Observación:
${observacion}

Enfoque:
${enfoque}

Fecha de inicio:
${fecha_inicio}

Fecha de finalización:
${fecha_fin}

Genera:

1. Diagnóstico
2. Justificación
3. Objetivo General
4. Objetivos Específicos
5. Actividades
6. Recursos
7. Cronograma
8. Resultados
9. Conclusiones

REGLAS IMPORTANTES:

- No uses markdown.
- No uses **.
- No uses tablas.
- Actividades únicamente en listas con guiones.
- Cronograma en texto plano.
- Recursos clasificados en Humanos, Materiales y Tecnológicos.
- Utiliza fechas en formato dd/mm/aaaa.
- Devuelve únicamente JSON válido.
- No agregues texto antes ni después del JSON.

Formato obligatorio:

{
  "diagnostico":"",
  "justificacion":"",
  "objetivo_general":"",
  "objetivos_especificos":"",
  "actividades":"",
  "recursos":"",
  "cronograma":"",
  "resultados":"",
  "conclusiones":""
}
`;

    const result =
    await model.generateContent(prompt);

    let texto =
    result.response.text();

    texto = texto
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    const proyectoGenerado =
    JSON.parse(texto);

    res.json(proyectoGenerado);

} catch (error) {

    console.log(error);

    res.status(500).json({
        mensaje:
        'Error al generar proyecto completo'
    });

}

};

module.exports = {
    generarCompetencia,
    generarContenidos,
    generarArticulacion,
    generarIdeasSaberes,
    generarIdeasProyecto,

    generarDiagnosticoProyecto,
    generarJustificacionProyecto,
    generarObjetivoGeneralProyecto,
    generarObjetivosEspecificosProyecto,
    generarActividadesProyecto,
    generarRecursosProyecto,
    generarCronogramaProyecto,
    generarResultadosProyecto,
    generarConclusionesProyecto,
    generarProyectoCompleto
    
};