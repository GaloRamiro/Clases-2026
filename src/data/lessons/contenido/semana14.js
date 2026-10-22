const semana14 = {
  id: "contenido-semana-14",
  courseId: "contenido",
  number: 14,
  title: "La inteligencia artificial propone. El diseñador decide.",
  subtitle: "Dirección de arte, fotografía publicitaria e IA creativa",
  duration: 180,
  objective:
    "Aplicar herramientas digitales e inteligencia artificial generativa en la creación de recursos gráficos publicitarios, utilizando dirección de arte, composición, iluminación, coherencia visual y edición, con criterios de calidad, ética y autenticidad.",
  challenge:
    "¿Cómo hacemos que una imagen represente nuestra marca y no parezca una fotografía genérica?",

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
      title: "Laboratorio creativo",
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
        "Una imagen bonita llama la atención. Una imagen bien dirigida comunica una idea.",
      subtitle: "La inteligencia artificial propone. El diseñador decide.",
      body: "La calidad publicitaria depende de las decisiones sobre concepto, producto, luz, composición y mensaje, no solamente de la herramienta utilizada.",
      imageHint:
        "Estudio creativo de fotografía publicitaria de café, iluminación cinematográfica, composición editorial",
    },

    {
      id: 2,
      block: "ACTIVACIÓN",
      kind: "table",
      title: "El mismo producto. Dos direcciones creativas.",
      subtitle:
        "Analiza dos fotografías del mismo café con intenciones diferentes.",
      columns: ["Elemento", "Imagen A", "Imagen B"],
      rows: [
        ["Enfoque", "Descripción del producto", "Atmósfera y concepto"],
        ["Iluminación", "Funcional y uniforme", "Expresiva e intencional"],
        ["Composición", "Producto centrado", "Jerarquía y narrativa"],
        ["Emoción", "Claridad", "Experiencia"],
        ["Uso", "Catálogo", "Campaña publicitaria"],
      ],
      note: "Actividad: identificar iluminación, composición, emoción, audiencia y utilidad comercial. Ninguna opción es universalmente mejor.",
    },

    {
      id: 3,
      block: "FUNDAMENTOS · 35 MIN",
      kind: "statement",
      title: "Antes de crear la imagen, decide qué comunicar.",
      body: "La dirección de arte determina cómo representar visualmente una idea mediante producto, escenario, color, iluminación, encuadre y estilo. Una marca de café asociada a la tranquilidad podría priorizar luz suave, composición limpia y un ambiente cotidiano.",
      quote: "La dirección de arte empieza antes de abrir una herramienta.",
    },

    {
      id: 4,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "Cinco decisiones que cambian una fotografía.",
      columns: ["Decisión", "Pregunta", "Aplicación"],
      rows: [
        ["Producto", "¿Qué debe observarse primero?", "Protagonismo visual"],
        ["Iluminación", "¿Qué atmósfera buscamos?", "Luz y sombras"],
        ["Composición", "¿Dónde ubicar los elementos?", "Jerarquía"],
        ["Color", "¿Qué comunica la paleta?", "Identidad visual"],
        ["Encuadre", "¿Qué mostramos y omitimos?", "Selección visual"],
      ],
      note: "Ejercicio: describir una fotografía de café con estas cinco decisiones sin mencionar herramientas de IA.",
    },

    {
      id: 5,
      block: "FUNDAMENTOS",
      kind: "statement",
      title: "El espacio vacío también es parte del diseño.",
      body: "Aplica jerarquía visual, regla de los tercios como recurso compositivo, espacio negativo para titulares, contraste entre producto y fondo, equilibrio y dirección de la mirada.",
      quote: "¿Dónde colocarías el titular sin tapar el producto?",
    },

    {
      id: 6,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "La luz transforma la percepción del producto.",
      columns: ["Iluminación", "Sensación", "Aplicación"],
      rows: [
        ["Suave", "Calidez y cercanía", "Café en el hogar"],
        ["Dramática", "Contraste y sofisticación", "Producto premium"],
        ["Brillante", "Frescura y energía", "Escena dinámica"],
      ],
      note: "Selecciona la iluminación más coherente con tu Buyer Persona y la identidad de marca.",
    },

    {
      id: 7,
      block: "FUNDAMENTOS",
      kind: "statement",
      title: "Un prompt es una instrucción de dirección creativa.",
      body: "Estructura recomendada: producto + escenario + acción + composición + iluminación + estilo + formato + restricciones. Un prompt preciso reduce la improvisación, pero no garantiza un resultado correcto.",
      quote: "No pidas simplemente «una foto de café». Dirige la escena.",
    },

    {
      id: 8,
      block: "FUNDAMENTOS",
      kind: "statement",
      title: "No toda imagen generada debe utilizarse.",
      body: "Revisa proporciones del producto, sombras, reflejos, perspectiva, manos, objetos, identidad visual, espacio para textos, marcas ajenas y condiciones de uso. No presentes una imagen sintética como prueba documental de características de un producto real.",
      quote:
        "La calidad, la autenticidad y la responsabilidad también se diseñan.",
    },

    {
      id: 9,
      block: "FUNDAMENTOS",
      kind: "table",
      title: "La imagen es un recurso. El anuncio es el producto.",
      columns: ["Fase", "Acción", "Resultado"],
      rows: [
        ["Recurso visual", "Generar o fotografiar", "Imagen base"],
        ["Edición", "Recortar y corregir", "Fotografía mejorada"],
        [
          "Composición",
          "Integrar identidad, titular y CTA",
          "Anuncio completo",
        ],
      ],
      note: "Generar una imagen no equivale a diseñar una pieza publicitaria terminada.",
    },

    {
      id: 10,
      block: "DEMOSTRACIÓN · 30 MIN",
      kind: "table",
      title: "Café Raíz: tres propuestas fotográficas.",
      subtitle: "Campaña: «Tu historia comienza con una taza».",
      columns: ["Dirección", "Escenario", "Intención"],
      rows: [
        ["Cotidiana", "Café en una mesa de trabajo", "Cercanía"],
        ["Producto", "Taza y empaque protagonistas", "Reconocimiento"],
        ["Emocional", "Momento de pausa personal", "Conexión"],
      ],
      note: "Compara cuál dirección representa mejor el concepto de campaña y el público.",
    },

    {
      id: 11,
      block: "DEMOSTRACIÓN",
      kind: "statement",
      title: "Generemos una fotografía con intención.",
      body: "Fotografía publicitaria hiperrealista de una taza de café artesanal recién preparado sobre una mesa de madera natural. Vapor sutil y físicamente creíble, iluminación lateral suave ámbar, sombras profundas con matices verde petróleo, profundidad de campo reducida y textura auténtica de cerámica. Composición vertical 4:5, producto en el tercio inferior derecho y espacio negativo superior izquierdo. Estética editorial premium, sin textos, logotipos, marcas, objetos deformados ni elementos futuristas.",
      quote: "Genera, revisa, identifica errores y ajusta el prompt.",
    },

    {
      id: 12,
      block: "DEMOSTRACIÓN",
      kind: "table",
      title: "De la fotografía al anuncio terminado.",
      columns: ["Paso", "Acción"],
      rows: [
        ["01", "Importar fotografía"],
        ["02", "Ajustar encuadre y contraste"],
        ["03", "Incorporar logotipo y paleta"],
        ["04", "Añadir titular: «Tu historia comienza con una taza»"],
        ["05", "Añadir CTA: «Descubre Café Raíz»"],
        ["06", "Exportar para publicación"],
      ],
      note: "El resultado debe ser una pieza publicitaria completa.",
    },

    {
      id: 13,
      block: "LABORATORIO · 60 MIN",
      kind: "content-art-direction-lab",
      title: "Laboratorio 14: conviértete en director de arte.",
      subtitle:
        "Genera o selecciona fotografías, mejora dos y diseña anuncios 4:5 y 9:16.",
    },

    {
      id: 14,
      block: "PRESENTACIÓN · 20 MIN",
      kind: "present",
      title: "No muestres solo el resultado. Explica tus decisiones.",
      body: "Cada equipo presenta una fotografía inicial, su versión mejorada y los dos anuncios finales. Explica la emoción buscada, la iluminación, la composición, los errores detectados y qué resolvió el equipo frente a lo que aportó la herramienta.",
      quote: "¿Por qué el anuncio final representa a tu marca?",
    },

    {
      id: 15,
      block: "REFLEXIÓN",
      kind: "questions",
      title: "¿Qué aprendimos hoy?",
      questions: [
        "¿Qué diferencia existe entre generar una imagen y dirigir su creación?",
        "¿Por qué debemos revisar críticamente los resultados de IA?",
        "¿Qué transforma una fotografía en un anuncio?",
        "¿Cómo mantenemos una identidad visual coherente?",
      ],
    },

    {
      id: 16,
      block: "TRABAJO AUTÓNOMO",
      kind: "homework",
      title: "Produce una mini campaña fotográfica.",
      body: "Mejora los dos anuncios de clase. Crea tres fotografías adicionales: producto, experiencia de consumo y escena emocional. Diseña dos anuncios gráficos nuevos. Documenta dirección de arte, herramientas, origen de recursos y ediciones. Selecciona una fotografía para recrearla con cámara o teléfono en la Semana 15.",
      note: "Moodle: cinco fotografías finales, cuatro anuncios acumulados, ficha de dirección de arte en PDF y presentación grupal de cinco diapositivas.",
      next: "Semana 15: fotografía y producción audiovisual real.",
    },
  ],
};

export default semana14;
