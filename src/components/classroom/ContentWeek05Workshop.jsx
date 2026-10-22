import { useState } from "react";
import "../../styles/contenidoSemana05.css";

const STEPS = [
  { title: "Idea y estrategia", minutes: 10 },
  { title: "Carrusel de cinco láminas", minutes: 20 },
  { title: "Historia interactiva", minutes: 10 },
  { title: "Guion de Reel", minutes: 10 },
  { title: "Justificación estratégica", minutes: 5 },
  { title: "Entrega y presentación", minutes: 5 },
];

const INITIAL = {
  team: "",
  brand: "",
  buyerPersona: "",
  consumerNeed: "",
  centralIdea: "",
  contentType: "Educativo",
  platform: "Instagram",
  objective: "",
  brandVoice: "",

  carouselTitle: "",
  carouselSlides: Array.from({ length: 5 }, () => ({
    headline: "",
    message: "",
    visual: "",
  })),
  carouselCaption: "",
  carouselCta: "",
  carouselLink: "",

  storyTitle: "",
  storyMessage: "",
  storyVisual: "",
  storyInteraction: "Encuesta",
  storyQuestion: "",
  storyOptionA: "",
  storyOptionB: "",
  storyCta: "",
  storyLink: "",

  reelDuration: "20",
  reelScenes: Array.from({ length: 4 }, () => ({
    time: "",
    visual: "",
    message: "",
    audio: "",
  })),
  reelCta: "",

  carouselReason: "",
  storyReason: "",
  reelReason: "",
  coherence: "",
  expectedResponse: "",

  presentation: "",
  deliveryLink: "",
  reflection: "",

  completed: Array(6).fill(false),
};

function createInitial() {
  return {
    ...INITIAL,
    carouselSlides: INITIAL.carouselSlides.map((s) => ({ ...s })),
    reelScenes: INITIAL.reelScenes.map((s) => ({ ...s })),
    completed: [...INITIAL.completed],
  };
}

function getKey(lessonId, studentName) {
  return `aula:contenido:semana05:${lessonId}:${String(
    studentName || "sin-nombre",
  )
    .trim()
    .toLowerCase()}`;
}

function readSaved(key) {
  const fallback = createInitial();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return fallback;

    return {
      ...fallback,
      ...saved,
      carouselSlides: fallback.carouselSlides.map((item, index) => ({
        ...item,
        ...(saved.carouselSlides?.[index] || {}),
      })),
      reelScenes: fallback.reelScenes.map((item, index) => ({
        ...item,
        ...(saved.reelScenes?.[index] || {}),
      })),
      completed: fallback.completed.map((_, index) =>
        Boolean(saved.completed?.[index]),
      ),
    };
  } catch {
    return fallback;
  }
}

