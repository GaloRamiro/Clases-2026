import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana11.css";

const STAGES = [
  {
    key: "TOFU",
    title: "Descubrimiento",
    purpose: "Atraer y despertar interés",
    example: "Tres errores al preparar café",
    cta: "Descubre más consejos",
    format: "Carrusel",
  },
  {
    key: "MOFU",
    title: "Consideración",
    purpose: "Informar y generar confianza",
    example: "Cómo elegir la variedad de café adecuada",
    cta: "Conoce nuestras variedades",
    format: "Video demostrativo",
  },
  {
    key: "BOFU",
    title: "Decisión",
    purpose: "Facilitar una acción",
    example: "Conoce las opciones de nuestro café",
    cta: "Consulta las opciones disponibles",
    format: "Post comercial",
  },
];

const createInitial = () => ({
  team: "",
  brand: "",
  campaign: "",
  persona: "",
  consumerNeeds: STAGES.map((stage) => ({
    stage: stage.key,
    situation: "",
    need: "",
    message: "",
  })),
  pieces: STAGES.map((stage) => ({
    stage: stage.key,
    format: stage.format,
    title: "",
    copy: "",
    cta: "",
    visual: "",
    link: "",
    status: "Idea",
    justification: "",
  })),
  calendar: STAGES.map((stage) => ({
    stage: stage.key,
    day: "",
    platform: "Instagram",
  })),
  review: "",
  evidence: "",
  done: Array(6).fill(false),
});

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}) {
  return (
    <label className="funnel11-field">
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

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="funnel11-field">
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

function LabStep({ number, title, minutes, checked, onCheck, children }) {
  return (
    <section className="funnel11-panel">
      <div className="funnel11-step-heading">
        <h3>
          <span>{number}</span> {title}
        </h3>
        <small>{minutes} minutos</small>
      </div>

      {children}

      <label className="funnel11-complete">
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

function PieceEditor({ piece, stage, onChange }) {
  return (
    <div className="funnel11-piece">
      <div className="funnel11-piece-heading">
        <strong>{stage.key}</strong>
        <div>
          <h4>{stage.title}</h4>
          <p>{stage.purpose}</p>
        </div>
      </div>

      <div className="funnel11-grid">
        <SelectField
          label="Formato"
          value={piece.format}
          options={[
            "Post",
            "Carrusel",
            "Historia",
            "Reel",
            "Video demostrativo",
            "Post comercial",
            "Infografía",
          ]}
          onChange={(v) => onChange("format", v)}
        />

        <SelectField
          label="Estado de producción"
          value={piece.status}
          options={["Idea", "Redacción", "Diseño", "Revisión", "Lista"]}
          onChange={(v) => onChange("status", v)}
        />
      </div>

      <TextField
        label="Titular o gancho"
        value={piece.title}
        onChange={(v) => onChange("title", v)}
        placeholder={stage.example}
      />

      <TextField
        label="Copy de la publicación"
        value={piece.copy}
        onChange={(v) => onChange("copy", v)}
        multiline
        placeholder="Redacta el mensaje completo para tu público."
      />

      <TextField
        label="Llamado a la acción (CTA)"
        value={piece.cta}
        onChange={(v) => onChange("cta", v)}
        placeholder={stage.cta}
      />

      <TextField
        label="Descripción de la composición visual"
        value={piece.visual}
        onChange={(v) => onChange("visual", v)}
        multiline
        placeholder="Colores, fotografía, tipografía, jerarquía y distribución."
      />

      <TextField
        label="Enlace al diseño o video terminado"
        value={piece.link}
        onChange={(v) => onChange("link", v)}
        placeholder="https://..."
      />

      <TextField
        label="¿Por qué funciona en esta etapa?"
        value={piece.justification}
        onChange={(v) => onChange("justification", v)}
        multiline
      />
    </div>
  );
}

function loadData(key) {
  const base = createInitial();

  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");

    if (!raw || typeof raw !== "object") {
      return base;
    }

    return {
      ...base,
      ...raw,
      consumerNeeds: base.consumerNeeds.map((item, i) => ({
        ...item,
        ...(raw.consumerNeeds?.[i] || {}),
      })),
      pieces: base.pieces.map((item, i) => ({
        ...item,
        ...(raw.pieces?.[i] || {}),
      })),
      calendar: base.calendar.map((item, i) => ({
        ...item,
        ...(raw.calendar?.[i] || {}),
      })),
      done: base.done.map((_, i) => Boolean(raw.done?.[i])),
    };
  } catch {
    return base;
  }
}

export default function ContentWeek11Workshop({
  lessonId = "contenido-semana-11",
  studentName = "",
}) {
  const storageKey = `aula:semana11:${lessonId}:${studentName || "anonimo"}`;

  const [session, setSession] = useState(() => ({
    key: storageKey,
    data: loadData(storageKey),
  }));

  const [notice, setNotice] = useState("");

  const data = session.key === storageKey ? session.data : loadData(storageKey);

  function save(next) {
    setSession({ key: storageKey, data: next });

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotice("Cambios guardados en este navegador.");
    } catch {
      setNotice("No se pudo guardar. Revisa el almacenamiento del navegador.");
    }
  }

  function setField(field, value) {
    save({ ...data, [field]: value });
  }

  function setNeed(index, field, value) {
    setField(
      "consumerNeeds",
      data.consumerNeeds.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function setPiece(index, field, value) {
    setField(
      "pieces",
      data.pieces.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function setCalendar(index, field, value) {
    setField(
      "calendar",
      data.calendar.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function markDone(index, checked) {
    setField(
      "done",
      data.done.map((item, i) => (i === index ? checked : item)),
    );
  }

  const completed = data.done.filter(Boolean).length;

  const ready = data.pieces.filter(
    (piece) =>
      piece.status === "Lista" &&
      piece.title.trim() &&
      piece.copy.trim() &&
      piece.cta.trim() &&
      piece.link.trim(),
  ).length;

  function exportReport() {
    const lines = [
      "LABORATORIO 11 — EMBUDO DE CONTENIDOS",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Buyer Persona: ${data.persona}`,
      "",
      "MAPA DEL CONSUMIDOR",
    ];

    data.consumerNeeds.forEach((item) => {
      lines.push(
        "",
        item.stage,
        `Situación: ${item.situation}`,
        `Necesidad: ${item.need}`,
        `Mensaje: ${item.message}`,
      );
    });

    lines.push("", "PIEZAS DE CONTENIDO");

    data.pieces.forEach((piece) => {
      lines.push(
        "",
        piece.stage,
        `Formato: ${piece.format}`,
        `Titular: ${piece.title}`,
        `Copy: ${piece.copy}`,
        `CTA: ${piece.cta}`,
        `Composición: ${piece.visual}`,
        `Estado: ${piece.status}`,
        `Archivo: ${piece.link}`,
        `Justificación: ${piece.justification}`,
      );
    });

    lines.push("", "CRONOPOST");

    data.calendar.forEach((item) => {
      lines.push(`${item.stage}: día ${item.day} · ${item.platform}`);
    });

    lines.push("", "REVISIÓN", data.review, "", `Evidencias: ${data.evidence}`);

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "laboratorio-semana11.txt";
    anchor.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="funnel11">
      <header className="funnel11-hero">
        <span>LABORATORIO 11 · 60 MINUTOS</span>
        <h2>Tres contenidos, tres momentos</h2>
        <p>
          Construye un embudo de contenidos y produce una pieza para atraer,
          otra para informar y una tercera para facilitar una decisión.
        </p>

        <div className="funnel11-progress">
          <strong>{completed} de 6 etapas completadas</strong>
          <div>
            <span
              style={{
                width: `${(completed / 6) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      <section className="funnel11-panel">
        <h3>Identificación del equipo</h3>

        <div className="funnel11-grid">
          <TextField
            label="Equipo"
            value={data.team}
            onChange={(v) => setField("team", v)}
          />
          <TextField
            label="Marca de café"
            value={data.brand}
            onChange={(v) => setField("brand", v)}
          />
        </div>

        <TextField
          label="Campaña desarrollada en la Semana 10"
          value={data.campaign}
          onChange={(v) => setField("campaign", v)}
        />

        <TextField
          label="Buyer Persona"
          value={data.persona}
          onChange={(v) => setField("persona", v)}
          multiline
        />
      </section>

      <LabStep
        number="01"
        title="Identifica las necesidades"
        minutes={10}
        checked={data.done[0]}
        onCheck={(v) => markDone(0, v)}
      >
        <p>
          Imagina tres consumidores en momentos diferentes. Describe su
          situación, qué necesitan saber y qué mensaje podría ayudarlos.
        </p>

        {data.consumerNeeds.map((item, index) => (
          <div className="funnel11-subcard" key={item.stage}>
            <h4>
              {item.stage} · {STAGES[index].title}
            </h4>

            <div className="funnel11-grid">
              <TextField
                label="Situación del consumidor"
                value={item.situation}
                onChange={(v) => setNeed(index, "situation", v)}
              />

              <TextField
                label="Necesidad o duda"
                value={item.need}
                onChange={(v) => setNeed(index, "need", v)}
              />
            </div>

            <TextField
              label="Mensaje apropiado"
              value={item.message}
              onChange={(v) => setNeed(index, "message", v)}
              multiline
            />
          </div>
        ))}
      </LabStep>

      <LabStep
        number="02"
        title="Selecciona formatos y redacta"
        minutes={10}
        checked={data.done[1]}
        onCheck={(v) => markDone(1, v)}
      >
        <p>
          Selecciona el formato de cada etapa y escribe un titular, copy y CTA
          diferentes.
        </p>

        {data.pieces.map((piece, index) => (
          <div className="funnel11-subcard" key={piece.stage}>
            <h4>{piece.stage}</h4>

            <SelectField
              label="Formato"
              value={piece.format}
              options={[
                "Post",
                "Carrusel",
                "Historia",
                "Reel",
                "Video demostrativo",
                "Post comercial",
                "Infografía",
              ]}
              onChange={(v) => setPiece(index, "format", v)}
            />

            <TextField
              label="Titular"
              value={piece.title}
              onChange={(v) => setPiece(index, "title", v)}
              placeholder={STAGES[index].example}
            />

            <TextField
              label="Copy"
              value={piece.copy}
              onChange={(v) => setPiece(index, "copy", v)}
              multiline
            />

            <TextField
              label="CTA"
              value={piece.cta}
              onChange={(v) => setPiece(index, "cta", v)}
              placeholder={STAGES[index].cta}
            />
          </div>
        ))}
      </LabStep>

      {STAGES.map((stage, index) => (
        <LabStep
          key={stage.key}
          number={`0${index + 3}`}
          title={`Diseña la pieza ${stage.key}`}
          minutes={index === 0 ? 15 : 10}
          checked={data.done[index + 2]}
          onCheck={(v) => markDone(index + 2, v)}
        >
          <p>
            {stage.purpose}. Utiliza la identidad visual de la Semana 8 y adapta
            la composición a esta etapa.
          </p>

          <PieceEditor
            piece={data.pieces[index]}
            stage={stage}
            onChange={(field, value) => setPiece(index, field, value)}
          />
        </LabStep>
      ))}

      <LabStep
        number="06"
        title="Revisión y entrega"
        minutes={5}
        checked={data.done[5]}
        onCheck={(v) => markDone(5, v)}
      >
        <p>
          Comprueba que las tres piezas sean diferentes, mantengan la identidad
          visual y tengan un CTA adecuado.
        </p>

        <h4>Integra las piezas al cronopost</h4>

        {data.calendar.map((item, index) => (
          <div className="funnel11-grid" key={item.stage}>
            <TextField
              label={`${item.stage} · Día de publicación`}
              value={item.day}
              onChange={(v) => setCalendar(index, "day", v)}
              placeholder="Ej. 3"
            />

            <SelectField
              label="Plataforma"
              value={item.platform}
              options={["Instagram", "TikTok", "Facebook", "Otra"]}
              onChange={(v) => setCalendar(index, "platform", v)}
            />
          </div>
        ))}

        <TextField
          label="¿Cómo se complementan las tres piezas?"
          value={data.review}
          onChange={(v) => setField("review", v)}
          multiline
        />

        <TextField
          label="Enlace a la carpeta de evidencias"
          value={data.evidence}
          onChange={(v) => setField("evidence", v)}
        />

        <div className="funnel11-rubric">
          <h4>Rúbrica · 50 puntos</h4>

          {[
            ["Necesidades por etapa", 5],
            ["Pieza TOFU", 10],
            ["Pieza MOFU", 10],
            ["Pieza BOFU", 10],
            ["Copywriting y CTA", 10],
            ["Presentación y justificación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points} pts.</strong>
            </div>
          ))}
        </div>
      </LabStep>

      <footer className="funnel11-footer">
        <div className="funnel11-summary">
          <strong>{ready}/3 piezas listas</strong>
          <strong>{completed}/6 etapas</strong>
        </div>

        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "contenido",
            number: 11,
            title: "Embudo de contenidos: TOFU, MOFU y BOFU",
          }}
          title="Laboratorio 11: Tres contenidos, tres momentos"
          answers={{
            "Nombre del equipo": data.team,
            "Marca de café": data.brand,
            "Campaña de la Semana 10": data.campaign,
            "Buyer Persona": data.persona,

            ...Object.fromEntries(
              data.consumerNeeds.flatMap((item) => [
                [`${item.stage} - Situación del consumidor`, item.situation],
                [`${item.stage} - Necesidad o duda`, item.need],
                [`${item.stage} - Mensaje apropiado`, item.message],
              ]),
            ),

            ...Object.fromEntries(
              data.pieces.flatMap((piece) => [
                [`${piece.stage} - Formato`, piece.format],
                [`${piece.stage} - Titular`, piece.title],
                [`${piece.stage} - Copy publicitario`, piece.copy],
                [`${piece.stage} - CTA`, piece.cta],
                [`${piece.stage} - Composición visual`, piece.visual],
                [`${piece.stage} - Estado de producción`, piece.status],
                [`${piece.stage} - Enlace al diseño`, piece.link],
                [`${piece.stage} - Justificación`, piece.justification],
              ]),
            ),

            ...Object.fromEntries(
              data.calendar.flatMap((item) => [
                [`Cronopost ${item.stage} - Día de publicación`, item.day],
                [`Cronopost ${item.stage} - Plataforma`, item.platform],
              ]),
            ),

            "Complementariedad de las tres piezas": data.review,
            "Enlace a la carpeta de evidencias": data.evidence,

            "Piezas listas con evidencias": `${ready} de 3`,

            ...Object.fromEntries(
              data.done.map((checked, index) => [
                `Etapa ${index + 1} completada`,
                checked ? "Sí" : "No",
              ]),
            ),

            "Progreso general": `${completed} de 6 etapas`,
          }}
        />

        <p>{notice}</p>

        <p>
          Trabajo autónomo: mejora las tres piezas del laboratorio y crea otras
          tres, una por cada etapa del embudo. Integra las seis al cronopost y
          entrega los diseños y el PDF en Moodle.
        </p>
      </footer>
    </div>
  );
}
