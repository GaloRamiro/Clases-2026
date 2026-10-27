const styles = {
  container: {
    padding: "24px",
    background: "#f8fafc",
    color: "#111b35",
    borderRadius: "16px",
    lineHeight: 1.7,
  },
  card: {
    padding: "20px",
    background: "#ffffff",
    border: "1px solid #dbe3ee",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  title: {
    color: "#111b35",
    marginTop: 0,
  },
  highlight: {
    color: "#ee7544",
    fontWeight: 700,
  },
};

const presentationSlides = [
  "Portada: empresa, integrantes y objetivo",
  "Diagnóstico inicial y alcance de la consultoría",
  "Tres hallazgos SEO con sus evidencias",
  "Palabras clave y análisis de competidores",
  "Estrategia SEM y presupuesto simulado",
  "Propuestas de optimización AEO",
  "Auditoría GEO y recomendaciones",
  "Web académica: GA4, GTM, GSC y Looker Studio",
  "Roadmap de 90 días e indicadores KPI",
  "Tres recomendaciones estratégicas y conclusión",
];

const rubric = [
  ["Diagnóstico SEO y evidencias", 20],
  ["Estrategia SEM y decisiones", 15],
  ["Propuestas AEO y GEO", 15],
  ["Analítica y demostración técnica", 15],
  ["Roadmap, KPI y recomendaciones", 15],
  ["Presentación ejecutiva", 10],
  ["Defensa oral y participación", 10],
];

export default function SeoWeek18Resources({ kind }) {
  if (kind === "seo18-rules") {
    return (
      <section style={styles.container}>
        <h2 style={styles.title}>Reglas de la defensa final</h2>

        <div style={styles.card}>
          <h3>¿Qué deben hacer los equipos?</h3>

          <ol>
            <li>Presentar la empresa real investigada.</li>
            <li>Explicar los principales problemas SEO.</li>
            <li>Justificar la estrategia SEM simulada.</li>
            <li>Presentar las propuestas AEO y GEO.</li>
            <li>Mostrar las evidencias de la web académica.</li>
            <li>Defender el roadmap de 90 días.</li>
            <li>Responder las preguntas del comité.</li>
          </ol>
        </div>

        <div style={styles.card}>
          <h3>Reglas obligatorias</h3>

          <p>Todos los integrantes deben participar en la presentación.</p>

          <p>
            Cada recomendación debe estar sustentada en una evidencia
            verificable.
          </p>

          <p>No se pueden presentar datos simulados como resultados reales.</p>

          <p>
            Las pruebas de GA4, GTM, Search Console y Looker Studio corresponden
            a la web académica, no a la empresa real.
          </p>

          <p style={styles.highlight}>
            El docente asignará los turnos según el número de equipos.
          </p>
        </div>

        <div style={styles.card}>
          <h3>Rúbrica de evaluación</h3>

          {rubric.map(([name, points]) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
                padding: "10px 0",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span>{name}</span>
              <strong>{points} pts</strong>
            </div>
          ))}

          <p style={styles.highlight}>Total: 100 puntos</p>
        </div>
      </section>
    );
  }

  if (kind === "seo18-presentation-guide") {
    return (
      <section style={styles.container}>
        <h2 style={styles.title}>Guía de presentación ejecutiva</h2>

        <div style={styles.card}>
          <h3>Diez diapositivas recomendadas</h3>

          <ol>
            {presentationSlides.map((item, index) => (
              <li key={index} style={{ marginBottom: "12px" }}>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div style={styles.card}>
          <h3>¿Cómo defender el roadmap?</h3>

          <p>
            Expliquen qué acciones implementarían durante los primeros 30 días,
            cuáles ejecutarían entre los días 31 y 60, y cómo evaluarían los
            resultados entre los días 61 y 90.
          </p>

          <p>
            Incluyan responsables sugeridos, recursos necesarios, dependencias e
            indicadores de seguimiento.
          </p>
        </div>

        <div style={styles.card}>
          <h3>Recomendación para la defensa</h3>

          <p>
            No lean el informe completo. Presenten los problemas más relevantes,
            las evidencias y las decisiones que proponen para la empresa.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.container}>
      <div style={styles.card}>
        <h3>Recurso no identificado</h3>
        <p>Tipo de recurso: {kind || "Sin especificar"}</p>
      </div>
    </section>
  );
}
