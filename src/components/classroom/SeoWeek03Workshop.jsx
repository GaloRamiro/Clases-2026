import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 3,
  title: "Benchmarking SEO y análisis de competidores",
};

const KINDS = [
  "seo-competitor-map",
  "seo-benchmark-lab",
  "seo-competitive-plan",
];

const CRITERIA = [
  "Relevancia",
  "Contenido",
  "SEO on-page",
  "Experiencia",
  "Confianza",
];

const makeCompetitor = () => ({
  name: "",
  url: "",
  keyword: "",
  position: "",
  reason: "",
  evidence: "",
});

const makeRating = () => ({
  score: "",
  observation: "",
  evidence: "",
});

const initialData = () => ({
  team: "",
  company: "",
  keywords: Array(5).fill(""),
  competitors: Array.from({ length: 3 }, makeCompetitor),
  benchmark: Array.from({ length: 3 }, () => ({
    ratings: Array.from({ length: 5 }, makeRating),
    strength: "",
    weakness: "",
  })),
  opportunity: "",
  targetCompetitor: "",
  targetKeyword: "",
  actions: Array.from({ length: 3 }, () => ({
    action: "",
    priority: "",
    justification: "",
    indicator: "",
  })),
  conclusion: "",
});

function load(key) {
  const defaults = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") return defaults;

    return {
      ...defaults,
      ...saved,
      keywords: defaults.keywords.map(
        (value, index) => saved.keywords?.[index] ?? value,
      ),
      competitors: defaults.competitors.map((item, index) => ({
        ...item,
        ...(saved.competitors?.[index] || {}),
      })),
      benchmark: defaults.benchmark.map((item, index) => ({
        ...item,
        ...(saved.benchmark?.[index] || {}),
        ratings: item.ratings.map((rating, j) => ({
          ...rating,
          ...(saved.benchmark?.[index]?.ratings?.[j] || {}),
        })),
      })),
      actions: defaults.actions.map((item, index) => ({
        ...item,
        ...(saved.actions?.[index] || {}),
      })),
    };
  } catch {
    return defaults;
  }
}

const css = {
  panel: {
    padding: 24,
    background: "#f8fafc",
    borderRadius: 18,
    color: "#14213d",
  },
  card: {
    background: "white",
    border: "1px solid #dce2ed",
    borderRadius: 14,
    padding: 18,
    margin: "16px 0",
  },
  field: {
    display: "grid",
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
    font: "inherit",
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 12,
  },
};

