import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 16,
  title: "Google Search Console y dashboards con Looker Studio",
};

const GSC_CHECKS = [
  "La web académica abre mediante HTTPS",
  "La propiedad de prefijo de URL fue creada",
  "La propiedad fue verificada",
  "Se inspeccionó la URL principal",
  "Se identificó la directiva noindex",
  "El sitemap.xml fue publicado",
  "Se registró el sitemap en Search Console",
  "Se documentó el estado de indexación",
];

const DASH_CHECKS = [
  "El informe de Looker Studio fue creado",
  "La fuente de datos fue identificada",
  "Se revisaron usuarios y sesiones",
  "Se revisó el total de eventos",
  "Se creó el gráfico de eventos por nombre",
  "Se revisaron los eventos clave o su ausencia",
  "Se indicó el período de análisis",
  "Se documentaron las limitaciones",
];

const emptyData = () => ({
  team: "",
  website: "",
  repository: "",
  property: "",
  verificationMethod: "Etiqueta HTML",
  verificationStatus: "",
  inspectionStatus: "",
  noindex: "",
  allowIndexing: "",
  hypotheses: ["", "", ""],
  gscEvidence: "",
  sitemapUrl: "",
  sitemapStatus: "",
  technicalDiagnosis: "",
  gscChecks: Array(GSC_CHECKS.length).fill(false),

  dashboardName: "",
  dashboardUrl: "",
  sourceType: "",
  ga4Property: "",
  dateRange: "",
  users: "",
  sessions: "",
  events: "",
  keyEvents: "",
  chartDetails: "",
  dashboardEvidence: "",
  conclusions: ["", "", ""],
  limitations: "",
  improvements: "",
  dashboardChecks: Array(DASH_CHECKS.length).fill(false),
});

function readData(key) {
  const base = emptyData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      hypotheses: base.hypotheses.map(
        (item, i) => saved.hypotheses?.[i] ?? item,
      ),
      conclusions: base.conclusions.map(
        (item, i) => saved.conclusions?.[i] ?? item,
      ),
      gscChecks: base.gscChecks.map((item, i) =>
        Boolean(saved.gscChecks?.[i] ?? item),
      ),
      dashboardChecks: base.dashboardChecks.map((item, i) =>
        Boolean(saved.dashboardChecks?.[i] ?? item),
      ),
    };
  } catch {
    return base;
  }
}

const css = {
  root: {
    padding: 22,
    background: "#f8fafc",
    color: "#111b35",
    borderRadius: 16,
  },
  card: {
    padding: 18,
    background: "#ffffff",
    border: "1px solid #dbe3ee",
    borderRadius: 12,
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 13,
  },
  input: {
    padding: 10,
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "#fff",
    color: "#111b35",
    font: "inherit",
  },
  note: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.6,
  },
  button: {
    padding: "12px 18px",
    background: "#ee7544",
    color: "#fff",
    border: 0,
    borderRadius: 9,
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
          rows={3}
          style={css.input}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          style={css.input}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Checklist({ items, values, onChange }) {
  return (
    <>
      {items.map((label, index) => (
        <label
          key={label}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 11,
            fontSize: 14,
          }}
        >
          <input
            type="checkbox"
            checked={values[index]}
            onChange={(event) => onChange(index, event.target.checked)}
          />
          <span>{label}</span>
        </label>
      ))}

      <p style={css.note}>
        Progreso: {values.filter(Boolean).length}/{items.length}
      </p>
    </>
  );
}

function normalizeUrl(raw) {
  try {
    const url = new URL(raw.trim());

    if (url.protocol !== "https:") return null;
    if (!url.hostname) return null;

    url.search = "";
    url.hash = "";

    if (!url.pathname.endsWith("/")) {
      url.pathname += "/";
    }

    return url.toString();
  } catch {
    return null;
  }
}

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createSitemap(url) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${xmlEscape(url)}</loc>
  </url>
