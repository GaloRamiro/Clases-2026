
const semana01 = {
  id: "contenido-semana-1",
  courseId: "contenido",
  number: 1,
  title: "El nacimiento de una marca de café",
  subtitle: "Plataformas digitales, PUSH y PULL",
  duration: 180,
  objective:
    "Seleccionar plataformas digitales y diferenciar estrategias de atracción y promoción comercial, aplicándolas a una marca de café con propuesta de valor propia.",
  challenge:
    "Si todos venden el mismo café, ¿por qué un consumidor elegiría una marca y no otra?",

  schedule: [
    { time: "00–15", title: "Desafío inicial", minutes: 15 },
    { time: "15–50", title: "Fundamentos y estrategia", minutes: 35 },
    { time: "50–80", title: "Demostración docente", minutes: 30 },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio de marcas", minutes: 60 },
    { time: "160–180", title: "Evaluación y cierre", minutes: 20 },
  ],

  topics: [
    {
      title: "Ecosistema de plataformas",
      content:
        "Cada plataforma reúne audiencias, formatos y formas de descubrimiento diferentes. Elegir una plataforma exige relacionar el público con un objetivo de comunicación.",
      example:
        "Una marca de café puede utilizar TikTok para mostrar preparaciones y un sitio web para presentar su catálogo.",
    },
    {
      title: "Público y diferenciación",
      content:
        "La diferenciación explica qué hace relevante una marca frente a sus alternativas. En esta primera semana formularemos una hipótesis de audiencia que investigaremos en la Semana 2.",
      example:
        "Café artesanal: origen y tradición. Café prémium: exclusividad. Café juvenil: precio y accesibilidad.",
    },
    {
      title: "Estrategia PUSH",
      content:
        "La marca distribuye activamente un mensaje para impulsar una respuesta comercial. Puede incluir promociones, anuncios u ofertas directas.",
      example:
        "Esta semana, 20 % de descuento en tu primer pedido.",
    },
    {
      title: "Estrategia PULL",
      content:
        "La marca publica información relevante para atraer a personas interesadas. Su propósito inicial puede ser educar, inspirar o despertar curiosidad.",
      example:
        "Tres errores que arruinan el sabor de tu café en casa.",
    },
  ],

  platforms: [
    {
      name: "Instagram",
      icon: "IG",
      purpose: "Identidad visual y comunidad",
      use: "Fotografías del café, historias de origen y demostraciones breves.",
      question: "¿Qué imagen comunicaría la personalidad de tu marca?",
    },
    {
      name: "TikTok",
      icon: "TT",
      purpose: "Descubrimiento y video corto",
      use: "Preparaciones, experiencias, demostraciones y narraciones creativas.",
      question: "¿Qué historia contarías en siete segundos?",
    },
    {
      name: "Facebook",
      icon: "FB",
      purpose: "Comunidad e información comercial",
      use: "Publicaciones, promociones y comunicación con grupos de interés.",
      question: "¿Qué información necesita tu comunidad?",
    },
    {
      name: "YouTube",
      icon: "YT",
      purpose: "Contenido audiovisual explicativo",
      use: "Tutoriales de preparación y relatos sobre productores.",
      question: "¿Qué tema merece una explicación más extensa?",
    },
    {
      name: "Sitio web",
      icon: "WEB",
      purpose: "Información y conversión",
      use: "Catálogo, propuesta de valor, información y solicitudes.",
      question: "¿Qué debería hacer el visitante al entrar?",
    },
  ],

  demonstration: {
    brand: "Café Raíz",
    concept: "Café artesanal inspirado en la tradición y el origen.",
    audience:
      "Adultos jóvenes interesados en experiencias gastronómicas auténticas.",
    pull: "Conoce el recorrido del café desde su origen hasta tu taza.",
    push: "Prueba Café Raíz con una promoción de lanzamiento.",
    steps: [
      "Identificar el problema comercial.",
      "Definir una audiencia inicial.",
      "Seleccionar una plataforma y justificarla.",
      "Crear un contenido PULL.",
      "Crear un contenido PUSH.",
      "Elegir un indicador para cada objetivo.",
    ],
  },

  aiPrompt:
    "Actúa como consultor de branding. Estamos creando una marca de café dirigida a [público objetivo], con el concepto [concepto]. Propón tres oportunidades de diferenciación, explica qué necesidad atiende cada una y señala los riesgos. No inventes datos de mercado. Ayúdanos a evaluar nuestras ideas, no a reemplazarlas.",

  rubric: [
    { criterion: "Diferenciación y coherencia", points: 25 },
    { criterion: "Audiencia y plataforma", points: 25 },
    { criterion: "Aplicación de PUSH y PULL", points: 30 },
    { criterion: "Presentación y argumentación", points: 20 },
  ],

  homework:
    "Investigar tres marcas de café competidoras o referentes. Registrar qué venden, a quién parecen dirigirse, cómo comunican su propuesta y qué evidencias sustentan esas observaciones.",

  nextWeek:
    "Semana 2: segmentación, investigación de audiencias y Buyer Persona.",

  pdf: null,
};

export default semana01;
