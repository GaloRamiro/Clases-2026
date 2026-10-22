import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana09.css";

const PILLARS = ["Educativo", "Inspiracional", "Comunidad", "Comercial"];
const STATUSES = ["Idea", "Redacción", "Diseño", "Revisión", "Lista"];
const FORMATS = ["Post", "Carrusel", "Reel", "Historia", "Video corto", "Otro"];
const PLATFORMS = ["Instagram", "TikTok", "Facebook", "Otra"];

const blankPost = (day) => ({
  day,
  platform: "Instagram",
  pillar: "Educativo",
  format: "Post",
  topic: "",
  objective: "",
  copy: "",
  cta: "",
  owner: "",
  status: "Idea",
  link: "",
});

const initial = () => ({
  team: "",
  brand: "",
  persona: "",
  objective: "",
  frequency: "4 publicaciones por semana",
  justification: "",
  pillars: PILLARS.map((name) => ({ name, rationale: "" })),
  posts: [1, 3, 5, 7, 9, 11, 13, 15].map(blankPost),
  reflection: "",
  evidence: "",
  completed: Array(6).fill(false),
});

const storageKey = (lessonId, studentName) =>
  `aula:contenido:semana09:${lessonId}:${studentName || "sin-nombre"}`;

function readSaved(key) {
  const base = initial();

  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");

    if (!raw || typeof raw !== "object") return base;

    return {
      ...base,
      ...raw,
      pillars: PILLARS.map((name, i) => ({
        name,
        rationale: raw.pillars?.[i]?.rationale || "",
      })),
      posts: Array.isArray(raw.posts)
        ? raw.posts.map((p) => ({
            ...blankPost(p.day),
            ...p,
          }))
        : base.posts,
      completed: base.completed.map((_, i) => Boolean(raw.completed?.[i])),
    };
  } catch {
    return base;
  }
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}) {
  return (
    <label className="cron9-field">
      <span>{label}</span>

      {multiline ? (
        <textarea
          rows={3}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="cron9-field">
      <span>{label}</span>

      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Done({ checked, onChange }) {
  return (
    <label className="cron9-done">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      Marcar etapa como completada
    </label>
  );
}

export default function ContentWeek09Workshop({
  lessonId = "contenido-semana-9",
  studentName = "",
}) {
  const key = storageKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: readSaved(key),
  }));

  const data = stored.key === key ? stored.data : readSaved(key);

  const [notice, setNotice] = useState("");

  function update(patch) {
    const next = { ...data, ...patch };

    try {
      localStorage.setItem(key, JSON.stringify(next));
      setNotice("Guardado automáticamente en este navegador.");
    } catch {
      setNotice("No se pudo guardar. Revisa el almacenamiento del navegador.");
    }

    setStored({ key, data: next });
  }

  const set = (name, value) => update({ [name]: value });

  const setPillar = (index, rationale) =>
    update({
      pillars: data.pillars.map((p, i) =>
        i === index ? { ...p, rationale } : p,
      ),
    });

  const setPost = (index, field, value) =>
    update({
      posts: data.posts.map((p, i) =>
        i === index ? { ...p, [field]: value } : p,
      ),
    });

  const toggleDone = (index, checked) =>
    update({
      completed: data.completed.map((x, i) => (i === index ? checked : x)),
    });

  const usedDays = new Set(data.posts.map((p) => Number(p.day)));

  const availableDays = Array.from({ length: 15 }, (_, i) => i + 1).filter(
    (d) => !usedDays.has(d),
  );

  const ready = data.posts.filter(
    (p) =>
      p.status === "Lista" &&
      p.topic.trim() &&
      p.copy.trim() &&
      p.cta.trim() &&
      p.link.trim(),
  ).length;

  const counts = PILLARS.map((name) => ({
    name,
    count: data.posts.filter((p) => p.pillar === name).length,
  }));

  const completedCount = data.completed.filter(Boolean).length;

  function exportCsv() {
    const headers = [
      "Día",
      "Plataforma",
      "Pilar",
      "Formato",
      "Tema",
      "Objetivo",
      "Copy",
      "CTA",
      "Responsable",
      "Estado",
      "Archivo",
    ];

    const quote = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

    const rows = data.posts
      .slice()
      .sort((a, b) => Number(a.day) - Number(b.day))
      .map((p) => [
        p.day,
        p.platform,
        p.pillar,
        p.format,
        p.topic,
        p.objective,
        p.copy,
        p.cta,
        p.owner,
        p.status,
        p.link,
      ]);

    const csv =
      "\uFEFF" +
      [headers, ...rows].map((row) => row.map(quote).join(",")).join("\r\n");

    const url = URL.createObjectURL(
      new Blob([csv], {
        type: "text/csv;charset=utf-8",
      }),
    );

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "cronopost-semana09.csv";
    anchor.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="cron9">
      <header className="cron9-hero">
        <span>LABORATORIO 09 · 60 MINUTOS</span>
        <h2>Organiza los próximos 15 días de tu café</h2>
        <p>
          Diseña un cronopost operativo y deja cinco contenidos preparados. El
          calendario se puede exportar como CSV para Excel o Google Sheets.
        </p>

        <div className="cron9-progress">
          <strong>{completedCount}/6 etapas completadas</strong>
          <div>
            <span
              style={{
                width: `${(completedCount / 6) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      <section className="cron9-panel">
        <h3>Identificación del equipo</h3>

        <div className="cron9-grid">
          <Field
            label="Equipo"
            value={data.team}
            onChange={(v) => set("team", v)}
          />
          <Field
            label="Marca de café"
            value={data.brand}
            onChange={(v) => set("brand", v)}
          />
        </div>

        <Field
          label="Buyer Persona"
          value={data.persona}
          onChange={(v) => set("persona", v)}
          multiline
        />

        <Field
          label="Objetivo de comunicación"
          value={data.objective}
          onChange={(v) => set("objective", v)}
          multiline
        />
      </section>

      <section className="cron9-panel">
        <h3>
          01 · Pilares y frecuencia <small>10 minutos</small>
        </h3>
        <p>Justifica los cuatro pilares según tu marca y consumidor.</p>

        <div className="cron9-grid">
          {data.pillars.map((p, i) => (
            <Field
              key={p.name}
              label={p.name}
              value={p.rationale}
              onChange={(v) => setPillar(i, v)}
              multiline
              placeholder="¿Qué aportará este pilar?"
            />
          ))}
        </div>

        <Field
          label="Frecuencia propuesta"
          value={data.frequency}
          onChange={(v) => set("frequency", v)}
        />

        <Field
          label="¿Por qué es viable esta frecuencia?"
          value={data.justification}
          onChange={(v) => set("justification", v)}
          multiline
        />

        <Done checked={data.completed[0]} onChange={(v) => toggleDone(0, v)} />
      </section>

      <section className="cron9-panel">
        <h3>
          02 · Cronopost de 15 días <small>15 minutos</small>
        </h3>

        <p>
          Planifica al menos ocho publicaciones dentro de una ventana de 15
          días. Puedes cambiar los días o añadir más publicaciones.
        </p>

        <div className="cron9-stats">
          <strong>{data.posts.length} publicaciones</strong>
          <strong>{ready} listas con evidencias</strong>
          <strong>{availableDays.length} días sin publicación</strong>
        </div>

        <div className="cron9-days">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((day) => (
            <span key={day} className={usedDays.has(day) ? "active" : ""}>
              {day}
            </span>
          ))}
        </div>

        <div className="cron9-posts">
          {data.posts.map((post, index) => (
            <article className="cron9-post" key={index}>
              <div className="cron9-post-head">
                <strong>PUBLICACIÓN {index + 1}</strong>

                <div>
                  <label>
                    Día
                    <select
                      value={post.day}
                      onChange={(e) =>
                        setPost(index, "day", Number(e.target.value))
                      }
                    >
                      {Array.from({ length: 15 }, (_, i) => i + 1).map(
                        (day) => (
                          <option
                            key={day}
                            value={day}
                            disabled={
                              usedDays.has(day) && Number(post.day) !== day
                            }
                          >
                            {day}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      update({
                        posts: data.posts.filter((_, i) => i !== index),
                      })
                    }
                    disabled={data.posts.length <= 8}
                  >
                    Quitar
                  </button>
                </div>
              </div>

              <div className="cron9-grid">
                <Select
                  label="Plataforma"
                  value={post.platform}
                  options={PLATFORMS}
                  onChange={(v) => setPost(index, "platform", v)}
                />

                <Select
                  label="Pilar"
                  value={post.pillar}
                  options={PILLARS}
                  onChange={(v) => setPost(index, "pillar", v)}
                />

                <Select
                  label="Formato"
                  value={post.format}
                  options={FORMATS}
                  onChange={(v) => setPost(index, "format", v)}
                />

                <Select
                  label="Estado"
                  value={post.status}
                  options={STATUSES}
                  onChange={(v) => setPost(index, "status", v)}
                />

                <Field
                  label="Tema"
                  value={post.topic}
                  onChange={(v) => setPost(index, "topic", v)}
                />

                <Field
                  label="Objetivo"
                  value={post.objective}
                  onChange={(v) => setPost(index, "objective", v)}
                />

                <Field
                  label="Responsable"
                  value={post.owner}
                  onChange={(v) => setPost(index, "owner", v)}
                />

                <Field
                  label="Enlace al diseño o video"
                  value={post.link}
                  onChange={(v) => setPost(index, "link", v)}
                />
              </div>

              <Field
                label="Copy final"
                value={post.copy}
                onChange={(v) => setPost(index, "copy", v)}
                multiline
              />

              <Field
                label="CTA"
                value={post.cta}
                onChange={(v) => setPost(index, "cta", v)}
                placeholder="Ej. Guarda esta publicación"
              />
            </article>
          ))}
        </div>

        <div className="cron9-actions">
          <button
            type="button"
            disabled={!availableDays.length}
            onClick={() =>
              update({
                posts: [...data.posts, blankPost(availableDays[0])],
              })
            }
          >
            + Añadir publicación
          </button>

          <button type="button" onClick={exportCsv}>
            Exportar cronopost CSV
          </button>
        </div>

        <Done checked={data.completed[1]} onChange={(v) => toggleDone(1, v)} />
      </section>

      <section className="cron9-panel">
        <h3>
          03 · Cinco contenidos preparados <small>20 minutos</small>
        </h3>

        <p>
          Selecciona cinco publicaciones del cronopost y completa tema, copy,
          CTA y enlace a la pieza real. Marca el estado «Lista» solo cuando la
          pieza esté terminada.
        </p>

        <div className="cron9-stats">
          <strong>{ready} / 5 contenidos completos</strong>
        </div>

        <p className="cron9-muted">
          Se consideran completos cuando tienen tema, copy, CTA, enlace y estado
          «Lista». La aplicación no verifica el archivo enlazado.
        </p>

        <Done checked={data.completed[2]} onChange={(v) => toggleDone(2, v)} />
      </section>

      <section className="cron9-panel">
        <h3>
          04 · Responsables y estados <small>5 minutos</small>
        </h3>

        <p>
          Comprueba que cada publicación tenga una persona responsable y un
          estado actualizado.
        </p>

        <div className="cron9-stats">
          <strong>
            {data.posts.filter((p) => p.owner.trim()).length}/
            {data.posts.length} responsables asignados
          </strong>

          <strong>
            {data.posts.filter((p) => p.status === "Lista").length} estados
            «Lista»
          </strong>
        </div>

        <Done checked={data.completed[3]} onChange={(v) => toggleDone(3, v)} />
      </section>

      <section className="cron9-panel">
        <h3>
          05 · Equilibrio y coherencia <small>5 minutos</small>
        </h3>

        <div className="cron9-bars">
          {counts.map((item) => (
            <div key={item.name}>
              <span>
                {item.name}: {item.count}
              </span>
              <div>
                <span
                  style={{
                    width: `${
                      data.posts.length
                        ? (item.count / data.posts.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <Field
          label="¿Cómo equilibraste valor, interacción y promoción?"
          value={data.reflection}
          onChange={(v) => set("reflection", v)}
          multiline
        />

        <Done checked={data.completed[4]} onChange={(v) => toggleDone(4, v)} />
      </section>

      <section className="cron9-panel">
        <h3>
          06 · Entrega y exposición <small>5 minutos</small>
        </h3>

        <p>
          Presenta el cronopost y muestra dos contenidos. Entrega en Moodle los
          archivos y evidencias; este formulario solo guarda datos en el
          navegador.
        </p>

        <Field
          label="Enlace a la carpeta de evidencias"
          value={data.evidence}
          onChange={(v) => set("evidence", v)}
        />

        <div className="cron9-rubric">
          <h4>Rúbrica · 50 puntos</h4>

          {[
            ["Pilares y justificación", 10],
            ["Cronopost organizado", 15],
            ["Cinco contenidos preparados", 15],
            ["Responsables, estados y viabilidad", 5],
            ["Presentación y argumentación", 5],
          ].map(([name, score]) => (
            <div key={name}>
              <span>{name}</span>
              <strong>{score}</strong>
            </div>
          ))}
        </div>

        <Done checked={data.completed[5]} onChange={(v) => toggleDone(5, v)} />
      </section>

      <footer className="cron9-footer">
        <strong>
          {notice || "Tus respuestas se guardan en este navegador al editar."}
        </strong>

        <p>
          Trabajo autónomo: completa tres contenidos adicionales para reunir
          ocho piezas terminadas y prepara la presentación para la Semana 10.
        </p>

        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "contenido",
            number: 9,
            title: "Cronopost y calendario editorial",
          }}
          title="Laboratorio 09: Cronopost de 15 días"
          answers={{
            Equipo: data.team,
            "Marca de café": data.brand,
            "Buyer Persona": data.persona,
            "Objetivo de comunicación": data.objective,

            "Frecuencia de publicación": data.frequency,
            "Justificación de la frecuencia": data.justification,

            ...Object.fromEntries(
              data.pillars.map((pillar) => [
                `Pilar ${pillar.name} - Justificación`,
                pillar.rationale,
              ]),
            ),

            "Total de publicaciones planificadas": String(data.posts.length),
            "Publicaciones listas con evidencias": String(ready),

            ...Object.fromEntries(
              data.posts
                .slice()
                .sort((a, b) => Number(a.day) - Number(b.day))
                .flatMap((post, index) => {
                  const prefix = `Publicación ${index + 1}`;

                  return [
                    [`${prefix} - Día`, String(post.day)],
                    [`${prefix} - Plataforma`, post.platform],
                    [`${prefix} - Pilar`, post.pillar],
                    [`${prefix} - Formato`, post.format],
                    [`${prefix} - Tema`, post.topic],
                    [`${prefix} - Objetivo`, post.objective],
                    [`${prefix} - Copy`, post.copy],
                    [`${prefix} - CTA`, post.cta],
                    [`${prefix} - Responsable`, post.owner],
                    [`${prefix} - Estado`, post.status],
                    [`${prefix} - Enlace al contenido`, post.link],
                  ];
                }),
            ),

            "Distribución de pilares": counts
              .map((item) => `${item.name}: ${item.count}`)
              .join(" | "),

            "Análisis del equilibrio editorial": data.reflection,

            "Publicaciones con responsable": `${
              data.posts.filter((post) => post.owner.trim()).length
            } de ${data.posts.length}`,

            "Enlace a carpeta de evidencias": data.evidence,

            "Etapas completadas": `${completedCount} de 6`,
          }}
        />
      </footer>
    </div>
  );
}
