const IMG = "/images/crm/semana04/";

const semana04 = {
  id: "crm-semana-4",
  courseId: "crm",
  number: 4,
  title: "Fidelización y retención de clientes en CRM",
  subtitle: "Clientes que regresan, clientes que recomiendan",
  duration: 180,
  breakMinutes: 15,

  objective:
    "Diseñar estrategias de fidelización y retención de clientes utilizando información del CRM, indicadores comerciales y programas de lealtad para fortalecer las relaciones a largo plazo.",

  challenge:
    "¿Por qué seguimos comprando a una marca cuando existen alternativas más económicas?",

  schedule: [
    {
      time: "00–15",
      title: "Desafío: marcas que nos hacen regresar",
      minutes: 15,
    },
    {
      time: "15–35",
      title: "Fundamentos de fidelización y métricas",
      minutes: 20,
    },
    { time: "35–65", title: "Taller grupal: programa de lealtad", minutes: 30 },
    { time: "65–80", title: "Presentación y defensa", minutes: 15 },
    { time: "80–95", title: "Descanso", minutes: 15 },
    { time: "95–155", title: "Laboratorio Bitrix24", minutes: 60 },
    {
      time: "155–175",
      title: "Reto: recuperar clientes inactivos",
      minutes: 20,
    },
    { time: "175–180", title: "Cierre y trabajo autónomo", minutes: 5 },
  ],

  labSteps: [
    {
      title: "Revisar la base de clientes",
      minutes: 10,
      instruction:
        "Ingresar a Bitrix24 y localizar al menos diez contactos ficticios. Identificar clientes nuevos, frecuentes e inactivos.",
    },
    {
      title: "Clasificar los contactos",
      minutes: 15,
      instruction:
        "Organizar los diez contactos en tres segmentos usando etiquetas, campos disponibles u observaciones.",
    },
    {
      title: "Registrar los beneficios",
      minutes: 10,
      instruction:
        "Definir beneficios para los tres niveles de fidelización y documentar cómo se aplicarán.",
    },
    {
      title: "Crear tareas de fidelización",
      minutes: 15,
      instruction:
        "Crear tres tareas: agradecer una compra, contactar a un cliente recurrente y recuperar un cliente inactivo.",
    },
    {
      title: "Filtrar y documentar",
      minutes: 10,
      instruction:
        "Aplicar un filtro comercial, capturar evidencias y explicar cómo medir el éxito del programa.",
    },
  ],

  homework: {
    title: "Trabajo autónomo 4 — Programa de fidelización en CRM",
    delivery: "T4_APELLIDO_NOMBRE.pdf",
    instructions: [
      "Analizar tres posibles causas de la baja fidelización.",
      "Diseñar un programa de lealtad con tres niveles.",
      "Clasificar al menos diez contactos ficticios en Bitrix24.",
      "Crear tres actividades de fidelización.",
      "Proponer una encuesta NPS y explicar su cálculo.",
      "Definir dos indicadores para evaluar el programa.",
      "Adjuntar capturas y una conclusión de 100 a 150 palabras.",
    ],
  },

  rubric: [
    { criterion: "Diseño grupal del programa de lealtad", points: 25 },
    { criterion: "Segmentación y registro en Bitrix24", points: 30 },
    { criterion: "Actividades de fidelización y evidencias", points: 25 },
    { criterion: "Recuperación de clientes y argumentación", points: 20 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "CRM · SEMANA 04",
      title: "Fidelización y retención de clientes",
      subtitle: "Clientes que regresan, clientes que recomiendan",
      body: "Aprenderemos a diseñar programas de lealtad, segmentar clientes y utilizar Bitrix24 para fortalecer relaciones comerciales.",
      image: `${IMG}portada-fidelizacion.webp`,
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 15 MIN",
      title: "Clientes que regresan",
      accent: "¿POR QUÉ SOMOS FIELES?",
      body: "Piensa en Starbucks, Netflix o Apple. ¿Qué hace que sigas eligiendo una marca incluso cuando existen alternativas?",
      quote:
        "Un cliente satisfecho puede regresar. Un cliente fidelizado también puede recomendar.",
      question:
        "Elige una marca y escribe tres razones por las que vuelves a comprar o utilizarla.",
      note: "3 minutos individuales y discusión en parejas. Identifica factores emocionales y comerciales.",
      image: `${IMG}clientes-que-regresan.webp`,
    },
    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 7 MIN",
      title: "¿Qué es fidelizar?",
      accent: "NO BASTA CON VENDER UNA VEZ",
      body: "Fidelizar consiste en construir relaciones que favorezcan la permanencia, las compras repetidas y la recomendación. No depende únicamente de ofrecer descuentos.",
      quote:
        "La experiencia después de la compra también forma parte de la venta.",
      note: "Pregunta: ¿qué acciones comerciales pueden provocar que un cliente no regrese?",
      image: `${IMG}concepto-fidelizacion.webp`,
    },
    {
      id: 4,
      kind: "table",
      block: "FUNDAMENTOS · 8 MIN",
      title: "Tres indicadores de fidelización",
      subtitle:
        "Los datos permiten comprobar si la relación con el cliente está mejorando.",
      columns: ["Indicador", "Qué mide", "Aplicación"],
      rows: [
        ["NPS", "Disposición a recomendar", "% promotores menos % detractores"],
        [
          "Retención",
          "Clientes que permanecen",
          "Evaluar pérdida o conservación de clientes",
        ],
        [
          "LTV",
          "Valor estimado de un cliente en el tiempo",
          "Orientar decisiones de inversión",
        ],
      ],
      note: "Ejercicio: 100 clientes iniciales, 20 nuevos y 90 finales. Retención = (90 - 20) / 100 × 100 = 70 %.",
      image: `${IMG}metricas-fidelizacion.webp`,
    },
    {
      id: 5,
      kind: "statement",
      block: "CASO ILUSTRATIVO · 5 MIN",
      title: "Starbucks Rewards",
      accent: "BENEFICIOS QUE MOTIVAN A REGRESAR",
      body: "Analiza cómo un programa de recompensas puede incentivar compras repetidas y generar información útil sobre preferencias y comportamiento comercial.",
      quote:
        "El valor de un programa de lealtad está en ofrecer razones para regresar.",
      question:
        "¿Qué datos debería registrar el CRM para identificar clientes frecuentes?",
      image: `${IMG}starbucks-rewards.webp`,
    },
    {
      id: 6,
      kind: "statement",
      block: "TALLER GRUPAL · 30 MIN",
      title: "Crea un programa de lealtad",
      accent: "DISEÑA UNA RAZÓN PARA REGRESAR",
      body: "En equipos de tres o cuatro estudiantes, diseñen un programa para una empresa tecnológica que vende laptops, accesorios y servicios de mantenimiento.",
      quote:
        "Define un público objetivo, tres niveles, beneficios y un indicador de éxito.",
      note: "En la siguiente diapositiva registrarás las decisiones del equipo.",
      image: `${IMG}taller-lealtad.webp`,
    },
    {
      id: 7,
      kind: "crm-loyalty-builder",
      block: "TALLER INTERACTIVO · 30 MIN",
      title: "Constructor de programas de fidelización",
      subtitle:
        "Diseña un programa con tres niveles, beneficios, criterios de acceso y un indicador para medir resultados.",
    },
    {
      id: 8,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",
      title: "¿Tu programa realmente fideliza?",
      body: "Cada equipo presenta su propuesta y explica por qué el cliente querría participar, qué beneficio recibiría y cómo la empresa mediría el resultado.",
      quote:
        "Un beneficio atractivo también debe ser sostenible para el negocio.",
      image: `${IMG}presentacion-programa.webp`,
    },
    {
      id: 9,
      kind: "crm-loyalty-lab",
      block: "LABORATORIO BITRIX24 · 60 MIN",
      title: "Organiza tu programa en el CRM",
      subtitle:
        "Segmenta contactos, registra beneficios, crea actividades y comprueba tus filtros.",
    },
    {
      id: 10,
      kind: "crm-loyalty-recovery",
      block: "RETO COMERCIAL · 20 MIN",
      title: "Recupera clientes inactivos",
      subtitle:
        "Analiza tres casos y diseña dos acciones de recuperación justificadas.",
    },
    {
      id: 11,
      kind: "questions",
      block: "REFLEXIÓN FINAL",
      title: "¿Qué vale más: captar o conservar?",
      questions: [
        "¿Qué diferencia existe entre satisfacción y fidelización?",
        "¿Por qué un descuento no garantiza que un cliente regrese?",
        "¿Qué información del CRM ayuda a personalizar beneficios?",
        "¿Cómo sabrías si tu programa está funcionando?",
      ],
      note: "Cada estudiante explica una decisión que tomó durante el laboratorio.",
      image: `${IMG}reflexion-clientes.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO 04",
      title: "Programa de fidelización en CRM",
      body: "Analiza la baja fidelización de una empresa, diseña tres niveles de lealtad, clasifica diez contactos y crea tres actividades de seguimiento en Bitrix24.",
      note: "Entrega en Moodle: T4_APELLIDO_NOMBRE.pdf. Incluye capturas, propuesta NPS y conclusión.",
      next: "SEMANA 05 · Comunicación efectiva y automatizada en CRM.",
      image: `${IMG}trabajo-autonomo.webp`,
    },
  ],
};

export default semana04;
