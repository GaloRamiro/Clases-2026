const semana02 = {
  id: "contenido-semana-2",
  courseId: "contenido",
  number: 2,
  title: "¿Quién compraría nuestro café?",
  subtitle: "Segmentación de audiencias, investigación y Buyer Persona",
  duration: 180,
  breakMinutes: 20,

  objective:
    "Identificar y analizar las características, necesidades, motivaciones y comportamientos de una audiencia para construir un Buyer Persona que oriente las decisiones de contenido de la marca de café.",

  challenge:
    "No todos compran café por la misma razón. ¿A quién debería hablarle nuestra marca?",

  schedule: [
    { time: "00–15", title: "Conexión con Semana 1", minutes: 15 },
    { time: "15–50", title: "Segmentación y Buyer Persona", minutes: 35 },
    {
      time: "50–80",
      title: "Demostración e investigación con IA",
      minutes: 30,
    },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio grupal", minutes: 60 },
    { time: "160–180", title: "Presentaciones y reflexión", minutes: 20 },
  ],

  labSteps: [
    {
      title: "Revisar la investigación anterior",
      minutes: 10,
      instruction:
        "Revisar las tres marcas investigadas en la Semana 1 e identificar necesidades, mensajes y públicos observados.",
    },
    {
      title: "Elegir un segmento prioritario",
      minutes: 10,
      instruction:
        "Describir el grupo de consumidores que mejor se relaciona con la propuesta de valor de la marca.",
    },
    {
      title: "Investigar con IA",
      minutes: 10,
      instruction:
        "Crear un prompt para explorar motivaciones, objeciones, necesidades y hábitos del segmento.",
    },
    {
      title: "Construir el Buyer Persona",
      minutes: 15,
      instruction:
        "Desarrollar un perfil representativo diferenciando evidencia, hipótesis y datos pendientes de validar.",
    },
    {
      title: "Adaptar contenidos",
      minutes: 10,
      instruction:
        "Crear un mensaje PUSH y otro PULL dirigidos al Buyer Persona.",
    },
    {
      title: "Preparar la defensa",
      minutes: 5,
      instruction:
        "Organizar las conclusiones y justificar la selección del consumidor.",
    },
  ],

  homework: {
    title: "Trabajo autónomo 2 — Investigación y validación del Buyer Persona",
    delivery: "T2_APELLIDO_NOMBRE.pdf",
    instructions: [
      "Realizar al menos tres entrevistas breves sobre hábitos de consumo de café.",
      "Analizar cinco comentarios públicos relevantes e identificar sus fuentes.",
      "Registrar hallazgos sin publicar datos personales.",
      "Actualizar el Buyer Persona utilizando la información recopilada.",
      "Identificar tres necesidades, problemas o motivaciones frecuentes.",
      "Preparar una presentación de cinco diapositivas con los hallazgos y las decisiones modificadas.",
      "Entregar el informe de investigación y el Buyer Persona actualizado.",
    ],
  },

  rubric: [
    { criterion: "Investigación y análisis de audiencias", points: 25 },
    { criterion: "Segmentación y justificación", points: 20 },
    { criterion: "Construcción del Buyer Persona", points: 30 },
    { criterion: "Mensajes PUSH/PULL y defensa", points: 25 },
  ],

  slides: [
    {
      id: 1,
      kind: "cover",
      block: "DISEÑO PARA GENERACIÓN DE CONTENIDO · SEMANA 02",
      title: "Tu café no es para todo el mundo",
      subtitle: "¿Quién compraría nuestro café?",
      body: "No todos compran café por la misma razón. Hoy descubriremos quién podría comprar nuestra marca y cómo adaptar nuestros contenidos.",
      image: "/images/contenido/semana 2/Semana dos 1.jpg",
    },
    {
      id: 2,
      kind: "statement",
      block: "CONEXIÓN CON SEMANA 1 · 15 MIN",
      title: "Ya tenemos una marca. ¿Pero conocemos a su cliente?",
      accent: "UNA MARCA NECESITA CONOCER A QUIÉN LE HABLA",
      body: "En la Semana 1 definimos un nombre, una propuesta de valor, una plataforma y estrategias PUSH y PULL.",
      question:
        "¿En qué evidencias nos basamos para decidir quién compraría nuestro café?",
      note: "Dos o tres equipos presentan un hallazgo de las marcas reales investigadas.",
      image: "/images/contenido/semana 2/Semana dos 2.jpg",
    },
    {
      id: 3,
      kind: "statement",
      block: "SEGMENTACIÓN · 8 MIN",
      title: "Un producto. Diferentes consumidores.",
      accent: "EL MISMO CAFÉ PUEDE SIGNIFICAR COSAS DISTINTAS",
      body: "Estudiante: precio y practicidad. Profesional: rutina y conveniencia. Aficionado: origen, sabor y experiencia.",
      question: "¿Les ofrecerías el mismo mensaje a los tres?",
      image: "/images/contenido/semana 2/Semana dos 3.jpg",
    },
    {
      id: 4,
      kind: "table",
      image: "/images/contenido/semana 2/Semana dos 4.jpg",
      block: "FUNDAMENTOS · 7 MIN",
      title: "Segmentar es encontrar diferencias relevantes",
      subtitle:
        "Agrupamos consumidores según características, necesidades y comportamientos.",
      columns: ["Tipo", "Qué analiza", "Ejemplo"],
      rows: [
        [
          "Demográfica",
          "Edad, ocupación e ingresos",
          "Estudiantes universitarios",
        ],
        ["Geográfica", "Ubicación y contexto", "Consumidores en Quito"],
        [
          "Psicográfica",
          "Intereses, valores y estilo de vida",
          "Amantes del café de especialidad",
        ],
        [
          "Conductual",
          "Hábitos y motivos de compra",
          "Compra café antes de clases",
        ],
      ],
      note: "Decisión profesional: identificar el segmento más relacionado con la propuesta de valor.",
    },
    {
      id: 5,
      kind: "statement",
      block: "NECESIDADES · 5 MIN",
      title: "El cliente no compra solo el producto",
      accent: "COMPRA UNA SOLUCIÓN, UNA EXPERIENCIA O UN BENEFICIO",
      body: "Una persona busca energía para estudiar; otra, una pausa agradable; otra, descubrir nuevos sabores. El producto puede ser similar, pero la motivación cambia.",
      question: "¿Qué necesidad concreta podría resolver nuestra marca?",
      image: "/images/contenido/semana 2/Semana dos 5.jpg",
    },
    {
      id: 6,
      kind: "statement",
      block: "BUYER PERSONA · 10 MIN",
      title: "Del público general a una persona representativa",
      accent: "NO ES INVENTAR UN NOMBRE Y UNA EDAD",
      body: "Un Buyer Persona es una representación semificticia del cliente objetivo, construida a partir de investigación, observaciones e hipótesis explícitas.",
      quote:
        "Necesitamos entender qué busca, qué le preocupa, cómo decide y dónde encuentra información.",
      image: "/images/contenido/semana 2/Semana dos 6.jpg",
    },
    {
      id: 7,
      kind: "statement",
      block: "APLICACIÓN · 5 MIN",
      title: "Conocer al cliente cambia el contenido",
      accent: "UNA AUDIENCIA DIFERENTE NECESITA OTRO MENSAJE",
      body: "Marca: café para estudiantes. PULL: consejos para preparar café antes de ir a clases. PUSH: presentación de una opción práctica y accesible.",
      question:
        "¿Qué cambiaríamos si nuestro público fueran profesionales de 35 a 45 años?",
      image: "/images/contenido/semana 2/Semana dos 7.jpg",
    },
    {
      id: 8,
      kind: "statement",
      block: "DEMOSTRACIÓN · 10 MIN",
      title: "Construyamos un Buyer Persona",
      accent: "DANIEL · 22 AÑOS · PERFIL HIPOTÉTICO",
      body: "Daniel es estudiante universitario, combina clases y trabajo, busca practicidad y precios accesibles, consulta redes sociales y compara opciones antes de comprar.",
      note: "Este perfil es un ejemplo didáctico. No representa una investigación validada.",
      image: "/images/contenido/semana 2/Semana dos 8.png",
    },
    {
      id: 9,
      kind: "statement",
      block: "INVESTIGACIÓN CON IA · 10 MIN",
      title: "La IA propone hipótesis. Nosotros las comprobamos.",
      accent: "UNA RESPUESTA GENERADA NO ES EVIDENCIA",
      body: "Construye un prompt con contexto de la marca, segmento, objetivo, información disponible y formato de respuesta. Solicita motivaciones, objeciones, necesidades y preguntas del consumidor.",
      question:
        "¿Qué afirmaciones podríamos utilizar y cuáles necesitan validación?",
      image: "/images/contenido/semana 2/Semana dos 9.jpg",
    },
    {
      id: 10,
      kind: "statement",
      block: "EVIDENCIAS · 10 MIN",
      title: "Una buena idea necesita evidencia",
      accent: "OBSERVAR · PREGUNTAR · CONTRASTAR",
      body: "Podemos investigar mediante comentarios públicos, entrevistas, encuestas breves y análisis de competidores. Debemos separar los datos observados de nuestras suposiciones.",
      question:
        "¿Cómo comprobaríamos que nuestros consumidores valoran más el precio que la calidad?",
      image: "/images/contenido/semana 2/Semana dos 10.jpg",
    },
    {
      id: 11,
      kind: "content-buyer-lab",
      block: "LABORATORIO GRUPAL · 60 MIN",
      title: "Descubre a quién le habla tu marca",
      subtitle:
        "Investiga, selecciona un segmento, construye un Buyer Persona y adapta mensajes PUSH y PULL.",
    },
    {
      id: 12,
      kind: "present",
      block: "DEFENSA · 15 MIN",
      title: "¿Por qué elegimos a este consumidor?",
      body: "Cada equipo presenta su segmento prioritario, la necesidad identificada, las evidencias disponibles y las decisiones que cambiará en su comunicación.",
      quote:
        "No basta con presentar un perfil atractivo. Hay que justificar las decisiones.",
      image: "/images/contenido/semana 2/Semana dos 11.jpg",
    },
    {
      id: 13,
      kind: "questions",
      image: "/images/contenido/semana 2/Semana dos 12.jpg",
      block: "REFLEXIÓN · 5 MIN",
      title: "¿Qué cambió en nuestra forma de pensar?",
      questions: [
        "¿Qué suponíamos sobre nuestros clientes?",
        "¿Qué descubrimos durante la investigación?",
        "¿Qué información todavía debemos comprobar?",
        "¿Cómo cambia nuestro contenido al conocer la audiencia?",
      ],
      note: "Cada equipo comparte qué hizo, qué aprendió y qué decisión cambiaría.",
    },
    {
      id: 14,
      kind: "homework",
      block: "TRABAJO AUTÓNOMO 02",
      title: "Escucha antes de diseñar",
      body: "Realiza tres entrevistas breves, analiza cinco comentarios públicos, actualiza tu Buyer Persona y presenta los hallazgos en cinco diapositivas.",
      note: "Entrega el informe de investigación y el Buyer Persona actualizado en Moodle.",
      next: "SEMANA 03 · Design Thinking, empatía y mapa de empatía.",
      image: "/images/contenido/semana 2/Semana dos 13.jpg",
      
    },
  ],
};

export default semana02;
