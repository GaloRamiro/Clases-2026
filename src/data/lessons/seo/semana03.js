const IMG = "/images/seo/semana03/";

const semana03 = {
  id: "seo-semana-3",
  courseId: "seo",
  number: 3,
  title: "Benchmarking SEO y análisis de competidores",
  subtitle: "Descubre quién posiciona, por qué y dónde puedes competir",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Analizar competidores digitales mediante búsquedas reales, criterios de benchmarking SEO y evidencias verificables para identificar oportunidades de posicionamiento y formular una estrategia diferenciada para la empresa del proyecto.",

  challenge:
    "Si tus competidores ya aparecen en Google, ¿qué harás diferente para ganar visibilidad?",

  project: {
    name: "Agencia de posicionamiento digital",
    description:
      "Continuación de la empresa y matriz de 30 keywords desarrolladas en las semanas 1 y 2.",
    finalDeliverable:
      "Mapa de tres competidores, matriz de benchmarking y plan de tres acciones SEO prioritarias.",
  },

  schedule: [
    { time: "00–10", title: "Desafío: ¿quién domina Google?", minutes: 10 },
    { time: "10–25", title: "Competencia SEO y benchmarking", minutes: 15 },
    { time: "25–45", title: "Taller: identificar competidores", minutes: 20 },
    {
      time: "45–55",
      title: "Interpretar resultados y oportunidades",
      minutes: 10,
    },
    { time: "55–65", title: "Descanso", minutes: 10 },
    {
      time: "65–100",
      title: "Laboratorio: auditoría comparativa",
      minutes: 35,
    },
    { time: "100–115", title: "Reto: estrategia para competir", minutes: 15 },
    { time: "115–120", title: "Cierre y trabajo autónomo", minutes: 5 },
  ],

  rubric: [
    { criterion: "Identificación y evidencia de competidores", points: 20 },
    { criterion: "Análisis comparativo de criterios SEO", points: 30 },
    { criterion: "Oportunidades y plan de acción", points: 30 },
    { criterion: "Argumentación y calidad de evidencias", points: 20 },
  ],

  homework: {
    title: "Trabajo autónomo 3 — Benchmarking SEO de la empresa",
    delivery: "T3_APELLIDO_NOMBRE.pdf",
    instructions: [
      "Recuperar las doce keywords prioritarias de la Semana 2.",
      "Elegir cinco y documentar los resultados orgánicos de Google para el mercado objetivo.",
      "Identificar tres competidores SEO y registrar sus URLs y capturas.",
      "Comparar sus páginas mediante la matriz de benchmarking.",
      "Proponer tres acciones SEO y justificar su orden de ejecución.",
      "Redactar una conclusión de 100 a 150 palabras.",
    ],
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 03",
      title: "Benchmarking SEO y análisis de competidores",
      subtitle: "Descubre quién posiciona, por qué y dónde puedes competir",
      body: "Hoy convertiremos nuestra investigación de keywords en un mapa de competencia y un plan de posicionamiento basado en evidencias.",
      image: `${IMG}portada-benchmarking.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 10 MINUTOS",
      title: "¿Quién domina los resultados?",
      accent: "COMPETIR POR VISIBILIDAD",
      body: "Elige una de las doce keywords prioritarias de tu empresa y busca en Google. Observa qué sitios aparecen orgánicamente y qué tipo de páginas ofrecen.",
      quote:
        "Tu competencia SEO no siempre es tu competencia comercial directa.",
      question: "¿Por qué Google muestra esos resultados y no otros?",
      note: "Trabajo individual 4 minutos y conversación en parejas 6 minutos.",
      image: `${IMG}desafio-serp.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 5 MINUTOS",
      title: "¿Qué es benchmarking SEO?",
      accent: "OBSERVAR, COMPARAR, MEJORAR",
      body: "Es el análisis sistemático de sitios que compiten por las mismas búsquedas, para comprender sus fortalezas, detectar brechas y establecer prioridades propias.",
      quote:
        "No se trata de copiar al competidor, sino de descubrir cómo ofrecer una mejor respuesta.",
      question:
        "¿Qué aspectos se pueden comparar sin acceso a las analíticas privadas del competidor?",
      image: `${IMG}concepto-benchmarking.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "FUNDAMENTOS · 5 MINUTOS",
      title: "Competencia comercial vs. competencia SEO",
      subtitle:
        "Dos empresas pueden competir en ventas, pero no necesariamente por las mismas consultas.",
      columns: ["Tipo", "Qué significa", "Ejemplo"],
      rows: [
        [
          "Comercial",
          "Vende productos o servicios sustitutos",
          "Dos tiendas de laptops",
        ],
        [
          "SEO",
          "Aparece por las mismas búsquedas",
          "Tienda, revista tecnológica o marketplace",
        ],
        [
          "Mixta",
          "Compite en ventas y resultados orgánicos",
          "Otra tienda de laptops bien posicionada",
        ],
      ],
      question:
        "¿Tus tres principales rivales de ventas aparecen en las keywords que seleccionaste?",
      image: `${IMG}competencia-seo.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "CRITERIOS · 5 MINUTOS",
      title: "¿Qué podemos evaluar?",
      subtitle:
        "Utiliza únicamente señales observables o herramientas accesibles; no inventes métricas privadas.",
      columns: ["Criterio", "Qué observar", "Evidencia"],
      rows: [
        [
          "Relevancia",
          "Qué tan bien responde la página a la consulta",
          "Título y contenido",
        ],
        [
          "Contenido",
          "Profundidad, claridad y actualización visible",
          "Secciones de la página",
        ],
        [
          "SEO on-page",
          "Title, encabezados, URL y enlaces internos",
          "Página o código fuente",
        ],
        [
          "Experiencia",
          "Legibilidad, navegación y versión móvil",
          "Prueba manual",
        ],
        [
          "Confianza",
          "Autoría, referencias, contacto y transparencia",
          "Elementos visibles",
        ],
      ],
      note: "Una posición observada en Google puede variar según ubicación, dispositivo y momento.",
      image: `${IMG}criterios-seo.webp`,
    },
    {
      id: 6,
      kind: "statement",
      block: "TALLER GRUPAL · 20 MINUTOS",
      title: "Construye tu mapa de competidores",
      accent: "5 KEYWORDS · 3 COMPETIDORES",
      body: "Recupera cinco de tus doce keywords estratégicas. Registra qué dominios aparecen en los resultados orgánicos, selecciona tres competidores relevantes y justifica por qué representan competencia SEO.",
      quote:
        "Cada elección debe tener una búsqueda y una evidencia verificable.",
      note: "En la siguiente diapositiva encontrarás el formulario editable. Evita contar anuncios como resultados orgánicos.",
      image: `${IMG}taller-competidores.webp`,
    },
    {
      id: 7,
      kind: "seo-competitor-map",
      block: "TALLER INTERACTIVO · 20 MINUTOS",
      title: "Mapa de competidores SEO",
      subtitle: "Cinco búsquedas, tres competidores y evidencias",
      instructions:
        "Registra cinco keywords, identifica tres competidores orgánicos, anota sus URLs y explica su relevancia para tu empresa.",
    },
    {
      id: 8,
      kind: "statement",
      block: "ANÁLISIS · 10 MINUTOS",
      title: "Del resultado a la oportunidad",
      accent: "DETECTA UNA BRECHA",
      body: "Compara qué responde cada competidor y qué necesidades quedan insuficientemente cubiertas. Una oportunidad puede ser una guía más útil, una página local o una explicación más clara.",
      quote:
        "No confundas una debilidad percibida con un problema demostrado: registra la evidencia.",
      question: "¿Qué consulta podría resolver mejor tu empresa?",
      note: "Cada equipo formula una oportunidad y la contrasta con un resultado real.",
      image: `${IMG}oportunidades.webp`,
    },
    {
      id: 9,
      kind: "break",
      block: "RECESO · 10 MINUTOS",
      title: "Descanso",
      subtitle: "Regresamos para comparar los sitios seleccionados.",
      body: "Prepara los enlaces de los tres competidores y tu matriz de keywords.",
    },
    {
      id: 10,
      kind: "seo-benchmark-lab",
      block: "LABORATORIO INTERACTIVO · 35 MINUTOS",
      title: "Matriz de benchmarking SEO",
      subtitle: "Evalúa tres competidores mediante criterios observables",
      instructions:
        "Analiza relevancia, contenido, SEO on-page, experiencia y confianza. Registra evidencias y detecta oportunidades para tu empresa.",
    },
    {
      id: 11,
      kind: "statement",
      block: "DECISIÓN · 5 MINUTOS",
      title: "¿Qué mejorarías primero?",
      accent: "PRIORIZAR CON CRITERIO",
      body: "No todas las mejoras tienen el mismo impacto o esfuerzo. Selecciona acciones viables para la empresa del proyecto y relaciona cada una con una keyword o necesidad detectada.",
      quote:
        "Una estrategia SEO se construye con prioridades, no con una lista interminable de tareas.",
      question:
        "¿Qué acción puedes implementar primero y cómo comprobarás si ayudó?",
      image: `${IMG}priorizacion.webp`,
    },
    {
      id: 12,
      kind: "seo-competitive-plan",
      block: "RETO INTERACTIVO · 15 MINUTOS",
      title: "Plan para competir en Google",
      subtitle:
        "Tres acciones SEO con prioridad, evidencia y criterio de éxito",
      instructions:
        "Elige un competidor, identifica una brecha, define tres acciones SEO y explica qué keyword y resultado persigue cada una.",
    },
    {
      id: 13,
      kind: "present",
      block: "DEFENSA Y CIERRE · 5 MINUTOS",
      title: "Defiende tu ventaja competitiva",
      body: "Explica qué competidor analizaste, qué oportunidad encontraste y por qué tu primera acción SEO es la más importante.",
      quote:
        "Una decisión bien justificada vale más que una suposición atractiva.",
      question: "¿Qué evidencia respalda tu propuesta?",
      note: "Selecciona dos equipos para una intervención breve y deja las demás defensas registradas en el taller.",
      image: `${IMG}defensa-estrategia.webp`,
    },
    {
      id: 14,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO 03",
      title: "Benchmarking SEO de tu empresa",
      body: "Completa el análisis de cinco keywords y tres competidores, consolida la matriz comparativa y plantea tres acciones SEO prioritarias.",
      note: "Entrega en Moodle: T3_APELLIDO_NOMBRE.pdf. Adjunta capturas y conclusión de 100 a 150 palabras.",
      next: "SEMANA 04 · Arquitectura web y SEO on-page",
      image: `${IMG}trabajo-autonomo.webp`,
    },
  ],
};

export default semana03;
