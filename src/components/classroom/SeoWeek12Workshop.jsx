import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 12,
  title: "Optimización de campañas SEM: CPC, CTR, CPA, ROAS y ROI",
};

const CAMPAIGNS = [
  {
    id: "search",
    name: "Google Search",
    impressions: 12000,
    clicks: 480,
    spend: 150,
    conversions: 24,
    revenue: 720,
  },
  {
    id: "meta",
    name: "Meta Ads",
    impressions: 25000,
    clicks: 500,
    spend: 100,
    conversions: 10,
    revenue: 200,
  },
  {
    id: "youtube",
    name: "YouTube",
    impressions: 40000,
    clicks: 400,
    spend: 50,
    conversions: 2,
    revenue: 40,
  },
];

const METRICS = [
  { key: "ctr", name: "CTR", unit: "%" },
  { key: "cpc", name: "CPC", unit: "$" },
  { key: "conversionRate", name: "Tasa de conversión", unit: "%" },
  { key: "cpa", name: "CPA", unit: "$" },
  { key: "roas", name: "ROAS", unit: "×" },
];

const ACTION_AREAS = [
  "Palabras clave y términos de búsqueda",
  "Anuncios y mensajes",
  "Segmentación y audiencias",
  "Landing page",
  "Medición de conversiones",
  "Presupuesto y pujas",
  "Creatividad y formatos",
];

const makeAction = () => ({
  area: "",
  problem: "",
  action: "",
  priority: "",
  kpi: "",
  success: "",
  evidence: "",
});

const makeData = () => ({
  team: "",
  company: "",
  product: "",
  objective: "",
  initialDecision: "",
  selectedMetric: "roas",
  conclusions: ["", "", ""],
  bestCtrReason: "",
  bestCpaReason: "",
  comparison: "",
  problems: ["", "", ""],
  opportunities: ["", "", ""],
  budget: {
    search: "180",
    meta: "90",
    youtube: "30",
  },
  budgetReason: "",
  assumptions: "",
  actions: Array.from({ length: 5 }, makeAction),
  extraData: "",
  limitations: "",
  finalDecision: "",
});

function loadData(key) {
  const base = makeData();
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      budget: { ...base.budget, ...(saved.budget || {}) },
      conclusions: base.conclusions.map(
        (item, i) => saved.conclusions?.[i] ?? item,
      ),
      problems: base.problems.map((item, i) => saved.problems?.[i] ?? item),
      opportunities: base.opportunities.map(
        (item, i) => saved.opportunities?.[i] ?? item,
      ),
      actions: base.actions.map((item, i) => ({
        ...item,
        ...(saved.actions?.[i] || {}),
      })),
    };
  } catch {
    return base;
  }
}

function calculate(campaign) {
  const safeDivide = (numerator, denominator) =>
    denominator > 0 ? numerator / denominator : null;

  return {
    ...campaign,
    ctr: safeDivide(campaign.clicks * 100, campaign.impressions),
    cpc: safeDivide(campaign.spend, campaign.clicks),
    conversionRate: safeDivide(campaign.conversions * 100, campaign.clicks),
    cpa: safeDivide(campaign.spend, campaign.conversions),
    roas: safeDivide(campaign.revenue, campaign.spend),
  };
}

const RESULTS = CAMPAIGNS.map(calculate);

