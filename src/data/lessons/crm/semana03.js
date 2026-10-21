const IMG = "/images/crm/semana03/";

const semana03 = {
  id: "crm-semana-3",
  courseId: "crm",
  number: 3,
  title: "Automatización de tareas y seguimiento en CRM",
  subtitle: "Tareas, recordatorios y reglas comerciales",
  duration: 180,
  breakMinutes: 15,

  objective:
    "Configurar tareas, recordatorios y automatizaciones básicas en Bitrix24, relacionándolas con las etapas del pipeline comercial para mejorar el seguimiento de clientes y reducir oportunidades olvidadas.",

  challenge:
    "¿Cómo evitar que una oportunidad comercial se pierda porque nadie recordó contactar al cliente?",

  schedule: [
    { time: "00–15", title: "Desafío: el cliente olvidado", minutes: 15 },
    { time: "15–35", title: "Fundamentos de automatización", minutes: 20 },
    { time: "35–65", title: "Diseño grupal de reglas", minutes: 30 },
    { time: "65–80", title: "Presentación y debate", minutes: 15 },
    { time: "80–95", title: "Descanso", minutes: 15 },
    { time: "95–155", title: "Laboratorio Bitrix24", minutes: 60 },
    { time: "155–175", title: "Reto: rescata oportunidades", minutes: 20 },
    { time: "175–180", title: "Cierre y tarea", minutes: 5 },
  ],

  automationCases: [
    { id: "nuevo", situation: "Un cliente nuevo solicita información." },
    { id: "cotizacion", situation: "Se envía una cotización." },
    {
      id: "sin-respuesta",
      situation: "El cliente no responde al seguimiento.",
    },
    { id: "negociacion", situation: "La oportunidad pasa a negociación." },
    { id: "ganada", situation: "El cliente confirma la compra." },
    { id: "perdida", situation: "El cliente rechaza la propuesta." },
  ],

  labSteps: [
    {
      title: "Revisar el pipeline",
      time: "10 minutos",
      instruction:
        "Abrir Bitrix24 y verificar que las oportunidades tengan etapa comercial, responsable y próxima acción.",
      evidence: "Captura del pipeline actual.",
    },
    {
      title: "Crear tareas de seguimiento",
      time: "15 minutos",
      instruction:
        "Crear tres tareas: contactar a un cliente nuevo, dar seguimiento a una cotización y confirmar una negociación. Asignar responsable y vencimiento.",
      evidence: "Captura de las tres tareas.",
    },
    {
      title: "Configurar recordatorios",
      time: "10 minutos",
      instruction:
        "Establecer dos recordatorios o actividades programadas vinculadas a oportunidades comerciales.",
      evidence: "Captura de las actividades programadas.",
    },
    {
      title: "Crear una regla de automatización",
      time: "15 minutos",
      instruction:
        "Configurar, si está disponible, una regla que cree una tarea al pasar una oportunidad a Propuesta enviada. Si no está disponible, documentar la regla y crear la tarea manualmente.",
      evidence: "Captura de la regla o descripción de la simulación.",
    },
    {
      title: "Comprobar resultados",
      time: "10 minutos",
      instruction:
        "Revisar las tareas, los recordatorios y el funcionamiento de la regla. Explicar qué hizo el sistema y qué hizo el vendedor.",
      evidence: "Capturas finales y observaciones.",
    },
  ],

  recoveryCases: [
    {
      id: "laptop",
      title: "Laptop de $850",
      situation: "Cotización enviada hace cuatro días sin respuesta.",
    },
    {
      id: "corporativo",
      title: "Equipos corporativos de $6.000",
      situation: "Reunión programada, pero nadie confirmó asistencia.",
    },
    {
      id: "mantenimiento",
      title: "Mantenimiento de $300",
      situation: "Cliente interesado sin próxima actividad registrada.",
    },
  ],

  homework: {
    title: "Trabajo autónomo 3 — Seguimiento automatizado de oportunidades",
    delivery: "T3_APELLIDO_NOMBRE.pdf",
    instructions: [
      "Mantener cinco oportunidades ficticias en el pipeline.",
      "Crear cinco tareas con responsables y fechas de vencimiento.",
      "Configurar tres recordatorios o actividades programadas.",
      "Implementar dos reglas básicas, si están disponibles, o documentar su diseño y simularlas manualmente.",
      "Simular el avance de dos oportunidades.",
      "Explicar qué problemas comerciales resuelve cada regla.",
      "Adjuntar capturas y una conclusión de 100 a 150 palabras.",
    ],
  },

  rubric: [
    { criterion: "Diseño grupal de reglas comerciales", points: 25 },
    { criterion: "Configuración de tareas y recordatorios", points: 30 },
    { criterion: "Automatización o simulación documentada", points: 25 },
    { criterion: "Reto comercial y argumentación", points: 20 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "CRM · SEMANA 03",
      title: "Automatización de tareas en CRM",
      subtitle: "Que ninguna oportunidad se pierda por falta de seguimiento",
      body: "Aprenderemos a organizar tareas, programar recordatorios y diseñar automatizaciones que apoyen el proceso comercial.",
      image: `${IMG}portada-automatizacion.webp`,
      imageHint: "Ejecutivo comercial gestionando tareas y oportunidades.",
    },
    {
      id: 2,
      kind: "statement",
      block: "DESAFÍO INICIAL · 15 MIN",
      title: "El cliente olvidado",
      accent: "8 CLIENTES SIN SEGUIMIENTO",
      body: "Una empresa tiene 40 oportunidades abiertas. Envió 15 cotizaciones, pero olvidó contactar nuevamente a ocho clientes. Tres compraron a la competencia.",
      quote:
        "Una oportunidad sin seguimiento puede convertirse en una venta perdida.",
      note: "Responde individualmente durante tres minutos y después debate en parejas.",
      question:
        "¿Qué acciones debería recordar el vendedor y cuáles podría ejecutar automáticamente el CRM?",
      image: `${IMG}cliente-olvidado.webp`,
    },
    {
      id: 3,
      kind: "table",
      block: "FUNDAMENTOS · 10 MIN",
      title: "Tareas, recordatorios y automatizaciones",
      subtitle:
        "No todas las actividades comerciales necesitan el mismo nivel de automatización.",
      columns: ["Concepto", "Aplicación comercial"],
      rows: [
        ["Tarea", "Llamar a un cliente o enviar una propuesta."],
        ["Recordatorio", "Avisar cuándo corresponde dar seguimiento."],
        ["Disparador", "Detectar un cambio de etapa comercial."],
        ["Condición", "Comprobar si se cumple un requisito."],
        ["Automatización", "Ejecutar una acción definida por una regla."],
        ["Notificación", "Informar al responsable sobre un evento."],
      ],
      image: `${IMG}fundamentos-crm.webp`,
    },
    {
      id: 4,
      kind: "statement",
      block: "FUNDAMENTOS · 10 MIN",
      title: "Una regla necesita un disparador",
      accent: "SI OCURRE X → HACER Y",
      body: "Una automatización combina un evento, una condición opcional y una acción. Por ejemplo, al mover una oportunidad a Propuesta enviada, se puede crear una tarea de seguimiento.",
      quote: "Automatizar no significa enviar mensajes sin contexto.",
      note: "Diferencia entre una regla automática y una actividad que debe realizar el vendedor.",
      image: `${IMG}disparadores.webp`,
    },
    {
      id: 5,
      kind: "statement",
      block: "CASO PRÁCTICO",
      title: "¿Qué sucede después de cotizar?",
      accent: "SEGUIMIENTO COMERCIAL",
      body: "Una oportunidad entra en Propuesta enviada. El CRM crea una tarea. El vendedor contacta al cliente y registra si respondió, necesita más información o requiere un nuevo seguimiento.",
      quote:
        "El sistema organiza el trabajo; el vendedor construye la relación.",
      note: "Analiza qué parte del proceso podría fallar si no existiera un responsable.",
      image: `${IMG}flujo-seguimiento.webp`,
    },
    {
      id: 6,
      kind: "statement",
      block: "TALLER GRUPAL · 30 MIN",
      title: "Diseña las reglas comerciales",
      accent: "6 SITUACIONES",
      body: "Trabajen en equipos de tres o cuatro personas. Analicen seis situaciones comerciales y propongan al menos cuatro reglas de seguimiento.",
      quote:
        "Cada regla debe responder: ¿qué la activa, qué hace, cuándo y quién responde?",
      note: "En la siguiente diapositiva registrarán sus decisiones y justificarán cuáles tareas deben ser manuales.",
      image: `${IMG}taller-reglas.webp`,
    },
    {
      id: 7,
      kind: "crm-automation-rules",
      block: "TALLER INTERACTIVO · 30 MIN",
      title: "Constructor de reglas comerciales",
      subtitle:
        "Analiza seis situaciones y diseña al menos cuatro reglas con disparador, acción, tiempo y responsable.",
    },
    {
      id: 8,
      kind: "present",
      block: "PRESENTACIÓN Y DEBATE · 15 MIN",
      title: "¿Todo debería automatizarse?",
      body: "Cada equipo presenta una regla y explica qué problema resuelve, cómo se ejecutaría y cuándo necesitaría intervención humana.",
      quote:
        "Una mala automatización puede perjudicar la experiencia del cliente.",
      image: `${IMG}debate-automatizacion.webp`,
    },
    {
      id: 9,
      kind: "crm-automation-lab",
      block: "LABORATORIO BITRIX24 · 60 MIN",
      title: "Configura tareas y automatizaciones",
      subtitle:
        "Trabaja con tu pipeline, crea tareas y recordatorios, y prueba o documenta una regla automática.",
    },
    {
      id: 10,
      kind: "crm-opportunity-recovery",
      block: "RETO COMERCIAL · 20 MIN",
      title: "Rescata tres oportunidades",
      subtitle:
        "Prioriza tres casos, decide cómo actuar y establece un seguimiento para evitar que se repita el problema.",
    },
    {
      id: 11,
      kind: "questions",
      block: "REFLEXIÓN FINAL",
      title: "¿La automatización mejora la relación con el cliente?",
      questions: [
        "¿Qué tarea comercial nunca deberíamos olvidar?",
        "¿Qué diferencia existe entre automatizar y personalizar?",
        "¿Cómo comprobamos que una regla funciona correctamente?",
        "¿Qué riesgos existen al automatizar comunicaciones?",
      ],
      note: "Compara tus respuestas con el desafío inicial de los ocho clientes olvidados.",
      image: `${IMG}reflexion.webp`,
    },
    {
      id: 12,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO 03",
      title: "Seguimiento automatizado de oportunidades",
      body: "Mantén cinco oportunidades, crea cinco tareas y tres recordatorios. Diseña dos reglas de automatización y documenta su funcionamiento real o simulado.",
      note: "Entrega en Moodle: T3_APELLIDO_NOMBRE.pdf. Incluye capturas y una conclusión de 100 a 150 palabras.",
      next: "SEMANA 04 · Comunicación y seguimiento comercial con clientes.",
      image: `${IMG}tarea-automatizacion.webp`,
    },
  ],
};

export default semana03;
