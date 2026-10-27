const IMG = "/images/seo/semana16/";

const semana16 = {
  id: "seo-semana-16",
  courseId: "seo",
  number: 16,
  title: "Google Search Console, indexación y dashboards con Looker Studio",
  subtitle: "Diagnóstico de búsqueda y visualización de analítica web",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Configurar Google Search Console en una web académica propia, comprobar su accesibilidad e indexación y construir un dashboard en Looker Studio para interpretar datos de analítica y posicionamiento.",

  challenge:
    "Mi página funciona correctamente, pero Google no la muestra. ¿Por qué?",

  project: {
    name: "Expediente SEO + SEM + AEO + GEO",
    description:
      "La empresa real permanece como caso de consultoría. Search Console, GA4 y Looker Studio se configuran exclusivamente en la web académica propia.",
    deliverable:
      "Propiedad Search Console verificada, diagnóstico de indexación, sitemap XML y dashboard de Looker Studio.",
    restriction:
      "No solicitar accesos ni modificar el sitio de la empresa real. No inventar clics, impresiones, posiciones o usuarios.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: por qué Google no muestra mi web",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Search Console, indexación, sitemap y Looker Studio",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: verificación y diagnóstico",
      minutes: 25,
    },
    { time: "55–65", title: "Receso", minutes: 10 },
    {
      time: "65–100",
      title: "Laboratorio 2: dashboard de analítica",
      minutes: 35,
    },
    { time: "100–115", title: "Presentación de evidencias", minutes: 15 },
    { time: "115–120", title: "Cierre e informe integrador", minutes: 5 },
  ],

  tools: [
    {
      name: "Google Search Console",
      url: "https://search.google.com/search-console/",
      purpose: "Verificar propiedad, inspeccionar URL y registrar sitemap.",
    },
    {
      name: "Looker Studio",
      url: "https://lookerstudio.google.com/",
      purpose: "Crear un dashboard de analítica.",
    },
    {
      name: "Google Analytics",
      url: "https://analytics.google.com/",
      purpose: "Utilizar los eventos de la Semana 15.",
    },
    {
      name: "Google Sheets",
      url: "https://sheets.google.com/",
      purpose:
        "Importar datos ficticios si no hay suficientes registros reales.",
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      purpose: "Publicar la etiqueta de verificación y sitemap.xml.",
    },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Search Console y diagnóstico de indexación",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Abrir la web académica de la Semana 14.",
        "Crear propiedad de tipo Prefijo de URL.",
        "Utilizar el prefijo exacto de GitHub Pages.",
        "Verificar mediante etiqueta HTML u otro método permitido.",
        "Conservar la etiqueta de verificación en index.html.",
        "Inspeccionar la URL principal.",
        "Identificar la directiva noindex y documentar la decisión del equipo.",
        "Generar y publicar sitemap.xml.",
        "Registrar el sitemap en Search Console.",
        "Guardar evidencias y redactar un diagnóstico técnico.",
      ],
      deliverable:
        "Propiedad verificada, URL inspeccionada, sitemap y diagnóstico.",
    },
    {
      title: "Laboratorio 2: Dashboard de Looker Studio",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Crear un informe en Looker Studio.",
        "Conectar la propiedad GA4 de la Semana 15 si existe acceso.",
        "Revisar usuarios, sesiones, eventos y eventos clave.",
        "Crear tarjetas de indicadores.",
        "Crear gráfico de eventos por nombre.",
        "Crear tabla o gráfico de eventos clave si hay datos.",
        "Identificar fuente y período analizado.",
        "Redactar tres conclusiones y limitaciones.",
        "Utilizar Google Sheets con datos ficticios si se requiere.",
        "Compartir enlace o capturas con permisos adecuados.",
      ],
      deliverable:
        "Dashboard funcional, fuente identificada, tres conclusiones y evidencias.",
    },
  ],

  homework: {
    title:
      "Tarea 16: Organización del informe integral SEO, SEM, AEO, GEO y analítica",
    modality: "Grupal",
    delivery: "T16_EQUIPO.pdf",
    deadline: "Antes de la Semana 17",
    pages: "10 a 15 páginas, más anexos",
    instructions: [
      "Recuperar la auditoría SEO de la empresa real.",
      "Integrar keywords y competidores.",
      "Incluir el roadmap SEO de 90 días.",
      "Documentar la estrategia SEM simulada.",
      "Agregar anuncios, landing page y plan de medios.",
      "Incorporar el dashboard SEM simulado.",
      "Incluir propuestas AEO y auditoría GEO.",
      "Registrar la URL de la web académica.",
      "Adjuntar evidencias de GA4, GTM y Search Console.",
      "Incorporar el dashboard de Looker Studio.",
      "Proponer cinco recomendaciones prioritarias.",
      "Separar hallazgos reales, propuestas y datos simulados.",
    ],
  },

  rubric: [
    { criterion: "Verificación de Search Console", points: 20 },
    { criterion: "Diagnóstico de indexación y sitemap", points: 20 },
    { criterion: "Configuración de fuente de datos", points: 15 },
    { criterion: "Diseño y funcionamiento del dashboard", points: 25 },
    { criterion: "Interpretación y evidencias", points: 20 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 16",
      title: "Search Console y dashboards",
      subtitle: "Indexación, sitemap XML y Looker Studio",
      body: "Verificaremos nuestra web académica y convertiremos los datos disponibles en un informe visual.",
      image: `${IMG}portada-search-console.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "Mi página funciona, pero Google no la muestra",
      accent: "PUBLICADA NO SIGNIFICA INDEXADA",
      body: "Abre la URL de tu web académica. Formula tres hipótesis sobre por qué puede no aparecer en Google Search.",
      question:
        "¿Una URL que funciona desde el navegador está necesariamente indexada?",
      image: `${IMG}desafio-indexacion.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTO · 4 MIN",
      title: "¿Qué es Google Search Console?",
      columns: ["Herramienta", "Qué permite estudiar", "Ejemplo"],
      rows: [
        ["GA4", "Actividad medida en la web", "Sesiones y eventos"],
        ["Search Console", "Presencia en Google Search", "Indexación y clics"],
        ["GTM", "Administración de etiquetas", "faq_open"],
        ["Looker Studio", "Visualización de información", "Dashboard"],
      ],
      note: "Los clics de Search Console no equivalen necesariamente a las sesiones de GA4.",
      image: `${IMG}comparacion-herramientas.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "CONCEPTOS · 5 MIN",
      title: "Publicación, rastreo, indexación y posicionamiento",
      columns: ["Estado", "Significado", "¿Garantiza el siguiente?"],
      rows: [
        ["Publicación", "La URL está disponible", "No"],
        ["Descubrimiento", "Google conoce la URL", "No"],
        ["Rastreo", "Google solicita la página", "No"],
        ["Indexación", "Google puede incluirla en su índice", "No"],
        ["Posicionamiento", "Puede aparecer para una consulta", "No es fijo"],
      ],
      question: "¿Puede Google rastrear una página y decidir no indexarla?",
      image: `${IMG}flujo-indexacion.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "DEMOSTRACIÓN · 11 MIN",
      title: "Sitemap, robots y dashboards",
      columns: ["Elemento", "Función", "Precaución"],
      rows: [
        ["sitemap.xml", "Declarar URLs relevantes", "No garantiza indexación"],
        ["robots.txt", "Orientar el rastreo", "No equivale a noindex"],
        ["Meta robots", "Definir directivas de indexación", "Revisar noindex"],
        ["Looker Studio", "Representar datos", "Identificar su origen"],
      ],
      note: "El docente explica la generación de sitemap.xml y muestra un dashboard con datos claramente simulados.",
      image: `${IMG}sitemap-dashboard.webp`,
    },
    {
      id: 6,
      kind: "seo16-gsc-lab",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Verifica y diagnostica tu web",
      subtitle: "Search Console, inspección y sitemap",
      instructions:
        "Registra tu propiedad, inspecciona la URL, documenta noindex y descarga tu sitemap.xml.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Después construiremos el dashboard.",
    },
    {
      id: 8,
      kind: "seo16-looker-guide",
      block: "LABORATORIO 2 · GUÍA · 10 MIN",
      title: "Conecta GA4 con Looker Studio",
      subtitle: "Recurso guiado dentro de Aula Digital",
      instructions:
        "Crea un informe y conecta la propiedad académica de Analytics.",
    },
    {
      id: 9,
      kind: "seo16-dashboard-resource",
      block: "LABORATORIO 2 · RECURSOS · 15 MIN",
      title: "Construye cuatro visualizaciones",
      subtitle: "Dashboard y conjunto de datos de respaldo",
      instructions:
        "Utiliza GA4 o descarga un CSV con datos de demostración para Google Sheets.",
    },
    {
      id: 10,
      kind: "seo16-dashboard-lab",
      block: "LABORATORIO 2 · CIERRE · 10 MIN",
      title: "Interpreta y documenta tu dashboard",
      subtitle: "Fuente, visualizaciones, tres conclusiones y PDF",
      instructions:
        "Registra el enlace, las evidencias y las limitaciones del informe.",
    },
    {
      id: 11,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "Defiende tu diagnóstico y dashboard",
      body: "Demuestra la propiedad verificada, explica el estado de indexación y presenta los indicadores que sí puedes interpretar.",
      question: "¿Qué información falta para emitir conclusiones sólidas?",
      image: `${IMG}defensa-dashboard.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "De los datos al informe profesional",
      body: "Recupera las evidencias de SEO, SEM, AEO, GEO y analítica. Organiza un borrador de informe de consultoría de 10 a 15 páginas.",
      note: "Entrega T16_EQUIPO.pdf antes de la Semana 17.",
      next: "SEMANA 17 · Consultoría digital: informe ejecutivo integrado.",
      image: `${IMG}informe-consultoria.webp`,
    },
  ],
};

export default semana16;
