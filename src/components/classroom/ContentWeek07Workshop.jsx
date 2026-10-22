import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana07.css";

const STEPS = [
  { title: "Benchmarking creativo", minutes: 10 },
  { title: "Historia y emoción", minutes: 10 },
  { title: "Storyboard audiovisual", minutes: 10 },
  { title: "Grabación y edición", minutes: 20 },
  { title: "Revisión técnica", minutes: 5 },
  { title: "Entrega y presentación", minutes: 5 },
];

const createBrand = () => ({
  name: "",
  link: "",
  audience: "",
  story: "",
  emotion: "",
  resources: "",
  learning: "",
});

const createShot = () => ({
  time: "",
  type: "Primer plano",
  action: "",
  message: "",
  audio: "",
});

function initialData() {
  return {
    team: "",
    brand: "",
    buyerPersona: "",
    campaignConcept: "",
    brandVoice: "",
    benchmarks: Array.from({ length: 3 }, createBrand),
    emotion: "Tranquilidad",
    character: "",
    initialSituation: "",
    transformation: "",
    ending: "",
    story: "",
    centralMessage: "",
    shots: Array.from({ length: 3 }, createShot),
    format: "9:16",
    recordingResources: "",
    editingApp: "",
    videoDuration: "",
    videoLink: "",
    videoFile: "",
    musicLicense: "",
    ownMaterial: false,
    reviewDuration: false,
    reviewVertical: false,
    reviewMessage: false,
    reviewQuality: false,
    reviewRights: false,
    narrativeReason: "",
    improvements: "",
    presentation: "",
    deliveryLink: "",
    completed: Array(6).fill(false),
  };
}

function getKey(lessonId, studentName) {
  return `aula:contenido:semana07:${lessonId}:${String(
    studentName || "sin-nombre",
  )
    .trim()
    .toLowerCase()}`;
}

function loadSaved(key) {
  const defaults = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return defaults;

    return {
      ...defaults,
      ...saved,
      benchmarks: defaults.benchmarks.map((item, index) => ({
        ...item,
        ...(saved.benchmarks?.[index] || {}),
      })),
      shots:
        Array.isArray(saved.shots) && saved.shots.length
          ? saved.shots.slice(0, 5).map((shot) => ({
              ...createShot(),
              ...shot,
            }))
          : defaults.shots,
      completed: defaults.completed.map((_, index) =>
        Boolean(saved.completed?.[index]),
      ),
    };
  } catch {
    return defaults;
  }
}

