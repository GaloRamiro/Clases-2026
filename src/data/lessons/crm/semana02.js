/* ==========================================================
   AULA DIGITAL — CRM
   SEMANA 02 | CREACIÓN Y GESTIÓN DE CONTACTOS
   ========================================================== */

const IMG = "/images/crm/semana02/";

const semana02 = {
  id: "crm-semana-2",
  courseId: "crm",
  number: 2,

  title: "Creación y gestión de contactos en CRM",
  subtitle: "Organización, clasificación y segmentación comercial",

  duration: 180,
  breakMinutes: 15,

  objective:
    "Registrar, organizar y segmentar contactos y empresas dentro de un CRM, diferenciando contactos, leads y oportunidades comerciales para mejorar la gestión de clientes.",

  challenge:
    "Una empresa tiene 500 contactos, pero solamente puede enviar una promoción a una parte de ellos. ¿Cómo decidir a quién contactar primero?",

  project: {
    name: "Gestión comercial de una empresa de tecnología",
    description:
      "Continuación del proyecto de CRM. Los estudiantes construirán una base comercial de contactos, empresas y oportunidades para utilizarla en el embudo de ventas de la Semana 3.",
  },

  schedule: [
    { time: "00–15", title: "Desafío inicial", minutes: 15 },
    { time: "15–35", title: "Fundamentos de gestión de clientes", minutes: 20 },
    { time: "35–65", title: "Clasificación grupal", minutes: 30 },
    { time: "65–80", title: "Presentación de decisiones", minutes: 15 },
    { time: "80–95", title: "Descanso", minutes: 15 },
    { time: "95–155", title: "Laboratorio Bitrix24", minutes: 60 },
    { time: "155–175", title: "Campaña comercial segmentada", minutes: 20 },
    { time: "175–180", title: "Cierre y tarea", minutes: 5 },
  ],

  concepts: [
    {
      term: "Contacto",
      meaning: "Persona registrada en la base de clientes.",
      application: "Conservar datos e historial de interacción.",
    },
    {
      term: "Empresa",
      meaning: "Organización con la que existe una relación comercial.",
      application: "Relacionar contactos con una organización.",
    },
    {
      term: "Lead",
      meaning: "Persona u organización que manifiesta interés comercial.",
      application: "Registrar una consulta inicial.",
    },
    {
      term: "Oportunidad",
      meaning: "Posible venta que se gestiona comercialmente.",
      application: "Registrar valor, etapa y seguimiento.",
    },
    {
      term: "Segmentación",
      meaning: "Agrupación de clientes mediante criterios relevantes.",
      application: "Crear campañas más específicas.",
    },
    {
      term: "Etiquetas",
      meaning: "Identificadores utilizados para clasificar registros.",
      application: "Facilitar búsquedas y filtros.",
    },
  ],

  clients: [
    {
      id: "andrea",
      name: "Andrea",
      situation: "Preguntó el precio de una laptop.",
    },
    {
      id: "carlos",
      name: "Carlos",
      situation: "Compró tres veces este año.",
    },
    {
      id: "maria",
      name: "María",
      situation: "Solicitó cotización de 10 computadoras.",
    },
    {
      id: "alfa",
      name: "Empresa Alfa",
      situation: "Busca un proveedor de equipos.",
    },
    {
      id: "pedro",
      name: "Pedro",
      situation: "No compra desde hace ocho meses.",
    },
    {
      id: "lucia",
      name: "Lucía",
      situation: "Se registró para recibir promociones.",
    },
    {
      id: "beta",
      name: "Instituto Beta",
      situation: "Solicita 20 equipos para laboratorio.",
    },
    {
      id: "daniel",
      name: "Daniel",
      situation: "Compró una laptop y necesita mantenimiento.",
    },
  ],

  groupActivity: {
    title: "¿A quién le venderías primero?",
    duration: 30,

    instructions: [
      "Clasificar los ocho registros como contacto, empresa, lead u oportunidad, según corresponda.",
      "Asignar etiquetas comerciales relevantes.",
      "Organizar los registros en tres segmentos comerciales.",
      "Seleccionar tres clientes prioritarios.",
      "Justificar la prioridad y proponer una acción comercial.",
    ],

    deliverable:
      "Tabla con cliente, clasificación, segmento, prioridad y acción recomendada.",
  },

  laboratory: {
    platform: "Bitrix24",
    url: "https://www.bitrix24.es/",

    title: "Construyendo mi primera base de clientes",

    steps: [
      {
        time: "0–15 min",
        title: "Crear contactos",
        instruction:
          "Registrar seis personas ficticias con nombre, correo, teléfono, producto de interés y observaciones.",
        evidence: "Captura de la lista de contactos.",
      },
      {
        time: "15–25 min",
        title: "Registrar empresas",
        instruction:
          "Crear Empresa Alfa e Instituto Beta y vincular contactos cuando corresponda.",
        evidence: "Captura de las dos empresas.",
      },
      {
        time: "25–40 min",
        title: "Crear oportunidades",
        instruction:
          "Registrar dos oportunidades comerciales con valor estimado, etapa y fecha de seguimiento.",
        evidence: "Captura de las oportunidades.",
      },
      {
        time: "40–55 min",
        title: "Organizar y segmentar",
        instruction:
          "Clasificar registros y aplicar filtros para identificar clientes corporativos, recurrentes y nuevos.",
        evidence: "Captura de un filtro aplicado.",
      },
      {
        time: "55–60 min",
        title: "Revisar evidencias",
        instruction:
          "Verificar que los registros estén completos y reunir las evidencias del laboratorio.",
        evidence: "Enlaces o referencias a las capturas.",
      },
    ],

    note: "Las etiquetas, campos personalizados y otras funciones pueden variar según el plan de Bitrix24. Si una opción no está disponible, documentar una alternativa.",
  },

  campaign: {
    title: "Diseña una campaña segmentada",

    scenario:
      "La empresa tiene presupuesto para contactar únicamente a cinco clientes. Debes seleccionar el segmento, definir la oferta y justificar tu decisión.",

    questions: [
      "¿Qué segmento elegirías?",
      "¿Qué cinco contactos seleccionarías?",
      "¿Qué producto o beneficio ofrecerías?",
      "¿Qué canal utilizarías?",
      "¿Qué indicador revisarías para evaluar el resultado?",
    ],

    deliverable:
      "Propuesta comercial de máximo cinco líneas y selección de cinco contactos.",
  },

  rubric: [
    { criterion: "Clasificación grupal de clientes", points: 25 },
    { criterion: "Registro de contactos y empresas", points: 30 },
    { criterion: "Creación de oportunidades y segmentación", points: 25 },
    { criterion: "Reto comercial y argumentación", points: 20 },
  ],

  homework: {
    title: "Trabajo autónomo 2 — Registro y segmentación de clientes en CRM",

    objective:
      "Crear y organizar una base de contactos mediante criterios de segmentación comercial.",

    instructions: [
      "Completar al menos 20 contactos ficticios en Bitrix24.",
      "Registrar al menos dos empresas y tres oportunidades comerciales.",
      "Clasificar contactos por tipo de cliente, interés, ubicación o frecuencia de compra.",
      "Identificar mediante un filtro los contactos que cumplen años durante los próximos 15 días, utilizando fechas ficticias.",
      "Explicar qué segmento tiene mayor potencial comercial y por qué.",
      "Adjuntar capturas de los registros y filtros.",
    ],

    delivery: "T2_APELLIDO_NOMBRE.pdf",

    nextWeek: "Investigar las etapas de un embudo de ventas y el modelo AIDA.",
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "GESTIÓN Y RELACIÓN CON EL CLIENTE · SEMANA 02",

      title: "Creación y gestión de contactos",
      subtitle: "No todos los clientes necesitan la misma estrategia",

      body: "Aprenderemos a organizar personas, empresas y oportunidades comerciales para tomar mejores decisiones de venta.",

      image: `${IMG}portada-contactos.webp`,
      imageHint: "Profesional analizando una base de clientes.",
    },

    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 15 MIN",

      title: "¿Todos los clientes tienen el mismo valor?",
      accent: "500 CONTACTOS",

      body: "Una empresa tiene 500 contactos. Algunos compraron varias veces, otros solamente preguntaron precios y otros llevan meses sin responder. No existe presupuesto para contactar a todos.",

      quote: "Tener muchos contactos no significa conocer a nuestros clientes.",

      note: "Reflexiona individualmente durante tres minutos. Después compara tu decisión con la de tus compañeros.",

      question: "¿A qué clientes contactarías primero y por qué?",

      image: `${IMG}desafio-clientes.webp`,
    },

    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 10 MIN",

      title: "Contacto, empresa, lead y oportunidad",
      accent: "CONCEPTOS CLAVE",

      body: "Un contacto representa a una persona; una empresa representa a una organización. Un lead registra interés comercial y una oportunidad permite gestionar una posible venta.",

      quote:
        "Una persona puede ser contacto y, al mismo tiempo, participar en una oportunidad de venta.",

      note: "Identifica cómo se relacionan los registros dentro de un CRM.",

      question:
        "¿Por qué no debemos tratar todos los registros como si fueran ventas?",

      image: `${IMG}tipos-registros.webp`,
    },

    {
      id: 4,
      kind: "case",
      block: "CASO ILUSTRATIVO · 10 MIN",

      title: "Cabify y la gestión comercial",
      brand: "MOVILIDAD Y CLIENTES",

      body: "Imagina una empresa de movilidad que atiende usuarios individuales y organizaciones que requieren transporte corporativo. Cada relación necesita información y seguimiento diferentes.",

      details: [
        ["Usuario individual", "Contacto personal"],
        ["Cliente corporativo", "Empresa"],
        ["Solicitud comercial", "Lead"],
        ["Contrato potencial", "Oportunidad"],
      ],

      image: `${IMG}caso-movilidad.webp`,
    },

    {
      id: 5,
      kind: "statement",
      block: "FUNDAMENTOS · 10 MIN",

      title: "Segmentar es decidir mejor",
      accent: "SEGMENTACIÓN",

      body: "Segmentar consiste en agrupar contactos mediante características relevantes como necesidad, historial de compra, tipo de cliente o interés comercial.",

      quote: "La misma oferta no tiene el mismo valor para todos los clientes.",

      note: "Ejemplos: clientes recurrentes, clientes nuevos, clientes corporativos y clientes inactivos.",

      question: "¿Qué segmento podría necesitar una oferta de mantenimiento?",

      image: `${IMG}segmentacion.webp`,
    },

    {
      id: 6,
      kind: "statement",
      block: "ACTIVIDAD GRUPAL · 30 MIN",

      title: "¿A quién le venderías primero?",
      accent: "8 CLIENTES",

      body: "El gerente de una empresa tecnológica entrega ocho registros. Tu equipo debe clasificarlos, proponer segmentos y seleccionar tres clientes prioritarios.",

      quote:
        "Una buena decisión comercial necesita información y justificación.",

      note: "Trabajen en equipos de tres o cuatro estudiantes. Registren sus decisiones en el taller interactivo.",

      image: `${IMG}actividad-clasificacion.webp`,
    },

    {
      id: 7,
      kind: "crm-client-segmentation",
      block: "TALLER INTERACTIVO · 30 MIN",

      title: "Clasifica los ocho clientes",

      subtitle:
        "Identifica el tipo de registro, asigna etiquetas, determina prioridades y justifica acciones comerciales.",

      instructions:
        "Completa los ocho registros y selecciona tres clientes prioritarios.",
    },

    {
      id: 8,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",

      title: "Defiende tus decisiones comerciales",

      body: "Cada equipo explica una clasificación, presenta sus tres clientes prioritarios y justifica las acciones propuestas.",

      quote:
        "No buscamos que todos clasifiquen igual, sino que puedan defender sus decisiones.",

      image: `${IMG}presentacion-clientes.webp`,
    },

    {
      id: 9,
      kind: "crm-contact-lab",
      block: "LABORATORIO BITRIX24 · 60 MIN",

      title: "Construye tu base comercial",

      subtitle:
        "Registra contactos, empresas y oportunidades. Después organiza la información y aplica filtros.",

      instructions:
        "Completa las cinco etapas del laboratorio y documenta sus evidencias.",

      image: `${IMG}laboratorio-contactos.webp`,
    },

    {
      id: 10,
      kind: "crm-segmented-campaign",
      block: "RETO COMERCIAL · 20 MIN",

      title: "Diseña una campaña segmentada",

      subtitle:
        "Selecciona cinco contactos, define una oferta y decide cómo evaluar el resultado.",

      instructions: "Elabora una propuesta comercial de máximo cinco líneas.",
    },

    {
      id: 11,
      kind: "questions",
      block: "REFLEXIÓN FINAL",

      title: "¿Qué decisiones permite tomar un CRM?",

      questions: [
        "¿Por qué es importante segmentar clientes?",
        "¿Qué diferencia existe entre contacto y oportunidad?",
        "¿Qué datos necesitamos para priorizar una venta?",
        "¿Cómo ayuda un filtro a gestionar una campaña?",
      ],

      note: "Compara tu decisión inicial con lo aprendido en el laboratorio.",

      image: `${IMG}reflexion-segmentacion.webp`,
    },

    {
      id: 12,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO 02",

      title: "Mi base de datos comercial",

      body: "Completa 20 contactos ficticios, dos empresas y tres oportunidades comerciales. Aplica criterios de segmentación y documenta tus resultados.",

      note: "Entrega en Moodle: T2_APELLIDO_NOMBRE.pdf. Incluye capturas, filtros y justificación comercial.",

      next: "SEMANA 03 · Embudos de ventas y modelo AIDA",

      image: `${IMG}tarea-base-clientes.webp`,
    },
  ],
};

export default semana02;
