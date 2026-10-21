import { useEffect, useState } from "react";
import "../../styles/crmSemana01.css";
import "../../styles/crmSemana01.css";
/* ==========================================================
   AULA DIGITAL — CRM | SEMANA 01

   Actividades:
   - Diccionario comercial
   - Laboratorio Bitrix24
   - Reto de seguimiento

   Guardado automático en localStorage.
   ========================================================== */

const STORAGE_PREFIX = "aula:crm:semana01";

const TERMS = [
  "Lead",
  "Prospecto",
  "Oportunidad de venta",
  "Embudo de ventas",
  "Conversión",
  "Seguimiento (Follow-up)",
  "Automatización",
  "Retención de clientes",
  "Base de datos de clientes",
  "Fidelización",
];

const LAB_STEPS = [
  {
    time: "0–10 min",
    title: "Explora Bitrix24",
    instruction:
      "Accede a Bitrix24, crea una cuenta si es necesario e identifica el menú CRM.",
    evidence: "Captura del panel principal.",
  },
  {
    time: "10–20 min",
    title: "Reconoce sus herramientas",
    instruction:
      "Identifica contactos, leads y oportunidades disponibles en tu cuenta.",
    evidence: "Describe la función de cada sección.",
  },
  {
    time: "20–35 min",
    title: "Registra el primer cliente",
    instruction:
      "Crea el registro ficticio de Andrea Morales con sus datos comerciales.",
    evidence: "Captura del registro.",
  },
  {
    time: "35–45 min",
    title: "Programa el seguimiento",
    instruction:
      "Clasifica el estado del cliente y establece una próxima acción comercial.",
    evidence: "Captura del estado y seguimiento.",
  },
  {
    time: "45–55 min",
    title: "Registra un segundo cliente",
    instruction:
      "Crea otro cliente ficticio con una necesidad diferente y compara ambos registros.",
    evidence: "Dos registros completos.",
  },
  {
    time: "55–60 min",
    title: "Reflexiona",
    instruction:
      "Explica qué información sería difícil recuperar si todo se gestionara por WhatsApp.",
    evidence: "Reflexión de tres líneas.",
  },
];

function createInitialData() {
  return {
    team: "",

    glossary: TERMS.map((term) => ({
      term,
      definition: "",
      example: "",
      crmApplication: "",
    })),

    lab: LAB_STEPS.map(() => ({
      completed: false,
      evidenceUrl: "",
      observation: "",
    })),

    firstLead: {
      name: "Andrea Morales",
      product: "Smartphone de gama media",
      budget: "350",
      channel: "WhatsApp",
      interest: "Alto",
      nextAction: "Enviar cotización y contactar en 48 horas",
    },

    secondLead: {
      name: "",
      product: "",
      budget: "",
      channel: "",
      interest: "",
      nextAction: "",
    },

    followup: {
      classification: "",
      missingInformation: "",
      message: "",
      actionOne: "",
      actionTwo: "",
      noResponse: "",
      crmRecord: "",
    },

    reflection: "",
  };
}

function getStorageKey(lessonId, studentName) {
  const student = String(studentName || "")
    .trim()
    .toLowerCase();

  return `${STORAGE_PREFIX}:${lessonId}:${student}`;
}

function readSavedData(key) {
  const defaults = createInitialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return defaults;
    }

    return {
      team: saved.team ?? defaults.team,

      glossary: defaults.glossary.map((item, index) => ({
        ...item,
        ...(saved.glossary?.[index] || {}),
      })),

      lab: defaults.lab.map((item, index) => ({
        ...item,
        ...(saved.lab?.[index] || {}),
      })),

      firstLead: {
        ...defaults.firstLead,
        ...(saved.firstLead || {}),
      },

      secondLead: {
        ...defaults.secondLead,
        ...(saved.secondLead || {}),
      },

      followup: {
        ...defaults.followup,
        ...(saved.followup || {}),
      },

      reflection: saved.reflection ?? "",
    };
  } catch {
    return defaults;
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  rows = 3,
  hint = "",
}) {
  return (
    <label className="crm-field">
      <span className="crm-field__label">{label}</span>

      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}

      {hint && <small className="crm-field__hint">{hint}</small>}
    </label>
  );
}

