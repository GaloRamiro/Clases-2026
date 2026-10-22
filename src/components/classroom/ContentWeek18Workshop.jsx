import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana18.css";

const RUBRIC = [
  { name: "Identidad de marca y propuesta de valor", max: 5 },
  { name: "Concepto y coherencia de campaña", max: 10 },
  { name: "Calidad de las nueve piezas seleccionadas", max: 10 },
  { name: "Fotografía y producción audiovisual", max: 10 },
  { name: "Cronopost, adaptación y KPIs", max: 5 },
  { name: "Calidad y organización del portafolio", max: 5 },
  { name: "Presentación, defensa y participación", max: 5 },
];

const DELIVERABLES = [
  "Portafolio creativo completo en PDF",
  "Presentación de defensa final",
  "Nueve piezas seleccionadas y optimizadas",
  "Anuncios audiovisuales MP4",
  "Manual breve de identidad visual",
  "Cronopost definitivo",
  "Dashboard con datos simulados",
  "Carpeta de archivos finales y editables disponibles",
  "Ficha de créditos, herramientas y aportes",
];

const DEFENSE = [
  { name: "Marca y propuesta de valor", minutes: 3 },
  { name: "Campaña y decisiones creativas", minutes: 5 },
  { name: "Portafolio y piezas", minutes: 4 },
  { name: "Preguntas del cliente", minutes: 3 },
];

function createTeam(id) {
  return {
    id,
    name: `Equipo ${id}`,
    brand: "",
    members: "",
    presentation: "",
    portfolio: "",
    folder: "",
    dashboard: "",
    concept: "",
    audience: "",
    value: "",
    strength: "",
    improvement: "",
    questions: "",
    feedback: "",
    scores: RUBRIC.map(() => 0),
    deliverables: DELIVERABLES.map(() => false),
    defenseMinutes: DEFENSE.map(() => 0),
    status: "Pendiente",
  };
}

function initialData() {
  return {
    teams: [createTeam(1)],
    activeId: 1,
    sessionNotes: "",
  };
}

