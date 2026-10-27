const IMG = "/images/seo/semana06/";

const semana06 = {
  id: "seo-semana-6",
  courseId: "seo",
  number: 6,
  title: "SEO Off Page, backlinks, reputación digital y SEO local",
  subtitle: "Cómo construir visibilidad y confianza fuera del sitio web",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Evaluar la autoridad digital, los enlaces externos, las menciones, la reputación y la presencia local de una empresa real para diseñar una estrategia de SEO Off Page basada en evidencias.",

  challenge:
    "¿Cómo conseguir que otras páginas, personas y plataformas ayuden a que una empresa sea más visible y confiable en internet?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description:
      "Investigación de la misma empresa real seleccionada desde la Semana 1, utilizando fuentes públicas y sin acceso administrativo.",
    finalDeliverable:
      "Auditoría externa de autoridad y reputación digital, acompañada de un plan de seis acciones SEO Off Page.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: ¿por qué confiar en una empresa?",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Backlinks, menciones, reputación y SEO local",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: autoridad y reputación",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: estrategia SEO Off Page",
      minutes: 35,
    },
    {
      time: "100–120",
      title: "Defensa, retroalimentación y deber",
      minutes: 20,
    },
  ],

  tools: [
    {
      name: "Google Search",
      url: "https://www.google.com/",
      purpose: "Investigar menciones, páginas de terceros y competidores.",
      access: "Público; no requiere administrar la empresa.",
      alternative: "Utilizar otro buscador público disponible.",
    },
    {
      name: "Google Maps",
      url: "https://www.google.com/maps",
      purpose: "Revisar fichas públicas, ubicación, reseñas y presencia local.",
      access: "Consulta pública.",
      alternative: "Revisar directorios y sitios empresariales públicos.",
    },
    {
      name: "Google Business Profile",
      url: "https://www.google.com/business/",
      purpose: "Conocer los elementos de gestión de perfiles comerciales.",
      access: "Solo consulta informativa; no crear ni modificar fichas ajenas.",
      alternative: "Analizar una ficha pública existente en Google Maps.",
    },
  ],

  homework: {
    title: "Tarea 6: Consolidación del diagnóstico SEO empresarial",
    delivery: "T6_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    deadline: "Antes de la Semana 7",
    objective:
      "Integrar los resultados de las seis primeras semanas para preparar una auditoría SEO integral y una propuesta profesional de posicionamiento.",
    instructions: [
      "Organizar la información de la empresa real seleccionada.",
      "Incorporar las doce palabras clave prioritarias.",
      "Resumir el benchmarking de competidores.",
      "Incluir los hallazgos de SEO On Page de la web existente.",
      "Integrar los hallazgos de SEO técnico.",
      "Agregar el análisis de autoridad, menciones y reputación.",
      "Identificar diez problemas u oportunidades SEO.",
      "Proponer una solución inicial para cada problema.",
      "Organizar las fuentes, URLs y evidencias consultadas.",
      "Documentar las limitaciones de las verificaciones públicas.",
    ],
    note: "No se necesita acceso administrativo. No se deben inventar resultados, reseñas ni enlaces.",
  },

  rubric: [
    {
      criterion: "Investigación de menciones y enlaces",
      points: 20,
    },
    {
      criterion: "Análisis de reputación y competidores",
      points: 20,
    },
    {
      criterion: "Diagnóstico de SEO local o sectorial",
      points: 15,
    },
    {
      criterion: "Plan de seis acciones estratégicas",
      points: 30,
    },
    {
      criterion: "Evidencias y defensa de resultados",
      points: 15,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 06",
      title: "SEO Off Page, backlinks y reputación digital",
      subtitle: "Construir autoridad y visibilidad fuera del sitio web",
      body: "Hoy investigaremos cómo otras páginas, plataformas y personas contribuyen al reconocimiento de una empresa y diseñaremos una estrategia de seis acciones.",
      image: `${IMG}portada-seo-offpage.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 10 MIN",
      title: "¿Por qué confiarías en una empresa desconocida?",
      accent: "CONFIANZA DIGITAL",
      body: "Compara dos negocios: uno cuenta con menciones públicas, referencias y reseñas auténticas; el otro no tiene presencia externa verificable. Analiza qué información investigarías antes de comprar.",
      quote:
        "La reputación se construye con experiencias, referencias y señales verificables.",
      question:
        "¿Qué tres señales de confianza buscarías antes de elegir una empresa?",
      note: "Actividad: discusión en equipos y presentación de tres señales.",
      image: `${IMG}confianza-digital.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTOS · 4 MIN",
      title: "SEO On Page frente a SEO Off Page",
      subtitle: "Diferencia las acciones dentro y fuera del sitio.",
      columns: ["SEO On Page", "SEO Off Page"],
      rows: [
        [
          "Optimización de títulos y contenido",
          "Menciones editoriales de terceros",
        ],
        ["Enlaces internos", "Backlinks desde sitios relevantes"],
        ["Arquitectura de navegación", "Presencia en directorios pertinentes"],
        ["Optimización de imágenes", "Reputación y referencias públicas"],
      ],
      note: "Clasifica cuatro acciones de tu empresa como On Page u Off Page.",
      image: `${IMG}onpage-vs-offpage.webp`,
    },
    {
      id: 4,
      kind: "statement",
      block: "BACKLINKS · 6 MIN",
      title: "Cuando otros sitios enlazan al tuyo",
      accent: "IMPORTA LA CALIDAD Y EL CONTEXTO",
      body: "Un backlink es un enlace desde otra página hacia tu sitio. Evalúa la pertinencia temática, el contexto editorial y la legitimidad de la fuente; no todos los enlaces aportan el mismo valor.",
      quote:
        "Un enlace editorial relevante es distinto de un enlace artificial creado para manipular rankings.",
      question:
        "¿Cuál es más valioso: una referencia de un medio especializado o cien enlaces irrelevantes?",
      image: `${IMG}backlinks-calidad.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "REPUTACIÓN Y SEO LOCAL · 10 MIN",
      title: "Menciones, reseñas y presencia local",
      subtitle: "Reconoce los distintos tipos de presencia externa.",
      columns: ["Elemento", "Qué investigar"],
      rows: [
        [
          "Menciones de marca",
          "Dónde se nombra a la empresa, con o sin enlace.",
        ],
        ["Reseñas", "Opiniones auténticas y temas recurrentes."],
        ["Google Maps", "Presencia, ubicación y datos públicos."],
        [
          "Perfil empresarial",
          "Categoría, horarios y coherencia de la información.",
        ],
        ["Competidores", "Fuentes externas y referencias comparables."],
      ],
      note: "Observa una ficha empresarial pública. No es necesario administrar ni crear perfiles.",
      image: `${IMG}reputacion-seo-local.webp`,
    },
    {
      id: 6,
      kind: "seo-offpage-research",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Investiga la autoridad y reputación de tu empresa",
      subtitle:
        "Cinco evidencias externas, tres competidores y diagnóstico de reputación",
      instructions:
        "Busca menciones y backlinks verificables, revisa la presencia local, analiza tres competidores y registra dos fortalezas y dos debilidades.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Regresamos para diseñar una estrategia de autoridad digital.",
      body: "Conserva las evidencias y URLs recopiladas durante el primer laboratorio.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 10 MIN",
      title: "¿Qué oportunidades tiene tu empresa?",
      accent: "COMPARAR ANTES DE PROPONER",
      body: "Utiliza las evidencias del Laboratorio 1 para identificar brechas de visibilidad frente a los competidores y tres oportunidades reales de mejora.",
      quote:
        "Una oportunidad estratégica debe responder a un hallazgo verificable.",
      question:
        "¿Dónde tienen presencia tus competidores y tu empresa todavía no?",
      image: `${IMG}brechas-competitivas.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE B · 10 MIN",
      title: "Diseña backlinks legítimos",
      accent: "AUTORIDAD SIN MANIPULACIÓN",
      body: "Propón colaboraciones editoriales, contenidos útiles, referencias sectoriales y directorios pertinentes. Cada acción debe tener una fuente objetivo y un indicador verificable.",
      quote:
        "La estrategia debe generar valor para las personas, no enlaces artificiales.",
      question:
        "¿Qué contenido de tu empresa merecería una referencia editorial?",
      image: `${IMG}estrategia-backlinks.webp`,
    },
    {
      id: 10,
      kind: "seo-offpage-strategy",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Construye tu estrategia SEO Off Page",
      subtitle:
        "Tres acciones de autoridad y tres de SEO local o presencia sectorial",
      instructions:
        "Identifica tres oportunidades y desarrolla seis acciones con público objetivo, indicadores, impacto, viabilidad y prioridades.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "Defiende tu estrategia de autoridad",
      body: "Cada equipo presenta un hallazgo comprobado, una oportunidad y la acción que recomienda implementar primero.",
      quote:
        "Una propuesta profesional explica qué hacer, por qué hacerlo y cómo medir sus resultados.",
      question: "¿Qué evidencia respalda tu recomendación más importante?",
      image: `${IMG}defensa-estrategia.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "Prepara la auditoría integral",
      body: "Consolida las investigaciones de las primeras seis semanas y organiza diez problemas u oportunidades SEO con soluciones iniciales y evidencias.",
      note: "Tarea grupal para Moodle: T6_APELLIDO_NOMBRE.pdf. No necesitas acceso a cuentas privadas de la empresa.",
      next: "SEMANA 07 · Auditoría SEO integral y roadmap de 90 días.",
      image: `${IMG}consolidacion-seo.webp`,
    },
  ],
};

export default semana06;
