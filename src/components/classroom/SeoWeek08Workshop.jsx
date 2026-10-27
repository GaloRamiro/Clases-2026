import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 8,
  title: "Introducción al SEM y planificación de campañas en Google Ads",
};

const SEARCHES = 5;
const ADS = 3;
const KEYWORDS = 10;

const makeAd = () => ({
  advertiser: "",
  keyword: "",
  message: "",
  value: "",
  cta: "",
  landing: "",
  evidence: "",
});

const makeData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  searches: Array.from({ length: SEARCHES }, () => ({
    keyword: "",
    adsFound: "",
    observation: "",
  })),
  ads: Array.from({ length: ADS }, makeAd),
  differentiation: "",
  researchConclusion: "",
  product: "",
  objective: "",
  conversion: "",
  audience: "",
  location: "",
  language: "Español",
  keywords: Array(KEYWORDS).fill(""),
  budget: "100",
  days: "30",
  cpc: "0.50",
  conversionRate: "3",
  kpis: ["", "", ""],
  justification: "",
  assumptions: "",
});

function loadData(key) {
  const base = makeData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      searches: base.searches.map((item, i) => ({
        ...item,
        ...(saved.searches?.[i] || {}),
      })),
      ads: base.ads.map((item, i) => ({
        ...item,
        ...(saved.ads?.[i] || {}),
      })),
      keywords: base.keywords.map((value, i) => saved.keywords?.[i] ?? value),
      kpis: base.kpis.map((value, i) => saved.kpis?.[i] ?? value),
    };
  } catch {
    return base;
  }
}

const ui = {
  panel: {
    background: "#f8fafc",
    color: "#14213d",
    borderRadius: 18,
    padding: 24,
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
    background: "#fff",
    color: "#14213d",
    fontFamily: "inherit",
    fontSize: 14,
    boxSizing: "border-box",
  },
  hint: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 1.6,
  },
  metric: {
    background: "#eaf1fc",
    borderRadius: 12,
    padding: 15,
    textAlign: "center",
  },
};

