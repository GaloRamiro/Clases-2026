
import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 1,
  title: "El nuevo escenario de las búsquedas",
};

const STORAGE_PREFIX = "aula:seo:semana01";

const createSearch = () => ({
  query: "",
  engine: "Google",
  organic: "",
  ads: "",
  maps: "",
  ai: "",
  evidence: "",
  conclusion: "",
});

const createCompetitor = () => ({
  name: "",
  website: "",
  query: "",
  position: "",
  strengths: "",
  opportunity: "",
  evidence: "",
});

function initialData() {
  return {
    team: "",
    searches: [createSearch(), createSearch()],
    company: {
      name: "",
      website: "",
      sector: "",
      market: "",
      audience: "",
      value: "",
      objective: "",
    },
    competitors: Array.from(
      { length: 3 },
      createCompetitor
    ),
    opportunities: ["", ""],
    conclusion: "",
  };
}

function readData(key) {
  const defaults = initialData();

  try {
    const saved = JSON.parse(
      localStorage.getItem(key) || "null"
    );

    if (!saved || typeof saved !== "object") {
      return defaults;
    }

    return {
      ...defaults,
      ...saved,
      company: {
        ...defaults.company,
        ...(saved.company || {}),
      },
      searches: defaults.searches.map(
        (item, index) => ({
          ...item,
          ...(saved.searches?.[index] || {}),
        })
      ),
      competitors: defaults.competitors.map(
        (item, index) => ({
          ...item,
          ...(saved.competitors?.[index] || {}),
        })
      ),
      opportunities: defaults.opportunities.map(
        (item, index) =>
          saved.opportunities?.[index] ?? item
      ),
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
  multiline = false,
}) {
  return (
    <label style={styles.field}>
      <span style={styles.label}>{label}</span>

      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={styles.input}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={styles.input}
        />
      )}
    </label>
  );
}

