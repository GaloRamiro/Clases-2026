const semana17 = {
  id: "contenido-semana-17",
  courseId: "contenido",
  number: 17,
  title: "Una campaña. Tres plataformas. Tres formas de comunicar.",
  subtitle:
    "Adaptación multiplataforma, copywriting, accesibilidad y publicación simulada",
  duration: 180,

  objective:
    "Adaptar, optimizar y preparar contenidos gráficos y audiovisuales para distintas plataformas digitales, considerando formatos, comportamiento de la audiencia, identidad visual, accesibilidad y objetivos de comunicación.",

  challenge:
    "¿Cómo conseguir que una marca se reconozca en Instagram, TikTok y Facebook sin publicar exactamente lo mismo?",

  schedule: [
    { time: "00–15", title: "Desafío inicial", minutes: 15 },
    { time: "15–50", title: "Fundamentos académicos", minutes: 35 },
    { time: "50–80", title: "Demostración Café Raíz", minutes: 30 },
    { time: "80–100", title: "Descanso", minutes: 20 },
    { time: "100–160", title: "Laboratorio multiplataforma", minutes: 60 },
    { time: "160–180", title: "Auditoría y reflexión", minutes: 20 },
  ],

  slides: [
    {
      id: 1,
      block: "ACTIVACIÓN · 15 MIN",
      kind: "cover",
      title: "El mismo mensaje no necesita el mismo formato.",
      subtitle: "Una campaña. Tres plataformas. Tres formas de comunicar.",
      body: "Una campaña debe conservar su identidad visual y su idea central, pero adaptar el lenguaje, la composición, el formato y la presentación según el canal.",
      imageHint:
        "Equipo creativo universitario trabajando en una campaña digital de café, con tres pantallas mostrando Instagram, TikTok y Facebook, fotografía editorial cinematográfica",
    },

    {
      id: 2,
      block: "ACTIVACIÓN",
      kind: "table",
      title:
        "Tienes un anuncio de café de 30 segundos. ¿Lo publicarías igual en todas partes?",
      columns: ["Plataforma", "Enfoque creativo", "Pregunta"],
      rows: [
        [
          "Instagram",
          "Impacto visual y coherencia estética",
          "¿Qué portada elegirías?",
        ],
        [
          "TikTok",
          "Gancho directo y demostración",
          "¿Qué mostrarías en los primeros segundos?",
        ],
        [
          "Facebook",
          "Contexto, información y conversación",
          "¿Qué pregunta invitaría a participar?",
        ],
      ],
      note: "Actividad: cada equipo propone cómo cambiaría el inicio, el copy y el CTA de su anuncio. Estos enfoques son ejemplos, no reglas absolutas.",
    },

    {
      id: 3,
      block: "FUNDAMENTOS · 35 MIN",
      kind: "statement",
      title: "¿Qué es la adaptación multiplataforma?",
      body: "Es el proceso de ajustar un contenido para que funcione en diferentes canales, conservando la idea central y la identidad de marca. Podemos adaptar formato, duración, gancho, texto, tono, portada, CTA e información complementaria.",
      quote: "Adaptar no significa crear una marca diferente para cada red.",
    },

    {
      id: 4,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Instagram: diseñar para un entorno visual.",
      columns: ["Formato", "Posible aplicación"],
      rows: [
        ["Reel vertical", "Anuncio audiovisual de café"],
        ["Historia", "Contenido breve o recordatorio"],
        ["Carrusel", "Consejos o secuencia educativa"],
        ["Publicación gráfica", "Fotografía de producto"],
      ],
      note: "Ejemplo de CTA: «Guarda esta idea para tu próxima pausa».",
    },

    {
      id: 5,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "TikTok: muestra tu idea desde el inicio.",
      columns: ["Recurso", "Ejemplo"],
      rows: [
        ["Demostración", "Preparación de una taza"],
        ["Pregunta", "¿Cómo preparas tu café?"],
        ["Proceso", "Del grano a la taza"],
        ["Experiencia", "Una pausa en un día ocupado"],
      ],
      note: "Ejemplo de gancho: «¿Qué cambia si preparas tu café de esta manera?». CTA: «Cuéntanos cómo lo preparas tú».",
    },

    {
      id: 6,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Facebook: una publicación también puede invitar a conversar.",
      columns: ["Enfoque", "Aplicación"],
      rows: [
        ["Informativo", "Características del producto"],
        ["Fotografía con contexto", "Historia de una pausa"],
        ["Video", "Experiencia de preparación"],
        ["Pregunta a la comunidad", "Hábitos de consumo"],
      ],
      note: "Ejemplo: «Cada persona tiene una forma diferente de disfrutar su café. ¿Cuál es tu momento favorito?».",
    },

    {
      id: 7,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "El tamaño del archivo también es una decisión de diseño.",
      columns: ["Proporción", "Resolución de referencia", "Uso"],
      rows: [
        ["9:16", "1080 × 1920 px", "Video vertical"],
        ["4:5", "1080 × 1350 px", "Publicación vertical"],
        ["1:1", "1080 × 1080 px", "Publicación cuadrada"],
      ],
      note: "Son medidas de referencia para el ejercicio. Los requisitos admitidos pueden variar según plataforma y tipo de publicación. Revisa producto, titulares y zonas seguras al recortar.",
    },

    {
      id: 8,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Un mismo mensaje puede tener tres copies.",
      columns: ["Plataforma", "Ejemplo de copy"],
      rows: [
        [
          "Instagram",
          "Una pausa, una taza y un momento para ti. Guarda esta idea.",
        ],
        [
          "TikTok",
          "¿Cómo preparas el café cuando necesitas desconectarte? Cuéntanos.",
        ],
        [
          "Facebook",
          "Entre tantas actividades, una pausa puede convertirse en un pequeño ritual. ¿Cómo disfrutas la tuya?",
        ],
      ],
      note: "Idea central: «Tu pausa merece un buen café». Pregunta: ¿qué cambia y qué permanece?",
    },

    {
      id: 9,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Publicar bien también significa ser accesible.",
      columns: ["Control", "Qué revisar"],
      rows: [
        ["Contraste", "Textos legibles"],
        ["Subtítulos", "Videos con voz"],
        ["Texto alternativo", "Descripción cuando esté disponible"],
        ["Zonas seguras", "Títulos y logotipos visibles"],
        ["Audio", "Recursos autorizados"],
        ["Ortografía", "Ausencia de errores"],
        ["Información", "Datos comerciales verificables"],
        ["CTA", "Acción clara y comprensible"],
      ],
      note: "Un diseño atractivo que no puede leerse necesita mejorar.",
    },

    {
      id: 10,
      block: "DEMOSTRACIÓN · 30 MIN",
      kind: "table",
      title: "Café Raíz: una idea, tres adaptaciones.",
      columns: ["Plataforma", "Pieza", "Decisión creativa"],
      rows: [
        [
          "Instagram",
          "Reel con portada de marca",
          "Priorizar identidad visual",
        ],
        [
          "TikTok",
          "Versión con gancho directo",
          "Mostrar la acción desde el inicio",
        ],
        ["Facebook", "Publicación con contexto", "Incluir una pregunta"],
      ],
      note: "Reutilizamos el material de la Semana 16, pero adaptamos su presentación.",
    },

    {
      id: 11,
      block: "DEMOSTRACIÓN",
      kind: "table",
      title: "Del archivo exportado a una publicación completa.",
      columns: ["Campo", "Ejemplo"],
      rows: [
        ["Plataforma", "Instagram"],
        ["Objetivo", "Reconocimiento"],
        ["Formato", "Reel 9:16"],
        ["Archivo", "cafe-raiz-reel.mp4"],
        ["Mensaje", "Tu historia comienza con una taza"],
        ["CTA", "Descubre Café Raíz"],
        ["Fecha", "Según cronopost"],
        ["Estado", "Listo para revisión"],
      ],
      note: "Una publicación no está completa solamente porque existe un archivo MP4.",
    },

    {
      id: 12,
      block: "DEMOSTRACIÓN",
      kind: "table",
      title: "Antes de publicar, revisa cómo se verá.",
      columns: ["Elemento", "Pregunta de control"],
      rows: [
        ["Marca", "¿Se reconoce la identidad?"],
        ["Vista previa", "¿Se ve bien el contenido?"],
        ["Copy", "¿Se entiende el mensaje?"],
        ["CTA", "¿Está clara la acción?"],
        ["Plataforma", "¿El formato corresponde?"],
        ["Fecha", "¿Coincide con el cronopost?"],
      ],
      note: "Demostración de maquetas de publicación. No es necesario publicar en cuentas reales.",
    },

    {
      id: 13,
      block: "LABORATORIO · 60 MIN",
      kind: "content-multiplatform-lab",
      title: "Laboratorio 17: prepara tu campaña para tres plataformas.",
      subtitle:
        "Tres publicaciones, tres copies, tres maquetas, checklist y cronopost.",
    },

    {
      id: 14,
      block: "PRESENTACIONES · 20 MIN",
      kind: "present",
      title: "¿Está listo para publicarse o necesita correcciones?",
      body: "Cada equipo presenta sus tres maquetas y justifica qué cambió entre plataformas, por qué seleccionó esos formatos, cómo adaptó el CTA y qué controles de calidad aplicó.",
      quote:
        "La adaptación profesional se demuestra en las decisiones, no solo en los tamaños.",
    },

    {
      id: 15,
      block: "REFLEXIÓN",
      kind: "questions",
      title: "¿Qué aprendimos hoy?",
      questions: [
        "¿Por qué adaptar no es simplemente cambiar el tamaño?",
        "¿Qué elementos deben permanecer constantes entre plataformas?",
        "¿Cómo cambia el copy según el objetivo?",
        "¿Qué debemos revisar antes de publicar?",
        "¿Cómo organizamos el material para una campaña profesional?",
      ],
    },

    {
      id: 16,
      block: "TRABAJO AUTÓNOMO",
      kind: "homework",
      title: "Cierra tu campaña y prepara el portafolio final.",
      body: "Mejora las tres publicaciones del laboratorio. Selecciona y optimiza seis piezas adicionales del trabajo anterior, incluyendo al menos un video, una fotografía publicitaria y un carrusel. Organiza nueve piezas finales, completa el cronopost definitivo, revisa calidad y accesibilidad, y prepara los archivos finales y editables junto con el borrador del portafolio.",
      note: "Moodle: nueve piezas optimizadas, cronopost definitivo, checklist de calidad y borrador del portafolio en PDF. No necesitas crear nueve piezas nuevas.",
      next: "Semana 18: presentación final de campaña, portafolio creativo y defensa profesional.",
    },
  ],
};

export default semana17;
