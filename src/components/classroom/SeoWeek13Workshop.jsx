import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 13,
  title: "AEO: optimización de contenidos para motores de respuesta",
};

const makeQuestion = () => ({
  question: "",
  intent: "",
  priority: "",
  searchFormat: "",
  companyStatus: "",
  companyUrl: "",
  evidence: "",
  finding: "",
  improvement: "",
  directAnswer: "",
  context: "",
  sources: "",
  verified: false,
  clear: false,
  direct: false,
  noInventions: false,
});

const makeData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  sector: "",
  questions: Array.from({ length: 5 }, makeQuestion),
  auditConclusion: "",
  contentIntroduction: "",
  contentConclusion: "",
  implementation: "",
});

function readData(key) {
  const base = makeData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      questions: base.questions.map((question, index) => ({
        ...question,
        ...(saved.questions?.[index] || {}),
      })),
    };
  } catch {
    return base;
  }
}

const styles = {
  root: {
    background: "#f8fafc",
    color: "#111b35",
    padding: 22,
    borderRadius: 18,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #dbe3ee",
    padding: 18,
    borderRadius: 14,
    margin: "16px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 12,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 13,
    fontWeight: 650,
    marginBottom: 12,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#111b35",
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    font: "inherit",
    fontSize: 14,
  },
  note: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#475569",
  },
  button: {
    padding: "10px 16px",
    background: "#111b35",
    color: "#ffffff",
    border: 0,
    borderRadius: 8,
    cursor: "pointer",
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
    <label style={styles.label}>
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
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function countWords(value) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function buildFaqSchema(questions) {
  const completed = questions.filter(
    (item) => item.question.trim() && item.directAnswer.trim(),
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: completed.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: [item.directAnswer.trim(), item.context.trim()]
          .filter(Boolean)
          .join("\n\n"),
      },
    })),
  };
}

