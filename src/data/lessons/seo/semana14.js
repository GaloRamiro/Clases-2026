const IMG = "/images/seo/semana14/";

const semana14 = {
  id: "seo-semana-14",
  courseId: "seo",
  number: 14,
  title: "GEO y publicación de una web académica",
  subtitle: "Entidades, fuentes, menciones y primera publicación web",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Evaluar la presencia de una empresa en respuestas generadas por IA, formular recomendaciones GEO fundamentadas y publicar una web académica independiente para practicar analítica web.",

  challenge:
    "¿La inteligencia artificial describe correctamente a tu empresa y qué necesitamos para medir una web propia?",

  project: {
    name: "Expediente SEO + SEM + AEO + GEO",
    description:
      "Se mantiene la empresa real investigada desde la Semana 1 y se incorpora una web ficticia controlada por el equipo.",
    deliverable:
      "Auditoría GEO, ficha de entidad, tres recomendaciones y URL pública de la web académica.",
    restriction:
      "No modificar la web empresarial. No presentar la web académica como sitio oficial de la empresa.",
  },

  schedule: [
    { time: "00–10", title: "Desafío: ¿qué dice la IA?", minutes: 10 },
    { time: "10–30", title: "GEO y demostración de publicación", minutes: 20 },
    { time: "30–55", title: "Laboratorio 1: auditoría GEO", minutes: 25 },
    { time: "55–65", title: "Receso", minutes: 10 },
    {
      time: "65–100",
      title: "Laboratorio 2: creación y publicación web",
      minutes: 35,
    },
    { time: "100–120", title: "Verificación, defensa y cierre", minutes: 20 },
  ],

  tools: [
    {
      name: "ChatGPT",
      url: "https://chatgpt.com/",
      purpose: "Investigar respuestas generativas y menciones de marca.",
    },
    {
      name: "Gemini",
      url: "https://gemini.google.com/",
      purpose: "Comparar respuestas de otro asistente de IA.",
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      purpose: "Guardar el código de la web académica.",
    },
    {
      name: "GitHub Pages",
      url: "https://pages.github.com/",
      purpose: "Publicar gratuitamente la página estática.",
    },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Auditoría GEO de una empresa real",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Recuperar cinco preguntas GEO de la Semana 13.",
        "Consultar las preguntas en uno o dos asistentes de IA.",
        "Registrar herramienta, fecha, consulta y respuesta relevante.",
        "Comprobar si aparece mencionada la empresa.",
        "Registrar las fuentes citadas, cuando existan.",
        "Verificar afirmaciones sobre productos, servicios y ubicación.",
        "Crear una ficha de entidad con cinco atributos comprobados.",
        "Proponer tres recomendaciones GEO justificadas.",
        "Guardar capturas y enlaces de evidencia.",
      ],
      deliverable:
        "Matriz de cinco consultas, ficha de entidad y tres recomendaciones.",
    },
    {
      title: "Laboratorio 2: Creación y publicación de una web académica",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Descargar la plantilla index.html desde la diapositiva 8.",
        "Personalizar el nombre ficticio, la propuesta de valor y los beneficios.",
        "Personalizar tres preguntas frecuentes y sus respuestas.",
        "Guardar el archivo index.html.",
        "Seguir la guía de GitHub Pages de la diapositiva 9.",
        "Crear un repositorio público y subir index.html.",
        "Activar GitHub Pages.",
        "Abrir la URL pública y revisar el funcionamiento.",
        "Registrar la URL y el checklist en la diapositiva 10.",
        "Descargar el informe PDF.",
      ],
      deliverable:
        "Web académica publicada, URL pública y ficha de verificación.",
    },
  ],

  homework: {
    title: "Tarea 14: Preparación de medición con GA4 y GTM",
    modality: "Grupal",
    deadline: "Antes de la Semana 15",
    delivery: "T14_APELLIDO_NOMBRE.pdf",
    instructions: [
      "Abrir la web académica publicada.",
      "Registrar su URL pública.",
      "Identificar las secciones principales.",
      "Seleccionar tres interacciones que sería útil medir.",
      "Definir el nombre propuesto de cada evento.",
      "Explicar qué representa cada interacción.",
      "Seleccionar un evento candidato a evento clave.",
      "Investigar las funciones de Google Analytics 4.",
      "Investigar las funciones de Google Tag Manager.",
      "Elaborar una tabla de medición.",
    ],
    examples: ["click_cta_principal", "click_cta_secundario", "view_faq"],
  },

  rubric: [
    { criterion: "Investigación y auditoría GEO", points: 20 },
    { criterion: "Verificación de fuentes y ficha de entidad", points: 15 },
    { criterion: "Recomendaciones GEO justificadas", points: 15 },
    { criterion: "Personalización y estructura de la web", points: 20 },
    { criterion: "Publicación funcional y pruebas técnicas", points: 20 },
    { criterion: "Evidencias y presentación", points: 10 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 14",
      title: "GEO y publicación de una web académica",
      subtitle: "De la presencia en IA a una web propia para medir",
      body: "Investigaremos cómo se representa una empresa en sistemas generativos y publicaremos una web de demostración.",
      image: `${IMG}portada-geo.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "¿Qué dice la IA sobre tu empresa?",
      accent: "NO TODA RESPUESTA ES CORRECTA",
      body: "Consulta cómo describe un asistente de IA a tu empresa. Identifica dos afirmaciones y comprueba si coinciden con fuentes públicas.",
      question:
        "¿La IA menciona productos o servicios que realmente ofrece la empresa?",
      image: `${IMG}desafio-ia.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTO · 4 MIN",
      title: "¿Qué es GEO y cómo se relaciona con SEO y AEO?",
      accent: "VISIBILIDAD + RESPUESTAS + CONTEXTO",
      body: "GEO reúne prácticas orientadas a facilitar que la información sobre una marca sea localizable, interpretable y verificable por sistemas generativos. Complementa SEO y AEO.",
      question:
        "¿Qué diferencia existe entre aparecer en Google y ser mencionado en una respuesta generativa?",
      note: "No existe una fórmula que garantice menciones en ChatGPT, Gemini u otros sistemas.",
      image: `${IMG}seo-aeo-geo.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "FUNDAMENTO · 5 MIN",
      title: "Entidades, contexto y consistencia de marca",
      columns: ["Atributo", "Qué comprobar", "Fuente posible"],
      rows: [
        ["Nombre", "Denominación correcta", "Web oficial"],
        ["Actividad", "Sector y servicios", "Página empresarial"],
        ["Ubicación", "Datos públicos vigentes", "Sitio y perfiles"],
        ["Productos", "Oferta realmente disponible", "Catálogo público"],
        ["Relaciones", "Perfiles y menciones", "Fuentes externas"],
      ],
      question:
        "¿Puedes verificar cinco datos de la empresa sin acceder a su administración?",
      image: `${IMG}entidades.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "ANÁLISIS Y DEMOSTRACIÓN · 11 MIN",
      title: "Fuentes verificables y publicación web",
      columns: ["Concepto", "Qué significa", "Actividad"],
      rows: [
        ["Mención", "La marca aparece en una respuesta", "Registrar evidencia"],
        ["Cita", "Se proporciona una fuente", "Comprobar enlace"],
        ["Exactitud", "La afirmación coincide con evidencia", "Contrastar"],
        ["HTML", "Estructura del sitio", "Personalizar plantilla"],
        ["GitHub Pages", "Publicación estática", "Activar despliegue"],
      ],
      note: "El docente presenta la plantilla index.html y explica el proceso de publicación.",
      image: `${IMG}publicacion-demo.webp`,
    },
    {
      id: 6,
      kind: "seo-geo-audit",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Audita la representación GEO de tu empresa",
      subtitle: "Cinco consultas, ficha de entidad y tres recomendaciones",
      instructions:
        "Investiga respuestas de IA, registra menciones, fuentes y exactitud, y documenta tres oportunidades de mejora.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Prepara el contenido de tu web ficticia.",
    },
    {
      id: 8,
      kind: "seo-geo-template",
      block: "LABORATORIO 2 · RECURSO DESCARGABLE",
      title: "Descarga y personaliza tu página web",
      subtitle: "Plantilla index.html incluida en Aula Digital",
      instructions:
        "Descarga la plantilla, personaliza el contenido de tu proyecto ficticio y guarda el archivo para publicarlo.",
    },
    {
      id: 9,
      kind: "seo-geo-publish-guide",
      block: "LABORATORIO 2 · GUÍA DE PUBLICACIÓN",
      title: "Publica tu página en GitHub Pages",
      subtitle: "Instrucciones completas dentro de Aula Digital",
      instructions:
        "Sigue los pasos para crear tu repositorio, subir index.html, activar GitHub Pages y obtener tu URL pública.",
    },
    {
      id: 10,
      kind: "seo-geo-publish",
      block: "LABORATORIO 2 · 35 MIN EN TOTAL",
      title: "Verifica y documenta tu web",
      subtitle: "URL pública, checklist y evidencias",
      instructions:
        "Registra la URL de tu web, confirma los criterios técnicos y documenta el resultado para las próximas clases.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "Presenta tu auditoría GEO y tu web",
      body: "Comparte un hallazgo GEO respaldado por evidencia, muestra la página publicada y explica cómo se editará posteriormente.",
      question:
        "¿Qué cambiarías en la información pública de la empresa y qué medirías en tu web?",
      image: `${IMG}defensa-geo.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "Tu web ya está lista para medir",
      body: "Prepara tres eventos, identifica un evento clave y explica la diferencia entre Google Analytics 4 y Google Tag Manager.",
      note: "Entrega T14_APELLIDO_NOMBRE.pdf antes de la Semana 15.",
      next: "SEMANA 15 · Implementación de GA4, GTM, eventos y medición.",
      image: `${IMG}introduccion-analitica.webp`,
    },
  ],
};

export default semana14;
