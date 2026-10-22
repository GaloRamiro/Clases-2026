import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana12.css";

const SAMPLE = [
  {
    id: 1,
    name: "Carrusel educativo",
    stage: "TOFU",
    reach: 4200,
    impressions: 5600,
    interactions: 310,
    clicks: 42,
  },
  {
    id: 2,
    name: "Video demostrativo",
    stage: "MOFU",
    reach: 2700,
    impressions: 3900,
    interactions: 245,
    clicks: 115,
  },
  {
    id: 3,
    name: "Anuncio de producto",
    stage: "BOFU",
    reach: 1800,
    impressions: 3000,
    interactions: 95,
    clicks: 88,
  },
];

const STEPS = [
  ["Seleccionar KPIs", 10],
  ["Calcular indicadores", 10],
  ["Construir dashboard", 15],
  ["Comparar publicaciones", 10],
  ["Rediseñar una pieza", 10],
  ["Preparar entrega", 5],
];

const INITIAL = () => ({
  team: "",
  brand: "",
  campaign: "",
  goal: "",
  kpis: {
    TOFU: "Alcance",
    MOFU: "Clics",
    BOFU: "Consultas",
  },
  posts: SAMPLE.map((post) => ({ ...post })),
  selectedPost: 3,
  observation: "",
  hypothesis: "",
  before: "",
  after: "",
  changes: "",
  testKpi: "CTR",
  beforeLink: "",
  afterLink: "",
  recommendations: ["", "", ""],
  dashboardLink: "",
  done: Array(6).fill(false),
});

function readSaved(key) {
  const base = INITIAL();

  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");

    if (!raw || typeof raw !== "object") {
      return base;
    }

    return {
      ...base,
      ...raw,
      kpis: { ...base.kpis, ...(raw.kpis || {}) },
      posts: base.posts.map((post, index) => ({
        ...post,
        ...(raw.posts?.[index] || {}),
      })),
      recommendations: base.recommendations.map(
        (item, index) => raw.recommendations?.[index] ?? item,
      ),
      done: base.done.map((_, index) => Boolean(raw.done?.[index])),
    };
  } catch {
    return base;
  }
}

const number = (value) => Math.max(0, Number(value) || 0);

const sum = (items, field) =>
  items.reduce((total, item) => total + number(item[field]), 0);

const percentage = (part, total) => (total > 0 ? (part / total) * 100 : 0);

const formatNumber = (value) => new Intl.NumberFormat("es-EC").format(value);

const formatPercent = (value) => `${value.toFixed(2)} %`;

