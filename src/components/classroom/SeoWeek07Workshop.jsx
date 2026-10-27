import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 7,
  title: "Auditoría SEO integral y plan estratégico de 90 días",
};

const KINDS = ["seo-integral-audit", "seo-roadmap-lab"];

const AREAS = [
  "Keyword Research",
  "Benchmarking",
  "SEO On Page",
  "SEO técnico",
  "SEO Off Page",
  "Contenido",
  "SEO local",
  "Otra",
];

const LEVELS = ["Alto", "Medio", "Bajo"];

const PHASES = ["Días 1–30", "Días 31–60", "Días 61–90"];

const makeFinding = () => ({
  area: "",
  observation: "",
  evidence: "",
  evidenceUrl: "",
  status: "",
  impactDescription: "",
  recommendation: "",
  limitation: "",
});

const makeAction = () => ({
  impact: "",
  effort: "",
  urgency: "",
  priority: "",
  phase: "",
  responsible: "",
  deliverable: "",
  dependency: "",
  kpi: "",
  measurementSource: "",
  access: "",
});

const makeData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  industry: "",
  auditDate: "",
  keywordSummary: "",
  competitorSummary: "",
  onpageSummary: "",
  technicalSummary: "",
  offpageSummary: "",
  findings: Array.from({ length: 10 }, makeFinding),
  executiveConclusion: "",
  actions: Array.from({ length: 10 }, makeAction),
  criticalActions: [],
  executiveRecommendations: ["", "", ""],
  roadmapConclusion: "",
});

function loadData(key) {
  const defaults = makeData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return defaults;
    }

    return {
      ...defaults,
      ...saved,
      findings: defaults.findings.map((item, index) => ({
        ...item,
        ...(saved.findings?.[index] || {}),
      })),
      actions: defaults.actions.map((item, index) => ({
        ...item,
        ...(saved.actions?.[index] || {}),
      })),
      criticalActions: Array.isArray(saved.criticalActions)
        ? saved.criticalActions.filter(
            (index) => Number.isInteger(index) && index >= 0 && index < 10,
          )
        : [],
      executiveRecommendations: defaults.executiveRecommendations.map(
        (item, index) => saved.executiveRecommendations?.[index] ?? item,
      ),
    };
  } catch {
    return defaults;
  }
}

