const semana15 = {
  id: "contenido-semana-15",
  courseId: "contenido",
  number: 15,
  title: "De la pantalla al estudio. Ahora tú eres el fotógrafo.",
  subtitle:
    "Fotografía publicitaria, producción audiovisual y creación de contenido original",
  duration: 180,

  objective:
    "Aplicar técnicas de fotografía y producción audiovisual para capturar recursos visuales originales destinados a campañas digitales, utilizando principios de iluminación, encuadre, composición, continuidad y narrativa visual.",

  challenge:
    "¿Puedes crear una fotografía publicitaria profesional utilizando solamente una taza, una ventana y tu teléfono?",

  schedule: [
    {
      time: "00–15",
      title: "Desafío inicial",
      minutes: 15,
    },
    {
      time: "15–50",
      title: "Fundamentos de fotografía y video",
      minutes: 35,
    },
    {
      time: "50–80",
      title: "Demostración Café Raíz",
      minutes: 30,
    },
    {
      time: "80–100",
      title: "Descanso",
      minutes: 20,
    },
    {
      time: "100–160",
      title: "Laboratorio de producción",
      minutes: 60,
    },
    {
      time: "160–180",
      title: "Exhibición y reflexión",
      minutes: 20,
    },
  ],

  slides: [
    {
      id: 1,
      block: "ACTIVACIÓN · 15 MIN",
      kind: "cover",
      title:
        "No necesitas la cámara más cara. Necesitas saber qué quieres mostrar.",
      subtitle: "De la pantalla al estudio. Ahora tú eres el fotógrafo.",
      body: "La calidad de una fotografía publicitaria depende de decisiones sobre luz, composición, escenario, producto y mensaje. Hoy produciremos contenido real para nuestra marca de café.",
      imageHint:
        "Fotógrafo universitario capturando una taza de café con teléfono en mini estudio de iluminación natural",
    },

    {
      id: 2,
      block: "ACTIVACIÓN",
      kind: "table",
      title: "Tienes una taza, una ventana y un teléfono.",
      subtitle: "El mismo producto puede verse cotidiano o publicitario.",
      columns: ["Elemento", "Fotografía cotidiana", "Fotografía publicitaria"],
      rows: [
        ["Escenario", "Sin preparación", "Fondo y utilería seleccionados"],
        ["Luz", "Sin control", "Fuente y dirección definidas"],
        ["Encuadre", "Improvisado", "Producto protagonista"],
        ["Mensaje", "Solo muestra", "Comunica una intención"],
      ],
      note: "Desafío: cada equipo propone tres cambios para mejorar la fotografía sin comprar equipamiento.",
    },

    {
      id: 3,
      block: "FUNDAMENTOS · 35 MIN",
      kind: "table",
      title: "Una fotografía comercial debe responder a un objetivo.",
      columns: ["Enfoque", "Qué comunica", "Ejemplo"],
      rows: [
        ["Producto", "Forma, textura y presentación", "Empaque y taza"],
        ["Experiencia", "Preparación o consumo", "Sirviendo café"],
        ["Emoción", "Situación significativa", "Pausa de la mañana"],
      ],
      note: "Pregunta: ¿cuál de estos enfoques necesita nuestra campaña?",
    },

    {
      id: 4,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "La luz es tu primera herramienta de producción.",
      columns: ["Tipo de luz", "Efecto", "Aplicación"],
      rows: [
        ["Lateral", "Revela textura y volumen", "Taza y granos"],
        ["Contraluz", "Destaca bordes y vapor", "Café servido"],
        ["Difusa", "Suaviza sombras", "Escena de consumo"],
      ],
      note: "Demostración: ventana, cartulina blanca como reflector y una superficie estable.",
    },

    {
      id: 5,
      block: "FUNDAMENTOS",
      kind: "statement",
      title: "El encuadre decide qué ve primero el consumidor.",
      body: "Aplica jerarquía visual, regla de los tercios, espacio negativo para textos, fondos sin distracciones, líneas que dirigen la mirada y coherencia con la identidad visual.",
      quote: "¿Dónde colocarías el titular sin tapar el café?",
    },

    {
      id: 6,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Cambiar el plano cambia la historia.",
      columns: ["Plano", "Función", "Ejemplo"],
      rows: [
        ["General", "Presentar el contexto", "Mesa y ambiente"],
        ["Medio", "Relacionar acción y producto", "Preparación"],
        ["Detalle", "Resaltar textura", "Granos o café servido"],
      ],
      note: "Ejercicio: selecciona tres planos para contar la preparación de una taza de café.",
    },

    {
      id: 7,
      block: "FUNDAMENTOS",
      kind: "statement",
      title: "Un buen video empieza antes de presionar grabar.",
      body: "Limpia la lente. Graba vertical 9:16 para Reels. Utiliza 1080p o superior cuando el dispositivo lo permita. Evita movimientos bruscos. Bloquea enfoque y exposición cuando sea posible. Revisa luz y fondo. Graba clips cortos con margen para editar.",
      quote: "Prioriza estabilidad y buena iluminación antes que efectos.",
    },

    {
      id: 8,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Cinco planos pueden construir una historia.",
      columns: ["Clip", "Función", "Ejemplo"],
      rows: [
        ["1", "Presentar", "Escenario"],
        ["2", "Preparar", "Granos o empaque"],
        ["3", "Servir", "Preparación"],
        ["4", "Disfrutar", "Taza terminada"],
        ["5", "Cerrar", "Producto protagonista"],
      ],
      note: "Mantén continuidad en iluminación, posición de objetos y dirección de movimiento.",
    },

    {
      id: 9,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Improvisar todo en el momento cuesta tiempo.",
      columns: ["Antes de grabar", "Decisión"],
      rows: [
        ["Concepto", "Qué queremos comunicar"],
        ["Producto", "Qué objeto utilizaremos"],
        ["Utilería", "Taza, empaque y fondo"],
        ["Fotografías", "Qué planos necesitamos"],
        ["Video", "Qué clips grabaremos"],
        ["Roles", "Quién dirige y quién captura"],
      ],
      note: "Actividad: preparar una lista de tomas antes de comenzar la sesión.",
    },

    {
      id: 10,
      block: "DEMOSTRACIÓN · 30 MIN",
      kind: "table",
      title: "Café Raíz: construyamos un mini estudio en el aula.",
      columns: ["Paso", "Acción"],
      rows: [
        ["1", "Preparar la superficie y el fondo"],
        ["2", "Colocar el producto"],
        ["3", "Ubicar la fuente de luz"],
        ["4", "Ajustar el encuadre"],
        ["5", "Capturar varias opciones"],
        ["6", "Comparar los resultados"],
      ],
      note: "Materiales: taza o empaque, teléfono, mesa, cartulina, tela, reflector improvisado y trípode opcional.",
    },

    {
      id: 11,
      block: "DEMOSTRACIÓN",
      kind: "table",
      title: "El mismo producto, tres objetivos visuales.",
      columns: ["Fotografía", "Intención", "Plano recomendado"],
      rows: [
        ["Producto", "Mostrar características", "Detalle"],
        ["Proceso", "Mostrar preparación", "Medio"],
        ["Experiencia", "Comunicar emoción", "General o medio"],
      ],
      note: "Captura tres enfoques y selecciona imágenes con buena luz, enfoque y composición.",
    },

    {
      id: 12,
      block: "DEMOSTRACIÓN",
      kind: "table",
      title: "Grabemos material para el anuncio de la Semana 16.",
      columns: ["Clip", "Plano", "Acción"],
      rows: [
        ["1", "General", "Presentación del escenario"],
        ["2", "Detalle", "Granos o empaque"],
        ["3", "Medio", "Preparación"],
        ["4", "Detalle", "Café servido"],
        ["5", "Producto", "Cierre publicitario"],
      ],
      note: "Graba cinco clips verticales de aproximadamente 3 a 6 segundos. Todavía no es necesario editar el anuncio completo.",
    },

    {
      id: 13,
      block: "LABORATORIO · 60 MIN",
      kind: "content-photo-production-lab",
      title: "Laboratorio 15: tu primera sesión fotográfica publicitaria.",
      subtitle:
        "Tres fotografías originales, cinco clips, un anuncio y un storyboard.",
    },

    {
      id: 14,
      block: "PRESENTACIONES · 20 MIN",
      kind: "present",
      title: "Muestra tu mejor fotografía. Explica cómo la conseguiste.",
      body: "Cada equipo presenta su fotografía principal, el anuncio diseñado y una muestra de sus clips. Explica cómo utilizó la luz, qué plano funcionó mejor, qué dificultades encontró y qué material utilizará en el anuncio audiovisual.",
      quote:
        "Una fotografía profesional es el resultado de decisiones, no de casualidad.",
    },

    {
      id: 15,
      block: "REFLEXIÓN",
      kind: "questions",
      title: "¿Qué aprendimos hoy?",
      questions: [
        "¿Qué diferencia existe entre fotografiar y producir una fotografía publicitaria?",
        "¿Cómo podemos controlar la luz con recursos económicos?",
        "¿Por qué es importante planificar los planos?",
        "¿Qué ventajas y limitaciones encontramos al trabajar con teléfonos?",
      ],
    },

    {
      id: 16,
      block: "TRABAJO AUTÓNOMO",
      kind: "homework",
      title: "Construye tu banco fotográfico y prepara tu anuncio audiovisual.",
      body: "Mejora las tres fotografías de clase. Captura cinco fotografías adicionales: producto, detalle, preparación, experiencia y composición creativa. Diseña dos anuncios nuevos con fotografías propias. Revisa los clips, graba material complementario y prepara un storyboard de seis escenas para un anuncio de 20 a 30 segundos.",
      note: "Moodle: ocho fotografías originales editadas, tres anuncios gráficos acumulados, banco de clips, storyboard en PDF y presentación grupal de cinco diapositivas.",
      next: "Semana 16: edición audiovisual, ritmo, sonido, subtítulos y anuncio terminado.",
    },
  ],
};

export default semana15;
