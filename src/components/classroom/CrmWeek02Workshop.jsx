import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/crmSemana01.css";

/* ==========================================================
   AULA DIGITAL — CRM | SEMANA 02
   Clasificación, laboratorio y campaña comercial
   ========================================================== */

const PREFIX = "aula:crm:semana02";

const CLIENTS = [
  {
    id: "andrea",
    name: "Andrea",
    situation: "Preguntó el precio de una laptop.",
  },
  { id: "carlos", name: "Carlos", situation: "Compró tres veces este año." },
  {
    id: "maria",
    name: "María",
    situation: "Solicitó cotización de 10 computadoras.",
  },
  {
    id: "alfa",
    name: "Empresa Alfa",
    situation: "Busca un proveedor de equipos.",
  },
  { id: "pedro", name: "Pedro", situation: "No compra desde hace ocho meses." },
  {
    id: "lucia",
    name: "Lucía",
    situation: "Se registró para recibir promociones.",
  },
  {
    id: "beta",
    name: "Instituto Beta",
    situation: "Solicita 20 equipos para laboratorio.",
  },
  {
    id: "daniel",
    name: "Daniel",
    situation: "Compró una laptop y necesita mantenimiento.",
  },
];

const LAB_STEPS = [
  {
    time: "0–15 min",
    title: "Crear seis contactos",
    instruction:
      "Registra seis personas ficticias con datos de contacto, producto de interés y observaciones.",
    evidence: "Captura de la lista de contactos.",
  },
  {
    time: "15–25 min",
    title: "Registrar dos empresas",
    instruction:
      "Crea Empresa Alfa e Instituto Beta. Vincula contactos cuando corresponda.",
    evidence: "Captura de ambas empresas.",
  },
  {
    time: "25–40 min",
    title: "Crear dos oportunidades",
    instruction:
      "Registra dos posibles ventas con valor estimado, etapa y fecha de seguimiento.",
    evidence: "Captura de las oportunidades.",
  },
  {
    time: "40–55 min",
    title: "Organizar y segmentar",
    instruction:
      "Clasifica los registros y utiliza filtros para identificar clientes corporativos, recurrentes y nuevos.",
    evidence: "Captura de un filtro aplicado.",
  },
  {
    time: "55–60 min",
    title: "Revisar evidencias",
    instruction:
      "Comprueba que los registros estén completos y reúne las capturas del laboratorio.",
    evidence: "Enlaces a las evidencias.",
  },
];

function createInitialData() {
  return {
    team: "",
    clients: CLIENTS.map((client) => ({
      ...client,
      classification: "",
      tags: "",
      segment: "",
      priority: "",
      action: "",
      justification: "",
      selected: false,
    })),
    lab: LAB_STEPS.map(() => ({
      completed: false,
      evidenceUrl: "",
      observation: "",
    })),
    campaign: {
      segment: "",
      selectedClients: [],
      offer: "",
      channel: "",
      indicator: "",
      proposal: "",
    },
    reflection: "",
  };
}

function storageKey(lessonId, studentName) {
  const student = String(studentName || "")
    .trim()
    .toLowerCase();
  return `${PREFIX}:${lessonId}:${student}`;
}

function readData(key) {
  const defaults = createInitialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") return defaults;

    return {
      ...defaults,
      ...saved,
      clients: defaults.clients.map((client, index) => ({
        ...client,
        ...(saved.clients?.[index] || {}),
      })),
      lab: defaults.lab.map((step, index) => ({
        ...step,
        ...(saved.lab?.[index] || {}),
      })),
      campaign: {
        ...defaults.campaign,
        ...(saved.campaign || {}),
      },
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
}) {
  return (
    <label className="crm-field">
      <span className="crm-field__label">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
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
    </label>
  );
}

function SectionHeader({ label, title, description }) {
  return (
    <header className="crm-section-heading">
      <div className="crm-section-heading__meta">
        <span>{label}</span>
        <span>SEMANA 02</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </header>
  );
}

