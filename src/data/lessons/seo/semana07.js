const IMG = "/images/seo/semana07/";

const semana07 = {
  id: "seo-semana-7",
  courseId: "seo",
  number: 7,
  title: "Auditoría SEO integral y plan estratégico de 90 días",
  subtitle: "De los problemas encontrados a una estrategia ejecutable",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Integrar los resultados de las auditorías SEO realizadas durante las seis primeras semanas, priorizando oportunidades de mejora y desarrollando un plan estratégico de posicionamiento orgánico para una empresa real.",

  challenge:
    "Si tuvieras solamente 90 días para mejorar el posicionamiento de una empresa, ¿qué problemas resolverías primero?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description:
      "Consolidación de las investigaciones y auditorías externas realizadas sobre la misma empresa real desde la Semana 1.",
    finalDeliverable:
      "Informe de auditoría SEO integral y roadmap de 90 días con diez acciones priorizadas, indicadores y responsables propuestos.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: tienes 90 días para mejorar el SEO",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Auditoría integral, priorización y KPI",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: diagnóstico SEO integral",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: roadmap SEO de 90 días",
      minutes: 35,
    },
    {
      time: "100–120",
      title: "Presentación ejecutiva y deber",
      minutes: 20,
    },
  ],

  tools: [
    {
      name: "Google Search",
      url: "https://www.google.com/",
      purpose: "Verificar búsquedas, páginas y competidores.",
      access: "Público, sin permisos administrativos.",
    },
    {
      name: "PageSpeed Insights",
      url: "https://pagespeed.web.dev/",
      purpose: "Consultar y documentar evidencias técnicas.",
      access: "URLs públicas.",
    },
    {
      name: "Google Trends",
      url: "https://trends.google.com/trends/",
      purpose: "Contrastar tendencias de búsqueda.",
      access: "Público.",
    },
    {
      name: "Google Sheets",
      url: "https://sheets.google.com/",
      purpose: "Organizar matrices y prioridades.",
      access: "Cuenta gratuita.",
    },
    {
      name: "Google Slides",
      url: "https://slides.google.com/",
      purpose: "Preparar una presentación ejecutiva.",
      access: "Cuenta gratuita.",
    },
  ],

  homework: {
    title: "Tarea 7: ¿Cuándo debería una empresa invertir en Google Ads?",
    delivery: "T7_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    deadline: "Antes de la Semana 8",
    instructions: [
      "Recuperar las doce keywords estratégicas de la Semana 2.",
      "Seleccionar cinco búsquedas comerciales o transaccionales.",
      "Realizar las búsquedas en Google.",
      "Observar si aparecen anuncios patrocinados.",
      "Registrar los anunciantes identificables.",
      "Guardar tres capturas de anuncios, si se encuentran.",
      "Seleccionar un producto o servicio para promocionar.",
      "Proponer un objetivo inicial de Google Ads.",
      "Explicar cuándo convendría complementar SEO con SEM.",
      "Entregar un documento PDF de dos a tres páginas.",
    ],
    note: "No crear campañas activas, registrar métodos de pago ni gastar dinero. Si no aparecen anuncios, documentar ese resultado.",
  },

  rubric: [
    {
      criterion: "Integración de las auditorías anteriores",
      points: 20,
    },
    {
      criterion: "Calidad de los diez hallazgos y evidencias",
      points: 25,
    },
    {
      criterion: "Priorización estratégica",
      points: 20,
    },
    {
      criterion: "Roadmap y definición de KPI",
      points: 25,
    },
    {
      criterion: "Presentación y argumentación",
      points: 10,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 07",
      title: "Auditoría SEO integral y roadmap de 90 días",
      subtitle: "De los datos a las decisiones estratégicas",
      body: "Hoy trabajaremos como consultores SEO: consolidaremos seis semanas de investigación, identificaremos diez hallazgos y construiremos un plan profesional de posicionamiento.",
      image: `${IMG}portada-auditoria-integral.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "Tienes 90 días para mejorar una empresa",
      accent: "NO PUEDES CORREGIRLO TODO A LA VEZ",
      body: "Una empresa presenta problemas de contenido, visibilidad, rendimiento y reputación. Sus recursos son limitados y necesita decidir por dónde empezar.",
      quote:
        "Una buena estrategia no consiste en hacer todo, sino en elegir qué hacer primero.",
      question:
        "¿Qué tres problemas resolverías primero y cómo justificarías tu decisión?",
      note: "Cada equipo selecciona tres prioridades y presenta sus razones.",
      image: `${IMG}desafio-90-dias.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTOS · 5 MIN",
      title: "¿Qué integra una auditoría SEO?",
      subtitle: "Un diagnóstico profesional combina distintas áreas.",
      columns: ["Área", "Pregunta de auditoría"],
      rows: [
        ["Keyword Research", "¿Qué buscan los clientes potenciales?"],
        ["Benchmarking", "¿Qué hacen mejor los competidores?"],
        ["SEO On Page", "¿El contenido responde a la intención de búsqueda?"],
        ["SEO técnico", "¿Existen barreras de rastreo, acceso o rendimiento?"],
        [
          "SEO Off Page",
          "¿Qué reputación y presencia externa tiene la empresa?",
        ],
      ],
      note: "Actividad: clasifica cinco hallazgos de tu investigación según el área correspondiente.",
      image: `${IMG}areas-auditoria.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "ANÁLISIS PROFESIONAL · 5 MIN",
      title: "De los datos a los hallazgos",
      subtitle: "Una observación no es lo mismo que una recomendación.",
      columns: ["Elemento", "Ejemplo ilustrativo"],
      rows: [
        ["Observación", "El H1 de la página es poco descriptivo."],
        ["Evidencia", "Captura de la página pública y URL."],
        ["Problema", "El encabezado no comunica claramente el tema."],
        ["Impacto potencial", "Menor claridad para usuarios y buscadores."],
        [
          "Recomendación",
          "Redactar un H1 específico y coherente con el contenido.",
        ],
      ],
      question:
        "¿Cómo transformarías una observación de tu empresa en una recomendación verificable?",
      image: `${IMG}hallazgos-evidencias.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "PRIORIZACIÓN Y ROADMAP · 10 MIN",
      title: "¿Qué corregimos primero?",
      subtitle: "Impacto, esfuerzo, urgencia, dependencias y confianza.",
      columns: ["Fase", "Período", "Objetivo"],
      rows: [
        ["Fase 1", "Días 1–30", "Diagnóstico y correcciones prioritarias"],
        ["Fase 2", "Días 31–60", "Optimización de contenidos y estructura"],
        ["Fase 3", "Días 61–90", "Autoridad, seguimiento y consolidación"],
      ],
      note: "Ordena tres problemas según impacto, esfuerzo y urgencia. Considera qué evidencias son confiables y qué acciones dependen de otras.",
      image: `${IMG}roadmap-90-dias.webp`,
    },
    {
      id: 6,
      kind: "seo-integral-audit",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Construye tu auditoría SEO integral",
      subtitle: "Diez hallazgos, evidencias, impacto y recomendaciones",
      instructions:
        "Recupera las auditorías anteriores, registra diez hallazgos y distingue los problemas confirmados de las hipótesis o verificaciones pendientes.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Regresamos para construir el roadmap estratégico.",
      body: "Conserva la matriz de diez hallazgos del primer laboratorio.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 10 MIN",
      title: "Prioriza los problemas de tu empresa",
      accent: "IMPACTO, ESFUERZO Y URGENCIA",
      body: "Evalúa los diez hallazgos de la auditoría, selecciona las cinco acciones más importantes y justifica qué resultados esperas obtener.",
      quote:
        "Una prioridad debe sustentarse en evidencia, no únicamente en intuición.",
      question:
        "¿Qué cinco problemas tienen mayor importancia para la empresa?",
      image: `${IMG}matriz-prioridades.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE B · 15 MIN",
      title: "Diseña tu plan de 90 días",
      accent: "TRES FASES, DIEZ ACCIONES",
      body: "Organiza las acciones en días 1–30, 31–60 y 61–90. Define responsables propuestos, entregables y dependencias entre actividades.",
      quote:
        "Un roadmap convierte las recomendaciones en un plan de trabajo ejecutable.",
      question:
        "¿Qué acciones deben realizarse antes de optimizar contenido o medir resultados?",
      image: `${IMG}plan-implementacion.webp`,
    },
    {
      id: 10,
      kind: "seo-roadmap-lab",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Roadmap SEO y plan de medición",
      subtitle: "Diez acciones, tres fases, KPI y cinco prioridades",
      instructions:
        "Evalúa impacto, esfuerzo y urgencia; distribuye las diez acciones en tres fases, define responsables, entregables, KPI y permisos necesarios.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA EJECUTIVA · 15 MIN",
      title: "Presenta tu auditoría como una agencia",
      body: "Cada equipo expone los tres hallazgos más importantes, sus recomendaciones y la lógica de su roadmap de 90 días.",
      quote:
        "Una auditoría profesional demuestra problemas, evidencia y decisiones.",
      question:
        "¿Por qué debería la empresa ejecutar primero las acciones que propones?",
      note: "El docente adapta el tiempo de exposición al número de equipos.",
      image: `${IMG}presentacion-ejecutiva.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "¿Cuándo conviene invertir en Google Ads?",
      body: "Investiga cinco búsquedas comerciales, observa anuncios patrocinados y plantea un objetivo publicitario para tu empresa.",
      note: "Entrega grupal en Moodle: T7_APELLIDO_NOMBRE.pdf. No crear campañas activas ni realizar pagos.",
      next: "SEMANA 08 · Introducción a SEM y Google Ads.",
      image: `${IMG}transicion-seo-sem.webp`,
    },
  ],
};

export default semana07;
