import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 6,
  title: "SEO Off Page, backlinks, reputación digital y SEO local",
};

const KINDS = ["seo-offpage-research", "seo-offpage-strategy"];

const makeEvidence = () => ({
  source: "",
  url: "",
  type: "",
  link: "",
  finding: "",
});

const makeCompetitor = () => ({
  name: "",
  url: "",
  mentions: "",
  reputation: "",
  local: "",
  evidence: "",
});

const makeAction = () => ({
  title: "",
  finding: "",
  description: "",
  target: "",
  indicator: "",
  impact: "",
  viability: "",
  priority: "",
});

const makeData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  localMarket: "",
  companyType: "",
  evidences: Array.from({ length: 5 }, makeEvidence),
  competitors: Array.from({ length: 3 }, makeCompetitor),
  mapsPresence: "",
  mapsUrl: "",
  reviewFindings: "",
  strengths: ["", ""],
  weaknesses: ["", ""],
  researchConclusion: "",
  gaps: ["", "", ""],
  opportunities: ["", "", ""],
  actions: Array.from({ length: 6 }, makeAction),
  firstPriority: "",
  secondPriority: "",
  strategyConclusion: "",
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

      evidences: defaults.evidences.map((item, index) => ({
        ...item,
        ...(saved.evidences?.[index] || {}),
      })),

      competitors: defaults.competitors.map((item, index) => ({
        ...item,
        ...(saved.competitors?.[index] || {}),
      })),

      actions: defaults.actions.map((item, index) => ({
        ...item,
        ...(saved.actions?.[index] || {}),
      })),

      strengths: defaults.strengths.map(
        (item, index) => saved.strengths?.[index] ?? item,
      ),

      weaknesses: defaults.weaknesses.map(
        (item, index) => saved.weaknesses?.[index] ?? item,
      ),

      gaps: defaults.gaps.map((item, index) => saved.gaps?.[index] ?? item),

      opportunities: defaults.opportunities.map(
        (item, index) => saved.opportunities?.[index] ?? item,
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
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

export default function SeoWeek06Workshop({
  kind,
  slide,
  lessonId = "seo-semana-6",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana06:${lessonId}:` +
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
      console.warn("No se pudo guardar el laboratorio SEO:", error);
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

  function setList(field, index, value) {
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) => (i === index ? value : item)),
    }));
  }

  if (!KINDS.includes(activeKind)) {
    return null;
  }

  const evidenceCount = data.evidences.filter(
    (item) => item.source.trim() && item.url.trim(),
  ).length;

  const actionCount = data.actions.filter(
    (item) => item.title.trim() && item.indicator.trim(),
  ).length;

  const evidenceAnswers = Object.fromEntries(
    data.evidences.flatMap((item, index) => {
      const prefix = `EVIDENCIA ${index + 1}`;

      return [
        [`${prefix} - Fuente`, item.source],
        [`${prefix} - URL`, item.url],
        [`${prefix} - Tipo`, item.type],
        [`${prefix} - Enlace`, item.link],
        [`${prefix} - Hallazgo`, item.finding],
      ];
    }),
  );

  const competitorAnswers = Object.fromEntries(
    data.competitors.flatMap((item, index) => {
      const prefix = `COMPETIDOR ${index + 1}`;

      return [
        [`${prefix} - Nombre`, item.name],
        [`${prefix} - URL`, item.url],
        [`${prefix} - Menciones`, item.mentions],
        [`${prefix} - Reputación`, item.reputation],
        [`${prefix} - Presencia local`, item.local],
        [`${prefix} - Evidencia`, item.evidence],
      ];
    }),
  );

  const actionAnswers = Object.fromEntries(
    data.actions.flatMap((item, index) => {
      const prefix = `ACCIÓN ${index + 1}`;

      return [
        [`${prefix} - Nombre`, item.title],
        [`${prefix} - Hallazgo`, item.finding],
        [`${prefix} - Propuesta`, item.description],
        [`${prefix} - Público o fuente`, item.target],
        [`${prefix} - Indicador`, item.indicator],
        [`${prefix} - Impacto`, item.impact],
        [`${prefix} - Viabilidad`, item.viability],
        [`${prefix} - Prioridad`, item.priority],
      ];
    }),
  );

  return (
    <section style={styles.panel}>
      <span
        style={{
          color: "#2563eb",
          fontWeight: 800,
          fontSize: 12,
        }}
      >
        ANÁLISIS SEO · SEMANA 06
      </span>

      <h2>{slide?.title || "SEO Off Page y reputación digital"}</h2>

      <p style={styles.hint}>
        {slide?.instructions ||
          "Completa el laboratorio con información verificable."}
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
          placeholder="https://..."
          onChange={(value) => setRoot("companyUrl", value)}
        />

        <Field
          label="Mercado geográfico"
          value={data.localMarket}
          placeholder="Ej. Quito, Ecuador"
          onChange={(value) => setRoot("localMarket", value)}
        />

        <Field
          label="Tipo de presencia"
          value={data.companyType}
          options={[
            "Negocio con atención local",
            "Negocio digital o sectorial",
            "Presencia mixta",
          ]}
          onChange={(value) => setRoot("companyType", value)}
        />
      </div>

      {activeKind === "seo-offpage-research" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Investiga menciones y backlinks</h3>

            <p style={styles.hint}>
              Busca la marca en Google. Registra hasta cinco evidencias públicas
              de terceros. Si no encuentras menciones, explica la ausencia en la
              conclusión. No inventes enlaces.
            </p>

            <p style={styles.status}>
              Evidencias registradas: {evidenceCount} de 5
            </p>
          </div>

          {data.evidences.map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>Evidencia externa {index + 1}</h3>

              <div style={styles.grid}>
                <Field
                  label="Fuente externa"
                  value={item.source}
                  placeholder="Ej. medio, directorio o blog"
                  onChange={(value) =>
                    setCollection("evidences", index, "source", value)
                  }
                />

                <Field
                  label="URL de evidencia"
                  value={item.url}
                  placeholder="https://..."
                  onChange={(value) =>
                    setCollection("evidences", index, "url", value)
                  }
                />

                <Field
                  label="Tipo de presencia"
                  value={item.type}
                  options={[
                    "Mención sin enlace",
                    "Backlink verificable",
                    "Directorio empresarial",
                    "Reseña pública",
                    "Referencia sectorial",
                    "Otro",
                  ]}
                  onChange={(value) =>
                    setCollection("evidences", index, "type", value)
                  }
                />

                <Field
                  label="¿Existe enlace al sitio?"
                  value={item.link}
                  options={["Sí", "No", "No verificable"]}
                  onChange={(value) =>
                    setCollection("evidences", index, "link", value)
                  }
                />
              </div>

              <Field
                label="Hallazgo y relevancia"
                multiline
                value={item.finding}
                onChange={(value) =>
                  setCollection("evidences", index, "finding", value)
                }
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 2. Analiza tres competidores</h3>

            <p style={styles.hint}>
              Revisa menciones, reseñas y presencia local o sectorial. Utiliza
              fuentes públicas.
            </p>
          </div>

          {data.competitors.map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>Competidor {index + 1}</h3>

              <div style={styles.grid}>
                <Field
                  label="Nombre"
                  value={item.name}
                  onChange={(value) =>
                    setCollection("competitors", index, "name", value)
                  }
                />

                <Field
                  label="Sitio web"
                  value={item.url}
                  onChange={(value) =>
                    setCollection("competitors", index, "url", value)
                  }
                />
              </div>

              <Field
                label="Menciones y backlinks observados"
                multiline
                value={item.mentions}
                onChange={(value) =>
                  setCollection("competitors", index, "mentions", value)
                }
              />

              <Field
                label="Reputación y reseñas"
                multiline
                value={item.reputation}
                onChange={(value) =>
                  setCollection("competitors", index, "reputation", value)
                }
              />

              <Field
                label="Presencia local o sectorial"
                multiline
                value={item.local}
                onChange={(value) =>
                  setCollection("competitors", index, "local", value)
                }
              />

              <Field
                label="URL de evidencia"
                value={item.evidence}
                onChange={(value) =>
                  setCollection("competitors", index, "evidence", value)
                }
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 3. Reputación y SEO local</h3>

            <Field
              label="Presencia en Google Maps"
              value={data.mapsPresence}
              options={[
                "Ficha pública encontrada",
                "No se encontró ficha",
                "No aplica",
                "No verificable",
              ]}
              onChange={(value) => setRoot("mapsPresence", value)}
            />

            <Field
              label="URL de ficha pública"
              value={data.mapsUrl}
              onChange={(value) => setRoot("mapsUrl", value)}
            />

            <Field
              label="Observaciones sobre reseñas auténticas"
              multiline
              value={data.reviewFindings}
              onChange={(value) => setRoot("reviewFindings", value)}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 4. Fortalezas y debilidades</h3>

            {data.strengths.map((value, index) => (
              <Field
                key={`strength-${index}`}
                label={`Fortaleza ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("strengths", index, next)}
              />
            ))}

            {data.weaknesses.map((value, index) => (
              <Field
                key={`weakness-${index}`}
                label={`Debilidad ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("weaknesses", index, next)}
              />
            ))}

            <Field
              label="Conclusión de la investigación"
              multiline
              value={data.researchConclusion}
              onChange={(value) => setRoot("researchConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Autoridad y reputación digital"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              Mercado: data.localMarket,
              "Tipo de empresa": data.companyType,
              ...evidenceAnswers,
              ...competitorAnswers,
              "Presencia en Maps": data.mapsPresence,
              "Ficha pública": data.mapsUrl,
              "Análisis de reseñas": data.reviewFindings,
              "Fortaleza 1": data.strengths[0],
              "Fortaleza 2": data.strengths[1],
              "Debilidad 1": data.weaknesses[0],
              "Debilidad 2": data.weaknesses[1],
              Conclusión: data.researchConclusion,
            }}
          />
        </>
      )}

      {activeKind === "seo-offpage-strategy" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Detecta tres brechas</h3>

            <p style={styles.hint}>
              Compara la presencia externa de tu empresa con la de los tres
              competidores investigados.
            </p>

            {data.gaps.map((value, index) => (
              <Field
                key={`gap-${index}`}
                label={`Brecha ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("gaps", index, next)}
              />
            ))}
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Tres oportunidades</h3>

            {data.opportunities.map((value, index) => (
              <Field
                key={`opportunity-${index}`}
                label={`Oportunidad ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("opportunities", index, next)}
              />
            ))}
          </div>

          <div style={styles.card}>
            <h3>Paso 3. Plan de seis acciones</h3>

            <p style={styles.hint}>
              Las acciones 1 a 3 corresponden a menciones o backlinks legítimos.
              Las acciones 4 a 6 corresponden a SEO local o presencia sectorial.
              No propongas compra de enlaces manipulativos ni reseñas falsas.
            </p>

            <p style={styles.status}>
              Acciones registradas: {actionCount} de 6
            </p>
          </div>

          {data.actions.map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>
                Acción {index + 1} —{" "}
                {index < 3 ? "Autoridad y backlinks" : "SEO local o sectorial"}
              </h3>

              <Field
                label="Nombre de la acción"
                value={item.title}
                onChange={(value) =>
                  setCollection("actions", index, "title", value)
                }
              />

              <Field
                label="Hallazgo que justifica la acción"
                multiline
                value={item.finding}
                onChange={(value) =>
                  setCollection("actions", index, "finding", value)
                }
              />

              <Field
                label="¿Qué se propone hacer?"
                multiline
                value={item.description}
                onChange={(value) =>
                  setCollection("actions", index, "description", value)
                }
              />

              <div style={styles.grid}>
                <Field
                  label="Público o fuente objetivo"
                  value={item.target}
                  onChange={(value) =>
                    setCollection("actions", index, "target", value)
                  }
                />

                <Field
                  label="Indicador de resultado"
                  value={item.indicator}
                  onChange={(value) =>
                    setCollection("actions", index, "indicator", value)
                  }
                />

                <Field
                  label="Impacto esperado"
                  value={item.impact}
                  options={["Alto", "Medio", "Bajo"]}
                  onChange={(value) =>
                    setCollection("actions", index, "impact", value)
                  }
                />

                <Field
                  label="Viabilidad"
                  value={item.viability}
                  options={["Alta", "Media", "Baja"]}
                  onChange={(value) =>
                    setCollection("actions", index, "viability", value)
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
              </div>
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 4. Selecciona dos prioridades</h3>

            <Field
              label="Primera acción prioritaria"
              multiline
              value={data.firstPriority}
              onChange={(value) => setRoot("firstPriority", value)}
            />

            <Field
              label="Segunda acción prioritaria"
              multiline
              value={data.secondPriority}
              onChange={(value) => setRoot("secondPriority", value)}
            />

            <Field
              label="Conclusión de la estrategia"
              multiline
              value={data.strategyConclusion}
              onChange={(value) => setRoot("strategyConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Estrategia SEO Off Page"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              Mercado: data.localMarket,
              "Tipo de empresa": data.companyType,

              ...Object.fromEntries(
                data.gaps.map((value, index) => [`Brecha ${index + 1}`, value]),
              ),

              ...Object.fromEntries(
                data.opportunities.map((value, index) => [
                  `Oportunidad ${index + 1}`,
                  value,
                ]),
              ),

              ...actionAnswers,

              "Primera prioridad": data.firstPriority,
              "Segunda prioridad": data.secondPriority,
              "Conclusión estratégica": data.strategyConclusion,
            }}
          />
        </>
      )}
    </section>
  );
}
