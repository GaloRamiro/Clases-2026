import { useEffect, useState } from "react";
import "../../styles/seoSemana01.css";

/*
 * AULA DIGITAL
 * ANÁLISIS SEO — SEMANA 01
 *
 * Actividades interactivas:
 * 1. Laboratorio de búsqueda
 * 2. Ficha de empresa
 * 3. Investigación competitiva
 *
 * Persistencia localStorage.
 * No modifica el PDF de talleres existente.
 */

const STORAGE_PREFIX = "aula:seo:semana01";

const RESULT_TYPES = [
  "Resultado orgánico (SEO)",
  "Anuncio de búsqueda (SEM)",
  "Respuesta directa / AEO",
  "Respuesta generada con IA / GEO",
  "Resultado local / mapa",
  "Otro",
];

function emptySearch() {
  return {
    query: "",
    engine: "Google",
    resultType: "",
    resultUrl: "",
    evidenceUrl: "",
    observation: "",
    reasoning: "",
  };
}

function emptyCompetitor() {
  return {
    name: "",
    website: "",
    searchQuery: "",
    observation: "",
    evidenceUrl: "",
  };
}

function createInitialData() {
  return {
    searches: [emptySearch(), emptySearch()],

    company: {
      name: "",
      website: "",
      sector: "",
      market: "",
      location: "",
      product: "",
      audience: "",
      valueProposition: "",
      commercialGoal: "",
    },

    competitors: [emptyCompetitor(), emptyCompetitor(), emptyCompetitor()],

    opportunities: [
      { description: "", justification: "" },
      { description: "", justification: "" },
    ],

    presentation: {
      mainDecision: "",
      supportingEvidence: "",
      conclusion: "",
    },
  };
}

function storageKey(lessonId, studentName) {
  const student = String(studentName || "")
    .trim()
    .toLowerCase();

  return `${STORAGE_PREFIX}:${lessonId}:${student}`;
}

function readSavedData(key) {
  const defaults = createInitialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return defaults;
    }

    return {
      searches: defaults.searches.map((item, index) => ({
        ...item,
        ...(saved.searches?.[index] || {}),
      })),

      company: {
        ...defaults.company,
        ...(saved.company || {}),
      },

      competitors: defaults.competitors.map((item, index) => ({
        ...item,
        ...(saved.competitors?.[index] || {}),
      })),

      opportunities: defaults.opportunities.map((item, index) => ({
        ...item,
        ...(saved.opportunities?.[index] || {}),
      })),

      presentation: {
        ...defaults.presentation,
        ...(saved.presentation || {}),
      },
    };
  } catch {
    return defaults;
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
  hint,
}) {
  return (
    <label className="seo-field">
      <span className="seo-field__label">{label}</span>

      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}

      {hint && <small className="seo-field__hint">{hint}</small>}
    </label>
  );
}

