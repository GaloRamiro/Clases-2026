import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 14,
  title: "GEO y publicación de una web académica",
};

const CHECKS = [
  "La URL pública abre correctamente",
  "El nombre y los textos son ficticios",
  "La página funciona en un teléfono",
  "Los botones funcionan",
  "Las preguntas frecuentes se despliegan",
  "La página indica que es académica",
  "El equipo conserva acceso para editar el sitio",
];

const makeQuery = () => ({
  question: "",
  tool: "",
  date: "",
  mention: "",
  response: "",
  sources: "",
  accuracy: "",
  evidence: "",
  finding: "",
});

const makeAttribute = () => ({
  attribute: "",
  value: "",
  source: "",
});

const initialData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  sector: "",
  queries: Array.from({ length: 5 }, makeQuery),
  attributes: Array.from({ length: 5 }, makeAttribute),
  recommendations: ["", "", ""],
  geoConclusion: "",
  demoName: "",
  demoDescription: "",
  repositoryUrl: "",
  publishedUrl: "",
  platform: "GitHub Pages",
  publicationDate: "",
  checks: Array(7).fill(false),
  screenshots: "",
  problems: "",
  nextSteps: "",
});

function loadData(key) {
  const base = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return base;
    }

    return {
      ...base,
      ...saved,
      queries: base.queries.map((item, index) => ({
        ...item,
        ...(saved.queries?.[index] || {}),
      })),
      attributes: base.attributes.map((item, index) => ({
        ...item,
        ...(saved.attributes?.[index] || {}),
      })),
      recommendations: base.recommendations.map(
        (item, index) => saved.recommendations?.[index] ?? item,
      ),
      checks: base.checks.map((item, index) =>
        Boolean(saved.checks?.[index] ?? item),
      ),
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
    borderRadius: 16,
  },
  card: {
    background: "#fff",
    padding: 18,
    borderRadius: 12,
    border: "1px solid #dbe3ee",
    marginBottom: 16,
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
    marginBottom: 12,
    fontSize: 13,
    fontWeight: 650,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    color: "#111b35",
    background: "#fff",
    font: "inherit",
  },
  note: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.6,
  },
};

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
  options,
  type = "text",
  placeholder = "",
}) {
  return (
    <label style={styles.label}>
      {label}

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
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export default function SeoWeek14Workshop({
  kind,
  slide,
  lessonId = "seo-semana-14",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana14:${lessonId}:` +
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
      console.warn("Error al guardar Semana 14:", error);
    }

    setStored({ key: storageKey, data: next });
  }

  function setRoot(field, value) {
    update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function setItem(list, index, field, value) {
    update((current) => ({
      ...current,
      [list]: current[list].map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function setList(list, index, value) {
    update((current) => ({
      ...current,
      [list]: current[list].map((item, i) => (i === index ? value : item)),
    }));
  }

  if (activeKind !== "seo-geo-audit" && activeKind !== "seo-geo-publish") {
    return null;
  }

  const completedChecks = data.checks.filter(Boolean).length;
  const urlValid = isValidUrl(data.publishedUrl);

  const auditAnswers = Object.fromEntries([
    ...data.queries.flatMap((item, index) => [
      [`Consulta ${index + 1} - Pregunta`, item.question],
      [`Consulta ${index + 1} - Herramienta`, item.tool],
      [`Consulta ${index + 1} - Fecha`, item.date],
      [`Consulta ${index + 1} - Mención`, item.mention],
      [`Consulta ${index + 1} - Respuesta`, item.response],
      [`Consulta ${index + 1} - Fuentes`, item.sources],
      [`Consulta ${index + 1} - Exactitud`, item.accuracy],
      [`Consulta ${index + 1} - Evidencia`, item.evidence],
      [`Consulta ${index + 1} - Hallazgo`, item.finding],
    ]),
    ...data.attributes.flatMap((item, index) => [
      [`Atributo ${index + 1}`, item.attribute],
      [`Valor ${index + 1}`, item.value],
      [`Fuente ${index + 1}`, item.source],
    ]),
  ]);

  return (
    <section style={styles.root}>
      <span style={{ color: "#ee7544", fontWeight: 800 }}>
        ANÁLISIS SEO · SEMANA 14
      </span>

      <h2>{slide?.title || "Laboratorio Semana 14"}</h2>
      <p style={styles.note}>{slide?.instructions}</p>

      <p style={{ color: "#047857", fontSize: 13 }}>
        Tus respuestas se guardan automáticamente en este dispositivo.
      </p>

      <div style={styles.grid}>
        <Field
          label="Equipo"
          value={data.team}
          onChange={(value) => setRoot("team", value)}
        />

        <Field
          label="Empresa real investigada"
          value={data.company}
          onChange={(value) => setRoot("company", value)}
        />

        <Field
          label="Sitio oficial de la empresa"
          value={data.companyUrl}
          onChange={(value) => setRoot("companyUrl", value)}
        />

        <Field
          label="Sector"
          value={data.sector}
          onChange={(value) => setRoot("sector", value)}
        />
      </div>

      {activeKind === "seo-geo-audit" && (
        <>
          <div style={styles.card}>
            <h3>Laboratorio 1: auditoría GEO</h3>
            <p style={styles.note}>
              Investiga cinco preguntas sobre la empresa real. Comprueba las
              respuestas con fuentes públicas. No modifiques el sitio de la
              empresa.
            </p>
          </div>

          {data.queries.map((item, index) => (
            <div key={index} style={styles.card}>
              <h3>Consulta {index + 1}</h3>

              <Field
                label="Pregunta realizada a la IA"
                value={item.question}
                onChange={(value) =>
                  setItem("queries", index, "question", value)
                }
              />

              <div style={styles.grid}>
                <Field
                  label="Asistente utilizado"
                  value={item.tool}
                  options={["ChatGPT", "Gemini", "Otro"]}
                  onChange={(value) => setItem("queries", index, "tool", value)}
                />

                <Field
                  label="Fecha"
                  type="date"
                  value={item.date}
                  onChange={(value) => setItem("queries", index, "date", value)}
                />

                <Field
                  label="¿Menciona a la empresa?"
                  value={item.mention}
                  options={["Sí", "No", "Parcialmente"]}
                  onChange={(value) =>
                    setItem("queries", index, "mention", value)
                  }
                />

                <Field
                  label="Exactitud"
                  value={item.accuracy}
                  options={[
                    "Verificada",
                    "Parcialmente verificada",
                    "Contiene errores",
                    "No verificable",
                  ]}
                  onChange={(value) =>
                    setItem("queries", index, "accuracy", value)
                  }
                />
              </div>

              <Field
                label="Fragmento relevante de la respuesta"
                multiline
                value={item.response}
                onChange={(value) =>
                  setItem("queries", index, "response", value)
                }
              />

              <Field
                label="Fuentes citadas por la IA"
                multiline
                value={item.sources}
                onChange={(value) =>
                  setItem("queries", index, "sources", value)
                }
              />

              <Field
                label="URL o referencia de captura"
                multiline
                value={item.evidence}
                onChange={(value) =>
                  setItem("queries", index, "evidence", value)
                }
              />

              <Field
                label="Hallazgo y comprobación"
                multiline
                value={item.finding}
                onChange={(value) =>
                  setItem("queries", index, "finding", value)
                }
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Ficha de entidad: cinco atributos</h3>

            {data.attributes.map((item, index) => (
              <div key={index} style={styles.grid}>
                <Field
                  label={`Atributo ${index + 1}`}
                  value={item.attribute}
                  placeholder="Nombre, actividad, ubicación..."
                  onChange={(value) =>
                    setItem("attributes", index, "attribute", value)
                  }
                />

                <Field
                  label="Valor comprobado"
                  value={item.value}
                  onChange={(value) =>
                    setItem("attributes", index, "value", value)
                  }
                />

                <Field
                  label="Fuente pública"
                  value={item.source}
                  onChange={(value) =>
                    setItem("attributes", index, "source", value)
                  }
                />
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <h3>Tres recomendaciones GEO</h3>

            {data.recommendations.map((value, index) => (
              <Field
                key={index}
                label={`Recomendación ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("recommendations", index, next)}
              />
            ))}

            <Field
              label="Conclusión de la auditoría"
              multiline
              value={data.geoConclusion}
              onChange={(value) => setRoot("geoConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Auditoría GEO"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              Sector: data.sector,
              ...auditAnswers,
              "Recomendación 1": data.recommendations[0],
              "Recomendación 2": data.recommendations[1],
              "Recomendación 3": data.recommendations[2],
              Conclusión: data.geoConclusion,
              Nota: "Investigación académica externa. No demuestra posicionamiento estable en sistemas de IA.",
            }}
          />
        </>
      )}

      {activeKind === "seo-geo-publish" && (
        <>
          <div style={styles.card}>
            <h3>Laboratorio 2: web académica</h3>

            <p style={styles.note}>
              Primero descarga index.html en la diapositiva 8. Después publícalo
              siguiendo la guía de la 9. Finalmente registra aquí los
              resultados.
            </p>

            <Field
              label="Nombre ficticio del proyecto"
              value={data.demoName}
              onChange={(value) => setRoot("demoName", value)}
            />

            <Field
              label="Descripción de la web"
              multiline
              value={data.demoDescription}
              onChange={(value) => setRoot("demoDescription", value)}
            />
          </div>

          <div style={styles.card}>
            <h3>Datos de publicación</h3>

            <Field
              label="Plataforma"
              value={data.platform}
              options={["GitHub Pages", "Vercel"]}
              onChange={(value) => setRoot("platform", value)}
            />

            <Field
              label="URL del repositorio"
              value={data.repositoryUrl}
              placeholder="https://github.com/..."
              onChange={(value) => setRoot("repositoryUrl", value)}
            />

            <Field
              label="URL pública"
              value={data.publishedUrl}
              placeholder="https://usuario.github.io/laboratorio-digital/"
              onChange={(value) => setRoot("publishedUrl", value)}
            />

            <Field
              label="Fecha de publicación"
              type="date"
              value={data.publicationDate}
              onChange={(value) => setRoot("publicationDate", value)}
            />

            <p
              style={{
                color: urlValid ? "#047857" : "#b45309",
                fontWeight: 700,
              }}
            >
              {urlValid
                ? "Formato de URL válido. Comprueba que la página abra."
                : "Pendiente: registra la URL pública."}
            </p>

            {urlValid && (
              <a
                href={data.publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir página publicada
              </a>
            )}
          </div>

          <div style={styles.card}>
            <h3>Checklist de publicación</h3>

            {CHECKS.map((label, index) => (
              <label
                key={label}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  margin: "12px 0",
                }}
              >
                <input
                  type="checkbox"
                  checked={data.checks[index]}
                  onChange={(event) =>
                    setList("checks", index, event.target.checked)
                  }
                />
                <span>{label}</span>
              </label>
            ))}

            <p>
              <strong>Comprobaciones: {completedChecks}/7</strong>
            </p>

            <p style={styles.note}>
              El checklist es una declaración del equipo. No verifica
              automáticamente el sitio externo.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Evidencias y preparación de medición</h3>

            <Field
              label="Capturas o referencias de evidencia"
              multiline
              value={data.screenshots}
              onChange={(value) => setRoot("screenshots", value)}
            />

            <Field
              label="Problemas encontrados y soluciones"
              multiline
              value={data.problems}
              onChange={(value) => setRoot("problems", value)}
            />

            <Field
              label="Tres interacciones que mediremos en la Semana 15"
              multiline
              value={data.nextSteps}
              placeholder="Clic CTA principal, clic CTA secundario, apertura FAQ..."
              onChange={(value) => setRoot("nextSteps", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Publicación de web académica"
            answers={{
              Equipo: data.team,
              "Nombre ficticio": data.demoName,
              Descripción: data.demoDescription,
              Plataforma: data.platform,
              Repositorio: data.repositoryUrl,
              "URL pública": data.publishedUrl,
              "Fecha de publicación": data.publicationDate,
              "Formato URL válido": urlValid ? "Sí" : "No",
              ...Object.fromEntries(
                CHECKS.map((label, index) => [
                  label,
                  data.checks[index] ? "Comprobado" : "Pendiente",
                ]),
              ),
              Checklist: `${completedChecks}/7`,
              Evidencias: data.screenshots,
              "Problemas y soluciones": data.problems,
              "Eventos propuestos": data.nextSteps,
              Nota: "Sitio académico independiente de la empresa real.",
            }}
          />
        </>
      )}
    </section>
  );
}
