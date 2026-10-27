import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 9,
  title: "Estructura de campañas, concordancias y palabras negativas",
};

const MATCHES = ["Amplia", "De frase", "Exacta"];

const QUESTIONS = [
  {
    query: "comprar café artesanal en Quito",
    answer: "Mostrar",
    explanation: "Expresa intención comercial y ubicación.",
  },
  {
    query: "empleos en cafeterías de Quito",
    answer: "Excluir",
    explanation: "La intención es laboral, no comprar café.",
  },
  {
    query: "café artesanal a domicilio",
    answer: "Revisar",
    explanation: "Es relevante si la empresa ofrece entregas.",
  },
  {
    query: "cómo preparar café gratis",
    answer: "Excluir",
    explanation: "La búsqueda es informativa y no indica compra directa.",
  },
  {
    query: "comprar café de especialidad",
    answer: "Mostrar",
    explanation: "Puede corresponder a una oferta comercial relevante.",
  },
];

const makeKeyword = () => ({
  term: "",
  group: "1",
  match: "",
  reason: "",
});

const makeNegative = () => ({
  term: "",
  exclusion: "",
  justification: "",
  conflict: "",
});

const makeData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  quiz: Array(5).fill(""),
  keywords: Array.from({ length: 10 }, makeKeyword),
  negatives: Array.from({ length: 10 }, makeNegative),
  keywordConclusion: "",
  campaignName: "",
  objective: "",
  group1: "",
  group2: "",
  location: "",
  language: "Español",
  network: "Red de Búsqueda de Google",
  budget: "100",
  days: "30",
  conversion: "",
  landing1: "",
  landing2: "",
  landingNote1: "",
  landingNote2: "",
  checklist: Array(8).fill(false),
  corrections: ["", "", ""],
  campaignConclusion: "",
});

function loadData(key) {
  const base = makeData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      keywords: base.keywords.map((item, i) => ({
        ...item,
        ...(saved.keywords?.[i] || {}),
      })),
      negatives: base.negatives.map((item, i) => ({
        ...item,
        ...(saved.negatives?.[i] || {}),
      })),
      quiz: base.quiz.map((v, i) => saved.quiz?.[i] ?? v),
      checklist: base.checklist.map((v, i) => saved.checklist?.[i] ?? v),
      corrections: base.corrections.map((v, i) => saved.corrections?.[i] ?? v),
    };
  } catch {
    return base;
  }
}

const CHECKLIST = [
  "El objetivo comercial está definido.",
  "La campaña tiene dos grupos temáticos coherentes.",
  "Cada grupo contiene cinco keywords relevantes.",
  "Las concordancias tienen justificación.",
  "Se documentaron diez negativas justificadas.",
  "La ubicación, idioma y redes son coherentes.",
  "El presupuesto es hipotético y está identificado.",
  "Las páginas de destino son relevantes o están propuestas.",
];

