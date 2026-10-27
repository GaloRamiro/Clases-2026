import { useState } from "react";

const S = {
  root: {
    background: "#f8fafc",
    color: "#111b35",
    padding: 22,
    borderRadius: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid #dbe3ee",
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    boxSizing: "border-box",
    marginTop: 6,
  },
  button: {
    padding: "11px 16px",
    border: 0,
    borderRadius: 8,
    background: "#ee7544",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};

const SECTIONS = [
  "Portada y datos del proyecto",
  "Resumen ejecutivo",
  "Empresa y alcance del estudio",
  "Diagnóstico SEO y análisis competitivo",
  "Palabras clave y estrategia de contenido",
  "Propuesta SEM y campaña simulada",
  "Optimización AEO",
  "Auditoría y recomendaciones GEO",
  "Prácticas académicas: GA4, GTM, GSC y Looker Studio",
  "Roadmap de 90 días",
  "KPI, conclusiones y recomendaciones",
  "Anexos y fuentes",
];

const PRESENTATION = [
  "Portada: empresa y equipo consultor",
  "Situación inicial y objetivo",
  "Tres hallazgos SEO principales",
  "Keywords y competencia",
  "SEM y resultados simulados",
  "AEO y oportunidades GEO",
  "Web académica y analítica",
  "Cinco recomendaciones prioritarias",
  "Roadmap de 90 días e indicadores",
  "Conclusión y próximos pasos",
];

function Card({ title, children }) {
  return (
    <div style={S.card}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function PriorityCalculator() {
  const [name, setName] = useState("");
  const [impact, setImpact] = useState("3");
  const [effort, setEffort] = useState("2");
  const [urgency, setUrgency] = useState("2");

  const score = Number(impact) * 2 + Number(urgency) - Number(effort);

  const priority = score >= 6 ? "Alta" : score >= 3 ? "Media" : "Baja";

  const result =
    `Acción: ${name || "Sin nombre"}\n` +
    `Impacto: ${impact}/3\n` +
    `Esfuerzo: ${effort}/3\n` +
    `Urgencia: ${urgency}/3\n` +
    `Puntuación orientativa: ${score}\n` +
    `Prioridad: ${priority}`;

  return (
    <Card title="Calculadora de prioridad">
      <label>
        Recomendación
        <input
          style={S.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej.: mejorar títulos SEO"
        />
      </label>

      {[
        ["Impacto esperado", impact, setImpact],
        ["Esfuerzo de implementación", effort, setEffort],
        ["Urgencia", urgency, setUrgency],
      ].map(([label, value, setter]) => (
        <label key={label} style={{ display: "block", marginTop: 14 }}>
          {label}
          <select
            style={S.input}
            value={value}
            onChange={(e) => setter(e.target.value)}
          >
            <option value="1">Bajo</option>
            <option value="2">Medio</option>
            <option value="3">Alto</option>
          </select>
        </label>
      ))}

      <div style={{ margin: "20px 0" }}>
        <strong>Prioridad orientativa: {priority}</strong>
        <p>Puntuación: {score}</p>
      </div>

      <button
        type="button"
        style={S.button}
        onClick={() => navigator.clipboard?.writeText(result)}
      >
        Copiar recomendación
      </button>

      <p style={{ fontSize: 13, color: "#64748b" }}>
        Modelo didáctico. La decisión también depende del presupuesto, riesgos,
        permisos y recursos.
      </p>
    </Card>
  );
}

export default function SeoWeek17Resources({ kind }) {
  if (kind === "seo17-priority-guide") {
    return (
      <section style={S.root}>
        <h2>Prioridades y roadmap estratégico</h2>

        <PriorityCalculator />

        <Card title="Fase 1 · Días 1–30">
          <p>
            Diagnóstico y correcciones prioritarias: validar hallazgos, revisar
            títulos, detectar problemas técnicos y acordar objetivos.
          </p>
        </Card>

        <Card title="Fase 2 · Días 31–60">
          <p>
            Contenido, AEO, GEO y SEM: preparar piezas, mejorar información
            pública y validar propuestas publicitarias.
          </p>
        </Card>

        <Card title="Fase 3 · Días 61–90">
          <p>
            Medición y optimización: revisar indicadores, analizar resultados
            disponibles y proponer ajustes.
          </p>
        </Card>

        <p>
          Este roadmap es una propuesta. La empresa deberá aprobar presupuesto,
          responsables y accesos antes de cualquier implementación.
        </p>
      </section>
    );
  }

  if (kind === "seo17-report-guide") {
    return (
      <section style={S.root}>
        <h2>Guía para construir el informe final</h2>

        <Card title="Índice recomendado">
          <ol>
            {SECTIONS.map((item) => (
              <li key={item} style={{ marginBottom: 9 }}>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Extensión y presentación">
          <p>
            Entre 15 y 25 páginas de cuerpo principal, más anexos. Utiliza
            títulos, tablas, capturas pertinentes y conclusiones.
          </p>
          <p>El resumen ejecutivo debe tener entre 150 y 250 palabras.</p>
        </Card>

        <Card title="Separación obligatoria de evidencias">
          <p>
            <strong>Empresa real:</strong> auditorías externas, investigación,
            recomendaciones y propuestas sin implementar.
          </p>
          <p>
            <strong>Web académica:</strong> pruebas con GA4, GTM, Search Console
            y Looker Studio.
          </p>
          <p>
            <strong>SEM:</strong> campañas, presupuestos y resultados simulados,
            sin inversión real.
          </p>
        </Card>

        <Card title="Herramientas de redacción">
          <a
            href="https://docs.google.com/document/"
            target="_blank"
            rel="noreferrer"
          >
            Abrir Google Docs
          </a>
        </Card>
      </section>
    );
  }

  if (kind === "seo17-presentation-guide") {
    return (
      <section style={S.root}>
        <h2>Guion de presentación ejecutiva</h2>

        <Card title="Diez diapositivas sugeridas">
          <ol>
            {PRESENTATION.map((item) => (
              <li key={item} style={{ marginBottom: 10 }}>
                {item}
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Criterios de presentación">
          <p>
            Cada diapositiva debe responder una pregunta concreta. Prioriza
            evidencias, gráficos, mockups y decisiones frente a párrafos largos.
          </p>
          <p>Distribuye las intervenciones entre todos los integrantes.</p>
        </Card>

        <a href="https://www.canva.com/" target="_blank" rel="noreferrer">
          Abrir Canva
        </a>
      </section>
    );
  }

  return null;
}
