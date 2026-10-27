import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 11,
  title:
    "Publicidad multicanal, embudo de conversión y plan de medios digitales",
};

const STAGES = [
  {
    id: "awareness",
    name: "Reconocimiento",
    question: "¿Cómo descubre la marca?",
  },
  {
    id: "consideration",
    name: "Consideración",
    question: "¿Cómo compara alternativas?",
  },
  {
    id: "conversion",
    name: "Conversión",
    question: "¿Qué acción debe realizar?",
  },
];

const CHANNELS = [
  { id: "search", name: "Google Search" },
  { id: "meta", name: "Meta Ads (Facebook e Instagram)" },
  { id: "youtube", name: "YouTube Ads" },
];

const makeStage = () => ({
  need: "",
  question: "",
  channel: "",
  format: "",
  message: "",
  cta: "",
  kpi: "",
  reason: "",
});

const makeChannel = (amount) => ({
  amount: String(amount),
  stage: "",
  audience: "",
  format: "",
  justification: "",
  kpi: "",
});

const makeScene = (duration) => ({
  duration,
  visual: "",
  message: "",
  cta: "",
});

const makeWeek = () => ({
  objective: "",
  channels: "",
  activity: "",
  creative: "",
  kpi: "",
});

const makeData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  product: "",
  buyerPersona: "",
  buyerNeed: "",
  decision: "",
  stages: STAGES.map(makeStage),
  journeyConclusion: "",
  campaignName: "",
  campaignObjective: "",
  campaignAudience: "",
  channels: {
    search: makeChannel(150),
    meta: makeChannel(100),
    youtube: makeChannel(50),
  },
  staticChannel: "Instagram",
  staticStage: "Reconocimiento",
  staticHeadline: "",
  staticCopy: "",
  staticBenefit: "",
  staticCta: "",
  staticVisual: "",
  staticTool: "",
  staticReference: "",
  staticStatus: "",
  videoChannel: "YouTube Shorts",
  videoStage: "Consideración",
  videoObjective: "",
  scenes: [
    makeScene("0–3 s"),
    makeScene("3–7 s"),
    makeScene("7–11 s"),
    makeScene("11–15 s"),
  ],
  videoTool: "",
  videoReference: "",
  videoStatus: "",
  calendar: Array.from({ length: 4 }, makeWeek),
  measurement: [
    { metric: "", channel: "", method: "", target: "" },
    { metric: "", channel: "", method: "", target: "" },
    { metric: "", channel: "", method: "", target: "" },
  ],
  risks: "",
  conclusion: "",
});

function readData(key) {
  const base = makeData();
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      stages: base.stages.map((item, i) => ({
        ...item,
        ...(saved.stages?.[i] || {}),
      })),
      channels: Object.fromEntries(
        CHANNELS.map(({ id }) => [
          id,
          { ...base.channels[id], ...(saved.channels?.[id] || {}) },
        ]),
      ),
      scenes: base.scenes.map((item, i) => ({
        ...item,
        ...(saved.scenes?.[i] || {}),
      })),
      calendar: base.calendar.map((item, i) => ({
        ...item,
        ...(saved.calendar?.[i] || {}),
      })),
      measurement: base.measurement.map((item, i) => ({
        ...item,
        ...(saved.measurement?.[i] || {}),
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
    borderRadius: 18,
    padding: 22,
    fontFamily: "inherit",
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
  input: {
    width: "100%",
    minWidth: 0,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: 10,
    background: "#fff",
    color: "#111b35",
    font: "inherit",
    fontSize: 14,
    boxSizing: "border-box",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 12,
    fontSize: 13,
    fontWeight: 650,
  },
  note: { fontSize: 13, color: "#475569", lineHeight: 1.6 },
  success: { color: "#047857", fontWeight: 750, fontSize: 14 },
  warning: { color: "#b45309", fontWeight: 750, fontSize: 14 },
};

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
  options,
  placeholder = "",
  type = "text",
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
          type={type}
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function BudgetBar({ name, amount, total }) {
  const percentage =
    total > 0 && Number.isFinite(amount)
      ? Math.max(0, Math.min(100, (amount / total) * 100))
      : 0;

  return (
    <div style={{ margin: "12px 0" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        <strong style={{ fontSize: 13 }}>{name}</strong>
        <span style={{ fontSize: 13 }}>${amount.toFixed(2)}</span>
      </div>
      <div
        style={{
          height: 12,
          background: "#e2e8f0",
          borderRadius: 8,
          marginTop: 7,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            background: "#ee7544",
            borderRadius: 8,
            transition: "width .2s",
          }}
        />
      </div>
    </div>
  );
}

function StaticPreview({ data }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        aspectRatio: "1 / 1",
        margin: "16px auto",
        padding: 24,
        boxSizing: "border-box",
        background: "linear-gradient(135deg, #111b35, #28466c)",
        color: "#fff",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowWrap: "anywhere",
      }}
    >
      <span style={{ fontSize: 11, letterSpacing: 1 }}>
        PROPUESTA ACADÉMICA · NO OFICIAL
      </span>
      <div>
        <h3 style={{ color: "#fff", fontSize: 26, lineHeight: 1.2 }}>
          {data.staticHeadline || "Título de tu anuncio"}
        </h3>
        <p>{data.staticCopy || "Mensaje principal de la pieza."}</p>
        <p style={{ color: "#ffc29e", fontWeight: 700 }}>
          {data.staticBenefit || "Beneficio diferenciador"}
        </p>
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          background: "#ee7544",
          padding: "10px 16px",
          borderRadius: 8,
          fontWeight: 700,
        }}
      >
        {data.staticCta || "Conocer más"}
      </div>
    </div>
  );
}

