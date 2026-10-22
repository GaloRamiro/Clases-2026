import { useState } from "react";
import "../../styles/contenidoSemana02.css";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
const PREFIX = "aula:contenido:semana02";

const STEPS = [
  { title: "Investigación anterior", minutes: 10 },
  { title: "Segmento prioritario", minutes: 10 },
  { title: "Investigación con IA", minutes: 10 },
  { title: "Buyer Persona", minutes: 15 },
  { title: "Mensajes PUSH y PULL", minutes: 10 },
  { title: "Defensa del equipo", minutes: 5 },
];

const INITIAL = {
  team: "",
  brand: "",
  valueProposition: "",
  previousResearch: "",
  competitorFindings: "",
  segmentName: "",
  demographic: "",
  geographic: "",
  psychographic: "",
  behavioral: "",
  segmentReason: "",
  researchPrompt: "",
  aiHypotheses: "",
  observedEvidence: "",
  evidenceSources: "",
  pendingValidation: "",
  personaName: "",
  personaAge: "",
  personaOccupation: "",
  personaContext: "",
  personaGoal: "",
  personaNeeds: "",
  personaMotivations: "",
  personaFrustrations: "",
  personaObjections: "",
  personaPlatforms: "",
  personaPurchaseDecision: "",
  personaQuote: "",
  pushMessage: "",
  pushChannel: "",
  pushReason: "",
  pullMessage: "",
  pullChannel: "",
  pullReason: "",
  defense: "",
  discovery: "",
  decisionChange: "",
  nextResearchQuestion: "",
  completed: Array(6).fill(false),
};

function getKey(lessonId, studentName) {
  return `${PREFIX}:${lessonId}:${String(studentName || "sin-nombre")
    .trim()
    .toLowerCase()}`;
}

function createInitialData() {
  return {
    ...INITIAL,
    completed: [...INITIAL.completed],
  };
}

function loadData(key) {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return createInitialData();
    }

    const saved = JSON.parse(raw);

    return {
      ...createInitialData(),
      ...saved,
      completed: STEPS.map((_, index) => Boolean(saved.completed?.[index])),
    };
  } catch {
    return createInitialData();
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  type = "text",
  hint,
}) {
  return (
    <label className="buyer2-field">
      <span className="buyer2-field__label">{label}</span>

      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}

      {hint && <small>{hint}</small>}
    </label>
  );
}

function StepHeader({ number, title, minutes, description }) {
  return (
    <header className="buyer2-step-header">
      <div className="buyer2-step-number">
        {String(number).padStart(2, "0")}
      </div>

      <div>
        <span className="buyer2-step-time">{minutes} MINUTOS</span>

        <h3>{title}</h3>

        <p>{description}</p>
      </div>
    </header>
  );
}

function Completion({ checked, onChange }) {
  return (
    <label className="buyer2-completion">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />

      <span>Marcar esta etapa como completada</span>
    </label>
  );
}

