import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 17,
  title: "Consultoría digital e informe ejecutivo",
};

const AREAS = [
  "SEO técnico",
  "SEO de contenido",
  "SEO off-page/local",
  "SEM",
  "AEO",
  "GEO",
];

const REPORT_SECTIONS = [
  "Portada y datos del proyecto",
  "Resumen ejecutivo",
  "Empresa y alcance del estudio",
  "Diagnóstico SEO y competencia",
  "Keywords y contenido",
  "SEM simulado",
  "Propuestas AEO",
  "Auditoría GEO",
  "Prácticas GA4, GTM, GSC y Looker Studio",
  "Roadmap de 90 días",
  "KPI y conclusiones",
  "Anexos y fuentes",
];

const PRESENTATION = [
  "Portada y equipo",
  "Situación inicial",
  "Tres hallazgos SEO",
  "Keywords y competencia",
  "Propuesta SEM",
  "AEO y GEO",
  "Web académica",
  "Cinco prioridades",
  "Roadmap y KPI",
  "Conclusiones",
];

const REVIEW = [
  "Las recomendaciones tienen evidencia",
  "El problema empresarial se entiende",
  "El roadmap parece viable",
  "Los KPI permiten evaluar las acciones",
  "Se distinguen los dos entornos",
  "No se presentan simulaciones como resultados reales",
];

const S = {
  root: {
    padding: 22,
    background: "#f8fafc",
    color: "#111b35",
    borderRadius: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid #dbe3ee",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12,
    fontSize: 13,
    fontWeight: 650,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    background: "#fff",
    color: "#111b35",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    font: "inherit",
  },
  note: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 1.6,
  },
  button: {
    background: "#ee7544",
    color: "#fff",
    padding: "11px 16px",
    border: 0,
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
  },
};

function blankFinding() {
  return {
    area: "",
    finding: "",
    evidence: "",
    impact: "Medio",
    effort: "Medio",
    urgency: "Medio",
    action: "",
    kpi: "",
    priority: false,
    reason: "",
  };
}

function blankAction() {
  return {
    phase: "",
    action: "",
    owner: "",
    dependency: "",
    kpi: "",
    expected: "",
  };
}

function initialData() {
  return {
    team: "",
    company: "",
    companyUrl: "",
    academicUrl: "",
    executiveSummary: "",
    findings: Array.from({ length: 10 }, blankFinding),
    reportUrl: "",
    reportChecks: REPORT_SECTIONS.map(() => false),
    roadmap: Array.from({ length: 8 }, blankAction),
    presentationUrl: "",
    presentationChecks: PRESENTATION.map(() => false),
    reviewerTeam: "",
    reviewChecks: REVIEW.map(() => false),
    corrections: ["", "", ""],
    finalNotes: "",
  };
}

function load(key) {
  const base = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return base;
    }

    return {
      ...base,
      ...saved,
      findings: base.findings.map((item, i) => ({
        ...item,
        ...(saved.findings?.[i] || {}),
      })),
      roadmap: base.roadmap.map((item, i) => ({
        ...item,
        ...(saved.roadmap?.[i] || {}),
      })),
      reportChecks: base.reportChecks.map((_, i) =>
        Boolean(saved.reportChecks?.[i]),
      ),
      presentationChecks: base.presentationChecks.map((_, i) =>
        Boolean(saved.presentationChecks?.[i]),
      ),
      reviewChecks: base.reviewChecks.map((_, i) =>
        Boolean(saved.reviewChecks?.[i]),
      ),
      corrections: base.corrections.map(
        (item, i) => saved.corrections?.[i] ?? item,
      ),
    };
  } catch {
    return base;
  }
}

