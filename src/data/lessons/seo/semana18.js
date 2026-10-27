const IMG = "/images/seo/semana18/";

const semana18 = {
  id: "seo-semana-18",
  courseId: "seo",
  number: 18,
  title: "Defensa final del proyecto de consultoría SEO, SEM, AEO y GEO",
  subtitle: "De estudiantes a consultores digitales",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Presentar y defender una propuesta integral de consultoría SEO, SEM, AEO y GEO para una empresa real, justificando hallazgos, estrategias, decisiones, indicadores y recomendaciones mediante evidencias verificables.",

  challenge:
    "¿Puedes convencer a un comité de que tus recomendaciones son necesarias, viables y están sustentadas en evidencias?",

  project: {
    name: "Consultoría integral SEO + SEM + AEO + GEO",
    description:
      "Presentación y defensa del proyecto acumulativo desarrollado durante las 17 semanas anteriores.",
    deliverable:
      "Informe final, presentación ejecutiva, roadmap de 90 días, evidencias y defensa oral.",
    restriction:
      "Las auditorías corresponden a la empresa real. Las campañas SEM son simuladas y las pruebas de analítica pertenecen a la web académica.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Apertura y reglas de defensa",
      minutes: 10,
    },
    {
      time: "10–25",
      title: "Última revisión de evidencias",
      minutes: 15,
    },
    {
      time: "25–55",
      title: "Primera ronda de defensas",
      minutes: 30,
    },
    {
      time: "55–65",
      title: "Receso",
      minutes: 10,
    },
    {
      time: "65–100",
      title: "Segunda ronda de defensas",
      minutes: 35,
    },
    {
      time: "100–115",
      title: "Retroalimentación profesional",
      minutes: 15,
    },
    {
      time: "115–120",
      title: "Cierre del semestre",
      minutes: 5,
    },
  ],

  rubric: [
    {
      criterion: "Diagnóstico SEO y evidencias",
      points: 20,
    },
    {
      criterion: "Estrategia SEM y decisiones",
      points: 15,
    },
    {
      criterion: "Propuestas AEO y GEO",
      points: 15,
    },
    {
      criterion: "Analítica y demostración técnica",
      points: 15,
    },
    {
      criterion: "Roadmap, KPI y recomendaciones",
      points: 15,
    },
    {
      criterion: "Presentación ejecutiva",
      points: 10,
    },
    {
      criterion: "Defensa oral y participación",
      points: 10,
    },
  ],

  homework: {
    title: "Proyecto final: Consultoría integral SEO, SEM, AEO y GEO",
    modality: "Grupal",
    delivery: "PROYECTO_FINAL_SEO_EQUIPO.pdf",
    deadline: "Según la fecha establecida en Moodle",
    instructions: [
      "Entregar el informe integral de consultoría.",
      "Incluir auditoría SEO y competidores.",
      "Presentar la estrategia de palabras clave.",
      "Incorporar campañas SEM simuladas y presupuesto.",
      "Agregar contenidos AEO.",
      "Presentar auditoría y recomendaciones GEO.",
      "Incluir evidencias técnicas de la web académica.",
      "Presentar el roadmap de 90 días.",
      "Incluir KPI y cinco recomendaciones prioritarias.",
      "Preparar entre ocho y diez diapositivas.",
      "Participar en la defensa oral.",
      "Responder preguntas con evidencias.",
    ],
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "UNIDAD 05 · SEMANA 18",
      title: "Hoy eres consultor digital",
      subtitle: "Defensa final SEO, SEM, AEO y GEO",
      body: "Presenta decisiones empresariales sustentadas en evidencias.",
      image: `${IMG}portada-defensa.webp`,
    },
    {
      id: 2,
      kind: "seo18-rules",
      block: "APERTURA · 5 MIN",
      title: "Reglas y criterios de evaluación",
      subtitle: "Participación, evidencias, tiempos y rúbrica",
    },
    {
      id: 3,
      kind: "seo18-checklist",
      block: "PREPARACIÓN · 5 MIN",
      title: "Revisión del informe ejecutivo",
      subtitle: "Portada, resumen, diagnóstico y fuentes",
    },
    {
      id: 4,
      kind: "seo18-presentation-guide",
      block: "PREPARACIÓN · 5 MIN",
      title: "Revisión de presentación y roadmap",
      subtitle: "Diez diapositivas y plan de 90 días",
    },
    {
      id: 5,
      kind: "seo18-evidence",
      block: "PREPARACIÓN · 5 MIN",
      title: "Verificación de evidencias técnicas",
      subtitle: "Web académica, GA4, GTM, GSC y Looker Studio",
    },
    {
      id: 6,
      kind: "seo18-defense",
      block: "EVALUACIÓN · 30 MIN",
      title: "Primera ronda de defensas",
      subtitle: "Presentación, preguntas y evaluación",
      round: 1,
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
    },
    {
      id: 8,
      kind: "seo18-defense",
      block: "EVALUACIÓN · 35 MIN",
      title: "Segunda ronda de defensas",
      subtitle: "Presentación, preguntas y evaluación",
      round: 2,
    },
    {
      id: 9,
      kind: "seo18-reflection",
      block: "RETROALIMENTACIÓN · 5 MIN",
      title: "¿Qué implementarías primero?",
      subtitle: "Prioridad, impacto y viabilidad",
    },
    {
      id: 10,
      kind: "seo18-reflection",
      block: "REFLEXIÓN · 5 MIN",
      title: "¿Qué aprendimos sobre los datos?",
      subtitle: "Hallazgos, simulaciones y mediciones reales",
    },
    {
      id: 11,
      kind: "seo18-portfolio",
      block: "CIERRE PROFESIONAL · 5 MIN",
      title: "Del proyecto al portafolio profesional",
      subtitle: "Tres evidencias de tus competencias",
    },
    {
      id: 12,
      kind: "seo18-final",
      block: "CIERRE · 5 MIN",
      title: "Proyecto concluido",
      subtitle: "Evaluación final y reflexión del semestre",
      body: "Has desarrollado una propuesta integral de posicionamiento digital, desde el diagnóstico hasta la defensa de decisiones estratégicas.",
      image: `${IMG}cierre-semestre.webp`,
    },
  ],
};

export default semana18;