const format = (value, unit = "", decimals = 2) => {
  if (value === null || !Number.isFinite(value)) return "N/D";
  const number = value.toLocaleString("es-EC", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  if (unit === "$") return `$${number}`;
  return `${number}${unit}`;
};

const ui = {
  root: {
    background: "#f8fafc",
    color: "#111b35",
    padding: 22,
    borderRadius: 18,
    fontFamily: "inherit",
  },
  card: {
    background: "#fff",
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
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "#fff",
    color: "#111b35",
    font: "inherit",
    fontSize: 14,
  },
  note: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#475569",
  },
  tableWrap: {
    overflowX: "auto",
    margin: "16px 0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 580,
    fontSize: 13,
  },
  th: {
    textAlign: "left",
    padding: 10,
    background: "#111b35",
    color: "#fff",
    border: "1px solid #dbe3ee",
  },
  td: {
    padding: 10,
    border: "1px solid #dbe3ee",
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
    <label style={ui.field}>
      <span>{label}</span>
      {options ? (
        <select
          style={ui.input}
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
          style={ui.input}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          style={ui.input}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function DataTable() {
  return (
    <div style={ui.tableWrap}>
      <table style={ui.table}>
        <thead>
          <tr>
            {[
              "Canal",
              "Impresiones",
              "Clics",
              "Inversión",
              "Conversiones",
              "Ingresos",
            ].map((name) => (
              <th key={name} style={ui.th}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CAMPAIGNS.map((item) => (
            <tr key={item.id}>
              <td style={ui.td}>{item.name}</td>
              <td style={ui.td}>{item.impressions.toLocaleString("es-EC")}</td>
              <td style={ui.td}>{item.clicks}</td>
              <td style={ui.td}>{format(item.spend, "$", 0)}</td>
              <td style={ui.td}>{item.conversions}</td>
              <td style={ui.td}>{format(item.revenue, "$", 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultsTable() {
  return (
    <div style={ui.tableWrap}>
      <table style={ui.table}>
        <thead>
          <tr>
            <th style={ui.th}>Indicador</th>
            {RESULTS.map((item) => (
              <th key={item.id} style={ui.th}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {METRICS.map((metric) => (
            <tr key={metric.key}>
              <td style={ui.td}>
                <strong>{metric.name}</strong>
              </td>
              {RESULTS.map((item) => (
                <td key={item.id} style={ui.td}>
                  {format(item[metric.key], metric.unit)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MetricChart({ metricKey, title }) {
  const metric = METRICS.find((item) => item.key === metricKey);
  const values = RESULTS.map((item) => item[metricKey] ?? 0);
  const maximum = Math.max(...values, 0.001);

  return (
    <div style={ui.card}>
      <h4>{title || metric.name}</h4>
      <p style={ui.note}>
        Comparación de resultados calculados a partir de datos simulados.
      </p>
      {RESULTS.map((item, index) => (
        <div key={item.id} style={{ margin: "14px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 10,
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            <strong>{item.name}</strong>
            <span>{format(item[metricKey], metric.unit)}</span>
          </div>
          <div
            style={{
              background: "#e2e8f0",
              height: 16,
              borderRadius: 8,
            }}
          >
            <div
              style={{
                width: `${(values[index] / maximum) * 100}%`,
                height: "100%",
                background: "#ee7544",
                borderRadius: 8,
                transition: "width .2s",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectionTable({ budget, valid }) {
  if (!valid) return null;

  const projected = RESULTS.map((item) => {
    const newSpend = Number(budget[item.id]);
    const ratio = newSpend / item.spend;

    return {
      ...item,
      newSpend,
      conversionsProjected: item.conversions * ratio,
      revenueProjected: item.revenue * ratio,
    };
  });

  const totalSpend = projected.reduce((sum, item) => sum + item.newSpend, 0);
  const totalConversions = projected.reduce(
    (sum, item) => sum + item.conversionsProjected,
    0,
  );
  const totalRevenue = projected.reduce(
    (sum, item) => sum + item.revenueProjected,
    0,
  );

  const roas = totalSpend > 0 ? totalRevenue / totalSpend : null;
  const cpa = totalConversions > 0 ? totalSpend / totalConversions : null;

  return (
    <div style={ui.card}>
      <h3>Proyección lineal hipotética</h3>
      <p style={ui.note}>
        Esta simulación supone que el rendimiento de cada canal se mantiene
        constante al modificar su inversión. No predice resultados reales ni
        considera saturación, subastas o cambios de audiencia.
      </p>

      <div style={ui.grid}>
        {[
          ["Inversión", format(totalSpend, "$")],
          ["Conversiones", format(totalConversions)],
          ["ROAS", format(roas, "×")],
          ["CPA", format(cpa, "$")],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              padding: 16,
              border: "1px solid #dbe3ee",
              borderRadius: 12,
              background: "#f8fafc",
            }}
          >
            <p style={ui.note}>{label}</p>
            <strong style={{ fontSize: 24 }}>{value}</strong>
          </div>
        ))}
      </div>

      <div style={ui.tableWrap}>
        <table style={ui.table}>
          <thead>
            <tr>
              <th style={ui.th}>Canal</th>
              <th style={ui.th}>Nuevo presupuesto</th>
              <th style={ui.th}>Conversiones estimadas</th>
              <th style={ui.th}>Ingresos estimados</th>
            </tr>
          </thead>
          <tbody>
            {projected.map((item) => (
              <tr key={item.id}>
                <td style={ui.td}>{item.name}</td>
                <td style={ui.td}>{format(item.newSpend, "$")}</td>
                <td style={ui.td}>{format(item.conversionsProjected)}</td>
                <td style={ui.td}>{format(item.revenueProjected, "$")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SeoWeek12Workshop({
  kind,
  slide,
  lessonId = "seo-semana-12",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;
  const storageKey =
    `aula:seo:semana12:${lessonId}:` +
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
      console.warn("No se pudo guardar la Semana 12:", error);
    }
    setStored({ key: storageKey, data: next });
  }

  const setRoot = (field, value) =>
    update((current) => ({ ...current, [field]: value }));

  const setList = (field, index, value) =>
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) => (i === index ? value : item)),
    }));

  const setBudget = (id, value) =>
    update((current) => ({
      ...current,
      budget: { ...current.budget, [id]: value },
    }));

  const setAction = (index, field, value) =>
    update((current) => ({
      ...current,
      actions: current.actions.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));

  if (
    activeKind !== "seo-sem-performance" &&
    activeKind !== "seo-sem-optimization"
  ) {
    return null;
  }

  const budgetEntries = CAMPAIGNS.map((campaign) => {
    const raw = String(data.budget[campaign.id] ?? "").trim();
    const amount = Number(raw);
    return {
      ...campaign,
      amount,
      valid: raw !== "" && Number.isFinite(amount) && amount >= 0,
    };
  });

  const validAmounts = budgetEntries.every((item) => item.valid);
  const total = validAmounts
    ? budgetEntries.reduce((sum, item) => sum + item.amount, 0)
    : NaN;
  const budgetComplete = validAmounts && Math.abs(total - 300) < 0.001;

  const dashboardAnswers = Object.fromEntries(
    RESULTS.flatMap((item) => [
      [`${item.name} - Impresiones`, item.impressions],
      [`${item.name} - Clics`, item.clicks],
      [`${item.name} - Inversión`, item.spend],
      [`${item.name} - Conversiones`, item.conversions],
      [`${item.name} - Ingresos atribuidos`, item.revenue],
      [`${item.name} - CTR`, format(item.ctr, "%")],
      [`${item.name} - CPC`, format(item.cpc, "$")],
      [`${item.name} - Tasa de conversión`, format(item.conversionRate, "%")],
      [`${item.name} - CPA`, format(item.cpa, "$")],
      [`${item.name} - ROAS`, format(item.roas, "×")],
    ]),
  );

  return (
    <section style={ui.root}>
      <span style={{ color: "#ee7544", fontSize: 12, fontWeight: 800 }}>
        ANÁLISIS SEO · SEMANA 12
      </span>

      <h2>{slide?.title || "Análisis y optimización SEM"}</h2>
      <p style={ui.note}>{slide?.instructions}</p>
      <p style={{ color: "#047857", fontSize: 13, fontWeight: 700 }}>
        Guardado automático en este dispositivo.
      </p>

      <div style={ui.grid}>
        <Field
          label="Equipo"
          value={data.team}
          onChange={(value) => setRoot("team", value)}
        />
        <Field
          label="Empresa del proyecto"
          value={data.company}
          onChange={(value) => setRoot("company", value)}
        />
        <Field
          label="Producto o servicio"
          value={data.product}
          onChange={(value) => setRoot("product", value)}
        />
      </div>

      {activeKind === "seo-sem-performance" && (
        <>
          <div style={ui.card}>
            <h3>Paso 1. Analiza los datos originales</h3>
            <p style={ui.note}>
              Son resultados ficticios de tres campañas. Compara sus objetivos
              antes de determinar cuál funciona mejor.
            </p>
            <DataTable />

            <Field
              label="Objetivo principal de la comparación"
              value={data.objective}
              options={[
                "Conseguir conversiones",
                "Maximizar ingresos atribuidos",
                "Conseguir tráfico",
                "Generar reconocimiento",
              ]}
              onChange={(value) => setRoot("objective", value)}
            />

            <Field
              label="Antes de calcular: ¿qué campaña conservarías y por qué?"
              multiline
              value={data.initialDecision}
              onChange={(value) => setRoot("initialDecision", value)}
            />
          </div>

          <div style={ui.card}>
            <h3>Paso 2. Calcula e interpreta los indicadores</h3>
            <p style={ui.note}>
              CTR = clics / impresiones × 100; CPC = inversión / clics;
              conversión = conversiones / clics × 100; CPA = inversión /
              conversiones; ROAS = ingresos atribuidos / inversión.
            </p>
            <ResultsTable />
            <p style={ui.note}>
              Los resultados se calculan a partir de los valores originales, sin
              redondeos intermedios.
            </p>
          </div>

          <div style={ui.card}>
            <h3>Paso 3. Dashboard comparativo</h3>
            <p style={ui.note}>
              Los dos gráficos iniciales muestran ROAS y CPA. Puedes seleccionar
              otro indicador para una tercera comparación.
            </p>

            <div style={ui.grid}>
              <MetricChart
                metricKey="roas"
                title="Gráfico 1. Retorno publicitario (ROAS)"
              />
              <MetricChart
                metricKey="cpa"
                title="Gráfico 2. Costo por conversión (CPA)"
              />
            </div>

            <Field
              label="Indicador adicional para comparar"
              value={data.selectedMetric}
              options={METRICS.map((metric) => metric.key)}
              onChange={(value) => setRoot("selectedMetric", value)}
            />
            <MetricChart
              metricKey={data.selectedMetric}
              title="Gráfico adicional"
            />
          </div>

          <div style={ui.card}>
            <h3>Paso 4. Redacta tus conclusiones</h3>

            <Field
              label="¿Qué campaña tiene el mayor CTR y qué significa?"
              multiline
              value={data.bestCtrReason}
              onChange={(value) => setRoot("bestCtrReason", value)}
            />

            <Field
              label="¿Qué campaña tiene el menor CPA y por qué importa?"
              multiline
              value={data.bestCpaReason}
              onChange={(value) => setRoot("bestCpaReason", value)}
            />

            <Field
              label="¿Por qué YouTube no debe descartarse únicamente por su ROAS?"
              multiline
              value={data.comparison}
              onChange={(value) => setRoot("comparison", value)}
            />

            {data.conclusions.map((value, index) => (
              <Field
                key={index}
                label={`Conclusión estratégica ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("conclusions", index, next)}
              />
            ))}
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Análisis de indicadores SEM"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Producto: data.product,
              Objetivo: data.objective,
              "Decisión inicial": data.initialDecision,
              ...dashboardAnswers,
              "Indicador adicional seleccionado": data.selectedMetric,
              "Análisis de CTR": data.bestCtrReason,
              "Análisis de CPA": data.bestCpaReason,
              "Comparación de objetivos": data.comparison,
              "Conclusión 1": data.conclusions[0],
              "Conclusión 2": data.conclusions[1],
              "Conclusión 3": data.conclusions[2],
              Nota: "Datos académicos simulados. El ROAS no equivale a rentabilidad neta.",
            }}
          />
        </>
      )}

      {activeKind === "seo-sem-optimization" && (
        <>
          <div style={ui.card}>
            <h3>Paso 1. Recupera el dashboard</h3>
            <ResultsTable />
            <p style={ui.note}>
              Usa estos resultados como evidencia para recomendar cambios. No
              son métricas reales de la empresa.
            </p>
          </div>

          <div style={ui.card}>
            <h3>Paso 2. Detecta tres problemas y tres oportunidades</h3>
            {data.problems.map((value, index) => (
              <div key={index}>
                <Field
                  label={`Problema ${index + 1} y evidencia numérica`}
                  multiline
                  value={value}
                  onChange={(next) => setList("problems", index, next)}
                />
                <Field
                  label={`Oportunidad ${index + 1}`}
                  multiline
                  value={data.opportunities[index]}
                  onChange={(next) => setList("opportunities", index, next)}
                />
              </div>
            ))}
          </div>

          <div style={ui.card}>
            <h3>Paso 3. Redistribuye los $300</h3>
            <p style={ui.note}>
              Decide cómo invertirías el presupuesto durante el siguiente
              período. La distribución original era: Search $150, Meta $100 y
              YouTube $50.
            </p>

            <div style={ui.grid}>
              {CAMPAIGNS.map((campaign) => (
                <Field
                  key={campaign.id}
                  label={`${campaign.name} · Nuevo presupuesto ($)`}
                  type="number"
                  value={data.budget[campaign.id]}
                  onChange={(value) => setBudget(campaign.id, value)}
                />
              ))}
            </div>

            {validAmounts ? (
              <p
                style={{
                  color: budgetComplete ? "#047857" : "#b45309",
                  fontWeight: 750,
                }}
              >
                Presupuesto asignado: {format(total, "$")} / $300.00
                {" · "}
                {budgetComplete
                  ? "Distribución correcta."
                  : total < 300
                    ? `Faltan ${format(300 - total, "$")}.`
                    : `Excedente de ${format(total - 300, "$")}.`}
              </p>
            ) : (
              <p style={{ color: "#b91c1c" }}>
                Ingresa tres montos válidos, sin valores negativos.
              </p>
            )}

            <ProjectionTable budget={data.budget} valid={budgetComplete} />

            <Field
              label="Justificación de la nueva distribución"
              multiline
              value={data.budgetReason}
              onChange={(value) => setRoot("budgetReason", value)}
            />

            <Field
              label="¿Qué supuestos utiliza esta proyección?"
              multiline
              value={data.assumptions}
              onChange={(value) => setRoot("assumptions", value)}
            />
          </div>

          <div style={ui.card}>
            <h3>Paso 4. Define cinco acciones de optimización</h3>
            <p style={ui.note}>
              Cada acción debe indicar el problema, la mejora propuesta, su
              prioridad, un KPI y el criterio para evaluar el éxito.
            </p>

            {data.actions.map((action, index) => (
              <div key={index} style={{ ...ui.card, margin: "12px 0" }}>
                <h4>Acción {index + 1}</h4>

                <div style={ui.grid}>
                  <Field
                    label="Área"
                    value={action.area}
                    options={ACTION_AREAS}
                    onChange={(value) => setAction(index, "area", value)}
                  />
                  <Field
                    label="Prioridad"
                    value={action.priority}
                    options={["Alta", "Media", "Baja"]}
                    onChange={(value) => setAction(index, "priority", value)}
                  />
                  <Field
                    label="KPI"
                    value={action.kpi}
                    options={[
                      "CTR",
                      "CPC",
                      "Tasa de conversión",
                      "CPA",
                      "ROAS",
                      "Conversiones",
                      "Otro",
                    ]}
                    onChange={(value) => setAction(index, "kpi", value)}
                  />
                </div>

                <Field
                  label="Problema identificado"
                  multiline
                  value={action.problem}
                  onChange={(value) => setAction(index, "problem", value)}
                />

                <Field
                  label="Acción recomendada"
                  multiline
                  value={action.action}
                  onChange={(value) => setAction(index, "action", value)}
                />

                <Field
                  label="Criterio de éxito"
                  value={action.success}
                  placeholder="Ejemplo: reducir CPA en 10 %"
                  onChange={(value) => setAction(index, "success", value)}
                />

                <Field
                  label="Evidencia o forma de comprobación"
                  multiline
                  value={action.evidence}
                  onChange={(value) => setAction(index, "evidence", value)}
                />
              </div>
            ))}
          </div>

          <div style={ui.card}>
            <h3>Paso 5. Presenta tu recomendación</h3>

            <Field
              label="¿Qué información adicional necesitarías?"
              multiline
              value={data.extraData}
              onChange={(value) => setRoot("extraData", value)}
              placeholder="Márgenes, costos, atribución, objetivos, calidad de conversiones..."
            />

            <Field
              label="Limitaciones de los datos simulados"
              multiline
              value={data.limitations}
              onChange={(value) => setRoot("limitations", value)}
            />

            <Field
              label="Decisión final para el cliente"
              multiline
              value={data.finalDecision}
              onChange={(value) => setRoot("finalDecision", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Optimización de campañas SEM"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Producto: data.product,
              ...dashboardAnswers,
              "Problema 1": data.problems[0],
              "Problema 2": data.problems[1],
              "Problema 3": data.problems[2],
              "Oportunidad 1": data.opportunities[0],
              "Oportunidad 2": data.opportunities[1],
              "Oportunidad 3": data.opportunities[2],
              "Nuevo presupuesto Search": data.budget.search,
              "Nuevo presupuesto Meta": data.budget.meta,
              "Nuevo presupuesto YouTube": data.budget.youtube,
              "Presupuesto total": validAmounts
                ? format(total, "$")
                : "Inválido",
              "Presupuesto correcto": budgetComplete ? "Sí" : "No",
              "Justificación presupuestaria": data.budgetReason,
              "Supuestos de proyección": data.assumptions,
              ...Object.fromEntries(
                data.actions.flatMap((action, index) => [
                  [`Acción ${index + 1} - Área`, action.area],
                  [`Acción ${index + 1} - Problema`, action.problem],
                  [`Acción ${index + 1} - Recomendación`, action.action],
                  [`Acción ${index + 1} - Prioridad`, action.priority],
                  [`Acción ${index + 1} - KPI`, action.kpi],
                  [`Acción ${index + 1} - Éxito`, action.success],
                  [`Acción ${index + 1} - Evidencia`, action.evidence],
                ]),
              ),
              "Información adicional": data.extraData,
              Limitaciones: data.limitations,
              "Decisión final": data.finalDecision,
              Nota: "Informe académico con datos ficticios. Ningún cambio se ha implementado en cuentas publicitarias reales.",
            }}
          />
        </>
      )}
    </section>
  );
}
