/* ==========================================================
   AULA DIGITAL — ANÁLISIS SEO
   SEMANA 01

   El nuevo escenario de las búsquedas
   SEO · SEM · AEO · GEO

   Duración: 120 minutos
   Receso: 10 minutos
   ========================================================== */

const IMG = "/images/seo/semana01/";

const semana01 = {
  id: "seo-semana-1",
  courseId: "seo",
  number: 1,

  title: "El nuevo escenario de las búsquedas",

  subtitle: "SEO, SEM, AEO y GEO: cómo encuentran los clientes a una empresa",

  duration: 120,

  objective:
    "Diferenciar SEO, SEM, AEO y GEO mediante el análisis de resultados de búsqueda, definiendo una empresa, su mercado, sus competidores y oportunidades iniciales de posicionamiento digital.",

  challenge:
    "Si una empresa no aparece cuando un cliente busca una solución, ¿cómo puede competir digitalmente?",

  project: {
    name: "Agencia de posicionamiento digital",

    description:
      "Durante 18 semanas, cada equipo desarrollará una estrategia integral de visibilidad digital para una empresa real o emprendimiento verificable.",

    finalDeliverable:
      "Diagnóstico SEO, investigación de palabras clave, estrategia de contenidos, optimización técnica, visibilidad en buscadores tradicionales y motores de respuesta con IA, medición y presentación ejecutiva.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío inicial",
      minutes: 10,
    },
    {
      time: "10–25",
      title: "Fundamentos SEO, SEM, AEO y GEO",
      minutes: 15,
    },
    {
      time: "25–40",
      title: "Laboratorio de búsqueda",
      minutes: 15,
    },
    {
      time: "40–50",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "50–65",
      title: "Definición de la empresa",
      minutes: 15,
    },
    {
      time: "65–90",
      title: "Investigación competitiva",
      minutes: 25,
    },
    {
      time: "90–110",
      title: "Presentación de decisiones",
      minutes: 20,
    },
    {
      time: "110–120",
      title: "Cierre y deber",
      minutes: 10,
    },
  ],

  rubric: [
    {
      criterion: "Identifica y diferencia SEO, SEM, AEO y GEO",
      points: 20,
    },
    {
      criterion: "Analiza resultados de búsqueda con evidencias",
      points: 20,
    },
    {
      criterion: "Define correctamente la empresa y su mercado",
      points: 20,
    },
    {
      criterion: "Identifica competidores y oportunidades",
      points: 25,
    },
    {
      criterion: "Presenta y justifica decisiones",
      points: 15,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 01",

      title: "El nuevo escenario de las búsquedas",

      subtitle: "SEO, SEM, AEO y GEO",

      body: "Hoy las empresas compiten por aparecer en Google, en respuestas directas y en experiencias de búsqueda impulsadas por inteligencia artificial.",

      image: "/public/images/seo/Espacio creativo de trabajo nocturno.png",

      imageHint:
        "Profesional analizando resultados de búsqueda y plataformas digitales.",
    },

    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL",

      title: "¿Qué ocurre cuando una empresa no aparece?",

      accent: "EL PROBLEMA",

      body: "Los clientes investigan antes de comprar. Si una empresa no es visible durante esa investigación, puede perder oportunidades comerciales.",

      quote:
        "No basta con tener una página web. Los clientes deben poder encontrarla.",

      note: "Actividad: busca un producto o servicio en Google e identifica qué empresas aparecen primero.",

      question:
        "¿Qué empresa elegirías y qué elementos del resultado influyen en tu decisión?",

      image: "/public/images/seo/Contraste entre dos cafés al anochecer.png",
    },

    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS",

      title: "SEO: visibilidad orgánica",

      accent: "SEO",

      body: "Search Engine Optimization es el conjunto de prácticas que ayudan a mejorar la visibilidad de un sitio web en los resultados orgánicos de los buscadores.",

      quote:
        "El SEO busca que una página relevante pueda ser encontrada por las personas adecuadas.",

      note: "Ejemplo: una clínica que aparece en resultados orgánicos cuando alguien busca servicios relacionados.",

      question:
        "¿Por qué una empresa invertiría en SEO si puede pagar publicidad?",

      image: "/public/images/seo/Espacio tecnológico de trabajo creativo.png",
    },

    {
      id: 4,
      kind: "statement",
      block: "FUNDAMENTOS",

      title: "SEM: presencia mediante anuncios",

      accent: "SEM",

      body: "En esta asignatura utilizaremos SEM para referirnos principalmente a la publicidad pagada en motores de búsqueda, como las campañas de Google Ads.",

      quote:
        "El SEM permite competir por visibilidad publicitaria mediante campañas y presupuestos.",

      note: "Los anuncios deben distinguirse de los resultados orgánicos. Pagar no garantiza una venta.",

      question:
        "¿Cuándo sería conveniente utilizar SEM en lugar de depender únicamente del SEO?",

      image: "/public/images/seo/Colaboración creativa en la oficina tecnológica.png",
    },

    {
      id: 5,
      kind: "statement",
      block: "NUEVAS EXPERIENCIAS DE BÚSQUEDA",

      title: "AEO: optimización para respuestas",

      accent: "AEO",

      body: "Answer Engine Optimization se enfoca en estructurar contenido útil, claro y verificable para facilitar su utilización en experiencias que responden directamente las preguntas de los usuarios.",

      quote:
        "La persona no siempre busca una lista de enlaces: a veces necesita una respuesta concreta.",

      note: "Ejemplos: preguntas frecuentes, respuestas concisas y contenido que resuelve dudas específicas.",

      question:
        "¿Qué preguntas de tus clientes debería responder claramente tu empresa?",

      image: "/public/images/seo/Estudio nocturno entre pantallas y plantas.png",
    },

    {
      id: 6,
      kind: "statement",
      block: "BÚSQUEDA CON INTELIGENCIA ARTIFICIAL",

      title: "GEO: visibilidad en motores generativos",

      accent: "GEO",

      body: "Generative Engine Optimization reúne estrategias orientadas a mejorar la posibilidad de que una marca o su contenido sea descubierto, utilizado o citado por experiencias de búsqueda basadas en inteligencia artificial generativa.",

      quote:
        "Una marca también necesita construir información confiable para los sistemas que generan respuestas.",

      note: "La inclusión en respuestas generadas por IA no está garantizada y puede variar según la plataforma y la consulta.",

      question:
        "¿Qué información necesitaría una IA para recomendar una empresa con fundamento?",

      image: "/public/images/seo/Colaboración creativa al anochecer.png",
    },

    {
      id: 7,
      kind: "table",
      block: "COMPARACIÓN ESTRATÉGICA",

      title: "SEO, SEM, AEO y GEO: ¿qué cambia?",

      subtitle:
        "No son cuatro estrategias idénticas. Tienen objetivos y mecanismos diferentes.",

      columns: ["Enfoque", "Objetivo principal", "Ejemplo"],

      rows: [
        [
          "SEO",
          "Mejorar la visibilidad orgánica",
          "Página posicionada en Google",
        ],
        [
          "SEM",
          "Obtener visibilidad mediante anuncios",
          "Anuncio en resultados de búsqueda",
        ],
        [
          "AEO",
          "Facilitar respuestas directas",
          "Respuesta a una pregunta frecuente",
        ],
        [
          "GEO",
          "Mejorar presencia en experiencias generativas",
          "Contenido citado en una respuesta con IA",
        ],
      ],

      image: "/public/images/seo/Reunión creativa en la oficina.png",

      question:
        "¿Cuál de estos enfoques utilizarías primero para una empresa nueva y por qué?",
    },

    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO · 15 MINUTOS",

      title: "Investiga lo que realmente aparece en Google",

      accent: "ACTIVIDAD 01",

      body: "Realiza dos búsquedas comerciales relacionadas con un producto o servicio. Observa resultados orgánicos, anuncios, mapas y respuestas generadas por IA, cuando estén presentes.",

      quote:
        "No supongas cómo funciona la búsqueda: observa y registra evidencias.",

      note: "Registra la consulta, el buscador utilizado, los resultados observados y una captura de pantalla.",

      image: "/public/images/seo/Conversación acogedora en la cafetería.png",
    },

    {
      id: 9,
      kind: "seo-search-lab",
      block: "LABORATORIO INTERACTIVO",

      title: "Clasifica los resultados y registra evidencias",

      subtitle:
        "Documenta tus búsquedas y explica qué estrategias identificaste.",

      instructions:
        "Completa dos búsquedas comerciales, registra los resultados y justifica tus observaciones.",
    },

    {
      id: 10,
      kind: "statement",
      block: "PROYECTO DE 18 SEMANAS",

      title: "Hoy comienza tu agencia de posicionamiento",

      accent: "PROYECTO EMPRESARIAL",

      body: "Cada equipo trabajará durante el semestre con una empresa real o emprendimiento verificable. Todas las actividades de las siguientes semanas ampliarán este mismo proyecto.",

      quote:
        "No desarrollaremos ejercicios aislados: construiremos una estrategia profesional de visibilidad digital.",

      note: "Selecciona una empresa cuyo sector, productos y competidores puedan investigarse públicamente.",

      image: "/public/images/seo/Diseño web y café en la oficina.png",
    },

    {
      id: 11,
      kind: "seo-company-workshop",
      block: "TALLER · 15 MINUTOS",

      title: "Define la empresa y su mercado",

      subtitle:
        "Construye la ficha inicial de la empresa que acompañará las 18 semanas.",

      instructions:
        "Registra el nombre de la empresa, sector, mercado, público objetivo, propuesta de valor y objetivo comercial.",
    },

    {
      id: 12,
      kind: "seo-competitor-workshop",
      block: "INVESTIGACIÓN · 25 MINUTOS",

      title: "Descubre a tus competidores reales",

      subtitle:
        "Identifica tres competidores visibles en búsquedas y encuentra oportunidades.",

      instructions:
        "Registra tres competidores, sus sitios web, las búsquedas realizadas y al menos dos oportunidades iniciales de posicionamiento.",
    },

    {
      id: 13,
      kind: "present",
      block: "PRESENTACIÓN · 20 MINUTOS",

      title: "Defiende tus decisiones como una agencia",

      body: "Cada equipo presenta la empresa seleccionada, su mercado, los resultados de búsqueda analizados, los competidores y las oportunidades encontradas.",

      quote:
        "Una decisión profesional necesita evidencias, no solamente opiniones.",

      question:
        "¿Qué oportunidad de visibilidad digital consideras más importante y cómo la justificas?",

      image: "/public/images/seo/Análisis de datos en la oficina cálida.png",
    },

    {
      id: 14,
      kind: "homework",
      block: "CIERRE Y CONEXIÓN",

      title: "De la visibilidad a las palabras clave",

      body: "Entrega el diagnóstico inicial de la empresa, incluyendo evidencias de búsqueda, tres competidores y dos oportunidades justificadas.",

      note: "Deber: investiga diez búsquedas que podría realizar un cliente potencial. Agrúpalas según los problemas o necesidades que intenta resolver.",

      next: "SEMANA 02 · Palabras clave e intención de búsqueda",

      image: "/public/images/seo/Mujer Analizando Datos en Oficina Acogedora.png",
    },
  ],
};

export default semana01;
