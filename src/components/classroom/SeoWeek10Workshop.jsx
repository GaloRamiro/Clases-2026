import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 10,
  title: "Copywriting publicitario, anuncios de Google Ads y landing pages",
};

const MAX_HEADLINES = 10;
const MAX_DESCRIPTIONS = 4;

const makeAd = () => ({
  group: "",
  keyword: "",
  intent: "",
  benefit: "",
  cta: "",
  finalUrl: "",
  destinationType: "",
  path1: "",
  path2: "",
  headlines: Array(MAX_HEADLINES).fill(""),
  descriptions: Array(MAX_DESCRIPTIONS).fill(""),
  selectedHeadline: 0,
  selectedDescription: 0,
  justification: "",
});

const makeData = () => ({
  team: "",
  company: "",
  companyUrl: "",
  ads: [makeAd(), makeAd()],
  selectedAd: "0",
  currentLandingUrl: "",
  landingAvailability: "",
  strengths: ["", "", ""],
  frictions: ["", "", ""],
  landingChecklist: Array(6).fill(false),
  heroTitle: "",
  heroSubtitle: "",
  benefits: ["", "", ""],
  productDescription: "",
  trustEvidence: "",
  finalCta: "",
  mobileApproach: "",
  prototypeTool: "",
  prototypeReference: "",
  prototypeStatus: "",
  abVariable: "",
  abHypothesis: "",
  versionA: "",
  versionB: "",
  controlledElements: "",
  primaryMetric: "",
  testMethod: "",
  testLimitations: "",
  landingConclusion: "",
});

function loadData(key) {
  const base = makeData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return base;
    }

    return {
      ...base,
      ...saved,
      ads: base.ads.map((item, index) => ({
        ...item,
        ...(saved.ads?.[index] || {}),
        headlines: item.headlines.map(
          (value, i) => saved.ads?.[index]?.headlines?.[i] ?? value,
        ),
        descriptions: item.descriptions.map(
          (value, i) => saved.ads?.[index]?.descriptions?.[i] ?? value,
        ),
      })),
      strengths: base.strengths.map(
        (value, i) => saved.strengths?.[i] ?? value,
      ),
      frictions: base.frictions.map(
        (value, i) => saved.frictions?.[i] ?? value,
      ),
      benefits: base.benefits.map((value, i) => saved.benefits?.[i] ?? value),
      landingChecklist: base.landingChecklist.map(
        (value, i) => saved.landingChecklist?.[i] ?? value,
      ),
    };
  } catch {
    return base;
  }
}

const CHECKLIST = [
  "La propuesta de valor es clara.",
  "El contenido responde a la intención de búsqueda.",
  "La oferta coincide con la promesa del anuncio.",
  "Existe una llamada a la acción visible.",
  "Hay elementos de confianza verificables.",
  "La página parece usable en dispositivos móviles.",
];