function Field({ label, value = "", onChange, multiline = false, options }) {
  return (
    <label style={css.field}>
      <span>{label}</span>

      {options ? (
        <select
          style={css.input}
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
          style={css.input}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={css.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export default function SeoWeek03Workshop({
  kind,
  slide,
  lessonId = "seo-semana-3",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const key = `aula:seo:semana03:${lessonId}:${String(
    studentName || "sin-nombre",
  )
    .trim()
    .toLowerCase()}`;

  const [state, setState] = useState(() => ({
    key,
    data: load(key),
  }));

  const data = state.key === key ? state.data : load(key);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar", error);
    }

    setState({ key, data: next });
  }

  const top = (field, value) =>
    update((current) => ({ ...current, [field]: value }));

  const keyword = (index, value) =>
    update((current) => ({
      ...current,
      keywords: current.keywords.map((item, i) => (i === index ? value : item)),
    }));

  const competitor = (index, field, value) =>
    update((current) => ({
      ...current,
      competitors: current.competitors.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  const benchmark = (index, criterionIndex, field, value) =>
    update((current) => ({
      ...current,
      benchmark: current.benchmark.map((item, i) =>
        i === index
          ? {
              ...item,
              ratings: item.ratings.map((rating, j) =>
                j === criterionIndex ? { ...rating, [field]: value } : rating,
              ),
            }
          : item,
      ),
    }));

  const benchmarkNote = (index, field, value) =>
    update((current) => ({
      ...current,
      benchmark: current.benchmark.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  const action = (index, field, value) =>
    update((current) => ({
      ...current,
      actions: current.actions.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  if (!KINDS.includes(activeKind)) return null;

  const competitorAnswers = Object.fromEntries(
    data.competitors.flatMap((item, index) => [
      [`Competidor ${index + 1} - Nombre`, item.name],
      [`Competidor ${index + 1} - URL`, item.url],
      [`Competidor ${index + 1} - Keyword`, item.keyword],
      [`Competidor ${index + 1} - Posición observada`, item.position],
      [`Competidor ${index + 1} - Motivo`, item.reason],
      [`Competidor ${index + 1} - Evidencia`, item.evidence],
    ]),
  );

  return (
    <section style={css.panel}>
      <p style={{ color: "#2563eb", fontWeight: 800, fontSize: 12 }}>
        ANÁLISIS SEO · SEMANA 03
      </p>

      <h2>{slide?.title || "Taller de benchmarking SEO"}</h2>

      <p>
        {slide?.instructions ||
          "Registra resultados y evidencias verificables."}
      </p>

      <p style={{ color: "#047857", fontSize: 13 }}>
        Las respuestas se guardan automáticamente en este navegador.
      </p>

      <div style={css.grid}>
        <Field
          label="Nombre del equipo"
          value={data.team}
          onChange={(value) => top("team", value)}
        />
        <Field
          label="Empresa del proyecto"
          value={data.company}
          onChange={(value) => top("company", value)}
        />
      </div>

      {activeKind === "seo-competitor-map" && (
        <>
          <div style={css.card}>
            <h3>Cinco keywords seleccionadas</h3>
            <div style={css.grid}>
              {data.keywords.map((value, index) => (
                <Field
                  key={index}
                  label={`Keyword ${index + 1}`}
                  value={value}
                  onChange={(next) => keyword(index, next)}
                />
              ))}
            </div>
          </div>

          {data.competitors.map((item, index) => (
            <div style={css.card} key={index}>
              <h3>Competidor {index + 1}</h3>

              <div style={css.grid}>
                <Field
                  label="Nombre o dominio"
                  value={item.name}
                  onChange={(value) => competitor(index, "name", value)}
                />
                <Field
                  label="URL del resultado orgánico"
                  value={item.url}
                  onChange={(value) => competitor(index, "url", value)}
                />
                <Field
                  label="Keyword donde apareció"
                  value={item.keyword}
                  onChange={(value) => competitor(index, "keyword", value)}
                />
                <Field
                  label="Posición observada (no anuncio)"
                  value={item.position}
                  onChange={(value) => competitor(index, "position", value)}
                />
              </div>

              <Field
                label="¿Por qué es competidor SEO?"
                multiline
                value={item.reason}
                onChange={(value) => competitor(index, "reason", value)}
              />

              <Field
                label="Enlace o referencia de captura"
                value={item.evidence}
                onChange={(value) => competitor(index, "evidence", value)}
              />
            </div>
          ))}

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Actividad 1: Mapa de competidores SEO"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              ...Object.fromEntries(
                data.keywords.map((item, index) => [
                  `Keyword ${index + 1}`,
                  item,
                ]),
              ),
              ...competitorAnswers,
            }}
          />
        </>
      )}

      {activeKind === "seo-benchmark-lab" && (
        <>
          <p>
            Evalúa cada criterio con una puntuación orientativa del 1 al 5.
            Registra observaciones y evidencias; no supongas datos internos.
          </p>

          {data.benchmark.map((item, index) => (
            <div style={css.card} key={index}>
              <h3>
                {data.competitors[index]?.name || `Competidor ${index + 1}`}
              </h3>

              {CRITERIA.map((criterion, j) => (
                <div key={criterion} style={css.card}>
                  <h4>{criterion}</h4>

                  <div style={css.grid}>
                    <Field
                      label="Valoración (1 a 5)"
                      value={item.ratings[j].score}
                      options={["1", "2", "3", "4", "5"]}
                      onChange={(value) => benchmark(index, j, "score", value)}
                    />

                    <Field
                      label="Evidencia o URL"
                      value={item.ratings[j].evidence}
                      onChange={(value) =>
                        benchmark(index, j, "evidence", value)
                      }
                    />
                  </div>

                  <Field
                    label="Observación concreta"
                    multiline
                    value={item.ratings[j].observation}
                    onChange={(value) =>
                      benchmark(index, j, "observation", value)
                    }
                  />
                </div>
              ))}

              <Field
                label="Fortaleza principal"
                multiline
                value={item.strength}
                onChange={(value) => benchmarkNote(index, "strength", value)}
              />

              <Field
                label="Brecha u oportunidad"
                multiline
                value={item.weakness}
                onChange={(value) => benchmarkNote(index, "weakness", value)}
              />
            </div>
          ))}

          <Field
            label="Oportunidad general para nuestra empresa"
            multiline
            value={data.opportunity}
            onChange={(value) => top("opportunity", value)}
          />

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Actividad 2: Matriz de benchmarking SEO"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              ...Object.fromEntries(
                data.benchmark.flatMap((item, index) => [
                  [
                    `Competidor ${index + 1}`,
                    data.competitors[index]?.name || "Sin nombre",
                  ],
                  ...item.ratings.flatMap((rating, j) => [
                    [`C${index + 1} ${CRITERIA[j]} - Valoración`, rating.score],
                    [
                      `C${index + 1} ${CRITERIA[j]} - Observación`,
                      rating.observation,
                    ],
                    [
                      `C${index + 1} ${CRITERIA[j]} - Evidencia`,
                      rating.evidence,
                    ],
                  ]),
                  [`C${index + 1} - Fortaleza`, item.strength],
                  [`C${index + 1} - Brecha`, item.weakness],
                ]),
              ),
              "Oportunidad general": data.opportunity,
            }}
          />
        </>
      )}

      {activeKind === "seo-competitive-plan" && (
        <>
          <div style={css.card}>
            <h3>Decisión estratégica</h3>

            <Field
              label="Competidor elegido"
              value={data.targetCompetitor}
              onChange={(value) => top("targetCompetitor", value)}
            />

            <Field
              label="Keyword objetivo"
              value={data.targetKeyword}
              onChange={(value) => top("targetKeyword", value)}
            />

            <Field
              label="Brecha u oportunidad detectada"
              multiline
              value={data.opportunity}
              onChange={(value) => top("opportunity", value)}
            />
          </div>

          {data.actions.map((item, index) => (
            <div style={css.card} key={index}>
              <h3>Acción SEO {index + 1}</h3>

              <Field
                label="Acción concreta"
                multiline
                value={item.action}
                onChange={(value) => action(index, "action", value)}
              />

              <Field
                label="Prioridad"
                options={["Alta", "Media", "Baja"]}
                value={item.priority}
                onChange={(value) => action(index, "priority", value)}
              />

              <Field
                label="Justificación y evidencia"
                multiline
                value={item.justification}
                onChange={(value) => action(index, "justification", value)}
              />

              <Field
                label="Indicador de éxito"
                value={item.indicator}
                onChange={(value) => action(index, "indicator", value)}
              />
            </div>
          ))}

          <Field
            label="Conclusión estratégica"
            multiline
            value={data.conclusion}
            onChange={(value) => top("conclusion", value)}
          />

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Actividad 3: Plan competitivo SEO"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Competidor elegido": data.targetCompetitor,
              "Keyword objetivo": data.targetKeyword,
              "Brecha detectada": data.opportunity,
              ...Object.fromEntries(
                data.actions.flatMap((item, index) => [
                  [`Acción ${index + 1}`, item.action],
                  [`Acción ${index + 1} - Prioridad`, item.priority],
                  [`Acción ${index + 1} - Justificación`, item.justification],
                  [`Acción ${index + 1} - Indicador`, item.indicator],
                ]),
              ),
              Conclusión: data.conclusion,
            }}
          />
        </>
      )}
    </section>
  );
}
