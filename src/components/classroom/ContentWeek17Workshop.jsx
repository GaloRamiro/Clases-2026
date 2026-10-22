import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana17.css";

const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    minutes: 15,
    formats: ["Reel 9:16", "Publicación 4:5", "Carrusel", "Historia 9:16"],
    defaultFormat: "Reel 9:16",
    hint: "Prioriza el impacto visual, la portada y la coherencia de marca.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    minutes: 15,
    formats: ["Video 9:16", "Fotopublicación"],
    defaultFormat: "Video 9:16",
    hint: "Trabaja un gancho claro y muestra la idea desde el inicio.",
  },
  {
    id: "facebook",
    name: "Facebook",
    minutes: 10,
    formats: ["Publicación 4:5", "Publicación 1:1", "Video 9:16"],
    defaultFormat: "Publicación 4:5",
    hint: "Añade contexto e invita a participar en la conversación.",
  },
];

const STEPS = [
  ["Seleccionar contenido e idea central", 5],
  ["Adaptación para Instagram", 15],
  ["Adaptación para TikTok", 15],
  ["Adaptación para Facebook", 10],
  ["Copies y maquetas de publicación", 10],
  ["Checklist y cronopost", 5],
];

const QUALITY = [
  "Identidad visual consistente",
  "Formato y proporciones revisados",
  "Titulares y CTA dentro de zonas seguras",
  "Contraste y legibilidad adecuados",
  "Subtítulos cuando corresponda",
  "Texto alternativo cuando esté disponible",
  "Ortografía revisada",
  "Audio e imágenes con autorización",
  "Información comercial verificable",
  "Archivo final revisado",
];

function initialData() {
  return {
    team: "",
    brand: "",
    campaign: "",
    idea: "",
    audience: "",
    objective: "",
    source: "",
    identity: "",
    platforms: PLATFORMS.map((platform) => ({
      id: platform.id,
      name: platform.name,
      format: platform.defaultFormat,
      objective: "",
      audience: "",
      hook: "",
      headline: "",
      copy: "",
      cta: "",
      visual: "",
      adaptation: "",
      asset: "",
      date: "",
      time: "",
      status: "En preparación",
      alt: "",
      checks: QUALITY.map(() => false),
    })),
    feedback: "",
    corrections: "",
    portfolio: "",
    done: Array(6).fill(false),
  };
}

