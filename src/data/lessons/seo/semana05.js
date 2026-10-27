const IMG = "/images/seo/semana05/";

const semana05 = {
  id: "seo-semana-5",
  courseId: "seo",
  number: 5,
  title: "SEO técnico: rastreo, indexación y rendimiento web",
  subtitle: "¿Google puede encontrar, interpretar y acceder a tu página?",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Evaluar los aspectos técnicos de un sitio web mediante herramientas gratuitas de diagnóstico, identificando problemas de rastreo, indexación, rendimiento, experiencia móvil y configuración SEO para proponer soluciones priorizadas.",

  challenge:
    "¿De qué sirve tener una página optimizada si Google no puede encontrarla o acceder correctamente a ella?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description: "Continuación de la página SEO desarrollada en la Semana 4.",
    finalDeliverable:
      "Auditoría técnica con evidencias y plan de cinco acciones correctivas.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: mi página existe, pero no aparece",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Rastreo, indexación, Core Web Vitals y SEO técnico",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: rastreo e indexación",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: rendimiento y experiencia móvil",
      minutes: 35,
    },
    {
      time: "100–120",
      title: "Defensa de auditorías, retroalimentación y deber",
      minutes: 20,
    },
  ],

  labSteps: [
    {
      title: "Revisar URL y HTTPS",
      minutes: 5,
      instruction:
        "Comprobar que la página carga correctamente y utiliza HTTPS cuando está publicada.",
    },
    {
      title: "Inspeccionar configuración SEO",
      minutes: 10,
      instruction:
        "Revisar robots.txt, sitemap XML y canonical cuando sea posible.",
    },
    {
      title: "Verificar indexación",
      minutes: 10,
      instruction:
        "Consultar Google Search Console únicamente si existe acceso autorizado y registrar evidencias.",
    },
    {
      title: "Analizar rendimiento",
      minutes: 15,
      instruction:
        "Utilizar PageSpeed Insights sobre una URL pública o analizar un reporte de demostración.",
    },
    {
      title: "Evaluar experiencia móvil",
      minutes: 10,
      instruction:
        "Comprobar legibilidad, imágenes, navegación, botones y adaptación móvil.",
    },
    {
      title: "Priorizar soluciones",
      minutes: 10,
      instruction:
        "Proponer cinco mejoras, estimar impacto y esfuerzo, y seleccionar dos prioridades.",
    },
  ],

  homework: {
    title: "Trabajo autónomo 5 — Plan de mejora técnica y reputación digital",
    delivery: "T5_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    instructions: [
      "Revisar los hallazgos de los dos laboratorios.",
      "Seleccionar cinco mejoras técnicas prioritarias.",
      "Explicar problema, solución e impacto esperado de cada mejora.",
      "Implementar una corrección sencilla si existe acceso autorizado; de lo contrario, documentar el procedimiento.",
      "Buscar el nombre de la empresa en Google.",
      "Identificar hasta tres menciones externas reales, cuando existan.",
      "Investigar su presencia en Google Maps o Google Business Profile.",
      "Redactar tres oportunidades de reputación y visibilidad externa.",
      "Entregar un PDF de tres a cuatro páginas con evidencias.",
    ],
    note: "Para empresas ficticias, analizar competidores reales y proponer acciones futuras. No crear fichas comerciales falsas ni inventar reseñas.",
  },

  rubric: [
    {
      criterion: "Rastreo, indexación y configuración técnica",
      points: 25,
    },
    {
      criterion: "Análisis de rendimiento y métricas",
      points: 25,
    },
    {
      criterion: "Evaluación de experiencia móvil",
      points: 15,
    },
    {
      criterion: "Identificación y priorización de mejoras",
      points: 25,
    },
    {
      criterion: "Evidencias y justificación técnica",
      points: 10,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 05",
      title: "SEO técnico: rastreo, indexación y rendimiento",
      subtitle:
        "Una página debe ser accesible antes de competir por visibilidad",
      body: "Hoy auditaremos la página de nuestro proyecto para identificar problemas técnicos, analizar rendimiento y proponer soluciones basadas en evidencias.",
      image: `${IMG}portada-seo-tecnico.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 10 MIN",
      title: "Mi página existe, pero no aparece",
      accent: "PUBLICAR NO GARANTIZA POSICIONAR",
      body: "Una empresa publica una página con buen contenido, pero no consigue visibilidad en Google. Existen distintas explicaciones: problemas de acceso, indexación, relevancia o competencia.",
      quote:
        "Una página indexada puede no posicionarse bien; una página no indexada no puede aparecer como resultado orgánico habitual.",
      question:
        "Propongan tres hipótesis y clasifiquen cuáles son problemas de indexación y cuáles de posicionamiento.",
      note: "Trabajo en equipos: 5 minutos de análisis y 5 de discusión.",
      image: `${IMG}pagina-no-aparece.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 4 MIN",
      title: "¿Qué es SEO técnico?",
      accent: "LA BASE TÉCNICA DEL POSICIONAMIENTO",
      body: "El SEO técnico analiza condiciones que permiten a los buscadores descubrir, rastrear, interpretar e indexar contenidos. También considera rendimiento, accesibilidad y funcionamiento del sitio.",
      quote:
        "Un contenido excelente necesita una base técnica que permita encontrarlo y utilizarlo.",
      question:
        "Identifica tres elementos técnicos que podrías comprobar en tu página.",
      image: `${IMG}fundamentos-seo-tecnico.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "PROCESO DE BÚSQUEDA · 5 MIN",
      title: "Rastreo, indexación y posicionamiento",
      subtitle: "Son procesos relacionados, pero no significan lo mismo.",
      columns: ["Etapa", "Qué sucede", "Pregunta"],
      rows: [
        [
          "Descubrimiento",
          "El buscador conoce la existencia de una URL.",
          "¿Puede encontrarla?",
        ],
        [
          "Rastreo",
          "El robot solicita y procesa recursos de la página.",
          "¿Puede acceder?",
        ],
        [
          "Indexación",
          "El buscador decide si incorpora el contenido al índice.",
          "¿Puede incluirla?",
        ],
        [
          "Posicionamiento",
          "El sistema selecciona y ordena resultados para una búsqueda.",
          "¿Es relevante para la consulta?",
        ],
      ],
      note: "Actividad: ordena las etapas y explica por qué estar indexado no garantiza aparecer en los primeros resultados.",
      image: `${IMG}rastreo-indexacion.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "CONFIGURACIÓN TÉCNICA · 5 MIN",
      title: "Robots.txt, sitemap y canonical",
      subtitle: "Tres elementos con funciones diferentes.",
      columns: ["Elemento", "Función", "Precaución"],
      rows: [
        [
          "robots.txt",
          "Comunica reglas de rastreo a robots compatibles.",
          "No garantiza desindexación.",
        ],
        [
          "Sitemap XML",
          "Facilita el descubrimiento de URLs relevantes.",
          "No garantiza indexación.",
        ],
        [
          "Canonical",
          "Indica una URL preferida entre versiones similares.",
          "Es una señal, no una orden absoluta.",
        ],
      ],
      question:
        "¿Qué revisarías si una URL importante está bloqueada para el rastreo?",
      image: `${IMG}robots-sitemap-canonical.webp`,
    },
    {
      id: 6,
      kind: "seo-crawl-audit",
      block: "LABORATORIO 1 · 25 MIN",
      title: "¿Google puede rastrear e indexar tu sitio?",
      subtitle: "URL, HTTPS, robots.txt, sitemap XML, canonical e indexación",
      instructions:
        "Recupera la página de la Semana 4. Registra cada comprobación como correcta, problemática o no verificable, añade evidencias y explica dos hallazgos.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Regresamos para analizar rendimiento y experiencia móvil.",
      body: "Prepara la URL pública de tu proyecto o el reporte de demostración proporcionado por el docente.",
    },
    {
      id: 8,
      kind: "statement",
      block: "RENDIMIENTO · 15 MIN",
      title: "Core Web Vitals y PageSpeed Insights",
      accent: "NO TODAS LAS MÉTRICAS MIDEN LO MISMO",
      body: "LCP mide la carga del contenido principal; INP evalúa la respuesta a interacciones y CLS mide la estabilidad visual. PageSpeed Insights puede mostrar datos de usuarios reales y pruebas de laboratorio.",
      quote: "LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1",
      question:
        "¿Qué diferencia existe entre una puntuación de laboratorio y una medición de usuarios reales?",
      note: "Los valores son umbrales orientativos de buena experiencia, no resultados de los estudiantes. Si no existen datos de campo, registra 'No disponible'.",
      image: `${IMG}core-web-vitals.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "EXPERIENCIA MÓVIL · 10 MIN",
      title: "¿Tu página funciona desde un teléfono?",
      accent: "MOBILE FIRST",
      body: "Comprueba legibilidad, adaptación de imágenes, navegación, botones y estabilidad de los elementos visuales. Identifica tres problemas o aspectos correctos mediante observación directa.",
      quote:
        "Una página usable en escritorio también debe ofrecer una buena experiencia móvil.",
      question:
        "¿Qué ocurre si el usuario necesita ampliar la pantalla para leer o pulsar un botón?",
      image: `${IMG}auditoria-movil.webp`,
    },
    {
      id: 10,
      kind: "seo-performance-audit",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Rendimiento, experiencia móvil y cinco mejoras",
      subtitle:
        "PageSpeed Insights, Core Web Vitals, checklist móvil y prioridades",
      instructions:
        "Analiza una URL pública o un informe de demostración, registra las métricas disponibles, revisa la experiencia móvil y propone cinco acciones correctivas.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA DE AUDITORÍAS · 15 MIN",
      title: "Defiende tu diagnóstico SEO",
      body: "Cada equipo selecciona dos hallazgos técnicos y explica cuál debe resolverse primero, por qué y qué evidencia respalda la decisión.",
      quote:
        "Una auditoría útil no solo identifica errores: establece prioridades.",
      question:
        "¿Qué problema tiene mayor impacto y qué tan difícil sería corregirlo?",
      note: "Presentaciones breves y retroalimentación del docente.",
      image: `${IMG}defensa-auditoria.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO · 5 MIN",
      title: "Prepara la reputación digital de tu empresa",
      body: "Consolida cinco mejoras técnicas, documenta una corrección o procedimiento, investiga menciones externas y analiza la presencia local de tu empresa.",
      note: "Entrega grupal en Moodle: T5_APELLIDO_NOMBRE.pdf. Extensión: 3 a 4 páginas.",
      next: "SEMANA 06 · SEO Off Page, autoridad, backlinks y posicionamiento local.",
      image: `${IMG}trabajo-autonomo.webp`,
    },
  ],
};

export default semana05;
