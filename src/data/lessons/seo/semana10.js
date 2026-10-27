const IMG = "/images/seo/semana10/";

const semana10 = {
  id: "seo-semana-10",
  courseId: "seo",
  number: 10,
  title: "Copywriting publicitario, anuncios de Google Ads y landing pages",
  subtitle:
    "Del clic a la conversión: mensajes y páginas que responden a la intención",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Crear anuncios de búsqueda persuasivos y diseñar una landing page orientada a conversiones, manteniendo coherencia entre la intención de búsqueda, el mensaje publicitario y la página de destino.",

  challenge:
    "¿Por qué una persona hace clic en un anuncio, pero no termina comprando?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description:
      "Continuación de la campaña simulada de la empresa real seleccionada desde la Semana 1.",
    finalDeliverable:
      "Dos propuestas de anuncios responsivos de búsqueda, una landing page prototipo y una ficha de prueba A/B.",
    restrictions:
      "No modificar la web de la empresa, no publicar anuncios y no presentar el prototipo como sitio oficial.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: un anuncio consigue clics, pero no ventas",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Copywriting, anuncios responsivos y landing pages",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: producción de anuncios",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: landing page y prueba A/B",
      minutes: 35,
    },
    {
      time: "100–120",
      title: "Presentaciones, retroalimentación y deber",
      minutes: 20,
    },
  ],

  tools: [
    {
      name: "Google Ads",
      url: "https://ads.google.com/",
      purpose:
        "Consultar características y formatos de los anuncios responsivos de búsqueda.",
      access: "Consulta informativa. No se requiere crear ni activar campañas.",
    },
    {
      name: "Figma",
      url: "https://www.figma.com/",
      purpose: "Diseñar el prototipo visual de la landing page.",
      access: "Puede utilizarse el plan gratuito disponible.",
    },
    {
      name: "Canva",
      url: "https://www.canva.com/",
      purpose: "Alternativa para construir la propuesta visual.",
      access: "Se pueden utilizar herramientas gratuitas.",
    },
    {
      name: "Google Slides",
      url: "https://slides.google.com/",
      purpose: "Diseñar una maqueta visual sin programar.",
      access: "Alternativa gratuita.",
    },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Redacción de anuncios responsivos de búsqueda",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Recuperar los dos grupos de anuncios de la Semana 9.",
        "Identificar la intención comercial de cada grupo.",
        "Redactar diez títulos por anuncio, de máximo 30 caracteres.",
        "Redactar cuatro descripciones por anuncio, de máximo 90 caracteres.",
        "Incorporar CTA y beneficios verificables.",
        "Seleccionar una página de destino existente o propuesta.",
        "Revisar la coherencia entre keyword, anuncio y destino.",
        "Justificar la combinación de mensajes más convincente.",
      ],
      deliverable:
        "Dos anuncios responsivos propuestos, con veinte títulos, ocho descripciones y justificación.",
    },
    {
      title: "Laboratorio 2: Prototipo de landing page y prueba A/B",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Seleccionar uno de los anuncios del Laboratorio 1.",
        "Revisar públicamente la página de destino actual.",
        "Identificar tres problemas u oportunidades de conversión.",
        "Crear un prototipo visual independiente.",
        "Incluir hero, propuesta de valor, beneficios, evidencia de confianza y CTA.",
        "Considerar la visualización móvil.",
        "Definir una hipótesis de prueba A/B.",
        "Proponer dos versiones con una sola variable principal diferente.",
        "Seleccionar la métrica principal del experimento.",
      ],
      deliverable:
        "Prototipo visual de landing page y ficha de experimento A/B.",
    },
  ],

  homework: {
    title: "Tarea 10: Diseña una propuesta publicitaria multicanal",
    delivery: "T10_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    deadline: "Antes de la Semana 11",
    instructions: [
      "Recuperar el producto o servicio seleccionado.",
      "Investigar publicidad de competidores en YouTube, Instagram o Facebook.",
      "Seleccionar dos canales adicionales relevantes.",
      "Definir el objetivo de cada canal: reconocimiento, consideración o conversión.",
      "Proponer una idea de anuncio para cada canal.",
      "Explicar cómo se integraría con la campaña de búsqueda.",
      "Incluir referencias visuales o capturas cuando existan.",
      "Entregar un PDF de dos a tres páginas.",
    ],
    note: "No crear cuentas publicitarias, no realizar pagos y no inventar campañas observadas.",
  },

  rubric: [
    {
      criterion: "Calidad y relevancia de los anuncios",
      points: 25,
    },
    {
      criterion: "Cumplimiento de formatos y límites",
      points: 15,
    },
    {
      criterion: "Coherencia entre keyword, anuncio y destino",
      points: 20,
    },
    {
      criterion: "Diseño y estructura de landing page",
      points: 25,
    },
    {
      criterion: "Hipótesis y propuesta de prueba A/B",
      points: 15,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 10",
      title: "Copywriting, anuncios y landing pages",
      subtitle: "Del clic a la conversión",
      body: "Hoy produciremos dos anuncios responsivos, un prototipo de landing page y una propuesta de prueba A/B.",
      image: `${IMG}portada-copywriting.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "El anuncio tiene clics, pero nadie compra",
      accent: "EL CLIC NO ES LA CONVERSIÓN",
      body: "Una empresa atrae visitantes con anuncios, pero su página no explica claramente la oferta ni facilita la compra. Identifica tres posibles causas y una mejora para cada una.",
      question:
        "¿Qué podría estar fallando entre el anuncio y la página de destino?",
      note: "Trabajo en equipos: tres hipótesis de fricción y tres propuestas de mejora.",
      image: `${IMG}clics-sin-conversion.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "COPYWRITING · 4 MIN",
      title: "¿Qué hace persuasivo a un anuncio?",
      accent: "INTENCIÓN + BENEFICIO + CTA",
      body: "El copywriting publicitario conecta una necesidad con un beneficio real, una diferencia relevante y una acción concreta. No consiste en prometer resultados que la empresa no puede demostrar.",
      question:
        "¿Cómo transformarías 'vendemos café' en una propuesta de valor específica?",
      note: "Actividad: redacta un mensaje comercial mejorado.",
      image: `${IMG}copywriting-beneficios.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "ANUNCIOS RESPONSIVOS · 6 MIN",
      title: "Anatomía de un anuncio de búsqueda",
      subtitle: "Recursos publicitarios y límites de caracteres.",
      columns: ["Elemento", "Requisito del laboratorio"],
      rows: [
        ["Títulos", "10 por anuncio, máximo 30 caracteres cada uno"],
        ["Descripciones", "4 por anuncio, máximo 90 caracteres cada una"],
        ["CTA", "Claro, específico y verificable"],
        ["URL final", "Destino existente o propuesta documentada"],
        ["Rutas visibles", "Texto orientativo asociado a la URL final"],
        ["Coherencia", "Keyword, promesa y página de destino relacionadas"],
      ],
      note: "Google Ads admite hasta 15 títulos y 4 descripciones en un anuncio responsivo de búsqueda. En clase utilizaremos 10 y 4.",
      image: `${IMG}anatomia-anuncio.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "LANDING PAGES Y A/B · 10 MIN",
      title: "Del anuncio a una experiencia coherente",
      subtitle: "La promesa publicitaria debe continuar en la página.",
      columns: ["Elemento", "Pregunta de evaluación"],
      rows: [
        ["Intención", "¿La página responde a lo que buscó el usuario?"],
        ["Propuesta de valor", "¿Se entiende el beneficio principal?"],
        ["CTA", "¿Está clara la siguiente acción?"],
        ["Confianza", "¿Existen evidencias verificables?"],
        ["Diseño móvil", "¿El contenido es usable en pantallas pequeñas?"],
        ["Prueba A/B", "¿Qué única variable principal compararías?"],
      ],
      question:
        "¿Qué cambiarías primero: el título, la imagen o el CTA? ¿Por qué?",
      image: `${IMG}coherencia-landing.webp`,
    },
    {
      id: 6,
      kind: "seo-sem-ad-copy",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Redacta dos anuncios responsivos de búsqueda",
      subtitle: "20 títulos, 8 descripciones y vista previa conceptual",
      instructions:
        "Utiliza los dos grupos de anuncios de la Semana 9. Crea diez títulos y cuatro descripciones por grupo, revisa sus límites y justifica el mensaje principal.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Regresamos para diseñar la página de destino.",
      body: "Conserva tus anuncios. Seleccionarás uno para desarrollar la landing page.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 8 MIN",
      title: "Diagnostica la página de destino actual",
      accent: "ENCUENTRA LA FRICCIÓN",
      body: "Revisa públicamente la página que recibiría los clics. Identifica fortalezas, problemas de claridad, elementos de confianza ausentes y dificultades móviles observables.",
      question: "¿Qué tres aspectos podrían dificultar la conversión?",
      note: "No modifiques la web empresarial. Documenta URL y observaciones.",
      image: `${IMG}diagnostico-landing.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE B · 17 MIN",
      title: "Diseña una landing page que convierta",
      accent: "HERO + BENEFICIOS + CONFIANZA + CTA",
      body: "Construye un prototipo visual con propuesta de valor, beneficios, producto o servicio, evidencias verificables y una llamada a la acción clara. Considera la versión móvil.",
      question: "¿Cómo conecta tu prototipo con la promesa del anuncio?",
      note: "Utiliza Figma, Canva o Google Slides. El prototipo no es una web oficial.",
      image: `${IMG}prototipo-landing.webp`,
    },
    {
      id: 10,
      kind: "seo-sem-landing-ab",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Prototipo de landing page y prueba A/B",
      subtitle: "Diagnóstico, diseño, hipótesis y métrica de conversión",
      instructions:
        "Selecciona un anuncio, registra tres oportunidades de mejora, documenta el prototipo y diseña una prueba A/B que cambie una sola variable principal.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "Defiende tu anuncio y tu landing page",
      body: "Presenta un anuncio, el prototipo y la hipótesis A/B. Explica cómo la propuesta responde a la intención comercial del usuario.",
      question:
        "¿Qué evidencia respalda tu propuesta y qué medirías para evaluarla?",
      image: `${IMG}defensa-conversion.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "Del anuncio a una estrategia multicanal",
      body: "Selecciona dos canales publicitarios adicionales y propone una idea de anuncio para cada uno, conectándolos con la campaña de búsqueda.",
      note: "Tarea grupal: T10_APELLIDO_NOMBRE.pdf. Extensión: 2–3 páginas.",
      next: "SEMANA 11 · Publicidad multicanal, embudo de conversión y plan de medios.",
      image: `${IMG}estrategia-multicanal.webp`,
    },
  ],
};

export default semana10;