export default function SeoWeek11Workshop({
  kind,
  slide,
  lessonId = "seo-semana-11",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;
  const key =
    `aula:seo:semana11:${lessonId}:` +
    String(studentName || "sin-nombre")
      .trim()
      .toLowerCase();

  const [stored, setStored] = useState(() => ({
    key,
    data: readData(key),
  }));

  const data = stored.key === key ? stored.data : readData(key);

  function update(transform) {
    const next = transform(data);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar la Semana 11:", error);
    }
    setStored({ key, data: next });
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

  const setChannel = (id, field, value) =>
    update((current) => ({
      ...current,
      channels: {
        ...current.channels,
        [id]: { ...current.channels[id], [field]: value },
      },
    }));

  if (
    activeKind !== "seo-multichannel-funnel" &&
    activeKind !== "seo-multichannel-media"
  ) {
    return null;
  }

  const amounts = CHANNELS.map(({ id }) => {
    const raw = data.channels[id].amount.trim();
    const amount = Number(raw);
    return {
      id,
      amount,
      valid: raw !== "" && Number.isFinite(amount) && amount >= 0,
    };
  });

  const budgetValid = amounts.every((item) => item.valid);
  const total = budgetValid
    ? amounts.reduce((sum, item) => sum + item.amount, 0)
    : NaN;
  const remaining = budgetValid ? 300 - total : NaN;
  const budgetComplete = budgetValid && Math.abs(remaining) < 0.001;

  const funnelAnswers = Object.fromEntries(
    data.stages.flatMap((stage, i) => {
      const name = STAGES[i].name;
      return [
        [`${name} - Necesidad`, stage.need],
        [`${name} - Pregunta`, stage.question],
        [`${name} - Canal`, stage.channel],
        [`${name} - Formato`, stage.format],
        [`${name} - Mensaje`, stage.message],
        [`${name} - CTA`, stage.cta],
        [`${name} - KPI`, stage.kpi],
        [`${name} - Justificación`, stage.reason],
      ];
    }),
  );

  const mediaAnswers = Object.fromEntries(
    CHANNELS.flatMap(({ id, name }) => {
      const channel = data.channels[id];
      return [
        [`${name} - Presupuesto`, channel.amount],
        [`${name} - Etapa`, channel.stage],
        [`${name} - Audiencia`, channel.audience],
        [`${name} - Formato`, channel.format],
        [`${name} - Justificación`, channel.justification],
        [`${name} - KPI`, channel.kpi],
      ];
    }),
  );

  return (
    <section style={styles.root}>
      <span style={{ color: "#ee7544", fontWeight: 800, fontSize: 12 }}>
        ANÁLISIS SEO · SEMANA 11
      </span>
      <h2>{slide?.title || "Estrategia publicitaria multicanal"}</h2>
      <p style={styles.note}>{slide?.instructions}</p>
      <p style={styles.success}>Guardado automático en este dispositivo.</p>

      <div style={styles.grid}>
        <Field
          label="Nombre del equipo"
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
        <Field
          label="Producto o servicio del proyecto"
          value={data.product}
          onChange={(v) => setRoot("product", v)}
        />
      </div>

      {activeKind === "seo-multichannel-funnel" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Define al cliente</h3>
            <Field
              label="Buyer persona principal"
              multiline
              value={data.buyerPersona}
              onChange={(v) => setRoot("buyerPersona", v)}
              placeholder="Perfil, necesidades y comportamiento de compra"
            />
            <Field
              label="Problema o necesidad principal"
              multiline
              value={data.buyerNeed}
              onChange={(v) => setRoot("buyerNeed", v)}
            />
            <Field
              label="¿Qué acción contará como conversión?"
              value={data.decision}
              onChange={(v) => setRoot("decision", v)}
              placeholder="Ejemplo: compra, reserva o solicitud"
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Construye el embudo</h3>
            <p style={styles.note}>
              En cada etapa explica qué necesita el cliente, qué anuncio verá y
              cómo evaluarías el resultado.
            </p>
          </div>

          {STAGES.map((stage, index) => {
            const item = data.stages[index];
            return (
              <div key={stage.id} style={styles.card}>
                <span style={{ color: "#ee7544", fontWeight: 800 }}>
                  ETAPA {index + 1}
                </span>
                <h3>{stage.name}</h3>
                <p style={styles.note}>{stage.question}</p>
                <div style={styles.grid}>
                  <Field
                    label="Necesidad del usuario"
                    value={item.need}
                    onChange={(v) => setItem("stages", index, "need", v)}
                  />
                  <Field
                    label="Pregunta que se hace"
                    value={item.question}
                    onChange={(v) => setItem("stages", index, "question", v)}
                  />
                  <Field
                    label="Canal propuesto"
                    value={item.channel}
                    options={["Google Search", "Meta Ads", "YouTube", "Otro"]}
                    onChange={(v) => setItem("stages", index, "channel", v)}
                  />
                  <Field
                    label="Formato publicitario"
                    value={item.format}
                    options={[
                      "Anuncio de búsqueda",
                      "Imagen",
                      "Video corto",
                      "Carrusel",
                      "Otro",
                    ]}
                    onChange={(v) => setItem("stages", index, "format", v)}
                  />
                  <Field
                    label="KPI"
                    value={item.kpi}
                    options={[
                      "Alcance",
                      "Impresiones",
                      "Visualizaciones",
                      "Clics",
                      "CTR",
                      "Conversiones",
                      "CPA",
                      "Otro",
                    ]}
                    onChange={(v) => setItem("stages", index, "kpi", v)}
                  />
                  <Field
                    label="CTA de la etapa"
                    value={item.cta}
                    onChange={(v) => setItem("stages", index, "cta", v)}
                  />
                </div>
                <Field
                  label="Mensaje publicitario"
                  multiline
                  value={item.message}
                  onChange={(v) => setItem("stages", index, "message", v)}
                />
                <Field
                  label="¿Por qué elegiste este canal y mensaje?"
                  multiline
                  value={item.reason}
                  onChange={(v) => setItem("stages", index, "reason", v)}
                />
              </div>
            );
          })}

          <div style={styles.card}>
            <h3>Paso 3. Mapa del recorrido del cliente</h3>
            <div style={styles.grid}>
              {STAGES.map((stage, index) => {
                const item = data.stages[index];
                return (
                  <div
                    key={stage.id}
                    style={{
                      border: "1px solid #dbe3ee",
                      borderTop: "5px solid #ee7544",
                      borderRadius: 12,
                      padding: 14,
                      background: "#fff",
                      overflowWrap: "anywhere",
                    }}
                  >
                    <strong>{stage.name}</strong>
                    <p style={styles.note}>
                      {item.need || "Necesidad pendiente"}
                    </p>
                    <p>
                      <strong>Canal:</strong> {item.channel || "Pendiente"}
                    </p>
                    <p>
                      <strong>Mensaje:</strong> {item.message || "Pendiente"}
                    </p>
                    <p>
                      <strong>KPI:</strong> {item.kpi || "Pendiente"}
                    </p>
                  </div>
                );
              })}
            </div>
            <Field
              label="Conclusión del recorrido"
              multiline
              value={data.journeyConclusion}
              onChange={(v) => setRoot("journeyConclusion", v)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Embudo publicitario multicanal"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              Producto: data.product,
              "Buyer persona": data.buyerPersona,
              Necesidad: data.buyerNeed,
              Conversión: data.decision,
              ...funnelAnswers,
              Conclusión: data.journeyConclusion,
              Nota: "Propuesta académica no oficial.",
            }}
          />
        </>
      )}

      {activeKind === "seo-multichannel-media" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Define la campaña</h3>
            <div style={styles.grid}>
              <Field
                label="Nombre de la campaña"
                value={data.campaignName}
                onChange={(v) => setRoot("campaignName", v)}
              />
              <Field
                label="Objetivo general"
                value={data.campaignObjective}
                options={[
                  "Reconocimiento",
                  "Consideración",
                  "Conversiones",
                  "Generación de contactos",
                ]}
                onChange={(v) => setRoot("campaignObjective", v)}
              />
            </div>
            <Field
              label="Audiencia principal"
              multiline
              value={data.campaignAudience}
              onChange={(v) => setRoot("campaignAudience", v)}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Simulador de presupuesto</h3>
            <p style={styles.note}>
              Dispones de $300 para 30 días. Puedes asignar $0 a un canal si
              explicas por qué no lo utilizarías.
            </p>

            {CHANNELS.map(({ id, name }) => {
              const item = data.channels[id];
              return (
                <div key={id} style={{ ...styles.card, margin: "12px 0" }}>
                  <h4>{name}</h4>
                  <div style={styles.grid}>
                    <Field
                      label="Inversión en USD"
                      type="number"
                      value={item.amount}
                      onChange={(v) => setChannel(id, "amount", v)}
                    />
                    <Field
                      label="Etapa principal"
                      value={item.stage}
                      options={[
                        "Reconocimiento",
                        "Consideración",
                        "Conversión",
                        "Varias etapas",
                        "No utilizar",
                      ]}
                      onChange={(v) => setChannel(id, "stage", v)}
                    />
                    <Field
                      label="Formato"
                      value={item.format}
                      options={[
                        "Anuncio de búsqueda",
                        "Imagen",
                        "Video",
                        "Carrusel",
                        "No aplica",
                      ]}
                      onChange={(v) => setChannel(id, "format", v)}
                    />
                    <Field
                      label="KPI"
                      value={item.kpi}
                      options={[
                        "Alcance",
                        "Visualizaciones",
                        "Clics",
                        "CTR",
                        "Conversiones",
                        "CPA",
                        "No aplica",
                      ]}
                      onChange={(v) => setChannel(id, "kpi", v)}
                    />
                  </div>
                  <Field
                    label="Público de este canal"
                    value={item.audience}
                    onChange={(v) => setChannel(id, "audience", v)}
                  />
                  <Field
                    label="Justificación de la inversión"
                    multiline
                    value={item.justification}
                    onChange={(v) => setChannel(id, "justification", v)}
                  />
                </div>
              );
            })}

            {budgetValid ? (
              <>
                {CHANNELS.map(({ id, name }, index) => (
                  <BudgetBar
                    key={id}
                    name={name}
                    amount={amounts[index].amount}
                    total={300}
                  />
                ))}
                <h3>Asignado: ${total.toFixed(2)} / $300.00</h3>
                <p style={budgetComplete ? styles.success : styles.warning}>
                  {budgetComplete
                    ? "Presupuesto correctamente distribuido."
                    : remaining > 0
                      ? `Faltan asignar $${remaining.toFixed(2)}.`
                      : `Superaste el presupuesto en $${Math.abs(remaining).toFixed(2)}.`}
                </p>
              </>
            ) : (
              <p style={styles.warning}>
                Ingresa montos numéricos válidos, mayores o iguales a cero.
              </p>
            )}
            <p style={styles.note}>
              Esta simulación no estima resultados reales ni crea campañas.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Paso 3. Pieza publicitaria estática</h3>
            <p style={styles.note}>
              Diseña una pieza de 1080 × 1080 px en Canva o una herramienta
              gratuita. Documenta el mensaje y adjunta el archivo en Moodle.
            </p>
            <div style={styles.grid}>
              <Field
                label="Plataforma"
                value={data.staticChannel}
                options={["Instagram", "Facebook"]}
                onChange={(v) => setRoot("staticChannel", v)}
              />
              <Field
                label="Etapa del embudo"
                value={data.staticStage}
                options={["Reconocimiento", "Consideración", "Conversión"]}
                onChange={(v) => setRoot("staticStage", v)}
              />
              <Field
                label="Título de la pieza"
                value={data.staticHeadline}
                onChange={(v) => setRoot("staticHeadline", v)}
              />
              <Field
                label="CTA"
                value={data.staticCta}
                onChange={(v) => setRoot("staticCta", v)}
              />
            </div>
            <Field
              label="Copy publicitario"
              multiline
              value={data.staticCopy}
              onChange={(v) => setRoot("staticCopy", v)}
            />
            <Field
              label="Beneficio principal"
              value={data.staticBenefit}
              onChange={(v) => setRoot("staticBenefit", v)}
            />
            <Field
              label="Composición visual propuesta"
              multiline
              value={data.staticVisual}
              onChange={(v) => setRoot("staticVisual", v)}
              placeholder="Producto, imagen, colores, jerarquía y ubicación del CTA"
            />
            <StaticPreview data={data} />
            <div style={styles.grid}>
              <Field
                label="Herramienta utilizada"
                value={data.staticTool}
                options={["Canva", "Figma", "Google Slides", "Otra gratuita"]}
                onChange={(v) => setRoot("staticTool", v)}
              />
              <Field
                label="Estado"
                value={data.staticStatus}
                options={[
                  "En preparación",
                  "Terminada",
                  "Pendiente de revisión",
                ]}
                onChange={(v) => setRoot("staticStatus", v)}
              />
            </div>
            <Field
              label="Enlace o nombre del archivo visual"
              value={data.staticReference}
              onChange={(v) => setRoot("staticReference", v)}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 4. Storyboard de video vertical</h3>
            <p style={styles.note}>
              Crea cuatro escenas para un video de 15 segundos, formato vertical
              1080 × 1920 px. No es obligatorio producir el video.
            </p>
            <div style={styles.grid}>
              <Field
                label="Canal"
                value={data.videoChannel}
                options={[
                  "YouTube Shorts",
                  "Instagram Reels",
                  "Facebook Reels",
                  "Stories",
                ]}
                onChange={(v) => setRoot("videoChannel", v)}
              />
              <Field
                label="Etapa"
                value={data.videoStage}
                options={["Reconocimiento", "Consideración", "Conversión"]}
                onChange={(v) => setRoot("videoStage", v)}
              />
            </div>
            <Field
              label="Objetivo del video"
              value={data.videoObjective}
              onChange={(v) => setRoot("videoObjective", v)}
            />

            {data.scenes.map((scene, index) => (
              <div key={index} style={{ ...styles.card, margin: "12px 0" }}>
                <h4>
                  Escena {index + 1} · {scene.duration}
                </h4>
                <Field
                  label="Acción visual"
                  multiline
                  value={scene.visual}
                  onChange={(v) => setItem("scenes", index, "visual", v)}
                />
                <Field
                  label="Mensaje o narración"
                  multiline
                  value={scene.message}
                  onChange={(v) => setItem("scenes", index, "message", v)}
                />
                <Field
                  label="CTA, si corresponde"
                  value={scene.cta}
                  onChange={(v) => setItem("scenes", index, "cta", v)}
                />
              </div>
            ))}

            <div style={styles.grid}>
              <Field
                label="Herramienta del storyboard"
                value={data.videoTool}
                options={["Canva", "Figma", "Google Slides", "Otra gratuita"]}
                onChange={(v) => setRoot("videoTool", v)}
              />
              <Field
                label="Estado"
                value={data.videoStatus}
                options={[
                  "En preparación",
                  "Terminado",
                  "Pendiente de revisión",
                ]}
                onChange={(v) => setRoot("videoStatus", v)}
              />
            </div>
            <Field
              label="Enlace o nombre del archivo del storyboard"
              value={data.videoReference}
              onChange={(v) => setRoot("videoReference", v)}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 5. Calendario de cuatro semanas</h3>
            <p style={styles.note}>
              Organiza las actividades dentro de los 30 días de la campaña.
            </p>
            {data.calendar.map((week, index) => (
              <div key={index} style={{ ...styles.card, margin: "12px 0" }}>
                <h4>
                  Semana {index + 1} ·{" "}
                  {["Días 1–7", "Días 8–14", "Días 15–21", "Días 22–30"][index]}
                </h4>
                <div style={styles.grid}>
                  <Field
                    label="Objetivo"
                    value={week.objective}
                    onChange={(v) => setItem("calendar", index, "objective", v)}
                  />
                  <Field
                    label="Canales"
                    value={week.channels}
                    onChange={(v) => setItem("calendar", index, "channels", v)}
                  />
                  <Field
                    label="Pieza o recurso"
                    value={week.creative}
                    onChange={(v) => setItem("calendar", index, "creative", v)}
                  />
                  <Field
                    label="KPI de seguimiento"
                    value={week.kpi}
                    onChange={(v) => setItem("calendar", index, "kpi", v)}
                  />
                </div>
                <Field
                  label="Actividad prevista"
                  multiline
                  value={week.activity}
                  onChange={(v) => setItem("calendar", index, "activity", v)}
                />
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <h3>Paso 6. Matriz de medición</h3>
            <p style={styles.note}>
              Define al menos tres indicadores y cómo se medirían si la empresa
              autorizara ejecutar la campaña.
            </p>
            {data.measurement.map((item, index) => (
              <div key={index} style={{ ...styles.card, margin: "12px 0" }}>
                <h4>KPI {index + 1}</h4>
                <div style={styles.grid}>
                  <Field
                    label="Indicador"
                    value={item.metric}
                    options={[
                      "Alcance",
                      "Impresiones",
                      "Visualizaciones",
                      "CTR",
                      "CPC",
                      "Conversiones",
                      "CPA",
                      "ROAS",
                      "Otro",
                    ]}
                    onChange={(v) => setItem("measurement", index, "metric", v)}
                  />
                  <Field
                    label="Canal"
                    value={item.channel}
                    options={["Google Search", "Meta Ads", "YouTube", "Todos"]}
                    onChange={(v) =>
                      setItem("measurement", index, "channel", v)
                    }
                  />
                  <Field
                    label="Meta hipotética"
                    value={item.target}
                    onChange={(v) => setItem("measurement", index, "target", v)}
                  />
                </div>
                <Field
                  label="Cómo se mediría"
                  multiline
                  value={item.method}
                  onChange={(v) => setItem("measurement", index, "method", v)}
                />
              </div>
            ))}

            <Field
              label="Riesgos o limitaciones"
              multiline
              value={data.risks}
              onChange={(v) => setRoot("risks", v)}
            />
            <Field
              label="Conclusión ejecutiva"
              multiline
              value={data.conclusion}
              onChange={(v) => setRoot("conclusion", v)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Plan de medios y producción publicitaria"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Producto: data.product,
              Campaña: data.campaignName,
              Objetivo: data.campaignObjective,
              Audiencia: data.campaignAudience,
              ...mediaAnswers,
              "Presupuesto asignado": budgetValid
                ? `$${total.toFixed(2)}`
                : "Inválido",
              "Presupuesto completo": budgetComplete ? "Sí" : "No",
              "Pieza estática - Canal": data.staticChannel,
              "Pieza estática - Etapa": data.staticStage,
              "Pieza estática - Título": data.staticHeadline,
              "Pieza estática - Copy": data.staticCopy,
              "Pieza estática - Beneficio": data.staticBenefit,
              "Pieza estática - CTA": data.staticCta,
              "Pieza estática - Diseño": data.staticVisual,
              "Pieza estática - Herramienta": data.staticTool,
              "Pieza estática - Archivo": data.staticReference,
              "Pieza estática - Estado": data.staticStatus,
              "Video - Canal": data.videoChannel,
              "Video - Etapa": data.videoStage,
              "Video - Objetivo": data.videoObjective,
              ...Object.fromEntries(
                data.scenes.flatMap((scene, index) => [
                  [`Escena ${index + 1} - Tiempo`, scene.duration],
                  [`Escena ${index + 1} - Visual`, scene.visual],
                  [`Escena ${index + 1} - Mensaje`, scene.message],
                  [`Escena ${index + 1} - CTA`, scene.cta],
                ]),
              ),
              "Storyboard - Herramienta": data.videoTool,
              "Storyboard - Archivo": data.videoReference,
              "Storyboard - Estado": data.videoStatus,
              ...Object.fromEntries(
                data.calendar.flatMap((week, index) => [
                  [`Semana ${index + 1} - Objetivo`, week.objective],
                  [`Semana ${index + 1} - Canales`, week.channels],
                  [`Semana ${index + 1} - Actividad`, week.activity],
                  [`Semana ${index + 1} - Pieza`, week.creative],
                  [`Semana ${index + 1} - KPI`, week.kpi],
                ]),
              ),
              ...Object.fromEntries(
                data.measurement.flatMap((item, index) => [
                  [`KPI ${index + 1} - Indicador`, item.metric],
                  [`KPI ${index + 1} - Canal`, item.channel],
                  [`KPI ${index + 1} - Medición`, item.method],
                  [`KPI ${index + 1} - Meta`, item.target],
                ]),
              ),
              Riesgos: data.risks,
              Conclusión: data.conclusion,
              Nota: "Propuesta académica simulada. Los archivos visuales deben adjuntarse por separado en Moodle.",
            }}
          />
        </>
      )}
    </section>
  );
}
