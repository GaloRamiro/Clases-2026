const IMG = "/images/seo/semana11/";

const semana11 = {
  id: "seo-semana-11",
  courseId: "seo",
  number: 11,
  title:
    "Publicidad multicanal, embudo de conversión y plan de medios digitales",
  subtitle: "Google Search, YouTube y Meta Ads: una estrategia coordinada",
  duration: 120,
  breakMinutes: 10,

  objective:
    "Diseñar una estrategia publicitaria multicanal que integre anuncios de búsqueda, video y redes sociales, utilizando un embudo de conversión, una distribución presupuestaria y piezas publicitarias adaptadas a cada plataforma.",

  challenge:
    "Tienes $300 para 30 días. ¿Cuánto invertirías en Google Search, YouTube y Meta Ads, y por qué?",

  project: {
    name: "Expediente empresarial SEO + SEM + AEO + GEO",
    description:
      "Continuación del brief SEM, la campaña de búsqueda y el prototipo de landing page elaborados en las semanas 8, 9 y 10.",
    finalDeliverable:
      "Embudo de conversión, plan de medios de 30 días, pieza visual estática, storyboard y matriz de KPI.",
    restrictions:
      "Estrategia académica simulada. No se activan campañas ni se representa oficialmente a la empresa.",
  },

  schedule: [
    {
      time: "00–10",
      title: "Desafío: ¿en qué canal invertirías?",
      minutes: 10,
    },
    {
      time: "10–30",
      title: "Embudo, plataformas y estrategia multicanal",
      minutes: 20,
    },
    {
      time: "30–55",
      title: "Laboratorio 1: recorrido del cliente",
      minutes: 25,
    },
    { time: "55–65", title: "Receso", minutes: 10 },
    {
      time: "65–100",
      title: "Laboratorio 2: plan de medios y producción",
      minutes: 35,
    },
    { time: "100–120", title: "Defensa de propuestas y cierre", minutes: 20 },
  ],

  tools: [
    {
      name: "Google Ads",
      url: "https://ads.google.com/",
      purpose: "Investigar formatos de búsqueda y video sin activar campañas.",
      access: "Consulta informativa.",
    },
    {
      name: "Meta Ad Library",
      url: "https://www.facebook.com/ads/library/",
      purpose:
        "Analizar ejemplos públicos de anuncios de Facebook e Instagram.",
      access:
        "No muestra todos los indicadores comerciales de los anunciantes.",
    },
    {
      name: "Canva",
      url: "https://www.canva.com/",
      purpose: "Diseñar el anuncio estático y el storyboard.",
      access: "Utilizar funciones gratuitas.",
    },
    {
      name: "Google Sheets",
      url: "https://sheets.google.com/",
      purpose: "Organizar el presupuesto y calendario de campaña.",
      access: "Opcional.",
    },
  ],

  labSteps: [
    {
      title: "Laboratorio 1: Diseño del embudo publicitario multicanal",
      duration: 25,
      modality: "Grupal",
      instructions: [
        "Recuperar el producto o servicio seleccionado en semanas anteriores.",
        "Definir un buyer persona principal y su necesidad.",
        "Describir cómo descubre, compara y decide.",
        "Seleccionar al menos dos canales publicitarios.",
        "Redactar un mensaje para reconocimiento, consideración y conversión.",
        "Asignar un KPI a cada etapa.",
        "Construir el mapa visual del recorrido del cliente.",
      ],
      deliverable:
        "Mapa de tres etapas con necesidades, canales, mensajes y KPI.",
    },
    {
      title: "Laboratorio 2: Plan de medios y piezas publicitarias",
      duration: 35,
      modality: "Grupal",
      instructions: [
        "Definir el objetivo general de campaña.",
        "Distribuir un presupuesto hipotético de $300 durante 30 días.",
        "Justificar la asignación entre Google Search, Meta Ads y YouTube.",
        "Diseñar una pieza estática para Instagram o Facebook.",
        "Crear un storyboard vertical de 15 segundos con cuatro escenas.",
        "Redactar propuesta de valor y CTA para ambas piezas.",
        "Construir un calendario de cuatro semanas.",
        "Definir al menos tres KPI y su medición propuesta.",
      ],
      deliverable:
        "Plan de medios, presupuesto, pieza visual, storyboard, calendario y KPI.",
    },
  ],

  homework: {
    title: "Tarea 11: Evaluación de una campaña publicitaria simulada",
    delivery: "T11_APELLIDO_NOMBRE.pdf",
    modality: "Grupal",
    deadline: "Antes de la Semana 12",
    caseData: {
      impressions: 20000,
      clicks: 600,
      investment: 300,
      conversions: 15,
      attributedRevenue: 900,
    },
    instructions: [
      "Calcular CTR.",
      "Calcular CPC promedio.",
      "Calcular tasa de conversión.",
      "Calcular CPA.",
      "Calcular ROAS.",
      "Calcular ROI publicitario simplificado, considerando solo gasto publicitario.",
      "Interpretar los indicadores.",
      "Proponer tres acciones de optimización.",
      "Identificar información adicional necesaria para determinar la rentabilidad real.",
      "Entregar un PDF de dos a tres páginas.",
    ],
    note: "Los datos son simulados. El ROI simplificado no equivale a rentabilidad neta.",
  },

  rubric: [
    { criterion: "Diseño del recorrido del cliente", points: 20 },
    { criterion: "Selección y justificación de canales", points: 20 },
    { criterion: "Distribución del presupuesto", points: 15 },
    { criterion: "Producción de pieza visual y storyboard", points: 30 },
    { criterion: "Calendario, KPI y defensa", points: 15 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "ANÁLISIS SEO · SEMANA 11",
      title: "Publicidad multicanal y plan de medios",
      subtitle: "Una marca, diferentes canales, una estrategia coordinada",
      body: "Diseñaremos un embudo publicitario, distribuiremos $300 y produciremos una pieza visual y un storyboard.",
      image: `${IMG}portada-multicanal.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO · 10 MIN",
      title: "Tienes $300: ¿Google, Instagram o YouTube?",
      accent: "DECIDE ANTES DE INVERTIR",
      body: "Una empresa dispone de $300 para promocionar un producto durante 30 días. Distribuye el presupuesto entre Google Search, Meta Ads y YouTube y justifica tu decisión.",
      question:
        "¿Qué canal tendría prioridad según el público y la intención de compra?",
      note: "El presupuesto es exclusivamente hipotético.",
      image: `${IMG}desafio-presupuesto.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 4 MIN",
      title: "¿Qué es una estrategia multicanal?",
      accent: "NO ES SOLO PUBLICAR EN VARIOS SITIOS",
      body: "Una estrategia multicanal coordina objetivos, mensajes y formatos en diferentes plataformas. Los canales deben complementarse en lugar de repetir exactamente el mismo anuncio.",
      question:
        "¿Cómo podría relacionarse un video de descubrimiento con un anuncio de búsqueda?",
      image: `${IMG}estrategia-multicanal.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "EMBUDO · 6 MIN",
      title: "Reconocimiento, consideración y conversión",
      subtitle: "El mensaje cambia según la necesidad del cliente.",
      columns: ["Etapa", "Necesidad", "Ejemplo", "KPI"],
      rows: [
        [
          "Reconocimiento",
          "Descubrir opciones",
          "Video corto de marca",
          "Alcance",
        ],
        [
          "Consideración",
          "Comparar alternativas",
          "Contenido de beneficios",
          "Clics relevantes",
        ],
        [
          "Conversión",
          "Comprar o contactar",
          "Búsqueda + landing page",
          "Conversiones",
        ],
      ],
      note: "Este es un modelo simplificado: una misma plataforma puede participar en varias etapas.",
      image: `${IMG}embudo-conversion.webp`,
    },
    {
      id: 5,
      kind: "table",
      block: "PLAN DE MEDIOS · 10 MIN",
      title: "Canal, objetivo, formato, presupuesto y KPI",
      subtitle: "Una decisión publicitaria debe poder justificarse.",
      columns: ["Canal", "Uso posible", "Formato", "Indicador"],
      rows: [
        [
          "Google Search",
          "Captar demanda de búsqueda",
          "Anuncio de texto",
          "Conversiones",
        ],
        [
          "Meta Ads",
          "Descubrir o considerar",
          "Imagen o video",
          "Alcance / clics",
        ],
        ["YouTube", "Demostrar el producto", "Video", "Visualizaciones"],
      ],
      question:
        "¿Cómo distribuirías $300 entre los tres canales durante 30 días?",
      note: "El presupuesto debe coincidir con el objetivo y la audiencia. Se puede asignar $0 a un canal justificadamente.",
      image: `${IMG}comparacion-canales.webp`,
    },
    {
      id: 6,
      kind: "seo-multichannel-funnel",
      block: "LABORATORIO 1 · 25 MIN",
      title: "Construye el recorrido de tu cliente",
      subtitle: "Buyer persona, tres etapas, canales, mensajes y KPI",
      instructions:
        "Recupera la empresa y el producto del proyecto. Describe cómo el cliente descubre, considera y convierte, y construye el embudo publicitario.",
    },
    {
      id: 7,
      kind: "break",
      block: "RECESO · 10 MIN",
      title: "Descanso",
      subtitle: "Prepara tus ideas para el plan de medios.",
    },
    {
      id: 8,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE A · 10 MIN",
      title: "Distribuye el presupuesto publicitario",
      accent: "$300 · 30 DÍAS",
      body: "Asigna montos a Google Search, Meta Ads y YouTube. Justifica cada inversión según el objetivo, el público y la etapa del embudo.",
      question: "¿Por qué invertirías más en un canal que en otro?",
      image: `${IMG}distribucion-presupuesto.webp`,
    },
    {
      id: 9,
      kind: "statement",
      block: "LABORATORIO 2 · PARTE B · 15 MIN",
      title: "Produce dos piezas publicitarias",
      accent: "IMAGEN ESTÁTICA + STORYBOARD",
      body: "Diseña un anuncio estático de 1080 × 1080 px y un storyboard vertical de 1080 × 1920 px para un video de 15 segundos, dividido en cuatro escenas.",
      question:
        "¿Cómo cambia el mensaje entre una pieza de reconocimiento y una de conversión?",
      note: "El video final no es obligatorio; el storyboard sí. Identifica las piezas como propuestas académicas.",
      image: `${IMG}produccion-creativa.webp`,
    },
    {
      id: 10,
      kind: "seo-multichannel-media",
      block: "LABORATORIO 2 · 35 MIN",
      title: "Plan de medios, piezas creativas y KPI",
      subtitle: "Simulador de presupuesto, storyboard y calendario de 30 días",
      instructions:
        "Distribuye los $300, documenta tu pieza estática, crea cuatro escenas del storyboard, organiza cuatro semanas y define los KPI.",
    },
    {
      id: 11,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "Defiende tu estrategia ante el cliente",
      body: "Explica el embudo, los canales elegidos, el presupuesto y las dos piezas creativas. Presenta cómo medirías el rendimiento si la empresa autorizara la campaña.",
      question:
        "¿Qué canal cumple el papel más importante en tu propuesta y por qué?",
      image: `${IMG}defensa-estrategia.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "CIERRE · 5 MIN",
      title: "¿Cómo sabremos si la campaña funciona?",
      body: "Analiza un caso simulado con 20.000 impresiones, 600 clics, $300 de inversión, 15 conversiones y $900 de ingresos atribuidos.",
      note: "Calcula CTR, CPC, tasa de conversión, CPA, ROAS y ROI simplificado. Entrega T11_APELLIDO_NOMBRE.pdf.",
      next: "SEMANA 12 · Optimización SEM y decisiones presupuestarias.",
      image: `${IMG}analisis-rendimiento.webp`,
    },
  ],
};

export default semana11;
