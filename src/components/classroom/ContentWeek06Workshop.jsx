import { useState } from "react";
import "../../styles/contenidoSemana06.css";

const STAGES = [
  { title: "Construye tu brief", time: 15 },
  { title: "Prompt e ideación", time: 10 },
  { title: "Evalúa tres conceptos", time: 10 },
  { title: "Prototipo publicitario", time: 15 },
  { title: "Revisión estratégica", time: 5 },
  { title: "Defensa y entrega", time: 5 },
];

const CRITERIA = [
  { key: "relevance", label: "Relevancia" },
  { key: "difference", label: "Diferenciación" },
  { key: "coherence", label: "Coherencia" },
  { key: "viability", label: "Viabilidad" },
];

const createConcept = (type) => ({
  type,
  name: "",
  idea: "",
  message: "",
  application: "",
  justification: "",
  relevance: 0,
  difference: 0,
  coherence: 0,
  viability: 0,
});

function initialData() {
  return {
    team: "",
    brand: "",
    problem: "",
    objective: "",
    audience: "",
    insight: "",
    keyMessage: "",
    deliverables: "",
    restrictions: "",
    brandVoice: "",

    promptExtra: "",
    aiResponse: "",
    aiReview: "",
    ideationMethod: "IA",

    concepts: [
      createConcept("Emocional"),
      createConcept("Educativo"),
      createConcept("Experiencial"),
    ],

    selectedConcept: "",
    selectionReason: "",

    prototypeFormat: "Publicación estática",
    prototypeHeadline: "",
    prototypeCopy: "",
    prototypeCta: "",
    prototypeVisual: "",
    prototypeLink: "",

    reviewAudience: false,
    reviewMessage: false,
    reviewVoice: false,
    reviewClaims: false,
    reviewResources: false,

    presentation: "",
    teamDecision: "",
    deliveryLink: "",
    completed: Array(6).fill(false),
  };
}

