/**
 * AULA DIGITAL
 * Asignatura: Diseño para Generación de Contenido
 * Semana 01: El nacimiento de una marca de café
 *
 * Las imágenes se colocan en:
 * public/images/contenido/semana01/
 *
 * Este archivo contiene únicamente información académica.
 * La presentación visual se controla desde LessonContent.jsx.
 */



const IMAGE_PATH = "/images/contenido/semana01/";

const semana01 = {
  id: "contenido-semana-1",
  courseId: "contenido",
  number: 1,

  title: "El nacimiento de una marca de café",
  subtitle: "Plataformas digitales y estrategias PUSH y PULL",

  unit: "Unidad 1 — Introducción a la creación digital",
  duration: 180,
  breakMinutes: 20,

  objective:
    "Comprender por qué una marca necesita una estrategia de comunicación, " +
    "cómo seleccionar plataformas digitales y cuándo aplicar PUSH y PULL.",

  challenge:
    "Si todos venden el mismo café, ¿por qué un consumidor elegiría una marca y no otra?",

  methodology:
    "Aprendizaje basado en proyectos, análisis de casos, demostración docente, " +
    "trabajo colaborativo y defensa de decisiones estratégicas.",

  // DISTRIBUCIÓN DE LOS 180 MINUTOS

  schedule: [
    {
      time: "00–15",
      title: "Introducción y reflexión inicial",
      minutes: 15,
    },
    {
      time: "15–50",
      title: "Fundamentos estratégicos y ejemplos",
      minutes: 35,
    },
    {
      time: "50–80",
      title: "Demostración aplicada a una marca de café",
      minutes: 30,
    },
    {
      time: "80–100",
      title: "Descanso",
      minutes: 20,
    },
    {
      time: "100–160",
      title: "Taller práctico de los estudiantes",
      minutes: 60,
    },
    {
      time: "160–180",
      title: "Presentaciones, reflexión y evaluación",
      minutes: 20,
    },
  ],

  // PLATAFORMAS DISPONIBLES EN EL TALLER

  platforms: [
    {
      name: "Instagram",
      purpose:
        "Construir identidad visual, mostrar productos y desarrollar comunidad.",
      formats: ["Reels", "Carruseles", "Historias"],
    },
    {
      name: "TikTok",
      purpose:
        "Generar descubrimiento mediante videos cortos y contenido creativo.",
      formats: ["Videos cortos", "Tutoriales", "Demostraciones"],
    },
    {
      name: "Facebook",
      purpose:
        "Informar, conectar con comunidades y comunicar propuestas comerciales.",
      formats: ["Publicaciones", "Videos", "Grupos"],
    },
    {
      name: "YouTube",
      purpose:
        "Profundizar en temas educativos, demostraciones y experiencias.",
      formats: ["Tutoriales", "Videos largos", "Shorts"],
    },
    {
      name: "Sitio web",
      purpose:
        "Centralizar información, mostrar productos y facilitar consultas.",
      formats: ["Páginas de producto", "Artículos", "Formularios"],
    },
  ],

  // 14 DIAPOSITIVAS

  slides: [
    {
      id: "01",
      kind: "cover",
      block: "BLOQUE A · INTRODUCCIÓN",

      title: "EL NACIMIENTO DE UNA MARCA DE CAFÉ",

      subtitle: "Un mismo producto. Diferentes formas de competir.",

      body:
        "Hoy aprenderemos por qué una marca necesita diferenciarse " +
        "y cómo empezar a comunicar su propuesta en plataformas digitales.",

      image: "/public/images/contenido/portada-cafe.png",

      imageHint:
        "Fotografía publicitaria horizontal de una taza de café, " +
        "granos tostados y luz cálida. Dejar espacio negativo para composición.",

      teacherNote:
        "Presentar el desafío de la clase. No comenzar con definiciones: " +
        "primero despertar curiosidad sobre la competencia entre marcas.",
    },

    {
      id: "02",
      kind: "brands",
      block: "BLOQUE A · REFLEXIÓN",

      title: "¿POR QUÉ ELEGIMOS UNA MARCA Y NO OTRA?",

      subtitle:
        "Observa tres maneras diferentes de presentar un mismo producto.",

      brands: [
        {
          name: "ARTESANAL",
          detail: "Tradición, origen y proceso.",
          image: "/public/images/contenido/Café Artesanal en Luz Dorada.png",
          hint:
            "Empaque artesanal de café, materiales naturales, " +
            "colores tierra y fotografía editorial.",
        },
        {
          name: "PRÉMIUM",
          detail: "Exclusividad, calidad y experiencia.",
          image: "/public/images/contenido/Café premium en ambiente oscuro.png",
          hint:
            "Empaque de café de lujo, composición minimalista, " +
            "colores oscuros y acabado elegante.",
        },
        {
          name: "JUVENIL",
          detail: "Accesibilidad, energía y personalidad.",
          image: "/public/images/contenido/Latte helado en cafetería acogedora.png",
          hint:
            "Marca juvenil de café con empaque creativo, " +
            "colores expresivos y estilo contemporáneo.",
        },
      ],

      question: "Si todos venden café, ¿qué hace diferente a cada propuesta?",

      teacherNote:
        "Pedir que los estudiantes comparen el público, el precio percibido, " +
        "la personalidad y la comunicación. Escuchar respuestas antes de explicar.",
    },

    {
      id: "03",
      kind: "pillars",
      block: "BLOQUE B · FUNDAMENTOS ESTRATÉGICOS",

      title: "CREAR CONTENIDO NO ES SOLO PUBLICAR",

      body:
        "Crear contenido digital consiste en desarrollar mensajes y piezas " +
        "para una audiencia específica con un objetivo definido. " +
        "Publicar sin estrategia puede generar actividad, pero no necesariamente resultados.",

      pillars: ["OBJETIVO", "AUDIENCIA", "MENSAJE", "PLATAFORMA"],

      image: "/public/images/contenido/Mesa de diseño para marca de café.png",

      imageHint:
        "Equipo creativo trabajando con bocetos, fotografías, " +
        "computadora y planificación de una campaña digital.",

      question:
        "¿Qué ocurre cuando una marca publica sin saber qué quiere conseguir?",

      teacherNote:
        "Explicar las cuatro decisiones y relacionarlas con el proyecto " +
        "de café que cada equipo construirá durante el semestre.",
    },

    {
      id: "04",
      kind: "table",
      block: "BLOQUE B · OBJETIVOS",

      title: "¿PARA QUÉ CREAMOS CONTENIDO?",

      subtitle: "Cada publicación debe responder a una intención concreta.",

      columns: ["OBJETIVO", "EJEMPLO CON CAFÉ"],

      rows: [
        ["ATRAER", "Video sobre cómo preparar un buen café."],
        ["INFORMAR", "Explicar las variedades y características del producto."],
        ["CONVENCER", "Mostrar la propuesta de valor y sus beneficios."],
        [
          "CONVERTIR",
          "Invitar a consultar las presentaciones o realizar una compra.",
        ],
      ],

      image: "/public/images/contenido/Creatividad entre café y trabajo.png",

      imageHint:
        "Fotografía comercial de café junto a un celular " +
        "con una publicación de producto, sin textos legibles.",

      question: "¿Qué objetivo elegirías para una marca que recién empieza?",

      teacherNote:
        "Explicar que un mismo producto puede generar distintos contenidos " +
        "dependiendo del objetivo de comunicación.",
    },

    {
      id: "05",
      kind: "platforms",
      block: "BLOQUE B · PLATAFORMAS DIGITALES",

      title: "¿DÓNDE DEBEMOS COMUNICAR?",

      body:
        "La plataforma no se elige porque esté de moda. " +
        "Se selecciona según el público, el formato de contenido, " +
        "el objetivo y los recursos disponibles.",

      platforms: ["Instagram", "TikTok", "Facebook", "YouTube", "Sitio web"],

      image: "/public/images/contenido/Café artesanal en ambiente cinematográfico.png",

      imageHint:
        "Creador de contenido grabando la preparación de café " +
        "con un teléfono móvil en un entorno real.",

      question:
        "¿Una marca artesanal necesita necesariamente las mismas plataformas que una juvenil?",

      teacherNote:
        "Solicitar que justifiquen una plataforma por audiencia " +
        "y tipo de contenido. Evitar respuestas basadas solo en popularidad.",
    },

    {
      id: "06",
      kind: "statement",
      block: "BLOQUE B · ESTRATEGIA PUSH",

      title: "PUSH: LLEVAR NUESTRA OFERTA AL CONSUMIDOR",

      accent: "PUSH",

      body:
        "Es una estrategia de promoción activa que busca impulsar " +
        "una respuesta comercial mediante la comunicación directa de una oferta.",

      quote:
        "Conoce nuestro nuevo café. Consulta las presentaciones disponibles.",

      note:
        "Úsala para comunicar lanzamientos, promociones " +
        "o acciones comerciales concretas.",

      image: "/public/images/contenido/Barista preparando café de especialidad.png",

      imageHint:
        "Anuncio comercial de lanzamiento de una marca de café, " +
        "producto protagonista, fotografía publicitaria profesional.",

      question:
        "¿Qué acción esperamos que realice una persona después de ver este mensaje?",

      teacherNote:
        "Explicar la relación entre promoción, llamada a la acción " +
        "y objetivo comercial. PUSH no significa necesariamente publicidad pagada.",
    },

    {
      id: "07",
      kind: "statement",
      block: "BLOQUE B · ESTRATEGIA PULL",

      title: "PULL: ATRAER AL CONSUMIDOR CON VALOR",

      accent: "PULL",

      body:
        "Es una estrategia que busca despertar interés " +
        "mediante contenido útil, educativo, relevante o entretenido.",

      quote: "Tres errores que pueden cambiar el sabor de tu café.",

      note:
        "Úsala para generar descubrimiento, interés y confianza " +
        "antes de solicitar una acción comercial.",

      image: "/public/images/contenido/Café artesanal_ producto y barista a contraluz.png",

      imageHint:
        "Barista demostrando la preparación artesanal de café, " +
        "con enfoque en manos, herramientas y proceso.",

      question:
        "¿Por qué alguien compartiría este contenido aunque todavía no conozca la marca?",

      teacherNote:
        "Mostrar cómo una publicación educativa puede atraer " +
        "personas interesadas sin empezar directamente con una oferta.",
    },

    {
      id: "08",
      kind: "compare",
      block: "BLOQUE B · COMPARACIÓN",

      title: "PUSH Y PULL NO COMPITEN: SE COMPLEMENTAN",

      columns: ["PUSH", "PULL"],

      rows: [
        ["Promueve una oferta.", "Atrae mediante contenido de valor."],
        ["Busca una respuesta comercial.", "Despierta interés y confianza."],
        [
          "Ejemplo: lanzamiento de un producto.",
          "Ejemplo: tutorial de preparación.",
        ],
        ["Invita a consultar o comprar.", "Invita a descubrir o aprender."],
      ],

      image: "/public/images/contenido/Intercambio cálido en la cafetería.png",

      imageHint:
        "Composición dividida: a un lado un anuncio comercial " +
        "de café y al otro una demostración educativa de preparación.",

      question:
        "¿Qué estrategia utilizarías primero para una marca desconocida? Justifica tu decisión.",

      teacherNote:
        "Aclarar que PUSH y PULL pueden combinarse. " +
        "La elección depende del objetivo, contexto y audiencia.",
    },

    {
      id: "09",
      kind: "case",
      block: "BLOQUE C · DEMOSTRACIÓN DOCENTE",

      title: "CONSTRUYAMOS UNA MARCA DESDE CERO",

      brand: "CAFÉ RAÍZ",

      body:
        "Una marca de café artesanal que destaca la tradición " +
        "y la experiencia de preparación.",

      details: [
        ["CONCEPTO", "Café artesanal vinculado al origen y la tradición."],
        [
          "PÚBLICO INICIAL",
          "Personas interesadas en experiencias gastronómicas auténticas.",
        ],
        [
          "PROPUESTA DE VALOR",
          "Una experiencia de café asociada al proceso artesanal.",
        ],
        [
          "PLATAFORMA INICIAL",
          "Instagram, por su potencial para mostrar el producto y su preparación visualmente.",
        ],
      ],

      image: "/public/images/contenido/Arte del café filtrado artesanal.png",

      imageHint:
        "Fotografía de identidad de Café Raíz: empaque artesanal, " +
        "granos de café, madera y estética cálida. Sin logotipos de marcas reales.",

      question:
        "¿Cómo cambiaría esta marca si estuviera dirigida a estudiantes universitarios?",

      teacherNote:
        "Construir el caso en vivo y pedir propuestas alternativas " +
        "sobre público, tono y plataforma.",
    },

    {
      id: "10",
      kind: "twoideas",
      block: "BLOQUE C · APLICACIÓN",

      title: "DE UNA IDEA A DOS CONTENIDOS",

      ideas: [
        {
          label: "PUSH",
          goal: "GENERAR CONSULTAS",
          text: "Descubre Café Raíz y conoce nuestras presentaciones.",
          image: "/public/images/contenido/Café de medianoche con latte helado.png",
          hint:
            "Mockup de publicación promocional de Café Raíz " +
            "con fotografía del producto.",
        },
        {
          label: "PULL",
          goal: "ATRAER PERSONAS INTERESADAS",
          text: "¿Por qué la molienda influye en el sabor de tu café?",
          image: "/public/images/contenido/Intercambio cálido en la cafetería.png",
          hint:
            "Mockup de contenido educativo que muestra " +
            "distintos tipos de molienda de café.",
        },
      ],

      question: "¿Cómo sabríamos si cada contenido cumplió su objetivo?",

      teacherNote:
        "Comparar indicadores posibles: consultas para PUSH " +
        "e interacciones, visualizaciones o interés generado para PULL. " +
        "No asumir que una sola métrica demuestra éxito.",
    },
    {
      id: "11",
      kind: "pushpull-lab",
      block: "BLOQUE D · LABORATORIO PRÁCTICO",

      title: "¿ES PUSH O PULL?",

      subtitle:
        "Observa cuatro publicaciones, identifica la estrategia y justifica cada decisión.",

      duration: 15,

      teacherNote:
        "El estudiante analiza cuatro casos visuales. Cada caso vale 2 puntos: " +
        "1 por clasificación correcta y 1 por justificación revisada por el docente.",
    },
    {
      id: "11",
      kind: "workshop",
      block: "BLOQUE D · TALLER PRÁCTICO",

      title: "UN CAFÉ. MÚLTIPLES MARCAS.",

      subtitle:
        "Cada equipo desarrollará su propia marca de café. " +
        "El reto es justificar las decisiones, no solo proponer ideas.",

      tasks: [
        ["10 MIN", "Definir el nombre y concepto de la marca."],
        ["10 MIN", "Identificar diferenciación y público inicial."],
        ["10 MIN", "Elegir una plataforma y justificarla."],
        ["15 MIN", "Crear un contenido PUSH y otro PULL."],
        ["10 MIN", "Revisar decisiones y mejorar la propuesta."],
        ["5 MIN", "Preparar la presentación del equipo."],
      ],

      note:
        "ENTREGABLE: ficha inicial de marca, público, plataforma, " +
        "dos propuestas de contenido y justificaciones.",

      image: "/public/images/contenido/Colaboración creativa para una marca de café.png",

      imageHint:
        "Equipo de estudiantes universitarios trabajando " +
        "en la identidad de una marca de café con laptops y bocetos.",

      teacherNote:
        "Dar autonomía a los equipos durante los 60 minutos. " +
        "Recorrer el aula y formular preguntas sobre la coherencia " +
        "entre marca, público, plataforma y mensajes.",
    },

    {
      id: "12",
      kind: "present",
      block: "BLOQUE E · PRESENTACIONES",

      title: "DEFIENDE TU MARCA",

      body:
        "Cada equipo explica el concepto de su marca, " +
        "el público seleccionado, la plataforma elegida " +
        "y sus propuestas PUSH y PULL.",

      quote:
        "No basta con mostrar lo que hicieron. " +
        "Deben explicar por qué lo hicieron.",

      image: "/public/images/contenido/Presentación de marca de café.png",

      imageHint:
        "Estudiantes universitarios exponiendo una propuesta " +
        "de marca ante sus compañeros, ambiente académico profesional.",

      question:
        "¿Cuál fue la decisión más importante que tomó tu equipo y por qué?",

      teacherNote:
        "Pedir presentaciones breves según la cantidad de equipos. " +
        "Priorizar argumentación, claridad y retroalimentación.",
    },

    {
      id: "13",
      kind: "questions",
      block: "BLOQUE E · REFLEXIÓN",

      title: "¿QUÉ APRENDIMOS HOY?",

      questions: [
        "¿Por qué necesitamos diferenciarnos?",
        "¿Cómo seleccionamos una plataforma digital?",
        "¿Cuándo utilizar PUSH o PULL?",
        "¿Qué decisión cambiaríamos después de esta clase?",
      ],

      note:
        "Cada estudiante debe escribir una conclusión individual " +
        "y explicar qué aprendió del ejercicio.",

      image: "/public/images/contenido/Reunión creativa de diseño cafetero.png",

      imageHint:
        "Cuaderno de trabajo abierto, café y materiales " +
        "de planificación creativa sobre una mesa.",

      teacherNote:
        "Cerrar con participación de los estudiantes. " +
        "Relacionar los conceptos con las decisiones de sus marcas.",
    },

    {
      id: "14",
      kind: "homework",
      block: "BLOQUE E · CONEXIÓN CON LA SEMANA 02",

      title: "¿CONOCEMOS REALMENTE A NUESTRO CLIENTE?",

      body:
        "Investiga tres marcas reales de café. Identifica sus posibles " +
        "públicos, mensajes y plataformas digitales. " +
        "Registra evidencias de lo observado.",

      note:
        "ENTREGA: ficha comparativa de máximo dos páginas " +
        "con evidencias y conclusiones propias.",

      next: "PRÓXIMA CLASE: SEGMENTACIÓN Y BUYER PERSONA",

      image: "/public/images/contenido/Mesa creativa de branding cafetero.png",

      imageHint:
        "Personas de diferentes perfiles consumiendo café " +
        "en distintos contextos, fotografía editorial profesional.",

      question:
        "¿Cómo podemos diseñar contenido relevante si todavía no conocemos bien a nuestro cliente?",

      teacherNote:
        "Explicar que la investigación servirá como punto de partida " +
        "para definir el Buyer Persona de la marca creada en clase.",
    },
  ],

  // TRABAJO AUTÓNOMO

  homework:
    "Investigar tres marcas reales de café. Identificar sus posibles " +
    "públicos, mensajes y plataformas, registrar evidencias " +
    "y elaborar una ficha comparativa de máximo dos páginas.",

  nextWeek:
    "Semana 2 — Segmentación de audiencias y construcción del Buyer Persona.",

  // CRITERIOS PARA EVALUAR EL TALLER

  assessment: {
    title: "Evaluación de la propuesta inicial de marca",
    totalPoints: 10,
    criteria: [
      {
        name: "Concepto y diferenciación",
        points: 2,
      },
      {
        name: "Definición y coherencia del público",
        points: 2,
      },
      {
        name: "Selección y justificación de plataforma",
        points: 2,
      },
      {
        name: "Propuestas PUSH y PULL",
        points: 2,
      },
      {
        name: "Argumentación, reflexión y presentación",
        points: 2,
      },
    ],
  },
};

export default semana01;
