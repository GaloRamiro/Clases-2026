const IMG = "/images/seo/semana08/";

const semana08 = {
  id: "seo-semana-8",
  courseId: "seo",
  number: 8,
  title: "Introducción al SEM y planificación de campañas en Google Ads",
  subtitle: "Cómo conseguir clientes sin desperdiciar el presupuesto",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Comprender el funcionamiento del SEM, los fundamentos de Google Ads y sus indicadores para diseñar una propuesta inicial de campaña de búsqueda para una empresa real.",

  challenge:
    "Tu empresa dispone de $100 para anunciarse en Google durante 30 días. ¿Qué promocionarías, a quién y con qué resultados esperados?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description:
      "Continuación del proyecto de la empresa real investigada durante las siete primeras semanas.",
    finalDeliverable:
      "Brief publicitario con objetivo, audiencia, producto, diez keywords, presupuesto hipotético y tres KPI.",
  },

  schedule: [
    { time: "00–10", title: "Desafío de inversión", minutes: 10 },
    { time: "10–30", title: "Fundamentos SEM y métricas", minutes: 20 },
    { time: "30–55", title: "Laboratorio 1: investigación SEM", minutes: 25 },
    { time: "55–65", title: "Receso", minutes: 10 },
    { time: "65–100", title: "Laboratorio 2: brief publicitario", minutes: 35 },
    { time: "100–120", title: "Defensa y cierre", minutes: 20 },
  ],

  tools: [
    {
      name: "Google Search",
      url: "https://www.google.com/",
      purpose: "Investigar anuncios patrocinados y anunciantes.",
      access: "Consulta pública.",
    },
    {
      name: "Google Trends",
      url: "https://trends.google.com/trends/",
      purpose: "Comparar el interés relativo de términos comerciales.",
      access: "Gratuito.",
    },
    {
      name: "Google Ads",
      url: "https://ads.google.com/",
      purpose: "Conocer los conceptos e interfaz de campañas.",
      access: "No se requiere crear ni activar campañas.",
    },
  ],

  homework: {
    title: "Tarea 8: Organiza tu primera campaña de Google Ads",
    delivery: "T8_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    deadline: "Antes de la Semana 9",
    instructions: [
      "Recuperar las diez keywords del Laboratorio 2.",
      "Organizarlas en dos grupos temáticos.",
      "Definir el nombre de la campaña.",
      "Asignar un nombre a cada grupo de anuncios.",
      "Investigar cinco búsquedas que no deberían activar los anuncios.",
      "Proponer cinco palabras clave negativas.",
      "Justificar las exclusiones.",
      "Diseñar un esquema visual de la campaña.",
      "Entregar un PDF de dos a tres páginas.",
    ],
    note: "No publicar campañas, registrar tarjetas ni realizar inversiones.",
  },

  rubric: [
    { criterion: "Investigación y análisis de anuncios", points: 20 },
    { criterion: "Definición del objetivo publicitario", points: 15 },
    { criterion: "Segmentación y selección de keywords", points: 20 },
    { criterion: "Presupuesto y cálculos simulados", points: 25 },
    { criterion: "KPI y justificación estratégica", points: 20 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 08 · UNIDAD 2",
      title: "SEM y planificación de campañas en Google Ads",
      subtitle: "De la visibilidad orgánica a la publicidad pagada",
      body: "Aprenderemos cómo funciona la publicidad de búsqueda y construiremos una propuesta de inversión sin gastar dinero.",
      image: `${IMG}portada-sem.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 10 MIN",
      title: "Tienes $100 para conseguir clientes",
      accent: "CADA CLIC TIENE UN COSTO",
      body: "Tu empresa cuenta con $100 para una campaña de 30 días. Debes elegir un producto o servicio, una audiencia y una búsqueda comercial.",
      quote:
        "Una campaña rentable comienza con un objetivo claro, no con un presupuesto grande.",
      question: "¿Qué promocionarías y cómo sabrías si la inversión funcionó?",
      note: "En equipos: 5 minutos de propuesta y 5 minutos de discusión.",
      image: `${IMG}desafio-presupuesto.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTOS · 4 MIN",
      title: "SEO frente a SEM",
      subtitle: "Dos estrategias complementarias de visibilidad.",
      columns: ["Criterio", "SEO orgánico", "SEM pagado"],
      rows: [
        ["Visibilidad", "Resultados orgánicos", "Anuncios patrocinados"],
        ["Pago por clic", "No", "Puede aplicarse según el modelo"],
        [
          "Tiempo",
          "Resultados progresivos",
          "Visibilidad al activar anuncios elegibles",
        ],
        [
          "Control",
          "Optimización de contenidos",
          "Presupuesto, pujas y segmentación",
        ],
        [
          "Objetivo",
          "Visibilidad orgánica sostenible",
          "Tráfico y acciones comerciales",
        ],
      ],
      note: "Actividad: identificar resultados orgánicos y patrocinados en una búsqueda.",
      image: `${IMG}seo-vs-sem.webp`,
    },
    {
      id: 4,
      kind: "statement",
      block: "GOOGLE ADS · 5 MIN",
      title: "¿Cómo funciona una campaña de búsqueda?",
      accent: "CAMPAÑA → GRUPOS → ANUNCIOS",
      body: "Una campaña organiza objetivos y configuración; los grupos de anuncios reúnen palabras clave y anuncios relacionados. La página de destino debe responder a la búsqueda.",
      quote:
        "El anuncio promete una solución; la página de destino debe respaldarla.",
      question: "¿Qué elementos identificas en un anuncio de búsqueda?",
      image: `${IMG}estructura-google-ads.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "SUBASTA Y MÉTRICAS · 11 MIN",
      title: "¿Por qué aparece un anuncio antes que otro?",
      subtitle: "La posición no depende exclusivamente de pagar más.",
      columns: ["Concepto", "Qué significa"],
      rows: [
        ["Subasta", "Proceso que determina anuncios elegibles y su posición"],
        ["Ad Rank", "Considera puja, calidad, contexto y otros factores"],
        ["CPC", "Costo por clic"],
        ["CTR", "Clics divididos entre impresiones × 100"],
        ["Conversión", "Acción valiosa definida por el anunciante"],
        ["CPA", "Costo dividido entre conversiones"],
      ],
      question:
        "Un anuncio obtiene 20 clics y 1.000 impresiones. ¿Cuál es su CTR?",
      note: "Respuesta: 2 %. Explica por qué una puja mayor no garantiza la primera posición.",
      image: `${IMG}subasta-metricas.webp`,
    },
    {
      id: 6,
      kind: "seo-sem-research",
      block: "LABORATORIO 1 · 25 MIN",
      title: "¿Cómo se anuncian tus competidores?",
      subtitle: "Cinco búsquedas y análisis de tres anuncios",
      instructions:
        "Investiga cinco keywords comerciales, documenta los anuncios observados y compara anunciantes, mensajes, CTA y páginas de destino.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Regresamos para diseñar nuestra primera campaña.",
      body: "Conserva las evidencias del análisis de anuncios.",
    },
    {
      id: 8,
      kind: "statement",
      block: "ESTRATEGIA · 8 MIN",
      title: "Selecciona qué vas a promocionar",
      accent: "UN PRODUCTO, UN OBJETIVO",
      body: "Elige un producto o servicio real de la empresa. Define si buscas ventas, contactos, reservas o solicitudes y qué acción contará como conversión.",
      quote:
        "Un objetivo medible permite evaluar si la campaña cumple su propósito.",
      question:
        "¿Qué acción concreta debe realizar el usuario después de hacer clic?",
      image: `${IMG}objetivo-campana.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "SEGMENTACIÓN · 10 MIN",
      title: "Define tu audiencia y tus búsquedas",
      accent: "INTENCIÓN COMERCIAL",
      body: "Define ubicación, idioma, público objetivo y diez palabras clave comerciales o transaccionales relacionadas con el producto seleccionado.",
      quote:
        "No todas las búsquedas sobre un producto indican intención de compra.",
      question:
        "¿Qué diferencia existe entre 'qué es' y 'comprar' un producto?",
      image: `${IMG}audiencia-keywords.webp`,
    },
    {
      id: 10,
      kind: "seo-sem-brief",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Diseña tu primera estrategia de Google Ads",
      subtitle: "Brief, diez keywords y simulador de $100",
      instructions:
        "Define producto, objetivo, audiencia, segmentación, presupuesto hipotético, CPC, tasa de conversión y tres KPI. Descarga tu brief en PDF.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "Defiende tu inversión ante el cliente",
      body: "Presenta el producto, la audiencia, las keywords, el presupuesto y los resultados hipotéticos. Justifica por qué invertirías en esa propuesta.",
      quote: "Una proyección académica no es una garantía de resultados.",
      question: "¿Qué cambiarías si el CPC real fuera mayor al supuesto?",
      image: `${IMG}defensa-sem.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "Prepara la estructura de tu campaña",
      body: "Organiza las diez keywords en dos grupos de anuncios y propone cinco palabras clave negativas para evitar búsquedas irrelevantes.",
      note: "Tarea grupal: T8_APELLIDO_NOMBRE.pdf. No crear ni activar campañas.",
      next: "SEMANA 09 · Estructura de campañas, concordancias y palabras clave negativas.",
      image: `${IMG}preparacion-semana09.webp`,
    },
  ],
};

export default semana08;