const styles = {
  panel: {
    background: "#f8fafc",
    color: "#14213d",
    padding: 24,
    borderRadius: 18,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #dbe3ee",
    borderRadius: 14,
    padding: 18,
    margin: "16px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: 650,
  },
  input: {
    width: "100%",
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    fontFamily: "inherit",
    fontSize: 14,
    color: "#14213d",
    background: "#fff",
    boxSizing: "border-box",
  },
  hint: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 1.6,
  },
  status: {
    color: "#047857",
    fontSize: 13,
    fontWeight: 700,
  },
  checkbox: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    padding: "10px 0",
    fontSize: 14,
  },
};

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
  options,
  placeholder = "",
}) {
  return (
    <label style={styles.field}>
      <span>{label}</span>

      {options ? (
        <select
          style={styles.input}
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
          style={styles.input}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          style={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

export default function SeoWeek07Workshop({
  kind,
  slide,
  lessonId = "seo-semana-7",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana07:${lessonId}:` +
    String(studentName || "sin-nombre")
      .trim()
      .toLowerCase();

  const [stored, setStored] = useState(() => ({
    key: storageKey,
    data: loadData(storageKey),
  }));

  const data = stored.key === storageKey ? stored.data : loadData(storageKey);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar la auditoría SEO:", error);
    }

    setStored({
      key: storageKey,
      data: next,
    });
  }

  function setRoot(field, value) {
    update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function setCollection(collection, index, field, value) {
    update((current) => ({
      ...current,
      [collection]: current[collection].map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function setRecommendation(index, value) {
    update((current) => ({
      ...current,
      executiveRecommendations: current.executiveRecommendations.map(
        (item, i) => (i === index ? value : item),
      ),
    }));
  }

  function toggleCritical(index, checked) {
    update((current) => ({
      ...current,
      criticalActions: checked
        ? current.criticalActions.length < 5
          ? [...current.criticalActions, index]
          : current.criticalActions
        : current.criticalActions.filter((item) => item !== index),
    }));
  }

  if (!KINDS.includes(activeKind)) {
    return null;
  }

  const findingCount = data.findings.filter(
    (item) => item.observation.trim() && item.recommendation.trim(),
  ).length;

  const actionCount = data.actions.filter(
    (item) => item.phase && item.kpi.trim() && item.deliverable.trim(),
  ).length;

  const findingsAnswers = Object.fromEntries(
    data.findings.flatMap((item, index) => {
      const prefix = `HALLAZGO ${index + 1}`;

      return [
        [`${prefix} - Área`, item.area],
        [`${prefix} - Observación`, item.observation],
        [`${prefix} - Evidencia`, item.evidence],
        [`${prefix} - URL`, item.evidenceUrl],
        [`${prefix} - Estado`, item.status],
        [`${prefix} - Impacto potencial`, item.impactDescription],
        [`${prefix} - Recomendación`, item.recommendation],
        [`${prefix} - Limitación`, item.limitation],
      ];
    }),
  );

  const actionsAnswers = Object.fromEntries(
    data.actions.flatMap((item, index) => {
      const prefix = `ACCIÓN ${index + 1}`;

      return [
        [`${prefix} - Hallazgo`, data.findings[index].observation],
        [`${prefix} - Recomendación`, data.findings[index].recommendation],
        [`${prefix} - Impacto`, item.impact],
        [`${prefix} - Esfuerzo`, item.effort],
        [`${prefix} - Urgencia`, item.urgency],
        [`${prefix} - Prioridad`, item.priority],
        [`${prefix} - Fase`, item.phase],
        [`${prefix} - Responsable`, item.responsible],
        [`${prefix} - Entregable`, item.deliverable],
        [`${prefix} - Dependencia`, item.dependency],
        [`${prefix} - KPI`, item.kpi],
        [`${prefix} - Fuente de medición`, item.measurementSource],
        [`${prefix} - Permisos`, item.access],
      ];
    }),
  );

  return (
    <section style={styles.panel}>
      <span
        style={{
          color: "#2563eb",
          fontSize: 12,
          fontWeight: 800,
        }}
      >
        ANÁLISIS SEO · SEMANA 07
      </span>

      <h2>{slide?.title || "Auditoría integral y roadmap SEO"}</h2>

      <p style={styles.hint}>
        {slide?.instructions ||
          "Completa el diagnóstico utilizando evidencias verificables."}
      </p>

      <p style={styles.status}>Guardado automático en este dispositivo.</p>

      <div style={styles.grid}>
        <Field
          label="Nombre del equipo"
          value={data.team}
          onChange={(value) => setRoot("team", value)}
        />

        <Field
          label="Empresa real del proyecto"
          value={data.company}
          onChange={(value) => setRoot("company", value)}
        />

        <Field
          label="Sitio web oficial"
          value={data.companyUrl}
          onChange={(value) => setRoot("companyUrl", value)}
        />

        <Field
          label="Sector empresarial"
          value={data.industry}
          onChange={(value) => setRoot("industry", value)}
        />

        <Field
          label="Fecha de auditoría"
          value={data.auditDate}
          placeholder="DD/MM/AAAA"
          onChange={(value) => setRoot("auditDate", value)}
        />
      </div>

      {activeKind === "seo-integral-audit" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Recupera seis semanas de investigación</h3>

            <p style={styles.hint}>
              Resume únicamente resultados comprobados. Si una verificación
              requiere acceso administrativo, explica esa limitación.
            </p>

            <Field
              label="Keyword Research — Semanas 1 y 2"
              value={data.keywordSummary}
              multiline
              placeholder="Resume las keywords estratégicas y oportunidades."
              onChange={(value) => setRoot("keywordSummary", value)}
            />

            <Field
              label="Benchmarking — Semana 3"
              value={data.competitorSummary}
              multiline
              onChange={(value) => setRoot("competitorSummary", value)}
            />

            <Field
              label="SEO On Page — Semana 4"
              value={data.onpageSummary}
              multiline
              onChange={(value) => setRoot("onpageSummary", value)}
            />

            <Field
              label="SEO técnico — Semana 5"
              value={data.technicalSummary}
              multiline
              onChange={(value) => setRoot("technicalSummary", value)}
            />

            <Field
              label="SEO Off Page — Semana 6"
              value={data.offpageSummary}
              multiline
              onChange={(value) => setRoot("offpageSummary", value)}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Documenta diez hallazgos</h3>

            <p style={styles.hint}>
              Cada hallazgo debe contener un área, una observación, evidencia,
              impacto potencial y recomendación. Distingue problemas confirmados
              de hipótesis.
            </p>

            <p style={styles.status}>
              Hallazgos documentados: {findingCount} de 10
            </p>
          </div>

          {data.findings.map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>Hallazgo SEO {index + 1}</h3>

              <div style={styles.grid}>
                <Field
                  label="Área SEO"
                  value={item.area}
                  options={AREAS}
                  onChange={(value) =>
                    setCollection("findings", index, "area", value)
                  }
                />

                <Field
                  label="Estado del hallazgo"
                  value={item.status}
                  options={[
                    "Confirmado con evidencia pública",
                    "Hipótesis pendiente de verificación",
                    "No verificable sin autorización",
                  ]}
                  onChange={(value) =>
                    setCollection("findings", index, "status", value)
                  }
                />
              </div>

              <Field
                label="Observación o problema"
                multiline
                value={item.observation}
                onChange={(value) =>
                  setCollection("findings", index, "observation", value)
                }
              />

              <Field
                label="Evidencia encontrada"
                multiline
                value={item.evidence}
                onChange={(value) =>
                  setCollection("findings", index, "evidence", value)
                }
              />

              <Field
                label="URL de evidencia"
                value={item.evidenceUrl}
                placeholder="https://..."
                onChange={(value) =>
                  setCollection("findings", index, "evidenceUrl", value)
                }
              />

              <Field
                label="Impacto potencial"
                multiline
                value={item.impactDescription}
                onChange={(value) =>
                  setCollection("findings", index, "impactDescription", value)
                }
              />

              <Field
                label="Recomendación de mejora"
                multiline
                value={item.recommendation}
                onChange={(value) =>
                  setCollection("findings", index, "recommendation", value)
                }
              />

              <Field
                label="Limitaciones de acceso o medición"
                multiline
                value={item.limitation}
                onChange={(value) =>
                  setCollection("findings", index, "limitation", value)
                }
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 3. Diagnóstico ejecutivo</h3>

            <Field
              label="Conclusión sobre el estado SEO de la empresa"
              multiline
              value={data.executiveConclusion}
              onChange={(value) => setRoot("executiveConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Auditoría SEO integral"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio web": data.companyUrl,
              Sector: data.industry,
              Fecha: data.auditDate,
              "Keyword Research": data.keywordSummary,
              Benchmarking: data.competitorSummary,
              "SEO On Page": data.onpageSummary,
              "SEO técnico": data.technicalSummary,
              "SEO Off Page": data.offpageSummary,
              ...findingsAnswers,
              "Diagnóstico ejecutivo": data.executiveConclusion,
            }}
          />
        </>
      )}

      {activeKind === "seo-roadmap-lab" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Selecciona cinco prioridades</h3>

            <p style={styles.hint}>
              Recupera los diez hallazgos del Laboratorio 1. Marca exactamente
              cinco acciones críticas.
            </p>

            <p style={styles.status}>
              Prioridades seleccionadas: {data.criticalActions.length} de 5
            </p>

            {data.findings.map((finding, index) => {
              const checked = data.criticalActions.includes(index);

              return (
                <label key={index} style={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={!checked && data.criticalActions.length >= 5}
                    onChange={(event) =>
                      toggleCritical(index, event.target.checked)
                    }
                  />

                  <span>
                    <strong>Acción {index + 1}:</strong>{" "}
                    {finding.recommendation ||
                      "Completa la recomendación en el Laboratorio 1."}
                  </span>
                </label>
              );
            })}
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Diseña diez acciones</h3>

            <p style={styles.hint}>
              Para cada recomendación define impacto, esfuerzo, urgencia,
              prioridad, fase, responsable, entregable, dependencia, KPI y
              permisos necesarios.
            </p>

            <p style={styles.status}>
              Acciones planificadas: {actionCount} de 10
            </p>
          </div>

          {data.actions.map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>Acción estratégica {index + 1}</h3>

              <p style={styles.hint}>
                <strong>Hallazgo:</strong>{" "}
                {data.findings[index].observation || "Pendiente de completar."}
              </p>

              <p style={styles.hint}>
                <strong>Recomendación:</strong>{" "}
                {data.findings[index].recommendation ||
                  "Pendiente de completar."}
              </p>

              <div style={styles.grid}>
                <Field
                  label="Impacto esperado"
                  value={item.impact}
                  options={LEVELS}
                  onChange={(value) =>
                    setCollection("actions", index, "impact", value)
                  }
                />

                <Field
                  label="Esfuerzo estimado"
                  value={item.effort}
                  options={LEVELS}
                  onChange={(value) =>
                    setCollection("actions", index, "effort", value)
                  }
                />

                <Field
                  label="Urgencia"
                  value={item.urgency}
                  options={LEVELS}
                  onChange={(value) =>
                    setCollection("actions", index, "urgency", value)
                  }
                />

                <Field
                  label="Prioridad"
                  value={item.priority}
                  options={["Alta", "Media", "Baja"]}
                  onChange={(value) =>
                    setCollection("actions", index, "priority", value)
                  }
                />

                <Field
                  label="Fase de ejecución"
                  value={item.phase}
                  options={PHASES}
                  onChange={(value) =>
                    setCollection("actions", index, "phase", value)
                  }
                />

                <Field
                  label="Responsable propuesto"
                  value={item.responsible}
                  options={[
                    "Webmaster",
                    "Redactor SEO",
                    "Marketing",
                    "Diseño UX/UI",
                    "Desarrollo web",
                    "Dirección",
                    "Otro",
                  ]}
                  onChange={(value) =>
                    setCollection("actions", index, "responsible", value)
                  }
                />
              </div>

              <Field
                label="Entregable concreto"
                value={item.deliverable}
                onChange={(value) =>
                  setCollection("actions", index, "deliverable", value)
                }
              />

              <Field
                label="Dependencias"
                value={item.dependency}
                multiline
                onChange={(value) =>
                  setCollection("actions", index, "dependency", value)
                }
              />

              <Field
                label="KPI para medir el resultado"
                value={item.kpi}
                placeholder="Ej. páginas corregidas"
                onChange={(value) =>
                  setCollection("actions", index, "kpi", value)
                }
              />

              <Field
                label="Herramienta o fuente de medición"
                value={item.measurementSource}
                placeholder="Ej. revisión pública, GA4 o Search Console"
                onChange={(value) =>
                  setCollection("actions", index, "measurementSource", value)
                }
              />

              <Field
                label="Acceso necesario"
                value={item.access}
                options={[
                  "Se puede verificar públicamente",
                  "Requiere autorización de la empresa",
                  "Requiere datos internos",
                  "Pendiente de determinar",
                ]}
                onChange={(value) =>
                  setCollection("actions", index, "access", value)
                }
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 3. Defensa ejecutiva</h3>

            <p style={styles.hint}>
              Redacta las tres recomendaciones que presentarías a la dirección
              de la empresa.
            </p>

            {data.executiveRecommendations.map((value, index) => (
              <Field
                key={index}
                label={`Recomendación ejecutiva ${index + 1}`}
                value={value}
                multiline
                onChange={(next) => setRecommendation(index, next)}
              />
            ))}

            <Field
              label="Conclusión del roadmap de 90 días"
              value={data.roadmapConclusion}
              multiline
              onChange={(value) => setRoot("roadmapConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Roadmap SEO de 90 días"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio web": data.companyUrl,
              "Acciones críticas": data.criticalActions
                .map(
                  (index) =>
                    `Acción ${index + 1}: ` +
                    data.findings[index].recommendation,
                )
                .join("\n"),
              ...actionsAnswers,
              "Recomendación ejecutiva 1": data.executiveRecommendations[0],
              "Recomendación ejecutiva 2": data.executiveRecommendations[1],
              "Recomendación ejecutiva 3": data.executiveRecommendations[2],
              "Conclusión del roadmap": data.roadmapConclusion,
            }}
          />
        </>
      )}
    </section>
  );
}
