import { useState } from "react";
import "../../styles/contenidoSemana14.css";

const STEPS = [
  ["Mensaje y objetivo", 5],
  ["Dirección de arte y prompts", 10],
  ["Tres propuestas fotográficas", 15],
  ["Selección y mejora", 10],
  ["Dos anuncios terminados", 15],
  ["Revisión y entrega", 5],
];

const blankPhoto = (id) => ({
  id,
  concept: "",
  origin: "IA generativa",
  prompt: "",
  link: "",
  evaluation: "",
});

const blankEdit = (id) => ({
  id,
  photoId: String(id),
  changes: "",
  reason: "",
  link: "",
});

const blankAd = (format) => ({
  format,
  photoId: "1",
  headline: "",
  copy: "",
  cta: "",
  composition: "",
  link: "",
});

function initialData() {
  return {
    team: "",
    brand: "",
    campaign: "",
    objective: "",
    message: "",
    audience: "",
    emotion: "",
    product: "",
    scene: "",
    action: "",
    composition: "",
    lighting: "",
    colors: "",
    style: "",
    restrictions: "Sin textos, marcas ajenas ni deformaciones",
    references: "",
    moodboard: "",
    tool: "",
    rights: "",
    photos: [1, 2, 3].map(blankPhoto),
    edits: [1, 2].map(blankEdit),
    ads: [blankAd("4:5"), blankAd("9:16")],
    justification: "",
    ethics: "",
    folder: "",
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
      photos: base.photos.map((photo, i) => ({
        ...photo,
        ...(saved.photos?.[i] || {}),
      })),
      edits: base.edits.map((edit, i) => ({
        ...edit,
        ...(saved.edits?.[i] || {}),
      })),
      ads: base.ads.map((ad, i) => ({
        ...ad,
        ...(saved.ads?.[i] || {}),
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
  placeholder = "",
  multiline = false,
}) {
  return (
    <label className="art14-field">
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
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Step({ index, checked, onCheck, children }) {
  const [name, minutes] = STEPS[index];

  return (
    <section className="art14-panel">
      <div className="art14-stephead">
        <h3>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {name}
        </h3>
        <small>{minutes} min</small>
      </div>

      {children}

      <label className="art14-complete">
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

export default function ContentWeek14Workshop({
  lessonId = "contenido-semana-14",
  studentName = "",
}) {
  const storageKey = `aula:semana14:${lessonId}:${studentName || "anonimo"}`;

  const [session, setSession] = useState(() => ({
    key: storageKey,
    data: readSaved(storageKey),
  }));
  const [notice, setNotice] = useState("");

  const data =
    session.key === storageKey ? session.data : readSaved(storageKey);

  function save(next) {
    setSession({ key: storageKey, data: next });

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotice("Avance guardado en este navegador.");
    } catch {
      setNotice("No se pudo guardar el avance.");
    }
  }

  function setField(field, value) {
    save({ ...data, [field]: value });
  }

  function updateArray(group, index, field, value) {
    save({
      ...data,
      [group]: data[group].map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    });
  }

  function markDone(index, value) {
    setField(
      "done",
      data.done.map((item, i) => (i === index ? value : item)),
    );
  }

  const prompt = [
    `Fotografía publicitaria profesional de ${data.product || "[producto]"}.`,
    `Escenario: ${data.scene || "[escenario]"}.`,
    `Acción o situación: ${data.action || "[acción]"}.`,
    `Composición: ${data.composition || "[composición]"}.`,
    `Iluminación: ${data.lighting || "[iluminación]"}.`,
    `Paleta: ${data.colors || "[colores de marca]"}.`,
    `Estilo: ${data.style || "[estilo visual]"}.`,
    `Emoción: ${data.emotion || "[emoción]"}.`,
    "Formato vertical 4:5, fotografía comercial realista.",
    `Restricciones: ${data.restrictions}.`,
  ].join("\n");

  const completed = data.done.filter(Boolean).length;
  const photoCount = data.photos.filter((photo) => photo.link.trim()).length;
  const editCount = data.edits.filter((edit) => edit.link.trim()).length;
  const adCount = data.ads.filter((ad) => ad.link.trim()).length;

  function copyPrompt() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(prompt)
        .then(() => setNotice("Prompt copiado."))
        .catch(() => setNotice("Selecciona y copia el prompt manualmente."));
    } else {
      setNotice("Selecciona y copia el prompt manualmente.");
    }
  }

  function downloadReport() {
    const lines = [
      "LABORATORIO 14 — DIRECCIÓN DE ARTE",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Objetivo: ${data.objective}`,
      `Mensaje: ${data.message}`,
      `Audiencia: ${data.audience}`,
      `Emoción: ${data.emotion}`,
      "",
      "DIRECCIÓN DE ARTE",
      `Producto: ${data.product}`,
      `Escenario: ${data.scene}`,
      `Acción: ${data.action}`,
      `Composición: ${data.composition}`,
      `Iluminación: ${data.lighting}`,
      `Colores: ${data.colors}`,
      `Estilo: ${data.style}`,
      `Referencias: ${data.references}`,
      `Moodboard: ${data.moodboard}`,
      `Herramientas: ${data.tool}`,
      `Permisos: ${data.rights}`,
      "",
      "PROMPT BASE",
      prompt,
      "",
      "PROPUESTAS FOTOGRÁFICAS",
      ...data.photos.flatMap((p) => [
        `Propuesta ${p.id}`,
        `Concepto: ${p.concept}`,
        `Origen: ${p.origin}`,
        `Prompt o ficha: ${p.prompt}`,
        `Enlace: ${p.link}`,
        `Evaluación: ${p.evaluation}`,
        "",
      ]),
      "FOTOGRAFÍAS MEJORADAS",
      ...data.edits.flatMap((e) => [
        `Fotografía ${e.id}`,
        `Propuesta de origen: ${e.photoId}`,
        `Cambios: ${e.changes}`,
        `Justificación: ${e.reason}`,
        `Enlace final: ${e.link}`,
        "",
      ]),
      "ANUNCIOS FINALES",
      ...data.ads.flatMap((a) => [
        `Anuncio ${a.format}`,
        `Fotografía seleccionada: ${a.photoId}`,
        `Titular: ${a.headline}`,
        `Copy: ${a.copy}`,
        `CTA: ${a.cta}`,
        `Composición: ${a.composition}`,
        `Enlace: ${a.link}`,
        "",
      ]),
      `Justificación creativa: ${data.justification}`,
      `Registro ético y uso de IA: ${data.ethics}`,
      `Carpeta de entrega: ${data.folder}`,
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "semana14-direccion-arte.txt";
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="art14">
      <header className="art14-hero">
        <span>LABORATORIO 14 · 60 MINUTOS</span>
        <h2>Conviértete en director de arte</h2>
        <p>
          Diseña una campaña fotográfica para tu café. Puedes utilizar imágenes
          propias, IA generativa o recursos con permisos adecuados.
        </p>

        <div className="art14-progress">
          <strong>{completed}/6 etapas completadas</strong>
          <div>
            <span
              style={{
                width: `${(completed / 6) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      <section className="art14-panel">
        <h3>Datos del estudio creativo</h3>
        <div className="art14-grid">
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
          label="Nombre de campaña"
          value={data.campaign}
          onChange={(v) => setField("campaign", v)}
        />
      </section>

      <Step index={0} checked={data.done[0]} onCheck={(v) => markDone(0, v)}>
        <p>
          Recupera la identidad visual de la Semana 8. Define qué deseas
          comunicar antes de generar cualquier fotografía.
        </p>

        <Field
          label="Objetivo de los anuncios"
          value={data.objective}
          onChange={(v) => setField("objective", v)}
          multiline
          placeholder="Ej. Presentar nuestra marca como una opción para disfrutar una pausa"
        />

        <Field
          label="Mensaje central"
          value={data.message}
          onChange={(v) => setField("message", v)}
          placeholder="Ej. Tu pausa merece un buen café"
        />

        <div className="art14-grid">
          <Field
            label="Buyer Persona"
            value={data.audience}
            onChange={(v) => setField("audience", v)}
          />
          <Field
            label="Emoción que deseas comunicar"
            value={data.emotion}
            onChange={(v) => setField("emotion", v)}
          />
        </div>
      </Step>

      <Step index={1} checked={data.done[1]} onCheck={(v) => markDone(1, v)}>
        <p>
          Crea un moodboard breve y define las decisiones visuales. El sistema
          construirá un prompt base con tus respuestas.
        </p>

        <div className="art14-grid">
          {[
            ["product", "Producto protagonista"],
            ["scene", "Escenario"],
            ["action", "Acción o situación"],
            ["composition", "Composición y encuadre"],
            ["lighting", "Iluminación"],
            ["colors", "Paleta de marca"],
            ["style", "Estilo fotográfico"],
            ["restrictions", "Restricciones"],
          ].map(([field, label]) => (
            <Field
              key={field}
              label={label}
              value={data[field]}
              onChange={(v) => setField(field, v)}
            />
          ))}
        </div>

        <Field
          label="Referencias del moodboard"
          value={data.references}
          onChange={(v) => setField("references", v)}
          multiline
          placeholder="Describe las imágenes, colores y texturas seleccionadas"
        />

        <Field
          label="Enlace al moodboard"
          value={data.moodboard}
          onChange={(v) => setField("moodboard", v)}
        />

        <div className="art14-prompt">
          <div className="art14-prompthead">
            <h4>Prompt de dirección de arte</h4>
            <button type="button" onClick={copyPrompt}>
              Copiar prompt
            </button>
          </div>
          <pre>{prompt}</pre>
        </div>

        <p className="art14-hint">
          Si no utilizas IA, emplea este texto como ficha de dirección de arte
          para una fotografía propia o un recurso con licencia adecuada.
        </p>
      </Step>

      <Step index={2} checked={data.done[2]} onCheck={(v) => markDone(2, v)}>
        <p>
          Produce o selecciona tres fotografías con direcciones creativas
          distintas. Registra su procedencia y evalúa cada propuesta.
        </p>

        <div className="art14-three">
          {data.photos.map((photo, index) => (
            <div className="art14-photo" key={photo.id}>
              <div className="art14-photohead">
                <span>PROPUESTA {photo.id}</span>
              </div>

              <Field
                label="Concepto fotográfico"
                value={photo.concept}
                onChange={(v) => updateArray("photos", index, "concept", v)}
                placeholder={["Producto", "Experiencia", "Emoción"][index]}
              />

              <label className="art14-field">
                <span>Origen del recurso</span>
                <select
                  value={photo.origin}
                  onChange={(e) =>
                    updateArray("photos", index, "origin", e.target.value)
                  }
                >
                  <option>IA generativa</option>
                  <option>Fotografía propia</option>
                  <option>Banco con licencia</option>
                  <option>Combinación de recursos</option>
                </select>
              </label>

              <Field
                label="Prompt o descripción de captura"
                value={photo.prompt}
                onChange={(v) => updateArray("photos", index, "prompt", v)}
                multiline
              />

              <Field
                label="Enlace a la fotografía"
                value={photo.link}
                onChange={(v) => updateArray("photos", index, "link", v)}
              />

              <Field
                label="Evaluación crítica"
                value={photo.evaluation}
                onChange={(v) => updateArray("photos", index, "evaluation", v)}
                multiline
                placeholder="Revisa producto, luz, sombras, detalles y coherencia de marca"
              />
            </div>
          ))}
        </div>
      </Step>

      <Step index={3} checked={data.done[3]} onCheck={(v) => markDone(3, v)}>
        <p>
          Elige dos fotografías de las tres propuestas. Mejora su encuadre,
          color, exposición o detalles y justifica tus decisiones.
        </p>

        <div className="art14-grid">
          {data.edits.map((edit, index) => (
            <div className="art14-edit" key={edit.id}>
              <h4>Fotografía mejorada {edit.id}</h4>

              <label className="art14-field">
                <span>Propuesta seleccionada</span>
                <select
                  value={edit.photoId}
                  onChange={(e) =>
                    updateArray("edits", index, "photoId", e.target.value)
                  }
                >
                  {data.photos.map((photo) => (
                    <option key={photo.id} value={String(photo.id)}>
                      Propuesta {photo.id}
                      {photo.concept ? ` · ${photo.concept}` : ""}
                    </option>
                  ))}
                </select>
              </label>

              <Field
                label="Cambios de edición"
                value={edit.changes}
                onChange={(v) => updateArray("edits", index, "changes", v)}
                multiline
              />

              <Field
                label="Justificación"
                value={edit.reason}
                onChange={(v) => updateArray("edits", index, "reason", v)}
                multiline
              />

              <Field
                label="Enlace a la imagen final"
                value={edit.link}
                onChange={(v) => updateArray("edits", index, "link", v)}
              />
            </div>
          ))}
        </div>
      </Step>

      <Step index={4} checked={data.done[4]} onCheck={(v) => markDone(4, v)}>
        <p>
          Utiliza las fotografías seleccionadas para crear dos anuncios
          completos. Incorpora titular, identidad de marca, copy y CTA.
        </p>

        <div className="art14-grid">
          {data.ads.map((ad, index) => (
            <div className="art14-ad" key={ad.format}>
              <div className="art14-adhead">
                <span>ANUNCIO {index + 1}</span>
                <strong>
                  {ad.format === "4:5" ? "1080 × 1350" : "1080 × 1920"}
                </strong>
              </div>

              <div
                className={`art14-preview ${
                  ad.format === "9:16" ? "art14-preview--story" : ""
                }`}
              >
                <small>{data.brand || "TU MARCA"}</small>
                <div className="art14-preview-image">
                  FOTOGRAFÍA PUBLICITARIA
                </div>
                <strong>{ad.headline || "Tu titular aquí"}</strong>
                <span>{ad.cta || "Tu CTA aquí"}</span>
              </div>

              <label className="art14-field">
                <span>Fotografía base</span>
                <select
                  value={ad.photoId}
                  onChange={(e) =>
                    updateArray("ads", index, "photoId", e.target.value)
                  }
                >
                  {data.edits.map((edit) => (
                    <option key={edit.id} value={String(edit.id)}>
                      Fotografía mejorada {edit.id}
                    </option>
                  ))}
                </select>
              </label>

              <Field
                label="Titular"
                value={ad.headline}
                onChange={(v) => updateArray("ads", index, "headline", v)}
              />

              <Field
                label="Copy"
                value={ad.copy}
                onChange={(v) => updateArray("ads", index, "copy", v)}
                multiline
              />

              <Field
                label="CTA"
                value={ad.cta}
                onChange={(v) => updateArray("ads", index, "cta", v)}
              />

              <Field
                label="Decisiones de composición"
                value={ad.composition}
                onChange={(v) => updateArray("ads", index, "composition", v)}
                multiline
              />

              <Field
                label="Enlace al anuncio terminado"
                value={ad.link}
                onChange={(v) => updateArray("ads", index, "link", v)}
              />
            </div>
          ))}
        </div>

        <p className="art14-hint">
          Estas vistas previas son esquemas de composición. Diseña y exporta los
          anuncios reales en Canva, Photopea, Figma u otro editor.
        </p>
      </Step>

      <Step index={5} checked={data.done[5]} onCheck={(v) => markDone(5, v)}>
        <p>
          Verifica los entregables y registra cómo se produjeron los recursos.
          La evaluación valora el criterio creativo, no las herramientas de
          pago.
        </p>

        <div className="art14-deliverables">
          {[
            ["Moodboard", data.moodboard ? "Registrado" : "Pendiente"],
            ["Fotografías propuestas", `${photoCount}/3`],
            ["Fotografías mejoradas", `${editCount}/2`],
            ["Anuncios terminados", `${adCount}/2`],
          ].map(([name, status]) => (
            <div key={name}>
              <span>{name}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>

        <Field
          label="Herramientas utilizadas"
          value={data.tool}
          onChange={(v) => setField("tool", v)}
          placeholder="Ej. teléfono, ChatGPT, Canva, Photopea"
        />

        <Field
          label="Origen y permisos de uso de recursos"
          value={data.rights}
          onChange={(v) => setField("rights", v)}
          multiline
        />

        <Field
          label="¿Por qué seleccionaron esas fotografías?"
          value={data.justification}
          onChange={(v) => setField("justification", v)}
          multiline
        />

        <Field
          label="Registro de uso de IA y revisión ética"
          value={data.ethics}
          onChange={(v) => setField("ethics", v)}
          multiline
          placeholder="Distingue fotografías propias, imágenes generadas y ediciones"
        />

        <Field
          label="Enlace a carpeta de entrega"
          value={data.folder}
          onChange={(v) => setField("folder", v)}
        />

        <div className="art14-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Dirección de arte y coherencia", 10],
            ["Propuestas fotográficas", 10],
            ["Selección y mejora", 10],
            ["Dos anuncios finales", 15],
            ["Presentación y justificación", 5],
          ].map(([name, points]) => (
            <div key={name}>
              <span>{name}</span>
              <strong>{points} pts.</strong>
            </div>
          ))}
        </div>
      </Step>

      <footer className="art14-footer">
        <div className="art14-summary">
          <strong>{completed}/6 etapas</strong>
          <strong>{photoCount}/3 propuestas</strong>
          <strong>{editCount}/2 fotografías</strong>
          <strong>{adCount}/2 anuncios</strong>
        </div>

        <button type="button" onClick={downloadReport}>
          Descargar ficha de dirección de arte
        </button>

        <p>{notice}</p>

        <p>
          Trabajo autónomo: mejora los dos anuncios, crea tres fotografías
          adicionales y dos anuncios nuevos. Selecciona una imagen para
          recrearla con cámara o teléfono en la Semana 15.
        </p>
      </footer>
    </div>
  );
}
