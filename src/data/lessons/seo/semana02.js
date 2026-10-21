/*
  AULA DIGITAL — ANÁLISIS SEO
  SEMANA 02
  Investigación de palabras clave
  Duración: 120 minutos
  Receso: 10 minutos
*/

const semana02 = {
  id: "seo-semana-2",
  courseId: "seo",
  number: 2,

  title: "Investigación de palabras clave",
  subtitle: "Keyword Research e intención de búsqueda",
  duration: 120,

  objective:
    "Investigar, clasificar y priorizar palabras clave mediante herramientas SEO y análisis de intención de búsqueda para diseñar una estrategia de posicionamiento adaptada a la empresa seleccionada en la Semana 1.",

  challenge:
    "¿Cómo descubrir lo que realmente buscan tus clientes en Google y convertir esas búsquedas en oportunidades comerciales?",

  project: {
    name: "Agencia de posicionamiento digital",
    description:
      "Continuación del proyecto empresarial de 18 semanas iniciado en la Semana 1.",
    finalDeliverable:
      "Matriz de 30 palabras clave con 12 keywords estratégicas justificadas.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío inicial",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Fundamentos del Keyword Research",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: investigación de keywords",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: matriz SEO",
      minutes: 35,
    },
    {
      time: "100–115",
      title: "Defensa de estrategia",
      minutes: 15,
    },
    {
      time: "115–120",
      title: "Cierre y deber",
      minutes: 5,
    },
  ],

  rubric: [
    {
      criterion: "Investigación de 30 palabras clave pertinentes",
      points: 25,
    },
    {
      criterion: "Clasificación de intención de búsqueda",
      points: 20,
    },
    {
      criterion: "Identificación de fuentes y herramientas",
      points: 15,
    },
    {
      criterion: "Selección y justificación de 12 keywords",
      points: 25,
    },
    {
      criterion: "Presentación y argumentación",
      points: 15,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 02",

      title: "Investigación de palabras clave",
      subtitle: "Keyword Research e intención de búsqueda",

      body: "Hoy descubriremos qué buscan los clientes de nuestra empresa y cómo convertir esas búsquedas en una estrategia SEO con evidencias.",

      imageHint:
        "Estudiante investigando consultas de Google en una computadora",
    },

    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 10 MINUTOS",

      title: "¿Qué escribe realmente tu cliente en Google?",
      accent: "INTENCIÓN DE COMPRA",

      body: "Una persona busca «café» y otra «comprar café de especialidad en Quito». ¿Cuál consulta demuestra una intención comercial más clara?",

      quote:
        "Una palabra clave no es solo una palabra: representa una necesidad.",

      note: "Actividad: recupera las diez búsquedas del deber de la Semana 1, elige tres y explica qué necesidad representan.",

      question:
        "¿Cuál de tus tres consultas podría atraer a un cliente y por qué?",
    },

    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 5 MINUTOS",

      title: "¿Qué es una palabra clave?",
      accent: "KEYWORD",

      body: "Una keyword es un término o frase que orienta el contenido hacia consultas relevantes de los usuarios. Una consulta es lo que la persona escribe realmente en el buscador.",

      quote:
        "Primero comprende la pregunta del cliente; después piensa en el contenido.",

      note: "Actividad: transforma «café» en una búsqueda específica relacionada con tu empresa.",

      question: "¿Qué necesidad concreta expresa tu nueva búsqueda?",
    },

    {
      id: 4,
      kind: "table",
      block: "INTENCIÓN DE BÚSQUEDA · 7 MINUTOS",

      title: "No todas las búsquedas significan lo mismo",

      subtitle:
        "Clasifica las consultas según lo que el usuario espera encontrar.",

      columns: ["Intención", "Qué busca", "Ejemplo"],

      rows: [
        [
          "Informativa",
          "Aprender o resolver dudas",
          "Cómo preparar café de especialidad",
        ],
        [
          "Navegacional",
          "Encontrar una marca o sitio",
          "Sitio web de Starbucks",
        ],
        ["Comercial", "Comparar opciones", "Mejores cafeterías en Quito"],
        [
          "Transaccional",
          "Comprar o realizar una acción",
          "Comprar café artesanal online",
        ],
      ],

      question:
        "¿Qué intención tiene cada búsqueda de tu empresa? Justifica tu respuesta.",
    },

    {
      id: 5,
      kind: "statement",
      block: "ESTRATEGIA SEO · 4 MINUTOS",

      title: "Short tail y long tail",
      accent: "DE LO AMPLIO A LO ESPECÍFICO",

      body: "Las keywords amplias, como «café», pueden responder a necesidades diversas. Las más específicas, como «comprar café de especialidad en Quito», suelen expresar una necesidad más delimitada.",

      quote: "No siempre conviene perseguir la búsqueda más amplia.",

      note: "Actividad: escribe tres variaciones específicas de una keyword genérica de tu empresa.",

      question: "¿Cuál podría atraer clientes con una necesidad más concreta?",
    },

    {
      id: 6,
      kind: "table",
      block: "HERRAMIENTAS · 4 MINUTOS",

      title: "Investiga antes de elegir",

      subtitle: "No confundas tendencias, ideas y estimaciones de volumen.",

      columns: ["Herramienta", "Para qué sirve", "Fuente"],

      rows: [
        [
          "Google Trends",
          "Comparar interés relativo de búsqueda",
          "trends.google.com",
        ],
        ["Google Search", "Sugerencias y búsquedas relacionadas", "google.com"],
        [
          "Keyword Planner",
          "Estimaciones disponibles con acceso",
          "ads.google.com",
        ],
        [
          "IA",
          "Proponer ideas que deben contrastarse",
          "Verificar en buscador",
        ],
      ],

      question:
        "¿Cómo comprobarías que una keyword sugerida por IA es relevante para tu mercado?",
    },

    {
      id: 7,
      kind: "statement",
      block: "LABORATORIO 01 · 25 MINUTOS",

      title: "Descubre cómo busca tu mercado",
      accent: "20 PALABRAS CLAVE",

      body: "Trabaja con tu equipo y la empresa seleccionada en la Semana 1. Recupera las diez búsquedas del deber e investiga diez adicionales mediante Google, Trends y otras fuentes verificables.",

      quote: "Investigar es observar, contrastar y registrar evidencias.",

      note: "Entrega: veinte keywords diferentes, cada una con intención de búsqueda y fuente. En la siguiente pantalla encontrarás la tabla editable.",

      question:
        "¿Qué búsquedas tienen relación directa con tus productos o servicios?",
    },

    {
      id: 8,
      kind: "seo-keyword-lab",
      block: "LABORATORIO INTERACTIVO 01",

      title: "Registra tus primeras 20 keywords",

      subtitle: "Keyword · intención · tipo · fuente",

      instructions:
        "Completa 20 palabras clave para tu empresa. Clasifica su intención y registra la fuente donde las encontraste.",
    },

    {
      id: 9,
      kind: "break",
      block: "RECESO · 10 MINUTOS",

      title: "Descanso",

      subtitle:
        "Volvemos para convertir la investigación en decisiones estratégicas.",

      body: "Al regresar, seleccionaremos las keywords que más convienen a la empresa.",
    },

    {
      id: 10,
      kind: "statement",
      block: "DECISIÓN ESTRATÉGICA · 5 MINUTOS",

      title: "¿Qué keywords le convienen a tu empresa?",
      accent: "PRIORIZAR",

      body: "Una palabra clave puede ser popular y aun así poco útil para el negocio. Evalúa pertinencia, intención, oportunidad comercial y evidencia disponible.",

      quote: "La prioridad SEO necesita una justificación, no una corazonada.",

      note: "Actividad: compara tres keywords del primer laboratorio y elige la más útil para la empresa.",

      question: "¿Qué página o contenido debería responder a esa búsqueda?",
    },

    {
      id: 11,
      kind: "statement",
      block: "LABORATORIO 02 · 35 MINUTOS",

      title: "Construye tu matriz SEO",
      accent: "30 KEYWORDS · TOP 12",

      body: "Añade diez palabras nuevas a las veinte anteriores. Completa intención, tipo, fuente y relevancia. Después selecciona doce keywords estratégicas y justifica por qué pueden atraer a clientes potenciales.",

      quote: "No se trata de elegir más palabras: se trata de elegir mejor.",

      note: "Tiempo: 20 minutos para completar la matriz, 10 para priorizar y 5 para revisar evidencias. La tabla editable aparece a continuación.",

      question: "¿Qué criterio utilizaste para priorizar las doce búsquedas?",
    },

    {
      id: 12,
      kind: "seo-keyword-matrix",
      block: "LABORATORIO INTERACTIVO 02",

      title: "Matriz SEO de 30 palabras clave",

      subtitle:
        "Completa tu investigación y selecciona doce keywords estratégicas",

      instructions:
        "Completa treinta keywords, evalúa su relevancia y selecciona exactamente doce prioridades. Justifica cada elección y descarga tu matriz.",
    },

    {
      id: 13,
      kind: "present",
      block: "DEFENSA · 15 MINUTOS",

      title: "Defiende tu estrategia de búsqueda",

      body: "Cada equipo presenta las principales búsquedas detectadas, explica cuáles tienen mayor valor comercial y justifica las doce keywords priorizadas.",

      quote:
        "Una estrategia profesional se defiende con criterios y evidencias.",

      question:
        "¿Qué contenido crearías primero para atraer a tus clientes y por qué?",

      note: "Si hay muchos equipos, el docente selecciona presentaciones y el resto entrega su argumentación escrita.",
    },

    {
      id: 14,
      kind: "homework",
      block: "CIERRE · 5 MINUTOS",

      title: "¿Quién compite por tus palabras clave?",

      body: "Tarea grupal: elige cinco de tus doce keywords, búscalas en Google e identifica tres competidores que aparezcan en resultados orgánicos. Registra sus sitios, la keyword asociada y cinco capturas. Redacta una conclusión comparativa.",

      note: "Entrega: PDF de 2 a 3 páginas, con tabla, cinco capturas y conclusión. Antes de la Semana 3. Formato: T2_APELLIDO_NOMBRE.pdf.",

      next: "SEMANA 03 · Benchmarking y análisis de competidores",
    },
  ],
};

export default semana02;