const ui = {
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
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
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
    fontSize: 14,
    fontFamily: "inherit",
    background: "#fff",
    color: "#14213d",
    boxSizing: "border-box",
  },
  hint: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#475569",
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
  options,
  multiline = false,
  type = "text",
}) {
  return (
    <label style={ui.field}>
      <span>{label}</span>
      {options ? (
        <select
          style={ui.input}
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
          rows={3}
          style={ui.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          style={ui.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

export default function SeoWeek09Workshop({
  kind,
  slide,
  lessonId = "seo-semana-9",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana09:${lessonId}:` +
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
      console.warn("No se pudo guardar la Semana 9:", error);
    }

    setStored({ key: storageKey, data: next });
  }

  const setRoot = (field, value) =>
    update((current) => ({ ...current, [field]: value }));

  const setItem = (collection, index, field, value) =>
    update((current) => ({
      ...current,
      [collection]: current[collection].map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  const setList = (collection, index, value) =>
    update((current) => ({
      ...current,
      [collection]: current[collection].map((item, i) =>
        i === index ? value : item,
      ),
    }));

  if (activeKind !== "seo-sem-keywords" && activeKind !== "seo-sem-campaign") {
    return null;
  }

  const budget = Number(data.budget);
  const days = Number(data.days);
  const validBudget =
    data.budget.trim() !== "" &&
    data.days.trim() !== "" &&
    Number.isFinite(budget) &&
    Number.isFinite(days) &&
    budget > 0 &&
    days > 0;

  const daily = validBudget ? budget / days : NaN;

  const quizScore = data.quiz.filter(
    (value, i) => value === QUESTIONS[i].answer,
  ).length;

  const completeKeywords = data.keywords.filter(
    (item) => item.term.trim() && item.match,
  ).length;

  const completeNegatives = data.negatives.filter(
    (item) => item.term.trim() && item.justification.trim(),
  ).length;

  const keywordAnswers = Object.fromEntries(
    data.keywords.flatMap((item, index) => {
      const prefix = `KEYWORD ${index + 1}`;
      return [
        [`${prefix} - Término`, item.term],
        [`${prefix} - Grupo`, item.group],
        [`${prefix} - Concordancia`, item.match],
        [`${prefix} - Justificación`, item.reason],
      ];
    }),
  );

  const negativeAnswers = Object.fromEntries(
    data.negatives.flatMap((item, index) => {
      const prefix = `NEGATIVA ${index + 1}`;
      return [
        [`${prefix} - Término`, item.term],
        [`${prefix} - Búsqueda excluida`, item.exclusion],
        [`${prefix} - Justificación`, item.justification],
        [`${prefix} - Conflictos`, item.conflict],
      ];
    }),
  );

  const groupKeywords = (group) =>
    data.keywords
      .filter((item) => item.group === group && item.term.trim())
      .map((item) => {
        if (item.match === "Exacta") return `[${item.term}]`;
        if (item.match === "De frase") return `"${item.term}"`;
        return item.term;
      });

  return (
    <section style={ui.panel}>
      <span style={{ color: "#2563eb", fontWeight: 800 }}>
        ANÁLISIS SEO · SEMANA 09
      </span>

      <h2>{slide?.title || "Campaña simulada"}</h2>

      <p style={ui.hint}>
        {slide?.instructions ||
          "Completa los laboratorios utilizando tu empresa real."}
      </p>

      <p style={ui.status}>Guardado automático en este dispositivo.</p>

      <div style={ui.grid}>
        <Field
          label="Equipo"
          value={data.team}
          onChange={(v) => setRoot("team", v)}
        />
        <Field
          label="Empresa real"
          value={data.company}
          onChange={(v) => setRoot("company", v)}
        />
        <Field
          label="Sitio oficial"
          value={data.companyUrl}
          onChange={(v) => setRoot("companyUrl", v)}
        />
      </div>

      {activeKind === "seo-sem-keywords" && (
        <>
          <div style={ui.card}>
            <h3>Ejercicio: ¿mostrarías el anuncio?</h3>
            <p style={ui.hint}>
              Caso didáctico: una empresa vende café artesanal. Las respuestas
              orientan la discusión; algunas decisiones dependen de la oferta
              concreta.
            </p>

            {QUESTIONS.map((question, index) => (
              <div key={index} style={ui.card}>
                <strong>
                  {index + 1}. {question.query}
                </strong>
                <div style={{ marginTop: 12 }}>
                  <Field
                    label="Tu decisión"
                    value={data.quiz[index]}
                    options={["Mostrar", "Excluir", "Revisar"]}
                    onChange={(value) => setList("quiz", index, value)}
                  />
                </div>
                {data.quiz[index] && (
                  <p style={ui.hint}>
                    <strong>
                      {data.quiz[index] === question.answer
                        ? "Coincide con el ejemplo."
                        : "Revisa tu criterio."}
                    </strong>{" "}
                    {question.explanation}
                  </p>
                )}
              </div>
            ))}

            <p style={ui.status}>
              Coincidencias con el ejemplo: {quizScore} de 5
            </p>
            <button
              type="button"
              style={ui.input}
              onClick={() =>
                update((current) => ({
                  ...current,
                  quiz: Array(5).fill(""),
                }))
              }
            >
              Reiniciar ejercicio
            </button>
          </div>

          <div style={ui.card}>
            <h3>Paso 1. Diez keywords y concordancias</h3>
            <p style={ui.hint}>
              Recupera las diez keywords del brief de la Semana 8. Asigna cinco
              a cada grupo y justifica la concordancia elegida.
            </p>
            <p style={ui.status}>
              Keywords documentadas: {completeKeywords} de 10
            </p>
          </div>

          {data.keywords.map((item, index) => (
            <div style={ui.card} key={index}>
              <h3>Keyword {index + 1}</h3>
              <div style={ui.grid}>
                <Field
                  label="Término comercial"
                  value={item.term}
                  onChange={(v) => setItem("keywords", index, "term", v)}
                />
                <Field
                  label="Grupo de anuncios"
                  value={item.group}
                  options={["1", "2"]}
                  onChange={(v) => setItem("keywords", index, "group", v)}
                />
                <Field
                  label="Concordancia"
                  value={item.match}
                  options={MATCHES}
                  onChange={(v) => setItem("keywords", index, "match", v)}
                />
              </div>
              <Field
                label="¿Por qué elegiste esta concordancia?"
                multiline
                value={item.reason}
                onChange={(v) => setItem("keywords", index, "reason", v)}
              />
            </div>
          ))}

          <div style={ui.card}>
            <h3>Paso 2. Diez palabras negativas</h3>
            <p style={ui.hint}>
              Investiga consultas que no corresponden a tu oferta. No excluyas
              términos que podrían bloquear búsquedas valiosas.
            </p>
            <p style={ui.status}>
              Negativas justificadas: {completeNegatives} de 10
            </p>
          </div>

          {data.negatives.map((item, index) => (
            <div style={ui.card} key={index}>
              <h3>Negativa {index + 1}</h3>
              <div style={ui.grid}>
                <Field
                  label="Palabra o expresión negativa"
                  value={item.term}
                  onChange={(v) => setItem("negatives", index, "term", v)}
                />
                <Field
                  label="Ejemplo de búsqueda a excluir"
                  value={item.exclusion}
                  onChange={(v) => setItem("negatives", index, "exclusion", v)}
                />
              </div>
              <Field
                label="Justificación"
                multiline
                value={item.justification}
                onChange={(v) =>
                  setItem("negatives", index, "justification", v)
                }
              />
              <Field
                label="¿Podría bloquear una búsqueda valiosa?"
                value={item.conflict}
                options={[
                  "No, según el análisis",
                  "Sí, requiere revisión",
                  "No verificable",
                ]}
                onChange={(v) => setItem("negatives", index, "conflict", v)}
              />
            </div>
          ))}

          <div style={ui.card}>
            <Field
              label="Conclusión sobre keywords y exclusiones"
              multiline
              value={data.keywordConclusion}
              onChange={(v) => setRoot("keywordConclusion", v)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Keywords, concordancias y negativas"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              "Ejercicio didáctico": data.quiz
                .map(
                  (answer, i) =>
                    `${QUESTIONS[i].query}: ${answer || "Sin responder"}`,
                )
                .join("\n"),
              ...keywordAnswers,
              ...negativeAnswers,
              Conclusión: data.keywordConclusion,
            }}
          />
        </>
      )}

      {activeKind === "seo-sem-campaign" && (
        <>
          <div style={ui.card}>
            <h3>Paso 1. Configuración de campaña</h3>
            <div style={ui.grid}>
              <Field
                label="Nombre de campaña"
                value={data.campaignName}
                onChange={(v) => setRoot("campaignName", v)}
              />
              <Field
                label="Objetivo"
                value={data.objective}
                options={[
                  "Ventas",
                  "Contactos",
                  "Reservas",
                  "Solicitudes de información",
                ]}
                onChange={(v) => setRoot("objective", v)}
              />
              <Field
                label="Grupo de anuncios 1"
                value={data.group1}
                onChange={(v) => setRoot("group1", v)}
              />
              <Field
                label="Grupo de anuncios 2"
                value={data.group2}
                onChange={(v) => setRoot("group2", v)}
              />
              <Field
                label="Ubicación"
                value={data.location}
                onChange={(v) => setRoot("location", v)}
              />
              <Field
                label="Idioma"
                value={data.language}
                onChange={(v) => setRoot("language", v)}
              />
              <Field
                label="Red de publicación propuesta"
                value={data.network}
                options={[
                  "Red de Búsqueda de Google",
                  "Búsqueda y socios de búsqueda",
                ]}
                onChange={(v) => setRoot("network", v)}
              />
              <Field
                label="Acción de conversión propuesta"
                value={data.conversion}
                onChange={(v) => setRoot("conversion", v)}
              />
            </div>
          </div>

          <div style={ui.card}>
            <h3>Paso 2. Árbol de campaña</h3>
            <p style={ui.hint}>
              Esta estructura se genera con las keywords y concordancias del
              Laboratorio 1.
            </p>

            <div
              style={{
                background: "#eaf1fc",
                borderRadius: 12,
                padding: 18,
              }}
            >
              <strong>CAMPAÑA: {data.campaignName || "Sin nombre"}</strong>

              {["1", "2"].map((group) => (
                <div
                  key={group}
                  style={{
                    background: "#fff",
                    padding: 14,
                    marginTop: 12,
                    borderRadius: 10,
                  }}
                >
                  <strong>
                    GRUPO {group}:{" "}
                    {(group === "1" ? data.group1 : data.group2) || "Pendiente"}
                  </strong>
                  <ul>
                    {groupKeywords(group).map((keyword, i) => (
                      <li key={i}>{keyword}</li>
                    ))}
                  </ul>
                  {groupKeywords(group).length === 0 && (
                    <p style={ui.hint}>
                      Completa las keywords del Laboratorio 1.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p style={ui.hint}>
              Distribución actual: Grupo 1 = {groupKeywords("1").length}; Grupo
              2 = {groupKeywords("2").length}. El objetivo es cinco keywords por
              grupo.
            </p>
          </div>

          <div style={ui.card}>
            <h3>Paso 3. Presupuesto simulado</h3>
            <div style={ui.grid}>
              <Field
                label="Presupuesto total (USD)"
                type="number"
                value={data.budget}
                onChange={(v) => setRoot("budget", v)}
              />
              <Field
                label="Duración (días)"
                type="number"
                value={data.days}
                onChange={(v) => setRoot("days", v)}
              />
            </div>
            <p style={ui.status}>
              Promedio diario orientativo:{" "}
              {validBudget ? `$${daily.toFixed(2)}` : "No calculable"}
            </p>
            <p style={ui.hint}>
              Este es un ejercicio académico. En Google Ads, el presupuesto
              diario se administra como promedio y no representa un límite fijo
              de gasto por día.
            </p>
          </div>

          <div style={ui.card}>
            <h3>Paso 4. Páginas de destino</h3>
            <p style={ui.hint}>
              Selecciona páginas públicas existentes. Si no hay una página
              adecuada, documenta qué página recomendarías crear. No debes
              editar el sitio empresarial.
            </p>
            <Field
              label="URL propuesta para el Grupo 1"
              value={data.landing1}
              onChange={(v) => setRoot("landing1", v)}
            />
            <Field
              label="Justificación o mejora recomendada"
              multiline
              value={data.landingNote1}
              onChange={(v) => setRoot("landingNote1", v)}
            />
            <Field
              label="URL propuesta para el Grupo 2"
              value={data.landing2}
              onChange={(v) => setRoot("landing2", v)}
            />
            <Field
              label="Justificación o mejora recomendada"
              multiline
              value={data.landingNote2}
              onChange={(v) => setRoot("landingNote2", v)}
            />
          </div>

          <div style={ui.card}>
            <h3>Paso 5. Checklist de lanzamiento simulado</h3>
            <p style={ui.hint}>
              Marca únicamente los criterios que hayas comprobado en tu
              propuesta. No se publicará ninguna campaña.
            </p>

            {CHECKLIST.map((label, index) => (
              <label
                key={index}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "8px 0",
                  fontSize: 14,
                }}
              >
                <input
                  type="checkbox"
                  checked={data.checklist[index]}
                  onChange={(event) =>
                    setList("checklist", index, event.target.checked)
                  }
                />
                <span>{label}</span>
              </label>
            ))}

            <h4>Corrige tres posibles errores</h4>
            {data.corrections.map((value, index) => (
              <Field
                key={index}
                label={`Corrección ${index + 1}`}
                multiline
                value={value}
                onChange={(v) => setList("corrections", index, v)}
              />
            ))}

            <Field
              label="Conclusión de la campaña"
              multiline
              value={data.campaignConclusion}
              onChange={(v) => setRoot("campaignConclusion", v)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Campaña simulada Google Ads"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              Campaña: data.campaignName,
              Objetivo: data.objective,
              "Grupo 1": data.group1,
              "Grupo 2": data.group2,
              "Keywords Grupo 1": groupKeywords("1").join("\n"),
              "Keywords Grupo 2": groupKeywords("2").join("\n"),
              ...negativeAnswers,
              Ubicación: data.location,
              Idioma: data.language,
              Redes: data.network,
              Conversión: data.conversion,
              "Presupuesto simulado": validBudget
                ? `$${budget.toFixed(2)}`
                : "No calculable",
              Duración: data.days,
              "Promedio diario": validBudget
                ? `$${daily.toFixed(2)}`
                : "No calculable",
              "Landing Grupo 1": data.landing1,
              "Recomendación Grupo 1": data.landingNote1,
              "Landing Grupo 2": data.landing2,
              "Recomendación Grupo 2": data.landingNote2,
              Checklist: CHECKLIST.map(
                (label, index) =>
                  `${data.checklist[index] ? "Sí" : "No"}: ${label}`,
              ).join("\n"),
              "Corrección 1": data.corrections[0],
              "Corrección 2": data.corrections[1],
              "Corrección 3": data.corrections[2],
              Conclusión: data.campaignConclusion,
              Nota: "Campaña exclusivamente simulada; no se ha publicado ni invertido dinero.",
            }}
          />
        </>
      )}
    </section>
  );
}