export default function CrmWeek02Workshop({
  kind,
  lessonId = "crm-semana-2",
  studentName = "",
}) {
  const key = storageKey(lessonId, studentName);

  const [state, setState] = useState(() => ({
    key,
    data: readData(key),
  }));

  const data = state.key === key ? state.data : readData(key);

  function update(transform) {
    setState((current) => {
      const base = current.key === key ? current.data : readData(key);
      const next = transform(base);

      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // La interfaz seguirá funcionando si el almacenamiento está bloqueado.
      }

      return { key, data: next };
    });
  }

  function updateClient(index, field, value) {
    update((current) => ({
      ...current,
      clients: current.clients.map((client, i) =>
        i === index ? { ...client, [field]: value } : client,
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

  function updateCampaign(field, value) {
    update((current) => ({
      ...current,
      campaign: { ...current.campaign, [field]: value },
    }));
  }

  const selectedPriorities = data.clients.filter(
    (client) => client.selected,
  ).length;
  const selectedCampaign = data.campaign.selectedClients || [];

  return (
    <div className="crm-workshop">
      <div className="crm-workshop__progress">
        <div className="crm-workshop__progress-top">
          <span>CRM · SEMANA 02</span>
          <strong>Registro y segmentación comercial</strong>
        </div>
        <small>Tus respuestas se guardan en este navegador.</small>
      </div>

      {kind === "crm-client-segmentation" && (
        <section className="crm-workshop__section">
          <SectionHeader
            label="ACTIVIDAD GRUPAL · 30 MIN"
            title="Clasifica los ocho clientes"
            description="Analiza cada caso, clasifica el registro y decide qué clientes atender primero."
          />

          <div className="crm-workshop__instruction">
            <strong>¿A quién le venderías primero?</strong>
            <p>
              Trabajen en equipos de 3 a 4 personas. Clasifiquen los registros,
              asignen segmentos y seleccionen exactamente tres clientes
              prioritarios.
            </p>
          </div>

          <Field
            label="Nombre del equipo"
            value={data.team}
            onChange={(value) =>
              update((current) => ({ ...current, team: value }))
            }
            placeholder="Ej. Equipo comercial 02"
          />

          <div className="crm-workshop__example">
            <strong>Clientes prioritarios: {selectedPriorities} de 3</strong>
            <p>
              Prioricen según necesidad, intención de compra y potencial
              comercial. Justifiquen sus decisiones.
            </p>
          </div>

          {data.clients.map((client, index) => (
            <article className="crm-workshop__panel" key={client.id}>
              <div className="crm-workshop__panel-title">
                <span className="crm-workshop__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4>{client.name}</h4>
                  <p style={{ margin: "4px 0 0", color: "#64748b" }}>
                    {client.situation}
                  </p>
                </div>
              </div>

              <div className="crm-workshop__grid">
                <label className="crm-field">
                  <span className="crm-field__label">
                    Clasificación principal
                  </span>
                  <select
                    value={client.classification}
                    onChange={(event) =>
                      updateClient(index, "classification", event.target.value)
                    }
                    style={{ minHeight: 47, padding: 12, borderRadius: 10 }}
                  >
                    <option value="">Selecciona</option>
                    <option value="Contacto">Contacto</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Lead">Lead</option>
                    <option value="Oportunidad">Oportunidad</option>
                  </select>
                </label>

                <label className="crm-field">
                  <span className="crm-field__label">Prioridad</span>
                  <select
                    value={client.priority}
                    onChange={(event) =>
                      updateClient(index, "priority", event.target.value)
                    }
                    style={{ minHeight: 47, padding: 12, borderRadius: 10 }}
                  >
                    <option value="">Selecciona</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </label>

                <Field
                  label="Etiqueta comercial"
                  value={client.tags}
                  onChange={(value) => updateClient(index, "tags", value)}
                  placeholder="Nuevo, recurrente, corporativo..."
                />

                <Field
                  label="Segmento comercial"
                  value={client.segment}
                  onChange={(value) => updateClient(index, "segment", value)}
                  placeholder="Ej. Empresas con necesidad de equipos"
                />
              </div>

              <Field
                label="Acción comercial recomendada"
                value={client.action}
                onChange={(value) => updateClient(index, "action", value)}
                placeholder="¿Qué harías con este cliente?"
                multiline
              />

              <Field
                label="Justificación de la decisión"
                value={client.justification}
                onChange={(value) =>
                  updateClient(index, "justification", value)
                }
                placeholder="¿Qué información respalda tu decisión?"
                multiline
              />

              <label className="crm-workshop__checkbox">
                <input
                  type="checkbox"
                  checked={client.selected}
                  disabled={!client.selected && selectedPriorities >= 3}
                  onChange={(event) =>
                    updateClient(index, "selected", event.target.checked)
                  }
                />
                <span>
                  Seleccionar como uno de los tres clientes prioritarios
                </span>
              </label>
            </article>
          ))}
        </section>
      )}

      {kind === "crm-contact-lab" && (
        <section className="crm-workshop__section">
          <SectionHeader
            label="LABORATORIO · 60 MIN"
            title="Construye tu base comercial"
            description="Registra seis contactos, dos empresas y dos oportunidades en Bitrix24. Después aplica filtros."
          />

          <a
            className="crm-workshop__external-link"
            href="https://www.bitrix24.es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir Bitrix24 ↗
          </a>

          <p className="crm-workshop__warning">
            Utiliza datos ficticios. Si tu plan no permite etiquetas o campos
            personalizados, registra la clasificación en un campo existente y
            explica cómo aplicarías el filtro.
          </p>

          <div className="crm-workshop__steps">
            {LAB_STEPS.map((step, index) => (
              <article className="crm-workshop__step" key={step.title}>
                <div className="crm-workshop__step-heading">
                  <span>{step.time}</span>
                  <h4>{step.title}</h4>
                </div>

                <p>{step.instruction}</p>
                <small>Evidencia: {step.evidence}</small>

                <Field
                  label="Enlace de evidencia"
                  value={data.lab[index].evidenceUrl}
                  onChange={(value) => updateLab(index, "evidenceUrl", value)}
                  placeholder="https://..."
                />

                <Field
                  label="Observaciones"
                  value={data.lab[index].observation}
                  onChange={(value) => updateLab(index, "observation", value)}
                  placeholder="Describe el resultado obtenido."
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
            label="Reflexión del laboratorio"
            value={data.reflection}
            onChange={(value) =>
              update((current) => ({ ...current, reflection: value }))
            }
            placeholder="¿Qué aprendiste sobre la organización de una base comercial?"
            multiline
          />
        </section>
      )}

      {kind === "crm-segmented-campaign" && (
        <section className="crm-workshop__section">
          <SectionHeader
            label="RETO COMERCIAL · 20 MIN"
            title="Diseña una campaña segmentada"
            description="Tienes presupuesto para contactar únicamente a cinco clientes."
          />

          <div className="crm-workshop__case">
            <span>DECISIÓN COMERCIAL</span>
            <p>
              Selecciona cinco contactos, define una oferta y explica cómo
              medirías el resultado de la campaña.
            </p>
          </div>

          <Field
            label="Segmento elegido"
            value={data.campaign.segment}
            onChange={(value) => updateCampaign("segment", value)}
            placeholder="¿A qué grupo dirigirías la campaña?"
          />

          <div className="crm-workshop__panel">
            <h4>Selecciona cinco contactos</h4>
            <p>Seleccionados: {selectedCampaign.length} de 5</p>

            {data.clients.map((client) => {
              const checked = selectedCampaign.includes(client.id);

              return (
                <label className="crm-workshop__checkbox" key={client.id}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={!checked && selectedCampaign.length >= 5}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...selectedCampaign, client.id]
                        : selectedCampaign.filter((id) => id !== client.id);

                      updateCampaign("selectedClients", next);
                    }}
                  />
                  <span>
                    {client.name} — {client.situation}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="crm-workshop__panel">
            <Field
              label="Producto o beneficio"
              value={data.campaign.offer}
              onChange={(value) => updateCampaign("offer", value)}
              placeholder="¿Qué ofrecerías?"
              multiline
            />

            <Field
              label="Canal de comunicación"
              value={data.campaign.channel}
              onChange={(value) => updateCampaign("channel", value)}
              placeholder="WhatsApp, correo, llamada..."
            />

            <Field
              label="Indicador de resultados"
              value={data.campaign.indicator}
              onChange={(value) => updateCampaign("indicator", value)}
              placeholder="Ej. tasa de respuesta, cotizaciones..."
            />

            <Field
              label="Propuesta comercial (máximo cinco líneas)"
              value={data.campaign.proposal}
              onChange={(value) => updateCampaign("proposal", value)}
              placeholder="Resume la decisión comercial de tu equipo."
              multiline
            />
          </div>
        </section>
      )}

      {kind === "crm-client-segmentation" && (
        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "crm",
            number: 2,
            title: "Creación y gestión de contactos en CRM",
          }}
          title="Actividad 1: Clasificación y segmentación de clientes"
          answers={{
            "Nombre del equipo": data.team,

            ...Object.fromEntries(
              data.clients.flatMap((client, index) => {
                const prefix = `CLIENTE ${index + 1}: ${client.name}`;

                return [
                  [`${prefix} - Situación`, client.situation],
                  [`${prefix} - Clasificación`, client.classification],
                  [`${prefix} - Etiquetas`, client.tags],
                  [`${prefix} - Segmento comercial`, client.segment],
                  [`${prefix} - Prioridad`, client.priority],
                  [`${prefix} - Acción recomendada`, client.action],
                  [`${prefix} - Justificación`, client.justification],
                  [
                    `${prefix} - Seleccionado como prioritario`,
                    client.selected ? "Sí" : "No",
                  ],
                ];
              }),
            ),

            "Total de clientes analizados": data.clients.length,
            "Clientes prioritarios seleccionados": `${selectedPriorities} de 3`,

            "Nombres de clientes prioritarios":
              data.clients
                .filter((client) => client.selected)
                .map((client) => client.name)
                .join(", ") || "Ninguno",
          }}
        />
      )}

      {kind === "crm-contact-lab" && (
        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "crm",
            number: 2,
            title: "Creación y gestión de contactos en CRM",
          }}
          title="Actividad 2: Construcción de base comercial en Bitrix24"
          answers={{
            "Nombre del equipo": data.team,

            ...Object.fromEntries(
              data.lab.flatMap((item, index) => {
                const prefix = `ETAPA ${index + 1}: ${LAB_STEPS[index].title}`;

                return [
                  [`${prefix} - Tiempo`, LAB_STEPS[index].time],
                  [`${prefix} - Instrucción`, LAB_STEPS[index].instruction],
                  [
                    `${prefix} - Evidencia requerida`,
                    LAB_STEPS[index].evidence,
                  ],
                  [`${prefix} - Enlace de evidencia`, item.evidenceUrl],
                  [`${prefix} - Observaciones`, item.observation],
                  [
                    `${prefix} - Estado`,
                    item.completed ? "Completada" : "Pendiente",
                  ],
                ];
              }),
            ),

            "Reflexión del laboratorio": data.reflection,

            "Etapas completadas": `${data.lab.filter((item) => item.completed).length} de 5`,
          }}
        />
      )}

      {kind === "crm-segmented-campaign" && (
        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "crm",
            number: 2,
            title: "Creación y gestión de contactos en CRM",
          }}
          title="Actividad 3: Campaña comercial segmentada"
          answers={{
            "Nombre del equipo": data.team,

            "Situación comercial":
              "La empresa dispone de presupuesto para contactar " +
              "únicamente a cinco clientes.",

            "Segmento elegido": data.campaign.segment,

            "Contactos seleccionados":
              data.clients
                .filter((client) => selectedCampaign.includes(client.id))
                .map((client) => `${client.name}: ${client.situation}`)
                .join(" | ") || "Ninguno",

            "Número de contactos seleccionados": `${selectedCampaign.length} de 5`,

            "Producto o beneficio ofrecido": data.campaign.offer,
            "Canal de comunicación": data.campaign.channel,
            "Indicador de resultados": data.campaign.indicator,
            "Propuesta comercial": data.campaign.proposal,
          }}
        />
      )}
    </div>
  );
}
