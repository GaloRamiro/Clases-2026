import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/crmSemana04.css";

const PREFIX = "aula:crm:semana04";

const LEVELS = ["Nuevo", "Frecuente", "Preferente"];

const LAB_STEPS = [
  {
    title: "Revisar diez contactos",
    time: "10 min",
    description:
      "Localiza diez contactos ficticios y revisa su historial comercial.",
  },
  {
    title: "Segmentar clientes",
    time: "15 min",
    description: "Clasifica los contactos como nuevos, frecuentes o inactivos.",
  },
  {
    title: "Registrar beneficios",
    time: "10 min",
    description: "Documenta los beneficios de los tres niveles del programa.",
  },
  {
    title: "Crear tres tareas",
    time: "15 min",
    description: "Programa agradecimiento, contacto recurrente y recuperación.",
  },
  {
    title: "Aplicar filtros y reunir evidencias",
    time: "10 min",
    description: "Filtra un segmento y registra capturas y conclusiones.",
  },
];

const CUSTOMERS = [
  {
    id: "andrea",
    name: "Andrea",
    situation: "Compró una laptop hace nueve meses.",
  },
  {
    id: "carlos",
    name: "Carlos",
    situation:
      "Compraba accesorios mensualmente, pero lleva cuatro meses sin comprar.",
  },
  {
    id: "alfa",
    name: "Empresa Alfa",
    situation: "Compró equipos hace un año y no ha solicitado mantenimiento.",
  },
];

const blankLevel = () => ({
  requirement: "",
  benefit: "",
  crmField: "",
});

const blankLab = () => ({
  completed: false,
  evidence: "",
  observation: "",
});

const blankRecovery = () => ({
  selected: false,
  cause: "",
  benefit: "",
  channel: "",
  action: "",
  indicator: "",
  nextDate: "",
  reason: "",
});

function initialData() {
  return {
    team: "",
    brand: "",
    audience: "",
    problem: "",
    valueProposition: "",
    levels: LEVELS.map(() => blankLevel()),
    successIndicator: "",
    businessJustification: "",
    lab: LAB_STEPS.map(() => blankLab()),
    segmentation: "",
    labReflection: "",
    recovery: CUSTOMERS.map((customer) => ({
      id: customer.id,
      ...blankRecovery(),
    })),
  };
}

function storageKey(lessonId, studentName) {
  return `${PREFIX}:${lessonId}:${String(studentName || "sin-nombre")
    .trim()
    .toLowerCase()}`;
}

function readData(key) {
  const defaults = initialData();

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaults;

    const saved = JSON.parse(raw);

    return {
      ...defaults,
      ...saved,
      levels: defaults.levels.map((level, index) => ({
        ...level,
        ...(saved.levels?.[index] || {}),
      })),
      lab: defaults.lab.map((step, index) => ({
        ...step,
        ...(saved.lab?.[index] || {}),
      })),
      recovery: defaults.recovery.map((customer) => ({
        ...customer,
        ...(saved.recovery || []).find((item) => item.id === customer.id),
      })),
    };
  } catch {
    return defaults;
  }
}

