import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 5,
  title: "SEO técnico: rastreo, indexación y rendimiento web",
};

const KINDS = ["seo-crawl-audit", "seo-performance-audit"];

const CHECKS = [
  {
    id: "url",
    name: "Acceso a la URL",
    instruction: "Comprobar que la página carga correctamente.",
  },
  {
    id: "https",
    name: "HTTPS",
    instruction: "Verificar que la conexión utiliza HTTPS.",
  },
  {
    id: "robots",
    name: "Robots.txt",
    instruction: "Revisar el archivo robots.txt y sus reglas.",
  },
  {
    id: "sitemap",
    name: "Sitemap XML",
    instruction: "Localizar un mapa XML, cuando exista.",
  },
  {
    id: "canonical",
    name: "Canonical",
    instruction: "Comprobar la URL canonical declarada.",
  },
  {
    id: "indexation",
    name: "Estado de indexación",
    instruction: "Consultar Search Console solo con acceso autorizado.",
  },
];

const MOBILE_CHECKS = [
  "Los textos se leen sin ampliar la pantalla.",
  "El contenido se adapta al ancho móvil.",
  "Las imágenes no desbordan el contenedor.",
  "La navegación funciona correctamente.",
  "Los botones son fáciles de pulsar.",
  "No existen elementos que tapen contenido importante.",
];

const makeCheck = () => ({
  status: "",
  observation: "",
  evidence: "",
});

const makeAction = () => ({
  problem: "",
  solution: "",
  impact: "",
  effort: "",
  priority: "",
  responsible: "",
  evidence: "",
});

