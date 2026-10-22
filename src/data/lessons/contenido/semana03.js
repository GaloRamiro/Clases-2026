const semana03 = {
  id: "contenido-semana-3",
  courseId: "contenido",
  number: 3,
  title: "No vendemos café. Resolvemos necesidades.",
  subtitle: "Design Thinking, empatía y contenido centrado en las personas",
  duration: 180,
  breakMinutes: 20,

  objective:
    "Aplicar principios de Design Thinking y empatía para identificar necesidades del consumidor, construir un mapa de empatía y transformar los hallazgos en una propuesta de contenido digital para la marca de café.",

  challenge:
    "Tu cliente no necesita otra publicación. Necesita una razón para prestarte atención.",

  schedule: [
    { time: "00–15", title: "Desafío y conexión", minutes: 15 },
    { time: "15–50", title: "Design Thinking y empatía", minutes: 35 },
    { time: "50–80", title: "Demostración del docente", minutes: 30 },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio grupal", minutes: 60 },
    { time: "160–180", title: "Presentación y reflexión", minutes: 20 },
  ],

  labSteps: [
    {
      title: "Construir el mapa de empatía",
      minutes: 10,
      instruction:
        "Organizar lo que el consumidor piensa, siente, ve, oye, dice y hace, además de sus esfuerzos y resultados esperados.",
    },
    {
      title: "Priorizar una necesidad",
      minutes: 10,
      instruction:
        "Seleccionar una necesidad relevante, distinguir evidencia de hipótesis y redactar el problema.",
    },
    {
      title: "Idear contenidos",
      minutes: 10,
      instruction:
        "Proponer tres ideas de contenido y elegir la que mejor responda a la necesidad.",
    },
    {
      title: "Crear la publicación",
      minutes: 20,
      instruction:
        "Diseñar una publicación estática con mensaje claro, jerarquía visual y coherencia con la marca.",
    },
    {
      title: "Justificar decisiones",
      minutes: 5,
      instruction:
        "Explicar cómo el mensaje y el formato responden al consumidor.",
    },
    {
      title: "Preparar la entrega",
      minutes: 5,
      instruction:
        "Comprobar evidencias, revisar la publicación y preparar la defensa.",
    },
  ],

  rubric: [
    { criterion: "Mapa de empatía y evidencias", points: 10 },
    { criterion: "Necesidad prioritaria", points: 10 },
    { criterion: "Relación entre necesidad e idea", points: 10 },
    { criterion: "Calidad y claridad de la publicación", points: 15 },
    { criterion: "Justificación de decisiones", points: 5 },
  ],

  homework: {
    title: "Trabajo autónomo 3 — Tres necesidades, tres mensajes",
    delivery: "T3_APELLIDO_NOMBRE.pdf",
    instructions: [
      "Revisar y corregir el mapa de empatía con la retroalimentación recibida.",
      "Identificar tres necesidades o motivaciones del Buyer Persona.",
      "Crear dos publicaciones digitales adicionales, diferentes de la realizada en clase.",
      "Redactar el texto que acompañaría a cada publicación.",
      "Justificar el público, el objetivo y el mensaje de cada pieza.",
      "Entregar un PDF con el mapa actualizado, las dos publicaciones y sus justificaciones.",
      "Preparar una presentación de cinco diapositivas para explicar los avances.",
    ],
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "DISEÑO PARA GENERACIÓN DE CONTENIDO · SEMANA 03",
      title: "Tu cliente no necesita otra publicación",
      subtitle: "Necesita una razón para prestarte atención",
      body: "No vendemos café. Resolvemos necesidades. Hoy aprenderemos a comprender al consumidor antes de diseñar contenido.",
      image: "/images/contenido/semana03/portada.webp",
    },
    {
      id: 2,
      kind: "statement",
      block: "CONEXIÓN CON SEMANA 2 · 15 MIN",
      title: "¿Qué descubrimos sobre nuestro consumidor?",
      accent: "UN BUYER PERSONA ES EL PUNTO DE PARTIDA",
      body: "En la Semana 2 investigamos a nuestra audiencia y construimos un Buyer Persona. Ahora utilizaremos esa información para comprender sus problemas, emociones y necesidades.",
      question:
        "¿Lo que descubrimos está respaldado por entrevistas o es una suposición del equipo?",
      note: "Cada equipo comparte un hallazgo de sus entrevistas o comentarios investigados.",
      image: "/images/contenido/semana03/conexion.webp",
    },
    {
      id: 3,
      kind: "table",
      block: "DESIGN THINKING · 10 MIN",
      title: "Primero entendemos. Después creamos.",
      subtitle:
        "Design Thinking es un enfoque de resolución de problemas centrado en las personas.",
      columns: ["Etapa", "Pregunta principal", "Aplicación"],
      rows: [
        [
          "Empatizar",
          "¿A quién queremos comprender?",
          "Investigar al consumidor",
        ],
        ["Definir", "¿Qué necesita resolver?", "Delimitar el problema"],
        [
          "Idear",
          "¿Qué soluciones podemos proponer?",
          "Crear ideas de contenido",
        ],
        [
          "Prototipar",
          "¿Cómo se vería nuestra solución?",
          "Diseñar una publicación",
        ],
        [
          "Probar",
          "¿Funciona para nuestro público?",
          "Recibir retroalimentación",
        ],
      ],
      note: "Una publicación atractiva no es suficiente si no responde a una necesidad.",
    },
    {
      id: 4,
      kind: "statement",
      block: "EMPATÍA · 5 MIN",
      title: "Empatizar no es adivinar",
      accent: "COMPRENDER ANTES DE INTERPRETAR",
      body: "Empatizar implica comprender la experiencia del consumidor desde su perspectiva. Podemos investigar lo que expresa, hace, necesita y le preocupa.",
      quote: "Tengo poco tiempo para desayunar antes de ir a clases.",
      question: "¿Qué necesidad podría existir detrás de esta afirmación?",
      note: "Distingue lo que dijo la persona de la interpretación del equipo.",
      image: "/images/contenido/semana03/empatia.webp",
    },
    {
      id: 5,
      kind: "table",
      block: "MAPA DE EMPATÍA · 10 MIN",
      title: "Una herramienta para entender a las personas",
      subtitle:
        "El mapa de empatía organiza observaciones e hipótesis sobre la experiencia del consumidor.",
      columns: ["Dimensión", "Qué investigamos"],
      rows: [
        ["Piensa y siente", "Preocupaciones, deseos y motivaciones"],
        ["Ve", "Situaciones, marcas y estímulos de su entorno"],
        ["Oye", "Opiniones y recomendaciones que recibe"],
        ["Dice y hace", "Expresiones y comportamientos observables"],
        ["Esfuerzos", "Problemas, frustraciones y obstáculos"],
        ["Resultados", "Beneficios y logros que busca"],
      ],
      note: "Cada afirmación debe identificarse como evidencia, interpretación o hipótesis.",
    },
    {
      id: 6,
      kind: "statement",
      block: "INSIGHTS · 5 MIN",
      title: "Una observación puede revelar una oportunidad",
      accent: "OBSERVACIÓN → NECESIDAD → CONTENIDO",
      body: "Observación: Quiero preparar café en casa, pero no sé cuánto utilizar. Necesidad: instrucciones sencillas y confiables. Oportunidad: contenido educativo. Idea: Tres pasos para preparar tu primera taza.",
      question:
        "¿Qué diferencia existe entre una observación y una propuesta de contenido?",
      image: "/images/contenido/semana03/insights.webp",
    },
    {
      id: 7,
      kind: "statement",
      block: "DEFINIR · 5 MIN",
      title: "Un problema bien definido orienta la creatividad",
      accent: "CONSUMIDOR + NECESIDAD + RAZÓN",
      body: "Utiliza esta estructura: [Tipo de consumidor] necesita [necesidad] porque [razón identificada].",
      quote:
        "Los estudiantes con poco tiempo necesitan opciones prácticas para preparar café porque sus rutinas dificultan dedicar tiempo al desayuno.",
      note: "El ejemplo es una hipótesis de trabajo, no un hallazgo validado.",
    },
    {
      id: 8,
      kind: "statement",
      block: "IDEACIÓN · 5 MIN",
      title: "Una necesidad puede generar varias ideas",
      accent: "NO ELEGIMOS EL FORMATO POR MODA",
      body: "Para una persona que quiere aprender a preparar café podemos proponer un carrusel educativo, un tutorial, una infografía, una publicación con consejos o una guía descargable.",
      question:
        "¿Qué formato resolvería mejor la necesidad con los recursos disponibles?",
      note: "Hoy crearemos una publicación estática como primer prototipo.",
      image: "/images/contenido/semana03/ideacion.webp",
    },
    {
      id: 9,
      kind: "statement",
      block: "DEMOSTRACIÓN · 15 MIN",
      title: "Café Raíz: de una persona a una necesidad",
      accent: "INVESTIGAR → COMPRENDER → PROPONER",
      body: "Marca de ejemplo: Café Raíz. Consumidor: persona interesada en preparar café artesanal en casa. Problema: desconoce las proporciones y pasos básicos. Necesidad: una explicación sencilla. Oportunidad: contenido educativo para principiantes.",
      note: "El docente completa un mapa de empatía con datos hipotéticos e identifica qué afirmaciones necesitan validación.",
      image: "/images/contenido/semana03/cafe-raiz.webp",
    },
    {
      id: 10,
      kind: "statement",
      block: "DEMOSTRACIÓN · 10 MIN",
      title: "Convirtamos la necesidad en una publicación",
      accent: "TU PRIMERA TAZA DE CAFÉ EN CASA",
      body: "Mensaje: empieza con una receta sencilla y ajusta el sabor a tu gusto. Objetivo: atraer a personas que desean aprender. Estrategia: PULL. Formato: publicación vertical para Instagram.",
      question:
        "¿Qué parte de esta publicación responde directamente a la necesidad del consumidor?",
      image: "/images/contenido/semana03/primera-publicacion.webp",
    },
    {
      id: 11,
      kind: "statement",
      block: "CRITERIO VISUAL · 5 MIN",
      title: "Diseñar es organizar un mensaje",
      accent: "CLARIDAD ANTES QUE DECORACIÓN",
      body: "Cuida un mensaje principal claro, jerarquía visual, imagen relacionada con el contenido, texto breve y legible, y coherencia con el concepto de marca.",
      note: "No se exige todavía un logotipo final ni una paleta cromática definitiva. Se puede trabajar en Canva gratuito, Google Slides o PowerPoint.",
      image: "/images/contenido/semana03/criterio-visual.webp",
    },
    {
      id: 12,
      kind: "content-empathy-lab",
      block: "LABORATORIO 03 · 60 MIN",
      title: "Del consumidor al contenido",
      subtitle:
        "Construye el mapa de empatía, prioriza una necesidad y crea tu primera publicación digital.",
    },
    {
      id: 13,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "No me muestres solo el diseño. Explícame por qué existe.",
      body: "Cada equipo presenta la necesidad identificada, la evidencia disponible, la idea seleccionada y el resultado que espera conseguir con su publicación.",
      quote:
        "Una decisión creativa debe poder justificarse desde las necesidades del consumidor.",
      image: "/images/contenido/semana03/presentacion.webp",
    },
    {
      id: 14,
      kind: "questions",
      block: "REFLEXIÓN · 5 MIN",
      title: "¿Qué aprendimos realmente?",
      questions: [
        "¿Qué cambió al pensar primero en el consumidor?",
        "¿Qué diferencia existe entre crear algo atractivo y crear algo útil?",
        "¿Qué mejoraríamos de nuestra primera publicación?",
        "¿Qué información todavía necesitamos investigar?",
      ],
    },
    {
      id: 15,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO 03",
      title: "Tres necesidades. Tres mensajes.",
      body: "Actualiza el mapa de empatía, identifica tres necesidades del consumidor y crea dos publicaciones digitales adicionales con sus textos y justificaciones.",
      note: "Entrega en Moodle un PDF con el mapa actualizado y las dos publicaciones nuevas. Prepara también una presentación de cinco diapositivas.",
      next: "SEMANA 04 · Copywriting, tono de voz y mensajes persuasivos.",
      image: "/images/contenido/semana03/tarea.webp",
    },
  ],
};

export default semana03;
