const semana04 = {
  id: "contenido-semana-4",
  courseId: "contenido",
  number: 4,
  title: "Las palabras también venden café",
  subtitle: "Copywriting, voz y tono, AIDA y llamados a la acción",
  duration: 180,
  breakMinutes: 20,

  objective:
    "Aplicar técnicas de copywriting y definir un tono de voz para redactar contenidos digitales coherentes con la marca, su público objetivo y sus objetivos de comunicación.",

  challenge: "Un buen diseño atrae. Un buen mensaje da una razón para actuar.",

  schedule: [
    { time: "00–15", title: "Desafío inicial", minutes: 15 },
    { time: "15–50", title: "Fundamentos de copywriting", minutes: 35 },
    { time: "50–80", title: "Demostración docente", minutes: 30 },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio de producción", minutes: 60 },
    { time: "160–180", title: "Presentación y reflexión", minutes: 20 },
  ],

  rubric: [
    { criterion: "Definición de voz y tono de marca", points: 10 },
    { criterion: "Cinco mensajes y coherencia con la audiencia", points: 15 },
    { criterion: "Mejora de dos publicaciones anteriores", points: 10 },
    { criterion: "Nueva pieza promocional y CTA", points: 10 },
    { criterion: "Justificación de decisiones", points: 5 },
  ],

  homework: {
    title: "Tu marca debe sonar como tu marca",
    instructions: [
      "Corregir la guía de voz y tono según la retroalimentación.",
      "Crear tres publicaciones nuevas: educativa, emocional y comercial.",
      "Incluir título, texto de acompañamiento y CTA cuando corresponda.",
      "Justificar qué necesidad atiende cada publicación.",
      "Preparar una presentación de cinco diapositivas.",
      "Entregar en Moodle un PDF con la guía, las tres piezas y sus justificaciones.",
    ],
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "DISEÑO PARA GENERACIÓN DE CONTENIDO · SEMANA 04",
      title: "Un buen diseño atrae. Un buen mensaje da una razón para actuar.",
      subtitle: "Las palabras también venden café",
      body: "Hoy aprenderemos a escribir textos que informan, generan interés y persuaden sin perder la personalidad de nuestra marca.",
      image: "/images/contenido/semana04/portada.webp",
    },
    {
      id: 2,
      kind: "table",
      block: "ACTIVACIÓN · 15 MIN",
      title: "¿Cuál de estos mensajes te convence más?",
      subtitle: "Dos mensajes para un mismo producto",
      columns: ["Mensaje A", "Mensaje B"],
      rows: [
        [
          "Vendemos café de excelente calidad.",
          "Tu mañana merece algo más que café instantáneo.",
        ],
        [
          "Una afirmación genérica.",
          "Un mensaje dirigido a una situación concreta.",
        ],
      ],
      question: "¿Cuál sería más adecuado para tu Buyer Persona y por qué?",
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · COPYWRITING",
      title: "¿Qué es copywriting?",
      accent: "NO SE TRATA DE ESCRIBIR MÁS, SINO DE COMUNICAR MEJOR",
      body: "Es la escritura estratégica de mensajes destinados a generar una respuesta en una audiencia. Esa respuesta puede ser descubrir un producto, solicitar información, visitar una página o realizar una compra.",
      question:
        "¿Qué respuesta esperamos de los consumidores de nuestra marca?",
    },
    {
      id: 4,
      kind: "table",
      block: "FUNDAMENTOS · BENEFICIOS",
      title: "No hables solo de tu producto. Habla de lo que aporta.",
      columns: ["Característica", "Beneficio comunicado"],
      rows: [
        ["Café molido", "Facilita preparar café en casa"],
        ["Presentación individual", "Práctica para transportar"],
        ["Variedades de origen", "Permite explorar sabores distintos"],
      ],
      question:
        "¿Qué beneficio de tu café le importa realmente al consumidor investigado?",
    },
    {
      id: 5,
      kind: "table",
      block: "FUNDAMENTOS · VOZ Y TONO",
      title: "Si tu marca fuera una persona, ¿cómo hablaría?",
      subtitle:
        "La voz es relativamente constante; el tono se adapta a la situación.",
      columns: ["Personalidad", "Ejemplo de voz"],
      rows: [
        ["Café juvenil", "Cercana, dinámica"],
        ["Café prémium", "Sobria, sofisticada"],
        ["Café artesanal", "Cálida, auténtica"],
      ],
      note: "Actividad: reescribe «Prueba nuestro café» con tres personalidades distintas.",
    },
    {
      id: 6,
      kind: "table",
      block: "FUNDAMENTOS · MODELO AIDA",
      title: "De la atención a la acción",
      columns: ["Etapa", "Propósito"],
      rows: [
        ["A · Atención", "Una frase que detiene al lector"],
        ["I · Interés", "Una razón para seguir leyendo"],
        ["D · Deseo", "Un beneficio relevante"],
        ["A · Acción", "Una invitación concreta"],
      ],
      note: "AIDA es una estructura útil, no una fórmula que garantice ventas.",
    },
    {
      id: 7,
      kind: "statement",
      block: "FUNDAMENTOS · CTA",
      title: "¿Qué quieres que haga el consumidor?",
      accent: "UN CTA PROPONE EL SIGUIENTE PASO",
      body: "Ejemplos: descubre nuestras variedades; aprende a preparar tu café; consulta las presentaciones disponibles; conoce nuestra historia.",
      question: "¿Todos estos llamados a la acción buscan el mismo resultado?",
    },
    {
      id: 8,
      kind: "statement",
      block: "FUNDAMENTOS · ÉTICA",
      title: "Persuadir no significa engañar",
      accent: "CLARIDAD · RELEVANCIA · CREDIBILIDAD",
      body: "Evitamos promesas falsas, testimonios inventados, beneficios no comprobados y urgencias ficticias.",
      note: "No afirmaremos que nuestro café mejora la concentración sin evidencia suficiente.",
    },
    {
      id: 9,
      kind: "statement",
      block: "DEMOSTRACIÓN · CAFÉ RAÍZ",
      title: "De una necesidad a un mensaje",
      accent: "EL BENEFICIO DEBE SER RELEVANTE",
      body: "Consumidor: persona que quiere preparar café artesanal en casa. Necesidad: aprender de manera sencilla. Mensaje inicial: «Vendemos café artesanal». Mensaje mejorado: «Tu primera taza de café artesanal puede empezar en casa. Descubre cómo prepararla paso a paso».",
      question: "¿Qué hace más útil el segundo mensaje?",
      image: "/images/contenido/semana04/cafe-raiz.webp",
    },
    {
      id: 10,
      kind: "table",
      block: "DEMOSTRACIÓN · AIDA",
      title: "Construyamos un mensaje paso a paso",
      columns: ["Etapa", "Ejemplo"],
      rows: [
        ["Atención", "¿Tu café siempre sabe diferente?"],
        ["Interés", "La proporción de agua puede influir en el resultado."],
        ["Deseo", "Aprende una receta sencilla para comenzar."],
        ["Acción", "Descubre nuestra guía de preparación."],
      ],
      note: "El docente redacta el texto en vivo y explica cada decisión.",
    },
    {
      id: 11,
      kind: "statement",
      block: "DEMOSTRACIÓN · PRODUCCIÓN",
      title: "El texto también forma parte del diseño",
      accent: "TÍTULO + MENSAJE + CTA + TEXTO DE ACOMPAÑAMIENTO",
      body: "Título: ¿Preparas café en casa? Mensaje: descubre una forma sencilla de empezar. CTA: conoce nuestra guía. El texto de acompañamiento amplía el valor sin repetir todo lo que aparece en la imagen.",
      note: "Recupera una publicación de la Semana 3 y mejora su redacción.",
      image: "/images/contenido/semana04/copy-diseno.webp",
    },
    {
      id: 12,
      kind: "content-copywriting-lab",
      block: "LABORATORIO 04 · 60 MIN",
      title: "Dale voz a tu café",
      subtitle:
        "Define la voz de marca, escribe cinco mensajes, mejora dos publicaciones y crea una pieza promocional.",
    },
    {
      id: 13,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "No me digas que tu mensaje es bonito. Dime por qué funcionaría.",
      body: "Cada equipo presenta uno de sus mensajes y explica qué necesidad atiende, cómo refleja la personalidad de la marca y qué respuesta espera conseguir.",
      quote: "Una decisión creativa debe poder justificarse.",
    },
    {
      id: 14,
      kind: "questions",
      block: "REFLEXIÓN · 5 MIN",
      title: "¿Qué cambió en nuestra comunicación?",
      questions: [
        "¿Qué diferencia existe entre escribir y hacer copywriting?",
        "¿Cómo influye el Buyer Persona en las palabras elegidas?",
        "¿Qué mensaje mejoramos y por qué?",
        "¿Qué CTA sería más adecuado para nuestra marca?",
      ],
    },
    {
      id: 15,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO · SEMANA 04",
      title: "Tu marca debe sonar como tu marca",
      body: "Corrige la guía de voz y tono. Crea tres publicaciones nuevas: una educativa, una emocional y una comercial.",
      note: "Incluye título, texto, CTA, necesidad atendida y justificación. Entrega un PDF en Moodle y prepara cinco diapositivas.",
      next: "SEMANA 05 · Tipos y formatos de contenido digital.",
    },
  ],
};

export default semana04;
