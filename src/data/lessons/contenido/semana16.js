const semana16 = {
  id: "contenido-semana-16",
  courseId: "contenido",
  number: 16,
  title: "De cinco clips a un anuncio que cuenta una historia.",
  subtitle: "Edición audiovisual, narrativa, ritmo, sonido y exportación",
  duration: 180,

  objective:
    "Editar y producir anuncios audiovisuales digitales aplicando principios de narrativa, montaje, ritmo, continuidad, tratamiento de audio, subtitulado y diseño gráfico, para comunicar una propuesta publicitaria de forma efectiva.",

  challenge:
    "¿Cómo conseguir que cinco clips formen una historia publicitaria clara en treinta segundos?",

  schedule: [
    {
      time: "00–15",
      title: "Desafío inicial",
      minutes: 15,
    },
    {
      time: "15–50",
      title: "Fundamentos académicos",
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
      title: "Laboratorio audiovisual",
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
      title: "Grabar es capturar. Editar es decidir qué historia contar.",
      subtitle: "De cinco clips a un anuncio que cuenta una historia.",
      body: "El montaje audiovisual permite seleccionar, ordenar y transformar imágenes y sonidos para construir un mensaje. Hoy convertiremos las grabaciones originales de la Semana 15 en anuncios publicitarios terminados.",
      imageHint:
        "Editor audiovisual universitario trabajando con una línea de tiempo de video publicitario de café, monitores profesionales, iluminación azul petróleo y ámbar",
    },

    {
      id: 2,
      block: "ACTIVACIÓN",
      kind: "table",
      title: "Tienes cinco clips y solo treinta segundos.",
      subtitle: "¿Qué mostrarías primero para captar la atención?",
      columns: ["Clip disponible", "Posible función", "Decisión creativa"],
      rows: [
        ["Granos de café", "Presentar el producto", "¿Abre o desarrolla?"],
        ["Preparación", "Mostrar el proceso", "¿Cuánto debe durar?"],
        [
          "Café sirviéndose",
          "Generar interés sensorial",
          "¿Qué sonido usarías?",
        ],
        ["Taza terminada", "Mostrar el resultado", "¿Dónde ubicarla?"],
        ["Empaque y marca", "Cerrar con identidad", "¿Qué CTA incorporarías?"],
      ],
      note: "Actividad: cada equipo propone un orden, una duración y un mensaje. Compara cómo cambia la historia cuando cambia el montaje.",
    },

    {
      id: 3,
      block: "FUNDAMENTOS · 35 MIN",
      kind: "statement",
      title: "¿Qué es el montaje audiovisual?",
      body: "Es el proceso de seleccionar, organizar y combinar imágenes y sonidos para construir una secuencia con sentido narrativo. Permite controlar duración, ritmo, atención, continuidad y significado.",
      quote: "No gana el video con más efectos, sino el que comunica mejor.",
    },

    {
      id: 4,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Treinta segundos también tienen inicio, desarrollo y cierre.",
      columns: ["Tiempo", "Etapa", "Función"],
      rows: [
        ["0–5 s", "Gancho", "Captar interés desde el inicio"],
        ["5–23 s", "Desarrollo", "Mostrar experiencia o beneficio"],
        ["23–30 s", "Cierre", "Presentar marca, mensaje y CTA"],
      ],
      note: "La estructura es una guía flexible. Adáptala al concepto creativo de tu marca.",
    },

    {
      id: 5,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "El ritmo se construye con la duración de los planos.",
      columns: ["Recurso", "Sensación", "Aplicación"],
      rows: [
        ["Planos cortos", "Dinamismo", "Preparación rápida"],
        ["Planos largos", "Contemplación", "Momento de pausa"],
        ["Alternancia", "Variedad", "Proceso y producto"],
        ["Pausa visual", "Énfasis", "Cierre con la marca"],
      ],
      note: "Ejercicio: compara el ritmo de un anuncio juvenil con otro enfocado en tranquilidad.",
    },

    {
      id: 6,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "No todas las escenas necesitan una transición llamativa.",
      columns: ["Transición", "Función", "Uso recomendado"],
      rows: [
        ["Corte directo", "Claridad y dinamismo", "Cambios naturales de plano"],
        ["Fundido", "Suavidad", "Cambio de momento"],
        [
          "Continuidad de movimiento",
          "Conexión entre acciones",
          "Movimientos compatibles",
        ],
      ],
      note: "Utiliza transiciones cuando aporten continuidad o significado, no simplemente para decorar.",
    },

    {
      id: 7,
      block: "FUNDAMENTOS",
      kind: "statement",
      title: "El audio también cuenta la historia.",
      body: "Un anuncio puede combinar música, sonido ambiente, efectos, voz en off y silencios intencionales. El sonido del café al servirse puede reforzar frescura y cercanía. Equilibra niveles para que el mensaje sea comprensible.",
      quote:
        "Utiliza música y efectos propios o autorizados para el uso previsto.",
    },

    {
      id: 8,
      block: "FUNDAMENTOS",
      kind: "statement",
      title: "Un anuncio debe entenderse incluso sin sonido.",
      body: "Utiliza textos breves, tipografías legibles, contraste suficiente y subtítulos sincronizados. Evita cubrir el producto y respeta las zonas seguras de las interfaces móviles.",
      quote:
        "¿Se entiende el mensaje si el espectador tiene el teléfono en silencio?",
    },

    {
      id: 9,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Un video terminado también debe estar bien exportado.",
      columns: ["Parámetro", "Configuración de referencia"],
      rows: [
        ["Contenedor", "MP4"],
        ["Códec de video", "H.264"],
        ["Orientación", "Vertical 9:16"],
        ["Resolución", "1080 × 1920 px"],
        ["Fotogramas", "30 fps o frecuencia original"],
        ["Duración", "20–30 segundos"],
        ["Audio", "AAC, cuando corresponda"],
      ],
      note: "Antes de entregar, revisa que no existan pantallas negras, textos cortados, distorsión de audio ni errores de sincronización.",
    },

    {
      id: 10,
      block: "DEMOSTRACIÓN · 30 MIN",
      kind: "statement",
      title: "Café Raíz: «Tu historia comienza con una taza».",
      body: "Objetivo: producir un anuncio vertical de treinta segundos que relacione el café con un momento de pausa personal. Recursos: clips originales, fotografías, logotipo, tipografías y paleta de marca.",
      quote: "No estamos mostrando cinco clips. Estamos contando una historia.",
    },

    {
      id: 11,
      block: "DEMOSTRACIÓN",
      kind: "table",
      title: "Ordenemos el material antes de agregar efectos.",
      columns: ["Tiempo", "Imagen", "Audio o texto"],
      rows: [
        ["0–4 s", "Persona termina una actividad", "Haz una pausa"],
        ["4–10 s", "Granos y preparación", "Sonido ambiente"],
        ["10–18 s", "Preparación del café", "Música"],
        ["18–24 s", "Taza servida", "Disfruta el momento"],
        ["24–30 s", "Producto y marca", "Descubre Café Raíz"],
      ],
      note: "Demostración: importar, ordenar, recortar y sincronizar clips en la línea de tiempo.",
    },

    {
      id: 12,
      block: "DEMOSTRACIÓN",
      kind: "table",
      title: "De una secuencia básica a un anuncio terminado.",
      columns: ["Paso", "Acción"],
      rows: [
        ["01", "Ajustar cortes y ritmo"],
        ["02", "Equilibrar el audio"],
        ["03", "Incorporar música autorizada"],
        ["04", "Añadir títulos y subtítulos"],
        ["05", "Corregir el color"],
        ["06", "Integrar logotipo y CTA"],
        ["07", "Exportar y revisar el archivo"],
      ],
      note: "Herramientas posibles: CapCut, Clipchamp, DaVinci Resolve o editor equivalente.",
    },

    {
      id: 13,
      block: "LABORATORIO · 60 MIN",
      kind: "content-video-editing-lab",
      title: "Laboratorio 16: produce el anuncio audiovisual de tu marca.",
      subtitle:
        "Un anuncio de 20–30 segundos, una versión corta, portada y ficha técnica.",
    },

    {
      id: 14,
      block: "PRESENTACIONES · 20 MIN",
      kind: "present",
      title: "Estreno de los anuncios de café.",
      body: "Cada equipo presenta su anuncio principal y explica el mensaje, el plano de mayor impacto, las decisiones de ritmo, el uso del sonido, la legibilidad sin audio y el llamado a la acción.",
      quote: "¿Qué decisiones de edición hicieron más fuerte el mensaje?",
    },

    {
      id: 15,
      block: "REFLEXIÓN",
      kind: "questions",
      title: "¿Qué aprendimos hoy?",
      questions: [
        "¿Qué diferencia existe entre grabar y editar?",
        "¿Cómo afecta el orden de los planos al mensaje?",
        "¿Por qué el sonido forma parte de la narrativa?",
        "¿Qué errores debemos evitar antes de publicar?",
      ],
    },

    {
      id: 16,
      block: "TRABAJO AUTÓNOMO",
      kind: "homework",
      title: "Prepara el paquete audiovisual definitivo de tu campaña.",
      body: "Mejora el anuncio principal de 20 a 30 segundos y la versión corta de 10 a 15 segundos. Crea una tercera versión de 6 a 8 segundos centrada en el producto y CTA. Diseña dos portadas, incorpora subtítulos y revisa sonido, legibilidad y zonas seguras. Elabora una ficha comparativa de las tres versiones y una presentación grupal de cinco diapositivas.",
      note: "Entrega en Moodle: tres videos MP4, dos portadas gráficas, ficha comparativa PDF y presentación grupal.",
      next: "Semana 17: adaptación y optimización para Instagram, TikTok y Facebook.",
    },
  ],
};

export default semana16;
