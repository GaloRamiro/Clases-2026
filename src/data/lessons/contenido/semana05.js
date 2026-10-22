const semana05 = {
  id: "contenido-semana-5",
  courseId: "contenido",
  number: 5,
  title: "Una idea. Diferentes formas de contarla.",
  subtitle: "Tipos y formatos de contenido digital",
  duration: 180,

  objective:
    "Seleccionar y adaptar formatos de contenido digital según el objetivo de comunicación, el público y la plataforma, produciendo piezas coherentes con la marca de café.",

  challenge:
    "Una misma idea puede convertirse en publicación, carrusel, historia o video. ¿Cómo elegimos el formato adecuado?",

  schedule: [
    { time: "00–15", title: "Una idea, cuatro formatos", minutes: 15 },
    { time: "15–50", title: "Tipos y formatos digitales", minutes: 35 },
    { time: "50–80", title: "Demostración con Café Raíz", minutes: 30 },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio de producción", minutes: 60 },
    { time: "160–180", title: "Presentación y reflexión", minutes: 20 },
  ],

  rubric: [
    { criterion: "Mensaje central y justificación", points: 5 },
    { criterion: "Carrusel de cinco láminas", points: 15 },
    { criterion: "Historia digital e interacción", points: 10 },
    { criterion: "Guion de Reel", points: 10 },
    { criterion: "Coherencia con Buyer Persona y tono", points: 5 },
    { criterion: "Argumentación y presentación", points: 5 },
  ],

  homework: {
    title: "Construye tu primer mini paquete de contenidos",
    instructions: [
      "Corregir el carrusel de cinco láminas.",
      "Mejorar la historia y su interacción.",
      "Perfeccionar el guion técnico del Reel.",
      "Crear una segunda historia con otro objetivo.",
      "Crear una publicación estática adicional.",
      "Justificar cómo se complementan las cinco propuestas.",
      "Entregar un PDF en Moodle y una presentación de cinco diapositivas.",
    ],
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "UNIDAD 1 · SEMANA 05",
      title: "No todo se comunica con una sola imagen.",
      subtitle: "Una idea. Diferentes formas de contarla.",
      body: "Una idea puede convertirse en una publicación, un carrusel, una historia o un video. ¿Cómo sabemos cuál utilizar?",
    },
    {
      id: 2,
      kind: "table",
      block: "ACTIVACIÓN · 15 MIN",
      title: "Un mensaje. Cuatro posibilidades.",
      subtitle: "Idea: aprende a preparar un buen café en casa.",
      columns: ["Formato", "Adaptación"],
      rows: [
        ["Publicación", "Una recomendación breve"],
        ["Carrusel", "Cinco pasos explicados"],
        ["Historia", "Una pregunta interactiva"],
        ["Reel", "Una demostración audiovisual"],
      ],
      question:
        "Cada equipo elige un formato y justifica su decisión en un minuto.",
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · CONCEPTOS",
      title: "Tipo de contenido no es lo mismo que formato.",
      accent: "INTENCIÓN ≠ PRESENTACIÓN",
      body: "El tipo responde a la intención: educar, entretener, inspirar, informar o promocionar. El formato es la manera de presentar el mensaje: imagen, carrusel, historia, video o audio.",
      question:
        "¿Puede una idea educativa convertirse en carrusel y también en video?",
    },
    {
      id: 4,
      kind: "statement",
      block: "FUNDAMENTOS · PUBLICACIÓN ESTÁTICA",
      title: "Una idea clara en una sola pieza.",
      accent: "MENSAJE DIRECTO",
      body: "Sirve para comunicar una idea principal de manera visual y breve. Por ejemplo, presentar una variedad de café o destacar un beneficio.",
      question: "¿Cuándo sería innecesario utilizar cinco láminas?",
    },
    {
      id: 5,
      kind: "statement",
      block: "FUNDAMENTOS · CARRUSEL",
      title: "Una historia que avanza en cada lámina.",
      accent: "SECUENCIA + UTILIDAD",
      body: "Permite desarrollar explicaciones, comparaciones y procesos. Ejemplo: cinco errores al preparar café y cómo evitarlos. Cada lámina debe aportar información nueva.",
      question: "¿Qué sucede si las cinco láminas repiten el mismo mensaje?",
    },
    {
      id: 6,
      kind: "statement",
      block: "FUNDAMENTOS · HISTORIAS",
      title: "Contenido breve para una interacción concreta.",
      accent: "UNA IDEA + UNA INTERACCIÓN",
      body: "Las historias permiten compartir novedades, plantear preguntas y estimular respuestas. Ejemplo: ¿prefieres café frío o caliente? Utiliza una encuesta para conocer preferencias.",
      question: "¿Qué pregunta harías a tu Buyer Persona?",
    },
    {
      id: 7,
      kind: "statement",
      block: "FUNDAMENTOS · VIDEO CORTO",
      title: "Cuando el movimiento ayuda a contar la idea.",
      accent: "DEMOSTRAR · EXPLICAR · CONECTAR",
      body: "El video es útil para mostrar procesos, experiencias y acciones. Ejemplo: preparar un café frío en 20 segundos. No todo mensaje necesita movimiento.",
      question:
        "¿Qué ganamos al mostrar una preparación en lugar de describirla?",
    },
    {
      id: 8,
      kind: "questions",
      block: "FUNDAMENTOS · DECISIÓN ESTRATÉGICA",
      title: "No elijas el formato por moda.",
      questions: [
        "¿Qué quiero conseguir?",
        "¿Qué necesita mi consumidor?",
        "¿Qué formato explica mejor la idea?",
        "¿En qué plataforma se publicará?",
        "¿Qué recursos necesito para producirlo?",
      ],
    },
    {
      id: 9,
      kind: "table",
      block: "DEMOSTRACIÓN · CAFÉ RAÍZ",
      title: "Transformemos una idea en un carrusel.",
      subtitle: "Cómo empezar a preparar café artesanal en casa.",
      columns: ["Lámina", "Contenido"],
      rows: [
        ["01 · Portada", "Tu primera taza de café artesanal"],
        ["02 · Problema", "¿Por qué tu café no sabe como esperabas?"],
        ["03 · Consejo", "Cuida la proporción de agua y café"],
        ["04 · Aplicación", "Prueba y ajusta la receta a tu gusto"],
        ["05 · Cierre", "Guarda estos consejos para tu próxima taza"],
      ],
    },
    {
      id: 10,
      kind: "statement",
      block: "DEMOSTRACIÓN · HISTORIA",
      title: "La misma idea, pero en una historia.",
      accent: "ADAPTAR NO ES COPIAR",
      body: "Mensaje: ¿sabes qué influye en el sabor de tu café? Interacción: una encuesta sobre la preparación. Cierre: invitación a consultar el carrusel educativo.",
      question: "¿Qué cambió entre el carrusel y la historia?",
    },
    {
      id: 11,
      kind: "table",
      block: "DEMOSTRACIÓN · REEL",
      title: "Antes de grabar, planifica.",
      columns: ["Tiempo", "Imagen", "Mensaje"],
      rows: [
        ["0–3 s", "Café servido", "¿Tu café sabe diferente cada día?"],
        ["3–8 s", "Medición", "Revisa la proporción"],
        ["8–15 s", "Preparación", "Sigue un proceso sencillo"],
        ["15–20 s", "Taza terminada", "Guarda esta idea"],
      ],
      note: "El resultado es un guion de 20 segundos. Todavía no grabaremos.",
    },
    {
      id: 12,
      kind: "content-formats-lab",
      block: "LABORATORIO 05 · 60 MIN",
      title: "Una idea, tres formatos.",
      subtitle:
        "Produce un carrusel, una historia interactiva y un guion de Reel.",
    },
    {
      id: 13,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "¿Por qué elegiste ese formato?",
      body: "Cada equipo muestra su carrusel, historia y guion. Explica qué necesidad atiende cada pieza, cómo adaptó el mensaje y qué respuesta espera.",
      quote:
        "¿Qué perderíamos si intentáramos comunicar todo con una sola imagen?",
    },
    {
      id: 14,
      kind: "questions",
      block: "REFLEXIÓN · 5 MIN",
      title: "¿Qué aprendimos hoy?",
      questions: [
        "¿Qué diferencia existe entre tipo y formato?",
        "¿Por qué no todos los mensajes necesitan video?",
        "¿Qué formato fue más difícil de producir?",
        "¿Cómo cambió el mensaje al adaptarlo?",
        "¿Qué mejoraríamos de nuestras piezas?",
      ],
    },
    {
      id: 15,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO",
      title: "Construye tu primer mini paquete de contenidos.",
      body: "Corrige el carrusel, mejora la historia, perfecciona el guion del Reel y crea una segunda historia y una publicación estática.",
      note: "Entrega en Moodle un PDF con las piezas, objetivos y justificaciones, además de una presentación de cinco diapositivas.",
      next: "SEMANA 06 · Brief creativo e inteligencia artificial.",
    },
  ],
};

export default semana05;
