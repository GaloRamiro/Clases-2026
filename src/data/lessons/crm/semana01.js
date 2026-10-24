/* ==========================================================
   AULA DIGITAL — GESTIÓN Y RELACIÓN CON EL CLIENTE
   SEMANA 01 | INTRODUCCIÓN AL CRM
   Duración: 180 minutos | Descanso: 15 minutos
   ========================================================== */
const IMG = "/images/crm/semana01/";

const semana01 = {
  id: "crm-semana-1",
  courseId: "crm",
  number: 1,

  title: "Introducción al CRM y al lenguaje comercial",
  subtitle: "De un mensaje a una oportunidad de venta",
  duration: 180,
  breakMinutes: 15,

  objective:
    "Comprender los fundamentos del CRM, reconocer los principales términos utilizados en ventas y registrar un cliente potencial dentro de una plataforma CRM.",

  challenge:
    "Una empresa recibe 100 mensajes preguntando por sus productos, pero solamente consigue 5 ventas. ¿Qué información necesita para descubrir por qué está perdiendo clientes?",

  project: {
    name: "Gestión comercial de una empresa de tecnología",
    description:
      "Los estudiantes aplicarán progresivamente herramientas de CRM, gestión de leads, embudos de ventas, seguimiento, automatización y fidelización de clientes.",
  },

  schedule: [
    {
      time: "00–15",
      title: "Desafío inicial",
      minutes: 15,
    },
    {
      time: "15–35",
      title: "Fundamentos del CRM",
      minutes: 20,
    },
    {
      time: "35–65",
      title: "Diccionario comercial grupal",
      minutes: 30,
    },
    {
      time: "65–80",
      title: "Presentación y debate",
      minutes: 15,
    },
    {
      time: "80–95",
      title: "Descanso",
      minutes: 15,
    },
    {
      time: "95–155",
      title: "Laboratorio Bitrix24",
      minutes: 60,
    },
    {
      time: "155–175",
      title: "Reto de seguimiento",
      minutes: 20,
    },
    {
      time: "175–180",
      title: "Cierre y tarea",
      minutes: 5,
    },
  ],

  glossary: [
    "Lead",
    "Prospecto",
    "Oportunidad de venta",
    "Embudo de ventas",
    "Conversión",
    "Seguimiento (Follow-up)",
    "Automatización",
    "Retención de clientes",
    "Base de datos de clientes",
    "Fidelización",
  ],

  laboratory: {
    platform: "Bitrix24",
    url: "https://www.bitrix24.es/",

    scenario:
      "Trabajas como asesor comercial de una empresa de tecnología. Una persona solicita información sobre un teléfono celular. Debes registrar su interés y organizar el próximo contacto.",

    exampleLead: {
      name: "Andrea Morales",
      product: "Smartphone de gama media",
      budget: 350,
      channel: "WhatsApp",
      interest: "Alto",
      nextAction: "Enviar cotización y contactar en 48 horas",
    },

    steps: [
      {
        time: "0–10 min",
        task: "Acceder a Bitrix24 e identificar el menú CRM.",
        evidence: "Captura del panel",
      },
      {
        time: "10–20 min",
        task: "Explorar contactos, leads y oportunidades disponibles.",
        evidence: "Identificación de funciones",
      },
      {
        time: "20–35 min",
        task: "Crear un lead ficticio con datos de contacto, producto y observaciones.",
        evidence: "Captura del registro",
      },
      {
        time: "35–45 min",
        task: "Clasificar el estado y establecer el próximo seguimiento.",
        evidence: "Captura del estado y seguimiento",
      },
      {
        time: "45–55 min",
        task: "Crear un segundo lead con una necesidad diferente.",
        evidence: "Dos registros completos",
      },
      {
        time: "55–60 min",
        task: "Reflexionar sobre las dificultades de gestionar clientes únicamente por WhatsApp.",
        evidence: "Reflexión de tres líneas",
      },
    ],

    note: "Si la cuenta no dispone de leads independientes, utilizar contactos y oportunidades. Trabajar únicamente con datos ficticios.",
  },

  challengeCase: {
    scenario:
      "Un cliente pregunta por un teléfono de $350. Le envías el precio, responde «Gracias, lo voy a pensar» y deja de escribir. Han pasado tres días.",

    questions: [
      "¿Es un lead o un prospecto? ¿Qué información falta?",
      "¿Qué mensaje comercial enviarías?",
      "¿Qué registrarías en el CRM?",
      "¿Qué harías si el cliente no responde?",
    ],
  },

  rubric: [
    {
      criterion: "Diccionario comercial grupal",
      points: 30,
    },
    {
      criterion: "Laboratorio Bitrix24",
      points: 40,
    },
    {
      criterion: "Reto de seguimiento",
      points: 20,
    },
    {
      criterion: "Participación y reflexión",
      points: 10,
    },
  ],

  homework: {
    title: "Trabajo autónomo 1 — Glosario comercial aplicado al CRM",

    objective:
      "Consolidar los conceptos comerciales estudiados y reconocer cómo intervienen en la captación y seguimiento de clientes.",

    instructions:
      "Elaborar individualmente un glosario de los diez términos, incluyendo definición propia, ejemplo comercial y aplicación en un CRM.",

    delivery:
      "PDF con portada, tabla del glosario y reflexión final de 100 palabras.",

    nextWeek:
      "Investigar las etapas que atraviesa un cliente desde que pregunta por un producto hasta que realiza la compra.",
  },

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "GESTIÓN Y RELACIÓN CON EL CLIENTE · SEMANA 01",

      title: "Introducción al CRM",
      subtitle: "Del primer contacto a la venta",

      body: "Aprenderemos cómo las empresas organizan la información comercial, gestionan oportunidades y construyen relaciones con sus clientes.",

      image: "images/gestion/Gemini_Generated_Image_b0hid3b0hid3b0hi.jpg",
      imageHint:
        "Asesor comercial utilizando una plataforma CRM en una oficina moderna.",
    },

    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 15 MIN",

      title: "¿Cómo vendían las empresas antes del CRM?",
      accent: "EL PROBLEMA",

      body: "Imagina una empresa que registra clientes en cuadernos, hojas de cálculo y conversaciones de WhatsApp. ¿Qué sucede cuando aumenta la cantidad de consultas?",

      quote: "Recibir muchos mensajes no significa conseguir muchas ventas.",

      note: "En equipos, identifiquen tres problemas de gestionar clientes sin un sistema centralizado.",

      question:
        "¿Por qué una empresa puede recibir 100 consultas y concretar solamente cinco ventas?",

      image: "images/gestion/Gemini_Generated_Image_trpu85trpu85trpu.jpg",
    },

    {
      id: 3,
      kind: "statement",
      block: "FUNDAMENTOS · 10 MIN",

      title: "¿Qué es un CRM y para qué sirve?",
      accent: "CRM",

      body: "Customer Relationship Management es una estrategia de gestión de relaciones con clientes que puede apoyarse en software para organizar contactos, interacciones, oportunidades comerciales y seguimientos.",

      quote:
        "Un CRM permite recordar qué necesita cada cliente y cuál es el siguiente paso comercial.",

      note: "Ejemplo: registrar quién preguntó por un teléfono, qué modelo necesita y cuándo debemos contactarlo.",

      question:
        "¿Qué información debería conocer un vendedor antes de volver a contactar a un cliente?",

      image: "/images/gestion/Gemini_Generated_Image_m12qrcm12qrcm12q.jpg",
    },

    {
      id: 4,
      kind: "statement",
      block: "EVOLUCIÓN · 10 MIN",

      title: "De las fichas al CRM inteligente",
      accent: "EVOLUCIÓN",

      body: "La gestión comercial pasó de registros físicos a bases de datos, sistemas digitales y plataformas que integran procesos, análisis y automatización.",

      quote:
        "La tecnología cambia, pero la necesidad de comprender al cliente permanece.",

      note: "Compara una libreta de clientes, una hoja de cálculo y una plataforma CRM.",

      question:
        "¿Qué puede automatizar una empresa sin perder el trato humano?",

      image: "/images/gestion/Gemini_Generated_Image_4fk3y04fk3y04fk3.jpg",
    },

    {
      id: 5,
      kind: "case",
      block: "CASO DE ESTUDIO",

      title: "100 consultas. Solo cinco ventas.",
      brand: "TECNO MÓVIL",

      body: "Una tienda recibe consultas por WhatsApp, pero no registra presupuestos, intereses ni seguimientos. Muchos clientes dejan de responder y nadie sabe por qué.",

      details: [
        ["Consultas", "100 personas interesadas"],
        ["Ventas", "5 compras realizadas"],
        ["Problema", "Información dispersa y seguimiento irregular"],
        ["Desafío", "Identificar oportunidades de mejora"],
      ],

      image: "/images/gestion/Gemini_Generated_Image_2w109b2w109b2w10.jpg",
    },

    {
      id: 6,
      kind: "statement",
      block: "ACTIVIDAD GRUPAL · 30 MIN",

      title: "Construyan su diccionario comercial",
      accent: "10 CONCEPTOS",

      body: "En equipos de tres o cuatro estudiantes, investiguen diez términos comerciales y explíquenlos con sus propias palabras.",

      quote:
        "Un concepto se comprende cuando podemos explicarlo y aplicarlo a una situación real.",

      note: "Utilicen como contexto una empresa ficticia que vende teléfonos celulares.",

      question:
        "¿Cuál es la diferencia entre una persona interesada y una oportunidad de venta?",

      image: "/images/gestion/Gemini_Generated_Image_s5vgjws5vgjws5vg.jpg",
    },

    {
      id: 7,
      kind: "crm-glossary",
      block: "TALLER INTERACTIVO · 30 MIN",

      title: "Los diez términos de ventas",
      subtitle:
        "Investiga, explica con tus palabras y construye un ejemplo comercial para cada término.",

      instructions:
        "Completa los diez conceptos y prepara dos para explicarlos al resto de la clase.",
    },

    {
      id: 8,
      kind: "present",
      block: "PRESENTACIÓN · 15 MIN",

      title: "Explica cómo funciona una venta",
      body: "Cada equipo explica dos conceptos asignados por el docente, presenta un ejemplo y responde una pregunta de sus compañeros.",

      quote:
        "No memorices términos: demuestra cómo se relacionan con una venta real.",

      question: "¿Cómo se conecta un lead con un seguimiento y una conversión?",

      image: "/images/gestion/Gemini_Generated_Image_wbozd7wbozd7wboz.jpg",
    },

    {
      id: 9,
      kind: "crm-bitrix-lab",
      block: "LABORATORIO · 60 MIN",

      title: "Mi primer cliente en Bitrix24",
      subtitle:
        "Explora una plataforma CRM, registra dos clientes ficticios y organiza su seguimiento.",

      instructions:
        "Realiza las seis etapas del laboratorio y registra evidencias de cada actividad.",

      image: "/images/gestion/Gemini_Generated_Image_t4ez9zt4ez9zt4ez.jpg",
    },

    {
      id: 10,
      kind: "crm-followup",
      block: "RETO COMERCIAL · 20 MIN",

      title: "¿Cómo recuperarías este cliente?",
      subtitle:
        "Un cliente interesado deja de responder después de recibir una cotización.",

      instructions:
        "Clasifica el contacto, redacta un mensaje comercial y plantea dos acciones de seguimiento.",

      image: "/images/gestion/Gemini_Generated_Image_9xdcgy9xdcgy9xdc.jpg",
    },

    {
      id: 11,
      kind: "questions",
      block: "REFLEXIÓN Y CIERRE",

      title: "¿Qué aprendimos hoy?",

      questions: [
        "¿Por qué un CRM es más que una agenda de contactos?",
        "¿Qué diferencia existe entre lead, prospecto y oportunidad?",
        "¿Qué información debemos registrar para dar seguimiento?",
        "¿Cómo ayuda un CRM a mejorar la experiencia del cliente?",
      ],

      note: "Cada equipo comparte una decisión comercial que aprendió a justificar.",

      image: "/images/gestion/Gemini_Generated_Image_b0hid3b0hid3b0hi.jpg",
    },

    {
      id: 12,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO",

      title: "Mi primer glosario CRM",

      body: "Elabora individualmente un glosario de diez términos comerciales con definición propia, ejemplo y aplicación en un CRM.",

      note: "Entrega en Moodle un PDF con portada, tabla de conceptos y una reflexión final de 100 palabras.",

      next: "SEMANA 02 · Etapas del cliente y embudo de ventas",

      image: "/images/gestion/Gemini_Generated_Image_s5vgjws5vgjws5vg.jpg",
    },
  ],
};

export default semana01;
