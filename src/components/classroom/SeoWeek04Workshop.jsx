import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 4,
  title: "Arquitectura web y SEO On Page",
};

const KINDS = ["seo-architecture-lab", "seo-onpage-lab", "seo-peer-review"];

const makePage = () => ({
  name: "",
  parent: "Inicio",
  keyword: "",
  intent: "",
  url: "",
  purpose: "",
});

const makeData = () => ({
  team: "",
  company: "",
  keywords: Array(12).fill(""),
  pages: Array.from({ length: 6 }, makePage),
  sitemap: "",
  architectureConclusion: "",
  onpage: {
    pageName: "",
    mainKeyword: "",
    secondaryKeywords: ["", "", ""],
    intent: "",
    objective: "",
    url: "",
    title: "",
    description: "",
    h1: "",
    h2: ["", "", ""],
    content: "",
    cta: "",
    internalLinks: ["", ""],
    imageDescription: "",
    imageAlt: "",
    prototypeUrl: "",
    evidence: "",
    mobileReview: "",
  },
  review: {
    reviewedTeam: "",
    pageUrl: "",
    checklist: Array(7).fill(false),
    improvement1: "",
    improvement2: "",
    conclusion: "",
  },
});

const CHECKLIST = [
  "La keyword principal corresponde a la intención de búsqueda.",
  "El title y la metadescripción describen la página.",
  "Existe un H1 claro y encabezados H2 organizados.",
  "El contenido responde a una necesidad real.",
  "La navegación y los enlaces internos son coherentes.",
  "Las imágenes incluyen textos alternativos descriptivos.",
  "La página contiene una llamada a la acción clara.",
];

const styles = {
  panel: {
    background: "#f8fafc",
    color: "#14213d",
    padding: 24,
    borderRadius: 18,
  },
  heading: {
    fontSize: 25,
    margin: "8px 0 12px",
  },
  eyebrow: {
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1,
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
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.6,
  },
  status: {
    fontSize: 13,
    color: "#047857",
    fontWeight: 650,
  },
  checkbox: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 12,
    fontSize: 14,
  },
};

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
  placeholder = "",
  options,
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
          rows={4}
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

      keywords: defaults.keywords.map(
        (item, index) => saved.keywords?.[index] ?? item,
      ),

      pages: defaults.pages.map((item, index) => ({
        ...item,
        ...(saved.pages?.[index] || {}),
      })),

      onpage: {
        ...defaults.onpage,
        ...(saved.onpage || {}),

        secondaryKeywords: defaults.onpage.secondaryKeywords.map(
          (item, index) => saved.onpage?.secondaryKeywords?.[index] ?? item,
        ),

        h2: defaults.onpage.h2.map(
          (item, index) => saved.onpage?.h2?.[index] ?? item,
        ),

        internalLinks: defaults.onpage.internalLinks.map(
          (item, index) => saved.onpage?.internalLinks?.[index] ?? item,
        ),
      },

      review: {
        ...defaults.review,
        ...(saved.review || {}),

        checklist: defaults.review.checklist.map(
          (item, index) => saved.review?.checklist?.[index] ?? item,
        ),
      },
    };
  } catch {
    return defaults;
  }
}

