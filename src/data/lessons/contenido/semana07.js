const semana07 = {
  id: "contenido-semana-7",
  courseId: "contenido",
  number: 7,
  title: "No cuentes qué vendes. Cuenta una historia que importe.",
  subtitle: "Storytelling, benchmarking y narrativa audiovisual",
  duration: 180,

  objective:
    "Aplicar técnicas de storytelling y benchmarking creativo para construir una narrativa coherente con la identidad de una marca y producir un microvideo publicitario que comunique una idea mediante recursos audiovisuales.",

  challenge:
    "Si tu marca fuera una historia, ¿qué contaría en solo siete segundos?",

  schedule: [
    { time: "00–15", title: "¿Qué hace memorable una historia?", minutes: 15 },
    {
      time: "15–50",
      title: "Storytelling, benchmarking y narrativa",
      minutes: 35,
    },
    { time: "50–80", title: "Demostración audiovisual", minutes: 30 },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio de microvideo", minutes: 60 },
    { time: "160–180", title: "Proyección y reflexión", minutes: 20 },
  ],

  rubric: [
    { criterion: "Benchmarking de tres marcas", points: 10 },
    { criterion: "Historia y coherencia con la marca", points: 10 },
    { criterion: "Storyboard y planificación", points: 10 },
    { criterion: "Microvideo de siete segundos", points: 15 },
    { criterion: "Presentación y justificación", points: 5 },
  ],

  homework: {
    title: "Tu historia no termina en siete segundos",
    instructions: [
      "Corregir el microvideo de siete segundos según la retroalimentación.",
      "Producir una segunda versión de quince segundos.",
      "Incorporar un mensaje final coherente con la voz de marca.",
      "Investigar cinco referencias visuales.",
      "Crear un moodboard preliminar de color, fotografía y tipografía.",
      "Preparar una presentación de cinco diapositivas.",
      "Entregar PDF, videos MP4 y presentación en Moodle.",
    ],
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "UNIDAD 2 · SEMANA 07",
      title: "Si tu marca fuera una historia, ¿qué contaría?",
      subtitle: "No cuentes qué vendes. Cuenta una historia que importe.",
      body: "Una marca no se construye únicamente mostrando productos. También comunica experiencias, valores y emociones.",
    },
    {
      id: 2,
      kind: "table",
      block: "ACTIVACIÓN · 15 MIN",
      title: "Dos videos. Un mismo producto.",
      subtitle: "¿Cuál comunica mejor una historia?",
      columns: ["Video A", "Video B"],
      rows: [
        [
          "Una taza de café girando frente a una cámara.",
          "Una persona cansada prepara café y sonríe al tomar el primer sorbo.",
        ],
      ],
      question:
        "¿Qué emoción genera cada video? Justifica cuál utilizarías para tu marca.",
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · STORYTELLING",
      title: "Contar una historia es construir significado.",
      accent: "NO SOLO PRODUCTOS. EXPERIENCIAS.",
      body: "El storytelling organiza acontecimientos, personajes y emociones para transmitir un mensaje. En marketing permite generar identificación, explicar el valor de una marca y comunicar experiencias.",
      question:
        "¿Qué momento de la vida de tu consumidor podría representar tu café?",
    },
    {
      id: 4,
      kind: "table",
      block: "FUNDAMENTOS · NARRATIVA",
      title: "Toda historia necesita una transformación.",
      columns: ["Etapa", "Función", "Ejemplo"],
      rows: [
        ["01 · Inicio", "Presenta una situación", "Una mañana apresurada"],
        ["02 · Cambio", "Algo ocurre", "Preparación del café"],
        ["03 · Resultado", "Muestra una consecuencia", "Momento de disfrute"],
      ],
      question: "¿Cómo contarías esta transformación sin utilizar diálogos?",
    },
    {
      id: 5,
      kind: "table",
      block: "FUNDAMENTOS · EMOCIONES",
      title: "¿Qué queremos que sienta el espectador?",
      columns: ["Emoción", "Posible narrativa"],
      rows: [
        ["Tranquilidad", "Un momento de pausa"],
        ["Energía", "El inicio de una jornada"],
        ["Nostalgia", "Un recuerdo familiar"],
        ["Curiosidad", "Descubrir un sabor nuevo"],
        ["Pertenencia", "Compartir café con amigos"],
      ],
      question:
        "Selecciona una emoción relacionada con el concepto de campaña de la Semana 6.",
    },
    {
      id: 6,
      kind: "statement",
      block: "FUNDAMENTOS · BENCHMARKING",
      title: "Investigar a otras marcas no es copiarlas.",
      accent: "OBSERVAR · ANALIZAR · DIFERENCIAR",
      body: "El benchmarking creativo permite estudiar referentes para identificar historias, emociones, públicos, recursos visuales y oportunidades de mejora. Su finalidad es tomar decisiones informadas sin reproducir el trabajo de otras marcas.",
      question:
        "¿Qué puedes aprender de un competidor sin imitar su contenido?",
    },
    {
      id: 7,
      kind: "table",
      block: "FUNDAMENTOS · LENGUAJE AUDIOVISUAL",
      title: "La cámara también comunica.",
      columns: ["Plano", "Función", "Ejemplo"],
      rows: [
        ["Plano general", "Presenta el contexto", "Persona en una cocina"],
        ["Plano medio", "Muestra una acción", "Preparación del café"],
        ["Primer plano", "Destaca detalles", "Café cayendo en la taza"],
      ],
      question:
        "¿Qué plano elegirías para transmitir una experiencia sensorial?",
    },
    {
      id: 8,
      kind: "statement",
      block: "FUNDAMENTOS · MICROVIDEO",
      title: "Si solo tienes siete segundos, cada plano importa.",
      accent: "UNA IDEA. POCOS PLANOS. UN MENSAJE.",
      body: "Un microvideo requiere síntesis, claridad, una acción visual comprensible, ritmo adecuado y un cierre reconocible. Elimina los elementos que no aporten a la historia.",
      question: "¿Qué información podrías eliminar sin perder el mensaje?",
    },
    {
      id: 9,
      kind: "table",
      block: "FUNDAMENTOS · STORYBOARD",
      title: "Antes de grabar, visualiza la historia.",
      columns: ["Plano", "Función"],
      rows: [
        ["Plano 1", "Situación inicial"],
        ["Plano 2", "Acción principal"],
        ["Plano 3", "Resultado y marca"],
      ],
      question:
        "¿Qué necesita saber una persona para grabar una escena que tú planificaste?",
    },
    {
      id: 10,
      kind: "table",
      block: "DEMOSTRACIÓN · CAFÉ RAÍZ",
      title: "Construyamos una historia en siete segundos.",
      subtitle: "Concepto: Cada taza tiene una historia.",
      columns: ["Tiempo", "Imagen", "Función"],
      rows: [
        ["0–2 s", "Persona comienza a preparar café", "Situación"],
        ["2–5 s", "Agua y café durante la preparación", "Acción"],
        ["5–7 s", "Taza terminada y gesto de disfrute", "Resultado"],
      ],
      note: "Emoción: tranquilidad. Mensaje: preparar café puede convertirse en un ritual personal.",
    },
    {
      id: 11,
      kind: "questions",
      block: "DEMOSTRACIÓN · GRABACIÓN",
      title: "No necesitas una cámara profesional.",
      questions: [
        "Prepara una escena sencilla.",
        "Utiliza la luz disponible.",
        "Mantén estable el teléfono.",
        "Graba tres planos breves.",
        "Revisa el enfoque y la exposición.",
        "Utiliza formato vertical 9:16.",
      ],
    },
    {
      id: 12,
      kind: "table",
      block: "DEMOSTRACIÓN · EDICIÓN",
      title: "Siete segundos también necesitan edición.",
      columns: ["Tiempo", "Contenido"],
      rows: [
        ["0–2 s", "Situación inicial"],
        ["2–5 s", "Acción principal"],
        ["5–7 s", "Resultado y cierre"],
      ],
      note: "Recorta los clips, ordena la historia, revisa el ritmo y exporta un MP4 vertical. Utiliza música únicamente con permiso.",
    },
    {
      id: 13,
      kind: "content-storytelling-lab",
      block: "LABORATORIO 07 · 60 MIN",
      title: "Tu marca en siete segundos.",
      subtitle: "Benchmarking, historia, storyboard, grabación y edición.",
    },
    {
      id: 14,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "Si quitamos el logotipo, ¿tu video comunica la idea?",
      body: "Cada equipo proyecta su video, explica la historia, emoción, referentes, selección de planos y posibles mejoras.",
      quote:
        "Primero, los compañeros identifican el mensaje percibido. Después, el equipo explica su intención.",
    },
    {
      id: 15,
      kind: "questions",
      block: "REFLEXIÓN · 5 MIN",
      title: "¿Qué aprendimos hoy?",
      questions: [
        "¿Qué diferencia existe entre mostrar un producto y contar una historia?",
        "¿Cómo ayuda el benchmarking a tomar decisiones?",
        "¿Qué comunica un plano sin palabras?",
        "¿Qué fue lo más difícil de resolver en siete segundos?",
      ],
    },
    {
      id: 16,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO",
      title: "Tu historia no termina en siete segundos.",
      body: "Mejora tu video de siete segundos, crea una versión de quince segundos y prepara un moodboard con cinco referencias visuales.",
      note: "Entrega en Moodle un PDF con benchmarking, historia, storyboard y moodboard; dos videos MP4 y una presentación de cinco diapositivas.",
      next: "SEMANA 08 · Identidad visual de nuestra marca de café.",
    },
  ],
};

export default semana07;