function loadData(key) {
  const base = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || !Array.isArray(saved.teams)) return base;

    const teams = saved.teams
      .filter((team) => team && typeof team === "object")
      .map((team, index) => ({
        ...createTeam(index + 1),
        ...team,
        scores: RUBRIC.map((_, i) => Number(team.scores?.[i]) || 0),
        deliverables: DELIVERABLES.map((_, i) =>
          Boolean(team.deliverables?.[i]),
        ),
        defenseMinutes: DEFENSE.map(
          (_, i) => Number(team.defenseMinutes?.[i]) || 0,
        ),
      }));

    if (!teams.length) return base;

    return {
      ...base,
      ...saved,
      teams,
      activeId: teams.some((team) => team.id === saved.activeId)
        ? saved.activeId
        : teams[0].id,
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
    <label className="final18-field">
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
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function exportText(content, filename) {
  const blob = new Blob(["\uFEFF", content], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportCSV(rows, filename) {
  const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

  const csv = rows.map((row) => row.map(escapeCSV).join(";")).join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ContentWeek18Workshop({
  lessonId = "contenido-semana-18",
  studentName = "",
}) {
  const storageKey = `aula:semana18:${lessonId}:${studentName || "docente"}`;

  const [session, setSession] = useState(() => ({
    key: storageKey,
    data: loadData(storageKey),
  }));

  const [notice, setNotice] = useState("");

  const data = session.key === storageKey ? session.data : loadData(storageKey);

  const active =
    data.teams.find((team) => team.id === data.activeId) || data.teams[0];

  function save(next) {
    setSession({ key: storageKey, data: next });

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotice("Evaluación guardada en este navegador.");
    } catch {
      setNotice("No se pudo guardar la evaluación.");
    }
  }

  function updateTeam(field, value) {
    save({
      ...data,
      teams: data.teams.map((team) =>
        team.id === active.id ? { ...team, [field]: value } : team,
      ),
    });
  }

  function updateArray(field, index, value) {
    updateTeam(
      field,
      active[field].map((item, i) => (i === index ? value : item)),
    );
  }

  function addTeam() {
    const nextId = Math.max(0, ...data.teams.map((team) => team.id)) + 1;

    save({
      ...data,
      teams: [...data.teams, createTeam(nextId)],
      activeId: nextId,
    });
  }

  function removeTeam() {
    if (data.teams.length === 1) return;

    if (!window.confirm("¿Eliminar este equipo y su evaluación guardada?")) {
      return;
    }

    const remaining = data.teams.filter((team) => team.id !== active.id);

    save({
      ...data,
      teams: remaining,
      activeId: remaining[0].id,
    });
  }

  const total = active.scores.reduce(
    (sum, value, index) =>
      sum + Math.min(RUBRIC[index].max, Math.max(0, Number(value) || 0)),
    0,
  );

  const checked = active.deliverables.filter(Boolean).length;

  const minutes = active.defenseMinutes.reduce(
    (sum, value) => sum + (Number(value) || 0),
    0,
  );

  const evaluated = data.teams.filter(
    (team) => team.status === "Evaluado",
  ).length;

  function downloadAct() {
    const lines = [
      "AULA DIGITAL — ACTA DE DEFENSA FINAL",
      "SEMANA 18 — UN CAFÉ, MÚLTIPLES MARCAS",
      "",
      `Equipo: ${active.name}`,
      `Marca: ${active.brand}`,
      `Integrantes: ${active.members}`,
      `Estado: ${active.status}`,
      "",
      "DOCUMENTACIÓN",
      `Presentación: ${active.presentation}`,
      `Portafolio: ${active.portfolio}`,
      `Carpeta: ${active.folder}`,
      `Dashboard: ${active.dashboard}`,
      "",
      `Concepto creativo: ${active.concept}`,
      `Audiencia: ${active.audience}`,
      `Propuesta de valor: ${active.value}`,
      "",
      "ENTREGABLES",
      ...DELIVERABLES.map(
        (item, index) => `[${active.deliverables[index] ? "X" : " "}] ${item}`,
      ),
      "",
      "RÚBRICA FINAL",
      ...RUBRIC.map(
        (item, index) => `${item.name}: ${active.scores[index]}/${item.max}`,
      ),
      `TOTAL: ${total}/50`,
      "",
      "TIEMPOS DE DEFENSA",
      ...DEFENSE.map(
        (item, index) =>
          `${item.name}: ${active.defenseMinutes[index]} minutos`,
      ),
      `Total registrado: ${minutes} minutos`,
      "",
      `Fortaleza: ${active.strength}`,
      `Mejora prioritaria: ${active.improvement}`,
      `Preguntas: ${active.questions}`,
      `Retroalimentación: ${active.feedback}`,
    ];

    exportText(lines.join("\n"), `acta-semana18-equipo-${active.id}.txt`);
  }

  function downloadSummary() {
    const rows = [
      [
        "Equipo",
        "Marca",
        "Integrantes",
        ...RUBRIC.map((item) => item.name),
        "Total / 50",
        "Entregables / 9",
        "Estado",
        "Fortaleza",
        "Mejora",
      ],
      ...data.teams.map((team) => [
        team.name,
        team.brand,
        team.members,
        ...team.scores,
        team.scores.reduce(
          (sum, value, index) =>
            sum + Math.min(RUBRIC[index].max, Math.max(0, Number(value) || 0)),
          0,
        ),
        team.deliverables.filter(Boolean).length,
        team.status,
        team.strength,
        team.improvement,
      ]),
    ];

    exportCSV(rows, "evaluaciones-finales-semana18.csv");
  }

  return (
    <div className="final18">
      <header className="final18-hero">
        <span>SEMANA 18 · DEFENSA FINAL</span>
        <h2>Feria de agencias creativas</h2>
        <p>
          Cada equipo presenta una marca de café, una campaña integrada y un
          portafolio profesional. Evalúa resultados y argumentos con una rúbrica
          única de 50 puntos.
        </p>

        <div className="final18-overview">
          <div>
            <strong>{data.teams.length}</strong>
            <span>Equipos</span>
          </div>
          <div>
            <strong>{evaluated}</strong>
            <span>Evaluados</span>
          </div>
          <div>
            <strong>50</strong>
            <span>Puntos posibles</span>
          </div>
        </div>
      </header>

      <section className="final18-panel">
        <div className="final18-head">
          <h3>01 · Gestión de equipos</h3>
          <button type="button" onClick={addTeam}>
            + Agregar equipo
          </button>
        </div>

        <div className="final18-tabs">
          {data.teams.map((team) => (
            <button
              type="button"
              key={team.id}
              className={team.id === active.id ? "is-active" : ""}
              onClick={() => save({ ...data, activeId: team.id })}
            >
              {team.name}
            </button>
          ))}
        </div>

        <div className="final18-grid">
          <Field
            label="Nombre del equipo"
            value={active.name}
            onChange={(value) => updateTeam("name", value)}
          />
          <Field
            label="Marca de café"
            value={active.brand}
            onChange={(value) => updateTeam("brand", value)}
          />
        </div>

        <Field
          label="Integrantes del equipo"
          value={active.members}
          onChange={(value) => updateTeam("members", value)}
          multiline
          placeholder="Nombres de todos los integrantes"
        />

        <label className="final18-field">
          <span>Estado de la defensa</span>
          <select
            value={active.status}
            onChange={(event) => updateTeam("status", event.target.value)}
          >
            <option>Pendiente</option>
            <option>En preparación</option>
            <option>Presentando</option>
            <option>Evaluado</option>
            <option>Requiere correcciones</option>
          </select>
        </label>

        {data.teams.length > 1 && (
          <button type="button" className="final18-danger" onClick={removeTeam}>
            Eliminar equipo seleccionado
          </button>
        )}
      </section>

      <section className="final18-panel">
        <h3>02 · Documentación de la campaña</h3>

        <div className="final18-grid">
          <Field
            label="Enlace a la presentación"
            value={active.presentation}
            onChange={(value) => updateTeam("presentation", value)}
          />
          <Field
            label="Enlace al portafolio PDF"
            value={active.portfolio}
            onChange={(value) => updateTeam("portfolio", value)}
          />
          <Field
            label="Carpeta de archivos finales"
            value={active.folder}
            onChange={(value) => updateTeam("folder", value)}
          />
          <Field
            label="Dashboard de resultados simulados"
            value={active.dashboard}
            onChange={(value) => updateTeam("dashboard", value)}
          />
        </div>

        <Field
          label="Concepto creativo de campaña"
          value={active.concept}
          onChange={(value) => updateTeam("concept", value)}
          multiline
        />

        <div className="final18-grid">
          <Field
            label="Audiencia y Buyer Persona"
            value={active.audience}
            onChange={(value) => updateTeam("audience", value)}
            multiline
          />
          <Field
            label="Propuesta de valor"
            value={active.value}
            onChange={(value) => updateTeam("value", value)}
            multiline
          />
        </div>
      </section>

      <section className="final18-panel">
        <div className="final18-head">
          <h3>03 · Auditoría de entregables</h3>
          <strong>{checked}/9 verificados</strong>
        </div>

        <div className="final18-progress">
          <span style={{ width: `${(checked / 9) * 100}%` }} />
        </div>

        <div className="final18-checklist">
          {DELIVERABLES.map((item, index) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={active.deliverables[index]}
                onChange={(event) =>
                  updateArray("deliverables", index, event.target.checked)
                }
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        <div className="final18-note">
          El dashboard debe indicar claramente que utiliza datos simulados. Los
          archivos deben estar identificados y sus enlaces accesibles.
        </div>
      </section>

      <section className="final18-panel">
        <h3>04 · Estructura de la defensa</h3>
        <p>
          Tiempo sugerido: 15 minutos por equipo. Registra los minutos reales de
          cada sección para comprobar la distribución.
        </p>

        <div className="final18-defense">
          {DEFENSE.map((item, index) => (
            <div className="final18-defenseitem" key={item.name}>
              <div>
                <strong>{item.name}</strong>
                <small>Referencia: {item.minutes} minutos</small>
              </div>

              <label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={active.defenseMinutes[index]}
                  onChange={(event) =>
                    updateArray(
                      "defenseMinutes",
                      index,
                      Math.max(0, Number(event.target.value) || 0),
                    )
                  }
                />
                <span>min</span>
              </label>
            </div>
          ))}
        </div>

        <div className="final18-time">
          <strong>{minutes} / 15 minutos registrados</strong>
          <span>
            {minutes > 15
              ? "La defensa superó el tiempo de referencia."
              : "Distribución del tiempo de presentación."}
          </span>
        </div>
      </section>

      <section className="final18-panel">
        <div className="final18-head">
          <h3>05 · Rúbrica de evaluación</h3>
          <div className="final18-score">
            <strong>{total}</strong>
            <span>/ 50 puntos</span>
          </div>
        </div>

        <p>
          Asigna el puntaje obtenido en cada criterio. Los campos respetan
          automáticamente el máximo permitido.
        </p>

        <div className="final18-rubric">
          {RUBRIC.map((item, index) => (
            <div className="final18-rubricrow" key={item.name}>
              <div>
                <strong>{item.name}</strong>
                <small>Máximo {item.max} puntos</small>
              </div>

              <div className="final18-rubricinput">
                <input
                  type="number"
                  min="0"
                  max={item.max}
                  step="0.5"
                  value={active.scores[index]}
                  onChange={(event) => {
                    const number = Number(event.target.value);
                    updateArray(
                      "scores",
                      index,
                      Math.min(
                        item.max,
                        Math.max(0, Number.isFinite(number) ? number : 0),
                      ),
                    );
                  }}
                />
                <span>/ {item.max}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="final18-result">
          <span>CALIFICACIÓN DEL PROYECTO FINAL</span>
          <strong>{total} / 50</strong>
        </div>
      </section>

      <section className="final18-panel">
        <h3>06 · Retroalimentación profesional</h3>

        <Field
          label="Principal fortaleza de la campaña"
          value={active.strength}
          onChange={(value) => updateTeam("strength", value)}
          multiline
        />

        <Field
          label="Mejora prioritaria"
          value={active.improvement}
          onChange={(value) => updateTeam("improvement", value)}
          multiline
        />

        <Field
          label="Preguntas realizadas durante la defensa"
          value={active.questions}
          onChange={(value) => updateTeam("questions", value)}
          multiline
        />

        <Field
          label="Observaciones finales del docente"
          value={active.feedback}
          onChange={(value) => updateTeam("feedback", value)}
          multiline
        />
      </section>

      <footer className="final18-footer">
        <div className="final18-summary">
          <strong>{active.name}</strong>
          <strong>{checked}/9 entregables</strong>
          <strong>{total}/50 puntos</strong>
        </div>

        <div className="final18-actions">
          <WorkshopDownloadButton
            studentName={studentName}
            lesson={{
              courseId: "contenido",
              number: 18,
              title:
                "De una idea a una marca. Hoy presentas tu campaña al mundo.",
            }}
            title={`Acta de defensa final - ${active.name}`}
            answers={{
              "Equipo evaluado": active.name,
              "Marca de café": active.brand,
              Integrantes: active.members,
              "Estado de la defensa": active.status,

              "DOCUMENTACIÓN - Presentación final": active.presentation,
              "DOCUMENTACIÓN - Portafolio PDF": active.portfolio,
              "DOCUMENTACIÓN - Carpeta de archivos": active.folder,
              "DOCUMENTACIÓN - Dashboard de datos simulados": active.dashboard,

              "Concepto creativo de campaña": active.concept,
              "Audiencia y Buyer Persona": active.audience,
              "Propuesta de valor": active.value,

              ...Object.fromEntries(
                DELIVERABLES.map((item, index) => [
                  `ENTREGABLE - ${item}`,
                  active.deliverables[index] ? "Verificado" : "Pendiente",
                ]),
              ),

              "Entregables verificados": `${checked} de ${DELIVERABLES.length}`,

              ...Object.fromEntries(
                RUBRIC.map((item, index) => [
                  `RÚBRICA - ${item.name}`,
                  `${Math.min(
                    item.max,
                    Math.max(0, Number(active.scores[index]) || 0),
                  )} de ${item.max} puntos`,
                ]),
              ),

              "CALIFICACIÓN FINAL": `${total} de 50 puntos`,

              ...Object.fromEntries(
                DEFENSE.map((item, index) => [
                  `DEFENSA - ${item.name}`,
                  `${active.defenseMinutes[index]} minutos (referencia: ${item.minutes})`,
                ]),
              ),

              "Tiempo total de defensa": `${minutes} minutos`,

              "Tiempo de referencia": "15 minutos",

              "Principal fortaleza de la campaña": active.strength,

              "Mejora prioritaria": active.improvement,

              "Preguntas realizadas durante la defensa": active.questions,

              "Observaciones finales del docente": active.feedback,

              "Notas generales de la sesión": data.sessionNotes,

              "Total de equipos registrados": data.teams.length,

              "Equipos evaluados": evaluated,
            }}
          />

          <button
            type="button"
            className="final18-secondary"
            onClick={downloadSummary}
          >
            Descargar consolidado CSV
          </button>
        </div>

        <p>{notice}</p>

        <p>
          Evaluación final: considera la calidad del resultado, la evolución
          durante el semestre y la participación de todos los integrantes.
        </p>
      </footer>
    </div>
  );
}