function Field({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  placeholder = "",
}) {
  return (
    <label className="kpi12-field">
      <span>{label}</span>

      {multiline ? (
        <textarea
          rows={3}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          min={type === "number" ? 0 : undefined}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Step({ index, done, onDone, children }) {
  const [title, minutes] = STEPS[index];

  return (
    <section className="kpi12-panel">
      <div className="kpi12-stephead">
        <h3>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {title}
        </h3>
        <small>{minutes} min</small>
      </div>

      {children}

      <label className="kpi12-complete">
        <input
          type="checkbox"
          checked={done}
          onChange={(event) => onDone(event.target.checked)}
        />
        Etapa completada
      </label>
    </section>
  );
}

function BarChart({ title, posts, field, suffix = "", getValue }) {
  const values = posts.map((post) =>
    typeof getValue === "function" ? getValue(post) : number(post[field]),
  );

  const maximum = Math.max(...values, 1);

  return (
    <div className="kpi12-chart">
      <h4>{title}</h4>

      {posts.map((post, index) => {
        const value = values[index];

        return (
          <div className="kpi12-bar-row" key={post.id}>
            <div className="kpi12-bar-label">
              <span>{post.name}</span>

              <strong>
                {suffix ? `${value.toFixed(2)}${suffix}` : formatNumber(value)}
              </strong>
            </div>

            <div className="kpi12-track">
              <div
                className={`kpi12-bar kpi12-bar--${post.stage.toLowerCase()}`}
                style={{
                  width: `${(value / maximum) * 100}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ContentWeek12Workshop({
  lessonId = "contenido-semana-12",
  studentName = "",
}) {
  const storageKey = `aula:semana12:${lessonId}:${studentName || "anonimo"}`;

  const [session, setSession] = useState(() => ({
    key: storageKey,
    data: readSaved(storageKey),
  }));

  const [notice, setNotice] = useState("");

  const data =
    session.key === storageKey ? session.data : readSaved(storageKey);

  function save(next) {
    setSession({ key: storageKey, data: next });

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setNotice("Avance guardado en este navegador.");
    } catch {
      setNotice("No se pudo guardar el avance.");
    }
  }

  function setField(field, value) {
    save({ ...data, [field]: value });
  }

  function setKpi(stage, value) {
    setField("kpis", {
      ...data.kpis,
      [stage]: value,
    });
  }

  function setPost(index, field, value) {
    setField(
      "posts",
      data.posts.map((post, i) =>
        i === index ? { ...post, [field]: value } : post,
      ),
    );
  }

  function markDone(index, checked) {
    setField(
      "done",
      data.done.map((item, i) => (i === index ? checked : item)),
    );
  }

  function setRecommendation(index, value) {
    setField(
      "recommendations",
      data.recommendations.map((item, i) => (i === index ? value : item)),
    );
  }

  const totals = {
    reach: sum(data.posts, "reach"),
    impressions: sum(data.posts, "impressions"),
    interactions: sum(data.posts, "interactions"),
    clicks: sum(data.posts, "clicks"),
  };

  const engagement = percentage(totals.interactions, totals.reach);

  const ctr = percentage(totals.clicks, totals.impressions);

  const selected =
    data.posts.find((post) => post.id === Number(data.selectedPost)) ||
    data.posts[0];

  const completed = data.done.filter(Boolean).length;

  function exportReport() {
    const lines = [
      "SEMANA 12 — ANÁLISIS DE CAMPAÑA",
      "DATOS SIMULADOS — EJERCICIO ACADÉMICO",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Objetivo: ${data.goal}`,
      "",
      "MATRIZ DE KPIs",
      ...Object.entries(data.kpis).map(([stage, kpi]) => `${stage}: ${kpi}`),
      "",
      "INDICADORES",
      `Alcance agregado: ${totals.reach}`,
      `Impresiones: ${totals.impressions}`,
      `Interacciones: ${totals.interactions}`,
      `Clics: ${totals.clicks}`,
      `Engagement por alcance: ${formatPercent(engagement)}`,
      `CTR por impresiones: ${formatPercent(ctr)}`,
      "",
      "PUBLICACIONES",
      ...data.posts.map((post) =>
        [
          post.name,
          `Etapa: ${post.stage}`,
          `Alcance: ${post.reach}`,
          `Impresiones: ${post.impressions}`,
          `Interacciones: ${post.interactions}`,
          `Clics: ${post.clicks}`,
          `Engagement: ${formatPercent(
            percentage(post.interactions, post.reach),
          )}`,
          `CTR: ${formatPercent(percentage(post.clicks, post.impressions))}`,
          "",
        ].join("\n"),
      ),
      "ANÁLISIS",
      `Observación: ${data.observation}`,
      `Hipótesis: ${data.hypothesis}`,
      "",
      "REDISEÑO",
      `Publicación: ${selected.name}`,
      `Antes: ${data.before}`,
      `Después: ${data.after}`,
      `Cambios: ${data.changes}`,
      `KPI de evaluación: ${data.testKpi}`,
      `Enlace antes: ${data.beforeLink}`,
      `Enlace después: ${data.afterLink}`,
      "",
      "TRES RECOMENDACIONES",
      ...data.recommendations.map((item, index) => `${index + 1}. ${item}`),
      "",
      `Dashboard externo: ${data.dashboardLink}`,
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "semana12-analisis.txt";
    anchor.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportCSV() {
    const header = [
      "Publicacion",
      "Etapa",
      "Alcance",
      "Impresiones",
      "Interacciones",
      "Clics",
      "Engagement_pct",
      "CTR_pct",
    ];

    const rows = data.posts.map((post) => [
      post.name,
      post.stage,
      post.reach,
      post.impressions,
      post.interactions,
      post.clicks,
      percentage(post.interactions, post.reach).toFixed(2),
      percentage(post.clicks, post.impressions).toFixed(2),
    ]);

    const escapeCell = (value) => {
      const text = String(value ?? "");
      const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;

      return `"${safe.replace(/"/g, '""')}"`;
    };

    const csv = [header, ...rows]
      .map((row) => row.map(escapeCell).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "semana12-datos-simulados.csv";
    anchor.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="kpi12">
      <header className="kpi12-hero">
        <span>LABORATORIO 12 · 60 MINUTOS</span>
        <h2>Analiza, visualiza y mejora</h2>
        <p>
          Trabaja con datos simulados, construye tu dashboard y propone mejoras
          para tu campaña.
        </p>

        <div className="kpi12-progress">
          <strong>{completed}/6 etapas completadas</strong>
          <div>
            <span
              style={{
                width: `${(completed / 6) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="kpi12-simulation">
          DATOS SIMULADOS · NO SON RESULTADOS REALES
        </div>
      </header>

      <section className="kpi12-panel">
        <h3>Identificación de campaña</h3>

        <div className="kpi12-grid">
          <Field
            label="Equipo"
            value={data.team}
            onChange={(v) => setField("team", v)}
          />
          <Field
            label="Marca de café"
            value={data.brand}
            onChange={(v) => setField("brand", v)}
          />
        </div>

        <Field
          label="Nombre de campaña"
          value={data.campaign}
          onChange={(v) => setField("campaign", v)}
        />

        <Field
          label="Objetivo de campaña"
          value={data.goal}
          onChange={(v) => setField("goal", v)}
          multiline
        />
      </section>

      <Step index={0} done={data.done[0]} onDone={(v) => markDone(0, v)}>
        <p>
          Recupera el embudo TOFU, MOFU y BOFU de la Semana 11. Selecciona el
          KPI que mejor responde al objetivo de cada etapa.
        </p>

        <div className="kpi12-grid">
          {["TOFU", "MOFU", "BOFU"].map((stage) => (
            <label className="kpi12-field" key={stage}>
              <span>KPI principal · {stage}</span>
              <select
                value={data.kpis[stage]}
                onChange={(event) => setKpi(stage, event.target.value)}
              >
                {[
                  "Alcance",
                  "Impresiones",
                  "Visualizaciones",
                  "Interacciones",
                  "Guardados",
                  "Clics",
                  "Consultas",
                  "Conversiones",
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <p className="kpi12-note">
          Los datos disponibles en este ejercicio permiten calcular alcance,
          impresiones, interacciones y clics. Otros KPIs requerirían datos
          adicionales.
        </p>
      </Step>

      <Step index={1} done={data.done[1]} onDone={(v) => markDone(1, v)}>
        <p>
          Modifica los datos ficticios de las tres publicaciones. Los cálculos
          se actualizarán automáticamente.
        </p>

        <div className="kpi12-table-wrap">
          <table className="kpi12-table">
            <thead>
              <tr>
                <th>Publicación</th>
                <th>Alcance</th>
                <th>Impresiones</th>
                <th>Interacciones</th>
                <th>Clics</th>
                <th>Engagement</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map((post, index) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.name}</strong>
                    <small>{post.stage}</small>
                  </td>

                  {["reach", "impressions", "interactions", "clicks"].map(
                    (field) => (
                      <td key={field}>
                        <input
                          type="number"
                          min="0"
                          aria-label={`${post.name} ${field}`}
                          value={post[field]}
                          onChange={(event) =>
                            setPost(index, field, number(event.target.value))
                          }
                        />
                      </td>
                    ),
                  )}

                  <td>
                    {formatPercent(percentage(post.interactions, post.reach))}
                  </td>

                  <td>
                    {formatPercent(percentage(post.clicks, post.impressions))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="kpi12-formulas">
          <div>
            <strong>Engagement por alcance</strong>
            <p>(Interacciones ÷ Alcance) × 100</p>
          </div>

          <div>
            <strong>CTR por impresiones</strong>
            <p>(Clics ÷ Impresiones) × 100</p>
          </div>
        </div>

        <p className="kpi12-note">
          Para el ejercicio, los datos se consideran comparables. La suma de
          alcances no representa necesariamente personas únicas de toda la
          campaña, porque puede haber usuarios repetidos.
        </p>
      </Step>

      <Step index={2} done={data.done[2]} onDone={(v) => markDone(2, v)}>
        <p>
          Este dashboard se construye con los datos introducidos en la etapa
          anterior.
        </p>

        <div className="kpi12-dashboard">
          <div className="kpi12-dashboard-head">
            <div>
              <span>CAMPAÑA DE CAFÉ</span>
              <h3>{data.brand || "Dashboard de campaña"}</h3>
              <p>Fuente: datos simulados · Semana 12</p>
            </div>
            <strong>3 publicaciones</strong>
          </div>

          <div className="kpi12-cards">
            {[
              ["Alcance agregado", formatNumber(totals.reach)],
              ["Impresiones", formatNumber(totals.impressions)],
              ["Interacciones", formatNumber(totals.interactions)],
              ["Clics", formatNumber(totals.clicks)],
              ["Engagement", formatPercent(engagement)],
              ["CTR", formatPercent(ctr)],
            ].map(([label, value]) => (
              <div className="kpi12-card" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="kpi12-chart-grid">
            <BarChart
              title="Interacciones por publicación"
              posts={data.posts}
              field="interactions"
            />

            <BarChart
              title="CTR por publicación"
              posts={data.posts}
              getValue={(post) => percentage(post.clicks, post.impressions)}
              suffix="%"
            />
          </div>
        </div>

        <p className="kpi12-note">
          El panel muestra seis indicadores y dos gráficos. Para entregar una
          versión visual editable puedes reproducirlo en Excel, Google Sheets o
          Canva.
        </p>
      </Step>

      <Step index={3} done={data.done[3]} onDone={(v) => markDone(3, v)}>
        <p>
          Compara las tres publicaciones. Identifica cuál destaca según su
          objetivo y cuál podría mejorarse.
        </p>

        <div className="kpi12-comparison">
          {data.posts.map((post) => (
            <div className="kpi12-compare-card" key={post.id}>
              <span>{post.stage}</span>
              <h4>{post.name}</h4>
              <p>
                Engagement:{" "}
                <strong>
                  {formatPercent(percentage(post.interactions, post.reach))}
                </strong>
              </p>
              <p>
                CTR:{" "}
                <strong>
                  {formatPercent(percentage(post.clicks, post.impressions))}
                </strong>
              </p>
            </div>
          ))}
        </div>

        <Field
          label="Hallazgo principal"
          value={data.observation}
          onChange={(v) => setField("observation", v)}
          multiline
          placeholder="¿Qué publicación destaca y según qué KPI?"
        />

        <Field
          label="Hipótesis de mejora"
          value={data.hypothesis}
          onChange={(v) => setField("hypothesis", v)}
          multiline
          placeholder="Probaremos cambiar... para evaluar si..."
        />
      </Step>

      <Step index={4} done={data.done[4]} onDone={(v) => markDone(4, v)}>
        <p>
          Selecciona una publicación, describe su diseño original y documenta
          una versión mejorada en tu editor gráfico.
        </p>

        <label className="kpi12-field">
          <span>Publicación que vas a rediseñar</span>
          <select
            value={data.selectedPost}
            onChange={(event) =>
              setField("selectedPost", Number(event.target.value))
            }
          >
            {data.posts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.name}
              </option>
            ))}
          </select>
        </label>

        <div className="kpi12-grid">
          <div className="kpi12-before">
            <h4>ANTES</h4>
            <Field
              label="Descripción del diseño original"
              value={data.before}
              onChange={(v) => setField("before", v)}
              multiline
            />
            <Field
              label="Enlace a la pieza original"
              value={data.beforeLink}
              onChange={(v) => setField("beforeLink", v)}
            />
          </div>

          <div className="kpi12-after">
            <h4>DESPUÉS</h4>
            <Field
              label="Descripción del nuevo diseño"
              value={data.after}
              onChange={(v) => setField("after", v)}
              multiline
            />
            <Field
              label="Enlace al rediseño terminado"
              value={data.afterLink}
              onChange={(v) => setField("afterLink", v)}
            />
          </div>
        </div>

        <Field
          label="Cambios realizados y justificación"
          value={data.changes}
          onChange={(v) => setField("changes", v)}
          multiline
          placeholder="Mejoramos el contraste, el titular y el CTA porque..."
        />

        <Field
          label="KPI que usarías para evaluar el rediseño"
          value={data.testKpi}
          onChange={(v) => setField("testKpi", v)}
        />

        <p className="kpi12-note">
          El rediseño es una propuesta. Solo una evaluación posterior permitiría
          comprobar si mejora los resultados.
        </p>
      </Step>

      <Step index={5} done={data.done[5]} onDone={(v) => markDone(5, v)}>
        <p>
          Escribe tres recomendaciones fundamentadas y prepara la presentación
          del equipo.
        </p>

        {data.recommendations.map((item, index) => (
          <Field
            key={index}
            label={`Recomendación ${index + 1}`}
            value={item}
            onChange={(v) => setRecommendation(index, v)}
            multiline
          />
        ))}

        <Field
          label="Enlace al dashboard editable (opcional)"
          value={data.dashboardLink}
          onChange={(v) => setField("dashboardLink", v)}
        />

        <div className="kpi12-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Selección y cálculo de KPIs", 10],
            ["Dashboard: claridad y diseño", 15],
            ["Análisis de tres publicaciones", 10],
            ["Rediseño visual fundamentado", 10],
            ["Presentación y argumentación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points} pts.</strong>
            </div>
          ))}
        </div>
      </Step>

      <footer className="kpi12-footer">
        <div className="kpi12-summary">
          <strong>{completed}/6 etapas</strong>
          <strong>3 publicaciones analizadas</strong>
          <strong>2 gráficos dinámicos</strong>
        </div>

        <div className="kpi12-actions">
          <WorkshopDownloadButton
            studentName={studentName}
            lesson={{
              courseId: "contenido",
              number: 12,
              title: "KPIs, métricas y dashboards visuales",
            }}
            title="Laboratorio 12: Análisis y optimización de campaña"
            answers={{
              "Tipo de información": "DATOS SIMULADOS - EJERCICIO ACADÉMICO",

              Equipo: data.team,
              "Marca de café": data.brand,
              Campaña: data.campaign,
              "Objetivo de campaña": data.goal,

              "KPI principal TOFU": data.kpis.TOFU,
              "KPI principal MOFU": data.kpis.MOFU,
              "KPI principal BOFU": data.kpis.BOFU,

              "Alcance agregado": formatNumber(totals.reach),
              "Impresiones totales": formatNumber(totals.impressions),
              "Interacciones totales": formatNumber(totals.interactions),
              "Clics totales": formatNumber(totals.clicks),
              "Engagement agregado por alcance": formatPercent(engagement),
              "CTR agregado por impresiones": formatPercent(ctr),

              ...Object.fromEntries(
                data.posts.flatMap((post, index) => {
                  const prefix = `Publicación ${index + 1}`;

                  return [
                    [`${prefix} - Nombre`, post.name],
                    [`${prefix} - Etapa del embudo`, post.stage],
                    [`${prefix} - Alcance`, formatNumber(number(post.reach))],
                    [
                      `${prefix} - Impresiones`,
                      formatNumber(number(post.impressions)),
                    ],
                    [
                      `${prefix} - Interacciones`,
                      formatNumber(number(post.interactions)),
                    ],
                    [`${prefix} - Clics`, formatNumber(number(post.clicks))],
                    [
                      `${prefix} - Engagement`,
                      formatPercent(
                        percentage(
                          number(post.interactions),
                          number(post.reach),
                        ),
                      ),
                    ],
                    [
                      `${prefix} - CTR`,
                      formatPercent(
                        percentage(
                          number(post.clicks),
                          number(post.impressions),
                        ),
                      ),
                    ],
                  ];
                }),
              ),

              "Hallazgo principal": data.observation,
              "Hipótesis de mejora": data.hypothesis,

              "Publicación seleccionada para rediseño": selected.name,
              "Diseño original - Descripción": data.before,
              "Diseño original - Enlace": data.beforeLink,
              "Nuevo diseño - Descripción": data.after,
              "Nuevo diseño - Enlace": data.afterLink,
              "Cambios realizados y justificación": data.changes,
              "KPI para evaluar el rediseño": data.testKpi,

              ...Object.fromEntries(
                data.recommendations.map((item, index) => [
                  `Recomendación ${index + 1}`,
                  item,
                ]),
              ),

              "Enlace al dashboard editable": data.dashboardLink,

              ...Object.fromEntries(
                data.done.map((checked, index) => [
                  `Etapa ${index + 1} completada`,
                  checked ? "Sí" : "No",
                ]),
              ),

              "Progreso general": `${completed} de 6 etapas`,

              "Observación metodológica":
                "Los datos son simulados. El alcance agregado puede incluir " +
                "usuarios repetidos. Las propuestas de rediseño son hipótesis " +
                "que requieren evaluación posterior.",
            }}
          />

          <button
            type="button"
            className="kpi12-secondary-button"
            onClick={exportCSV}
          >
            Descargar datos CSV
          </button>
        </div>

        <p>{notice}</p>

        <p>
          Todos los resultados son simulados. Entrega en Moodle el informe PDF,
          los datos CSV y las comparativas visuales antes/después.
        </p>
      </footer>
    </div>
  );
}
