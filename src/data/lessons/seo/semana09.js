const IMG = "/images/seo/semana09/";

const semana09 = {
  id: "seo-semana-9",
  courseId: "seo",
  number: 9,
  title:
    "Estructura de campañas en Google Ads, concordancias y palabras clave negativas",
  subtitle: "Cómo llegar a los clientes correctos y evitar clics innecesarios",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Diseñar una campaña de búsqueda simulada en Google Ads mediante dos grupos de anuncios, diez palabras clave con concordancias, diez negativas, segmentación y presupuesto, utilizando la empresa real del proyecto.",

  challenge:
    "Una empresa que vende café prémium recibe búsquedas sobre empleos, cafeteras gratis y recetas. ¿Cómo evitarías invertir en clics irrelevantes?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description:
      "Continuación del brief SEM de la Semana 8, sin modificar el sitio web de la empresa ni activar campañas.",
    finalDeliverable:
      "Estructura de campaña simulada con dos grupos, diez keywords, diez negativas, segmentación, presupuesto y páginas de destino propuestas.",
  },

  schedule: [
    { time: "00–10", title: "Desafío: tráfico irrelevante", minutes: 10 },
    {
      time: "10–30",
      title: "Campañas, concordancias y segmentación",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: keywords y negativas",
      minutes: 25,
    },
    { time: "55–65", title: "Receso", minutes: 10 },
    { time: "65–100", title: "Laboratorio 2: campaña simulada", minutes: 35 },
    { time: "100–120", title: "Defensa y cierre", minutes: 20 },
  ],

  tools: [
    {
      name: "Google Ads",
      url: "https://ads.google.com/",
      purpose: "Conocer la estructura y configuración de campañas.",
      access: "No es obligatorio crear una cuenta.",
    },
    {
      name: "Ayuda de Google Ads",
      url: "https://support.google.com/google-ads/",
      purpose: "Consultar concordancias y palabras clave negativas.",
      access: "Público.",
    },
    {
      name: "Google Search",
      url: "https://www.google.com/",
      purpose: "Investigar búsquedas relevantes e irrelevantes.",
      access: "Público.",
    },
    {
      name: "Google Sheets",
      url: "https://sheets.google.com/",
      purpose: "Organizar matrices publicitarias.",
      access: "Opcional.",
    },
  ],

  homework: {
    title:
      "Tarea 9: Investiga anuncios efectivos y prepara tus mensajes publicitarios",
    delivery: "T9_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    deadline: "Antes de la Semana 10",
    instructions: [
      "Recuperar los dos grupos de anuncios.",
      "Investigar tres anuncios observables del mercado.",
      "Analizar títulos, descripciones, beneficios y CTA.",
      "Identificar la necesidad del usuario en cada anuncio.",
      "Redactar cinco títulos originales para cada grupo.",
      "Redactar dos descripciones originales para cada grupo.",
      "Seleccionar una página de destino existente para cada grupo.",
      "Proponer mejoras para aumentar las conversiones.",
      "Entregar un PDF de dos a tres páginas.",
    ],
    note: "No copiar anuncios ni inventar afirmaciones comerciales. No modificar páginas ajenas.",
  },

  rubric: [
    { criterion: "Organización de campañas y grupos", points: 20 },
    { criterion: "Selección de keywords y concordancias", points: 25 },
    { criterion: "Palabras clave negativas y justificación", points: 20 },
    { criterion: "Segmentación y presupuesto", points: 20 },
    { criterion: "Páginas de destino y presentación", points: 15 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 09",
      title: "Campañas, concordancias y palabras negativas",
      subtitle: "Organiza la publicidad para llegar al público correcto",
      body: "Convertiremos el brief de la Semana 8 en una estructura profesional de campaña de búsqueda, sin activar publicidad.",
      image: `${IMG}portada-campanas.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "Tus anuncios atraen a las personas equivocadas",
      accent: "EVITA LOS CLICS IRRELEVANTES",
      body: "Una cafetería que vende café prémium recibe consultas sobre empleos, cafeteras gratis y recetas. Analiza cuáles no corresponden al objetivo comercial.",
      question: "¿Qué cinco búsquedas no deberían activar los anuncios?",
      note: "Cada equipo propone cinco búsquedas irrelevantes y explica sus razones.",
      image: `${IMG}busquedas-irrelevantes.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTOS · 5 MIN",
      title: "¿Cómo se organiza Google Ads?",
      subtitle: "De la cuenta a la palabra clave.",
      columns: ["Nivel", "Función"],
      rows: [
        ["Cuenta", "Contiene las campañas y configuración administrativa."],
        ["Campaña", "Organiza objetivo, presupuesto y segmentación."],
        ["Grupo de anuncios", "Reúne anuncios y keywords relacionadas."],
        ["Anuncios", "Presentan mensajes comerciales al usuario."],
        ["Palabras clave", "Ayudan a determinar búsquedas relevantes."],
      ],
      note: "Actividad: dibuja Cuenta → Campaña → Grupos → Anuncios y keywords.",
      image: `${IMG}jerarquia-google-ads.webp`,
    },
    {
      id: 4,
      kind: "statement",
      block: "ESTRUCTURA · 5 MIN",
      title: "Dos grupos para dos necesidades",
      accent: "ORGANIZACIÓN TEMÁTICA",
      body: "Agrupa productos o intenciones de búsqueda similares. Cada grupo debe tener keywords y anuncios relacionados con una propuesta concreta.",
      question: "¿Cómo separarías diez keywords comerciales en dos grupos?",
      image: `${IMG}grupos-anuncios.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "CONCORDANCIAS · 10 MIN",
      title: "Amplia, de frase y exacta",
      subtitle: "Controla la relación entre keywords y consultas.",
      columns: ["Tipo", "Escritura", "Comportamiento"],
      rows: [
        [
          "Amplia",
          "café artesanal",
          "Puede relacionarse con búsquedas de significado similar.",
        ],
        [
          "De frase",
          '"café artesanal"',
          "Puede incluir búsquedas que expresen el significado de la frase.",
        ],
        [
          "Exacta",
          "[café artesanal]",
          "Puede coincidir con búsquedas de igual significado o intención.",
        ],
      ],
      question:
        "¿Por qué una concordancia exacta no significa siempre coincidencia literal?",
      note: "Incluye negativas, ubicación e idioma para reducir búsquedas poco relevantes.",
      image: `${IMG}concordancias.webp`,
    },
    {
      id: 6,
      kind: "seo-sem-keywords",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Clasifica keywords, concordancias y negativas",
      subtitle: "Diez keywords, diez negativas y ejercicio interactivo",
      instructions:
        "Recupera las diez keywords de la Semana 8, distribúyelas en dos grupos, define concordancias y justifica diez negativas.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Prepara las keywords para construir la campaña.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 10 MIN",
      title: "Construye el árbol de campaña",
      accent: "UNA CAMPAÑA, DOS GRUPOS",
      body: "Define nombre y objetivo. Organiza cinco keywords en cada grupo de anuncios. Cada grupo debe responder a una necesidad de búsqueda clara.",
      question: "¿Tus grupos se distinguen por producto, servicio o intención?",
      image: `${IMG}arbol-campana.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE B · 10 MIN",
      title: "Segmentación y presupuesto",
      accent: "100 DÓLARES · 30 DÍAS",
      body: "Propón ubicación, idioma, redes de búsqueda y presupuesto. Para el ejercicio, $100 divididos entre 30 días equivalen aproximadamente a $3,33 diarios.",
      question: "¿En qué zona geográfica tendría sentido anunciar tu producto?",
      note: "En Google Ads, el presupuesto diario es un promedio, no un límite fijo de gasto diario.",
      image: `${IMG}segmentacion-presupuesto.webp`,
    },
    {
      id: 10,
      kind: "seo-sem-campaign",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Construye y revisa tu campaña simulada",
      subtitle: "Estructura, segmentación, presupuesto y checklist",
      instructions:
        "Organiza los dos grupos, recupera las concordancias y negativas, selecciona páginas de destino y revisa la campaña antes de presentarla.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "Defiende tu estructura ante el cliente",
      body: "Presenta los dos grupos de anuncios, explica una concordancia y justifica tres palabras negativas importantes.",
      question: "¿Cómo ayuda tu estructura a reducir clics poco relevantes?",
      image: `${IMG}defensa-campana.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "Prepara los anuncios de la Semana 10",
      body: "Investiga tres anuncios reales, redacta diez títulos originales y cuatro descripciones para tus dos grupos.",
      note: "Entrega grupal: T9_APELLIDO_NOMBRE.pdf. Incluye recomendaciones de páginas de destino.",
      next: "SEMANA 10 · Copywriting publicitario, anuncios y landing pages.",
      image: `${IMG}copywriting-ads.webp`,
    },
  ],
};

export default semana09;