</urlset>`;
}

function downloadSitemap(content) {
  const blob = new Blob([content], {
    type: "application/xml;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = "sitemap.xml";

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function diagnose(data) {
  if (data.noindex === "Sí") {
    return (
      "La web conserva la directiva noindex. " +
      "Puede verificarse en Search Console, pero no debe " +
      "solicitarse su indexación mientras esa directiva continúe."
    );
  }

  if (data.inspectionStatus === "Indexada") {
    return (
      "Search Console reporta que la URL está indexada. " +
      "Esto no garantiza que aparezca para todas las consultas."
    );
  }

  if (data.inspectionStatus === "No indexada") {
    return (
      "Search Console reporta que la URL no está indexada. " +
      "Debes revisar los motivos indicados por la herramienta. " +
      "Quitar noindex no garantiza su inclusión."
    );
  }

  return (
    "El estado de indexación aún debe comprobarse. " +
    "Una página publicada y accesible no necesariamente " +
    "ha sido rastreada o indexada."
  );
}

export default function SeoWeek16Workshop({
  kind,
  slide,
  lessonId = "seo-semana-16",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana16:${lessonId}:` +
    String(studentName || "sin-nombre")
      .trim()
      .toLowerCase();

  const [stored, setStored] = useState(() => ({
    key: storageKey,
    data: readData(storageKey),
  }));

  const data = stored.key === storageKey ? stored.data : readData(storageKey);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar Semana 16:", error);
    }

    setStored({
      key: storageKey,
      data: next,
    });
  }

  const setRoot = (field, value) =>
    update((current) => ({ ...current, [field]: value }));

  const setArray = (field, index, value) =>
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) => (i === index ? value : item)),
    }));

  if (activeKind !== "seo16-gsc-lab" && activeKind !== "seo16-dashboard-lab") {
    return null;
  }

  const siteUrl = normalizeUrl(data.website);
  const sitemap = siteUrl ? createSitemap(siteUrl) : "";

  const expectedSitemap = siteUrl ? `${siteUrl}sitemap.xml` : "";

  const gscAnswers = Object.fromEntries(
    GSC_CHECKS.map((item, i) => [
      item,
      data.gscChecks[i] ? "Comprobado" : "Pendiente",
    ]),
  );

  const dashboardAnswers = Object.fromEntries(
    DASH_CHECKS.map((item, i) => [
      item,
      data.dashboardChecks[i] ? "Comprobado" : "Pendiente",
    ]),
  );

  return (
    <section style={css.root}>
      <span style={{ color: "#ee7544", fontWeight: 800 }}>
        ANÁLISIS SEO · SEMANA 16
      </span>

      <h2>{slide?.title || "Laboratorio Semana 16"}</h2>
      <p style={css.note}>{slide?.instructions}</p>

      <p style={{ color: "#047857", fontSize: 13 }}>
        Guardado automático en este dispositivo.
      </p>

      <div style={css.card}>
        <h3>Datos del equipo</h3>

        <div style={css.grid}>
          <Field
            label="Nombre del equipo"
            value={data.team}
            onChange={(v) => setRoot("team", v)}
          />
          <Field
            label="URL de la web académica"
            value={data.website}
            placeholder="https://usuario.github.io/proyecto/"
            onChange={(v) => setRoot("website", v)}
          />
          <Field
            label="URL del repositorio"
            value={data.repository}
            onChange={(v) => setRoot("repository", v)}
          />
        </div>

        <p style={css.note}>
          Registra la URL de inicio que realmente carga tu web, no una ruta
          inventada.
        </p>
      </div>

      {activeKind === "seo16-gsc-lab" && (
        <>
          <div style={css.card}>
            <h3>Parte 1. Verificar Search Console</h3>

            <ol>
              <li>
                Ingresa a{" "}
                <a
                  href="https://search.google.com/search-console/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Search Console
                </a>
                .
              </li>
              <li>Selecciona Añadir propiedad.</li>
              <li>Elige Prefijo de URL.</li>
              <li>Introduce la URL completa de GitHub Pages.</li>
              <li>Selecciona un método de verificación disponible.</li>
              <li>
                Si utilizas etiqueta HTML, copia la etiqueta que Google te
                proporciona en el head de index.html.
              </li>
              <li>Publica los cambios y pulsa Verificar.</li>
              <li>Mantén la etiqueta en la página.</li>
            </ol>

            <p style={css.note}>
              También puedes utilizar una verificación válida que ya esté
              disponible mediante GA4 o GTM, siempre que se cumplan sus
              requisitos.
            </p>

            <div style={css.grid}>
              <Field
                label="Propiedad de Search Console"
                value={data.property}
                onChange={(v) => setRoot("property", v)}
              />
              <Field
                label="Método de verificación"
                value={data.verificationMethod}
                options={[
                  "Etiqueta HTML",
                  "Google Analytics",
                  "Google Tag Manager",
                  "Otro método disponible",
                ]}
                onChange={(v) => setRoot("verificationMethod", v)}
              />
              <Field
                label="Estado de verificación"
                value={data.verificationStatus}
                options={["Verificada", "Pendiente", "Error de verificación"]}
                onChange={(v) => setRoot("verificationStatus", v)}
              />
            </div>

            <div style={css.card}>
              <h4>Ejemplo: ubicación de la etiqueta HTML</h4>

              <pre
                style={{
                  padding: 14,
                  borderRadius: 9,
                  background: "#111b35",
                  color: "#fff",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {`<head>
  <meta charset="UTF-8">

  <!-- Pegar etiqueta REAL de Search Console -->
  <meta name="google-site-verification"
        content="CODIGO_REAL_DE_GOOGLE">

  <title>Mi web académica</title>
</head>`}
              </pre>

              <p style={css.note}>
                El ejemplo muestra únicamente la ubicación de la etiqueta. No
                reemplaces tu index.html completo y no utilices el código de
                ejemplo para intentar verificar la propiedad.
              </p>
            </div>
          </div>

          <div style={css.card}>
            <h3>Parte 2. Diagnóstico de indexación</h3>

            <p>
              Abre Inspección de URL en Search Console y registra el estado
              realmente observado.
            </p>

            <div style={css.grid}>
              <Field
                label="Estado observado"
                value={data.inspectionStatus}
                options={[
                  "Indexada",
                  "No indexada",
                  "Sin datos suficientes",
                  "Todavía no inspeccionada",
                ]}
                onChange={(v) => setRoot("inspectionStatus", v)}
              />

              <Field
                label="¿La página conserva noindex?"
                value={data.noindex}
                options={["Sí", "No", "No comprobado"]}
                onChange={(v) => setRoot("noindex", v)}
              />

              <Field
                label="Decisión sobre indexación"
                value={data.allowIndexing}
                options={[
                  "Mantener noindex",
                  "Permitir posible indexación",
                  "Decisión pendiente",
                ]}
                onChange={(v) => setRoot("allowIndexing", v)}
              />
            </div>

            <p>
              <strong>Diagnóstico orientativo:</strong>
            </p>
            <p style={css.note}>{diagnose(data)}</p>

            <p style={css.note}>
              Si decides retirar noindex, hazlo únicamente en la web ficticia
              del equipo, con autorización de sus integrantes. Después vuelve a
              publicar y comprueba la directiva efectiva.
            </p>
          </div>

          <div style={css.card}>
            <h3>Parte 3. Generar sitemap.xml</h3>

            <p style={css.note}>
              Este generador crea un sitemap de una página. La URL indicada debe
              ser la dirección pública canónica de tu sitio académico.
            </p>

            {siteUrl ? (
              <>
                <pre
                  style={{
                    padding: 14,
                    background: "#111b35",
                    color: "#fff",
                    borderRadius: 9,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "anywhere",
                  }}
                >
                  {sitemap}
                </pre>

                <button
                  type="button"
                  style={css.button}
                  onClick={() => downloadSitemap(sitemap)}
                >
                  Descargar sitemap.xml
                </button>

                <p style={css.note}>
                  Sube el archivo a la raíz del repositorio y comprueba que se
                  puede abrir en:
                </p>

                <p style={{ overflowWrap: "anywhere" }}>
                  <strong>{expectedSitemap}</strong>
                </p>

                <p style={css.note}>
                  Después regístralo en Sitemaps dentro de Search Console. Si
                  mantienes noindex, el sitemap no anula esa directiva.
                </p>
              </>
            ) : (
              <p style={{ color: "#b45309" }}>
                Registra primero la URL HTTPS real de tu web académica.
              </p>
            )}

            <Field
              label="URL del sitemap publicado"
              value={data.sitemapUrl}
              placeholder={expectedSitemap || "https://.../sitemap.xml"}
              onChange={(v) => setRoot("sitemapUrl", v)}
            />

            <Field
              label="Resultado observado en Sitemaps"
              value={data.sitemapStatus}
              options={[
                "Procesado",
                "En espera",
                "Error",
                "Pendiente de envío",
              ]}
              onChange={(v) => setRoot("sitemapStatus", v)}
            />
          </div>

          <div style={css.card}>
            <h3>Parte 4. Hipótesis y evidencias</h3>

            {data.hypotheses.map((value, i) => (
              <Field
                key={i}
                label={`Hipótesis ${i + 1} sobre la indexación`}
                value={value}
                multiline
                onChange={(v) => setArray("hypotheses", i, v)}
              />
            ))}

            <Field
              label="Evidencias de Search Console"
              multiline
              value={data.gscEvidence}
              onChange={(v) => setRoot("gscEvidence", v)}
            />

            <Field
              label="Diagnóstico técnico final"
              multiline
              value={data.technicalDiagnosis}
              onChange={(v) => setRoot("technicalDiagnosis", v)}
            />

            <Checklist
              items={GSC_CHECKS}
              values={data.gscChecks}
              onChange={(i, v) => setArray("gscChecks", i, v)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Search Console e indexación"
            answers={{
              Equipo: data.team,
              "Web académica": data.website,
              Repositorio: data.repository,
              Propiedad: data.property,
              "Método de verificación": data.verificationMethod,
              "Estado de verificación": data.verificationStatus,
              "Estado de indexación": data.inspectionStatus,
              "Directiva noindex": data.noindex,
              "Decisión del equipo": data.allowIndexing,
              "URL del sitemap": data.sitemapUrl,
              "Estado del sitemap": data.sitemapStatus,
              "Hipótesis 1": data.hypotheses[0],
              "Hipótesis 2": data.hypotheses[1],
              "Hipótesis 3": data.hypotheses[2],
              "Diagnóstico orientativo": diagnose(data),
              "Diagnóstico técnico": data.technicalDiagnosis,
              Evidencias: data.gscEvidence,
              ...gscAnswers,
              Nota: "No se exige indexación, impresiones ni clics orgánicos.",
            }}
          />
        </>
      )}

      {activeKind === "seo16-dashboard-lab" && (
        <>
          <div style={css.card}>
            <h3>Parte 1. Identifica la fuente del dashboard</h3>

            <div style={css.grid}>
              <Field
                label="Nombre del informe"
                value={data.dashboardName}
                onChange={(v) => setRoot("dashboardName", v)}
              />

              <Field
                label="Tipo de fuente"
                value={data.sourceType}
                options={[
                  "GA4 - Datos reales de prueba",
                  "Google Sheets - Datos simulados",
                ]}
                onChange={(v) => setRoot("sourceType", v)}
              />

              <Field
                label="Nombre de la propiedad GA4"
                value={data.ga4Property}
                onChange={(v) => setRoot("ga4Property", v)}
              />

              <Field
                label="Período de análisis"
                value={data.dateRange}
                placeholder="Ejemplo: últimos 7 días"
                onChange={(v) => setRoot("dateRange", v)}
              />
            </div>

            <Field
              label="URL del informe de Looker Studio"
              value={data.dashboardUrl}
              placeholder="https://lookerstudio.google.com/reporting/..."
              onChange={(v) => setRoot("dashboardUrl", v)}
            />

            {data.dashboardUrl.startsWith("https://") && (
              <p>
                <a
                  href={data.dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir dashboard registrado
                </a>
              </p>
            )}

            <p style={css.note}>
              Comparte el informe solo con los permisos necesarios para la
              evaluación. Revisa las credenciales de acceso a la fuente.
            </p>
          </div>

          <div style={css.card}>
            <h3>Parte 2. Registra los indicadores</h3>

            <p style={css.note}>
              Escribe los valores efectivamente observados. Si una métrica no
              está disponible, coloca "No disponible". No conviertas datos
              ficticios en resultados reales.
            </p>

            <div style={css.grid}>
              <Field
                label="Usuarios"
                value={data.users}
                onChange={(v) => setRoot("users", v)}
              />
              <Field
                label="Sesiones"
                value={data.sessions}
                onChange={(v) => setRoot("sessions", v)}
              />
              <Field
                label="Eventos"
                value={data.events}
                onChange={(v) => setRoot("events", v)}
              />
              <Field
                label="Eventos clave"
                value={data.keyEvents}
                onChange={(v) => setRoot("keyEvents", v)}
              />
            </div>

            <Field
              label="Descripción de las visualizaciones"
              multiline
              value={data.chartDetails}
              onChange={(v) => setRoot("chartDetails", v)}
            />
          </div>

          <div style={css.card}>
            <h3>Parte 3. Tres conclusiones</h3>

            {data.conclusions.map((value, i) => (
              <Field
                key={i}
                label={`Conclusión ${i + 1}`}
                multiline
                value={value}
                onChange={(v) => setArray("conclusions", i, v)}
              />
            ))}

            <Field
              label="Limitaciones de los datos"
              multiline
              value={data.limitations}
              onChange={(v) => setRoot("limitations", v)}
            />

            <Field
              label="Recomendaciones de medición"
              multiline
              value={data.improvements}
              onChange={(v) => setRoot("improvements", v)}
            />
          </div>

          <div style={css.card}>
            <h3>Parte 4. Evidencias y checklist</h3>

            <Field
              label="Capturas y referencias"
              multiline
              value={data.dashboardEvidence}
              onChange={(v) => setRoot("dashboardEvidence", v)}
            />

            <Checklist
              items={DASH_CHECKS}
              values={data.dashboardChecks}
              onChange={(i, v) => setArray("dashboardChecks", i, v)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Dashboard con Looker Studio"
            answers={{
              Equipo: data.team,
              "Web académica": data.website,
              "Nombre del dashboard": data.dashboardName,
              "URL del informe": data.dashboardUrl,
              Fuente: data.sourceType,
              "Propiedad GA4": data.ga4Property,
              Período: data.dateRange,
              Usuarios: data.users,
              Sesiones: data.sessions,
              Eventos: data.events,
              "Eventos clave": data.keyEvents,
              Visualizaciones: data.chartDetails,
              "Conclusión 1": data.conclusions[0],
              "Conclusión 2": data.conclusions[1],
              "Conclusión 3": data.conclusions[2],
              Limitaciones: data.limitations,
              Recomendaciones: data.improvements,
              Evidencias: data.dashboardEvidence,
              ...dashboardAnswers,
              Nota: "Las fuentes simuladas deben identificarse explícitamente.",
            }}
          />
        </>
      )}
    </section>
  );
}