function Field({
  label,
  value = "",
  onChange,
  options,
  multiline = false,
  placeholder = "",
}) {
  return (
    <label style={S.field}>
      {label}

      {options ? (
        <select
          style={S.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
          style={S.input}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={S.input}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Checks({ labels, values, onChange }) {
  return (
    <>
      {labels.map((label, i) => (
        <label
          key={label}
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <input
            type="checkbox"
            checked={values[i]}
            onChange={(e) => onChange(i, e.target.checked)}
          />
          <span>{label}</span>
        </label>
      ))}
      <p style={S.note}>
        {values.filter(Boolean).length}/{labels.length} completados
      </p>
    </>
  );
}

function priorityScore(item) {
  const values = {
    Bajo: 1,
    Medio: 2,
    Alto: 3,
  };

  return (
    (values[item.impact] || 2) * 2 +
    (values[item.urgency] || 2) -
    (values[item.effort] || 2)
  );
}

function findingAnswers(findings) {
  return Object.fromEntries(
    findings.flatMap((item, i) => [
      [`Hallazgo ${i + 1} - Área`, item.area],
      [`Hallazgo ${i + 1} - Descripción`, item.finding],
      [`Hallazgo ${i + 1} - Evidencia`, item.evidence],
      [`Hallazgo ${i + 1} - Impacto`, item.impact],
      [`Hallazgo ${i + 1} - Esfuerzo`, item.effort],
      [`Hallazgo ${i + 1} - Urgencia`, item.urgency],
      [`Hallazgo ${i + 1} - Acción`, item.action],
      [`Hallazgo ${i + 1} - KPI`, item.kpi],
      [`Hallazgo ${i + 1} - Puntuación`, priorityScore(item)],
      [`Hallazgo ${i + 1} - Prioritario`, item.priority ? "Sí" : "No"],
      [`Hallazgo ${i + 1} - Justificación`, item.reason],
    ]),
  );
}

function roadmapAnswers(roadmap) {
  return Object.fromEntries(
    roadmap.flatMap((item, i) => [
      [`Acción ${i + 1} - Fase`, item.phase],
      [`Acción ${i + 1} - Descripción`, item.action],
      [`Acción ${i + 1} - Responsable`, item.owner],
      [`Acción ${i + 1} - Dependencia`, item.dependency],
      [`Acción ${i + 1} - KPI`, item.kpi],
      [`Acción ${i + 1} - Resultado esperado`, item.expected],
    ]),
  );
}

export default function SeoWeek17Workshop({
  kind,
  slide,
  lessonId = "seo-semana-17",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana17:${lessonId}:` +
    String(studentName || "sin-nombre")
      .trim()
      .toLowerCase();

  const [stored, setStored] = useState(() => ({
    key: storageKey,
    data: load(storageKey),
  }));

  const data = stored.key === storageKey ? stored.data : load(storageKey);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar Semana 17:", error);
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

  function setArray(field, index, value) {
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) => (i === index ? value : item)),
    }));
  }

  function setNested(field, index, name, value) {
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) =>
        i === index ? { ...item, [name]: value } : item,
      ),
    }));
  }

  const allowed = [
    "seo17-diagnosis-lab",
    "seo17-roadmap-lab",
    "seo17-presentation-lab",
    "seo17-peer-review",
  ];

  if (!allowed.includes(activeKind)) {
    return null;
  }

  const priorities = data.findings.filter((item) => item.priority).length;

  const words = data.executiveSummary
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <section style={S.root}>
      <span
        style={{
          color: "#ee7544",
          fontWeight: 800,
        }}
      >
        ANÁLISIS SEO · SEMANA 17
      </span>

      <h2>{slide?.title || "Consultoría digital"}</h2>
      <p style={S.note}>{slide?.instructions}</p>

      <p style={{ color: "#047857", fontSize: 13 }}>
        Guardado automático en este dispositivo.
      </p>

      <div style={S.card}>
        <h3>Identificación del proyecto</h3>

        <div style={S.grid}>
          <Field
            label="Equipo consultor"
            value={data.team}
            onChange={(v) => setRoot("team", v)}
          />
          <Field
            label="Empresa real"
            value={data.company}
            onChange={(v) => setRoot("company", v)}
          />
          <Field
            label="Sitio público de la empresa"
            value={data.companyUrl}
            onChange={(v) => setRoot("companyUrl", v)}
          />
          <Field
            label="Web académica de práctica"
            value={data.academicUrl}
            onChange={(v) => setRoot("academicUrl", v)}
          />
        </div>
      </div>

      {activeKind === "seo17-diagnosis-lab" && (
        <>
          <div style={S.card}>
            <h3>Laboratorio 1 · Matriz ejecutiva</h3>
            <p style={S.note}>
              Registra diez hallazgos sustentados en las auditorías externas.
              Selecciona exactamente cinco prioridades.
            </p>
            <strong>Prioridades seleccionadas: {priorities}/5</strong>
          </div>

          {data.findings.map((item, i) => (
            <div key={i} style={S.card}>
              <h3>Hallazgo {i + 1}</h3>

              <Field
                label="Área"
                value={item.area}
                options={AREAS}
                onChange={(v) => setNested("findings", i, "area", v)}
              />

              <Field
                label="Hallazgo observado"
                multiline
                value={item.finding}
                onChange={(v) => setNested("findings", i, "finding", v)}
              />

              <Field
                label="Evidencia pública verificable"
                multiline
                value={item.evidence}
                onChange={(v) => setNested("findings", i, "evidence", v)}
              />

              <div style={S.grid}>
                {[
                  ["Impacto esperado", "impact"],
                  ["Esfuerzo estimado", "effort"],
                  ["Urgencia", "urgency"],
                ].map(([label, field]) => (
                  <Field
                    key={field}
                    label={label}
                    value={item[field]}
                    options={["Bajo", "Medio", "Alto"]}
                    onChange={(v) => setNested("findings", i, field, v)}
                  />
                ))}
              </div>

              <Field
                label="Acción propuesta"
                multiline
                value={item.action}
                onChange={(v) => setNested("findings", i, "action", v)}
              />

              <Field
                label="Indicador de seguimiento"
                value={item.kpi}
                onChange={(v) => setNested("findings", i, "kpi", v)}
              />

              <p style={S.note}>
                Puntuación didáctica: <strong>{priorityScore(item)}</strong>
              </p>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <input
                  type="checkbox"
                  checked={item.priority}
                  disabled={!item.priority && priorities >= 5}
                  onChange={(e) =>
                    setNested("findings", i, "priority", e.target.checked)
                  }
                />
                Seleccionar como recomendación prioritaria
              </label>

              {item.priority && (
                <Field
                  label="Justificación de la prioridad"
                  multiline
                  value={item.reason}
                  onChange={(v) => setNested("findings", i, "reason", v)}
                />
              )}
            </div>
          ))}

          <div style={S.card}>
            <h3>Resumen ejecutivo</h3>

            <Field
              label="Redacta entre 150 y 250 palabras"
              multiline
              value={data.executiveSummary}
              onChange={(v) => setRoot("executiveSummary", v)}
            />

            <p
              style={{
                color: words >= 150 && words <= 250 ? "#047857" : "#b45309",
              }}
            >
              {words} palabras · Objetivo: 150–250
            </p>
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Diagnóstico ejecutivo"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio de la empresa": data.companyUrl,
              "Web académica": data.academicUrl,
              "Resumen ejecutivo": data.executiveSummary,
              "Total de prioridades": priorities,
              ...findingAnswers(data.findings),
              Nota: "Recomendaciones basadas en auditoría externa. No implementadas.",
            }}
          />
        </>
      )}

      {activeKind === "seo17-roadmap-lab" && (
        <>
          <div style={S.card}>
            <h3>Parte A · Informe consolidado</h3>

            <Field
              label="Enlace al documento de consultoría"
              value={data.reportUrl}
              onChange={(v) => setRoot("reportUrl", v)}
            />

            <Checks
              labels={REPORT_SECTIONS}
              values={data.reportChecks}
              onChange={(i, v) => setArray("reportChecks", i, v)}
            />

            <p style={S.note}>
              Extensión recomendada: 15 a 25 páginas más anexos. Las casillas
              son una autoevaluación, no una comprobación automática del
              documento.
            </p>
          </div>

          <div style={S.card}>
            <h3>Parte B · Roadmap de 90 días</h3>

            <p style={S.note}>
              Registra al menos ocho acciones con responsables sugeridos,
              dependencias, indicadores y resultados esperados.
            </p>
          </div>

          {data.roadmap.map((item, i) => (
            <div key={i} style={S.card}>
              <h3>Acción estratégica {i + 1}</h3>

              <Field
                label="Fase"
                value={item.phase}
                options={["Días 1–30", "Días 31–60", "Días 61–90"]}
                onChange={(v) => setNested("roadmap", i, "phase", v)}
              />

              <Field
                label="Acción propuesta"
                multiline
                value={item.action}
                onChange={(v) => setNested("roadmap", i, "action", v)}
              />

              <div style={S.grid}>
                <Field
                  label="Responsable sugerido"
                  value={item.owner}
                  onChange={(v) => setNested("roadmap", i, "owner", v)}
                />

                <Field
                  label="Dependencia o permiso necesario"
                  value={item.dependency}
                  onChange={(v) => setNested("roadmap", i, "dependency", v)}
                />

                <Field
                  label="KPI"
                  value={item.kpi}
                  onChange={(v) => setNested("roadmap", i, "kpi", v)}
                />
              </div>

              <Field
                label="Resultado esperado (no garantizado)"
                multiline
                value={item.expected}
                onChange={(v) => setNested("roadmap", i, "expected", v)}
              />
            </div>
          ))}

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Informe y roadmap de 90 días"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Informe consolidado": data.reportUrl,
              ...Object.fromEntries(
                REPORT_SECTIONS.map((name, i) => [
                  name,
                  data.reportChecks[i] ? "Incluido" : "Pendiente",
                ]),
              ),
              ...roadmapAnswers(data.roadmap),
              Nota: "Roadmap propuesto, sujeto a aprobación y recursos de la empresa.",
            }}
          />
        </>
      )}

      {activeKind === "seo17-presentation-lab" && (
        <>
          <div style={S.card}>
            <h3>Parte C · Presentación ejecutiva</h3>

            <p style={S.note}>
              Diseña entre ocho y diez diapositivas. Utiliza los puntos
              siguientes como estructura de referencia.
            </p>

            <Checks
              labels={PRESENTATION}
              values={data.presentationChecks}
              onChange={(i, v) => setArray("presentationChecks", i, v)}
            />

            <Field
              label="Enlace a la presentación"
              value={data.presentationUrl}
              onChange={(v) => setRoot("presentationUrl", v)}
            />

            <Field
              label="Observaciones para la defensa"
              multiline
              value={data.finalNotes}
              onChange={(v) => setRoot("finalNotes", v)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Presentación ejecutiva preliminar"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Presentación: data.presentationUrl,
              ...Object.fromEntries(
                PRESENTATION.map((name, i) => [
                  name,
                  data.presentationChecks[i] ? "Preparado" : "Pendiente",
                ]),
              ),
              Observaciones: data.finalNotes,
            }}
          />
        </>
      )}

      {activeKind === "seo17-peer-review" && (
        <>
          <div style={S.card}>
            <h3>Comité de consultoría</h3>

            <p>
              Presenta tu propuesta durante tres minutos. Otro equipo revisará
              sus evidencias, viabilidad y claridad.
            </p>

            <Field
              label="Equipo que realiza la revisión"
              value={data.reviewerTeam}
              onChange={(v) => setRoot("reviewerTeam", v)}
            />

            <Checks
              labels={REVIEW}
              values={data.reviewChecks}
              onChange={(i, v) => setArray("reviewChecks", i, v)}
            />
          </div>

          <div style={S.card}>
            <h3>Tres correcciones antes de la Semana 18</h3>

            {data.corrections.map((item, i) => (
              <Field
                key={i}
                label={`Corrección obligatoria ${i + 1}`}
                multiline
                value={item}
                onChange={(v) => setArray("corrections", i, v)}
              />
            ))}
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Comité de consultoría: revisión por pares"
            answers={{
              Equipo: data.team,
              "Equipo evaluador": data.reviewerTeam,
              ...Object.fromEntries(
                REVIEW.map((name, i) => [
                  name,
                  data.reviewChecks[i] ? "Cumple" : "Por corregir",
                ]),
              ),
              "Corrección 1": data.corrections[0],
              "Corrección 2": data.corrections[1],
              "Corrección 3": data.corrections[2],
            }}
          />
        </>
      )}
    </section>
  );
}
