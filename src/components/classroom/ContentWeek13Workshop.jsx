import { useState } from "react";
import "../../styles/contenidoSemana13.css";

const TASKS = [
  ["Seleccionar la idea central", 5],
  ["Escribir guion y adaptaciones", 10],
  ["Producir el Reel", 20],
  ["Diseñar la historia", 10],
  ["Diseñar el post", 10],
  ["Revisar y exportar", 5],
];

const INITIAL = () => ({
  team: "",
  brand: "",
  campaign: "",
  idea: "",
  audience: "",
  identity: "",
  reel: {
    stage: "TOFU",
    hook: "",
    development: "",
    ending: "",
    shot1: "",
    shot2: "",
    shot3: "",
    shot4: "",
    copy: "",
    cta: "",
    link: "",
    duration: "15",
  },
  story: {
    stage: "MOFU",
    question: "",
    optionA: "",
    optionB: "",
    composition: "",
    copy: "",
    cta: "",
    link: "",
  },
  post: {
    stage: "BOFU",
    headline: "",
    composition: "",
    benefit: "",
    copy: "",
    cta: "",
    link: "",
  },
  comparison: "",
  resources: "",
  improvements: "",
  folder: "",
  done: Array(6).fill(false),
});

function loadSaved(key) {
  const base = INITIAL();

  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");
    if (!raw || typeof raw !== "object") return base;

    return {
      ...base,
      ...raw,
      reel: { ...base.reel, ...(raw.reel || {}) },
      story: { ...base.story, ...(raw.story || {}) },
      post: { ...base.post, ...(raw.post || {}) },
      done: base.done.map((_, i) => Boolean(raw.done?.[i])),
    };
  } catch {
    return base;
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
}) {
  return (
    <label className="micro13-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function StageSelect({ value, onChange }) {
  return (
    <label className="micro13-field">
      <span>Etapa del embudo</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="TOFU">TOFU · Descubrimiento</option>
        <option value="MOFU">MOFU · Consideración</option>
        <option value="BOFU">BOFU · Decisión</option>
      </select>
    </label>
  );
}

function Step({ index, checked, onCheck, children }) {
  const [title, minutes] = TASKS[index];

  return (
    <section className="micro13-panel">
      <div className="micro13-stephead">
        <h3>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {title}
        </h3>
        <small>{minutes} min</small>
      </div>

      {children}

      <label className="micro13-complete">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheck(e.target.checked)}
        />
        Etapa completada
      </label>
    </section>
  );
}