function Check({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 9,
        margin: "9px 0",
        fontSize: 13,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

export default function SeoWeek13Workshop({
  kind,
  slide,
  lessonId = "seo-semana-13",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana13:${lessonId}:` +
    String(studentName || "sin-nombre")
      .trim()
      .toLowerCase();

  const [stored, setStored] = useState(() => ({
    key: storageKey,
    data: readData(storageKey),
  }));

  const [copied, setCopied] = useState(false);

  const data = stored.key === storageKey ? stored.data : readData(storageKey);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar la Semana 13:", error);
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

  function setQuestion(index, field, value) {
    update((current) => ({
      ...current,
      questions: current.questions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question,
      ),
    }));
  }

  if (activeKind !== "seo-aeo-audit" && activeKind !== "seo-aeo-content") {
    return null;
  }

  const schema = buildFaqSchema(data.questions);
  const schemaText = JSON.stringify(schema, null, 2);

  const completeAnswers = data.questions.filter(
    (item) => item.question.trim() && item.directAnswer.trim(),
  ).length;

  const auditAnswers = Object.fromEntries(
    data.questions.flatMap((item, index) => {
      const prefix = `Pregunta ${index + 1}`;

      return [
        [`${prefix} - Consulta`, item.question],
        [`${prefix} - Intención`, item.intent],
        [`${prefix} - Prioridad`, item.priority],
        [`${prefix} - Formato observado`, item.searchFormat],
        [`${prefix} - Estado web`, item.companyStatus],
        [`${prefix} - URL empresa`, item.companyUrl],
        [`${prefix} - Evidencia`, item.evidence],
        [`${prefix} - Hallazgo`, item.finding],
        [`${prefix} - Recomendación`, item.improvement],
      ];
    }),
  );

  const contentAnswers = Object.fromEntries(
    data.questions.flatMap((item, index) => {
      const prefix = `Respuesta ${index + 1}`;

      return [
        [`${prefix} - Pregunta`, item.question],
        [`${prefix} - Texto directo`, item.directAnswer],
        [`${prefix} - Contexto`, item.context],
        [`${prefix} - Fuentes`, item.sources],
        [`${prefix} - Palabras`, countWords(item.directAnswer)],
        [
          `${prefix} - Revisión editorial`,
          `${
            [item.direct, item.clear, item.verified, item.noInventions].filter(
              Boolean,
            ).length
          }/4`,
        ],
      ];
    }),
  );

  return (
    <section style={styles.root}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: "#ee7544",
        }}
      >
        ANÁLISIS SEO · SEMANA 13
      </span>

      <h2>{slide?.title || "Auditoría y producción de contenido AEO"}</h2>

      <p style={styles.note}>{slide?.instructions}</p>

      <p
        style={{
          color: "#047857",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        Las respuestas se guardan automáticamente en este dispositivo.
      </p>

      <div style={styles.grid}>
        <Field
          label="Equipo"
          value={data.team}
          onChange={(value) => setRoot("team", value)}
        />

        <Field
          label="Empresa real"
          value={data.company}
          onChange={(value) => setRoot("company", value)}
        />

        <Field
          label="Sitio oficial de la empresa"
          value={data.companyUrl}
          onChange={(value) => setRoot("companyUrl", value)}
        />

        <Field
          label="Sector empresarial"
          value={data.sector}
          onChange={(value) => setRoot("sector", value)}
        />
      </div>

      {activeKind === "seo-aeo-audit" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Recupera tus preguntas</h3>

            <p style={styles.note}>
              En la Semana 12 investigaste quince preguntas. Selecciona las
              cinco más relevantes y registra la evidencia de cada búsqueda.
            </p>
          </div>

          {data.questions.map((item, index) => (
            <div key={index} style={styles.card}>
              <h3>Pregunta prioritaria {index + 1}</h3>

              <Field
                label="Pregunta investigada"
                value={item.question}
                onChange={(value) => setQuestion(index, "question", value)}
              />

              <div style={styles.grid}>
                <Field
                  label="Intención"
                  value={item.intent}
                  options={[
                    "Informativa",
                    "Comercial",
                    "Transaccional",
                    "Navegacional",
                  ]}
                  onChange={(value) => setQuestion(index, "intent", value)}
                />

                <Field
                  label="Prioridad"
                  value={item.priority}
                  options={["Alta", "Media", "Baja"]}
                  onChange={(value) => setQuestion(index, "priority", value)}
                />

                <Field
                  label="Formato observado en Google"
                  value={item.searchFormat}
                  options={[
                    "Resultados orgánicos",
                    "Fragmento destacado",
                    "Preguntas relacionadas",
                    "Respuesta generada por IA",
                    "Resultado enriquecido",
                    "Varios formatos",
                    "No identificado",
                  ]}
                  onChange={(value) =>
                    setQuestion(index, "searchFormat", value)
                  }
                />

                <Field
                  label="¿La empresa responde?"
                  value={item.companyStatus}
                  options={[
                    "Sí",
                    "Parcialmente",
                    "No identificado",
                    "No verificable",
                  ]}
                  onChange={(value) =>
                    setQuestion(index, "companyStatus", value)
                  }
                />
              </div>

              <Field
                label="URL pública de la empresa"
                value={item.companyUrl}
                placeholder="https://..."
                onChange={(value) => setQuestion(index, "companyUrl", value)}
              />

              <Field
                label="Evidencia: URL de búsqueda, fuente o referencia de captura"
                multiline
                value={item.evidence}
                onChange={(value) => setQuestion(index, "evidence", value)}
              />

              <Field
                label="Hallazgo: claridad, profundidad, actualización y respaldo"
                multiline
                value={item.finding}
                onChange={(value) => setQuestion(index, "finding", value)}
              />

              <Field
                label="Recomendación de mejora"
                multiline
                value={item.improvement}
                onChange={(value) => setQuestion(index, "improvement", value)}
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 2. Conclusión de la auditoría</h3>

            <Field
              label="¿Qué oportunidades AEO identificó el equipo?"
              multiline
              value={data.auditConclusion}
              onChange={(value) => setRoot("auditConclusion", value)}
            />

            <p style={styles.note}>
              No encontrar una respuesta durante la búsqueda no demuestra que el
              contenido no exista. Registra únicamente lo observado.
            </p>
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Auditoría externa AEO"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              Sector: data.sector,
              ...auditAnswers,
              Conclusión: data.auditConclusion,
              Nota: "Auditoría académica externa. No se modificó la web empresarial.",
            }}
          />
        </>
      )}

      {activeKind === "seo-aeo-content" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Introducción del contenido</h3>

            <Field
              label="Introducción editorial"
              multiline
              value={data.contentIntroduction}
              onChange={(value) => setRoot("contentIntroduction", value)}
            />

            <p style={styles.note}>
              Las preguntas se recuperan del primer laboratorio. Si necesitas
              cambiarlas, vuelve a la diapositiva 6.
            </p>
          </div>

          {data.questions.map((item, index) => {
            const words = countWords(item.directAnswer);

            const score = [
              item.direct,
              item.clear,
              item.verified,
              item.noInventions,
            ].filter(Boolean).length;

            return (
              <div key={index} style={styles.card}>
                <h3>Respuesta AEO {index + 1}</h3>

                <p>
                  <strong>Pregunta:</strong>{" "}
                  {item.question ||
                    "Pendiente: registra esta pregunta en el Laboratorio 1."}
                </p>

                <Field
                  label="Respuesta directa"
                  multiline
                  value={item.directAnswer}
                  placeholder="Responde primero de manera clara y precisa..."
                  onChange={(value) =>
                    setQuestion(index, "directAnswer", value)
                  }
                />

                <p
                  style={{
                    color: words >= 40 && words <= 60 ? "#047857" : "#b45309",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {words} palabras
                  {" · "}
                  Extensión orientativa: 40–60
                </p>

                <Field
                  label="Contexto o explicación complementaria"
                  multiline
                  value={item.context}
                  onChange={(value) => setQuestion(index, "context", value)}
                />

                <Field
                  label="Fuentes verificables"
                  multiline
                  value={item.sources}
                  placeholder="URL, institución, documento y fecha de consulta"
                  onChange={(value) => setQuestion(index, "sources", value)}
                />

                <h4>Lista de verificación editorial</h4>

                <Check
                  label="Responde directamente la pregunta"
                  checked={item.direct}
                  onChange={(value) => setQuestion(index, "direct", value)}
                />

                <Check
                  label="Utiliza lenguaje comprensible"
                  checked={item.clear}
                  onChange={(value) => setQuestion(index, "clear", value)}
                />

                <Check
                  label="Las afirmaciones están verificadas con fuentes"
                  checked={item.verified}
                  onChange={(value) => setQuestion(index, "verified", value)}
                />

                <Check
                  label="No incluye promesas ni datos comerciales inventados"
                  checked={item.noInventions}
                  onChange={(value) =>
                    setQuestion(index, "noInventions", value)
                  }
                />

                <p
                  style={{
                    color: score === 4 ? "#047857" : "#b45309",
                    fontWeight: 700,
                  }}
                >
                  Criterios marcados: {score}/4
                </p>

                <p style={styles.note}>
                  La lista es una autoevaluación. Marcar una casilla no verifica
                  automáticamente las fuentes.
                </p>
              </div>
            );
          })}

          <div style={styles.card}>
            <h3>Paso 2. Vista previa de la sección FAQ</h3>

            <p style={styles.note}>
              Esta es la estructura de preguntas frecuentes que podría incluirse
              en una página de contenido.
            </p>

            {data.questions
              .filter((item) => item.question.trim())
              .map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <h4>{item.question}</h4>

                  <p>{item.directAnswer || "Respuesta pendiente."}</p>

                  {item.context && <p style={styles.note}>{item.context}</p>}
                </div>
              ))}

            <p style={styles.note}>
              Respuestas completadas: {completeAnswers}/5
            </p>
          </div>

          <div style={styles.card}>
            <h3>Paso 3. Propuesta de datos estructurados</h3>

            <p style={styles.note}>
              Se genera un ejemplo JSON-LD FAQPage a partir de las respuestas
              redactadas. El código es demostrativo y no se instalará en la web
              real.
            </p>

            <pre
              style={{
                background: "#111b35",
                color: "#f8fafc",
                padding: 16,
                borderRadius: 12,
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                fontSize: 12,
              }}
            >
              <code>{schemaText}</code>
            </pre>

            <button
              type="button"
              style={styles.button}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(schemaText);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              Copiar JSON-LD
            </button>

            {copied && (
              <p
                style={{
                  color: "#047857",
                  fontSize: 13,
                }}
              >
                Código copiado.
              </p>
            )}

            <p style={styles.note}>
              Google restringe los resultados enriquecidos FAQ a determinados
              sitios reconocidos de salud y gobierno. El marcado no garantiza
              resultados enriquecidos ni menciones en sistemas de IA.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Paso 4. Recomendación editorial</h3>

            <Field
              label="Conclusión del documento AEO"
              multiline
              value={data.contentConclusion}
              onChange={(value) => setRoot("contentConclusion", value)}
            />

            <Field
              label="¿Cómo recomendarías implementar este contenido?"
              multiline
              value={data.implementation}
              onChange={(value) => setRoot("implementation", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Producción de contenido AEO"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Sector: data.sector,
              Introducción: data.contentIntroduction,
              ...contentAnswers,
              "Sección FAQ": data.questions
                .filter(
                  (item) => item.question.trim() && item.directAnswer.trim(),
                )
                .map(
                  (item) =>
                    `${item.question}\n${item.directAnswer}\n${item.context}`,
                )
                .join("\n\n"),
              "JSON-LD FAQPage": schemaText,
              Conclusión: data.contentConclusion,
              "Recomendación de implementación": data.implementation,
              Nota: "Propuesta académica. El contenido y el JSON-LD no se han publicado en la web de la empresa.",
            }}
          />
        </>
      )}
    </section>
  );
}