function Field({
  label,
  value = "",
  onChange,
  placeholder = "",
  type = "text",
  multiline = false,
  options,
}) {
  return (
    <label className="crm4-field">
      <span>{label}</span>

      {options ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Seleccionar</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function Heading({ eyebrow, title, description }) {
  return (
    <header className="crm4-heading">
      <span className="crm4-eyebrow">{eyebrow}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </header>
  );
}

export default function CrmWeek04Workshop({
  kind,
  lessonId = "crm-semana-4",
  studentName = "",
}) {
  const key = storageKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: readData(key),
  }));

  const data = stored.key === key ? stored.data : readData(key);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar CRM Semana 4", error);
    }

    setStored({ key, data: next });
  }

  function setField(field, value) {
    update((current) => ({ ...current, [field]: value }));
  }

  function setLevel(index, field, value) {
    update((current) => ({
      ...current,
      levels: current.levels.map((level, i) =>
        i === index ? { ...level, [field]: value } : level,
      ),
    }));
  }

  function setLab(index, field, value) {
    update((current) => ({
      ...current,
      lab: current.lab.map((step, i) =>
        i === index ? { ...step, [field]: value } : step,
      ),
    }));
  }

  function setRecovery(index, field, value) {
    update((current) => ({
      ...current,
      recovery: current.recovery.map((customer, i) =>
        i === index ? { ...customer, [field]: value } : customer,
      ),
    }));
  }

  const completedLab = data.lab.filter((step) => step.completed).length;

  const completedLevels = data.levels.filter(
    (level) => level.requirement.trim() && level.benefit.trim(),
  ).length;

  const selectedCustomers = data.recovery.filter(
    (customer) => customer.selected,
  ).length;

  return (
    <div className="crm4">
      <div className="crm4-status">
        <div>
          <strong>CRM · SEMANA 04</strong>
          <span>Fidelización y retención de clientes</span>
        </div>
        <small>Guardado automático en este navegador</small>
      </div>

      {kind === "crm-loyalty-builder" && (
        <section className="crm4-section">
          <Heading
            eyebrow="TALLER GRUPAL · 30 MIN"
            title="Construye tu programa de fidelización"
            description="Diseña un programa de lealtad para una empresa que vende laptops, accesorios y mantenimiento."
          />

          <div className="crm4-note">
            <strong>Tu misión</strong>
            <p>
              Define el público, los beneficios y tres niveles de fidelización.
              El programa debe motivar una segunda compra y ser sostenible para
              la empresa.
            </p>
          </div>

          <div className="crm4-grid">
            <Field
              label="Nombre del equipo"
              value={data.team}
              onChange={(v) => setField("team", v)}
              placeholder="Equipo comercial"
            />
            <Field
              label="Nombre del programa"
              value={data.brand}
              onChange={(v) => setField("brand", v)}
              placeholder="Ej. TechClub"
            />
          </div>

          <Field
            label="¿A quién se dirige?"
            value={data.audience}
            onChange={(v) => setField("audience", v)}
            placeholder="Describe el público objetivo"
            multiline
          />

          <Field
            label="¿Qué problema comercial resuelve?"
            value={data.problem}
            onChange={(v) => setField("problem", v)}
            placeholder="Ej. Clientes que no regresan después de comprar"
            multiline
          />

          <Field
            label="Propuesta de valor"
            value={data.valueProposition}
            onChange={(v) => setField("valueProposition", v)}
            placeholder="¿Por qué el cliente querría participar?"
            multiline
          />

          <div className="crm4-counter">
            Niveles definidos: <strong>{completedLevels} de 3</strong>
          </div>

          {LEVELS.map((name, index) => (
            <article className="crm4-card" key={name}>
              <div className="crm4-card-heading">
                <span>{index + 1}</span>
                <div>
                  <h4>Nivel {name}</h4>
                  <p>
                    Define qué necesita el cliente para acceder y qué beneficio
                    recibirá.
                  </p>
                </div>
              </div>

              <div className="crm4-grid">
                <Field
                  label="Requisito de ingreso"
                  value={data.levels[index].requirement}
                  onChange={(v) => setLevel(index, "requirement", v)}
                  placeholder="Ej. Haber realizado dos compras"
                />
                <Field
                  label="Beneficio"
                  value={data.levels[index].benefit}
                  onChange={(v) => setLevel(index, "benefit", v)}
                  placeholder="Ej. Descuento en mantenimiento"
                />
              </div>

              <Field
                label="¿Cómo identificarías este nivel en el CRM?"
                value={data.levels[index].crmField}
                onChange={(v) => setLevel(index, "crmField", v)}
                placeholder="Ej. Etiqueta, campo u observación"
              />
            </article>
          ))}

          <Field
            label="Indicador para medir el éxito"
            value={data.successIndicator}
            onChange={(v) => setField("successIndicator", v)}
            options={[
              "Tasa de retención",
              "Frecuencia de compra",
              "NPS",
              "LTV estimado",
              "Porcentaje de segunda compra",
            ]}
          />

          <Field
            label="Justificación comercial"
            value={data.businessJustification}
            onChange={(v) => setField("businessJustification", v)}
            placeholder="Explica por qué tu programa fidelizaría clientes sin generar costos excesivos."
            multiline
          />
        </section>
      )}

      {kind === "crm-loyalty-lab" && (
        <section className="crm4-section">
          <Heading
            eyebrow="LABORATORIO BITRIX24 · 60 MIN"
            title="Organiza tu programa en el CRM"
            description="Utiliza diez contactos ficticios, clasifícalos, registra beneficios y crea tareas de fidelización."
          />

          <a
            className="crm4-link"
            href="https://www.bitrix24.es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir Bitrix24 ↗
          </a>

          <div className="crm4-note">
            <strong>Importante</strong>
            <p>
              No necesitas un módulo de puntos. Puedes utilizar campos,
              etiquetas, notas y tareas disponibles en tu cuenta de Bitrix24.
            </p>
          </div>

          <div className="crm4-counter">
            Pasos completados:{" "}
            <strong>
              {completedLab} de {LAB_STEPS.length}
            </strong>
          </div>

          {LAB_STEPS.map((step, index) => (
            <article className="crm4-card" key={step.title}>
              <div className="crm4-card-heading">
                <span>{index + 1}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.time}</p>
                </div>
              </div>

              <p className="crm4-description">{step.description}</p>

              <Field
                label="Evidencia"
                value={data.lab[index].evidence}
                onChange={(v) => setLab(index, "evidence", v)}
                placeholder="Enlace de captura o nombre del archivo"
              />

              <Field
                label="¿Qué realizaste y qué resultado obtuviste?"
                value={data.lab[index].observation}
                onChange={(v) => setLab(index, "observation", v)}
                placeholder="Describe tu trabajo en Bitrix24"
                multiline
              />

              <label className="crm4-check">
                <input
                  type="checkbox"
                  checked={data.lab[index].completed}
                  onChange={(event) =>
                    setLab(index, "completed", event.target.checked)
                  }
                />
                <span>Actividad completada</span>
              </label>
            </article>
          ))}

          <Field
            label="¿Qué criterio utilizaste para segmentar?"
            value={data.segmentation}
            onChange={(v) => setField("segmentation", v)}
            placeholder="Ej. Frecuencia de compra y última interacción"
            multiline
          />

          <Field
            label="Reflexión del laboratorio"
            value={data.labReflection}
            onChange={(v) => setField("labReflection", v)}
            placeholder="¿Qué decisiones comerciales puedes tomar ahora?"
            multiline
          />
        </section>
      )}

      {kind === "crm-loyalty-recovery" && (
        <section className="crm4-section">
          <Heading
            eyebrow="RETO COMERCIAL · 20 MIN"
            title="Recupera clientes inactivos"
            description="Analiza tres situaciones y selecciona dos clientes para diseñar acciones de recuperación."
          />

          <div className="crm4-note">
            <strong>Tu misión</strong>
            <p>
              Selecciona dos clientes, identifica una posible causa de abandono,
              propone un beneficio y define cómo medirás el resultado.
            </p>
          </div>

          <div className="crm4-counter">
            Clientes seleccionados:{" "}
            <strong>{selectedCustomers} de 2 requeridos</strong>
          </div>

          {CUSTOMERS.map((customer, index) => {
            const answer = data.recovery[index];

            return (
              <article className="crm4-card" key={customer.id}>
                <div className="crm4-card-heading">
                  <span>{index + 1}</span>
                  <div>
                    <h4>{customer.name}</h4>
                    <p>{customer.situation}</p>
                  </div>
                </div>

                <label className="crm4-check">
                  <input
                    type="checkbox"
                    checked={answer.selected}
                    onChange={(event) =>
                      setRecovery(index, "selected", event.target.checked)
                    }
                  />
                  <span>Seleccionar para recuperación</span>
                </label>

                <Field
                  label="Posible causa de abandono"
                  value={answer.cause}
                  onChange={(v) => setRecovery(index, "cause", v)}
                  placeholder="Formula una hipótesis a partir del caso"
                  multiline
                />

                <div className="crm4-grid">
                  <Field
                    label="Beneficio propuesto"
                    value={answer.benefit}
                    onChange={(v) => setRecovery(index, "benefit", v)}
                    placeholder="Ej. Revisión de mantenimiento"
                  />

                  <Field
                    label="Canal de comunicación"
                    value={answer.channel}
                    onChange={(v) => setRecovery(index, "channel", v)}
                    options={[
                      "Correo electrónico",
                      "WhatsApp",
                      "Llamada telefónica",
                      "Atención presencial",
                    ]}
                  />

                  <Field
                    label="Fecha de seguimiento"
                    type="date"
                    value={answer.nextDate}
                    onChange={(v) => setRecovery(index, "nextDate", v)}
                  />

                  <Field
                    label="Indicador de éxito"
                    value={answer.indicator}
                    onChange={(v) => setRecovery(index, "indicator", v)}
                    options={[
                      "Respuesta al contacto",
                      "Segunda compra",
                      "Reactivación del cliente",
                      "Agendamiento de servicio",
                    ]}
                  />
                </div>

                <Field
                  label="Próxima acción en Bitrix24"
                  value={answer.action}
                  onChange={(v) => setRecovery(index, "action", v)}
                  placeholder="Describe la actividad comercial"
                  multiline
                />

                <Field
                  label="Justificación"
                  value={answer.reason}
                  onChange={(v) => setRecovery(index, "reason", v)}
                  placeholder="¿Por qué esta acción podría recuperar al cliente?"
                  multiline
                />
              </article>
            );
          })}
        </section>
      )}

      {kind === "crm-loyalty-builder" && (
        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "crm",
            number: 4,
            title: "Fidelización y retención de clientes en CRM",
          }}
          title="Actividad 1: Programa de fidelización"
          answers={{
            "Nombre del equipo": data.team,
            "Nombre del programa": data.brand,
            "Público objetivo": data.audience,
            "Problema comercial": data.problem,
            "Propuesta de valor": data.valueProposition,

            ...Object.fromEntries(
              data.levels.flatMap((level, index) => {
                const prefix = `NIVEL ${index + 1}: ${LEVELS[index]}`;

                return [
                  [`${prefix} - Requisito de ingreso`, level.requirement],
                  [`${prefix} - Beneficio`, level.benefit],
                  [`${prefix} - Identificación en CRM`, level.crmField],
                ];
              }),
            ),

            "Indicador de éxito": data.successIndicator,
            "Justificación comercial": data.businessJustification,
            "Niveles completos": `${completedLevels} de 3`,
          }}
        />
      )}

      {kind === "crm-loyalty-lab" && (
        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "crm",
            number: 4,
            title: "Fidelización y retención de clientes en CRM",
          }}
          title="Actividad 2: Laboratorio de fidelización en Bitrix24"
          answers={{
            "Nombre del equipo": data.team,
            "Nombre del programa": data.brand,

            ...Object.fromEntries(
              data.lab.flatMap((step, index) => {
                const prefix = `ETAPA ${index + 1}: ${LAB_STEPS[index].title}`;

                return [
                  [`${prefix} - Tiempo`, LAB_STEPS[index].time],
                  [`${prefix} - Actividad`, LAB_STEPS[index].description],
                  [`${prefix} - Evidencia`, step.evidence],
                  [`${prefix} - Observaciones`, step.observation],
                  [
                    `${prefix} - Estado`,
                    step.completed ? "Completada" : "Pendiente",
                  ],
                ];
              }),
            ),

            "Criterio de segmentación": data.segmentation,
            "Reflexión del laboratorio": data.labReflection,
            "Etapas completadas": `${completedLab} de ${LAB_STEPS.length}`,
          }}
        />
      )}

      {kind === "crm-loyalty-recovery" && (
        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "crm",
            number: 4,
            title: "Fidelización y retención de clientes en CRM",
          }}
          title="Actividad 3: Recuperación de clientes inactivos"
          answers={{
            "Nombre del equipo": data.team,

            ...Object.fromEntries(
              data.recovery.flatMap((answer, index) => {
                const prefix = `CLIENTE ${index + 1}: ${CUSTOMERS[index].name}`;

                return [
                  [`${prefix} - Situación`, CUSTOMERS[index].situation],
                  [`${prefix} - Seleccionado`, answer.selected ? "Sí" : "No"],
                  [`${prefix} - Posible causa de abandono`, answer.cause],
                  [`${prefix} - Beneficio propuesto`, answer.benefit],
                  [`${prefix} - Canal de comunicación`, answer.channel],
                  [`${prefix} - Acción comercial`, answer.action],
                  [`${prefix} - Indicador de éxito`, answer.indicator],
                  [`${prefix} - Fecha de seguimiento`, answer.nextDate],
                  [`${prefix} - Justificación`, answer.reason],
                ];
              }),
            ),

            "Clientes seleccionados": `${selectedCustomers} de 2 requeridos`,
          }}
        />
      )}
    </div>
  );
}