export default function ContentWeek13Workshop({
  lessonId = "contenido-semana-13",
  studentName = "",
}) {
  const key = `aula:semana13:${lessonId}:${studentName || "anonimo"}`;

  const [session, setSession] = useState(() => ({
    key,
    data: loadSaved(key),
  }));
  const [notice, setNotice] = useState("");

  const data = session.key === key ? session.data : loadSaved(key);

  function save(next) {
    setSession({ key, data: next });
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setNotice("Avance guardado en este navegador.");
    } catch {
      setNotice("No fue posible guardar el avance.");
    }
  }

  function setField(field, value) {
    save({ ...data, [field]: value });
  }

  function setProduct(product, field, value) {
    save({
      ...data,
      [product]: {
        ...data[product],
        [field]: value,
      },
    });
  }

  function markDone(index, value) {
    setField(
      "done",
      data.done.map((item, i) => (i === index ? value : item)),
    );
  }

  const completed = data.done.filter(Boolean).length;
  const productsReady = ["reel", "story", "post"].filter((product) =>
    data[product].link.trim(),
  ).length;

  function downloadReport() {
    const lines = [
      "LABORATORIO 13 — UNA IDEA, TRES FORMATOS",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Idea: ${data.idea}`,
      `Público: ${data.audience}`,
      `Identidad: ${data.identity}`,
      "",
      "REEL — 9:16 — 10 A 15 SEGUNDOS",
      `Etapa: ${data.reel.stage}`,
      `Duración: ${data.reel.duration}`,
      `Gancho: ${data.reel.hook}`,
      `Desarrollo: ${data.reel.development}`,
      `Cierre: ${data.reel.ending}`,
      `Plano 1: ${data.reel.shot1}`,
      `Plano 2: ${data.reel.shot2}`,
      `Plano 3: ${data.reel.shot3}`,
      `Plano 4: ${data.reel.shot4}`,
      `Copy: ${data.reel.copy}`,
      `CTA: ${data.reel.cta}`,
      `Archivo: ${data.reel.link}`,
      "",
      "HISTORIA — 1080 X 1920",
      `Etapa: ${data.story.stage}`,
      `Pregunta: ${data.story.question}`,
      `Opción A: ${data.story.optionA}`,
      `Opción B: ${data.story.optionB}`,
      `Composición: ${data.story.composition}`,
      `Copy: ${data.story.copy}`,
      `CTA: ${data.story.cta}`,
      `Archivo: ${data.story.link}`,
      "",
      "POST — 1080 X 1350",
      `Etapa: ${data.post.stage}`,
      `Titular: ${data.post.headline}`,
      `Beneficio: ${data.post.benefit}`,
      `Composición: ${data.post.composition}`,
      `Copy: ${data.post.copy}`,
      `CTA: ${data.post.cta}`,
      `Archivo: ${data.post.link}`,
      "",
      "JUSTIFICACIÓN",
      `Adaptación: ${data.comparison}`,
      `Recursos reutilizados: ${data.resources}`,
      `Mejoras propuestas: ${data.improvements}`,
      `Carpeta de entrega: ${data.folder}`,
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "laboratorio-semana13.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="micro13">
      <header className="micro13-hero">
        <span>LABORATORIO 13 · 60 MINUTOS</span>
        <h2>Una idea, tres productos digitales</h2>
        <p>
          Produce un Reel, una historia interactiva y un post para tu marca de
          café. Mantén el concepto, pero adapta el lenguaje de cada formato.
        </p>

        <div className="micro13-progress">
          <strong>{completed}/6 etapas completadas</strong>
          <div>
            <span style={{ width: `${(completed / 6) * 100}%` }} />
          </div>
        </div>
      </header>

      <section className="micro13-panel">
        <h3>Identificación del equipo</h3>
        <div className="micro13-grid">
          <Field
            label="Equipo"
            value={data.team}
            onChange={(v) => setField("team", v)}
          />
          <Field
            label="Marca de café"
            value={data.brand}
            onChange={(v) => setField("brand", v)}
          />
        </div>
        <Field
          label="Campaña"
          value={data.campaign}
          onChange={(v) => setField("campaign", v)}
        />
      </section>

      <Step index={0} checked={data.done[0]} onCheck={(v) => markDone(0, v)}>
        <p>
          Elige una idea de tu campaña que pueda expresarse con movimiento,
          interacción e imagen.
        </p>

        <Field
          label="Idea central"
          value={data.idea}
          onChange={(v) => setField("idea", v)}
          placeholder="Ej. Tu pausa merece un buen café"
          multiline
        />

        <Field
          label="Público al que te diriges"
          value={data.audience}
          onChange={(v) => setField("audience", v)}
        />

        <Field
          label="Elementos de identidad que mantendrás"
          value={data.identity}
          onChange={(v) => setField("identity", v)}
          placeholder="Paleta, tipografía, tono y marca"
        />
      </Step>

      <Step index={1} checked={data.done[1]} onCheck={(v) => markDone(1, v)}>
        <p>
          Define las tres adaptaciones. Escribe el guion del video y decide cómo
          invitarás a participar en la historia y qué destacarás en el post.
        </p>

        <div className="micro13-format-grid">
          <div className="micro13-format">
            <strong>REEL · 9:16</strong>
            <Field
              label="Gancho (0–3 s)"
              value={data.reel.hook}
              onChange={(v) => setProduct("reel", "hook", v)}
              placeholder="¿Necesitas una pausa?"
            />
            <Field
              label="Desarrollo (3–11 s)"
              value={data.reel.development}
              onChange={(v) => setProduct("reel", "development", v)}
            />
            <Field
              label="Cierre (11–15 s)"
              value={data.reel.ending}
              onChange={(v) => setProduct("reel", "ending", v)}
            />
          </div>

          <div className="micro13-format">
            <strong>HISTORIA · 9:16</strong>
            <Field
              label="Pregunta para la encuesta"
              value={data.story.question}
              onChange={(v) => setProduct("story", "question", v)}
              placeholder="¿Cómo prefieres tu café?"
            />
            <Field
              label="Opción A"
              value={data.story.optionA}
              onChange={(v) => setProduct("story", "optionA", v)}
              placeholder="Intenso"
            />
            <Field
              label="Opción B"
              value={data.story.optionB}
              onChange={(v) => setProduct("story", "optionB", v)}
              placeholder="Suave"
            />
          </div>

          <div className="micro13-format">
            <strong>POST · 4:5</strong>
            <Field
              label="Titular principal"
              value={data.post.headline}
              onChange={(v) => setProduct("post", "headline", v)}
            />
            <Field
              label="Beneficio que destacarás"
              value={data.post.benefit}
              onChange={(v) => setProduct("post", "benefit", v)}
              multiline
            />
          </div>
        </div>
      </Step>

      <Step index={2} checked={data.done[2]} onCheck={(v) => markDone(2, v)}>
        <div className="micro13-producthead">
          <div>
            <span>PRODUCTO 01</span>
            <h4>Reel vertical</h4>
            <p>MP4 · 9:16 · 10 a 15 segundos</p>
          </div>
          <span className="micro13-tag">20 MIN</span>
        </div>

        <StageSelect
          value={data.reel.stage}
          onChange={(v) => setProduct("reel", "stage", v)}
        />

        <label className="micro13-field">
          <span>Duración planificada</span>
          <select
            value={data.reel.duration}
            onChange={(e) => setProduct("reel", "duration", e.target.value)}
          >
            {[10, 11, 12, 13, 14, 15].map((n) => (
              <option value={String(n)} key={n}>
                {n} segundos
              </option>
            ))}
          </select>
        </label>

        <div className="micro13-storyboard">
          {[
            ["shot1", "Plano 1 · 0–3 s"],
            ["shot2", "Plano 2 · 3–8 s"],
            ["shot3", "Plano 3 · 8–12 s"],
            ["shot4", "Plano 4 · 12–15 s"],
          ].map(([field, label]) => (
            <div key={field}>
              <div className="micro13-shot-icon">
                <span>{label}</span>
              </div>
              <Field
                label="Acción o imagen"
                value={data.reel[field]}
                onChange={(v) => setProduct("reel", field, v)}
              />
            </div>
          ))}
        </div>

        <div className="micro13-grid">
          <Field
            label="Copy del Reel"
            value={data.reel.copy}
            onChange={(v) => setProduct("reel", "copy", v)}
            multiline
          />
          <Field
            label="CTA del Reel"
            value={data.reel.cta}
            onChange={(v) => setProduct("reel", "cta", v)}
          />
        </div>

        <Field
          label="Enlace al video MP4 terminado"
          value={data.reel.link}
          onChange={(v) => setProduct("reel", "link", v)}
          placeholder="Pega el enlace a tu archivo"
        />

        <p className="micro13-hint">
          Graba o edita en tu teléfono, CapCut u otro editor. El video terminado
          se entrega como MP4.
        </p>
      </Step>

      <Step index={3} checked={data.done[3]} onCheck={(v) => markDone(3, v)}>
        <div className="micro13-producthead">
          <div>
            <span>PRODUCTO 02</span>
            <h4>Historia interactiva</h4>
            <p>1080 × 1920 px · 9:16</p>
          </div>
          <span className="micro13-tag">10 MIN</span>
        </div>

        <StageSelect
          value={data.story.stage}
          onChange={(v) => setProduct("story", "stage", v)}
        />

        <div className="micro13-grid">
          <div>
            <Field
              label="Composición de la historia"
              value={data.story.composition}
              onChange={(v) => setProduct("story", "composition", v)}
              multiline
              placeholder="Imagen, título y espacio para encuesta"
            />
            <Field
              label="Copy de la historia"
              value={data.story.copy}
              onChange={(v) => setProduct("story", "copy", v)}
              multiline
            />
            <Field
              label="CTA"
              value={data.story.cta}
              onChange={(v) => setProduct("story", "cta", v)}
              placeholder="Responde nuestra encuesta"
            />
          </div>

          <div className="micro13-preview-wrap">
            <div className="micro13-story-preview">
              <small>VISTA PREVIA CONCEPTUAL</small>
              <strong>
                {data.story.question || "¿Cómo prefieres tu café?"}
              </strong>
              <div className="micro13-poll">
                <span>{data.story.optionA || "Intenso"}</span>
                <span>{data.story.optionB || "Suave"}</span>
              </div>
              <small>Zona propuesta para encuesta</small>
            </div>
          </div>
        </div>

        <Field
          label="Enlace a la historia diseñada"
          value={data.story.link}
          onChange={(v) => setProduct("story", "link", v)}
        />

        <p className="micro13-hint">
          La vista previa es una maqueta. La encuesta interactiva debe
          configurarse en la plataforma al publicar la historia.
        </p>
      </Step>

      <Step index={4} checked={data.done[4]} onCheck={(v) => markDone(4, v)}>
        <div className="micro13-producthead">
          <div>
            <span>PRODUCTO 03</span>
            <h4>Publicación gráfica</h4>
            <p>1080 × 1350 px · 4:5</p>
          </div>
          <span className="micro13-tag">10 MIN</span>
        </div>

        <StageSelect
          value={data.post.stage}
          onChange={(v) => setProduct("post", "stage", v)}
        />

        <div className="micro13-grid">
          <div>
            <Field
              label="Composición visual"
              value={data.post.composition}
              onChange={(v) => setProduct("post", "composition", v)}
              multiline
              placeholder="Fotografía, jerarquía y espacio negativo"
            />
            <Field
              label="Copy del post"
              value={data.post.copy}
              onChange={(v) => setProduct("post", "copy", v)}
              multiline
            />
            <Field
              label="CTA"
              value={data.post.cta}
              onChange={(v) => setProduct("post", "cta", v)}
              placeholder="Guarda esta idea"
            />
          </div>

          <div className="micro13-preview-wrap">
            <div className="micro13-post-preview">
              <small>COMPOSICIÓN CONCEPTUAL</small>
              <div className="micro13-post-image">Imagen protagonista</div>
              <strong>
                {data.post.headline || "Tu pausa merece un buen café"}
              </strong>
              <p>{data.post.benefit || "Un momento para disfrutar"}</p>
            </div>
          </div>
        </div>

        <Field
          label="Enlace al post terminado"
          value={data.post.link}
          onChange={(v) => setProduct("post", "link", v)}
        />
      </Step>

      <Step index={5} checked={data.done[5]} onCheck={(v) => markDone(5, v)}>
        <p>
          Comprueba que los tres productos comunican la misma idea, sin repetir
          el mismo diseño.
        </p>

        <div className="micro13-deliverables">
          {[
            ["Reel MP4", data.reel.link],
            ["Historia 9:16", data.story.link],
            ["Post 4:5", data.post.link],
          ].map(([label, link]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{link.trim() ? "Enlace registrado" : "Pendiente"}</strong>
            </div>
          ))}
        </div>

        <Field
          label="¿Cómo cambia el mensaje en los tres formatos?"
          value={data.comparison}
          onChange={(v) => setField("comparison", v)}
          multiline
        />

        <Field
          label="¿Qué recursos visuales reutilizaron?"
          value={data.resources}
          onChange={(v) => setField("resources", v)}
          multiline
        />

        <Field
          label="¿Qué mejorarían antes de publicar?"
          value={data.improvements}
          onChange={(v) => setField("improvements", v)}
          multiline
        />

        <Field
          label="Carpeta de entrega"
          value={data.folder}
          onChange={(v) => setField("folder", v)}
        />

        <div className="micro13-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Idea central y coherencia de marca", 5],
            ["Reel: narrativa, edición y claridad", 15],
            ["Historia: diseño e interacción", 10],
            ["Post: composición y jerarquía", 10],
            ["Adaptación de copies y CTA", 5],
            ["Presentación y justificación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points} pts.</strong>
            </div>
          ))}
        </div>
      </Step>

      <footer className="micro13-footer">
        <div className="micro13-summary">
          <strong>{completed}/6 etapas</strong>
          <strong>{productsReady}/3 archivos registrados</strong>
        </div>

        <button type="button" onClick={downloadReport}>
          Descargar ficha de producción
        </button>

        <p>{notice}</p>

        <p>
          Tarea: mejora estas tres piezas y crea un segundo Reel, una segunda
          historia y otro post. Integra las seis al cronopost y entrégalas en
          Moodle.
        </p>
      </footer>
    </div>
  );
}