export default function SeoWorkshop({
  kind,
  slide,
  lessonId = "seo-semana-1",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const key = `${STORAGE_PREFIX}:${lessonId}:${String(
    studentName || "sin-nombre"
  ).trim().toLowerCase()}`;

  const [stored, setStored] = useState(() => ({
    key,
    data: readData(key),
  }));

  const data =
    stored.key === key
      ? stored.data
      : readData(key);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(
        key,
        JSON.stringify(next)
      );
    } catch (error) {
      console.warn(
        "No se pudo guardar el taller SEO",
        error
      );
    }

    setStored({ key, data: next });
  }

  function setField(field, value) {
    update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function setSearch(index, field, value) {
    update((current) => ({
      ...current,
      searches: current.searches.map(
        (item, i) =>
          i === index
            ? { ...item, [field]: value }
            : item
      ),
    }));
  }

  function setCompany(field, value) {
    update((current) => ({
      ...current,
      company: {
        ...current.company,
        [field]: value,
      },
    }));
  }

  function setCompetitor(index, field, value) {
    update((current) => ({
      ...current,
      competitors: current.competitors.map(
        (item, i) =>
          i === index
            ? { ...item, [field]: value }
            : item
      ),
    }));
  }

  function setOpportunity(index, value) {
    update((current) => ({
      ...current,
      opportunities: current.opportunities.map(
        (item, i) =>
          i === index ? value : item
      ),
    }));
  }

  const searchComplete = data.searches.filter(
    (item) =>
      item.query.trim() &&
      item.conclusion.trim()
  ).length;

  const competitorsComplete =
    data.competitors.filter(
      (item) =>
        item.name.trim() &&
        item.website.trim()
    ).length;

  const isSupported = [
    "seo-search-lab",
    "seo-company-workshop",
    "seo-competitor-workshop",
  ].includes(activeKind);

  if (!isSupported) return null;

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <div>
          <span style={styles.eyebrow}>
            ANÁLISIS SEO · SEMANA 01
          </span>
          <h2 style={styles.title}>
            {slide?.title ||
              "Taller práctico de SEO"}
          </h2>
          <p style={styles.subtitle}>
            {slide?.instructions ||
              "Completa la actividad y registra tus decisiones."}
          </p>
        </div>

        <span style={styles.saved}>
          Guardado automático
        </span>
      </div>

      <Field
        label="Nombre del equipo"
        value={data.team}
        onChange={(v) => setField("team", v)}
        placeholder="Nombre del equipo de trabajo"
      />

      {activeKind === "seo-search-lab" && (
        <>
          <div style={styles.counter}>
            Búsquedas analizadas:{" "}
            <strong>{searchComplete} de 2</strong>
          </div>

          {data.searches.map((search, index) => (
            <div style={styles.card} key={index}>
              <h3>Búsqueda {index + 1}</h3>

              <div style={styles.grid}>
                <Field
                  label="Consulta realizada"
                  value={search.query}
                  onChange={(v) =>
                    setSearch(index, "query", v)
                  }
                  placeholder="Ej. comprar laptops en Quito"
                />

                <Field
                  label="Buscador utilizado"
                  value={search.engine}
                  onChange={(v) =>
                    setSearch(index, "engine", v)
                  }
                />
              </div>

              <Field
                label="Resultados orgánicos observados"
                value={search.organic}
                onChange={(v) =>
                  setSearch(index, "organic", v)
                }
                multiline
              />

              <Field
                label="Anuncios identificados"
                value={search.ads}
                onChange={(v) =>
                  setSearch(index, "ads", v)
                }
                multiline
              />

              <Field
                label="Resultados de mapas o negocios locales"
                value={search.maps}
                onChange={(v) =>
                  setSearch(index, "maps", v)
                }
                multiline
              />

              <Field
                label="Respuestas generadas por IA"
                value={search.ai}
                onChange={(v) =>
                  setSearch(index, "ai", v)
                }
                placeholder="Si no aparecen, indícalo"
                multiline
              />

              <Field
                label="Enlace o referencia de captura"
                value={search.evidence}
                onChange={(v) =>
                  setSearch(index, "evidence", v)
                }
              />

              <Field
                label="Análisis y conclusión"
                value={search.conclusion}
                onChange={(v) =>
                  setSearch(index, "conclusion", v)
                }
                multiline
              />
            </div>
          ))}

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Actividad 1: Laboratorio de búsquedas"
            answers={{
              "Nombre del equipo": data.team,
              ...Object.fromEntries(
                data.searches.flatMap((item, index) => {
                  const p = `BÚSQUEDA ${index + 1}`;

                  return [
                    [`${p} - Consulta`, item.query],
                    [`${p} - Buscador`, item.engine],
                    [`${p} - Resultados orgánicos`, item.organic],
                    [`${p} - Anuncios`, item.ads],
                    [`${p} - Mapas`, item.maps],
                    [`${p} - Respuestas con IA`, item.ai],
                    [`${p} - Evidencia`, item.evidence],
                    [`${p} - Conclusión`, item.conclusion],
                  ];
                })
              ),
            }}
          />
        </>
      )}

      {activeKind === "seo-company-workshop" && (
        <>
          <div style={styles.card}>
            <h3>Ficha de la empresa</h3>

            <div style={styles.grid}>
              {[
                ["name", "Nombre de la empresa"],
                ["website", "Sitio web"],
                ["sector", "Sector económico"],
                ["market", "Mercado geográfico"],
                ["audience", "Público objetivo"],
                ["value", "Propuesta de valor"],
                ["objective", "Objetivo comercial"],
              ].map(([field, label]) => (
                <Field
                  key={field}
                  label={label}
                  value={data.company[field]}
                  onChange={(v) =>
                    setCompany(field, v)
                  }
                />
              ))}
            </div>
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Actividad 2: Empresa y mercado"
            answers={{
              "Nombre del equipo": data.team,
              "Empresa": data.company.name,
              "Sitio web": data.company.website,
              "Sector": data.company.sector,
              "Mercado": data.company.market,
              "Público objetivo": data.company.audience,
              "Propuesta de valor": data.company.value,
              "Objetivo comercial": data.company.objective,
            }}
          />
        </>
      )}

      {activeKind === "seo-competitor-workshop" && (
        <>
          <div style={styles.counter}>
            Competidores registrados:{" "}
            <strong>
              {competitorsComplete} de 3
            </strong>
          </div>

          {data.competitors.map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>Competidor {index + 1}</h3>

              <div style={styles.grid}>
                <Field
                  label="Nombre del competidor"
                  value={item.name}
                  onChange={(v) =>
                    setCompetitor(index, "name", v)
                  }
                />

                <Field
                  label="Sitio web"
                  value={item.website}
                  onChange={(v) =>
                    setCompetitor(index, "website", v)
                  }
                />

                <Field
                  label="Consulta donde apareció"
                  value={item.query}
                  onChange={(v) =>
                    setCompetitor(index, "query", v)
                  }
                />

                <Field
                  label="Posición observada"
                  value={item.position}
                  onChange={(v) =>
                    setCompetitor(index, "position", v)
                  }
                />
              </div>

              <Field
                label="Fortalezas del competidor"
                value={item.strengths}
                onChange={(v) =>
                  setCompetitor(index, "strengths", v)
                }
                multiline
              />

              <Field
                label="Oportunidad de posicionamiento"
                value={item.opportunity}
                onChange={(v) =>
                  setCompetitor(index, "opportunity", v)
                }
                multiline
              />

              <Field
                label="Evidencia de búsqueda"
                value={item.evidence}
                onChange={(v) =>
                  setCompetitor(index, "evidence", v)
                }
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Oportunidades estratégicas</h3>

            {data.opportunities.map((value, index) => (
              <Field
                key={index}
                label={`Oportunidad ${index + 1}`}
                value={value}
                onChange={(v) =>
                  setOpportunity(index, v)
                }
                multiline
              />
            ))}

            <Field
              label="Conclusión competitiva"
              value={data.conclusion}
              onChange={(v) =>
                setField("conclusion", v)
              }
              multiline
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Actividad 3: Investigación de competidores"
            answers={{
              "Nombre del equipo": data.team,
              "Empresa analizada": data.company.name,
              ...Object.fromEntries(
                data.competitors.flatMap((item, index) => {
                  const p = `COMPETIDOR ${index + 1}`;

                  return [
                    [`${p} - Nombre`, item.name],
                    [`${p} - Sitio web`, item.website],
                    [`${p} - Consulta`, item.query],
                    [`${p} - Posición`, item.position],
                    [`${p} - Fortalezas`, item.strengths],
                    [`${p} - Oportunidad`, item.opportunity],
                    [`${p} - Evidencia`, item.evidence],
                  ];
                })
              ),
              "Oportunidad estratégica 1":
                data.opportunities[0],
              "Oportunidad estratégica 2":
                data.opportunities[1],
              "Conclusión competitiva":
                data.conclusion,
            }}
          />
        </>
      )}
    </section>
  );
}

const styles = {
  container: {
    background: "#f8fafc",
    color: "#14213d",
    padding: 24,
    borderRadius: 18,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  eyebrow: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.2,
  },
  title: {
    margin: "8px 0",
    fontSize: 28,
  },
  subtitle: {
    color: "#475569",
    lineHeight: 1.6,
  },
  saved: {
    color: "#047857",
    fontSize: 12,
    fontWeight: 700,
  },
  counter: {
    padding: 14,
    background: "#e0f2fe",
    borderRadius: 12,
    marginBottom: 18,
  },
  card: {
    background: "#fff",
    padding: 20,
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    marginBottom: 14,
    width: "100%",
  },
  label: {
    fontWeight: 700,
    fontSize: 13,
  },
  input: {
    width: "100%",
    padding: 11,
    borderRadius: 9,
    border: "1px solid #cbd5e1",
    background: "#fff",
    color: "#17213a",
    fontSize: 14,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
};