function SectionHeading({ number, title, description, duration }) {
  return (
    <div className="seo-section-heading">
      <div className="seo-section-heading__meta">
        <span>ACTIVIDAD {number}</span>
        <span>{duration}</span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function SearchLaboratory({ data, updateSearch }) {
  return (
    <section className="seo-workshop__section">
      <SectionHeading
        number="01"
        title="Laboratorio de resultados de búsqueda"
        description="Investiga dos consultas comerciales. Registra lo que realmente aparece, sin asumir que todos los resultados son iguales."
        duration="15 MIN"
      />

      <div className="seo-workshop__instruction">
        <strong>Tu misión</strong>
        <p>
          Realiza dos búsquedas relacionadas con el sector de tu empresa.
          Identifica un resultado relevante en cada búsqueda, clasifícalo y
          explica por qué corresponde a esa categoría.
        </p>
      </div>

      {data.searches.map((search, index) => (
        <div className="seo-workshop__panel" key={index}>
          <div className="seo-workshop__panel-title">
            <h4>Búsqueda {index + 1}</h4>
            <span>EVIDENCIA {index + 1}</span>
          </div>

          <div className="seo-workshop__grid">
            <Field
              label="Consulta realizada"
              value={search.query}
              onChange={(value) => updateSearch(index, "query", value)}
              placeholder="Ej. clínica dental en Quito"
            />

            <Field
              label="Buscador o plataforma"
              value={search.engine}
              onChange={(value) => updateSearch(index, "engine", value)}
              placeholder="Google, Bing..."
            />
          </div>

          <label className="seo-field">
            <span className="seo-field__label">
              Tipo de resultado identificado
            </span>

            <select
              value={search.resultType}
              onChange={(event) =>
                updateSearch(index, "resultType", event.target.value)
              }
            >
              <option value="">Selecciona una categoría</option>

              {RESULT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <div className="seo-workshop__grid">
            <Field
              label="Enlace del resultado"
              value={search.resultUrl}
              onChange={(value) => updateSearch(index, "resultUrl", value)}
              placeholder="https://..."
            />

            <Field
              label="Enlace de la captura o evidencia"
              value={search.evidenceUrl}
              onChange={(value) => updateSearch(index, "evidenceUrl", value)}
              placeholder="https://..."
              hint="Puedes colocar un enlace compartido a tu captura."
            />
          </div>

          <Field
            label="¿Qué observaste en los resultados?"
            value={search.observation}
            onChange={(value) => updateSearch(index, "observation", value)}
            placeholder="Describe los resultados y su ubicación."
            multiline
          />

          <Field
            label="¿Por qué clasificaste así el resultado?"
            value={search.reasoning}
            onChange={(value) => updateSearch(index, "reasoning", value)}
            placeholder="Justifica con elementos visibles de la búsqueda."
            multiline
          />
        </div>
      ))}
    </section>
  );
}

function CompanyWorkshop({ data, updateCompany }) {
  const company = data.company;

  return (
    <section className="seo-workshop__section">
      <SectionHeading
        number="02"
        title="Ficha inicial de la empresa"
        description="Esta empresa será el proyecto transversal que desarrollarás durante las 18 semanas."
        duration="15 MIN"
      />

      <div className="seo-workshop__instruction">
        <strong>Tu misión</strong>
        <p>
          Selecciona una empresa real o un emprendimiento verificable. Define su
          mercado, sus clientes y el objetivo comercial que guiará la estrategia
          SEO.
        </p>
      </div>

      <div className="seo-workshop__panel">
        <div className="seo-workshop__grid">
          <Field
            label="Nombre de la empresa"
            value={company.name}
            onChange={(value) => updateCompany("name", value)}
            placeholder="Nombre comercial"
          />

          <Field
            label="Sitio web"
            value={company.website}
            onChange={(value) => updateCompany("website", value)}
            placeholder="https://..."
          />

          <Field
            label="Sector económico"
            value={company.sector}
            onChange={(value) => updateCompany("sector", value)}
            placeholder="Salud, educación, gastronomía..."
          />

          <Field
            label="Mercado en el que compite"
            value={company.market}
            onChange={(value) => updateCompany("market", value)}
            placeholder="Ej. servicios odontológicos"
          />

          <Field
            label="Ubicación o alcance"
            value={company.location}
            onChange={(value) => updateCompany("location", value)}
            placeholder="Quito, Ecuador / nacional"
          />

          <Field
            label="Producto o servicio principal"
            value={company.product}
            onChange={(value) => updateCompany("product", value)}
            placeholder="¿Qué ofrece la empresa?"
          />
        </div>

        <Field
          label="Público objetivo"
          value={company.audience}
          onChange={(value) => updateCompany("audience", value)}
          placeholder="¿A quién necesita atraer la empresa?"
          multiline
        />

        <Field
          label="Propuesta de valor"
          value={company.valueProposition}
          onChange={(value) => updateCompany("valueProposition", value)}
          placeholder="¿Por qué un cliente debería elegirla?"
          multiline
        />

        <Field
          label="Objetivo comercial"
          value={company.commercialGoal}
          onChange={(value) => updateCompany("commercialGoal", value)}
          placeholder="Ej. conseguir más solicitudes de cotización"
          multiline
        />
      </div>
    </section>
  );
}

function CompetitorWorkshop({
  data,
  updateCompetitor,
  updateOpportunity,
  updatePresentation,
}) {
  return (
    <section className="seo-workshop__section">
      <SectionHeading
        number="03"
        title="Competidores y oportunidades"
        description="Investiga tres competidores y detecta dos oportunidades de visibilidad digital."
        duration="25 MIN"
      />

      <div className="seo-workshop__instruction">
        <strong>Tu misión</strong>
        <p>
          Busca empresas que compitan por clientes similares. Registra
          evidencias y explica qué puede aprender tu empresa de los resultados.
        </p>
      </div>

      {data.competitors.map((competitor, index) => (
        <div className="seo-workshop__panel" key={index}>
          <div className="seo-workshop__panel-title">
            <h4>Competidor {index + 1}</h4>
          </div>

          <div className="seo-workshop__grid">
            <Field
              label="Nombre del competidor"
              value={competitor.name}
              onChange={(value) => updateCompetitor(index, "name", value)}
              placeholder="Nombre comercial"
            />

            <Field
              label="Sitio web"
              value={competitor.website}
              onChange={(value) => updateCompetitor(index, "website", value)}
              placeholder="https://..."
            />

            <Field
              label="Búsqueda utilizada"
              value={competitor.searchQuery}
              onChange={(value) =>
                updateCompetitor(index, "searchQuery", value)
              }
              placeholder="Consulta donde apareció"
            />

            <Field
              label="Enlace de evidencia"
              value={competitor.evidenceUrl}
              onChange={(value) =>
                updateCompetitor(index, "evidenceUrl", value)
              }
              placeholder="https://..."
            />
          </div>

          <Field
            label="¿Qué hace bien este competidor?"
            value={competitor.observation}
            onChange={(value) => updateCompetitor(index, "observation", value)}
            placeholder="Describe su presencia y lo que observaste."
            multiline
          />
        </div>
      ))}

      <div className="seo-workshop__panel">
        <div className="seo-workshop__panel-title">
          <h4>Oportunidades detectadas</h4>
        </div>

        {data.opportunities.map((opportunity, index) => (
          <div className="seo-workshop__opportunity" key={index}>
            <h5>Oportunidad {index + 1}</h5>

            <Field
              label="Oportunidad de posicionamiento"
              value={opportunity.description}
              onChange={(value) =>
                updateOpportunity(index, "description", value)
              }
              placeholder="¿Qué podría mejorar la empresa?"
              multiline
            />

            <Field
              label="Justificación"
              value={opportunity.justification}
              onChange={(value) =>
                updateOpportunity(index, "justification", value)
              }
              placeholder="¿Qué evidencia respalda esta oportunidad?"
              multiline
            />
          </div>
        ))}
      </div>

      <div className="seo-workshop__panel">
        <div className="seo-workshop__panel-title">
          <h4>Preparación de la presentación</h4>
          <span>DEFENSA DEL DIAGNÓSTICO</span>
        </div>

        <Field
          label="Decisión principal del equipo"
          value={data.presentation.mainDecision}
          onChange={(value) => updatePresentation("mainDecision", value)}
          placeholder="¿Qué debería priorizar la empresa?"
          multiline
        />

        <Field
          label="Evidencia que respalda la decisión"
          value={data.presentation.supportingEvidence}
          onChange={(value) => updatePresentation("supportingEvidence", value)}
          placeholder="¿Qué resultados o competidores sustentan tu decisión?"
          multiline
        />

        <Field
          label="Conclusión del diagnóstico"
          value={data.presentation.conclusion}
          onChange={(value) => updatePresentation("conclusion", value)}
          placeholder="¿Qué aprendió el equipo?"
          multiline
        />
      </div>
    </section>
  );
}

function countCompleted(data) {
  const searches = data.searches.filter(
    (item) =>
      item.query.trim() &&
      item.resultType.trim() &&
      item.observation.trim() &&
      item.reasoning.trim(),
  ).length;

  const companyFields = [
    "name",
    "sector",
    "market",
    "product",
    "audience",
    "valueProposition",
    "commercialGoal",
  ];

  const company = companyFields.every((key) =>
    String(data.company[key] || "").trim(),
  )
    ? 1
    : 0;

  const competitors = data.competitors.filter(
    (item) =>
      item.name.trim() && item.website.trim() && item.observation.trim(),
  ).length;

  const opportunities = data.opportunities.filter(
    (item) => item.description.trim() && item.justification.trim(),
  ).length;

  const presentation =
    data.presentation.mainDecision.trim() &&
    data.presentation.supportingEvidence.trim() &&
    data.presentation.conclusion.trim()
      ? 1
      : 0;

  return searches + company + competitors + opportunities + presentation;
}

export default function SeoWorkshop({
  kind,
  lessonId = "seo-semana-1",
  studentName = "",
}) {
  const key = storageKey(lessonId, studentName);

  const [data, setData] = useState(() => readSavedData(key));

  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    setData(readSavedData(key));
    setSaveError(false);
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));

      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [key, data]);

  function updateSearch(index, field, value) {
    setData((current) => ({
      ...current,

      searches: current.searches.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updateCompany(field, value) {
    setData((current) => ({
      ...current,

      company: {
        ...current.company,
        [field]: value,
      },
    }));
  }

  function updateCompetitor(index, field, value) {
    setData((current) => ({
      ...current,

      competitors: current.competitors.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updateOpportunity(index, field, value) {
    setData((current) => ({
      ...current,

      opportunities: current.opportunities.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function updatePresentation(field, value) {
    setData((current) => ({
      ...current,

      presentation: {
        ...current.presentation,
        [field]: value,
      },
    }));
  }

  const completed = countCompleted(data);
  const total = 9;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="seo-workshop">
      <div className="seo-workshop__progress">
        <div>
          <span>AVANCE DEL DIAGNÓSTICO</span>
          <strong>
            {completed} de {total} apartados
          </strong>
        </div>

        <div
          className="seo-workshop__progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Avance del diagnóstico"
        >
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <small>
          {saveError
            ? "No se pudieron guardar los cambios."
            : "Las respuestas se guardan automáticamente en este navegador."}
        </small>
      </div>

      {kind === "seo-search-lab" && (
        <SearchLaboratory data={data} updateSearch={updateSearch} />
      )}

      {kind === "seo-company-workshop" && (
        <CompanyWorkshop data={data} updateCompany={updateCompany} />
      )}

      {kind === "seo-competitor-workshop" && (
        <CompetitorWorkshop
          data={data}
          updateCompetitor={updateCompetitor}
          updateOpportunity={updateOpportunity}
          updatePresentation={updatePresentation}
        />
      )}
    </div>
  );
}
