import { useState } from "react";
import "../../styles/contenidoSemana10.css";

const initialData = () => ({
  team: "",
  brand: "",
  campaign: "",
  audience: "",
  smart: "",
  message: "",
  cta: "",
  channels: "Instagram, TikTok",
  budget: { ads: 60, production: 30, reserve: 10 },
  phases: [
    { name: "Expectativa", days: "1–5", action: "" },
    { name: "Lanzamiento", days: "6–10", action: "" },
    { name: "Continuidad", days: "11–15", action: "" },
  ],
  pieces: [
    {
      name: "Anuncio principal",
      format: "Post",
      title: "",
      copy: "",
      cta: "",
      link: "",
      status: "Idea",
    },
    {
      name: "Historia de expectativa",
      format: "Historia",
      title: "",
      copy: "",
      cta: "",
      link: "",
      status: "Idea",
    },
    {
      name: "Pieza complementaria",
      format: "Carrusel",
      title: "",
      copy: "",
      cta: "",
      link: "",
      status: "Idea",
    },
  ],
  calendar: "",
  justification: "",
  indicator: "",
  evidence: "",
  done: Array(6).fill(false),
});

function Input({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
  type = "text",
}) {
  return (
    <label className="camp10-field">
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
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Step({ number, title, time, children, done, onDone }) {
  return (
    <section className="camp10-panel">
      <div className="camp10-stephead">
        <h3>
          {number}. {title}
        </h3>
        <span>{time} min</span>
      </div>
      {children}
      <label className="camp10-check">
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => onDone(e.target.checked)}
        />
        Etapa completada
      </label>
    </section>
  );
}

export default function ContentWeek10Workshop({
  lessonId = "contenido-semana-10",
  studentName = "",
}) {
  const key = `aula:semana10:${lessonId}:${studentName}`;

  const [session, setSession] = useState(() => ({
    key,
    data: load(key),
  }));

  function load(storageKey) {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!saved) return initialData();

      const base = initialData();
      return {
        ...base,
        ...saved,
        budget: { ...base.budget, ...saved.budget },
        phases: base.phases.map((p, i) => ({
          ...p,
          ...saved.phases?.[i],
        })),
        pieces: base.pieces.map((p, i) => ({
          ...p,
          ...saved.pieces?.[i],
        })),
        done: base.done.map((_, i) => Boolean(saved.done?.[i])),
      };
    } catch {
      return initialData();
    }
  }

  const data = session.key === key ? session.data : load(key);

  const [message, setMessage] = useState("");

  function save(next) {
    setSession({ key, data: next });
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setMessage("Cambios guardados en este navegador.");
    } catch {
      setMessage("No se pudo guardar en este navegador.");
    }
  }

  const set = (field, value) => save({ ...data, [field]: value });

  const setBudget = (field, value) =>
    set("budget", {
      ...data.budget,
      [field]: Math.max(0, Number(value) || 0),
    });

  const setPhase = (index, field, value) =>
    set(
      "phases",
      data.phases.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );

  const setPiece = (index, field, value) =>
    set(
      "pieces",
      data.pieces.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    );

  const mark = (index, value) =>
    set(
      "done",
      data.done.map((x, i) => (i === index ? value : x)),
    );

  const total = Object.values(data.budget).reduce(
    (sum, amount) => sum + Number(amount || 0),
    0,
  );

  const ready = data.pieces.filter(
    (p) =>
      p.status === "Lista" &&
      p.title.trim() &&
      p.copy.trim() &&
      p.cta.trim() &&
      p.link.trim(),
  ).length;

  const progress = data.done.filter(Boolean).length;

  function download() {
    const report = [
      "LABORATORIO 10 — CAMPAÑA DIGITAL",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Audiencia: ${data.audience}`,
      `Objetivo SMART: ${data.smart}`,
      `Mensaje: ${data.message}`,
      `CTA principal: ${data.cta}`,
      `Canales: ${data.channels}`,
      "",
      "PRESUPUESTO SIMULADO (USD)",
      `Difusión: ${data.budget.ads}`,
      `Producción: ${data.budget.production}`,
      `Reserva: ${data.budget.reserve}`,
      `Total: ${total}`,
      "",
      "FASES",
      ...data.phases.map((p) => `${p.name} (${p.days}): ${p.action}`),
      "",
      "ANUNCIOS",
      ...data.pieces.flatMap((p) => [
        p.name,
        `Formato: ${p.format}`,
        `Titular: ${p.title}`,
        `Copy: ${p.copy}`,
        `CTA: ${p.cta}`,
        `Estado: ${p.status}`,
        `Archivo: ${p.link}`,
        "",
      ]),
      "CRONOPOST",
      data.calendar,
      "",
      "JUSTIFICACIÓN",
      data.justification,
      "",
      `Indicador: ${data.indicator}`,
      `Evidencias: ${data.evidence}`,
    ].join("\n");

    const blob = new Blob([report], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "campana-semana10.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="camp10">
      <header className="camp10-hero">
        <span>LABORATORIO 10 · 60 MINUTOS</span>
        <h2>Lanza tu marca de café</h2>
        <p>
          Diseña una campaña digital de 15 días y prepara tres piezas
          publicitarias para presentarla.
        </p>

        <div className="camp10-progress">
          <strong>{progress} de 6 etapas completadas</strong>
          <div>
            <span style={{ width: `${(progress / 6) * 100}%` }} />
          </div>
        </div>
      </header>

      <section className="camp10-panel">
        <h3>Datos del proyecto</h3>
        <div className="camp10-grid">
          <Input
            label="Equipo"
            value={data.team}
            onChange={(v) => set("team", v)}
          />
          <Input
            label="Marca de café"
            value={data.brand}
            onChange={(v) => set("brand", v)}
          />
        </div>
      </section>

      <Step
        number="01"
        title="Objetivo, audiencia y mensaje"
        time={10}
        done={data.done[0]}
        onDone={(v) => mark(0, v)}
      >
        <p>
          Define qué deseas conseguir, a quién quieres llegar y qué idea
          recordará el consumidor.
        </p>

        <Input
          label="Nombre de campaña"
          value={data.campaign}
          onChange={(v) => set("campaign", v)}
          placeholder="Ej. Tu historia comienza con una taza"
        />
        <Input
          label="Buyer Persona"
          value={data.audience}
          onChange={(v) => set("audience", v)}
          multiline
        />
        <Input
          label="Objetivo SMART"
          value={data.smart}
          onChange={(v) => set("smart", v)}
          multiline
          placeholder="Meta, indicador y plazo de 15 días"
        />
        <Input
          label="Mensaje principal"
          value={data.message}
          onChange={(v) => set("message", v)}
          multiline
        />
        <Input
          label="CTA principal"
          value={data.cta}
          onChange={(v) => set("cta", v)}
        />
      </Step>

      <Step
        number="02"
        title="Fases, canales y presupuesto"
        time={10}
        done={data.done[1]}
        onDone={(v) => mark(1, v)}
      >
        <Input
          label="Canales seleccionados"
          value={data.channels}
          onChange={(v) => set("channels", v)}
        />

        <div className="camp10-grid">
          {data.phases.map((phase, index) => (
            <div className="camp10-subcard" key={phase.name}>
              <h4>{phase.name}</h4>
              <Input
                label="Días"
                value={phase.days}
                onChange={(v) => setPhase(index, "days", v)}
              />
              <Input
                label="Acción o contenido"
                value={phase.action}
                onChange={(v) => setPhase(index, "action", v)}
                multiline
              />
            </div>
          ))}
        </div>

        <h4>Presupuesto simulado en USD</h4>
        <div className="camp10-grid camp10-budget">
          <Input
            label="Difusión pagada"
            type="number"
            value={data.budget.ads}
            onChange={(v) => setBudget("ads", v)}
          />
          <Input
            label="Producción"
            type="number"
            value={data.budget.production}
            onChange={(v) => setBudget("production", v)}
          />
          <Input
            label="Reserva"
            type="number"
            value={data.budget.reserve}
            onChange={(v) => setBudget("reserve", v)}
          />
          <div className="camp10-total">
            <span>Total simulado</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
        <p className="camp10-note">No debes gastar dinero real.</p>
      </Step>

      <Step
        number="03"
        title="Anuncio principal"
        time={20}
        done={data.done[2]}
        onDone={(v) => mark(2, v)}
      >
        <p>
          Diseña la pieza central de la campaña utilizando la identidad visual
          desarrollada en la Semana 8.
        </p>
        <PieceEditor
          piece={data.pieces[0]}
          onChange={(field, value) => setPiece(0, field, value)}
        />
      </Step>

      <Step
        number="04"
        title="Dos piezas complementarias"
        time={10}
        done={data.done[3]}
        onDone={(v) => mark(3, v)}
      >
        <p>
          Crea una historia de expectativa y otra pieza que complemente el
          lanzamiento.
        </p>

        {data.pieces.slice(1).map((piece, i) => (
          <div className="camp10-subcard" key={piece.name}>
            <h4>{piece.name}</h4>
            <PieceEditor
              piece={piece}
              onChange={(field, value) => setPiece(i + 1, field, value)}
            />
          </div>
        ))}
      </Step>

      <Step
        number="05"
        title="Integración al cronopost"
        time={5}
        done={data.done[4]}
        onDone={(v) => mark(4, v)}
      >
        <p>
          Indica en qué días publicarás las piezas y justifica la secuencia de
          lanzamiento.
        </p>
        <Input
          label="Días, plataformas y publicaciones"
          value={data.calendar}
          onChange={(v) => set("calendar", v)}
          multiline
          placeholder="Día 2: expectativa; día 6: anuncio principal..."
        />
        <Input
          label="Justificación de la estrategia creativa"
          value={data.justification}
          onChange={(v) => set("justification", v)}
          multiline
        />
      </Step>

      <Step
        number="06"
        title="Presentación y entrega"
        time={5}
        done={data.done[5]}
        onDone={(v) => mark(5, v)}
      >
        <p>
          Presenta tu objetivo, concepto y tres anuncios. Explica por qué cada
          pieza ayuda a la campaña.
        </p>

        <Input
          label="Indicador para evaluar la campaña"
          value={data.indicator}
          onChange={(v) => set("indicator", v)}
          placeholder="Ej. Visualizaciones acumuladas"
        />
        <Input
          label="Enlace a carpeta de evidencias"
          value={data.evidence}
          onChange={(v) => set("evidence", v)}
        />

        <div className="camp10-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Objetivo SMART y audiencia", 10],
            ["Estrategia, fases y canales", 10],
            ["Anuncio principal", 15],
            ["Dos piezas complementarias", 10],
            ["Presentación y justificación", 5],
          ].map(([label, score]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{score} pts.</strong>
            </div>
          ))}
        </div>
      </Step>

      <footer className="camp10-footer">
        <div className="camp10-summary">
          <strong>{ready}/3 anuncios completos</strong>
          <strong>{progress}/6 etapas</strong>
          <strong>${total.toFixed(2)} simulados</strong>
        </div>

        <button type="button" onClick={download}>
          Descargar ficha de campaña
        </button>

        <p>{message}</p>
        <p>
          La ficha se descarga en TXT. Los diseños y videos se crean en un
          editor externo y se entregan en Moodle mediante archivos o enlaces.
        </p>
      </footer>
    </div>
  );
}

function PieceEditor({ piece, onChange }) {
  return (
    <div className="camp10-piece">
      <div className="camp10-grid">
        <label className="camp10-field">
          <span>Formato</span>
          <select
            value={piece.format}
            onChange={(e) => onChange("format", e.target.value)}
          >
            {["Post", "Historia", "Carrusel", "Reel", "Video"].map((format) => (
              <option key={format}>{format}</option>
            ))}
          </select>
        </label>

        <label className="camp10-field">
          <span>Estado</span>
          <select
            value={piece.status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            {["Idea", "Diseño", "Revisión", "Lista"].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>

      <Input
        label="Titular"
        value={piece.title}
        onChange={(v) => onChange("title", v)}
      />
      <Input
        label="Copy publicitario"
        value={piece.copy}
        onChange={(v) => onChange("copy", v)}
        multiline
      />
      <Input
        label="CTA"
        value={piece.cta}
        onChange={(v) => onChange("cta", v)}
      />
      <Input
        label="Enlace al diseño terminado"
        value={piece.link}
        onChange={(v) => onChange("link", v)}
      />
    </div>
  );
}
