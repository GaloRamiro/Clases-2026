const IMG = "/images/seo/semana17/";

const semana17 = {
  id: "seo-semana-17",
  courseId: "seo",
  number: 17,
  title:
    "Consultoría digital: informe ejecutivo y plan estratégico SEO, SEM, AEO y GEO",
  subtitle: "De los hallazgos técnicos a las decisiones empresariales",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Integrar auditorías SEO, estrategias SEM, propuestas AEO y GEO y prácticas de analítica en un informe ejecutivo con recomendaciones, indicadores y un plan de implementación de 90 días.",

  challenge:
    "Si el gerente de la empresa solo acepta tres recomendaciones, ¿cuáles elegirías y cómo las defenderías?",

  project: {
    name: "Expediente SEO + SEM + AEO + GEO",
    description:
      "La empresa real es el caso principal de consultoría. Las configuraciones técnicas y sus resultados pertenecen a la web académica.",
    deliverable:
      "Informe integral, matriz de prioridades, roadmap de 90 días y presentación ejecutiva preliminar.",
    restriction:
      "No afirmar que se modificó el sitio de la empresa, que se ejecutaron campañas o que los resultados simulados son reales.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: tres recomendaciones para el gerente",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Informe, evidencia, prioridades y KPI",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: diagnóstico ejecutivo",
      minutes: 25,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Laboratorio 2: informe, roadmap y presentación",
      minutes: 35,
    },
    {
      time: "100–115",
      title: "Comité de consultoría y revisión por pares",
      minutes: 15,
    },
    {
      time: "115–120",
      title: "Cierre y preparación de la defensa",
      minutes: 5,
    },
  ],

  tools: [
    {
      name: "Google Docs",
      url: "https://docs.google.com/document/",
      purpose: "Redacción del informe ejecutivo.",
    },
    {
      name: "Google Sheets",
      url: "https://sheets.google.com/",
      purpose: "Matriz de hallazgos y roadmap.",
    },
    {
      name: "Canva",
      url: "https://www.canva.com/",
      purpose: "Presentación ejecutiva.",
    },
    {
      name: "Looker Studio",
      url: "https://lookerstudio.google.com/",
      purpose: "Evidencia del dashboard académico.",
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      purpose: "Referencia de la web académica.",
    },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Diagnóstico ejecutivo y priorización",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Recuperar las auditorías anteriores.",
        "Seleccionar diez hallazgos de la empresa real.",
        "Clasificarlos por área SEO, SEM, AEO o GEO.",
        "Agregar una evidencia pública verificable.",
        "Explicar el impacto potencial de cada problema.",
        "Proponer acciones correctivas concretas.",
        "Estimar impacto y esfuerzo.",
        "Elegir cinco recomendaciones prioritarias.",
        "Justificar la selección.",
        "Redactar un resumen ejecutivo de 150 a 250 palabras.",
      ],
      deliverable:
        "Matriz de diez hallazgos, cinco prioridades y resumen ejecutivo.",
    },
    {
      title: "Laboratorio 2: Informe integral y roadmap",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Organizar el índice del informe.",
        "Integrar auditorías y estrategia SEO.",
        "Agregar campaña SEM simulada.",
        "Incluir propuestas AEO y GEO.",
        "Documentar la web académica y la analítica.",
        "Crear un roadmap de 90 días con ocho acciones.",
        "Definir responsables, dependencias y KPI.",
        "Diseñar una presentación de ocho a diez diapositivas.",
        "Realizar una revisión por pares.",
        "Registrar tres correcciones antes de la defensa.",
      ],
      deliverable: "Informe consolidado, roadmap y presentación preliminar.",
    },
  ],

  homework: {
    title: "Tarea 17: Entrega del portafolio final y preparación de la defensa",
    modality: "Grupal",
    delivery: "T17_EQUIPO.pdf",
    deadline: "Antes de la Semana 18",
    instructions: [
      "Aplicar las correcciones de la Semana 17.",
      "Verificar las evidencias y las fuentes.",
      "Finalizar el informe de consultoría.",
      "Finalizar el roadmap de 90 días.",
      "Preparar la presentación ejecutiva.",
      "Organizar los anexos.",
      "Incluir la URL de la web académica.",
      "Verificar las capturas de GA4, GTM, GSC y Looker Studio.",
      "Asignar una sección a cada integrante.",
      "Ensayar la defensa.",
      "Preparar respuestas para el comité.",
      "Comprobar que todos los archivos abren.",
    ],
  },

  rubric: [
    {
      criterion: "Diagnóstico ejecutivo y evidencias",
      points: 20,
    },
    {
      criterion: "Integración SEO, SEM, AEO y GEO",
      points: 20,
    },
    {
      criterion: "Priorización de recomendaciones",
      points: 20,
    },
    {
      criterion: "Roadmap de 90 días y KPI",
      points: 20,
    },
    {
      criterion: "Presentación y revisión por pares",
      points: 20,
    },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "UNIDAD 05 · SEMANA 17",
      title: "De analistas a consultores digitales",
      subtitle: "Informe ejecutivo y estrategia SEO, SEM, AEO y GEO",
      body: "Hoy convertiremos dieciséis semanas de investigación en decisiones empresariales.",
      image: `${IMG}portada-consultoria.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "El gerente solo acepta tres recomendaciones",
      accent: "¿CUÁLES ELEGIRÍAS?",
      body: "Revisa tus hallazgos. Selecciona tres acciones y defiéndelas según impacto, esfuerzo y evidencia.",
      question: "¿Qué problema resolverías primero y por qué?",
      image: `${IMG}desafio-gerente.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTO · 5 MIN",
      title: "Anatomía de un informe de consultoría",
      columns: ["Sección", "Pregunta que responde"],
      rows: [
        ["Resumen ejecutivo", "¿Qué debe decidir el gerente?"],
        ["Diagnóstico", "¿Qué problemas se identificaron?"],
        ["Evidencias", "¿Cómo se comprobaron?"],
        ["Estrategia", "¿Qué se recomienda?"],
        ["Roadmap", "¿Cuándo y quién podría implementarlo?"],
        ["KPI", "¿Cómo se evaluaría?"],
      ],
      image: `${IMG}informe-ejecutivo.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "DEMOSTRACIÓN · 5 MIN",
      title: "Del hallazgo a la recomendación",
      columns: ["Elemento", "Ejemplo hipotético"],
      rows: [
        ["Hallazgo", "Títulos de páginas poco descriptivos"],
        ["Evidencia", "Capturas y revisión pública de title"],
        ["Recomendación", "Proponer títulos únicos y relevantes"],
        ["Indicador", "Porcentaje de títulos revisados"],
        ["Dependencia", "Aprobación y acceso al CMS"],
      ],
      note: "No prometer posiciones, ventas ni mejoras que todavía no se han medido.",
      image: `${IMG}hallazgo-recomendacion.webp`,
    },
    {
      id: 5,
      kind: "seo17-priority-guide",
      block: "DEMOSTRACIÓN · 10 MIN",
      title: "Prioriza por impacto, esfuerzo y urgencia",
      subtitle: "Calculadora didáctica y roadmap de 90 días",
      instructions:
        "Evalúa una acción, justifica su prioridad y revisa las tres fases del roadmap.",
    },
    {
      id: 6,
      kind: "seo17-diagnosis-lab",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Construye tu diagnóstico ejecutivo",
      subtitle: "Diez hallazgos, cinco prioridades y resumen ejecutivo",
      instructions:
        "Completa la matriz con evidencias reales de la empresa investigada.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Regresamos para construir el informe final.",
    },
    {
      id: 8,
      kind: "seo17-report-guide",
      block: "LABORATORIO 2 · PARTE A · 12 MIN",
      title: "Integra el portafolio de consultoría",
      subtitle: "Índice profesional y guía de consolidación",
      instructions:
        "Organiza las evidencias anteriores en un informe coherente.",
    },
    {
      id: 9,
      kind: "seo17-roadmap-lab",
      block: "LABORATORIO 2 · PARTE B · 13 MIN",
      title: "Construye el roadmap de 90 días",
      subtitle: "Ocho acciones, responsables, dependencias y KPI",
      instructions:
        "Distribuye las acciones entre los días 1–30, 31–60 y 61–90.",
    },
    {
      id: 10,
      kind: "seo17-presentation-lab",
      block: "LABORATORIO 2 · PARTE C · 10 MIN",
      title: "Prepara tu presentación ejecutiva",
      subtitle: "Ocho a diez diapositivas",
      instructions:
        "Organiza la defensa y registra el enlace de la presentación preliminar.",
    },
    {
      id: 11,
      kind: "seo17-peer-review",
      block: "COMITÉ DE CONSULTORÍA · 15 MIN",
      title: "Revisión cruzada entre equipos",
      subtitle: "Presentación de tres minutos y tres correcciones",
      instructions:
        "Evalúa claridad, evidencias, viabilidad, KPI y separación de entornos.",
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "Prepárate para defender tu propuesta",
      body: "Finaliza el informe, roadmap, presentación y anexos. Todos los integrantes deben participar en la defensa.",
      note: "Entrega antes de la Semana 18.",
      next: "SEMANA 18 · Presentación y defensa final del proyecto.",
      image: `${IMG}defensa-final.webp`,
    },
  ],
};

export default semana17;
