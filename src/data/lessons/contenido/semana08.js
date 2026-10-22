const semana08 = {
  id: "contenido-semana-8",
  courseId: "contenido",
  number: 8,
  title: "Tu café ya tiene personalidad. Ahora necesita identidad visual.",
  subtitle: "Color, tipografía, logotipo, composición e IA",
  duration: 180,

  objective:
    "Diseñar una propuesta de identidad visual para una marca, aplicando principios de color, tipografía, composición y coherencia gráfica, con apoyo crítico de herramientas digitales e inteligencia artificial.",

  challenge: "¿Reconocerías una marca de café sin leer su nombre?",

  schedule: [
    { time: "00–15", title: "Desafío de reconocimiento visual", minutes: 15 },
    { time: "15–50", title: "Fundamentos de identidad visual", minutes: 35 },
    { time: "50–80", title: "Demostración con Café Raíz e IA", minutes: 30 },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio de identidad visual", minutes: 60 },
    { time: "160–180", title: "Presentación y reflexión", minutes: 20 },
  ],

  rubric: [
    { criterion: "Paleta cromática y justificación", points: 10 },
    { criterion: "Tipografías y jerarquía visual", points: 10 },
    { criterion: "Logotipo inicial y aplicación", points: 10 },
    { criterion: "Tres publicaciones rediseñadas", points: 15 },
    { criterion: "Presentación y argumentación", points: 5 },
  ],

  homework: {
    title: "Construye el primer manual de tu marca",
    instructions: [
      "Mejorar la paleta y el logotipo con la retroalimentación.",
      "Crear un mini manual de identidad visual de 5 a 7 páginas.",
      "Incluir versiones del logotipo, colores, tipografías y estilo fotográfico.",
      "Diseñar dos plantillas reutilizables: publicación e historia.",
      "Aplicar la identidad a una pieza de la campaña de la Semana 6.",
      "Preparar una presentación grupal de cinco diapositivas.",
      "Entregar el manual PDF, plantillas editables y presentación en Moodle.",
    ],
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "UNIDAD 2 · SEMANA 08",
      title: "Una marca debe reconocerse antes de leerse.",
      subtitle:
        "Tu café ya tiene personalidad. Ahora necesita identidad visual.",
      body: "La identidad visual comunica quién es una marca, cómo quiere ser percibida y qué la diferencia.",
    },
    {
      id: 2,
      kind: "table",
      block: "ACTIVACIÓN · 15 MIN",
      title: "El producto es el mismo. ¿Qué marca elegirías?",
      columns: ["Marca A", "Marca B"],
      rows: [
        ["Sofisticada, sobria y exclusiva.", "Juvenil, dinámica y expresiva."],
        [
          "Colores discretos y composición minimalista.",
          "Colores vibrantes y composición dinámica.",
        ],
      ],
      question:
        "¿Qué decisiones visuales producen esas percepciones y qué consumidor elegiría cada propuesta?",
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · IDENTIDAD",
      title: "Un logotipo no es toda la identidad.",
      accent: "UNA MARCA ES UN SISTEMA VISUAL",
      body: "La identidad visual incluye logotipo, colores, tipografías, fotografías, composiciones y reglas de aplicación. Permite que un carrusel, una historia y una publicidad se perciban como parte de la misma marca.",
      question:
        "¿Qué elementos visuales deberían repetirse entre tus publicaciones?",
    },
    {
      id: 4,
      kind: "statement",
      block: "FUNDAMENTOS · PSICOLOGÍA DEL COLOR",
      title: "El color comunica, pero no tiene un significado universal.",
      accent: "CONTEXTO · CULTURA · CONSUMIDOR",
      body: "Los colores influyen en la percepción visual, pero sus asociaciones dependen del contexto cultural, el diseño y la experiencia del consumidor. Marrón, terracota, verde, beige y azul pueden construir personalidades diferentes según su aplicación.",
      question:
        "¿Qué colores representan la personalidad de tu café y por qué?",
    },
    {
      id: 5,
      kind: "table",
      block: "FUNDAMENTOS · PALETA",
      title: "Cinco colores. Una sola personalidad.",
      subtitle: "Ejemplo didáctico: Café Raíz",
      columns: ["Función", "Color HEX"],
      rows: [
        ["Principal", "#263F36"],
        ["Secundario", "#B86B3D"],
        ["Fondo", "#EAD9BC"],
        ["Texto", "#25221F"],
        ["Superficie", "#F5F0E6"],
      ],
      note: "Cada color debe tener una función. No es necesario utilizar los cinco en cada pieza.",
    },
    {
      id: 6,
      kind: "table",
      block: "FUNDAMENTOS · TIPOGRAFÍA",
      title: "La forma de las letras también habla.",
      columns: ["Elemento", "Decisión"],
      rows: [
        ["Serif", "Puede construir un enfoque editorial o tradicional"],
        ["Sans serif", "Puede comunicar un estilo contemporáneo y directo"],
        ["Jerarquía", "Diferencia títulos, subtítulos y textos"],
        ["Legibilidad", "Facilita la lectura en diferentes tamaños"],
        ["Consistencia", "Mantiene reglas tipográficas reconocibles"],
      ],
      question:
        "¿Qué combinación de dos tipografías representa mejor a tu marca?",
    },
    {
      id: 7,
      kind: "table",
      block: "FUNDAMENTOS · LOGOTIPO",
      title: "Un buen logotipo funciona en diferentes tamaños.",
      columns: ["Variante", "Aplicación"],
      rows: [
        ["Símbolo", "Representación gráfica reconocible"],
        ["Logotipo tipográfico", "Nombre de marca mediante letras"],
        ["Versión combinada", "Símbolo y nombre"],
        ["Monocromática", "Aplicación en blanco o negro"],
      ],
      note: "Prioriza legibilidad, simplicidad, coherencia y reproducción. El logotipo debe ser editable.",
    },
    {
      id: 8,
      kind: "questions",
      block: "FUNDAMENTOS · COMPOSICIÓN",
      title: "Si todo llama la atención, nada destaca.",
      questions: [
        "¿Qué elemento debe observar primero el consumidor?",
        "¿Cómo utilizamos contraste para destacar información?",
        "¿Qué alineación organiza mejor el contenido?",
        "¿Dónde necesitamos espacio negativo?",
        "¿Qué elementos debemos repetir para mantener coherencia?",
        "¿Cómo equilibramos texto e imagen?",
      ],
    },
    {
      id: 9,
      kind: "statement",
      block: "FUNDAMENTOS · COHERENCIA",
      title: "Tu carrusel, tu historia y tu anuncio deben parecer familia.",
      accent: "CONSISTENCIA NO SIGNIFICA REPETICIÓN",
      body: "Una identidad coherente permite variar las composiciones sin perder el lenguaje visual. Mantén criterios comunes de color, tipografía, fotografía y uso del logotipo.",
      question:
        "¿Qué tres elementos permitirían reconocer tu marca en diferentes formatos?",
    },
    {
      id: 10,
      kind: "table",
      block: "DEMOSTRACIÓN · CAFÉ RAÍZ",
      title: "Del moodboard a las decisiones de diseño.",
      columns: ["Decisión", "Ejemplo"],
      rows: [
        ["Personalidad", "Cálida, auténtica y contemporánea"],
        ["Paleta", "Verde profundo, terracota y crema"],
        ["Tipografía", "Una fuente para títulos y otra para textos"],
        ["Logotipo", "Nombre de marca y símbolo sencillo"],
        ["Fotografía", "Preparación artesanal y luz natural"],
      ],
      note: "Construye una hoja de identidad visual en Canva, Slides o un editor equivalente.",
    },
    {
      id: 11,
      kind: "statement",
      block: "DEMOSTRACIÓN · IA Y COLOR",
      title: "No pidas colores bonitos. Pide identidad con fundamento.",
      accent: "LA IA PROPONE. EL DISEÑADOR VERIFICA.",
      body: "Actúa como director de arte. Para Café Raíz, marca cálida y contemporánea dirigida a personas que preparan café en casa, propón tres direcciones cromáticas. Incluye cinco colores HEX, función, justificación y combinaciones para títulos y fondos. Evita propuestas genéricas.",
      question:
        "¿Qué combinaciones presentan suficiente contraste para leer los textos?",
    },
    {
      id: 12,
      kind: "questions",
      block: "DEMOSTRACIÓN · DEL PROMPT AL DISEÑO",
      title: "La IA sugiere. Nosotros diseñamos.",
      questions: [
        "Elegir una dirección cromática fundamentada.",
        "Ajustar colores y jerarquías.",
        "Seleccionar dos tipografías reales y disponibles.",
        "Construir un logotipo inicial editable.",
        "Aplicar la identidad a una publicación anterior.",
        "Verificar legibilidad y contraste.",
      ],
      note: "Una imagen generada por IA puede servir como referencia, pero no sustituye un logotipo editable.",
    },
    {
      id: 13,
      kind: "content-visual-identity-lab",
      block: "LABORATORIO 08 · 60 MIN",
      title: "Diseña la identidad de tu café.",
      subtitle: "Paleta, tipografía, logotipo y tres piezas rediseñadas.",
    },
    {
      id: 14,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "Defiende tu identidad visual.",
      body: "Cada equipo presenta su paleta, tipografías, logotipo y tres publicaciones antes y después del rediseño.",
      quote:
        "¿Por qué tus decisiones visuales conectan con el Buyer Persona y el concepto de campaña?",
    },
    {
      id: 15,
      kind: "questions",
      block: "REFLEXIÓN · 5 MIN",
      title: "¿Qué aprendimos hoy?",
      questions: [
        "¿Por qué un logotipo no representa toda la identidad visual?",
        "¿Qué diferencia existe entre elegir colores por gusto y por estrategia?",
        "¿Cómo mejora la coherencia visual la comunicación?",
        "¿Qué aprendimos al rediseñar nuestras publicaciones?",
      ],
    },
    {
      id: 16,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO",
      title: "Construye el primer manual de tu marca.",
      body: "Consolida un mini manual de identidad de 5 a 7 páginas, diseña dos plantillas reutilizables y aplica tu sistema visual a una pieza de campaña.",
      note: "Entrega en Moodle el PDF, las plantillas editables o enlaces accesibles y una presentación de cinco diapositivas.",
      next: "SEMANA 09 · Cronopost y calendario editorial de 15 días.",
    },
  ],
};

export default semana08;