const makeData = () => ({
  team: "",
  company: "",
  projectUrl: "",
  projectType: "",
  auditSource: "",
  checks: CHECKS.map(makeCheck),
  findings: ["", ""],
  crawlConclusion: "",
  performance: {
    reportUrl: "",
    sourceType: "",
    mobileScore: "",
    desktopScore: "",
    lcp: "",
    lcpSource: "",
    inp: "",
    inpSource: "",
    cls: "",
    clsSource: "",
    recommendations: ["", "", ""],
    evidence: "",
  },
  mobile: {
    checks: MOBILE_CHECKS.map(() => ""),
    observations: ["", "", ""],
    evidence: "",
  },
  actions: Array.from({ length: 5 }, makeAction),
  priorityOne: "",
  priorityTwo: "",
  conclusion: "",
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
      checks: defaults.checks.map((item, index) => ({
        ...item,
        ...(saved.checks?.[index] || {}),
      })),
      findings: defaults.findings.map(
        (item, index) => saved.findings?.[index] ?? item,
      ),
      performance: {
        ...defaults.performance,
        ...(saved.performance || {}),
        recommendations: defaults.performance.recommendations.map(
          (item, index) => saved.performance?.recommendations?.[index] ?? item,
        ),
      },
      mobile: {
        ...defaults.mobile,
        ...(saved.mobile || {}),
        checks: defaults.mobile.checks.map(
          (item, index) => saved.mobile?.checks?.[index] ?? item,
        ),
        observations: defaults.mobile.observations.map(
          (item, index) => saved.mobile?.observations?.[index] ?? item,
        ),
      },
      actions: defaults.actions.map((item, index) => ({
        ...item,
        ...(saved.actions?.[index] || {}),
      })),
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
    background: "#fff",
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
    background: "#fff",
    color: "#14213d",
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
          rows={3}
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type="text"
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

export default function SeoWeek05Workshop({
  kind,
  slide,
  lessonId = "seo-semana-5",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana05:${lessonId}:` +
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
      console.warn("No se pudo guardar el laboratorio:", error);
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

  function setCheck(index, field, value) {
    update((current) => ({
      ...current,
      checks: current.checks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function setFinding(index, value) {
    update((current) => ({
      ...current,
      findings: current.findings.map((item, i) => (i === index ? value : item)),
    }));
  }

  function setPerformance(field, value) {
    update((current) => ({
      ...current,
      performance: {
        ...current.performance,
        [field]: value,
      },
    }));
  }

  function setRecommendation(index, value) {
    update((current) => ({
      ...current,
      performance: {
        ...current.performance,
        recommendations: current.performance.recommendations.map((item, i) =>
          i === index ? value : item,
        ),
      },
    }));
  }

  function setMobileArray(field, index, value) {
    update((current) => ({
      ...current,
      mobile: {
        ...current.mobile,
        [field]: current.mobile[field].map((item, i) =>
          i === index ? value : item,
        ),
      },
    }));
  }

  function setMobileEvidence(value) {
    update((current) => ({
      ...current,
      mobile: {
        ...current.mobile,
        evidence: value,
      },
    }));
  }

  function setAction(index, field, value) {
    update((current) => ({
      ...current,
      actions: current.actions.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  if (!KINDS.includes(activeKind)) {
    return null;
  }

  const checksComplete = data.checks.filter(
    (item) => item.status !== "",
  ).length;

  const actionsComplete = data.actions.filter(
    (item) => item.problem.trim() && item.solution.trim(),
  ).length;

  const crawlAnswers = Object.fromEntries(
    data.checks.flatMap((item, index) => {
      const prefix = CHECKS[index].name;

      return [
        [`${prefix} - Estado`, item.status],
        [`${prefix} - Observación`, item.observation],
        [`${prefix} - Evidencia`, item.evidence],
      ];
    }),
  );

  const performanceAnswers = {
    "Fuente del diagnóstico": data.performance.sourceType,
    "URL del informe": data.performance.reportUrl,
    "Puntuación móvil": data.performance.mobileScore,
    "Puntuación escritorio": data.performance.desktopScore,
    LCP: data.performance.lcp,
    "LCP - Fuente": data.performance.lcpSource,
    INP: data.performance.inp,
    "INP - Fuente": data.performance.inpSource,
    CLS: data.performance.cls,
    "CLS - Fuente": data.performance.clsSource,
    "Evidencia del reporte": data.performance.evidence,
  };

  return (
    <section style={styles.panel}>
      <span
        style={{
          color: "#2563eb",
          fontWeight: 800,
          fontSize: 12,
        }}
      >
        ANÁLISIS SEO · SEMANA 05
      </span>

      <h2>{slide?.title || "Auditoría SEO técnica"}</h2>

      <p style={styles.hint}>
        {slide?.instructions ||
          "Completa la auditoría con resultados reales y evidencias."}
      </p>

      <p style={styles.status}>Guardado automático en este dispositivo.</p>

      <div style={styles.grid}>
        <Field
          label="Nombre del equipo"
          value={data.team}
          onChange={(value) => setRoot("team", value)}
        />

        <Field
          label="Empresa del proyecto"
          value={data.company}
          onChange={(value) => setRoot("company", value)}
        />

        <Field
          label="URL de la página de la Semana 4"
          value={data.projectUrl}
          placeholder="https://..."
          onChange={(value) => setRoot("projectUrl", value)}
        />

        <Field
          label="Estado de la página"
          value={data.projectType}
          options={[
            "Publicada",
            "Prototipo no publicado",
            "Sitio de práctica autorizado",
          ]}
          onChange={(value) => setRoot("projectType", value)}
        />
      </div>

      {activeKind === "seo-crawl-audit" && (
        <>
          <div style={styles.card}>
            <h3>Laboratorio 1 — Rastreo e indexación</h3>

            <p style={styles.hint}>
              Revisa cada elemento. Si no tienes acceso o tu página no está
              publicada, utiliza "No verificable". No inventes resultados.
            </p>

            <Field
              label="Fuente o sitio utilizado para la auditoría"
              value={data.auditSource}
              placeholder="Proyecto propio, sitio de práctica o demostración"
              onChange={(value) => setRoot("auditSource", value)}
            />

            <p style={styles.status}>
              Comprobaciones registradas: {checksComplete} de 6
            </p>
          </div>

          {CHECKS.map((check, index) => {
            const item = data.checks[index];

            return (
              <div style={styles.card} key={check.id}>
                <h3>
                  {index + 1}. {check.name}
                </h3>

                <p style={styles.hint}>{check.instruction}</p>

                <Field
                  label="Estado"
                  value={item.status}
                  options={["Correcto", "Problemático", "No verificable"]}
                  onChange={(value) => setCheck(index, "status", value)}
                />

                <Field
                  label="Observación técnica"
                  multiline
                  value={item.observation}
                  onChange={(value) => setCheck(index, "observation", value)}
                />

                <Field
                  label="Enlace o referencia de evidencia"
                  value={item.evidence}
                  onChange={(value) => setCheck(index, "evidence", value)}
                />
              </div>
            );
          })}

          <div style={styles.card}>
            <h3>Dos hallazgos de la auditoría</h3>

            {data.findings.map((value, index) => (
              <Field
                key={index}
                label={`Hallazgo ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setFinding(index, next)}
              />
            ))}

            <Field
              label="Conclusión de rastreo e indexación"
              multiline
              value={data.crawlConclusion}
              onChange={(value) => setRoot("crawlConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Auditoría de rastreo e indexación"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "URL del proyecto": data.projectUrl,
              "Estado del proyecto": data.projectType,
              "Fuente de auditoría": data.auditSource,
              ...crawlAnswers,
              "Hallazgo 1": data.findings[0],
              "Hallazgo 2": data.findings[1],
              Conclusión: data.crawlConclusion,
            }}
          />
        </>
      )}

      {activeKind === "seo-performance-audit" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Diagnóstico de rendimiento</h3>

            <p style={styles.hint}>
              Utiliza PageSpeed Insights para una URL pública o un informe de
              demostración. No confundas datos de campo con datos de
              laboratorio. INP puede no estar disponible.
            </p>

            <Field
              label="Fuente del diagnóstico"
              value={data.performance.sourceType}
              options={[
                "PageSpeed Insights - URL pública",
                "Reporte de demostración",
              ]}
              onChange={(value) => setPerformance("sourceType", value)}
            />

            <Field
              label="URL del informe o referencia"
              value={data.performance.reportUrl}
              onChange={(value) => setPerformance("reportUrl", value)}
            />

            <div style={styles.grid}>
              <Field
                label="Puntuación móvil (0-100)"
                value={data.performance.mobileScore}
                onChange={(value) => setPerformance("mobileScore", value)}
              />

              <Field
                label="Puntuación escritorio (0-100)"
                value={data.performance.desktopScore}
                onChange={(value) => setPerformance("desktopScore", value)}
              />
            </div>

            {[
              {
                key: "lcp",
                label: "LCP (segundos)",
                source: "lcpSource",
              },
              {
                key: "inp",
                label: "INP (milisegundos)",
                source: "inpSource",
              },
              {
                key: "cls",
                label: "CLS (sin unidad)",
                source: "clsSource",
              },
            ].map((metric) => (
              <div key={metric.key} style={styles.grid}>
                <Field
                  label={metric.label}
                  value={data.performance[metric.key]}
                  placeholder="No disponible si no existe"
                  onChange={(value) => setPerformance(metric.key, value)}
                />

                <Field
                  label="Tipo de dato"
                  value={data.performance[metric.source]}
                  options={[
                    "Datos de campo",
                    "Datos de laboratorio",
                    "No disponible",
                  ]}
                  onChange={(value) => setPerformance(metric.source, value)}
                />
              </div>
            ))}

            <Field
              label="Enlace o referencia de captura"
              value={data.performance.evidence}
              onChange={(value) => setPerformance("evidence", value)}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Tres recomendaciones</h3>

            {data.performance.recommendations.map((value, index) => (
              <Field
                key={index}
                label={`Recomendación ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setRecommendation(index, next)}
              />
            ))}
          </div>

          <div style={styles.card}>
            <h3>Paso 3. Experiencia móvil</h3>

            <p style={styles.hint}>
              Revisa la página desde un teléfono o mediante la vista móvil del
              navegador.
            </p>

            {MOBILE_CHECKS.map((label, index) => (
              <Field
                key={index}
                label={label}
                value={data.mobile.checks[index]}
                options={["Cumple", "No cumple", "No verificable"]}
                onChange={(value) => setMobileArray("checks", index, value)}
              />
            ))}

            <h4>Tres observaciones móviles</h4>

            {data.mobile.observations.map((value, index) => (
              <Field
                key={index}
                label={`Observación ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setMobileArray("observations", index, next)}
              />
            ))}

            <Field
              label="Enlace o referencia de evidencia móvil"
              value={data.mobile.evidence}
              onChange={setMobileEvidence}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 4. Cinco acciones correctivas</h3>

            <p style={styles.status}>
              Acciones registradas: {actionsComplete} de 5
            </p>

            <p style={styles.hint}>
              Cada acción debe relacionarse con un hallazgo de la auditoría.
              Estima impacto y esfuerzo sin presentar suposiciones como datos
              medidos.
            </p>
          </div>

          {data.actions.map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>Acción correctiva {index + 1}</h3>

              <Field
                label="Problema identificado"
                multiline
                value={item.problem}
                onChange={(value) => setAction(index, "problem", value)}
              />

              <Field
                label="Solución propuesta"
                multiline
                value={item.solution}
                onChange={(value) => setAction(index, "solution", value)}
              />

              <div style={styles.grid}>
                <Field
                  label="Impacto estimado"
                  value={item.impact}
                  options={["Alto", "Medio", "Bajo"]}
                  onChange={(value) => setAction(index, "impact", value)}
                />

                <Field
                  label="Esfuerzo estimado"
                  value={item.effort}
                  options={["Alto", "Medio", "Bajo"]}
                  onChange={(value) => setAction(index, "effort", value)}
                />

                <Field
                  label="Prioridad"
                  value={item.priority}
                  options={["Alta", "Media", "Baja"]}
                  onChange={(value) => setAction(index, "priority", value)}
                />

                <Field
                  label="Responsable"
                  value={item.responsible}
                  onChange={(value) => setAction(index, "responsible", value)}
                />
              </div>

              <Field
                label="Evidencia o justificación"
                multiline
                value={item.evidence}
                onChange={(value) => setAction(index, "evidence", value)}
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 5. Prioridades finales</h3>

            <Field
              label="Primera mejora prioritaria"
              multiline
              value={data.priorityOne}
              onChange={(value) => setRoot("priorityOne", value)}
            />

            <Field
              label="Segunda mejora prioritaria"
              multiline
              value={data.priorityTwo}
              onChange={(value) => setRoot("priorityTwo", value)}
            />

            <Field
              label="Conclusión técnica"
              multiline
              value={data.conclusion}
              onChange={(value) => setRoot("conclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Rendimiento y optimización móvil"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "URL del proyecto": data.projectUrl,
              "Estado del proyecto": data.projectType,
              ...performanceAnswers,

              ...Object.fromEntries(
                data.performance.recommendations.map((value, index) => [
                  `Recomendación ${index + 1}`,
                  value,
                ]),
              ),

              ...Object.fromEntries(
                MOBILE_CHECKS.map((label, index) => [
                  `Móvil - ${label}`,
                  data.mobile.checks[index],
                ]),
              ),

              ...Object.fromEntries(
                data.mobile.observations.map((value, index) => [
                  `Observación móvil ${index + 1}`,
                  value,
                ]),
              ),

              "Evidencia móvil": data.mobile.evidence,

              ...Object.fromEntries(
                data.actions.flatMap((item, index) => {
                  const prefix = `ACCIÓN ${index + 1}`;

                  return [
                    [`${prefix} - Problema`, item.problem],
                    [`${prefix} - Solución`, item.solution],
                    [`${prefix} - Impacto`, item.impact],
                    [`${prefix} - Esfuerzo`, item.effort],
                    [`${prefix} - Prioridad`, item.priority],
                    [`${prefix} - Responsable`, item.responsible],
                    [`${prefix} - Justificación`, item.evidence],
                  ];
                }),
              ),

              "Prioridad 1": data.priorityOne,
              "Prioridad 2": data.priorityTwo,
              "Conclusión técnica": data.conclusion,
            }}
          />
        </>
      )}
    </section>
  );
}