const ui = {
  panel: {
    background: "#f8fafc",
    color: "#14213d",
    padding: 24,
    borderRadius: 18,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #dbe3ee",
    borderRadius: 14,
    padding: 18,
    margin: "16px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
    background: "#ffffff",
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
  preview: {
    background: "#ffffff",
    border: "1px solid #dbe3ee",
    borderRadius: 14,
    padding: 20,
    margin: "16px 0",
  },
};

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
  options,
  maxLength,
  placeholder = "",
}) {
  const length = Array.from(value).length;
  const overLimit = typeof maxLength === "number" && length > maxLength;

  return (
    <label style={ui.field}>
      <span>
        {label}
        {typeof maxLength === "number" && (
          <span
            style={{
              float: "right",
              color: overLimit ? "#b91c1c" : "#475569",
              fontWeight: 700,
            }}
          >
            {length}/{maxLength}
          </span>
        )}
      </span>

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
          style={{
            ...ui.input,
            borderColor: overLimit ? "#b91c1c" : "#cbd5e1",
          }}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          style={{
            ...ui.input,
            borderColor: overLimit ? "#b91c1c" : "#cbd5e1",
          }}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function AdPreview({ ad }) {
  const headline =
    ad.headlines[ad.selectedHeadline] ||
    ad.headlines.find(Boolean) ||
    "Título de tu anuncio";

  const description =
    ad.descriptions[ad.selectedDescription] ||
    ad.descriptions.find(Boolean) ||
    "Aquí aparecerá la descripción seleccionada.";

  let displayDomain = "dominio-de-ejemplo.com";

  try {
    if (ad.finalUrl) {
      displayDomain = new URL(ad.finalUrl).hostname;
    }
  } catch {
    // Se conserva el dominio de ejemplo.
  }

  return (
    <div style={ui.preview}>
      <span style={{ color: "#475569", fontSize: 12 }}>
        Vista previa conceptual · Anuncio simulado
      </span>

      <p style={{ marginBottom: 5, fontSize: 13 }}>
        <strong>Patrocinado</strong>
        {" · "}
        {displayDomain}
      </p>

      <p
        style={{
          color: "#1d4ed8",
          fontSize: 20,
          fontWeight: 700,
          margin: "8px 0",
        }}
      >
        {headline}
      </p>

      <p style={{ fontSize: 14, lineHeight: 1.6 }}>{description}</p>

      {ad.cta && (
        <p
          style={{
            color: "#2563eb",
            fontWeight: 700,
          }}
        >
          {ad.cta}
        </p>
      )}

      <p style={ui.hint}>
        Google Ads puede combinar los recursos de distintas maneras. Esta vista
        no representa una publicación real.
      </p>
    </div>
  );
}

function LandingPreview({ data }) {
  return (
    <div
      style={{
        ...ui.preview,
        maxWidth: 620,
        margin: "16px auto",
        overflowWrap: "anywhere",
      }}
    >
      <div
        style={{
          padding: 20,
          background: "#eaf1fc",
          borderRadius: 12,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#2563eb",
          }}
        >
          PROTOTIPO ACADÉMICO · NO OFICIAL
        </span>

        <h2>{data.heroTitle || "Aquí aparecerá la propuesta de valor"}</h2>

        <p>
          {data.heroSubtitle || "Describe el beneficio principal del producto."}
        </p>

        <div
          style={{
            display: "inline-block",
            background: "#111b35",
            color: "#ffffff",
            borderRadius: 8,
            padding: "11px 18px",
            fontWeight: 700,
          }}
        >
          {data.finalCta || "Conocer más"}
        </div>
      </div>

      <h3>Beneficios</h3>
      {data.benefits.map((benefit, index) => (
        <p key={index}>
          <strong>{index + 1}.</strong> {benefit || "Beneficio pendiente"}
        </p>
      ))}

      <h3>Producto o servicio</h3>
      <p>{data.productDescription || "Descripción pendiente"}</p>

      <h3>Confianza</h3>
      <p>
        {data.trustEvidence || "Incorpora únicamente evidencias verificables."}
      </p>

      <p style={ui.hint}>
        Esta vista es un esquema conceptual. El prototipo visual definitivo se
        desarrolla en Figma, Canva o Google Slides.
      </p>
    </div>
  );
}

export default function SeoWeek10Workshop({
  kind,
  slide,
  lessonId = "seo-semana-10",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana10:${lessonId}:` +
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
      console.warn("No se pudo guardar la Semana 10:", error);
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

  function setAd(index, field, value) {
    update((current) => ({
      ...current,
      ads: current.ads.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function setAdList(index, field, itemIndex, value) {
    update((current) => ({
      ...current,
      ads: current.ads.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: item[field].map((entry, j) =>
                j === itemIndex ? value : entry,
              ),
            }
          : item,
      ),
    }));
  }

  function setList(field, index, value) {
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) => (i === index ? value : item)),
    }));
  }

  if (activeKind !== "seo-sem-ad-copy" && activeKind !== "seo-sem-landing-ab") {
    return null;
  }

  const adValidation = data.ads.map((ad) => {
    const filledHeadlines = ad.headlines.filter((value) => value.trim()).length;

    const filledDescriptions = ad.descriptions.filter((value) =>
      value.trim(),
    ).length;

    const invalidHeadlines = ad.headlines.filter(
      (value) => Array.from(value).length > 30,
    ).length;

    const invalidDescriptions = ad.descriptions.filter(
      (value) => Array.from(value).length > 90,
    ).length;

    return {
      filledHeadlines,
      filledDescriptions,
      invalidHeadlines,
      invalidDescriptions,
      complete:
        filledHeadlines === 10 &&
        filledDescriptions === 4 &&
        invalidHeadlines === 0 &&
        invalidDescriptions === 0,
    };
  });

  const adsAnswers = Object.fromEntries(
    data.ads.flatMap((ad, index) => {
      const prefix = `ANUNCIO ${index + 1}`;

      return [
        [`${prefix} - Grupo`, ad.group],
        [`${prefix} - Keyword`, ad.keyword],
        [`${prefix} - Intención`, ad.intent],
        [`${prefix} - Beneficio`, ad.benefit],
        [`${prefix} - CTA`, ad.cta],
        [`${prefix} - URL final`, ad.finalUrl],
        [`${prefix} - Tipo de destino`, ad.destinationType],
        [`${prefix} - Ruta 1`, ad.path1],
        [`${prefix} - Ruta 2`, ad.path2],
        ...ad.headlines.map((value, i) => [
          `${prefix} - Título ${i + 1}`,
          value,
        ]),
        ...ad.descriptions.map((value, i) => [
          `${prefix} - Descripción ${i + 1}`,
          value,
        ]),
        [`${prefix} - Justificación`, ad.justification],
      ];
    }),
  );

  const selectedAdIndex = data.selectedAd === "1" ? 1 : 0;

  const selectedAd = data.ads[selectedAdIndex];

  const invalidAssets = adValidation.some(
    (result) => result.invalidHeadlines > 0 || result.invalidDescriptions > 0,
  );

  return (
    <section style={ui.panel}>
      <span
        style={{
          color: "#2563eb",
          fontSize: 12,
          fontWeight: 800,
        }}
      >
        ANÁLISIS SEO · SEMANA 10
      </span>

      <h2>{slide?.title || "Copywriting y optimización de conversiones"}</h2>

      <p style={ui.hint}>
        {slide?.instructions || "Completa el laboratorio con tu empresa real."}
      </p>

      <p style={ui.status}>Guardado automático en este dispositivo.</p>

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
          label="Sitio oficial de la empresa"
          value={data.companyUrl}
          onChange={(value) => setRoot("companyUrl", value)}
        />
      </div>

      {activeKind === "seo-sem-ad-copy" && (
        <>
          <div style={ui.card}>
            <h3>Paso 1. Recupera los dos grupos de anuncios</h3>

            <p style={ui.hint}>
              Utiliza las keywords y la estructura que definiste en la Semana 9.
              Cada grupo tendrá una propuesta de anuncio responsivo.
            </p>
          </div>

          {data.ads.map((ad, index) => (
            <div style={ui.card} key={index}>
              <h3>Propuesta de anuncio {index + 1}</h3>

              <div style={ui.grid}>
                <Field
                  label="Nombre del grupo"
                  value={ad.group}
                  onChange={(value) => setAd(index, "group", value)}
                />

                <Field
                  label="Keyword principal"
                  value={ad.keyword}
                  onChange={(value) => setAd(index, "keyword", value)}
                />

                <Field
                  label="Intención de búsqueda"
                  value={ad.intent}
                  onChange={(value) => setAd(index, "intent", value)}
                />

                <Field
                  label="Beneficio real"
                  value={ad.benefit}
                  onChange={(value) => setAd(index, "benefit", value)}
                />

                <Field
                  label="Llamada a la acción"
                  value={ad.cta}
                  onChange={(value) => setAd(index, "cta", value)}
                />

                <Field
                  label="Tipo de página de destino"
                  value={ad.destinationType}
                  options={[
                    "Página pública existente",
                    "Página recomendada, aún no creada",
                  ]}
                  onChange={(value) => setAd(index, "destinationType", value)}
                />
              </div>

              <Field
                label="URL final existente, si aplica"
                value={ad.finalUrl}
                placeholder="https://..."
                onChange={(value) => setAd(index, "finalUrl", value)}
              />

              <div style={ui.grid}>
                <Field
                  label="Ruta visible 1"
                  value={ad.path1}
                  maxLength={15}
                  onChange={(value) => setAd(index, "path1", value)}
                />

                <Field
                  label="Ruta visible 2"
                  value={ad.path2}
                  maxLength={15}
                  onChange={(value) => setAd(index, "path2", value)}
                />
              </div>

              <h4>Diez títulos publicitarios</h4>

              <p style={ui.hint}>
                Cada título admite un máximo de 30 caracteres.
              </p>

              <div style={ui.grid}>
                {ad.headlines.map((value, itemIndex) => (
                  <Field
                    key={itemIndex}
                    label={`Título ${itemIndex + 1}`}
                    value={value}
                    maxLength={30}
                    onChange={(next) =>
                      setAdList(index, "headlines", itemIndex, next)
                    }
                  />
                ))}
              </div>

              <h4>Cuatro descripciones</h4>

              {ad.descriptions.map((value, itemIndex) => (
                <Field
                  key={itemIndex}
                  label={`Descripción ${itemIndex + 1}`}
                  value={value}
                  maxLength={90}
                  multiline
                  onChange={(next) =>
                    setAdList(index, "descriptions", itemIndex, next)
                  }
                />
              ))}

              <h4>Vista previa del anuncio</h4>

              <div style={ui.grid}>
                <Field
                  label="Título para la vista previa"
                  value={String(ad.selectedHeadline)}
                  options={Array.from({ length: 10 }, (_, i) => String(i))}
                  onChange={(value) =>
                    setAd(index, "selectedHeadline", Number(value))
                  }
                />

                <Field
                  label="Descripción para la vista previa"
                  value={String(ad.selectedDescription)}
                  options={Array.from({ length: 4 }, (_, i) => String(i))}
                  onChange={(value) =>
                    setAd(index, "selectedDescription", Number(value))
                  }
                />
              </div>

              <AdPreview ad={ad} />

              <p style={ui.status}>
                Títulos: {adValidation[index].filledHeadlines}/10
                {" · "}
                Descripciones: {adValidation[index].filledDescriptions}/4
              </p>

              {(adValidation[index].invalidHeadlines > 0 ||
                adValidation[index].invalidDescriptions > 0) && (
                <p style={{ color: "#b91c1c" }}>
                  Hay recursos que superan los límites de caracteres. Corrígelos
                  antes de entregar.
                </p>
              )}

              <Field
                label="Justificación del mensaje elegido"
                multiline
                value={ad.justification}
                onChange={(value) => setAd(index, "justification", value)}
              />
            </div>
          ))}

          <div style={ui.card}>
            <h3>Revisión final del laboratorio</h3>

            <p style={ui.hint}>
              Propuestas completas y dentro de los límites:{" "}
              {adValidation.filter((result) => result.complete).length} de 2.
            </p>

            {invalidAssets && (
              <p style={{ color: "#b91c1c" }}>
                Corrige los recursos demasiado largos antes de exportar el PDF.
              </p>
            )}
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Anuncios responsivos de búsqueda"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              ...adsAnswers,
              "Propuestas completas": adValidation.filter(
                (result) => result.complete,
              ).length,
              "Recursos fuera de límite": invalidAssets
                ? "Sí, requieren corrección"
                : "No",
              Nota: "Anuncios académicos simulados. No se han publicado.",
            }}
          />
        </>
      )}

      {activeKind === "seo-sem-landing-ab" && (
        <>
          <div style={ui.card}>
            <h3>Paso 1. Selecciona un anuncio</h3>

            <Field
              label="Anuncio de referencia"
              value={data.selectedAd}
              options={["0", "1"]}
              onChange={(value) => setRoot("selectedAd", value)}
            />

            <p style={ui.hint}>
              <strong>Grupo:</strong> {selectedAd.group || "Pendiente"}
            </p>

            <p style={ui.hint}>
              <strong>Keyword:</strong> {selectedAd.keyword || "Pendiente"}
            </p>

            <p style={ui.hint}>
              <strong>Beneficio:</strong> {selectedAd.benefit || "Pendiente"}
            </p>

            <AdPreview ad={selectedAd} />
          </div>

          <div style={ui.card}>
            <h3>Paso 2. Diagnóstico de la página actual</h3>

            <Field
              label="Estado de la página de destino"
              value={data.landingAvailability}
              options={[
                "Existe una página pública adecuada",
                "Existe una página, pero requiere mejoras",
                "No existe una página adecuada",
                "No verificable",
              ]}
              onChange={(value) => setRoot("landingAvailability", value)}
            />

            <Field
              label="URL pública analizada, si existe"
              value={data.currentLandingUrl}
              onChange={(value) => setRoot("currentLandingUrl", value)}
            />

            <h4>Tres fortalezas</h4>

            {data.strengths.map((value, index) => (
              <Field
                key={index}
                label={`Fortaleza ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("strengths", index, next)}
              />
            ))}

            <h4>Tres problemas u oportunidades</h4>

            {data.frictions.map((value, index) => (
              <Field
                key={index}
                label={`Fricción ${index + 1}`}
                multiline
                value={value}
                onChange={(next) => setList("frictions", index, next)}
              />
            ))}

            <h4>Checklist de conversión</h4>

            {CHECKLIST.map((label, index) => (
              <label
                key={index}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  margin: "10px 0",
                  fontSize: 14,
                }}
              >
                <input
                  type="checkbox"
                  checked={data.landingChecklist[index]}
                  onChange={(event) =>
                    setList("landingChecklist", index, event.target.checked)
                  }
                />

                <span>{label}</span>
              </label>
            ))}
          </div>

          <div style={ui.card}>
            <h3>Paso 3. Construye tu landing page</h3>

            <p style={ui.hint}>
              Diseña la página en Figma, Canva o Google Slides. Completa también
              este esquema para documentar la estructura del prototipo.
            </p>

            <Field
              label="Título principal del hero"
              value={data.heroTitle}
              onChange={(value) => setRoot("heroTitle", value)}
            />

            <Field
              label="Propuesta de valor"
              multiline
              value={data.heroSubtitle}
              onChange={(value) => setRoot("heroSubtitle", value)}
            />

            <h4>Tres beneficios</h4>

            {data.benefits.map((value, index) => (
              <Field
                key={index}
                label={`Beneficio ${index + 1}`}
                value={value}
                onChange={(next) => setList("benefits", index, next)}
              />
            ))}

            <Field
              label="Producto o servicio"
              multiline
              value={data.productDescription}
              onChange={(value) => setRoot("productDescription", value)}
            />

            <Field
              label="Evidencia de confianza verificable"
              multiline
              value={data.trustEvidence}
              onChange={(value) => setRoot("trustEvidence", value)}
            />

            <Field
              label="CTA principal"
              value={data.finalCta}
              onChange={(value) => setRoot("finalCta", value)}
            />

            <Field
              label="Adaptación para móviles"
              multiline
              value={data.mobileApproach}
              onChange={(value) => setRoot("mobileApproach", value)}
            />

            <div style={ui.grid}>
              <Field
                label="Herramienta de prototipado"
                value={data.prototypeTool}
                options={[
                  "Figma",
                  "Canva",
                  "Google Slides",
                  "Otra herramienta gratuita",
                ]}
                onChange={(value) => setRoot("prototypeTool", value)}
              />

              <Field
                label="Estado del prototipo"
                value={data.prototypeStatus}
                options={[
                  "En preparación",
                  "Prototipo terminado",
                  "Pendiente de revisión",
                ]}
                onChange={(value) => setRoot("prototypeStatus", value)}
              />
            </div>

            <Field
              label="Enlace al prototipo o referencia del archivo"
              value={data.prototypeReference}
              placeholder="Enlace compartido o nombre del archivo"
              onChange={(value) => setRoot("prototypeReference", value)}
            />

            <LandingPreview data={data} />
          </div>

          <div style={ui.card}>
            <h3>Paso 4. Diseña la prueba A/B</h3>

            <p style={ui.hint}>
              Cambia una sola variable principal entre A y B. Mantén iguales los
              demás elementos para facilitar la comparación.
            </p>

            <Field
              label="Variable que se comparará"
              value={data.abVariable}
              options={[
                "Título principal",
                "Texto del CTA",
                "Imagen principal",
                "Orden de beneficios",
                "Otro elemento único",
              ]}
              onChange={(value) => setRoot("abVariable", value)}
            />

            <Field
              label="Hipótesis del experimento"
              multiline
              value={data.abHypothesis}
              placeholder="Si cambiamos..., esperamos..., porque..."
              onChange={(value) => setRoot("abHypothesis", value)}
            />

            <div style={ui.grid}>
              <Field
                label="Versión A (control)"
                multiline
                value={data.versionA}
                onChange={(value) => setRoot("versionA", value)}
              />

              <Field
                label="Versión B (variante)"
                multiline
                value={data.versionB}
                onChange={(value) => setRoot("versionB", value)}
              />
            </div>

            <Field
              label="Elementos que permanecerán iguales"
              multiline
              value={data.controlledElements}
              onChange={(value) => setRoot("controlledElements", value)}
            />

            <Field
              label="Métrica principal"
              value={data.primaryMetric}
              options={[
                "Tasa de conversión",
                "Formularios completados",
                "Reservas realizadas",
                "Compras completadas",
                "Clics en CTA",
              ]}
              onChange={(value) => setRoot("primaryMetric", value)}
            />

            <Field
              label="¿Cómo evaluarías los resultados?"
              multiline
              value={data.testMethod}
              placeholder="Explica la comparación, condiciones y criterio de evaluación."
              onChange={(value) => setRoot("testMethod", value)}
            />

            <Field
              label="Limitaciones del experimento"
              multiline
              value={data.testLimitations}
              onChange={(value) => setRoot("testLimitations", value)}
            />

            <Field
              label="Conclusión del laboratorio"
              multiline
              value={data.landingConclusion}
              onChange={(value) => setRoot("landingConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Landing page y prueba A/B"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Sitio oficial": data.companyUrl,
              "Anuncio seleccionado": `Propuesta ${selectedAdIndex + 1}`,
              "Grupo de anuncios": selectedAd.group,
              "Keyword principal": selectedAd.keyword,
              "Beneficio del anuncio": selectedAd.benefit,
              "Estado del destino": data.landingAvailability,
              "URL analizada": data.currentLandingUrl,
              ...Object.fromEntries(
                data.strengths.map((value, index) => [
                  `Fortaleza ${index + 1}`,
                  value,
                ]),
              ),
              ...Object.fromEntries(
                data.frictions.map((value, index) => [
                  `Fricción ${index + 1}`,
                  value,
                ]),
              ),
              Checklist: CHECKLIST.map(
                (label, index) =>
                  `${data.landingChecklist[index] ? "Sí" : "No"}: ${label}`,
              ).join("\n"),
              Hero: data.heroTitle,
              "Propuesta de valor": data.heroSubtitle,
              "Beneficio 1": data.benefits[0],
              "Beneficio 2": data.benefits[1],
              "Beneficio 3": data.benefits[2],
              "Producto o servicio": data.productDescription,
              Confianza: data.trustEvidence,
              "CTA final": data.finalCta,
              "Diseño móvil": data.mobileApproach,
              Herramienta: data.prototypeTool,
              "Estado del prototipo": data.prototypeStatus,
              "Referencia del prototipo": data.prototypeReference,
              "Variable A/B": data.abVariable,
              Hipótesis: data.abHypothesis,
              "Versión A": data.versionA,
              "Versión B": data.versionB,
              "Elementos constantes": data.controlledElements,
              "Métrica principal": data.primaryMetric,
              "Método de evaluación": data.testMethod,
              Limitaciones: data.testLimitations,
              Conclusión: data.landingConclusion,
              Nota: "Prototipo académico no oficial. Prueba A/B propuesta, no ejecutada.",
            }}
          />
        </>
      )}
    </section>
  );
}
