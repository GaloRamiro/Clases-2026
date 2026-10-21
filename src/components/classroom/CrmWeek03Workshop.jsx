import { useState } from "react";
import "../../styles/crmSemana03.css";

const PREFIX = "aula:crm:semana03";

const CASES = [
  ["nuevo", "Un cliente nuevo solicita información."],
  ["cotizacion", "Se envía una cotización."],
  ["sin-respuesta", "El cliente no responde al seguimiento."],
  ["negociacion", "La oportunidad pasa a negociación."],
  ["ganada", "El cliente confirma la compra."],
  ["perdida", "El cliente rechaza la propuesta."],
];

const LAB = [
  {
    title: "Revisar el pipeline",
    time: "10 min",
    instruction:
      "Verifica etapas, responsables y próximas acciones de tus oportunidades.",
  },
  {
    title: "Crear tres tareas",
    time: "15 min",
    instruction:
      "Crea tareas para un cliente nuevo, una cotización y una negociación. Asigna responsable y vencimiento.",
  },
  {
    title: "Configurar dos recordatorios",
    time: "10 min",
    instruction:
      "Programa dos recordatorios o actividades vinculadas a oportunidades.",
  },
  {
    title: "Configurar una automatización",
    time: "15 min",
    instruction:
      "Intenta crear una regla al entrar en Propuesta enviada. Si tu cuenta no lo permite, documenta la regla y simula la tarea manualmente.",
  },
  {
    title: "Comprobar y reunir evidencias",
    time: "10 min",
    instruction:
      "Comprueba los resultados y documenta qué realizó el CRM y qué realizó el vendedor.",
  },
];

const RECOVERY = [
  {
    id: "laptop",
    title: "Laptop de $850",
    situation: "Cotización enviada hace cuatro días sin respuesta.",
  },
  {
    id: "empresa",
    title: "Equipos corporativos de $6.000",
    situation: "Reunión programada sin confirmación de asistencia.",
  },
  {
    id: "servicio",
    title: "Mantenimiento de $300",
    situation: "Cliente interesado sin próxima actividad registrada.",
  },
];

const blankRule = () => ({
  enabled: false,
  trigger: "",
  condition: "",
  action: "",
  timing: "",
  responsible: "",
  mode: "",
  reason: "",
});

const blankRecovery = () => ({
  priority: "",
  action: "",
  responsible: "",
  followupDate: "",
  prevention: "",
  justification: "",
});

function initialData() {
  return {
    team: "",
    rules: CASES.map(([id]) => ({ id, ...blankRule() })),
    lab: LAB.map(() => ({
      completed: false,
      evidence: "",
      observation: "",
    })),
    automation: {
      trigger: "",
      condition: "",
      action: "",
      testResult: "",
      mode: "",
    },
    recovery: RECOVERY.map(({ id }) => ({
      id,
      ...blankRecovery(),
    })),
    reflection: "",
  };
}

function getKey(lessonId, studentName) {
  return `${PREFIX}:${lessonId}:${String(studentName || "")
    .trim()
    .toLowerCase()}`;
}

