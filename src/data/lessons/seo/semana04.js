const IMG = "/images/seo/semana04/";

const semana04 = {
  id: "seo-semana-4",
  courseId: "seo",
  number: 4,
  title: "Arquitectura web y SEO On Page",
  subtitle: "De las keywords a una página que Google y los usuarios comprendan",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Diseñar la arquitectura inicial de un sitio web y desarrollar una página optimizada mediante palabras clave, metadatos, encabezados, URLs, contenido y enlaces internos, aplicando criterios de SEO On Page y experiencia de usuario.",

  challenge:
    "¿Por qué una página visualmente atractiva no siempre consigue posicionarse en Google?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description:
      "Continuación de la empresa, matriz de keywords y benchmarking desarrollados durante las primeras tres semanas.",
    finalDeliverable:
      "Mapa web empresarial de seis páginas y primera página optimizada en un sitio funcional o prototipo.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: una página bonita no siempre posiciona",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Arquitectura web y SEO On Page",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: arquitectura web empresarial",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: primera página optimizada",
      minutes: 35,
    },
    {
      time: "100–120",
      title: "Auditoría entre equipos, cierre y tarea",
      minutes: 20,
    },
  ],

  labSteps: [
    {
      title: "Recuperar la investigación",
      minutes: 5,
      instruction:
        "Consultar las doce keywords prioritarias de la Semana 2 y las oportunidades del benchmarking de la Semana 3.",
    },
    {
      title: "Diseñar la arquitectura",
      minutes: 20,
      instruction:
        "Organizar al menos seis páginas, definir jerarquía, intención, keyword principal y URL propuesta.",
    },
    {
      title: "Preparar la ficha SEO",
      minutes: 15,
      instruction:
        "Seleccionar una página y redactar title, meta description, URL, H1, tres H2, keywords y CTA.",
    },
    {
      title: "Construir el prototipo",
      minutes: 20,
      instruction:
        "Desarrollar la primera versión de la página, con contenido original, imagen, enlaces internos y diseño adaptable.",
    },
  ],

  homework: {
    title: "Trabajo autónomo 4 — Finaliza tu primera página SEO",
    delivery: "T4_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    instructions: [
      "Finalizar la primera versión de la página o prototipo.",
      "Comprobar título SEO, metadescripción, URL, H1 y H2.",
      "Incorporar contenido que responda a la intención de búsqueda.",
      "Añadir una imagen optimizada y texto alternativo.",
      "Revisar la llamada a la acción y la navegación.",
      "Documentar la visualización en escritorio y móvil.",
      "Utilizar PageSpeed Insights únicamente si existe una página pública accesible.",
      "Identificar tres mejoras técnicas para investigar en la Semana 5.",
      "Entregar ficha SEO, enlace cuando exista, capturas y conclusiones en PDF.",
    ],
    note: "No es necesario contratar hosting, dominio ni herramientas pagadas. No modificar sitios de terceros sin autorización.",
  },

  rubric: [
    {
      criterion: "Arquitectura web y organización de páginas",
      points: 20,
    },
    {
      criterion: "Asignación de keywords e intención de búsqueda",
      points: 20,
    },
    {
      criterion: "Metadatos, URLs y encabezados",
      points: 20,
    },
    {
      criterion: "Calidad de la página o prototipo",
      points: 25,
    },
    {
      criterion: "Revisión y justificación de mejoras",
      points: 15,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 04",
      title: "Arquitectura web y SEO On Page",
      subtitle:
        "De las palabras clave a una página que Google pueda comprender",
      body: "Hoy diseñaremos la estructura de nuestro sitio empresarial y construiremos la primera página optimizada del proyecto.",
      image: `${IMG}portada-arquitectura.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 10 MIN",
      title: "¿Una página bonita puede posicionarse?",
      accent: "DISEÑO NO ES SINÓNIMO DE VISIBILIDAD",
      body: "Compara una página visualmente atractiva pero con información poco clara frente a otra organizada para resolver una búsqueda específica.",
      quote:
        "El diseño atrae la mirada; la estructura y el contenido ayudan a resolver la necesidad.",
      question: "¿Cuál responde mejor a la intención del usuario y por qué?",
      note: "En equipos, identifiquen tres diferencias entre las páginas y justifiquen cuál responde mejor a la búsqueda.",
      image: `${IMG}desafio-diseno-seo.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 4 MIN",
      title: "¿Qué es SEO On Page?",
      accent: "OPTIMIZAR LO QUE EXISTE EN TU PÁGINA",
      body: "El SEO On Page reúne mejoras sobre el contenido y los elementos de una página: títulos, encabezados, URLs, imágenes, enlaces internos y organización de la información.",
      quote:
        "Cada página debe responder con claridad a una necesidad de búsqueda.",
      question:
        "Identifica cinco elementos que podrías mejorar dentro de una página web.",
      image: `${IMG}seo-on-page.webp`,
    },
    {
      id: 4,
      kind: "statement",
      block: "ARQUITECTURA WEB · 5 MIN",
      title: "Organiza tu empresa",
      accent: "UNA WEB NECESITA JERARQUÍA",
      body: "La arquitectura web define cómo se relacionan las páginas principales, categorías, productos, servicios y rutas de navegación.",
      quote:
        "Una estructura clara facilita la navegación de los usuarios y el descubrimiento de contenidos.",
      question:
        "¿Cómo organizarías Inicio, Servicios, Nosotros y Contacto para tu empresa?",
      image: `${IMG}arquitectura-web.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "ESTRATEGIA · 4 MIN",
      title: "Una intención, una página adecuada",
      subtitle:
        "Relaciona las keywords con páginas que resuelvan la necesidad del usuario.",
      columns: ["Keyword", "Intención", "Página sugerida"],
      rows: [
        [
          "qué es mantenimiento preventivo",
          "Informacional",
          "Guía de mantenimiento",
        ],
        [
          "servicio técnico de laptops en Quito",
          "Comercial o transaccional",
          "Servicio técnico",
        ],
        ["contacto empresa tecnológica", "Navegacional", "Contacto"],
      ],
      note: "Recupera tres keywords de la Semana 2 y asigna una página apropiada. Evita crear varias páginas idénticas para la misma intención.",
      image: `${IMG}keyword-mapping.webp`,
    },
    {
      id: 6,
      kind: "seo-architecture-lab",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Construye la arquitectura SEO de tu empresa",
      subtitle: "Seis páginas, keywords, intención de búsqueda y URLs",
      instructions:
        "Recupera las doce keywords prioritarias, define al menos seis páginas, organiza su jerarquía y asigna una keyword principal a cada página cuando corresponda.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Regresamos para construir nuestra primera página SEO.",
      body: "Conserva el mapa web y selecciona una página estratégica.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 5 MIN",
      title: "Selecciona la página que optimizarás",
      accent: "UNA PÁGINA, UN OBJETIVO CLARO",
      body: "Elige una página del mapa web y define la keyword principal, tres keywords secundarias, la intención de búsqueda y el objetivo comercial.",
      quote:
        "No empieces escribiendo: primero define para quién y para qué existe la página.",
      question:
        "¿Qué problema resuelve esta página y qué acción deseas que realice el visitante?",
      image: `${IMG}brief-pagina.webp`,
    },
    {
      id: 9,
      kind: "table",
      block: "LABORATORIO 2 · PARTE B · 10 MIN",
      title: "Optimiza títulos, URL y encabezados",
      subtitle: "Los elementos esenciales de una ficha SEO On Page.",
      columns: ["Elemento", "Ejemplo"],
      rows: [
        ["Keyword", "café de especialidad en Quito"],
        ["URL", "/cafe-de-especialidad-quito/"],
        ["Title SEO", "Café de especialidad en Quito | Café Andino"],
        [
          "Meta description",
          "Descubre nuestro café de especialidad en Quito y conoce nuestros productos.",
        ],
        ["H1", "Café de especialidad en Quito"],
        ["H2", "Nuestros cafés de especialidad"],
        ["H2", "Métodos de preparación"],
        ["H2", "Cómo comprar nuestro café"],
        ["CTA", "Conoce nuestros productos"],
      ],
      note: "Redacta títulos y descripciones naturales. Google puede modificar cómo muestra los títulos y fragmentos en sus resultados.",
      image: `${IMG}metadatos-encabezados.webp`,
    },
    {
      id: 10,
      kind: "seo-onpage-lab",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Construye tu primera página SEO",
      subtitle: "Brief, metadatos, contenido, enlaces internos y prototipo",
      instructions:
        "Completa la ficha de optimización y construye una primera versión en una herramienta gratuita o mediante un prototipo documentado.",
    },
    {
      id: 11,
      kind: "seo-peer-review",
      block: "AUDITORÍA ENTRE EQUIPOS · 15 MIN",
      title: "¿Tu página está lista para mejorar?",
      subtitle:
        "Revisa una página de otro equipo y registra dos recomendaciones.",
      instructions:
        "Comprueba keyword, estructura, contenido, navegación, imagen, enlaces internos y CTA. Identifica dos mejoras justificadas.",
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "Misión para la Semana 5",
      body: "Finaliza tu primera página SEO, documenta su versión de escritorio y móvil, y registra tres oportunidades de mejora técnica.",
      note: "Entrega en Moodle: T4_APELLIDO_NOMBRE.pdf. Si trabajas con un prototipo no publicado, explica qué pruebas técnicas todavía no puedes realizar.",
      next: "SEMANA 05 · SEO técnico, rastreo, indexación y rendimiento.",
      image: `${IMG}trabajo-autonomo.webp`,
    },
  ],
};

export default semana04;
