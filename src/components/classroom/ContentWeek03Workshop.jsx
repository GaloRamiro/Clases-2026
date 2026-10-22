import { useState } from "react";
import "../../styles/contenidoSemana03.css";
const PREFIX = "aula:contenido:semana03";

const STEPS = [
  { title: "Mapa de empatía", minutes: 10 },
  { title: "Necesidad prioritaria", minutes: 10 },
  { title: "Ideación de contenido", minutes: 10 },
  { title: "Primera publicación", minutes: 20 },
  { title: "Justificación", minutes: 5 },
  { title: "Preparación de entrega", minutes: 5 },
];

const FIELDS = {
  team: "",
  brand: "",
  persona: "",
  previousFindings: "",
  thinksFeels: "",
  sees: "",
  hears: "",
  saysDoes: "",
  pains: "",
  gains: "",
  evidence: "",
  hypotheses: "",
  observation: "",
  need: "",
  reason: "",
  problem: "",
  priorityReason: "",
  idea1: "",
  idea2: "",
  idea3: "",
  selectedIdea: "",
  selectionReason: "",
  contentTitle: "",
  contentMessage: "",
  contentObjective: "",
  contentStrategy: "PULL",
  contentFormat: "Publicación estática vertical",
  contentChannel: "Instagram",
  contentCaption: "",
  contentCta: "",
  contentLink: "",
  contentEvidence: "",
  designDescription: "",
  justification: "",
  expectedResult: "",
  improvement: "",
  finalReflection: "",
  presentation: "",
  deliverableLink: "",
};

function initialData() {
  return {
    ...FIELDS,
    completed: STEPS.map(() => false),
  };
}

function storageKey(lessonId, studentName) {
  const student = String(studentName || "sin-nombre")
    .trim()
    .toLowerCase();

  return `${PREFIX}:${lessonId}:${student}`;
}

function readData(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return initialData();
    }

    return {
      ...initialData(),
      ...saved,
      completed: STEPS.map((_, index) => Boolean(saved.completed?.[index])),
    };
  } catch {
    return initialData();
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  hint = "",
}) {
  return (
    <label className="empathy3-field">
      <span className="empathy3-field__label">{label}</span>

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

      {hint && <small>{hint}</small>}
    </label>
  );
}

function StepHeader({ number, title, minutes, description }) {
  return (
    <header className="empathy3-step-header">
      <div className="empathy3-step-number">
        {String(number).padStart(2, "0")}
      </div>

      <div>
        <span className="empathy3-step-time">{minutes} MINUTOS</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </header>
  );
}

function Completion({ checked, onChange }) {
  return (
    <label className="empathy3-completion">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>Marcar esta etapa como completada</span>
    </label>
  );
}