function load(key) {
  const defaults = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return defaults;

    return {
      ...defaults,
      ...saved,
      rules: defaults.rules.map((rule) => ({
        ...rule,
        ...(saved.rules || []).find((item) => item.id === rule.id),
      })),
      lab: defaults.lab.map((step, i) => ({
        ...step,
        ...(saved.lab?.[i] || {}),
      })),
      automation: {
        ...defaults.automation,
        ...(saved.automation || {}),
      },
      recovery: defaults.recovery.map((item) => ({
        ...item,
        ...(saved.recovery || []).find((r) => r.id === item.id),
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
    <label className="crm3-field">
      <span>{label}</span>

      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
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
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Heading({ eyebrow, title, description }) {
  return (
    <header className="crm3-heading">
      <span>{eyebrow}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </header>
  );
}

export default function CrmWeek03Workshop({
  kind,
  lessonId = "crm-semana-3",
  studentName = "",
}) {
  const key = getKey(lessonId, studentName);

  const [state, setState] = useState(() => ({
    key,
    data: load(key),
  }));

  const data = state.key === key ? state.data : load(key);

  function update(transform) {
    setState((previous) => {
      const current = previous.key === key ? previous.data : load(key);

      const next = transform(current);

      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch (error) {
        console.warn("No se pudo guardar el taller CRM.", error);
      }

      return { key, data: next };
    });
  }

  function updateRule(index, field, value) {
    update((current) => ({
      ...current,
      rules: current.rules.map((rule, i) =>
        i === index ? { ...rule, [field]: value } : rule,
      ),
    }));
  }

  function updateLab(index, field, value) {
    update((current) => ({
      ...current,
      lab: current.lab.map((step, i) =>
        i === index ? { ...step, [field]: value } : step,
      ),
    }));
  }

  function updateAutomation(field, value) {
    update((current) => ({
      ...current,
      automation: {
        ...current.automation,
        [field]: value,
      },
    }));
  }

  function updateRecovery(index, field, value) {
    update((current) => ({
      ...current,
      recovery: current.recovery.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  const designedRules = data.rules.filter(
    (rule) =>
      rule.enabled &&
      rule.trigger.trim() &&
      rule.action.trim() &&
      rule.timing.trim() &&
      rule.responsible.trim(),
  ).length;

  const completedSteps = data.lab.filter((step) => step.completed).length;

  return (
    <div className="crm3">
      <div className="crm3-status">
        <div>
          <strong>CRM · SEMANA 03</strong>
          <span>Seguimiento y automatización comercial</span>
        </div>
        <small>Guardado local automático</small>
      </div>

      {kind === "crm-automation-rules" && (
        <section className="crm3-section">
          <Heading
            eyebrow="TALLER GRUPAL · 30 MIN"
            title="Constructor de reglas comerciales"
            description="Analiza seis situaciones y diseña al menos cuatro reglas para evitar oportunidades olvidadas."
          />

          <div className="crm3-instructions">
            <strong>Instrucciones del equipo</strong>
            <p>
              Para cada caso decide si necesitas una regla automática o una
              acción manual. Define disparador, condición, acción, tiempo y
              responsable.
            </p>
          </div>

          <Field
            label="Nombre del equipo"
            value={data.team}
            placeholder="Ej. Equipo comercial 3"
            onChange={(value) =>
              update((current) => ({
                ...current,
                team: value,
              }))
            }
          />

          <div className="crm3-counter">
            Reglas completas: <strong>{designedRules} de 4 mínimas</strong>
          </div>

          {CASES.map(([id, situation], index) => {
            const rule = data.rules[index];

            return (
              <article className="crm3-card" key={id}>
                <div className="crm3-card-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{situation}</h4>
                    <p>Define cómo debe actuar el equipo comercial.</p>
                  </div>
                </div>

                <label className="crm3-check">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={(e) =>
                      updateRule(index, "enabled", e.target.checked)
                    }
                  />
                  <span>Incluir como regla de seguimiento</span>
                </label>

                <div className="crm3-grid">
                  <Field
                    label="Disparador"
                    value={rule.trigger}
                    placeholder="¿Qué evento inicia la regla?"
                    onChange={(v) => updateRule(index, "trigger", v)}
                  />
                  <Field
                    label="Condición (si aplica)"
                    value={rule.condition}
                    placeholder="¿Qué debe cumplirse?"
                    onChange={(v) => updateRule(index, "condition", v)}
                  />
                  <Field
                    label="Tiempo de ejecución"
                    value={rule.timing}
                    placeholder="Ej. 48 horas después"
                    onChange={(v) => updateRule(index, "timing", v)}
                  />
                  <Field
                    label="Responsable"
                    value={rule.responsible}
                    placeholder="Ej. Asesor comercial"
                    onChange={(v) => updateRule(index, "responsible", v)}
                  />
                </div>

                <Field
                  label="Acción comercial"
                  value={rule.action}
                  placeholder="¿Qué debe ocurrir?"
                  onChange={(v) => updateRule(index, "action", v)}
                  multiline
                />

                <Field
                  label="Tipo de ejecución"
                  value={rule.mode}
                  onChange={(v) => updateRule(index, "mode", v)}
                  options={["Automática", "Manual", "Mixta"]}
                />

                <Field
                  label="¿Por qué elegiste esa solución?"
                  value={rule.reason}
                  onChange={(v) => updateRule(index, "reason", v)}
                  placeholder="Justifica tu decisión comercial."
                  multiline
                />
              </article>
            );
          })}
        </section>
      )}

      {kind === "crm-automation-lab" && (
        <section className="crm3-section">
          <Heading
            eyebrow="LABORATORIO BITRIX24 · 60 MIN"
            title="Configura tareas y automatizaciones"
            description="Trabaja con las oportunidades del pipeline y comprueba cómo se organiza el seguimiento comercial."
          />

          <a
            className="crm3-link"
            href="https://www.bitrix24.es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir Bitrix24 ↗
          </a>

          <div className="crm3-instructions">
            <strong>Importante</strong>
            <p>
              Utiliza clientes ficticios. Si tu cuenta no permite configurar
              automatizaciones, documenta la regla y ejecuta manualmente la
              tarea equivalente.
            </p>
          </div>

          <div className="crm3-counter">
            Etapas completadas:{" "}
            <strong>
              {completedSteps} de {LAB.length}
            </strong>
          </div>

          {LAB.map((step, index) => (
            <article className="crm3-card" key={step.title}>
              <div className="crm3-card-title">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.time}</p>
                </div>
              </div>

              <p className="crm3-description">{step.instruction}</p>

              <Field
                label="Enlace o referencia de evidencia"
                value={data.lab[index].evidence}
                onChange={(v) => updateLab(index, "evidence", v)}
                placeholder="Enlace de captura o nombre del archivo"
              />

              <Field
                label="Observaciones del resultado"
                value={data.lab[index].observation}
                onChange={(v) => updateLab(index, "observation", v)}
                placeholder="Describe qué realizaste y qué sucedió."
                multiline
              />

              <label className="crm3-check">
                <input
                  type="checkbox"
                  checked={data.lab[index].completed}
                  onChange={(e) =>
                    updateLab(index, "completed", e.target.checked)
                  }
                />
                <span>Etapa completada</span>
              </label>
            </article>
          ))}

          <article className="crm3-card">
            <h4>Documenta tu regla de automatización</h4>
            <p className="crm3-description">
              Describe la regla que configuraste o simulaste en Bitrix24.
            </p>

            <div className="crm3-grid">
              <Field
                label="Disparador"
                value={data.automation.trigger}
                onChange={(v) => updateAutomation("trigger", v)}
                placeholder="Ej. Propuesta enviada"
              />
              <Field
                label="Condición"
                value={data.automation.condition}
                onChange={(v) => updateAutomation("condition", v)}
                placeholder="Ej. Oportunidad abierta"
              />
              <Field
                label="Acción"
                value={data.automation.action}
                onChange={(v) => updateAutomation("action", v)}
                placeholder="Ej. Crear tarea de seguimiento"
              />
              <Field
                label="Modalidad"
                value={data.automation.mode}
                onChange={(v) => updateAutomation("mode", v)}
                options={["Configurada en Bitrix24", "Simulada manualmente"]}
              />
            </div>

            <Field
              label="Resultado de la prueba"
              value={data.automation.testResult}
              onChange={(v) => updateAutomation("testResult", v)}
              placeholder="¿Qué hizo el CRM? ¿Qué hiciste tú?"
              multiline
            />
          </article>

          <Field
            label="Reflexión del laboratorio"
            value={data.reflection}
            onChange={(v) =>
              update((current) => ({
                ...current,
                reflection: v,
              }))
            }
            placeholder="¿Qué aprendiste sobre el seguimiento comercial?"
            multiline
          />
        </section>
      )}

      {kind === "crm-opportunity-recovery" && (
        <section className="crm3-section">
          <Heading
            eyebrow="RETO COMERCIAL · 20 MIN"
            title="Rescata tres oportunidades"
            description="Analiza tres oportunidades con problemas de seguimiento y diseña un plan de recuperación."
          />

          <div className="crm3-case">
            <strong>Tu misión</strong>
            <p>
              Establece la prioridad, define la acción comercial, asigna un
              responsable y explica cómo evitarías que el problema vuelva a
              suceder.
            </p>
          </div>

          {RECOVERY.map((item, index) => {
            const answer = data.recovery[index];

            return (
              <article className="crm3-card" key={item.id}>
                <div className="crm3-card-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.situation}</p>
                  </div>
                </div>

                <div className="crm3-grid">
                  <Field
                    label="Prioridad"
                    value={answer.priority}
                    onChange={(v) => updateRecovery(index, "priority", v)}
                    options={["Alta", "Media", "Baja"]}
                  />
                  <Field
                    label="Responsable"
                    value={answer.responsible}
                    onChange={(v) => updateRecovery(index, "responsible", v)}
                    placeholder="Ej. Asesor comercial"
                  />
                  <Field
                    label="Fecha de seguimiento"
                    type="date"
                    value={answer.followupDate}
                    onChange={(v) => updateRecovery(index, "followupDate", v)}
                  />
                </div>

                <Field
                  label="Acción para recuperar la oportunidad"
                  value={answer.action}
                  onChange={(v) => updateRecovery(index, "action", v)}
                  placeholder="¿Qué harías con este cliente?"
                  multiline
                />

                <Field
                  label="Recordatorio o automatización preventiva"
                  value={answer.prevention}
                  onChange={(v) => updateRecovery(index, "prevention", v)}
                  placeholder="¿Cómo evitarías otro olvido?"
                  multiline
                />

                <Field
                  label="Justificación comercial"
                  value={answer.justification}
                  onChange={(v) => updateRecovery(index, "justification", v)}
                  placeholder="¿Por qué esta es la mejor decisión?"
                  multiline
                />
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