function SectionHeading({ number, title, duration, description }) {
  return (
    <header className="crm-section-heading">
      <div className="crm-section-heading__meta">
        <span>ACTIVIDAD {number}</span>
        <span>{duration}</span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>
    </header>
  );
}

function Glossary({ data, updateTeam, updateGlossary }) {
  return (
    <section className="crm-workshop__section">
      <SectionHeading
        number="01"
        duration="30 MIN"
        title="Diccionario comercial"
        description="Investiga diez conceptos fundamentales de ventas y aplícalos a una empresa ficticia de teléfonos celulares."
      />

      <div className="crm-workshop__instruction">
        <strong>Tu misión</strong>
        <p>
          Trabajen en equipos de tres o cuatro estudiantes. Investiguen fuentes
          confiables, expliquen cada término con sus propias palabras y creen un
          ejemplo relacionado con la venta de celulares.
        </p>
      </div>

      <Field
        label="Nombre del equipo"
        value={data.team}
        onChange={updateTeam}
        placeholder="Ej. Equipo Comercial 01"
      />

      <div className="crm-workshop__example">
        <strong>Ejemplo de referencia</strong>
        <p>
          <b>Lead:</b> persona que muestra interés por un producto. Ejemplo:
          alguien pregunta por WhatsApp cuánto cuesta un teléfono.
        </p>
      </div>

      {data.glossary.map((item, index) => (
        <article className="crm-workshop__panel" key={item.term}>
          <div className="crm-workshop__panel-title">
            <span className="crm-workshop__number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h4>{item.term}</h4>
          </div>

          <Field
            label="Definición con tus propias palabras"
            value={item.definition}
            onChange={(value) => updateGlossary(index, "definition", value)}
            placeholder={`¿Qué significa ${item.term}?`}
            multiline
          />

          <Field
            label="Ejemplo comercial"
            value={item.example}
            onChange={(value) => updateGlossary(index, "example", value)}
            placeholder="Ejemplo aplicado a una tienda de celulares"
            multiline
          />

          <Field
            label="¿Cómo se utilizaría en un CRM?"
            value={item.crmApplication}
            onChange={(value) => updateGlossary(index, "crmApplication", value)}
            placeholder="Describe su aplicación en una plataforma CRM"
            multiline
          />
        </article>
      ))}

      <div className="crm-workshop__instruction">
        <strong>Presentación del equipo</strong>
        <p>
          El docente asignará dos términos. Preparen una explicación breve y
          justifiquen cómo se relacionan con una venta real.
        </p>
      </div>
    </section>
  );
}

function LeadCard({ title, lead, onChange }) {
  const fields = [
    ["name", "Nombre del cliente"],
    ["product", "Producto de interés"],
    ["budget", "Presupuesto en USD"],
    ["channel", "Canal de contacto"],
    ["interest", "Nivel de interés"],
    ["nextAction", "Próxima acción"],
  ];

  return (
    <article className="crm-workshop__panel">
      <div className="crm-workshop__panel-title">
        <h4>{title}</h4>
      </div>

      <div className="crm-workshop__grid">
        {fields.map(([key, label]) => (
          <Field
            key={key}
            label={label}
            value={lead[key]}
            onChange={(value) => onChange(key, value)}
            placeholder={label}
          />
        ))}
      </div>
    </article>
  );
}

