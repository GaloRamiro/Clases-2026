const IMG = "/images/seo/semana12/";

const campaignData = [
  {
    id: "search",
    name: "Google Search",
    impressions: 12000,
    clicks: 480,
    spend: 150,
    conversions: 24,
    revenue: 720,
  },
  {
    id: "meta",
    name: "Meta Ads",
    impressions: 25000,
    clicks: 500,
    spend: 100,
    conversions: 10,
    revenue: 200,
  },
  {
    id: "youtube",
    name: "YouTube",
    impressions: 40000,
    clicks: 400,
    spend: 50,
    conversions: 2,
    revenue: 40,
  },
];

const semana12 = {
  id: "seo-semana-12",
  courseId: "seo",
  number: 12,
  title: "Optimización de campañas SEM: CPC, CTR, CPA, ROAS y ROI",
  subtitle: "De los indicadores a las decisiones de inversión",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Analizar el rendimiento de campañas publicitarias mediante indicadores de eficiencia, conversión y rentabilidad, para proponer acciones de optimización justificadas con datos.",

  challenge:
    "Una campaña tiene más clics que otra. ¿Significa necesariamente que es mejor?",

  project: {
    name: "Expediente SEO + SEM + AEO + GEO",
    description:
      "Continuación de la estrategia multicanal, el plan de medios y las piezas publicitarias de la Semana 11.",
    deliverable:
      "Dashboard comparativo, diagnóstico SEM, redistribución de $300 y cinco acciones de optimización.",
    restriction:
      "Los datos son simulados y no corresponden a las campañas de la empresa investigada.",
  },

  campaignData,

  formulas: [
    {
      name: "CTR",
      formula: "Clics / impresiones × 100",
      meaning: "Porcentaje de impresiones que generan clics.",
    },
    {
      name: "CPC",
      formula: "Inversión / clics",
      meaning: "Costo promedio por clic.",
    },
    {
      name: "Tasa de conversión",
      formula: "Conversiones / clics × 100",
      meaning: "Porcentaje de clics que producen una conversión atribuida.",
    },
    {
      name: "CPA",
      formula: "Inversión / conversiones",
      meaning: "Costo promedio por conversión.",
    },
    {
      name: "ROAS",
      formula: "Ingresos atribuidos / inversión publicitaria",
      meaning: "Ingresos atribuidos por dólar invertido en anuncios.",
    },
    {
      name: "ROI",
      formula: "Beneficio neto / inversión total × 100",
      meaning: "Rentabilidad calculada considerando los costos relevantes.",
    },
  ],

  schedule: [
    {
      time: "00–10",
      title: "Desafío: ¿qué campaña conservarías?",
      minutes: 10,
    },
    { time: "10–30", title: "Indicadores SEM y cálculo aplicado", minutes: 20 },
    {
      time: "30–55",
      title: "Laboratorio 1: análisis de rendimiento",
      minutes: 25,
    },
    { time: "55–65", title: "Receso", minutes: 10 },
    {
      time: "65–100",
      title: "Laboratorio 2: optimización y presupuesto",
      minutes: 35,
    },
    { time: "100–120", title: "Defensa de decisiones y cierre", minutes: 20 },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Análisis de indicadores de campañas SEM",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Revisar los datos ficticios de Google Search, Meta Ads y YouTube.",
        "Calcular CTR, CPC, tasa de conversión, CPA y ROAS.",
        "Organizar los resultados en una matriz.",
        "Elaborar al menos dos gráficos comparativos.",
        "Identificar el canal con menor CPA.",
        "Identificar el canal con mayor ROAS.",
        "Comparar el rendimiento considerando el objetivo de cada canal.",
        "Redactar tres conclusiones estratégicas.",
      ],
      deliverable: "Dashboard SEM y conclusiones.",
    },
    {
      title: "Laboratorio 2: Optimización de presupuesto y rendimiento SEM",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Recuperar los indicadores del primer laboratorio.",
        "Identificar tres problemas respaldados por datos.",
        "Proponer una nueva distribución de $300.",
        "Justificar los ajustes entre los tres canales.",
        "Evaluar si algún canal debe reducir inversión o cambiar de objetivo.",
        "Definir cinco acciones de optimización.",
        "Asignar un KPI y criterio de éxito a cada acción.",
        "Identificar las limitaciones de la simulación.",
      ],
      deliverable:
        "Presupuesto optimizado y plan de cinco acciones con indicadores.",
    },
  ],

  homework: {
    title: "Tarea 12: Investigación de preguntas frecuentes para AEO",
    modality: "Grupal",
    deadline: "Antes de la Semana 13",
    delivery: "T12_APELLIDO_NOMBRE.pdf",
    instructions: [
      "Utilizar la misma empresa real seleccionada desde la Semana 1.",
      "Recuperar las keywords principales de la Semana 2.",
      "Investigar preguntas frecuentes mediante búsquedas públicas.",
      "Registrar al menos quince preguntas relevantes.",
      "Clasificarlas como informativas, comerciales o transaccionales.",
      "Seleccionar cinco preguntas prioritarias.",
      "Proponer el tipo de contenido necesario para responderlas.",
      "Comprobar externamente si la web de la empresa aborda esas preguntas.",
      "Entregar una matriz en PDF.",
    ],
  },

  rubric: [
    { criterion: "Cálculo correcto de indicadores", points: 25 },
    { criterion: "Interpretación de resultados", points: 20 },
    { criterion: "Dashboard y visualización de datos", points: 15 },
    { criterion: "Redistribución presupuestaria justificada", points: 20 },
    { criterion: "Plan de optimización y KPI", points: 20 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 12",
      title: "Optimización de campañas SEM",
      subtitle: "CPC, CTR, CPA, ROAS y ROI",
      body: "Aprenderemos a convertir resultados publicitarios en decisiones estratégicas.",
      image: `${IMG}portada-optimizacion.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "¿Más clics significa una mejor campaña?",
      accent: "NO CONFUNDAS TRÁFICO CON RESULTADOS",
      body: "Dos campañas pueden generar cantidades diferentes de clics, conversiones e ingresos. Antes de elegir una, analiza qué objetivo persigue y cuánto cuesta alcanzar ese resultado.",
      question:
        "¿Qué conservarías: una campaña con muchos clics o una con menos clics y más conversiones?",
      image: `${IMG}desafio-campanas.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTO · 4 MIN",
      title: "De las impresiones a las conversiones",
      accent: "IMPRESIONES → CLICS → CONVERSIONES",
      body: "El recorrido de medición conecta exposición, interacción, acciones e ingresos atribuidos. Cada indicador responde una pregunta diferente.",
      question: "¿En qué punto deja de ser suficiente contar clics?",
      image: `${IMG}recorrido-metricas.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "CÁLCULO · 10 MIN",
      title: "CTR, CPC, tasa de conversión y CPA",
      columns: ["Indicador", "Fórmula", "Pregunta"],
      rows: [
        ["CTR", "Clics / impresiones × 100", "¿Qué porcentaje hizo clic?"],
        ["CPC", "Inversión / clics", "¿Cuánto cuesta un clic?"],
        [
          "Conversión",
          "Conversiones / clics × 100",
          "¿Cuántos clics convierten?",
        ],
        ["CPA", "Inversión / conversiones", "¿Cuánto cuesta cada resultado?"],
      ],
      note: "En este ejercicio, la tasa de conversión utiliza clics como denominador.",
      image: `${IMG}indicadores-trafico.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "RENTABILIDAD · 6 MIN",
      title: "ROAS no es lo mismo que ROI",
      columns: ["Indicador", "Cálculo", "Interpretación"],
      rows: [
        [
          "ROAS",
          "Ingresos atribuidos / inversión publicitaria",
          "Retorno publicitario",
        ],
        [
          "ROI",
          "Beneficio neto / inversión total × 100",
          "Rentabilidad financiera",
        ],
        ["Ejemplo", "$900 / $300 = 3×", "ROAS de 3"],
      ],
      note: "El retorno publicitario simplificado de 200 % no representa el ROI neto real: faltan costos de producto, operación y otros gastos.",
      question: "¿Puede una campaña con ROAS alto seguir siendo poco rentable?",
      image: `${IMG}roas-roi.webp`,
    },
    {
      id: 6,
      kind: "seo-sem-performance",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Audita el rendimiento de tres campañas",
      subtitle: "Google Search, Meta Ads y YouTube",
      instructions:
        "Calcula los cinco indicadores, compara el dashboard y registra tres conclusiones basadas en los datos simulados.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Después transformaremos los indicadores en decisiones.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 10 MIN",
      title: "Detecta dónde se desperdicia el presupuesto",
      accent: "DIAGNÓSTICO ANTES DE OPTIMIZAR",
      body: "Identifica tres problemas de rendimiento y tres oportunidades. Cada afirmación debe apoyarse en un indicador concreto y considerar el objetivo de la campaña.",
      question: "¿Un canal con ROAS bajo debe eliminarse siempre?",
      image: `${IMG}diagnostico-sem.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE B · 10 MIN",
      title: "Redistribuye la inversión",
      accent: "$300 · SIGUIENTE PERÍODO",
      body: "Reasigna el presupuesto entre Google Search, Meta Ads y YouTube. Justifica los cambios y revisa la proyección lineal hipotética.",
      question:
        "¿Qué supuestos estás haciendo al proyectar resultados futuros?",
      image: `${IMG}redistribucion.webp`,
    },
    {
      id: 10,
      kind: "seo-sem-optimization",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Construye tu plan de optimización",
      subtitle: "Presupuesto, proyección y cinco acciones priorizadas",
      instructions:
        "Documenta tres problemas, redistribuye $300 y propone cinco mejoras con KPI, prioridad y criterio de éxito.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "Defiende tus decisiones ante el cliente",
      body: "Presenta dos indicadores clave, explica la redistribución del presupuesto y argumenta las acciones prioritarias.",
      question:
        "¿Qué evidencia necesitarías antes de implementar realmente estos cambios?",
      image: `${IMG}defensa-sem.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "¿Y si el usuario pregunta a una IA?",
      body: "Investiga quince preguntas frecuentes sobre la empresa, clasifícalas por intención y selecciona cinco prioridades para crear contenidos orientados a respuestas.",
      note: "Entrega grupal: T12_APELLIDO_NOMBRE.pdf, antes de la Semana 13.",
      next: "SEMANA 13 · AEO: optimización de contenidos para motores de respuesta.",
      image: `${IMG}introduccion-aeo.webp`,
    },
  ],
};

export default semana12;