function Field({ label, value, onChange, placeholder = "", multiline = true }) {
  return (
    <label className="formats5-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function StepHeading({ index, description }) {
  return (
    <div className="formats5-step-heading">
      <span className="formats5-step-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <span className="formats5-step-time">
          {STEPS[index].minutes} MINUTOS
        </span>
        <h3>{STEPS[index].title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function ContentWeek05Workshop({
  lessonId = "contenido-semana-5",
  studentName = "",
}) {
  const key = getKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: readSaved(key),
  }));

  const data = stored.key === key ? stored.data : readSaved(key);

  function update(changes) {
    const next = { ...data, ...changes };

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Permite continuar aunque el almacenamiento esté bloqueado.
    }

    setStored({ key, data: next });
  }

  function setField(field, value) {
    update({ [field]: value });
  }

  function setArrayField(arrayName, index, field, value) {
    const items = data[arrayName].map((item) => ({ ...item }));
    items[index][field] = value;
    update({ [arrayName]: items });
  }

  function markDone(index, checked) {
    const completed = [...data.completed];
    completed[index] = checked;
    update({ completed });
  }

  const completedCount = data.completed.filter(Boolean).length;
  const progress = Math.round((completedCount / 6) * 100);

  const field = (name, label, placeholder = "", multiline = true) => (
    <Field
      label={label}
      value={data[name]}
      onChange={(value) => setField(name, value)}
      placeholder={placeholder}
      multiline={multiline}
    />
  );

  const done = (index) => (
    <label className="formats5-done">
      <input
        type="checkbox"
        checked={data.completed[index]}
        onChange={(event) => markDone(index, event.target.checked)}
      />
      Marcar etapa como completada
    </label>
  );

  return (
    <div className="formats5">
      <header className="formats5-hero">
        <span className="formats5-eyebrow">
          AULA DIGITAL · LABORATORIO 05 · 60 MINUTOS
        </span>
        <h2>Una idea. Tres formatos.</h2>
        <p>
          Convierte una necesidad de tu consumidor en un carrusel, una historia
          interactiva y un guion de Reel.
        </p>

        <div className="formats5-progress-label">
          <strong>Progreso del laboratorio</strong>
          <span>
            {completedCount} de 6 etapas · {progress}%
          </span>
        </div>

        <div
          className="formats5-progress"
          role="progressbar"
          aria-label="Progreso del laboratorio"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section className="formats5-panel">
        <h3>Tu marca continúa creciendo</h3>
        <p className="formats5-description">
          Recupera el Buyer Persona y la voz de marca de las semanas anteriores.
          Trabajaremos con la misma marca de café durante todo el semestre.
        </p>

        <div className="formats5-grid">
          {field("team", "Nombre del equipo", "Equipo 01", false)}
          {field("brand", "Marca de café", "Nombre de la marca", false)}
        </div>
      </section>

      {/* ETAPA 1 */}
      <section className="formats5-panel">
        <StepHeading
          index={0}
          description="Selecciona una necesidad concreta y define el mensaje central que adaptarás."
        />

        {field(
          "buyerPersona",
          "¿Quién es tu Buyer Persona?",
          "Describe brevemente al consumidor.",
        )}

        {field(
          "consumerNeed",
          "¿Qué necesidad vas a atender?",
          "Utiliza un hallazgo de la Semana 3.",
        )}

        <div className="formats5-grid">
          {field(
            "centralIdea",
            "Idea central",
            "Ej. Aprende a preparar café en casa.",
          )}
          {field(
            "objective",
            "Objetivo de comunicación",
            "Ej. Educar a consumidores principiantes.",
          )}
        </div>

        <div className="formats5-grid">
          <label className="formats5-field">
            <span>Tipo de contenido</span>
            <select
              value={data.contentType}
              onChange={(event) => setField("contentType", event.target.value)}
            >
              <option>Educativo</option>
              <option>Informativo</option>
              <option>Emocional</option>
              <option>Entretenimiento</option>
              <option>Promocional</option>
            </select>
          </label>

          <label className="formats5-field">
            <span>Plataforma principal</span>
            <select
              value={data.platform}
              onChange={(event) => setField("platform", event.target.value)}
            >
              <option>Instagram</option>
              <option>Facebook</option>
              <option>TikTok</option>
              <option>Otra</option>
            </select>
          </label>
        </div>

        {field(
          "brandVoice",
          "¿Qué voz y tono definiste en la Semana 4?",
          "Ej. Cercano, claro y optimista.",
        )}

        {done(0)}
      </section>

      {/* ETAPA 2 */}
      <section className="formats5-panel">
        <StepHeading
          index={1}
          description="Diseña un carrusel terminado de cinco láminas. Cada lámina debe aportar algo diferente."
        />

        {field(
          "carouselTitle",
          "Título general del carrusel",
          "Ej. Tu primera taza de café artesanal.",
          false,
        )}

        <div className="formats5-carousel-editor">
          {data.carouselSlides.map((slide, index) => (
            <div className="formats5-slide-card" key={index}>
              <div className="formats5-slide-top">
                <span>LÁMINA {String(index + 1).padStart(2, "0")}</span>
                <small>
                  {
                    ["Portada", "Problema", "Consejo", "Aplicación", "Cierre"][
                      index
                    ]
                  }
                </small>
              </div>

              <Field
                label="Título de la lámina"
                value={slide.headline}
                onChange={(value) =>
                  setArrayField("carouselSlides", index, "headline", value)
                }
                placeholder="Título breve"
                multiline={false}
              />

              <Field
                label="Mensaje"
                value={slide.message}
                onChange={(value) =>
                  setArrayField("carouselSlides", index, "message", value)
                }
                placeholder="¿Qué aporta esta lámina?"
              />

              <Field
                label="Descripción visual"
                value={slide.visual}
                onChange={(value) =>
                  setArrayField("carouselSlides", index, "visual", value)
                }
                placeholder="Imagen, composición o elementos gráficos."
              />
            </div>
          ))}
        </div>

        {field(
          "carouselCaption",
          "Texto de acompañamiento del carrusel",
          "Escribe el copy para la publicación.",
        )}

        {field(
          "carouselCta",
          "CTA del carrusel",
          "Ej. Guarda estos consejos para tu próxima taza.",
          false,
        )}

        {field(
          "carouselLink",
          "Enlace al carrusel terminado",
          "Pega el enlace de Canva, Slides o Drive.",
          false,
        )}

        <div className="formats5-hint">
          El carrusel debe estar diseñado, no solamente escrito. Puedes utilizar
          herramientas gratuitas.
        </div>

        {done(1)}
      </section>

      {/* ETAPA 3 */}
      <section className="formats5-panel">
        <StepHeading
          index={2}
          description="Adapta la misma idea a una historia vertical con una interacción concreta."
        />

        <div className="formats5-story-layout">
          <div>
            {field(
              "storyTitle",
              "Título de la historia",
              "Ej. ¿Cómo preparas tu café?",
              false,
            )}

            {field(
              "storyMessage",
              "Mensaje breve",
              "Un mensaje que se comprenda rápidamente.",
            )}

            {field(
              "storyVisual",
              "Descripción visual",
              "Fotografía, fondo, composición y elementos.",
            )}

            <label className="formats5-field">
              <span>Tipo de interacción</span>
              <select
                value={data.storyInteraction}
                onChange={(event) =>
                  setField("storyInteraction", event.target.value)
                }
              >
                <option>Encuesta</option>
                <option>Pregunta abierta</option>
                <option>Cuestionario</option>
                <option>Deslizador</option>
                <option>Enlace</option>
              </select>
            </label>

            {field(
              "storyQuestion",
              "Pregunta o instrucción",
              "¿Qué quieres preguntar al consumidor?",
            )}

            {data.storyInteraction === "Encuesta" && (
              <div className="formats5-grid">
                {field("storyOptionA", "Opción A", "Ej. Café frío", false)}
                {field("storyOptionB", "Opción B", "Ej. Café caliente", false)}
              </div>
            )}

            {field(
              "storyCta",
              "CTA de la historia",
              "Ej. Consulta nuestro carrusel.",
            )}

            {field(
              "storyLink",
              "Enlace a la historia terminada",
              "Pega el enlace del diseño.",
              false,
            )}
          </div>

          <div className="formats5-story-preview">
            <span className="formats5-preview-label">VISTA PREVIA · 9:16</span>
            <div className="formats5-story-content">
              <h4>{data.storyTitle || "Tu título aquí"}</h4>
              <p>
                {data.storyMessage ||
                  "El mensaje principal de tu historia aparecerá aquí."}
              </p>
              <div className="formats5-story-sticker">
                <strong>{data.storyQuestion || "Tu interacción"}</strong>
                {data.storyInteraction === "Encuesta" ? (
                  <>
                    <span>{data.storyOptionA || "Opción A"}</span>
                    <span>{data.storyOptionB || "Opción B"}</span>
                  </>
                ) : (
                  <span>{data.storyInteraction}</span>
                )}
              </div>
              <small>{data.storyCta || "Tu CTA"}</small>
            </div>
          </div>
        </div>

        <div className="formats5-hint">
          Esta vista previa es una maqueta de texto. La historia visual
          definitiva se diseña en tu editor.
        </div>

        {done(2)}
      </section>

      {/* ETAPA 4 */}
      <section className="formats5-panel">
        <StepHeading
          index={3}
          description="Planifica un Reel de 15 a 30 segundos. Todavía no necesitas grabarlo."
        />

        <label className="formats5-field">
          <span>Duración prevista</span>
          <select
            value={data.reelDuration}
            onChange={(event) => setField("reelDuration", event.target.value)}
          >
            <option value="15">15 segundos</option>
            <option value="20">20 segundos</option>
            <option value="25">25 segundos</option>
            <option value="30">30 segundos</option>
          </select>
        </label>

        <div className="formats5-reel-scenes">
          {data.reelScenes.map((scene, index) => (
            <div className="formats5-scene" key={index}>
              <h4>ESCENA {index + 1}</h4>

              <Field
                label="Tiempo"
                value={scene.time}
                onChange={(value) =>
                  setArrayField("reelScenes", index, "time", value)
                }
                placeholder="Ej. 0–3 s"
                multiline={false}
              />

              <Field
                label="Imagen o acción"
                value={scene.visual}
                onChange={(value) =>
                  setArrayField("reelScenes", index, "visual", value)
                }
                placeholder="¿Qué se verá en pantalla?"
              />

              <Field
                label="Texto o mensaje"
                value={scene.message}
                onChange={(value) =>
                  setArrayField("reelScenes", index, "message", value)
                }
                placeholder="¿Qué leerá o escuchará el espectador?"
              />

              <Field
                label="Audio o sonido"
                value={scene.audio}
                onChange={(value) =>
                  setArrayField("reelScenes", index, "audio", value)
                }
                placeholder="Voz, música o sonido ambiental."
              />
            </div>
          ))}
        </div>

        {field(
          "reelCta",
          "CTA final del Reel",
          "Ej. Guarda esta receta.",
          false,
        )}

        {done(3)}
      </section>

      {/* ETAPA 5 */}
      <section className="formats5-panel">
        <StepHeading
          index={4}
          description="Explica por qué cada formato aporta algo distinto a tu estrategia."
        />

        {field(
          "carouselReason",
          "¿Por qué elegiste el carrusel?",
          "Explica qué aporta su secuencia.",
        )}

        {field(
          "storyReason",
          "¿Por qué elegiste una historia?",
          "Explica qué interacción buscas.",
        )}

        {field(
          "reelReason",
          "¿Por qué esta idea también funcionaría como Reel?",
          "Explica qué aporta el movimiento.",
        )}

        {field(
          "coherence",
          "¿Cómo mantienes la voz de marca?",
          "Relaciona tus piezas con la Semana 4.",
        )}

        {field(
          "expectedResponse",
          "¿Qué respuesta esperas del consumidor?",
          "Ej. Guardar, responder, visitar o consultar.",
        )}

        {done(4)}
      </section>

      {/* ETAPA 6 */}
      <section className="formats5-panel">
        <StepHeading
          index={5}
          description="Prepara las evidencias y defiende las decisiones de tu equipo."
        />

        {field(
          "presentation",
          "¿Cómo presentarás las tres piezas?",
          "Explica brevemente qué mostrará el equipo.",
        )}

        {field(
          "reflection",
          "¿Qué fue lo más difícil de adaptar?",
          "Reflexiona sobre el proceso.",
        )}

        {field(
          "deliveryLink",
          "Enlace a la entrega",
          "Carpeta con carrusel, historia y guion.",
          false,
        )}

        <div className="formats5-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Mensaje central y justificación", 5],
            ["Carrusel de cinco láminas", 15],
            ["Historia digital e interacción", 10],
            ["Guion de Reel", 10],
            ["Coherencia con Buyer Persona y tono", 5],
            ["Argumentación y presentación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points}</strong>
            </div>
          ))}
        </div>

        {done(5)}
      </section>

      <footer className="formats5-footer">
        <h3>
          {completedCount === 6
            ? "Laboratorio completado"
            : `${completedCount} de 6 etapas completadas`}
        </h3>
        <p>
          Tus respuestas se guardan automáticamente en este navegador. Entrega
          las piezas visuales y el guion en Moodle.
        </p>
      </footer>
    </div>
  );
}