function BitrixLab({ data, updateLab, updateLead, updateReflection }) {
  return (
    <section className="crm-workshop__section">
      <SectionHeading
        number="02"
        duration="60 MIN"
        title="Mi primer cliente en Bitrix24"
        description="Registra dos clientes ficticios y organiza el seguimiento comercial dentro de una plataforma CRM."
      />

      <div className="crm-workshop__instruction">
        <strong>Situación profesional</strong>
        <p>
          Trabajas como asesor de una empresa de tecnología. Una persona
          solicita información sobre un celular. Debes registrar su interés y
          programar el siguiente contacto.
        </p>
      </div>

      <a
        className="crm-workshop__external-link"
        href="https://www.bitrix24.es/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir Bitrix24 ↗
      </a>

      <p className="crm-workshop__warning">
        Utiliza solamente datos ficticios. Si tu cuenta no dispone de leads
        independientes, puedes trabajar con contactos y oportunidades.
      </p>

      <LeadCard
        title="Cliente 1 — Andrea Morales"
        lead={data.firstLead}
        onChange={(field, value) => updateLead("firstLead", field, value)}
      />

      <LeadCard
        title="Cliente 2 — Nuevo cliente ficticio"
        lead={data.secondLead}
        onChange={(field, value) => updateLead("secondLead", field, value)}
      />

      <div className="crm-workshop__steps">
        {LAB_STEPS.map((step, index) => (
          <article className="crm-workshop__step" key={index}>
            <div className="crm-workshop__step-heading">
              <span>{step.time}</span>
              <h4>{step.title}</h4>
            </div>

            <p>{step.instruction}</p>

            <small>Evidencia solicitada: {step.evidence}</small>

            <Field
              label="Enlace de evidencia"
              value={data.lab[index].evidenceUrl}
              onChange={(value) => updateLab(index, "evidenceUrl", value)}
              placeholder="https://..."
              hint="Coloca el enlace compartido de tu captura o documento."
            />

            <Field
              label="Observaciones o resultado"
              value={data.lab[index].observation}
              onChange={(value) => updateLab(index, "observation", value)}
              placeholder="¿Qué realizaste y qué encontraste?"
              multiline
            />

            <label className="crm-workshop__checkbox">
              <input
                type="checkbox"
                checked={data.lab[index].completed}
                onChange={(event) =>
                  updateLab(index, "completed", event.target.checked)
                }
              />
              <span>Etapa completada</span>
            </label>
          </article>
        ))}
      </div>

      <Field
        label="Reflexión final del laboratorio"
        value={data.reflection}
        onChange={updateReflection}
        placeholder="¿Qué información sería difícil recuperar si todo estuviera en WhatsApp?"
        multiline
        rows={4}
      />
    </section>
  );
}

function FollowupChallenge({ data, updateFollowup }) {
  return (
    <section className="crm-workshop__section">
      <SectionHeading
        number="03"
        duration="20 MIN"
        title="¿Cómo convertirías este lead en cliente?"
        description="Analiza un caso comercial y diseña una estrategia de seguimiento."
      />

      <div className="crm-workshop__case">
        <span>CASO COMERCIAL</span>

        <p>
          Un cliente pregunta por un teléfono de
          <strong> $350</strong>. Le envías el precio, responde{" "}
          <em>“Gracias, lo voy a pensar”</em>y deja de escribir. Han pasado tres
          días.
        </p>
      </div>

      <div className="crm-workshop__panel">
        <Field
          label="¿Es un lead o un prospecto? Justifica."
          value={data.followup.classification}
          onChange={(value) => updateFollowup("classification", value)}
          placeholder="Explica cómo clasificarías al contacto."
          multiline
        />

        <Field
          label="¿Qué información necesitas conocer?"
          value={data.followup.missingInformation}
          onChange={(value) => updateFollowup("missingInformation", value)}
          placeholder="Presupuesto, necesidad, fecha de compra..."
          multiline
        />

        <Field
          label="Redacta el mensaje de seguimiento"
          value={data.followup.message}
          onChange={(value) => updateFollowup("message", value)}
          placeholder="Escribe un mensaje profesional y respetuoso."
          multiline
          rows={5}
        />

        <div className="crm-workshop__grid">
          <Field
            label="Primera acción de seguimiento"
            value={data.followup.actionOne}
            onChange={(value) => updateFollowup("actionOne", value)}
            placeholder="¿Qué harías primero?"
            multiline
          />

          <Field
            label="Segunda acción de seguimiento"
            value={data.followup.actionTwo}
            onChange={(value) => updateFollowup("actionTwo", value)}
            placeholder="¿Qué harías después?"
            multiline
          />
        </div>

        <Field
          label="¿Qué harías si el cliente no responde?"
          value={data.followup.noResponse}
          onChange={(value) => updateFollowup("noResponse", value)}
          placeholder="Propón una decisión respetuosa."
          multiline
        />

        <Field
          label="¿Qué registrarías en el CRM?"
          value={data.followup.crmRecord}
          onChange={(value) => updateFollowup("crmRecord", value)}
          placeholder="Estado, interacción, próxima tarea..."
          multiline
        />
      </div>
    </section>
  );
}