function Field({ label, value, onChange, placeholder = "", multiline = true }) {
  return (
    <label className="story7-field">
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

function StageHeading({ index, description }) {
  return (
    <div className="story7-stage-heading">
      <span className="story7-stage-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <span className="story7-stage-time">
          {STEPS[index].minutes} MINUTOS
        </span>
        <h3>{STEPS[index].title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function ContentWeek07Workshop({
  lessonId = "contenido-semana-7",
  studentName = "",
}) {
  const key = getKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: loadSaved(key),
  }));

  const data = stored.key === key ? stored.data : loadSaved(key);

  function update(changes) {
    const next = { ...data, ...changes };

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // El formulario continúa funcionando.
    }

    setStored({ key, data: next });
  }

  function setField(name, value) {
    update({ [name]: value });
  }

  function updateBenchmark(index, field, value) {
    const benchmarks = data.benchmarks.map((item) => ({ ...item }));
    benchmarks[index][field] = value;
    update({ benchmarks });
  }

  function updateShot(index, field, value) {
    const shots = data.shots.map((item) => ({ ...item }));
    shots[index][field] = value;
    update({ shots });
  }

  function addShot() {
    if (data.shots.length >= 5) return;
    update({ shots: [...data.shots, createShot()] });
  }

  function removeShot(index) {
    if (data.shots.length <= 3) return;
    update({
      shots: data.shots.filter((_, i) => i !== index),
    });
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
    <label className="story7-done">
      <input
        type="checkbox"
        checked={data.completed[index]}
        onChange={(event) => markDone(index, event.target.checked)}
      />
      Marcar etapa como completada
    </label>
  );

  const checks = [
    ["reviewDuration", "El archivo exportado dura exactamente 7 segundos."],
    ["reviewVertical", "El video tiene formato vertical 9:16."],
    ["reviewMessage", "Comunica una historia y un mensaje comprensibles."],
    ["reviewQuality", "La imagen, los cortes y el sonido son adecuados."],
    ["reviewRights", "El material y la música tienen permisos de uso."],
  ];

  return (
    <div className="story7">
      <header className="story7-hero">
        <span className="story7-eyebrow">
          AULA DIGITAL · LABORATORIO 07 · 60 MINUTOS
        </span>
        <h2>Tu marca en 7 segundos.</h2>
        <p>
          Investiga referentes, construye una historia, planifica tus planos y
          produce tu primer microvideo publicitario.
        </p>

        <div className="story7-progress-label">
          <strong>Progreso del laboratorio</strong>
          <span>
            {completedCount} de 6 etapas · {progress}%
          </span>
        </div>

        <div
          className="story7-progress"
          role="progressbar"
          aria-label="Progreso del laboratorio"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section className="story7-panel">
        <h3>Tu marca y tu campaña</h3>
        <p className="story7-description">
          Recupera el concepto creativo de la Semana 6 y la voz de marca de la
          Semana 4.
        </p>

        <div className="story7-grid">
          {field("team", "Equipo", "Equipo 01", false)}
          {field("brand", "Marca de café", "Nombre de tu marca", false)}
        </div>

        {field("buyerPersona", "Buyer Persona", "¿A quién queremos llegar?")}

        {field(
          "campaignConcept",
          "Concepto de campaña de la Semana 6",
          "Ej. Cada taza tiene una historia.",
        )}

        {field(
          "brandVoice",
          "Voz y tono de marca",
          "Ej. Cercano, auténtico y optimista.",
        )}
      </section>

      {/* ETAPA 1 */}
      <section className="story7-panel">
        <StageHeading
          index={0}
          description="Analiza tres marcas de café reales. Observa sus recursos creativos sin copiar sus piezas."
        />

        <div className="story7-benchmarks">
          {data.benchmarks.map((item, index) => (
            <div className="story7-reference" key={index}>
              <div className="story7-card-heading">
                <strong>REFERENTE {index + 1}</strong>
                <span>BENCHMARKING</span>
              </div>

              <Field
                label="Marca analizada"
                value={item.name}
                onChange={(value) => updateBenchmark(index, "name", value)}
                placeholder="Nombre de la marca"
                multiline={false}
              />

              <Field
                label="Enlace a la publicación o campaña"
                value={item.link}
                onChange={(value) => updateBenchmark(index, "link", value)}
                placeholder="https://..."
                multiline={false}
              />

              <Field
                label="¿A qué público se dirige?"
                value={item.audience}
                onChange={(value) => updateBenchmark(index, "audience", value)}
              />

              <Field
                label="¿Qué historia comunica?"
                value={item.story}
                onChange={(value) => updateBenchmark(index, "story", value)}
              />

              <Field
                label="¿Qué emoción transmite?"
                value={item.emotion}
                onChange={(value) => updateBenchmark(index, "emotion", value)}
              />

              <Field
                label="¿Qué recursos visuales utiliza?"
                value={item.resources}
                onChange={(value) => updateBenchmark(index, "resources", value)}
              />

              <Field
                label="¿Qué podemos aprender sin copiar?"
                value={item.learning}
                onChange={(value) => updateBenchmark(index, "learning", value)}
              />
            </div>
          ))}
        </div>

        <div className="story7-hint">
          Utiliza publicaciones o campañas que puedas consultar. Registra sus
          enlaces y diferencia los hechos observados de tus interpretaciones.
        </div>

        {done(0)}
      </section>

      {/* ETAPA 2 */}
      <section className="story7-panel">
        <StageHeading
          index={1}
          description="Construye una historia breve con inicio, transformación y resultado."
        />

        <label className="story7-field">
          <span>Emoción principal</span>
          <select
            value={data.emotion}
            onChange={(event) => setField("emotion", event.target.value)}
          >
            <option>Tranquilidad</option>
            <option>Energía</option>
            <option>Nostalgia</option>
            <option>Curiosidad</option>
            <option>Pertenencia</option>
            <option>Alegría</option>
            <option>Otra</option>
          </select>
        </label>

        {field(
          "character",
          "¿Quién protagoniza la historia?",
          "Describe al personaje y su relación con el consumidor.",
        )}

        <div className="story7-grid">
          {field(
            "initialSituation",
            "01 · Situación inicial",
            "¿Qué está ocurriendo al inicio?",
          )}
          {field(
            "transformation",
            "02 · Cambio o acción",
            "¿Qué sucede para transformar el momento?",
          )}
        </div>

        {field("ending", "03 · Resultado", "¿Cómo termina la historia?")}

        {field(
          "story",
          "Historia completa en tres frases",
          "Resume inicio, cambio y resultado.",
        )}

        {field(
          "centralMessage",
          "Mensaje que debe recordar el espectador",
          "Una sola idea central.",
        )}

        <div className="story7-narrative">
          <div>
            <span>01 · INICIO</span>
            <p>{data.initialSituation || "Presenta la situación"}</p>
          </div>
          <div>
            <span>02 · CAMBIO</span>
            <p>{data.transformation || "Muestra la acción"}</p>
          </div>
          <div>
            <span>03 · RESULTADO</span>
            <p>{data.ending || "Cierra la historia"}</p>
          </div>
        </div>

        {done(1)}
      </section>

      {/* ETAPA 3 */}
      <section className="story7-panel">
        <StageHeading
          index={2}
          description="Planifica entre tres y cinco planos. La suma de sus duraciones debe ser de siete segundos."
        />

        <div className="story7-storyboard">
          {data.shots.map((shot, index) => (
            <div className="story7-shot" key={index}>
              <div className="story7-card-heading">
                <strong>PLANO {index + 1}</strong>
                {data.shots.length > 3 && (
                  <button
                    type="button"
                    className="story7-remove"
                    onClick={() => removeShot(index)}
                  >
                    Quitar
                  </button>
                )}
              </div>

              <div className="story7-grid">
                <Field
                  label="Tiempo de inicio y fin"
                  value={shot.time}
                  onChange={(value) => updateShot(index, "time", value)}
                  placeholder="Ej. 0–2 s"
                  multiline={false}
                />

                <label className="story7-field">
                  <span>Tipo de plano</span>
                  <select
                    value={shot.type}
                    onChange={(event) =>
                      updateShot(index, "type", event.target.value)
                    }
                  >
                    <option>Plano general</option>
                    <option>Plano medio</option>
                    <option>Primer plano</option>
                    <option>Plano detalle</option>
                    <option>Otro</option>
                  </select>
                </label>
              </div>

              <Field
                label="¿Qué veremos?"
                value={shot.action}
                onChange={(value) => updateShot(index, "action", value)}
                placeholder="Acción, personaje, encuadre y movimiento."
              />

              <Field
                label="Mensaje o función narrativa"
                value={shot.message}
                onChange={(value) => updateShot(index, "message", value)}
                placeholder="¿Qué comunica este plano?"
              />

              <Field
                label="Audio o sonido"
                value={shot.audio}
                onChange={(value) => updateShot(index, "audio", value)}
                placeholder="Ambiente, música, voz o silencio."
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="story7-button"
          onClick={addShot}
          disabled={data.shots.length >= 5}
        >
          + Agregar plano
        </button>

        <div className="story7-hint">
          Distribución sugerida para tres planos: 0–2 s, 2–5 s y 5–7 s.
          Comprueba que no existan espacios ni solapamientos.
        </div>

        {done(2)}
      </section>

      {/* ETAPA 4 */}
      <section className="story7-panel">
        <StageHeading
          index={3}
          description="Graba o reúne material autorizado, edita el video y expórtalo en MP4."
        />

        <div className="story7-grid">
          <label className="story7-field">
            <span>Orientación del video</span>
            <select
              value={data.format}
              onChange={(event) => setField("format", event.target.value)}
            >
              <option>9:16</option>
              <option>16:9</option>
              <option>1:1</option>
            </select>
          </label>

          {field(
            "editingApp",
            "Editor utilizado",
            "Ej. Editor del celular",
            false,
          )}
        </div>

        {field(
          "recordingResources",
          "Material y recursos de producción",
          "Celular, iluminación, taza, empaque prototipo, etc.",
        )}

        {field(
          "musicLicense",
          "Origen y permiso de uso del audio",
          "Ej. Audio original o música autorizada.",
        )}

        <label className="story7-done">
          <input
            type="checkbox"
            checked={data.ownMaterial}
            onChange={(event) => setField("ownMaterial", event.target.checked)}
          />
          El equipo ha identificado el origen de sus materiales.
        </label>

        <div className="story7-grid">
          {field(
            "videoDuration",
            "Duración comprobada del MP4",
            "Ej. 7.00 segundos",
            false,
          )}
          {field(
            "videoFile",
            "Nombre del archivo MP4",
            "marca-video-07.mp4",
            false,
          )}
        </div>

        {field(
          "videoLink",
          "Enlace al video terminado",
          "Pega el enlace a Drive o al archivo compartido.",
          false,
        )}

        <div className="story7-hint">
          El formulario no graba ni edita videos. El MP4 debe producirse con una
          herramienta externa. Comprueba la duración real del archivo exportado.
        </div>

        {done(3)}
      </section>

      {/* ETAPA 5 */}
      <section className="story7-panel">
        <StageHeading
          index={4}
          description="Revisa las condiciones técnicas y narrativas antes de presentar."
        />

        <div className="story7-checklist">
          {checks.map(([name, label]) => (
            <label key={name}>
              <input
                type="checkbox"
                checked={data[name]}
                onChange={(event) => setField(name, event.target.checked)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        {field(
          "narrativeReason",
          "Justificación de tus decisiones",
          "¿Por qué elegiste esta historia, emoción y estos planos?",
        )}

        {field(
          "improvements",
          "¿Qué mejorarías en una segunda versión?",
          "Identifica al menos una mejora concreta.",
        )}

        {done(4)}
      </section>

      {/* ETAPA 6 */}
      <section className="story7-panel">
        <StageHeading
          index={5}
          description="Organiza los entregables y prepara la defensa de tu microvideo."
        />

        {field(
          "presentation",
          "¿Cómo defenderá el equipo su video?",
          "Explica historia, emoción, referentes y planos.",
        )}

        {field(
          "deliveryLink",
          "Enlace a la carpeta de evidencias",
          "Benchmarking, historia, storyboard y MP4.",
          false,
        )}

        <div className="story7-rubric">
          <h4>Rúbrica del laboratorio · 50 puntos</h4>
          {[
            ["Benchmarking de tres marcas", 10],
            ["Historia y coherencia con la marca", 10],
            ["Storyboard y planificación", 10],
            ["Microvideo de siete segundos", 15],
            ["Presentación y justificación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points}</strong>
            </div>
          ))}
        </div>

        {done(5)}
      </section>

      <footer className="story7-footer">
        <h3>
          {completedCount === 6
            ? "Laboratorio completado"
            : `${completedCount} de 6 etapas completadas`}
        </h3>

        <p>
          Tus respuestas se guardan automáticamente. Descarga el PDF del
          laboratorio y entrega el video MP4 junto con las evidencias en Moodle.
        </p>

        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "contenido",
            number: 7,
            title: "No cuentes qué vendes. Cuenta una historia que importe.",
          }}
          title="Laboratorio 07: Storytelling y microvideo de 7 segundos"
          answers={{
            "Nombre del equipo": data.team,
            "Marca de café": data.brand,
            "Buyer Persona": data.buyerPersona,
            "Concepto de campaña de la Semana 6": data.campaignConcept,
            "Voz y tono de marca": data.brandVoice,

            ...Object.fromEntries(
              data.benchmarks.flatMap((item, index) => [
                [`Benchmarking ${index + 1} - Marca`, item.name],
                [`Benchmarking ${index + 1} - Enlace`, item.link],
                [`Benchmarking ${index + 1} - Público`, item.audience],
                [`Benchmarking ${index + 1} - Historia`, item.story],
                [`Benchmarking ${index + 1} - Emoción`, item.emotion],
                [
                  `Benchmarking ${index + 1} - Recursos visuales`,
                  item.resources,
                ],
                [`Benchmarking ${index + 1} - Aprendizaje`, item.learning],
              ]),
            ),

            "Emoción principal": data.emotion,
            "Personaje protagonista": data.character,
            "Historia - Situación inicial": data.initialSituation,
            "Historia - Transformación": data.transformation,
            "Historia - Resultado": data.ending,
            "Historia completa": data.story,
            "Mensaje central": data.centralMessage,

            ...Object.fromEntries(
              data.shots.flatMap((shot, index) => [
                [`Storyboard - Plano ${index + 1} - Tiempo`, shot.time],
                [`Storyboard - Plano ${index + 1} - Tipo`, shot.type],
                [`Storyboard - Plano ${index + 1} - Acción`, shot.action],
                [`Storyboard - Plano ${index + 1} - Mensaje`, shot.message],
                [`Storyboard - Plano ${index + 1} - Audio`, shot.audio],
              ]),
            ),

            "Formato del video": data.format,
            "Editor utilizado": data.editingApp,
            "Recursos de producción": data.recordingResources,
            "Origen y permiso de uso del audio": data.musicLicense,
            "Origen de los materiales identificado": data.ownMaterial
              ? "Sí"
              : "No",
            "Duración comprobada del video": data.videoDuration,
            "Nombre del archivo MP4": data.videoFile,
            "Enlace al video terminado": data.videoLink,

            "Revisión - Duración exacta": data.reviewDuration ? "Sí" : "No",
            "Revisión - Formato vertical": data.reviewVertical ? "Sí" : "No",
            "Revisión - Historia comprensible": data.reviewMessage
              ? "Sí"
              : "No",
            "Revisión - Calidad audiovisual": data.reviewQuality ? "Sí" : "No",
            "Revisión - Permisos de uso": data.reviewRights ? "Sí" : "No",

            "Justificación de decisiones narrativas": data.narrativeReason,
            "Mejoras propuestas": data.improvements,
            "Presentación del equipo": data.presentation,
            "Enlace a la carpeta de evidencias": data.deliveryLink,

            "Etapas completadas": `${completedCount} de 6`,
          }}
        />
      </footer>
    </div>
  );
}