function storageKey(lessonId, studentName) {
  return `aula:contenido:semana06:${lessonId}:${String(
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
      concepts: defaults.concepts.map((concept, index) => ({
        ...concept,
        ...(saved.concepts?.[index] || {}),
      })),
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
    <label className="brief6-field">
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

function StageHeader({ index, description }) {
  return (
    <div className="brief6-stage-heading">
      <span className="brief6-stage-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <span className="brief6-stage-time">{STAGES[index].time} MINUTOS</span>
        <h3>{STAGES[index].title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function ContentWeek06Workshop({
  lessonId = "contenido-semana-6",
  studentName = "",
}) {
  const key = storageKey(lessonId, studentName);

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
      // El laboratorio sigue funcionando sin almacenamiento.
    }

    setStored({ key, data: next });
  }

  function setField(name, value) {
    update({ [name]: value });
  }

  function updateConcept(index, changes) {
    const concepts = data.concepts.map((concept, i) =>
      i === index ? { ...concept, ...changes } : concept,
    );
    update({ concepts });
  }

  function markStage(index, checked) {
    const completed = [...data.completed];
    completed[index] = checked;
    update({ completed });
  }

  const completedCount = data.completed.filter(Boolean).length;
  const progress = Math.round((completedCount / 6) * 100);

  const generatedPrompt = `Actúa como estratega creativo especializado en campañas digitales.

MARCA: ${data.brand || "[Nombre de la marca]"}
PROBLEMA: ${data.problem || "[Problema de comunicación]"}
OBJETIVO: ${data.objective || "[Objetivo]"}
AUDIENCIA: ${data.audience || "[Buyer Persona]"}
INSIGHT: ${data.insight || "[Hallazgo del consumidor]"}
MENSAJE CLAVE: ${data.keyMessage || "[Mensaje principal]"}
VOZ Y TONO: ${data.brandVoice || "[Voz de marca]"}
ENTREGABLES: ${data.deliverables || "[Piezas previstas]"}
RESTRICCIONES: ${data.restrictions || "[Recursos y límites]"}

Propón tres conceptos creativos distintos:
1. Un enfoque emocional.
2. Un enfoque educativo.
3. Un enfoque experiencial.

Para cada concepto presenta:
- Nombre de campaña.
- Idea central.
- Mensaje clave.
- Propuesta de publicación.
- Justificación relacionada con el consumidor.

Evita promesas no verificadas, información inventada
y propuestas incompatibles con los recursos disponibles.

${data.promptExtra || ""}

Presenta las tres propuestas en una tabla.
No inventes resultados de investigaciones ni datos del consumidor.`;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
    } catch {
      window.prompt("Copia este prompt:", generatedPrompt);
    }
  }

  const scores = data.concepts.map((concept) =>
    CRITERIA.reduce(
      (sum, criterion) => sum + Number(concept[criterion.key] || 0),
      0,
    ),
  );

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
    <label className="brief6-done">
      <input
        type="checkbox"
        checked={data.completed[index]}
        onChange={(event) => markStage(index, event.target.checked)}
      />
      Marcar etapa como completada
    </label>
  );

  return (
    <div className="brief6">
      <header className="brief6-hero">
        <span className="brief6-eyebrow">
          AULA DIGITAL · LABORATORIO 06 · 60 MINUTOS
        </span>
        <h2>Dirige tu primera campaña.</h2>
        <p>
          Construye el brief de tu marca de café, explora alternativas y
          transforma una idea en un prototipo.
        </p>

        <div className="brief6-progress-label">
          <strong>Progreso del laboratorio</strong>
          <span>
            {completedCount} de 6 etapas · {progress}%
          </span>
        </div>

        <div
          className="brief6-progress"
          role="progressbar"
          aria-label="Progreso del laboratorio"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section className="brief6-panel">
        <h3>Continuamos con tu marca</h3>
        <p className="brief6-description">
          Utiliza los hallazgos del Buyer Persona, el mapa de empatía y la voz
          de marca desarrollados en las semanas anteriores.
        </p>

        <div className="brief6-grid">
          {field("team", "Nombre del equipo", "Equipo 01", false)}
          {field("brand", "Marca de café", "Nombre de la marca", false)}
        </div>
      </section>

      {/* ETAPA 1 */}
      <section className="brief6-panel">
        <StageHeader
          index={0}
          description="Elabora un documento que permita orientar las decisiones creativas."
        />

        <div className="brief6-grid">
          {field(
            "problem",
            "Problema de comunicación",
            "¿Qué situación necesita resolver la marca?",
          )}
          {field(
            "objective",
            "Objetivo de comunicación",
            "¿Qué resultado deseas conseguir?",
          )}
        </div>

        {field(
          "audience",
          "Audiencia y Buyer Persona",
          "¿A quién se dirige la campaña?",
        )}

        {field(
          "insight",
          "Insight del consumidor",
          "¿Qué necesidad, motivación o tensión descubriste?",
        )}

        {field(
          "keyMessage",
          "Mensaje clave",
          "¿Qué debe recordar el consumidor?",
        )}

        <div className="brief6-grid">
          {field(
            "deliverables",
            "Entregables previstos",
            "Ej. Publicación, historia y carrusel.",
          )}
          {field(
            "restrictions",
            "Restricciones",
            "Tiempo, presupuesto, herramientas y recursos.",
          )}
        </div>

        {field(
          "brandVoice",
          "Voz y tono de marca",
          "Recupera lo definido en la Semana 4.",
        )}

        <div className="brief6-hint">
          Un buen brief define el problema y los objetivos, pero deja espacio
          para explorar soluciones creativas.
        </div>

        {done(0)}
      </section>

      {/* ETAPA 2 */}
      <section className="brief6-panel">
        <StageHeader
          index={1}
          description="Construye un prompt con el contexto de tu brief y utilízalo para explorar alternativas."
        />

        {field(
          "promptExtra",
          "Indicaciones adicionales para la IA",
          "Ej. Evita frases genéricas y utiliza lenguaje cercano.",
        )}

        <div className="brief6-prompt-box">
          <div className="brief6-prompt-top">
            <strong>PROMPT GENERADO CON TU BRIEF</strong>
            <button
              type="button"
              className="brief6-button"
              onClick={copyPrompt}
            >
              Copiar prompt
            </button>
          </div>
          <pre>{generatedPrompt}</pre>
        </div>

        <label className="brief6-field">
          <span>Método de ideación utilizado</span>
          <select
            value={data.ideationMethod}
            onChange={(event) => setField("ideationMethod", event.target.value)}
          >
            <option value="IA">Asistente de IA</option>
            <option value="Lluvia de ideas">Lluvia de ideas guiada</option>
          </select>
        </label>

        {field(
          "aiResponse",
          "Síntesis de las propuestas obtenidas",
          "Resume las tres propuestas. No necesitas pegar toda la conversación.",
        )}

        {field(
          "aiReview",
          "¿Qué mejoró, corrigió o descartó tu equipo?",
          "Explica qué decisiones tomó el equipo.",
        )}

        <div className="brief6-hint">
          Si no tienes acceso a una IA, puedes desarrollar los tres enfoques
          mediante lluvia de ideas. La evaluación será la misma.
        </div>

        {done(1)}
      </section>

      {/* ETAPA 3 */}
      <section className="brief6-panel">
        <StageHeader
          index={2}
          description="Desarrolla tres conceptos y evalúa cada uno con cuatro criterios."
        />

        <div className="brief6-concepts">
          {data.concepts.map((concept, index) => (
            <div className="brief6-concept-card" key={index}>
              <div className="brief6-concept-top">
                <span>CONCEPTO {index + 1}</span>
                <strong>{concept.type}</strong>
              </div>

              <Field
                label="Nombre del concepto"
                value={concept.name}
                onChange={(value) => updateConcept(index, { name: value })}
                placeholder="Ej. Cada taza tiene una historia"
                multiline={false}
              />

              <Field
                label="Idea central"
                value={concept.idea}
                onChange={(value) => updateConcept(index, { idea: value })}
                placeholder="¿Qué representa esta propuesta?"
              />

              <Field
                label="Mensaje clave"
                value={concept.message}
                onChange={(value) => updateConcept(index, { message: value })}
                placeholder="¿Qué queremos comunicar?"
              />

              <Field
                label="Aplicación publicitaria"
                value={concept.application}
                onChange={(value) =>
                  updateConcept(index, { application: value })
                }
                placeholder="¿Cómo se convertiría en una publicación?"
              />

              <Field
                label="Justificación"
                value={concept.justification}
                onChange={(value) =>
                  updateConcept(index, { justification: value })
                }
                placeholder="¿Por qué conectaría con el consumidor?"
              />

              <div className="brief6-scores">
                <h4>Evalúa de 1 a 5</h4>
                {CRITERIA.map((criterion) => (
                  <label key={criterion.key}>
                    <span>{criterion.label}</span>
                    <select
                      value={concept[criterion.key]}
                      onChange={(event) =>
                        updateConcept(index, {
                          [criterion.key]: Number(event.target.value),
                        })
                      }
                    >
                      <option value={0}>Sin evaluar</option>
                      {[1, 2, 3, 4, 5].map((score) => (
                        <option key={score} value={score}>
                          {score}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
                <div className="brief6-total">
                  <span>Puntuación</span>
                  <strong>{scores[index]} / 20</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <label className="brief6-field">
          <span>Concepto seleccionado</span>
          <select
            value={data.selectedConcept}
            onChange={(event) =>
              setField("selectedConcept", event.target.value)
            }
          >
            <option value="">Selecciona un concepto</option>
            {data.concepts.map((concept, index) => (
              <option key={index} value={String(index)}>
                {concept.name || `Concepto ${index + 1}`} · {concept.type}
              </option>
            ))}
          </select>
        </label>

        {field(
          "selectionReason",
          "Justificación de la selección",
          "Explica por qué el concepto responde mejor al brief.",
        )}

        <div className="brief6-hint">
          La puntuación ayuda a comparar, pero no sustituye la argumentación
          estratégica.
        </div>

        {done(2)}
      </section>

      {/* ETAPA 4 */}
      <section className="brief6-panel">
        <StageHeader
          index={3}
          description="Convierte el concepto elegido en una primera pieza publicitaria visual."
        />

        <label className="brief6-field">
          <span>Formato del prototipo</span>
          <select
            value={data.prototypeFormat}
            onChange={(event) =>
              setField("prototypeFormat", event.target.value)
            }
          >
            <option>Publicación estática</option>
            <option>Historia digital</option>
            <option>Portada de carrusel</option>
          </select>
        </label>

        {field(
          "prototypeHeadline",
          "Titular principal",
          "¿Qué verá primero el consumidor?",
          false,
        )}

        {field(
          "prototypeCopy",
          "Copy de la publicación",
          "Escribe el texto publicitario.",
        )}

        {field(
          "prototypeCta",
          "Llamado a la acción",
          "Ej. Descubre nuestra historia.",
          false,
        )}

        {field(
          "prototypeVisual",
          "Dirección visual",
          "Describe fotografía, composición, estilo y elementos.",
        )}

        {field(
          "prototypeLink",
          "Enlace al prototipo terminado",
          "Pega el enlace de Canva, Slides o Drive.",
          false,
        )}

        <div className="brief6-prototype-preview">
          <span>VISTA PREVIA DEL CONCEPTO</span>
          <h3>
            {data.prototypeHeadline ||
              "El titular de tu campaña aparecerá aquí"}
          </h3>
          <p>
            {data.prototypeCopy || "Escribe el mensaje principal de tu pieza."}
          </p>
          <strong>{data.prototypeCta || "Tu llamado a la acción"}</strong>
        </div>

        <div className="brief6-hint">
          Esta vista previa muestra la estructura del mensaje. El prototipo
          visual debe diseñarse en Canva, Slides u otra herramienta accesible.
        </div>

        {done(3)}
      </section>

      {/* ETAPA 5 */}
      <section className="brief6-panel">
        <StageHeader
          index={4}
          description="Comprueba que tu campaña responda al brief y pueda producirse."
        />

        <div className="brief6-checklist">
          {[
            [
              "reviewAudience",
              "El concepto responde a una necesidad del Buyer Persona.",
            ],
            ["reviewMessage", "La pieza comunica el mensaje clave."],
            ["reviewVoice", "Respeta la voz y el tono de la marca."],
            ["reviewClaims", "No contiene promesas ni datos inventados."],
            ["reviewResources", "Es viable con los recursos disponibles."],
          ].map(([name, label]) => (
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

        {done(4)}
      </section>

      {/* ETAPA 6 */}
      <section className="brief6-panel">
        <StageHeader
          index={5}
          description="Prepara la defensa de tu propuesta y organiza las evidencias."
        />

        {field(
          "presentation",
          "¿Cómo defenderá el equipo su propuesta?",
          "Resume los argumentos principales.",
        )}

        {field(
          "teamDecision",
          "¿Qué decisiones tomó el equipo?",
          "Diferencia los aportes de IA de las decisiones humanas.",
        )}

        {field(
          "deliveryLink",
          "Enlace a las evidencias",
          "Carpeta con brief, conceptos y prototipo.",
          false,
        )}

        <div className="brief6-rubric">
          <h4>Rúbrica del laboratorio · 50 puntos</h4>
          {[
            ["Brief creativo", 15],
            ["Construcción del prompt", 5],
            ["Tres conceptos creativos", 10],
            ["Evaluación y selección", 10],
            ["Prototipo publicitario", 5],
            ["Presentación y argumentación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points}</strong>
            </div>
          ))}
        </div>

        {done(5)}
      </section>

      <footer className="brief6-footer">
        <h3>
          {completedCount === 6
            ? "Laboratorio completado"
            : `${completedCount} de 6 etapas completadas`}
        </h3>
        <p>
          Las respuestas se guardan automáticamente en este navegador. Recuerda
          entregar las evidencias en Moodle.
        </p>
      </footer>
    </div>
  );
}