function calculateProgress(data) {
  const glossary = data.glossary.filter(
    (item) =>
      item.definition.trim() &&
      item.example.trim() &&
      item.crmApplication.trim(),
  ).length;

  const lab = data.lab.filter((item) => item.completed).length;

  const followupFields = [
    "classification",
    "missingInformation",
    "message",
    "actionOne",
    "actionTwo",
    "noResponse",
    "crmRecord",
  ];

  const followup = followupFields.every((field) =>
    String(data.followup[field] || "").trim(),
  )
    ? 1
    : 0;

  return {
    completed: glossary + lab + followup,
    total: TERMS.length + LAB_STEPS.length + 1,
  };
}

export default function CrmWorkshop({
  kind,
  lessonId = "crm-semana-1",
  studentName = "",
}) {
  const key = getStorageKey(lessonId, studentName);

  const [data, setData] = useState(() => readSavedData(key));

  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    setData(readSavedData(key));
    setSaveError(false);
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));

      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [key, data]);

  function updateTeam(value) {
    setData((current) => ({
      ...current,
      team: value,
    }));
  }

  function updateGlossary(index, field, value) {
    setData((current) => ({
      ...current,
      glossary: current.glossary.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updateLab(index, field, value) {
    setData((current) => ({
      ...current,
      lab: current.lab.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updateLead(which, field, value) {
    setData((current) => ({
      ...current,
      [which]: {
        ...current[which],
        [field]: value,
      },
    }));
  }

  function updateFollowup(field, value) {
    setData((current) => ({
      ...current,
      followup: {
        ...current.followup,
        [field]: value,
      },
    }));
  }

  function updateReflection(value) {
    setData((current) => ({
      ...current,
      reflection: value,
    }));
  }

  const progress = calculateProgress(data);
  const percentage = Math.round((progress.completed / progress.total) * 100);

  return (
    <div className="crm-workshop">
      <div className="crm-workshop__progress">
        <div className="crm-workshop__progress-top">
          <span>AVANCE DE LA SEMANA 01</span>
          <strong>
            {progress.completed} de {progress.total} apartados
          </strong>
        </div>

        <div
          className="crm-workshop__progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <div style={{ width: `${percentage}%` }} />
        </div>

        <small>
          {saveError
            ? "No se pudieron guardar los cambios."
            : "Tus respuestas se guardan automáticamente en este navegador."}
        </small>
      </div>

      {kind === "crm-glossary" && (
        <Glossary
          data={data}
          updateTeam={updateTeam}
          updateGlossary={updateGlossary}
        />
      )}

      {kind === "crm-bitrix-lab" && (
        <BitrixLab
          data={data}
          updateLab={updateLab}
          updateLead={updateLead}
          updateReflection={updateReflection}
        />
      )}

      {kind === "crm-followup" && (
        <FollowupChallenge data={data} updateFollowup={updateFollowup} />
      )}
    </div>
  );
}
