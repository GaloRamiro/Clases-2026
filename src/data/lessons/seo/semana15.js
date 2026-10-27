
const IMG = "/images/seo/semana15/";

const semana15 = {
  id: "seo-semana-15",
  courseId: "seo",
  number: 15,
  title: "Google Analytics 4 y Google Tag Manager",
  subtitle: "Medición de eventos y acciones relevantes",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Implementar Google Analytics 4 mediante Google Tag Manager en una web académica propia, configurar tres eventos, comprobar su funcionamiento y reconocer acciones relevantes para la medición.",

  challenge: "100 personas entraron a tu web. ¿Qué hicieron después?",

  project: {
    name: "Expediente SEO + SEM + AEO + GEO",
    description:
      "La empresa real sigue siendo objeto de análisis externo. La implementación de etiquetas se realiza exclusivamente en la web académica publicada en la Semana 14.",
    deliverable:
      "Web académica con GA4, GTM, tres eventos y evidencias de depuración.",
    restriction:
      "No instalar etiquetas en sitios empresariales ajenos. No registrar información personal en los parámetros de eventos.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío inicial: qué hace el usuario",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "GA4, GTM y demostración técnica",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: instalación GA4 + GTM",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: eventos y depuración",
      minutes: 35,
    },
    {
      time: "100–115",
      title: "Presentación técnica",
      minutes: 15,
    },
    {
      time: "115–120",
      title: "Cierre y tarea",
      minutes: 5,
    },
  ],

  tools: [
    {
      name: "Google Analytics",
      url: "https://analytics.google.com/",
      purpose: "Crear una propiedad GA4 y revisar eventos.",
    },
    {
      name: "Google Tag Manager",
      url: "https://tagmanager.google.com/",
      purpose: "Configurar etiquetas, activadores y variables.",
    },
    {
      name: "Tag Assistant",
      url: "https://tagassistant.google.com/",
      purpose: "Depurar etiquetas mediante Preview.",
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      purpose: "Actualizar index.html de la web académica.",
    },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Instalar GA4 mediante GTM",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Abrir la web académica de la Semana 14.",
        "Crear una propiedad GA4 y un flujo web.",
        "Registrar el ID de medición G-.",
        "Crear un contenedor web en GTM.",
        "Copiar los dos fragmentos oficiales de GTM.",
        "Insertarlos en index.html.",
        "Actualizar el repositorio de GitHub.",
        "Crear una etiqueta Google tag en GTM.",
        "Comprobar su ejecución mediante Preview.",
        "Verificar eventos de prueba en GA4.",
      ],
      deliverable: "URL, IDs de GA4/GTM, capturas y verificación de conexión.",
    },
    {
      title: "Laboratorio 2: Configurar y depurar eventos",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Configurar el evento click_cta_principal.",
        "Configurar el evento click_cta_secundario.",
        "Agregar el script dataLayer para apertura de FAQ.",
        "Crear el activador Custom Event faq_open.",
        "Crear la variable faq_question.",
        "Crear la etiqueta GA4 Event faq_open.",
        "Probar los tres eventos mediante Preview.",
        "Verificar la recepción en GA4 DebugView.",
        "Publicar el contenedor validado.",
        "Documentar evidencias y elegir un evento clave académico.",
      ],
      deliverable: "Matriz de tres eventos y evidencias de depuración.",
    },
  ],

  homework: {
    title: "Tarea 15: Informe de medición y preparación para Search Console",
    modality: "Grupal",
    deadline: "Antes de la Semana 16",
    delivery: "T15_EQUIPO.pdf",
    instructions: [
      "Ingresar a la web académica.",
      "Realizar cinco interacciones de prueba.",
      "Comprobar la recepción de los eventos.",
      "Registrar cuáles funcionaron y cuáles fallaron.",
      "Incluir capturas de Preview y DebugView.",
      "Explicar usuarios, sesiones y eventos.",
      "Investigar qué es Google Search Console.",
      "Diferenciar propiedad de dominio y prefijo de URL.",
      "Registrar la URL exacta de la web.",
      "Explicar qué datos esperan obtener de Search Console.",
    ],
    note: "PDF de 2 a 3 páginas. No se exige tráfico orgánico ni posiciones en Google.",
  },

  rubric: [
    {
      criterion: "Propiedad GA4 y flujo web",
      points: 15,
    },
    {
      criterion: "Instalación y funcionamiento de GTM",
      points: 20,
    },
    {
      criterion: "Configuración de tres eventos",
      points: 30,
    },
    {
      criterion: "Depuración y evidencias",
      points: 20,
    },
    {
      criterion: "Interpretación y evento clave",
      points: 15,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 15",
      title: "Google Analytics 4 y Google Tag Manager",
      subtitle: "Medición de eventos y conversiones",
      body: "Hoy convertiremos nuestra web académica en un entorno de medición real.",
      image: `${IMG}portada-analitica.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "100 personas entraron a tu web. ¿Qué hicieron?",
      accent: "LAS VISITAS NO CUENTAN TODA LA HISTORIA",
      body: "En equipos, propongan tres interacciones que deberían medirse. Expliquen qué decisión podría tomar el responsable del sitio con cada dato.",
      question:
        "¿Cómo sabríamos si los usuarios interactúan con los botones o leen las preguntas frecuentes?",
      image: `${IMG}desafio-usuarios.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTO · 4 MIN",
      title: "¿Qué es Google Analytics 4?",
      columns: ["Concepto", "Significado", "Ejemplo"],
      rows: [
        [
          "Usuario",
          "Persona o navegador identificado por GA4",
          "Visitante de prueba",
        ],
        ["Sesión", "Conjunto de interacciones", "Una visita"],
        ["Evento", "Acción registrada", "page_view"],
        ["Evento clave", "Acción importante para el objetivo", "CTA académico"],
      ],
      note: "GA4 utiliza un modelo de medición basado en eventos.",
      image: `${IMG}ga4-conceptos.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "FUNDAMENTO · 4 MIN",
      title: "¿Qué es Google Tag Manager?",
      columns: ["Elemento", "Función", "Ejemplo"],
      rows: [
        ["Etiqueta", "Envía o configura datos", "Google tag"],
        ["Activador", "Determina cuándo ejecutar", "Click ID"],
        ["Variable", "Aporta valores", "faq_question"],
        ["Contenedor", "Agrupa configuraciones", "GTM-XXXXXXX"],
      ],
      question:
        "¿Cuál es la diferencia entre medir datos y administrar etiquetas?",
      image: `${IMG}gtm-conceptos.webp`,
    },
    {
      id: 5,
      kind: "seo15-flow",
      block: "DEMOSTRACIÓN · 12 MIN",
      title: "¿Cómo viajan los datos desde la web?",
      subtitle: "Flujo de medición, eventos y depuración",
      instructions:
        "Revisa el recorrido de un clic y diferencia los eventos automáticos de los eventos personalizados.",
    },
    {
      id: 6,
      kind: "seo15-install",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Instala GA4 mediante Google Tag Manager",
      subtitle: "Propiedad, flujo web, contenedor y verificación",
      instructions:
        "Sigue la guía técnica integrada, registra tus IDs y comprueba la ejecución de la etiqueta.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Al regresar configuraremos tres eventos de interacción.",
    },
    {
      id: 8,
      kind: "seo15-cta-guide",
      block: "LABORATORIO 2 · PARTE A · 12 MIN",
      title: "Configura los eventos de los botones",
      subtitle: "click_cta_principal y click_cta_secundario",
      instructions:
        "Configura variables, activadores de clic y etiquetas de eventos GA4.",
    },
    {
      id: 9,
      kind: "seo15-faq-guide",
      block: "LABORATORIO 2 · PARTE B · 10 MIN",
      title: "Mide la apertura de preguntas frecuentes",
      subtitle: "dataLayer, Custom Event y faq_question",
      instructions:
        "Descarga el script de FAQ, intégralo en index.html y configura el evento faq_open.",
    },
    {
      id: 10,
      kind: "seo15-events",
      block: "LABORATORIO 2 · PARTE C · 13 MIN",
      title: "Depura y documenta tus tres eventos",
      subtitle: "Preview, Tag Assistant y DebugView",
      instructions:
        "Comprueba las tres interacciones, registra evidencias y documenta un evento clave académico.",
    },
    {
      id: 11,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "Demuestra que tus eventos funcionan",
      body: "Presenta la URL de tu sitio, explica cómo se configuraron los activadores y muestra evidencias de los tres eventos.",
      question:
        "¿Qué prueba demuestra que una etiqueta se ejecutó y qué prueba demuestra que GA4 recibió el evento?",
      image: `${IMG}presentacion-medicion.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "¿Cómo medirías el posicionamiento en Google?",
      body: "GA4 permite analizar interacciones dentro de la web. Search Console aporta información sobre presencia y rendimiento en Google Search.",
      note: "Tarea 15: informe técnico de 2 a 3 páginas y preparación para Search Console.",
      next: "SEMANA 16 · Search Console, indexación, sitemap y Looker Studio.",
      image: `${IMG}search-console.webp`,
    },
  ],
};

export default semana15;