function Field({
  label,
  value = "",
  onChange,
  options,
  multiline = false,
  type = "text",
  placeholder = "",
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
          style={ui.input}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={ui.input}
          type={type}
          min={type === "number" ? "0" : undefined}
          step={type === "number" ? "any" : undefined}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

const asNumber = (value) => {
  if (String(value).trim() === "") return NaN;
  const number = Number(value);
  return Number.isFinite(number) ? number : NaN;
};

const money = (value) =>
  Number.isFinite(value) ? `$${value.toFixed(2)}` : "—";

export default function SeoWeek08Workshop({
  kind,
  slide,
  lessonId = "seo-semana-8",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana08:${lessonId}:` +
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

    setStored({ key: storageKey, data: next });
  }

  function setRoot(field, value) {
    update((current) => ({ ...current, [field]: value }));
  }

  function setItem(collection, index, field, value) {
    update((current) => ({
      ...current,
      [collection]: current[collection].map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function setList(collection, index, value) {
    update((current) => ({
      ...current,
      [collection]: current[collection].map((item, i) =>
        i === index ? value : item,
      ),
    }));
  }

  if (activeKind !== "seo-sem-research" && activeKind !== "seo-sem-brief") {
    return null;
  }

  const budget = asNumber(data.budget);
  const days = asNumber(data.days);
  const cpc = asNumber(data.cpc);
  const rate = asNumber(data.conversionRate);

  const valid =
    Number.isFinite(budget) &&
    budget > 0 &&
    Number.isFinite(days) &&
    days > 0 &&
    Number.isInteger(days) &&
    Number.isFinite(cpc) &&
    cpc > 0 &&
    Number.isFinite(rate) &&
    rate >= 0 &&
    rate <= 100;

  const clicks = valid ? budget / cpc : NaN;
  const conversions = valid ? (clicks * rate) / 100 : NaN;
  const cpa = valid && conversions > 0 ? budget / conversions : NaN;
  const dailyBudget = valid ? budget / days : NaN;

  const searchAnswers = Object.fromEntries(
    data.searches.flatMap((item, index) => [
      [`BÚSQUEDA ${index + 1} - Keyword`, item.keyword],
      [`BÚSQUEDA ${index + 1} - Anuncios`, item.adsFound],
      [`BÚSQUEDA ${index + 1} - Observación`, item.observation],
    ]),
  );

  const adAnswers = Object.fromEntries(
    data.ads.flatMap((item, index) => {
      const prefix = `ANUNCIO ${index + 1}`;
      return [
        [`${prefix} - Anunciante`, item.advertiser],
        [`${prefix} - Búsqueda`, item.keyword],
        [`${prefix} - Mensaje`, item.message],
        [`${prefix} - Valor`, item.value],
        [`${prefix} - CTA`, item.cta],
        [`${prefix} - Página de destino`, item.landing],
        [`${prefix} - Evidencia`, item.evidence],
      ];
    }),
  );

  return (
    <section style={ui.panel}>
      <span style={{ color: "#2563eb", fontWeight: 800 }}>
        ANÁLISIS SEO · SEMANA 08
      </span>

      <h2>{slide?.title || "Laboratorio de SEM"}</h2>

      <p style={ui.hint}>
        {slide?.instructions || "Trabaja con la empresa real de tu proyecto."}
      </p>

      <p style={{ color: "#047857", fontSize: 13 }}>
        Guardado automático en este dispositivo.
      </p>

      <div style={ui.grid}>
        <Field
          label="Nombre del equipo"
          value={data.team}
          onChange={(value) => setRoot("team", value)}
        />
        <Field
          label="Empresa real"
          value={data.company}
          onChange={(value) => setRoot("company", value)}
        />
        <Field
          label="Sitio web oficial"
          value={data.companyUrl}
          onChange={(value) => setRoot("companyUrl", value)}
        />
      </div>

      {activeKind === "seo-sem-research" && (
        <>
          <div style={ui.card}>
            <h3>Laboratorio 1 — Investigación de anuncios</h3>
            <p style={ui.hint}>
              Realiza cinco búsquedas comerciales en Google. Los anuncios pueden
              variar según ubicación, momento y usuario. Registra lo observado,
              incluso si no aparecen anuncios.
            </p>
          </div>

          {data.searches.map((item, index) => (
            <div style={ui.card} key={index}>
              <h3>Búsqueda {index + 1}</h3>
              <div style={ui.grid}>
                <Field
                  label="Palabra clave"
                  value={item.keyword}
                  onChange={(value) =>
                    setItem("searches", index, "keyword", value)
                  }
                />
                <Field
                  label="¿Aparecieron anuncios?"
                  value={item.adsFound}
                  options={["Sí", "No"]}
                  onChange={(value) =>
                    setItem("searches", index, "adsFound", value)
                  }
                />
              </div>
              <Field
                label="Observación"
                multiline
                value={item.observation}
                onChange={(value) =>
                  setItem("searches", index, "observation", value)
                }
              />
            </div>
          ))}

          <div style={ui.card}>
            <h3>Compara hasta tres anuncios reales</h3>
            <p style={ui.hint}>
              Si encuentras menos de tres anuncios, documenta únicamente los
              disponibles. Adjunta capturas por separado en Moodle.
            </p>
          </div>

          {data.ads.map((item, index) => (
            <div style={ui.card} key={index}>
              <h3>Anuncio {index + 1}</h3>

              <div style={ui.grid}>
                <Field
                  label="Anunciante"
                  value={item.advertiser}
                  onChange={(value) =>
                    setItem("ads", index, "advertiser", value)
                  }
                />
                <Field
                  label="Búsqueda que activó el anuncio"
                  value={item.keyword}
                  onChange={(value) => setItem("ads", index, "keyword", value)}
                />
                <Field
                  label="Llamada a la acción"
                  value={item.cta}
                  onChange={(value) => setItem("ads", index, "cta", value)}
                />
                <Field
                  label="URL de la página de destino"
                  value={item.landing}
                  onChange={(value) => setItem("ads", index, "landing", value)}
                />
              </div>

              <Field
                label="Mensaje principal"
                multiline
                value={item.message}
                onChange={(value) => setItem("ads", index, "message", value)}
              />
              <Field
                label="Propuesta de valor"
                multiline
                value={item.value}
                onChange={(value) => setItem("ads", index, "value", value)}
              />
              <Field
                label="Referencia de captura o evidencia"
                value={item.evidence}
                onChange={(value) => setItem("ads", index, "evidence", value)}
              />
            </div>
          ))}

          <div style={ui.card}>
            <Field
              label="¿Cómo puede diferenciarse tu empresa?"
              multiline
              value={data.differentiation}
              onChange={(value) => setRoot("differentiation", value)}
            />
            <Field
              label="Conclusión del análisis SEM"
              multiline
              value={data.researchConclusion}
              onChange={(value) => setRoot("researchConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Investigación de anuncios SEM"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              ...searchAnswers,
              ...adAnswers,
              "Oportunidad de diferenciación": data.differentiation,
              Conclusión: data.researchConclusion,
            }}
          />
        </>
      )}

      {activeKind === "seo-sem-brief" && (
        <>
          <div style={ui.card}>
            <h3>Paso 1. Objetivo de campaña</h3>
            <div style={ui.grid}>
              <Field
                label="Producto o servicio"
                value={data.product}
                onChange={(value) => setRoot("product", value)}
              />
              <Field
                label="Objetivo publicitario"
                value={data.objective}
                options={[
                  "Ventas",
                  "Contactos",
                  "Reservas",
                  "Solicitudes de información",
                ]}
                onChange={(value) => setRoot("objective", value)}
              />
            </div>
            <Field
              label="¿Qué acción contará como conversión?"
              value={data.conversion}
              placeholder="Ej. formulario enviado"
              onChange={(value) => setRoot("conversion", value)}
            />
          </div>

          <div style={ui.card}>
            <h3>Paso 2. Audiencia y segmentación</h3>
            <Field
              label="Descripción de la audiencia"
              multiline
              value={data.audience}
              onChange={(value) => setRoot("audience", value)}
            />
            <div style={ui.grid}>
              <Field
                label="Ubicación geográfica"
                value={data.location}
                placeholder="Ej. Quito, Ecuador"
                onChange={(value) => setRoot("location", value)}
              />
              <Field
                label="Idioma"
                value={data.language}
                onChange={(value) => setRoot("language", value)}
              />
            </div>
          </div>

          <div style={ui.card}>
            <h3>Paso 3. Diez palabras clave comerciales</h3>
            <p style={ui.hint}>
              Recupera la investigación SEO de la Semana 2 y selecciona
              búsquedas con intención comercial.
            </p>
            <div style={ui.grid}>
              {data.keywords.map((keyword, index) => (
                <Field
                  key={index}
                  label={`Keyword ${index + 1}`}
                  value={keyword}
                  onChange={(value) => setList("keywords", index, value)}
                />
              ))}
            </div>
          </div>

          <div style={ui.card}>
            <h3>Paso 4. Simulador de presupuesto</h3>
            <p style={ui.hint}>
              Los valores son supuestos académicos. No representan cotizaciones
              ni pronósticos oficiales de Google Ads.
            </p>

            <div style={ui.grid}>
              <Field
                label="Presupuesto total (USD)"
                type="number"
                value={data.budget}
                onChange={(value) => setRoot("budget", value)}
              />
              <Field
                label="Duración (días)"
                type="number"
                value={data.days}
                onChange={(value) => setRoot("days", value)}
              />
              <Field
                label="CPC supuesto (USD)"
                type="number"
                value={data.cpc}
                onChange={(value) => setRoot("cpc", value)}
              />
              <Field
                label="Tasa de conversión supuesta (%)"
                type="number"
                value={data.conversionRate}
                onChange={(value) => setRoot("conversionRate", value)}
              />
            </div>

            {!valid && (
              <p style={{ color: "#b45309" }}>
                Ingresa un presupuesto y CPC mayores que cero, días enteros
                positivos y una tasa entre 0 y 100 %.
              </p>
            )}

            <div style={ui.grid}>
              {[
                {
                  label: "Presupuesto diario",
                  value: money(dailyBudget),
                },
                {
                  label: "Clics hipotéticos",
                  value: valid ? clicks.toFixed(0) : "—",
                },
                {
                  label: "Conversiones hipotéticas",
                  value: valid ? conversions.toFixed(1) : "—",
                },
                {
                  label: "CPA hipotético",
                  value: money(cpa),
                },
              ].map((metric) => (
                <div style={ui.metric} key={metric.label}>
                  <div style={{ fontSize: 12, color: "#475569" }}>
                    {metric.label}
                  </div>
                  <strong style={{ fontSize: 25 }}>{metric.value}</strong>
                </div>
              ))}
            </div>

            <p style={ui.hint}>
              Fórmulas: clics = presupuesto / CPC; conversiones = clics × tasa /
              100; CPA = presupuesto / conversiones. Si la tasa es 0 %, el CPA
              no se puede calcular.
            </p>
          </div>

          <div style={ui.card}>
            <h3>Paso 5. KPI y justificación</h3>
            {data.kpis.map((value, index) => (
              <Field
                key={index}
                label={`KPI ${index + 1}`}
                value={value}
                placeholder="Ej. CTR, conversiones o CPA"
                onChange={(next) => setList("kpis", index, next)}
              />
            ))}
            <Field
              label="Justificación de la inversión"
              multiline
              value={data.justification}
              onChange={(value) => setRoot("justification", value)}
            />
            <Field
              label="Supuestos y limitaciones"
              multiline
              value={data.assumptions}
              onChange={(value) => setRoot("assumptions", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Brief estratégico de Google Ads"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              Producto: data.product,
              Objetivo: data.objective,
              Conversión: data.conversion,
              Audiencia: data.audience,
              Ubicación: data.location,
              Idioma: data.language,
              ...Object.fromEntries(
                data.keywords.map((keyword, index) => [
                  `Keyword ${index + 1}`,
                  keyword,
                ]),
              ),
              "Presupuesto supuesto": money(budget),
              "Duración en días": data.days,
              "CPC supuesto": money(cpc),
              "Tasa de conversión supuesta": `${data.conversionRate}%`,
              "Presupuesto diario": money(dailyBudget),
              "Clics hipotéticos": valid ? clicks.toFixed(0) : "No calculable",
              "Conversiones hipotéticas": valid
                ? conversions.toFixed(1)
                : "No calculable",
              "CPA hipotético": money(cpa),
              "KPI 1": data.kpis[0],
              "KPI 2": data.kpis[1],
              "KPI 3": data.kpis[2],
              Justificación: data.justification,
              "Supuestos y limitaciones": data.assumptions,
              "Nota metodológica":
                "Simulación académica. No son resultados reales ni proyecciones oficiales de Google Ads.",
            }}
          />
        </>
      )}
    </section>
  );
}