export default function SeoWeek04Workshop({
  kind,
  slide,
  lessonId = "seo-semana-4",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana04:${lessonId}:` +
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

  function updateRoot(field, value) {
    update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateKeyword(index, value) {
    update((current) => ({
      ...current,
      keywords: current.keywords.map((item, i) => (i === index ? value : item)),
    }));
  }

  function updatePage(index, field, value) {
    update((current) => ({
      ...current,
      pages: current.pages.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updateOnpage(field, value) {
    update((current) => ({
      ...current,
      onpage: {
        ...current.onpage,
        [field]: value,
      },
    }));
  }

  function updateOnpageArray(field, index, value) {
    update((current) => ({
      ...current,
      onpage: {
        ...current.onpage,
        [field]: current.onpage[field].map((item, i) =>
          i === index ? value : item,
        ),
      },
    }));
  }

  function updateReview(field, value) {
    update((current) => ({
      ...current,
      review: {
        ...current.review,
        [field]: value,
      },
    }));
  }

  function updateChecklist(index, checked) {
    update((current) => ({
      ...current,
      review: {
        ...current.review,
        checklist: current.review.checklist.map((item, i) =>
          i === index ? checked : item,
        ),
      },
    }));
  }

  if (!KINDS.includes(activeKind)) {
    return null;
  }

  const pageCount = data.pages.filter(
    (page) => page.name.trim() && page.url.trim(),
  ).length;

  const checklistCount = data.review.checklist.filter(Boolean).length;

  return (
    <section style={styles.panel}>
      <span style={styles.eyebrow}>ANÁLISIS SEO · SEMANA 04</span>

      <h2 style={styles.heading}>
        {slide?.title || "Laboratorio de arquitectura y SEO On Page"}
      </h2>

      <p style={styles.hint}>
        {slide?.instructions ||
          "Completa la actividad utilizando la empresa de tu proyecto."}
      </p>

      <p style={styles.status}>
        Las respuestas se guardan automáticamente en este dispositivo.
      </p>

      <div style={styles.grid}>
        <Field
          label="Nombre del equipo"
          value={data.team}
          onChange={(value) => updateRoot("team", value)}
        />

        <Field
          label="Empresa del proyecto"
          value={data.company}
          onChange={(value) => updateRoot("company", value)}
        />
      </div>

      {activeKind === "seo-architecture-lab" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Recupera tus 12 keywords</h3>

            <p style={styles.hint}>
              Utiliza la matriz de la Semana 2. No necesitas investigar otras
              doce.
            </p>

            <div style={styles.grid}>
              {data.keywords.map((value, index) => (
                <Field
                  key={index}
                  label={`Keyword ${index + 1}`}
                  value={value}
                  onChange={(next) => updateKeyword(index, next)}
                />
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Diseña seis páginas</h3>

            <p style={styles.hint}>
              Define nombre, jerarquía, keyword, intención, URL y necesidad del
              usuario. No todas las páginas necesitan una keyword comercial.
            </p>

            <p style={styles.status}>Páginas registradas: {pageCount} de 6</p>
          </div>

          {data.pages.map((page, index) => (
            <div style={styles.card} key={index}>
              <h3>Página {index + 1}</h3>

              <div style={styles.grid}>
                <Field
                  label="Nombre de la página"
                  value={page.name}
                  placeholder="Ej. Servicio técnico"
                  onChange={(value) => updatePage(index, "name", value)}
                />

                <Field
                  label="Página superior"
                  value={page.parent}
                  placeholder="Ej. Inicio"
                  onChange={(value) => updatePage(index, "parent", value)}
                />

                <Field
                  label="Keyword principal"
                  value={page.keyword}
                  onChange={(value) => updatePage(index, "keyword", value)}
                />

                <Field
                  label="Intención de búsqueda"
                  value={page.intent}
                  options={[
                    "Informacional",
                    "Comercial",
                    "Transaccional",
                    "Navegacional",
                    "Mixta",
                  ]}
                  onChange={(value) => updatePage(index, "intent", value)}
                />

                <Field
                  label="URL propuesta"
                  value={page.url}
                  placeholder="/servicio-tecnico/"
                  onChange={(value) => updatePage(index, "url", value)}
                />
              </div>

              <Field
                label="Necesidad que resuelve"
                value={page.purpose}
                multiline
                onChange={(value) => updatePage(index, "purpose", value)}
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Paso 3. Documenta tu mapa web</h3>

            <Field
              label="Estructura jerárquica del sitio"
              value={data.sitemap}
              multiline
              placeholder={
                "Inicio\n  Servicios\n    Servicio técnico\n  Nosotros\n  Contacto"
              }
              onChange={(value) => updateRoot("sitemap", value)}
            />

            <Field
              label="Justificación de la arquitectura"
              value={data.architectureConclusion}
              multiline
              onChange={(value) => updateRoot("architectureConclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Arquitectura SEO empresarial"
            answers={{
              Equipo: data.team,
              Empresa: data.company,

              ...Object.fromEntries(
                data.keywords.map((value, index) => [
                  `Keyword estratégica ${index + 1}`,
                  value,
                ]),
              ),

              ...Object.fromEntries(
                data.pages.flatMap((page, index) => {
                  const p = `PÁGINA ${index + 1}`;

                  return [
                    [`${p} - Nombre`, page.name],
                    [`${p} - Página superior`, page.parent],
                    [`${p} - Keyword`, page.keyword],
                    [`${p} - Intención`, page.intent],
                    [`${p} - URL`, page.url],
                    [`${p} - Necesidad`, page.purpose],
                  ];
                }),
              ),

              "Mapa jerárquico": data.sitemap,
              Justificación: data.architectureConclusion,
            }}
          />
        </>
      )}

      {activeKind === "seo-onpage-lab" && (
        <>
          <div style={styles.card}>
            <h3>Paso 1. Brief de la página</h3>

            <div style={styles.grid}>
              <Field
                label="Página seleccionada"
                value={data.onpage.pageName}
                onChange={(value) => updateOnpage("pageName", value)}
              />

              <Field
                label="Keyword principal"
                value={data.onpage.mainKeyword}
                onChange={(value) => updateOnpage("mainKeyword", value)}
              />

              <Field
                label="Intención de búsqueda"
                value={data.onpage.intent}
                options={[
                  "Informacional",
                  "Comercial",
                  "Transaccional",
                  "Navegacional",
                  "Mixta",
                ]}
                onChange={(value) => updateOnpage("intent", value)}
              />
            </div>

            <Field
              label="Objetivo comercial"
              value={data.onpage.objective}
              multiline
              onChange={(value) => updateOnpage("objective", value)}
            />

            <h4>Tres keywords secundarias</h4>

            <div style={styles.grid}>
              {data.onpage.secondaryKeywords.map((value, index) => (
                <Field
                  key={index}
                  label={`Keyword secundaria ${index + 1}`}
                  value={value}
                  onChange={(next) =>
                    updateOnpageArray("secondaryKeywords", index, next)
                  }
                />
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <h3>Paso 2. Metadatos y encabezados</h3>

            <Field
              label="URL descriptiva"
              value={data.onpage.url}
              placeholder="/servicio-tecnico-quito/"
              onChange={(value) => updateOnpage("url", value)}
            />

            <Field
              label="Title SEO"
              value={data.onpage.title}
              onChange={(value) => updateOnpage("title", value)}
            />

            <Field
              label="Meta description"
              value={data.onpage.description}
              multiline
              onChange={(value) => updateOnpage("description", value)}
            />

            <Field
              label="Encabezado H1"
              value={data.onpage.h1}
              onChange={(value) => updateOnpage("h1", value)}
            />

            {data.onpage.h2.map((value, index) => (
              <Field
                key={index}
                label={`Encabezado H2 ${index + 1}`}
                value={value}
                onChange={(next) => updateOnpageArray("h2", index, next)}
              />
            ))}
          </div>

          <div style={styles.card}>
            <h3>Paso 3. Contenido y experiencia</h3>

            <Field
              label="Contenido principal de la página"
              value={data.onpage.content}
              multiline
              placeholder="Redacta contenido original que responda a la intención de búsqueda."
              onChange={(value) => updateOnpage("content", value)}
            />

            <Field
              label="Llamada a la acción (CTA)"
              value={data.onpage.cta}
              onChange={(value) => updateOnpage("cta", value)}
            />

            {data.onpage.internalLinks.map((value, index) => (
              <Field
                key={index}
                label={`Enlace interno propuesto ${index + 1}`}
                value={value}
                placeholder="/pagina-relacionada/"
                onChange={(next) =>
                  updateOnpageArray("internalLinks", index, next)
                }
              />
            ))}

            <Field
              label="Descripción de la imagen"
              value={data.onpage.imageDescription}
              onChange={(value) => updateOnpage("imageDescription", value)}
            />

            <Field
              label="Texto alternativo (alt)"
              value={data.onpage.imageAlt}
              onChange={(value) => updateOnpage("imageAlt", value)}
            />
          </div>

          <div style={styles.card}>
            <h3>Paso 4. Primera versión de la página</h3>

            <Field
              label="Enlace al sitio o prototipo"
              value={data.onpage.prototypeUrl}
              placeholder="https://..."
              onChange={(value) => updateOnpage("prototypeUrl", value)}
            />

            <Field
              label="Enlace o referencia de capturas"
              value={data.onpage.evidence}
              onChange={(value) => updateOnpage("evidence", value)}
            />

            <Field
              label="Revisión de la versión móvil"
              value={data.onpage.mobileReview}
              multiline
              onChange={(value) => updateOnpage("mobileReview", value)}
            />

            <p style={styles.hint}>
              Puedes utilizar herramientas gratuitas. Si el prototipo no está
              publicado, registra qué comprobaciones técnicas quedan pendientes.
            </p>
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Primera página SEO On Page"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Página: data.onpage.pageName,
              "Keyword principal": data.onpage.mainKeyword,
              Intención: data.onpage.intent,
              "Objetivo comercial": data.onpage.objective,

              ...Object.fromEntries(
                data.onpage.secondaryKeywords.map((value, index) => [
                  `Keyword secundaria ${index + 1}`,
                  value,
                ]),
              ),

              URL: data.onpage.url,
              "Title SEO": data.onpage.title,
              "Meta description": data.onpage.description,
              H1: data.onpage.h1,

              ...Object.fromEntries(
                data.onpage.h2.map((value, index) => [
                  `H2 ${index + 1}`,
                  value,
                ]),
              ),

              "Contenido principal": data.onpage.content,
              CTA: data.onpage.cta,

              ...Object.fromEntries(
                data.onpage.internalLinks.map((value, index) => [
                  `Enlace interno ${index + 1}`,
                  value,
                ]),
              ),

              "Descripción de imagen": data.onpage.imageDescription,
              "Texto alternativo": data.onpage.imageAlt,
              "URL del prototipo": data.onpage.prototypeUrl,
              Evidencias: data.onpage.evidence,
              "Revisión móvil": data.onpage.mobileReview,
            }}
          />
        </>
      )}

      {activeKind === "seo-peer-review" && (
        <>
          <div style={styles.card}>
            <h3>Auditoría rápida entre equipos</h3>

            <Field
              label="Equipo evaluado"
              value={data.review.reviewedTeam}
              onChange={(value) => updateReview("reviewedTeam", value)}
            />

            <Field
              label="Enlace a la página evaluada"
              value={data.review.pageUrl}
              onChange={(value) => updateReview("pageUrl", value)}
            />

            <p style={styles.status}>
              Criterios comprobados: {checklistCount} de 7
            </p>

            {CHECKLIST.map((item, index) => (
              <label key={index} style={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={data.review.checklist[index]}
                  onChange={(event) =>
                    updateChecklist(index, event.target.checked)
                  }
                />
                <span>{item}</span>
              </label>
            ))}

            <p style={styles.hint}>
              Marca únicamente los criterios que realmente verificaste.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Dos mejoras justificadas</h3>

            <Field
              label="Primera mejora"
              value={data.review.improvement1}
              multiline
              onChange={(value) => updateReview("improvement1", value)}
            />

            <Field
              label="Segunda mejora"
              value={data.review.improvement2}
              multiline
              onChange={(value) => updateReview("improvement2", value)}
            />

            <Field
              label="Conclusión de la revisión"
              value={data.review.conclusion}
              multiline
              onChange={(value) => updateReview("conclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Auditoría SEO entre equipos"
            answers={{
              "Equipo evaluador": data.team,
              Empresa: data.company,
              "Equipo evaluado": data.review.reviewedTeam,
              "Página evaluada": data.review.pageUrl,

              ...Object.fromEntries(
                CHECKLIST.map((item, index) => [
                  `Criterio ${index + 1}: ${item}`,
                  data.review.checklist[index]
                    ? "Cumple"
                    : "No verificado o no cumple",
                ]),
              ),

              "Primera mejora": data.review.improvement1,
              "Segunda mejora": data.review.improvement2,
              Conclusión: data.review.conclusion,
            }}
          />
        </>
      )}
    </section>
  );
}