export default function ContentWeek03Workshop({
  lessonId = "contenido-semana-3",
  studentName = "",
}) {
  const key = storageKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: readData(key),
  }));

  const data = stored.key === key ? stored.data : readData(key);

  function update(changes) {
    const next = { ...data, ...changes };

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar el laboratorio:", error);
    }

    setStored({ key, data: next });
  }

  function setField(field, value) {
    update({ [field]: value });
  }

  function toggleStep(index, checked) {
    const completed = [...data.completed];
    completed[index] = checked;
    update({ completed });
  }

  const finished = data.completed.filter(Boolean).length;
  const progress = Math.round((finished / STEPS.length) * 100);

  const problemPreview =
    data.problem.trim() ||
    `${data.persona || "[Consumidor]"} necesita ${
      data.need || "[necesidad]"
    } porque ${data.reason || "[razón identificada]"}.`;

  return (
    <div className="empathy3">
      <header className="empathy3-hero">
        <span className="empathy3-kicker">
          LABORATORIO 03 · DISEÑO PARA GENERACIÓN DE CONTENIDO
        </span>

        <h2>Del consumidor al contenido.</h2>

        <p>
          Comprende a tu Buyer Persona, identifica una necesidad y conviértela
          en tu primera publicación digital.
        </p>

        <div className="empathy3-progress">
          <div className="empathy3-progress__labels">
            <strong>Progreso del laboratorio</strong>
            <span>
              {finished} de 6 etapas · {progress}%
            </span>
          </div>

          <div
            className="empathy3-progress__track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      <section className="empathy3-section">
        <div className="empathy3-intro">
          <strong>Continuamos el proyecto de café</strong>
          <p>
            Utiliza la misma marca de la Semana 1 y el Buyer Persona investigado
            en la Semana 2.
          </p>
        </div>

        <div className="empathy3-grid">
          <Field
            label="Nombre del equipo"
            value={data.team}
            onChange={(value) => setField("team", value)}
            placeholder="Equipo 01"
          />
          <Field
            label="Marca de café"
            value={data.brand}
            onChange={(value) => setField("brand", value)}
            placeholder="Nombre de la marca"
          />
        </div>

        <Field
          label="Buyer Persona de la Semana 2"
          value={data.persona}
          onChange={(value) => setField("persona", value)}
          placeholder="¿Quién es nuestro consumidor?"
          multiline
        />

        <Field
          label="Hallazgos de entrevistas y comentarios"
          value={data.previousFindings}
          onChange={(value) => setField("previousFindings", value)}
          placeholder="¿Qué aprendimos realmente sobre nuestro consumidor?"
          multiline
        />
      </section>

      {/* ETAPA 1 */}

      <section className="empathy3-section">
        <StepHeader
          number={1}
          title="Construye tu mapa de empatía"
          minutes={10}
          description="Organiza lo que sabes del consumidor. Diferencia lo observado de lo que todavía supones."
        />

        <div className="empathy3-map">
          {[
            {
              field: "thinksFeels",
              title: "Piensa y siente",
              question: "¿Qué le preocupa, desea o motiva?",
            },
            {
              field: "sees",
              title: "Ve",
              question: "¿Qué marcas, situaciones y estímulos encuentra?",
            },
            {
              field: "hears",
              title: "Oye",
              question: "¿Qué recomendaciones y opiniones recibe?",
            },
            {
              field: "saysDoes",
              title: "Dice y hace",
              question: "¿Qué expresa y cómo se comporta?",
            },
            {
              field: "pains",
              title: "Esfuerzos",
              question: "¿Qué problemas y obstáculos enfrenta?",
            },
            {
              field: "gains",
              title: "Resultados",
              question: "¿Qué beneficios espera conseguir?",
            },
          ].map((item) => (
            <div className="empathy3-map__cell" key={item.field}>
              <strong>{item.title}</strong>
              <p>{item.question}</p>
              <textarea
                rows={4}
                value={data[item.field]}
                placeholder="Escribe aquí tus hallazgos..."
                onChange={(event) => setField(item.field, event.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="empathy3-grid">
          <Field
            label="Evidencias disponibles"
            value={data.evidence}
            onChange={(value) => setField("evidence", value)}
            placeholder="Entrevistas, comentarios, observaciones y fuentes"
            multiline
          />

          <Field
            label="Hipótesis por comprobar"
            value={data.hypotheses}
            onChange={(value) => setField("hypotheses", value)}
            placeholder="¿Qué afirmaciones todavía no están validadas?"
            multiline
          />
        </div>

        <Completion
          checked={data.completed[0]}
          onChange={(checked) => toggleStep(0, checked)}
        />
      </section>

      {/* ETAPA 2 */}

      <section className="empathy3-section">
        <StepHeader
          number={2}
          title="Identifica una necesidad prioritaria"
          minutes={10}
          description="Transforma un hallazgo de investigación en un problema claro que pueda orientar el contenido."
        />

        <Field
          label="Observación del consumidor"
          value={data.observation}
          onChange={(value) => setField("observation", value)}
          placeholder="Ej. Quiero preparar café, pero no conozco las cantidades."
          multiline
        />

        <Field
          label="Necesidad identificada"
          value={data.need}
          onChange={(value) => setField("need", value)}
          placeholder="Ej. Aprender una receta sencilla para principiantes"
          multiline
        />

        <Field
          label="Razón identificada"
          value={data.reason}
          onChange={(value) => setField("reason", value)}
          placeholder="¿Qué explica esa necesidad?"
          multiline
        />

        <div className="empathy3-preview">
          <span>DEFINICIÓN DEL PROBLEMA</span>
          <p>{problemPreview}</p>
        </div>

        <Field
          label="Redacción final del problema"
          value={data.problem}
          onChange={(value) => setField("problem", value)}
          placeholder="El consumidor necesita... porque..."
          multiline
        />

        <Field
          label="¿Por qué priorizamos esta necesidad?"
          value={data.priorityReason}
          onChange={(value) => setField("priorityReason", value)}
          placeholder="Explica su relevancia y la evidencia disponible."
          multiline
        />

        <Completion
          checked={data.completed[1]}
          onChange={(checked) => toggleStep(1, checked)}
        />
      </section>

      {/* ETAPA 3 */}

      <section className="empathy3-section">
        <StepHeader
          number={3}
          title="Propón tres ideas de contenido"
          minutes={10}
          description="No elijas la primera ocurrencia. Compara alternativas y selecciona una solución."
        />

        <Field
          label="Idea 1"
          value={data.idea1}
          onChange={(value) => setField("idea1", value)}
          placeholder="Ej. Consejos para preparar café en casa"
          multiline
        />

        <Field
          label="Idea 2"
          value={data.idea2}
          onChange={(value) => setField("idea2", value)}
          placeholder="Ej. Infografía con errores frecuentes"
          multiline
        />

        <Field
          label="Idea 3"
          value={data.idea3}
          onChange={(value) => setField("idea3", value)}
          placeholder="Ej. Receta visual paso a paso"
          multiline
        />

        <label className="empathy3-field">
          <span className="empathy3-field__label">
            ¿Cuál idea desarrollarán?
          </span>

          <select
            value={data.selectedIdea}
            onChange={(event) => setField("selectedIdea", event.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="idea1">Idea 1</option>
            <option value="idea2">Idea 2</option>
            <option value="idea3">Idea 3</option>
          </select>
        </label>

        <Field
          label="¿Por qué seleccionaron esta idea?"
          value={data.selectionReason}
          onChange={(value) => setField("selectionReason", value)}
          placeholder="Relaciona la idea con la necesidad y los recursos."
          multiline
        />

        <Completion
          checked={data.completed[2]}
          onChange={(checked) => toggleStep(2, checked)}
        />
      </section>

      {/* ETAPA 4 */}

      <section className="empathy3-section">
        <StepHeader
          number={4}
          title="Crea tu primera publicación digital"
          minutes={20}
          description="Diseña una publicación estática en Canva, Google Slides o PowerPoint."
        />

        <div className="empathy3-note">
          <strong>Requisitos de la publicación</strong>
          <p>
            Un mensaje principal claro, jerarquía visual, imagen pertinente,
            texto legible y coherencia con la marca. No necesitas todavía un
            logotipo final.
          </p>
        </div>

        <div className="empathy3-grid">
          <Field
            label="Título de la publicación"
            value={data.contentTitle}
            onChange={(value) => setField("contentTitle", value)}
            placeholder="Ej. Tu primera taza de café"
          />

          <Field
            label="Canal de publicación"
            value={data.contentChannel}
            onChange={(value) => setField("contentChannel", value)}
            placeholder="Ej. Instagram"
          />
        </div>

        <div className="empathy3-grid">
          <label className="empathy3-field">
            <span className="empathy3-field__label">
              Estrategia de contenido
            </span>

            <select
              value={data.contentStrategy}
              onChange={(event) =>
                setField("contentStrategy", event.target.value)
              }
            >
              <option value="PULL">PULL · Atraer</option>
              <option value="PUSH">PUSH · Promocionar</option>
            </select>
          </label>

          <Field
            label="Formato"
            value={data.contentFormat}
            onChange={(value) => setField("contentFormat", value)}
            placeholder="Ej. Publicación vertical 1080 × 1350"
          />
        </div>

        <Field
          label="Mensaje principal"
          value={data.contentMessage}
          onChange={(value) => setField("contentMessage", value)}
          placeholder="¿Qué debe comprender el consumidor al ver la publicación?"
          multiline
        />

        <Field
          label="Objetivo de comunicación"
          value={data.contentObjective}
          onChange={(value) => setField("contentObjective", value)}
          placeholder="Ej. Enseñar una receta básica para atraer principiantes"
          multiline
        />

        <Field
          label="Texto que acompañará la publicación"
          value={data.contentCaption}
          onChange={(value) => setField("contentCaption", value)}
          placeholder="Escribe el copy o descripción de la publicación."
          multiline
        />

        <Field
          label="Llamado a la acción"
          value={data.contentCta}
          onChange={(value) => setField("contentCta", value)}
          placeholder="Ej. Guarda esta receta para prepararla después"
        />

        <Field
          label="Descripción de la composición visual"
          value={data.designDescription}
          onChange={(value) => setField("designDescription", value)}
          placeholder="Imagen principal, distribución de texto y jerarquía."
          multiline
        />

        <Field
          label="Enlace al diseño"
          value={data.contentLink}
          onChange={(value) => setField("contentLink", value)}
          placeholder="Pega un enlace compartido de Canva o de tu archivo"
          hint="Comprueba que el docente tenga permiso para visualizarlo."
        />

        <Field
          label="Referencia de evidencia"
          value={data.contentEvidence}
          onChange={(value) => setField("contentEvidence", value)}
          placeholder="Nombre del archivo o captura de la publicación"
        />

        <Completion
          checked={data.completed[3]}
          onChange={(checked) => toggleStep(3, checked)}
        />
      </section>

      {/* ETAPA 5 */}

      <section className="empathy3-section">
        <StepHeader
          number={5}
          title="Justifica tu decisión creativa"
          minutes={5}
          description="Explica por qué tu publicación existe y qué necesidad atiende."
        />

        <Field
          label="Relación entre necesidad y publicación"
          value={data.justification}
          onChange={(value) => setField("justification", value)}
          placeholder="¿Cómo ayuda el contenido a este consumidor?"
          multiline
        />

        <Field
          label="Resultado esperado"
          value={data.expectedResult}
          onChange={(value) => setField("expectedResult", value)}
          placeholder="¿Qué esperamos que aprenda, sienta o haga?"
          multiline
        />

        <Field
          label="¿Qué mejoraríamos?"
          value={data.improvement}
          onChange={(value) => setField("improvement", value)}
          placeholder="Identifica una mejora concreta."
          multiline
        />

        <Completion
          checked={data.completed[4]}
          onChange={(checked) => toggleStep(4, checked)}
        />
      </section>

      {/* ETAPA 6 */}

      <section className="empathy3-section">
        <StepHeader
          number={6}
          title="Prepara la entrega y la defensa"
          minutes={5}
          description="Comprueba tus evidencias y organiza una presentación breve."
        />

        <Field
          label="¿Qué presentará el equipo?"
          value={data.presentation}
          onChange={(value) => setField("presentation", value)}
          placeholder="Consumidor, necesidad, evidencia, idea y publicación"
          multiline
        />

        <Field
          label="Enlace a la carpeta o entrega"
          value={data.deliverableLink}
          onChange={(value) => setField("deliverableLink", value)}
          placeholder="Enlace compartido o referencia del archivo"
        />

        <Field
          label="Reflexión final"
          value={data.finalReflection}
          onChange={(value) => setField("finalReflection", value)}
          placeholder="¿Qué cambió al pensar primero en el consumidor?"
          multiline
        />

        <div className="empathy3-rubric">
          <h4>Evaluación del laboratorio · 50 puntos</h4>
          <div>
            <span>Mapa de empatía y evidencias</span>
            <strong>10</strong>
          </div>
          <div>
            <span>Necesidad prioritaria</span>
            <strong>10</strong>
          </div>
          <div>
            <span>Relación entre necesidad e idea</span>
            <strong>10</strong>
          </div>
          <div>
            <span>Calidad de la publicación</span>
            <strong>15</strong>
          </div>
          <div>
            <span>Justificación</span>
            <strong>5</strong>
          </div>
        </div>

        <Completion
          checked={data.completed[5]}
          onChange={(checked) => toggleStep(5, checked)}
        />
      </section>

      <footer className="empathy3-footer">
        <strong>
          {finished === 6
            ? "Laboratorio completado"
            : `Has completado ${finished} de 6 etapas`}
        </strong>

        <p>
          Las respuestas se guardan automáticamente en este navegador. La
          publicación y sus evidencias deberán entregarse según las
          instrucciones de Moodle.
        </p>
      </footer>
    </div>
  );
}
