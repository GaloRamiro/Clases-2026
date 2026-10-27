const IMG = "/images/seo/semana13/";

const semana13 = {
  id: "seo-semana-13",
  courseId: "seo",
  number: 13,
  title: "AEO: optimización de contenidos para motores de respuesta",
  subtitle: "Preguntas, respuestas verificables, FAQ y datos estructurados",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Analizar los principios de Answer Engine Optimization (AEO) y desarrollar contenidos claros, verificables y estructurados que respondan a las necesidades informativas de los usuarios y faciliten su interpretación por buscadores y sistemas de respuesta.",

  challenge:
    "¿Cómo puede una empresa responder las preguntas de sus clientes incluso antes de que visiten su sitio web?",

  project: {
    name: "Expediente SEO + SEM + AEO + GEO",
    description:
      "Continuación del proyecto empresarial investigado desde la Semana 1.",
    product:
      "Auditoría externa de respuestas, banco de preguntas, cinco respuestas optimizadas, sección FAQ y propuesta JSON-LD.",
    restriction:
      "No modificar el sitio web de la empresa real ni publicar contenido como si fuera oficial.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: respuestas antes del clic",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "AEO, preguntas, respuestas y datos estructurados",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: auditoría de respuestas",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: producción de contenido AEO",
      minutes: 35,
    },
    {
      time: "100–120",
      title: "Presentaciones, evaluación y cierre",
      minutes: 20,
    },
  ],

  tools: [
    {
      name: "Google Search",
      url: "https://www.google.com/",
      purpose:
        "Investigar preguntas y observar formatos públicos de respuesta.",
    },
    {
      name: "Schema.org — FAQPage",
      url: "https://schema.org/FAQPage",
      purpose: "Consultar la estructura semántica de preguntas frecuentes.",
    },
    {
      name: "Google Search Central",
      url: "https://developers.google.com/search/docs/appearance/structured-data/faqpage",
      purpose:
        "Revisar las reglas y limitaciones de los resultados enriquecidos FAQ.",
    },
    {
      name: "Google Docs",
      url: "https://docs.google.com/",
      purpose: "Redactar y organizar la propuesta editorial AEO.",
    },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Auditoría externa de contenidos AEO",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Recuperar las quince preguntas investigadas en la tarea de la Semana 12.",
        "Seleccionar cinco preguntas prioritarias.",
        "Buscar cada pregunta en Google.",
        "Identificar formatos de respuesta observados.",
        "Revisar si la web pública de la empresa responde la pregunta.",
        "Evaluar claridad, profundidad, actualización y respaldo.",
        "Registrar URL y evidencia de cada hallazgo.",
        "Identificar oportunidades de mejora.",
        "Elaborar una matriz de auditoría.",
        "Presentar una conclusión estratégica.",
      ],
      deliverable:
        "Matriz de cinco preguntas con evidencias, diagnóstico y recomendaciones.",
    },
    {
      title: "Laboratorio 2: Producción de contenidos optimizados para AEO",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Utilizar las cinco preguntas del primer laboratorio.",
        "Investigar fuentes confiables.",
        "Redactar cinco respuestas originales y directas.",
        "Añadir explicaciones complementarias cuando sea necesario.",
        "Organizar una sección FAQ mediante encabezados.",
        "Incorporar referencias verificables.",
        "Elaborar un ejemplo de JSON-LD FAQPage.",
        "Verificar la coherencia entre las respuestas y el JSON-LD.",
        "Revisar claridad, precisión y ortografía.",
        "Documentar recomendaciones para una futura implementación.",
      ],
      deliverable:
        "Documento con cinco respuestas, sección FAQ, fuentes y propuesta JSON-LD.",
    },
  ],

  homework: {
    title:
      "Tarea 13: Investigación GEO y preparación de una web académica de práctica",
    modality: "Grupal",
    deadline: "Antes de la Semana 14",
    delivery: "T13_APELLIDO_NOMBRE.pdf",
    parts: [
      {
        title: "Parte A: Investigación GEO",
        instructions: [
          "Definir cinco preguntas relacionadas con el sector de la empresa.",
          "Consultar uno o dos asistentes de IA gratuitos.",
          "Registrar si aparece mencionada la empresa.",
          "Identificar las fuentes o enlaces proporcionados.",
          "Verificar las afirmaciones importantes en fuentes públicas.",
          "Comparar respuestas y documentar limitaciones.",
        ],
      },
      {
        title: "Parte B: Preparación de la web académica",
        instructions: [
          "Elegir un nombre ficticio para el proyecto académico.",
          "Seleccionar un producto o servicio de ejemplo.",
          "Redactar un título principal y una descripción.",
          "Definir tres beneficios.",
          "Redactar tres preguntas frecuentes.",
          "Seleccionar un CTA.",
          "Organizar el contenido en un esquema de página única.",
        ],
      },
    ],
    note: "La web de práctica será independiente de la empresa real y se identificará como demostración académica.",
  },

  rubric: [
    {
      criterion: "Investigación y selección de preguntas",
      points: 20,
    },
    {
      criterion: "Auditoría externa y evidencias",
      points: 20,
    },
    {
      criterion: "Calidad y precisión de las respuestas",
      points: 25,
    },
    {
      criterion: "Organización semántica y sección FAQ",
      points: 20,
    },
    {
      criterion: "Propuesta JSON-LD y recomendaciones",
      points: 15,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 13",
      title: "AEO: optimización para motores de respuesta",
      subtitle:
        "Cómo transformar preguntas reales en contenido claro y verificable",
      body: "Auditoría externa, cinco respuestas, sección FAQ y datos estructurados.",
      image: `${IMG}portada-aeo.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "¿Y si Google responde antes de que visiten tu web?",
      accent: "LA RESPUESTA TAMBIÉN IMPORTA",
      body: "Busca dos preguntas sobre el sector de tu empresa. Compara los resultados y observa si aparecen respuestas directas, fragmentos destacados, preguntas relacionadas o respuestas generadas por IA.",
      question:
        "¿Qué información recibe el usuario sin entrar en un sitio web?",
      image: `${IMG}desafio-respuestas.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTO · 4 MIN",
      title: "¿Qué es AEO y cómo se relaciona con SEO?",
      accent: "SEO + AEO + GEO",
      body: "SEO trabaja la visibilidad en buscadores. AEO se enfoca en responder claramente preguntas. GEO estudia cómo facilitar que los sistemas generativos encuentren e interpreten información fiable sobre una marca.",
      question:
        "¿En qué cambia la intención entre 'café especialidad' y 'cómo elegir café de especialidad'?",
      note: "AEO y GEO son enfoques de optimización; no garantizan apariciones ni menciones.",
      image: `${IMG}seo-aeo-geo.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "ANÁLISIS · 5 MIN",
      title: "¿Dónde aparecen las respuestas?",
      subtitle: "No todas las búsquedas presentan los mismos formatos.",
      columns: ["Formato", "Qué observar", "Evidencia"],
      rows: [
        [
          "Fragmento destacado",
          "Respuesta extraída de una página",
          "URL y captura",
        ],
        [
          "Preguntas relacionadas",
          "Preguntas y respuestas adicionales",
          "Consulta y captura",
        ],
        [
          "Resultado enriquecido",
          "Presentación especial de datos",
          "Tipo y URL",
        ],
        [
          "Respuesta generada por IA",
          "Síntesis y posibles fuentes",
          "Captura y enlaces visibles",
        ],
      ],
      note: "Los formatos dependen de la consulta, región, dispositivo y disponibilidad.",
      image: `${IMG}formatos-respuesta.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "DEMOSTRACIÓN · 11 MIN",
      title: "Cómo redactar respuestas útiles y verificables",
      subtitle: "Respuesta directa, contexto, fuentes y estructura.",
      columns: ["Elemento", "Función", "Ejemplo"],
      rows: [
        [
          "Respuesta directa",
          "Resolver la pregunta",
          "Explicación inicial clara",
        ],
        ["Contexto", "Ampliar información", "Criterios y ejemplos"],
        ["Evidencia", "Respaldar afirmaciones", "Fuentes comprobables"],
        ["Encabezados", "Organizar el contenido", "H2 y H3"],
        ["FAQ / JSON-LD", "Representar preguntas", "Schema.org FAQPage"],
      ],
      question:
        "¿Cómo transformarías un párrafo promocional en una respuesta informativa?",
      note: "Los datos estructurados deben coincidir con el contenido visible. FAQPage no garantiza resultados enriquecidos.",
      image: `${IMG}estructura-respuesta.webp`,
    },
    {
      id: 6,
      kind: "seo-aeo-audit",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Audita las respuestas de tu empresa",
      subtitle:
        "Cinco preguntas, formatos de respuesta, evidencias y oportunidades",
      instructions:
        "Recupera las preguntas de la Semana 12, investiga cinco consultas y evalúa si el sitio público de la empresa ofrece respuestas verificables.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Prepara las fuentes que utilizarás para redactar.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 7 MIN",
      title: "Selecciona cinco preguntas prioritarias",
      accent: "RELEVANCIA + INTENCIÓN + EVIDENCIA",
      body: "Prioriza preguntas importantes para el usuario que puedan responderse con información verificable. Evita inventar precios, garantías, servicios o políticas.",
      question: "¿Qué preguntas puedes responder con evidencia suficiente?",
      image: `${IMG}priorizar-preguntas.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE B · 15 MIN",
      title: "Redacta cinco respuestas optimizadas",
      accent: "RESPONDE PRIMERO, EXPLICA DESPUÉS",
      body: "Escribe una respuesta inicial directa, aproximadamente de 40 a 60 palabras cuando sea apropiado. Añade contexto, fuentes y aclaraciones necesarias.",
      question: "¿La respuesta informa realmente o solamente promociona?",
      image: `${IMG}redaccion-aeo.webp`,
    },
    {
      id: 10,
      kind: "seo-aeo-content",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Construye tu contenido AEO y su JSON-LD",
      subtitle:
        "Cinco respuestas, checklist editorial, FAQ y propuesta técnica",
      instructions:
        "Redacta cinco respuestas verificables, revisa su claridad, genera la sección FAQ y construye un ejemplo JSON-LD coherente con el contenido.",
    },
    {
      id: 11,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "Defiende tu contenido ante el cliente",
      body: "Presenta dos preguntas prioritarias, explica cómo verificaste las respuestas y propone una mejora para el sitio de la empresa.",
      question: "¿Qué evidencia demuestra que tu respuesta es fiable?",
      image: `${IMG}defensa-aeo.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "De AEO a GEO: ¿cómo representa la IA a una marca?",
      body: "Investiga cinco preguntas en asistentes de IA, registra menciones y fuentes, y prepara el contenido de una web académica independiente.",
      note: "Entrega T13_APELLIDO_NOMBRE.pdf antes de la Semana 14.",
      next: "SEMANA 14 · GEO, entidades, menciones y publicación de la web de práctica.",
      image: `${IMG}introduccion-geo.webp`,
    },
  ],
};

export default semana13;