export default function ContentWeek02Workshop({
  lessonId = "contenido-semana-2",
  studentName = "",
}) {
  const key = getKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: loadData(key),
  }));

  const data = stored.key === key ? stored.data : loadData(key);

  function update(changes) {
    const next = {
      ...data,
      ...changes,
    };

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar el laboratorio:", error);
    }

    setStored({
      key,
      data: next,
    });
  }

  function setField(field, value) {
    update({
      [field]: value,
    });
  }

  function toggleStep(index, checked) {
    const completed = [...data.completed];

    completed[index] = checked;

    update({ completed });
  }

  const finished = data.completed.filter(Boolean).length;

  const progress = Math.round((finished / STEPS.length) * 100);

  function generatePrompt() {
    const prompt = `Actúa como investigador de consumidores.

MARCA:
${data.brand || "[Nombre de la marca]"}

PROPUESTA DE VALOR:
${data.valueProposition || "[Propuesta de valor]"}

SEGMENTO:
${data.segmentName || "[Segmento prioritario]"}

UBICACIÓN:
${data.geographic || "[Ubicación]"}

OBJETIVO:
Investigar las posibles necesidades, motivaciones, objeciones y hábitos de compra de este segmento para orientar una estrategia de contenidos de una marca de café.

INSTRUCCIONES:
1. Identifica cinco necesidades posibles.
2. Propón cinco motivaciones de compra.
3. Identifica tres objeciones frecuentes.
4. Explica qué plataformas digitales podrían utilizar.
5. Sugiere preguntas para validar cada hipótesis.
6. Distingue entre información comprobada e hipótesis.
7. No inventes entrevistas, estadísticas ni fuentes.

FORMATO:
Presenta una tabla con las columnas:
Hallazgo | Justificación | Evidencia disponible | Método de validación.

Termina con cinco preguntas para entrevistar consumidores reales.`;

    setField("researchPrompt", prompt);

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(prompt).catch(() => {
        console.warn("No se pudo copiar automáticamente.");
      });
    }
  }

  return (
    <div className="buyer2">
      {/* PORTADA DEL LABORATORIO */}

      <header className="buyer2-hero">
        <span className="buyer2-kicker">LABORATORIO · SEMANA 02</span>

        <h2>Descubre a quién le habla tu marca.</h2>

        <p>
          Investiga, selecciona un segmento, construye un Buyer Persona y adapta
          tu estrategia de contenido.
        </p>

        <div className="buyer2-progress">
          <div className="buyer2-progress__labels">
            <strong>Avance del laboratorio</strong>

            <span>
              {finished} de 6 etapas · {progress}%
            </span>
          </div>

          <div
            className="buyer2-progress__track"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* DATOS INICIALES */}

      <div className="buyer2-intro">
        <strong>Tu punto de partida</strong>

        <p>
          Continúa trabajando con la marca de café creada en la Semana 1. No
          debes crear otra marca.
        </p>

        <div className="buyer2-grid">
          <Field
            label="Nombre del equipo"
            value={data.team}
            onChange={(value) => setField("team", value)}
            placeholder="Equipo 01"
          />

          <Field
            label="Nombre de la marca"
            value={data.brand}
            onChange={(value) => setField("brand", value)}
            placeholder="Marca de café"
          />
        </div>

        <Field
          label="Propuesta de valor"
          value={data.valueProposition}
          onChange={(value) => setField("valueProposition", value)}
          placeholder="¿Por qué elegirían nuestra marca?"
          multiline
        />
      </div>

      {/* ETAPA 1 */}

      <section className="buyer2-section">
        <StepHeader
          number={1}
          title="Investigación anterior"
          minutes={10}
          description="Recupera la información investigada en la Semana 1."
        />

        <Field
          label="¿Qué investigamos sobre las tres marcas?"
          value={data.previousResearch}
          onChange={(value) => setField("previousResearch", value)}
          placeholder="Describe las marcas, públicos y mensajes."
          multiline
        />

        <Field
          label="Tres hallazgos importantes"
          value={data.competitorFindings}
          onChange={(value) => setField("competitorFindings", value)}
          placeholder="¿Qué aprendimos de sus consumidores?"
          multiline
        />

        <Completion
          checked={data.completed[0]}
          onChange={(checked) => toggleStep(0, checked)}
        />
      </section>

      {/* ETAPA 2 */}

      <section className="buyer2-section">
        <StepHeader
          number={2}
          title="Segmento prioritario"
          minutes={10}
          description="Selecciona el grupo de consumidores más relacionado con tu propuesta de valor."
        />

        <Field
          label="Nombre del segmento"
          value={data.segmentName}
          onChange={(value) => setField("segmentName", value)}
          placeholder="Ej. Estudiantes universitarios"
        />

        <div className="buyer2-grid">
          <Field
            label="Segmentación demográfica"
            value={data.demographic}
            onChange={(value) => setField("demographic", value)}
            placeholder="Edad, ocupación, presupuesto"
          />

          <Field
            label="Segmentación geográfica"
            value={data.geographic}
            onChange={(value) => setField("geographic", value)}
            placeholder="Ciudad, ubicación y contexto"
          />

          <Field
            label="Segmentación psicográfica"
            value={data.psychographic}
            onChange={(value) => setField("psychographic", value)}
            placeholder="Intereses, valores, estilo de vida"
          />

          <Field
            label="Segmentación conductual"
            value={data.behavioral}
            onChange={(value) => setField("behavioral", value)}
            placeholder="Hábitos y motivos de compra"
          />
        </div>

        <Field
          label="¿Por qué elegimos este segmento?"
          value={data.segmentReason}
          onChange={(value) => setField("segmentReason", value)}
          placeholder="Justifica la decisión comercial."
          multiline
        />

        <Completion
          checked={data.completed[1]}
          onChange={(checked) => toggleStep(1, checked)}
        />
      </section>

      {/* ETAPA 3 */}

      <section className="buyer2-section">
        <StepHeader
          number={3}
          title="Investigación con IA"
          minutes={10}
          description="Utiliza inteligencia artificial para formular hipótesis que después deberás validar."
        />

        <div className="buyer2-example">
          <strong>Ejemplo de prompt de investigación</strong>

          <p>
            Actúa como investigador de consumidores. Analiza posibles
            necesidades, motivaciones, objeciones y hábitos de compra del
            segmento elegido. Separa hipótesis de datos comprobados. No inventes
            estadísticas, entrevistas ni fuentes.
          </p>

          <button type="button" onClick={generatePrompt}>
            Generar y copiar prompt
          </button>
        </div>

        <Field
          label="Prompt utilizado"
          value={data.researchPrompt}
          onChange={(value) => setField("researchPrompt", value)}
          placeholder="Escribe o pega tu prompt completo."
          multiline
        />

        <Field
          label="Hipótesis propuestas por la IA"
          value={data.aiHypotheses}
          onChange={(value) => setField("aiHypotheses", value)}
          placeholder="Posibles necesidades, motivaciones y objeciones."
          multiline
        />

        <Completion
          checked={data.completed[2]}
          onChange={(checked) => toggleStep(2, checked)}
        />
      </section>

      {/* ETAPA 4 */}

      <section className="buyer2-section">
        <StepHeader
          number={4}
          title="Construcción del Buyer Persona"
          minutes={15}
          description="Crea un perfil representativo y distingue los hallazgos de las hipótesis."
        />

        <div className="buyer2-persona-banner">
          <span>PERFIL DEL CONSUMIDOR</span>

          <strong>{data.personaName || "Tu Buyer Persona"}</strong>

          <small>{data.personaOccupation || "Ocupación pendiente"}</small>
        </div>

        <div className="buyer2-grid">
          <Field
            label="Nombre representativo"
            value={data.personaName}
            onChange={(value) => setField("personaName", value)}
            placeholder="Ej. Daniel"
          />

          <Field
            label="Edad aproximada"
            value={data.personaAge}
            onChange={(value) => setField("personaAge", value)}
            placeholder="Ej. 22 años"
          />

          <Field
            label="Ocupación"
            value={data.personaOccupation}
            onChange={(value) => setField("personaOccupation", value)}
            placeholder="Ej. Estudiante universitario"
          />

          <Field
            label="Plataformas digitales"
            value={data.personaPlatforms}
            onChange={(value) => setField("personaPlatforms", value)}
            placeholder="Ej. Instagram, TikTok"
          />
        </div>

        <Field
          label="Contexto y rutina"
          value={data.personaContext}
          onChange={(value) => setField("personaContext", value)}
          placeholder="¿Cómo es su día?"
          multiline
        />

        <Field
          label="Objetivo principal"
          value={data.personaGoal}
          onChange={(value) => setField("personaGoal", value)}
          placeholder="¿Qué quiere conseguir?"
          multiline
        />

        <Field
          label="Necesidades"
          value={data.personaNeeds}
          onChange={(value) => setField("personaNeeds", value)}
          placeholder="¿Qué necesita resolver?"
          multiline
        />

        <Field
          label="Motivaciones"
          value={data.personaMotivations}
          onChange={(value) => setField("personaMotivations", value)}
          placeholder="¿Por qué compraría nuestro café?"
          multiline
        />

        <Field
          label="Problemas y frustraciones"
          value={data.personaFrustrations}
          onChange={(value) => setField("personaFrustrations", value)}
          placeholder="¿Qué dificultades enfrenta?"
          multiline
        />

        <Field
          label="Objeciones de compra"
          value={data.personaObjections}
          onChange={(value) => setField("personaObjections", value)}
          placeholder="¿Qué le impediría comprar?"
          multiline
        />

        <Field
          label="Criterios de decisión"
          value={data.personaPurchaseDecision}
          onChange={(value) => setField("personaPurchaseDecision", value)}
          placeholder="¿Qué compara antes de comprar?"
          multiline
        />

        <Field
          label="Frase representativa hipotética"
          value={data.personaQuote}
          onChange={(value) => setField("personaQuote", value)}
          placeholder="Ej. Quiero buen café a precio accesible."
          multiline
        />

        <div className="buyer2-evidence">
          <strong>EVIDENCIA ≠ HIPÓTESIS</strong>

          <p>
            Una respuesta generada por IA no demuestra cómo se comportan
            realmente los consumidores.
          </p>
        </div>

        <Field
          label="Datos observados o respaldados"
          value={data.observedEvidence}
          onChange={(value) => setField("observedEvidence", value)}
          placeholder="¿Qué encontramos realmente?"
          multiline
        />

        <Field
          label="Fuentes de las evidencias"
          value={data.evidenceSources}
          onChange={(value) => setField("evidenceSources", value)}
          placeholder="Enlaces, comentarios, entrevistas o análisis."
          multiline
        />

        <Field
          label="Hipótesis pendientes de validar"
          value={data.pendingValidation}
          onChange={(value) => setField("pendingValidation", value)}
          placeholder="¿Qué necesitamos investigar?"
          multiline
        />

        <Completion
          checked={data.completed[3]}
          onChange={(checked) => toggleStep(3, checked)}
        />
      </section>

      {/* ETAPA 5 */}

      <section className="buyer2-section">
        <StepHeader
          number={5}
          title="Mensajes PUSH y PULL"
          minutes={10}
          description="Adapta dos propuestas de contenido a las necesidades del Buyer Persona."
        />

        <div className="buyer2-message buyer2-message--push">
          <strong>PUSH · Presentar una oferta</strong>

          <p>La marca lleva un mensaje promocional al consumidor.</p>

          <Field
            label="Mensaje PUSH"
            value={data.pushMessage}
            onChange={(value) => setField("pushMessage", value)}
            placeholder="Redacta el mensaje promocional."
            multiline
          />

          <Field
            label="Canal de comunicación"
            value={data.pushChannel}
            onChange={(value) => setField("pushChannel", value)}
            placeholder="Ej. Anuncio en Instagram"
          />

          <Field
            label="¿Por qué funcionaría?"
            value={data.pushReason}
            onChange={(value) => setField("pushReason", value)}
            placeholder="Relaciona el mensaje con una necesidad."
            multiline
          />
        </div>

        <div className="buyer2-message buyer2-message--pull">
          <strong>PULL · Atraer con contenido útil</strong>

          <p>
            La marca genera información que motiva al consumidor a acercarse
            voluntariamente.
          </p>

          <Field
            label="Mensaje o idea PULL"
            value={data.pullMessage}
            onChange={(value) => setField("pullMessage", value)}
            placeholder="Ej. Consejos para preparar café antes de clases."
            multiline
          />

          <Field
            label="Canal de comunicación"
            value={data.pullChannel}
            onChange={(value) => setField("pullChannel", value)}
            placeholder="Ej. Video educativo en TikTok"
          />

          <Field
            label="¿Por qué funcionaría?"
            value={data.pullReason}
            onChange={(value) => setField("pullReason", value)}
            placeholder="Relaciona el contenido con una motivación."
            multiline
          />
        </div>

        <Completion
          checked={data.completed[4]}
          onChange={(checked) => toggleStep(4, checked)}
        />
      </section>

      {/* ETAPA 6 */}

      <section className="buyer2-section">
        <StepHeader
          number={6}
          title="Defensa del equipo"
          minutes={5}
          description="Prepara una explicación breve de las decisiones tomadas."
        />

        <Field
          label="¿Por qué elegimos a este consumidor?"
          value={data.defense}
          onChange={(value) => setField("defense", value)}
          placeholder="Justifica la elección del segmento."
          multiline
        />

        <Field
          label="¿Qué descubrimos?"
          value={data.discovery}
          onChange={(value) => setField("discovery", value)}
          placeholder="Explica el principal aprendizaje."
          multiline
        />

        <Field
          label="¿Qué decisión de contenido cambiaríamos?"
          value={data.decisionChange}
          onChange={(value) => setField("decisionChange", value)}
          placeholder="Describe el cambio en la estrategia."
          multiline
        />

        <Field
          label="¿Qué investigaremos antes de Semana 3?"
          value={data.nextResearchQuestion}
          onChange={(value) => setField("nextResearchQuestion", value)}
          placeholder="Escribe una pregunta para las entrevistas."
          multiline
        />

        <Completion
          checked={data.completed[5]}
          onChange={(checked) => toggleStep(5, checked)}
        />
      </section>

      {/* CIERRE */}

      <footer className="buyer2-footer">
        <strong>
          {finished === 6
            ? "Laboratorio completado"
            : `Has completado ${finished} de 6 etapas`}
        </strong>

        <p>
          Tus respuestas se guardan automáticamente en este navegador. Para la
          entrega formal, utiliza las instrucciones publicadas en Moodle.
        </p>

        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "contenido",
            number: 2,
            title: "Investigación del consumidor y Buyer Persona",
          }}
          title="Taller práctico: investigación del consumidor y Buyer Persona"
          answers={{
            "Nombre del equipo": data.team,
            "Nombre de la marca": data.brand,
            "Propuesta de valor": data.valueProposition,
            "Investigación de la Semana 1": data.previousResearch,
            "Hallazgos sobre competidores": data.competitorFindings,
            "Segmento prioritario": data.segmentName,
            "Segmentación demográfica": data.demographic,
            "Segmentación geográfica": data.geographic,
            "Segmentación psicográfica": data.psychographic,
            "Segmentación conductual": data.behavioral,
            "Justificación del segmento": data.segmentReason,
            "Prompt de investigación": data.researchPrompt,
            "Hipótesis propuestas por IA": data.aiHypotheses,
            "Evidencias observadas": data.observedEvidence,
            "Fuentes de las evidencias": data.evidenceSources,
            "Hipótesis pendientes de validar": data.pendingValidation,
            "Nombre del Buyer Persona": data.personaName,
            "Edad del Buyer Persona": data.personaAge,
            Ocupación: data.personaOccupation,
            "Contexto y rutina": data.personaContext,
            "Objetivo principal": data.personaGoal,
            Necesidades: data.personaNeeds,
            Motivaciones: data.personaMotivations,
            "Problemas y frustraciones": data.personaFrustrations,
            "Objeciones de compra": data.personaObjections,
            "Plataformas digitales": data.personaPlatforms,
            "Criterios de decisión": data.personaPurchaseDecision,
            "Frase representativa": data.personaQuote,
            "Mensaje PUSH": data.pushMessage,
            "Canal PUSH": data.pushChannel,
            "Justificación PUSH": data.pushReason,
            "Mensaje PULL": data.pullMessage,
            "Canal PULL": data.pullChannel,
            "Justificación PULL": data.pullReason,
            "Defensa del segmento": data.defense,
            "Principal descubrimiento": data.discovery,
            "Decisión que cambiaríamos": data.decisionChange,
            "Próxima pregunta de investigación": data.nextResearchQuestion,
          }}
        />
      </footer>
    </div>
  );
}