function readSaved(key) {
  const base = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      platforms: base.platforms.map((platform, index) => ({
        ...platform,
        ...(saved.platforms?.[index] || {}),
        checks: QUALITY.map((_, i) =>
          Boolean(saved.platforms?.[index]?.checks?.[i]),
        ),
      })),
      done: base.done.map((_, i) => Boolean(saved.done?.[i])),
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
  type = "text",
}) {
  return (
    <label className="multi17-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="multi17-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Step({ index, completed, onComplete, children }) {
  const [title, minutes] = STEPS[index];

  return (
    <section className="multi17-panel">
      <div className="multi17-stephead">
        <h3>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {title}
        </h3>
        <small>{minutes} min</small>
      </div>

      {children}

      <label className="multi17-complete">
        <input
          type="checkbox"
          checked={completed}
          onChange={(event) => onComplete(event.target.checked)}
        />
        Etapa completada
      </label>
    </section>
  );
}

function Preview({ publication, brand }) {
  const isVideo =
    publication.format.toLowerCase().includes("video") ||
    publication.format.toLowerCase().includes("reel") ||
    publication.format.toLowerCase().includes("historia");

  return (
    <article className={`multi17-preview multi17-preview--${publication.id}`}>
      <div className="multi17-previewhead">
        <div className="multi17-avatar">
          {(brand || "C").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <strong>{brand || "Tu marca de café"}</strong>
          <small>{publication.name} · Simulación</small>
        </div>
      </div>

      <div className={`multi17-media ${isVideo ? "multi17-media--video" : ""}`}>
        <small>{publication.format}</small>
        <span>{isVideo ? "VISTA PREVIA DE VIDEO" : "PIEZA GRÁFICA"}</span>
        <strong>{publication.headline || "Titular de tu campaña"}</strong>
        <em>{publication.hook || "Gancho de publicación"}</em>
      </div>

      <div className="multi17-previewbody">
        <p>{publication.copy || "Aquí aparecerá el copy de la publicación."}</p>
        <strong>{publication.cta || "Llamado a la acción"}</strong>
        <small>
          {publication.date || "Fecha pendiente"}
          {publication.time ? ` · ${publication.time}` : ""}
        </small>
      </div>
    </article>
  );
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function downloadBlob(content, filename, type) {
  const blob = new Blob(["\uFEFF", content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ContentWeek17Workshop({
  lessonId = "contenido-semana-17",
  studentName = "",
}) {
  const key = `aula:semana17:${lessonId}:${studentName || "anonimo"}`;

  const [session, setSession] = useState(() => ({
    key,
    data: readSaved(key),
  }));

  const [notice, setNotice] = useState("");

  const data = session.key === key ? session.data : readSaved(key);

  function save(next) {
    setSession({ key, data: next });

    try {
      localStorage.setItem(key, JSON.stringify(next));
      setNotice("Avance guardado en este navegador.");
    } catch {
      setNotice("No se pudo guardar el avance.");
    }
  }

  function update(field, value) {
    save({ ...data, [field]: value });
  }

  function updatePlatform(index, field, value) {
    save({
      ...data,
      platforms: data.platforms.map((platform, i) =>
        i === index ? { ...platform, [field]: value } : platform,
      ),
    });
  }

  function updateCheck(platformIndex, checkIndex, checked) {
    const platform = data.platforms[platformIndex];

    updatePlatform(
      platformIndex,
      "checks",
      platform.checks.map((value, i) => (i === checkIndex ? checked : value)),
    );
  }

  function markStep(index, checked) {
    update(
      "done",
      data.done.map((value, i) => (i === index ? checked : value)),
    );
  }

  function downloadReport() {
    const lines = [
      "LABORATORIO 17 — CAMPAÑA MULTIPLATAFORMA",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Idea central: ${data.idea}`,
      `Público: ${data.audience}`,
      `Objetivo: ${data.objective}`,
      `Contenido base: ${data.source}`,
      `Identidad visual: ${data.identity}`,
      "",
      ...data.platforms.flatMap((publication) => [
        `PLATAFORMA: ${publication.name.toUpperCase()}`,
        `Formato: ${publication.format}`,
        `Objetivo: ${publication.objective}`,
        `Audiencia: ${publication.audience}`,
        `Gancho: ${publication.hook}`,
        `Titular: ${publication.headline}`,
        `Copy: ${publication.copy}`,
        `CTA: ${publication.cta}`,
        `Decisiones visuales: ${publication.visual}`,
        `Adaptación: ${publication.adaptation}`,
        `Archivo: ${publication.asset}`,
        `Fecha: ${publication.date}`,
        `Hora: ${publication.time}`,
        `Estado: ${publication.status}`,
        `Texto alternativo: ${publication.alt}`,
        "Control de calidad:",
        ...QUALITY.map(
          (item, i) => `- [${publication.checks[i] ? "X" : " "}] ${item}`,
        ),
        "",
      ]),
      `Retroalimentación: ${data.feedback}`,
      `Correcciones: ${data.corrections}`,
      `Carpeta del portafolio: ${data.portfolio}`,
    ];

    downloadBlob(
      lines.join("\n"),
      "laboratorio-semana17.txt",
      "text/plain;charset=utf-8",
    );
  }

  function downloadCronopost() {
    const headers = [
      "Marca",
      "Campaña",
      "Plataforma",
      "Fecha",
      "Hora",
      "Formato",
      "Objetivo",
      "Público",
      "Gancho",
      "Copy",
      "CTA",
      "Archivo",
      "Estado",
    ];

    const rows = data.platforms.map((publication) => [
      data.brand,
      data.campaign,
      publication.name,
      publication.date,
      publication.time,
      publication.format,
      publication.objective,
      publication.audience,
      publication.hook,
      publication.copy,
      publication.cta,
      publication.asset,
      publication.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(";"))
      .join("\r\n");

    downloadBlob(csv, "cronopost-semana17.csv", "text/csv;charset=utf-8");
  }

  const completed = data.done.filter(Boolean).length;
  const copiesReady = data.platforms.filter(
    (publication) => publication.copy.trim() && publication.cta.trim(),
  ).length;
  const assetsReady = data.platforms.filter((publication) =>
    publication.asset.trim(),
  ).length;
  const checkedCount = data.platforms.reduce(
    (sum, publication) => sum + publication.checks.filter(Boolean).length,
    0,
  );

  return (
    <div className="multi17">
      <header className="multi17-hero">
        <span>LABORATORIO 17 · 60 MINUTOS</span>
        <h2>Una campaña, tres publicaciones profesionales</h2>
        <p>
          Adapta tu contenido para Instagram, TikTok y Facebook. Mantén la
          identidad de marca, pero diferencia el formato, el gancho, el copy y
          el CTA.
        </p>

        <div className="multi17-progress">
          <strong>{completed}/6 etapas completadas</strong>
          <div>
            <span style={{ width: `${(completed / 6) * 100}%` }} />
          </div>
        </div>
      </header>

      <section className="multi17-panel">
        <h3>Identificación del equipo</h3>
        <div className="multi17-grid">
          <Field
            label="Equipo"
            value={data.team}
            onChange={(value) => update("team", value)}
          />
          <Field
            label="Marca de café"
            value={data.brand}
            onChange={(value) => update("brand", value)}
          />
        </div>
        <Field
          label="Nombre de campaña"
          value={data.campaign}
          onChange={(value) => update("campaign", value)}
        />
      </section>

      <Step
        index={0}
        completed={data.done[0]}
        onComplete={(value) => markStep(0, value)}
      >
        <p>
          Recupera los anuncios de la Semana 16. Define una idea central que se
          mantendrá en las tres plataformas.
        </p>

        <div className="multi17-grid">
          <Field
            label="Público objetivo"
            value={data.audience}
            onChange={(value) => update("audience", value)}
          />
          <Field
            label="Objetivo de campaña"
            value={data.objective}
            onChange={(value) => update("objective", value)}
          />
        </div>

        <Field
          label="Idea central"
          value={data.idea}
          onChange={(value) => update("idea", value)}
          placeholder="Ej. Tu pausa merece un buen café"
        />

        <Field
          label="Archivos base de la Semana 16"
          value={data.source}
          onChange={(value) => update("source", value)}
          placeholder="Enlace a la carpeta de videos y fotografías"
        />

        <Field
          label="Elementos visuales que deben permanecer"
          value={data.identity}
          onChange={(value) => update("identity", value)}
          multiline
          placeholder="Logotipo, paleta, tipografía, estilo fotográfico..."
        />
      </Step>

      {PLATFORMS.map((platform, index) => {
        const publication = data.platforms[index];

        return (
          <Step
            key={platform.id}
            index={index + 1}
            completed={data.done[index + 1]}
            onComplete={(value) => markStep(index + 1, value)}
          >
            <p>{platform.hint}</p>

            <div className="multi17-grid">
              <div>
                <SelectField
                  label="Formato seleccionado"
                  value={publication.format}
                  options={platform.formats}
                  onChange={(value) => updatePlatform(index, "format", value)}
                />

                <Field
                  label="Objetivo específico"
                  value={publication.objective}
                  onChange={(value) =>
                    updatePlatform(index, "objective", value)
                  }
                  placeholder="Reconocimiento, interacción, tráfico..."
                />

                <Field
                  label="Audiencia de esta publicación"
                  value={publication.audience}
                  onChange={(value) => updatePlatform(index, "audience", value)}
                />

                <Field
                  label="Gancho inicial"
                  value={publication.hook}
                  onChange={(value) => updatePlatform(index, "hook", value)}
                />

                <Field
                  label="Titular"
                  value={publication.headline}
                  onChange={(value) => updatePlatform(index, "headline", value)}
                />

                <Field
                  label="Decisiones visuales"
                  value={publication.visual}
                  onChange={(value) => updatePlatform(index, "visual", value)}
                  multiline
                />

                <Field
                  label="¿Qué cambió respecto al original?"
                  value={publication.adaptation}
                  onChange={(value) =>
                    updatePlatform(index, "adaptation", value)
                  }
                  multiline
                />

                <Field
                  label="Enlace al archivo adaptado"
                  value={publication.asset}
                  onChange={(value) => updatePlatform(index, "asset", value)}
                />
              </div>

              <div className="multi17-previewcolumn">
                <Preview publication={publication} brand={data.brand} />
                <p className="multi17-hint">
                  La maqueta muestra la composición y los textos de forma
                  conceptual. El archivo final se prepara en tu editor.
                </p>
              </div>
            </div>
          </Step>
        );
      })}

      <Step
        index={4}
        completed={data.done[4]}
        onComplete={(value) => markStep(4, value)}
      >
        <p>
          Redacta tres copies diferenciados y sus respectivos CTA. Las maquetas
          se actualizarán automáticamente.
        </p>

        <div className="multi17-three">
          {data.platforms.map((publication, index) => (
            <div className="multi17-copycard" key={publication.id}>
              <h4>{publication.name}</h4>

              <Field
                label="Copy completo"
                value={publication.copy}
                onChange={(value) => updatePlatform(index, "copy", value)}
                multiline
              />

              <Field
                label="CTA"
                value={publication.cta}
                onChange={(value) => updatePlatform(index, "cta", value)}
              />

              <Field
                label="Texto alternativo descriptivo"
                value={publication.alt}
                onChange={(value) => updatePlatform(index, "alt", value)}
                multiline
              />

              <Preview publication={publication} brand={data.brand} />
            </div>
          ))}
        </div>
      </Step>

      <Step
        index={5}
        completed={data.done[5]}
        onComplete={(value) => markStep(5, value)}
      >
        <p>
          Antes de entregar, revisa las tres publicaciones y actualiza el
          cronopost de la campaña.
        </p>

        <div className="multi17-three">
          {data.platforms.map((publication, index) => (
            <div className="multi17-quality" key={publication.id}>
              <h4>{publication.name}</h4>

              <div className="multi17-checks">
                {QUALITY.map((item, checkIndex) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={publication.checks[checkIndex]}
                      onChange={(event) =>
                        updateCheck(index, checkIndex, event.target.checked)
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <Field
                label="Fecha de publicación"
                type="date"
                value={publication.date}
                onChange={(value) => updatePlatform(index, "date", value)}
              />

              <Field
                label="Hora prevista"
                type="time"
                value={publication.time}
                onChange={(value) => updatePlatform(index, "time", value)}
              />

              <SelectField
                label="Estado"
                value={publication.status}
                options={[
                  "En preparación",
                  "En revisión",
                  "Requiere correcciones",
                  "Listo para publicación simulada",
                ]}
                onChange={(value) => updatePlatform(index, "status", value)}
              />
            </div>
          ))}
        </div>

        <h4>Resumen de producción</h4>

        <div className="multi17-deliverables">
          <div>
            <span>Copies y CTA registrados</span>
            <strong>{copiesReady}/3</strong>
          </div>
          <div>
            <span>Archivos adaptados registrados</span>
            <strong>{assetsReady}/3</strong>
          </div>
          <div>
            <span>Controles de calidad marcados</span>
            <strong>{checkedCount}/30</strong>
          </div>
        </div>

        <Field
          label="Retroalimentación del docente"
          value={data.feedback}
          onChange={(value) => update("feedback", value)}
          multiline
        />

        <Field
          label="Correcciones pendientes"
          value={data.corrections}
          onChange={(value) => update("corrections", value)}
          multiline
        />

        <Field
          label="Carpeta del portafolio final"
          value={data.portfolio}
          onChange={(value) => update("portfolio", value)}
        />

        <div className="multi17-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Adaptación para Instagram", 10],
            ["Adaptación para TikTok", 10],
            ["Adaptación para Facebook", 10],
            ["Copies, CTA y coherencia de marca", 10],
            ["Maquetas, checklist y cronopost", 5],
            ["Presentación y justificación", 5],
          ].map(([criterion, points]) => (
            <div key={criterion}>
              <span>{criterion}</span>
              <strong>{points} pts.</strong>
            </div>
          ))}
        </div>
      </Step>

      <footer className="multi17-footer">
        <div className="multi17-summary">
          <strong>{completed}/6 etapas</strong>
          <strong>{copiesReady}/3 copies</strong>
          <strong>{assetsReady}/3 archivos</strong>
        </div>

        <div className="multi17-actions">
          <WorkshopDownloadButton
            studentName={studentName}
            lesson={{
              courseId: "contenido",
              number: 17,
              title: "Una campaña. Tres plataformas. Tres formas de comunicar.",
            }}
            title="Laboratorio 17: Campaña multiplataforma"
            answers={{
              "Nombre del equipo": data.team,
              "Marca de café": data.brand,
              "Nombre de campaña": data.campaign,
              "Idea central": data.idea,
              "Público objetivo": data.audience,
              "Objetivo de campaña": data.objective,
              "Archivos base de Semana 16": data.source,
              "Identidad visual que debe permanecer": data.identity,

              ...Object.fromEntries(
                data.platforms.flatMap((publication) => {
                  const prefix = publication.name.toUpperCase();

                  return [
                    [`${prefix} - Formato`, publication.format],
                    [`${prefix} - Objetivo específico`, publication.objective],
                    [`${prefix} - Audiencia`, publication.audience],
                    [`${prefix} - Gancho inicial`, publication.hook],
                    [`${prefix} - Titular`, publication.headline],
                    [`${prefix} - Copy completo`, publication.copy],
                    [`${prefix} - CTA`, publication.cta],
                    [`${prefix} - Decisiones visuales`, publication.visual],
                    [
                      `${prefix} - Adaptación respecto al original`,
                      publication.adaptation,
                    ],
                    [`${prefix} - Archivo adaptado`, publication.asset],
                    [`${prefix} - Texto alternativo`, publication.alt],
                    [`${prefix} - Fecha de publicación`, publication.date],
                    [`${prefix} - Hora prevista`, publication.time],
                    [`${prefix} - Estado`, publication.status],

                    ...QUALITY.map((item, index) => [
                      `${prefix} - Calidad: ${item}`,
                      publication.checks[index] ? "Cumple" : "Pendiente",
                    ]),
                  ];
                }),
              ),

              "Retroalimentación del docente": data.feedback,
              "Correcciones pendientes": data.corrections,
              "Carpeta del portafolio final": data.portfolio,

              ...Object.fromEntries(
                data.done.map((checked, index) => [
                  `Etapa ${index + 1}: ${STEPS[index][0]}`,
                  checked ? "Completada" : "Pendiente",
                ]),
              ),

              "Progreso general": `${completed} de 6 etapas`,

              "Copies y CTA registrados": `${copiesReady} de 3`,

              "Archivos adaptados registrados": `${assetsReady} de 3`,

              "Controles de calidad marcados": `${checkedCount} de 30`,
            }}
          />

          <button
            type="button"
            className="multi17-secondary"
            onClick={downloadCronopost}
          >
            Descargar cronopost CSV
          </button>
        </div>

        <p>{notice}</p>

        <p>
          Trabajo autónomo: perfeccionar estas tres publicaciones y seleccionar
          seis piezas adicionales del semestre. Entregar nueve piezas
          optimizadas, cronopost definitivo, checklist y borrador del
          portafolio.
        </p>
      </footer>
    </div>
  );
}
