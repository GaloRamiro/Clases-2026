
import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  id: "seo-semana-18",
  courseId: "seo",
  number: 18,
  title: "Defensa final del proyecto de consultoría SEO, SEM, AEO y GEO",
};

const RUBRIC = [
  { name: "Diagnóstico SEO y evidencias", max: 20 },
  { name: "Estrategia SEM y decisiones", max: 15 },
  { name: "Propuestas AEO y GEO", max: 15 },
  { name: "Analítica y demostración técnica", max: 15 },
  { name: "Roadmap, KPI y recomendaciones", max: 15 },
  { name: "Presentación ejecutiva", max: 10 },
  { name: "Defensa oral y participación", max: 10 },
];

const REPORT_CHECKS = [
  "Portada con empresa, integrantes y asignatura",
  "Resumen ejecutivo y objetivos",
  "Descripción y alcance de la empresa real",
  "Diagnóstico SEO sustentado en evidencias",
  "Investigación de palabras clave y competencia",
  "Propuesta SEM claramente identificada como simulada",
  "Propuestas AEO y auditoría GEO",
  "Cinco recomendaciones prioritarias",
  "Roadmap de implementación de 90 días",
  "Indicadores KPI y responsables sugeridos",
  "Conclusiones y limitaciones del estudio",
  "Fuentes, capturas y anexos",
];

const EVIDENCE_CHECKS = [
  "La web académica abre correctamente por HTTPS",
  "Se identifica la URL de la web académica",
  "Existen evidencias de configuración de GA4",
  "Se documentó el trabajo realizado con GTM",
  "Se documentó la propiedad de Search Console",
  "Se registró el diagnóstico de indexación",
  "Se documentó el sitemap XML",
  "Se incluye el dashboard de Looker Studio",
  "Los datos simulados están identificados",
  "Las pruebas académicas no se atribuyen a la empresa real",
];

const QUESTIONS = [
  "¿Cuál es el principal problema digital de la empresa?",
  "¿Qué evidencia respalda ese diagnóstico?",
  "¿Por qué seleccionaron esas palabras clave?",
  "¿Qué acciones SEO consideran prioritarias?",
  "¿Qué diferencia existe entre SEO y SEM?",
  "¿Cómo justifican el presupuesto de la campaña SEM simulada?",
  "¿Cómo contribuye su propuesta AEO?",
  "¿Qué encontraron durante la auditoría GEO?",
  "¿Por qué utilizaron una web académica independiente?",
  "¿Qué diferencias existen entre GA4 y Search Console?",
  "¿Qué acción implementarían durante los primeros 30 días?",
  "¿Qué indicadores utilizarían para evaluar el plan?",
];

const PORTFOLIO_PROMPTS = [
  "Auditoría SEO y diagnóstico empresarial",
  "Estrategia SEM, AEO o GEO",
  "Dashboard, roadmap o informe ejecutivo",
];

const S = {
  root: {
    padding: 22,
    borderRadius: 16,
    background: "#f8fafc",
    color: "#111b35",
    lineHeight: 1.6,
  },
  card: {
    padding: 20,
    marginBottom: 16,
    background: "#ffffff",
    border: "1px solid #dbe3ee",
    borderRadius: 12,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 14,
    fontSize: 14,
    fontWeight: 600,
  },
  input: {
    width: "100%",
    padding: 11,
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#111b35",
    boxSizing: "border-box",
    font: "inherit",
  },
  note: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.65,
  },
  success: {
    color: "#047857",
    fontSize: 13,
    fontWeight: 600,
  },
  badge: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: 6,
    background: "#eaf2f7",
    color: "#173746",
    fontSize: 12,
    fontWeight: 700,
  },
};

function createInitialData() {
  return {
    team: "",
    company: "",
    members: "",
    reportUrl: "",
    presentationUrl: "",
    roadmapUrl: "",
    academicUrl: "",
    evidenceNotes: "",

    reportChecks: REPORT_CHECKS.map(() => false),
    evidenceChecks: EVIDENCE_CHECKS.map(() => false),

    evaluator: "",
    scores: RUBRIC.map(() => ""),
    defenseAnswers: QUESTIONS.map(() => ""),
    observations: "",

    priorityAction: "",
    dataLearning: "",
    portfolio: ["", "", ""],
    selfEvaluation: "",
    finalCommitment: "",
  };
}

function loadData(key) {
  const base = createInitialData();

  try {
    const raw = localStorage.getItem(key);

    if (!raw) return base;

    const saved = JSON.parse(raw);

    if (!saved || typeof saved !== "object") {
      return base;
    }

    return {
      ...base,
      ...saved,

      reportChecks: base.reportChecks.map(
        (_, i) => Boolean(saved.reportChecks?.[i])
      ),

      evidenceChecks: base.evidenceChecks.map(
        (_, i) => Boolean(saved.evidenceChecks?.[i])
      ),

      scores: base.scores.map(
        (_, i) => saved.scores?.[i] ?? ""
      ),

      defenseAnswers: base.defenseAnswers.map(
        (_, i) => saved.defenseAnswers?.[i] ?? ""
      ),

      portfolio: base.portfolio.map(
        (_, i) => saved.portfolio?.[i] ?? ""
      ),
    };
  } catch (error) {
    console.warn("Error al cargar Semana 18:", error);
    return base;
  }
}

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
  placeholder = "",
}) {
  return (
    <label style={S.field}>
      <span>{label}</span>

      {multiline ? (
        <textarea
          style={S.input}
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          style={S.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function Checklist({ items, values, onChange }) {
  const completed = values.filter(Boolean).length;

  return (
    <>
      <p style={S.note}>
        Progreso: <strong>{completed}/{items.length}</strong>
      </p>

      {items.map((item, index) => (
        <label
          key={index}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            padding: "10px 0",
            borderBottom: "1px solid #edf2f7",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={Boolean(values[index])}
            onChange={(event) =>
              onChange(index, event.target.checked)
            }
            style={{ marginTop: 5 }}
          />

          <span>{item}</span>
        </label>
      ))}
    </>
  );
}

function Card({ title, children }) {
  return (
    <div style={S.card}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
}

function toChecklistAnswers(items, values) {
  return Object.fromEntries(
    items.map((item, index) => [
      item,
      values[index] ? "Verificado" : "Pendiente",
    ])
  );
}

export default function SeoWeek18Workshop({
  kind,
  slide,
  lessonId = "seo-semana-18",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const studentKey = String(studentName || "sin-nombre")
    .trim()
    .toLowerCase();

  const storageKey =
    `aula:seo:semana18:${lessonId}:${studentKey}`;

  const [stored, setStored] = useState(() => ({
    key: storageKey,
    data: loadData(storageKey),
  }));

  const data =
    stored.key === storageKey
      ? stored.data
      : loadData(storageKey);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(next)
      );
    } catch (error) {
      console.warn(
        "No se pudo guardar la Semana 18:",
        error
      );
    }

    setStored({
      key: storageKey,
      data: next,
    });
  }

  function setField(field, value) {
    update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function setArrayItem(field, index, value) {
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) =>
        i === index ? value : item
      ),
    }));
  }

  const total = data.scores.reduce(
    (sum, value) => sum + (Number(value) || 0),
    0
  );

  const evaluationComplete = data.scores.every(
    (value) => value !== ""
  );

  const allowed = [
    "seo18-checklist",
    "seo18-evidence",
    "seo18-defense",
    "seo18-reflection",
    "seo18-portfolio",
    "seo18-final",
  ];

  if (!allowed.includes(activeKind)) {
    return (
      <section style={S.root}>
        <p>
          Componente de Semana 18 no reconocido:
          <strong> {activeKind || "Sin identificador"}</strong>
        </p>
      </section>
    );
  }

  const showProjectIdentification = [
    "seo18-checklist",
    "seo18-evidence",
    "seo18-defense",
  ].includes(activeKind);

  return (
    <section style={S.root}>
      <span style={S.badge}>
        ANÁLISIS SEO · SEMANA 18
      </span>

      <h2>{slide?.title || "Proyecto final"}</h2>

      <p style={S.success}>
        Las respuestas se guardan automáticamente
        en este navegador.
      </p>

      {showProjectIdentification && (
        <Card title="Identificación del equipo">
          <div style={S.grid}>
            <Field
              label="Nombre del equipo"
              value={data.team}
              onChange={(value) =>
                setField("team", value)
              }
            />

            <Field
              label="Empresa real investigada"
              value={data.company}
              onChange={(value) =>
                setField("company", value)
              }
            />
          </div>

          <Field
            label="Integrantes del equipo"
            value={data.members}
            multiline
            placeholder="Escribe los nombres de los integrantes"
            onChange={(value) =>
              setField("members", value)
            }
          />
        </Card>
      )}

      {activeKind === "seo18-checklist" && (
        <>
          <Card title="Revisión del informe ejecutivo">
            <p style={S.note}>
              Antes de comenzar las defensas,
              revisen el informe elaborado durante
              la Semana 17.
            </p>

            <Checklist
              items={REPORT_CHECKS}
              values={data.reportChecks}
              onChange={(index, value) =>
                setArrayItem(
                  "reportChecks",
                  index,
                  value
                )
              }
            />
          </Card>

          <Card title="Enlace al informe final">
            <Field
              label="URL del documento o archivo compartido"
              value={data.reportUrl}
              onChange={(value) =>
                setField("reportUrl", value)
              }
            />

            <p style={S.note}>
              El documento debe incluir el diagnóstico
              de la empresa real y diferenciar las
              propuestas de los resultados académicos.
            </p>
          </Card>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Semana 18 - Checklist del informe ejecutivo"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Integrantes: data.members,
              "Informe final": data.reportUrl,
              ...toChecklistAnswers(
                REPORT_CHECKS,
                data.reportChecks
              ),
            }}
          />
        </>
      )}

      {activeKind === "seo18-evidence" && (
        <>
          <Card title="Verificación de evidencias técnicas">
            <p style={S.note}>
              Las evidencias de analítica pertenecen
              a la web académica creada en la
              Semana 14, no a la empresa real.
            </p>

            <Checklist
              items={EVIDENCE_CHECKS}
              values={data.evidenceChecks}
              onChange={(index, value) =>
                setArrayItem(
                  "evidenceChecks",
                  index,
                  value
                )
              }
            />
          </Card>

          <Card title="Enlaces de evidencia">
            <Field
              label="URL de la web académica"
              value={data.academicUrl}
              onChange={(value) =>
                setField("academicUrl", value)
              }
            />

            <Field
              label="URL del roadmap de 90 días"
              value={data.roadmapUrl}
              onChange={(value) =>
                setField("roadmapUrl", value)
              }
            />

            <Field
              label="Evidencias y observaciones"
              multiline
              value={data.evidenceNotes}
              onChange={(value) =>
                setField("evidenceNotes", value)
              }
            />
          </Card>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Semana 18 - Evidencias técnicas"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Web académica": data.academicUrl,
              Roadmap: data.roadmapUrl,
              Observaciones: data.evidenceNotes,
              ...toChecklistAnswers(
                EVIDENCE_CHECKS,
                data.evidenceChecks
              ),
            }}
          />
        </>
      )}

      {activeKind === "seo18-defense" && (
        <>
          <Card
            title={
              slide?.round === 1
                ? "Primera ronda de defensas"
                : "Segunda ronda de defensas"
            }
          >
            <p style={S.note}>
              Cada equipo presentará su propuesta
              de consultoría ante el comité.
              Todos los integrantes deberán participar.
            </p>

            <ol>
              <li>Presentar la empresa y el problema.</li>
              <li>Mostrar los hallazgos SEO.</li>
              <li>Explicar la campaña SEM simulada.</li>
              <li>Defender las propuestas AEO y GEO.</li>
              <li>Mostrar la analítica académica.</li>
              <li>Explicar el roadmap y sus KPI.</li>
              <li>Responder las preguntas del comité.</li>
            </ol>

            <p style={S.note}>
              El docente distribuirá los 65 minutos
              disponibles entre ambas rondas según
              el número de equipos.
            </p>
          </Card>

          <Card title="Preguntas del comité">
            <p style={S.note}>
              Selecciona las preguntas pertinentes
              y registra las respuestas del equipo.
              No es necesario responder las doce
              durante la defensa.
            </p>

            {QUESTIONS.map((question, index) => (
              <Field
                key={index}
                label={`${index + 1}. ${question}`}
                value={data.defenseAnswers[index]}
                multiline
                onChange={(value) =>
                  setArrayItem(
                    "defenseAnswers",
                    index,
                    value
                  )
                }
              />
            ))}
          </Card>

          <Card title="Rúbrica de evaluación final">
            <p style={S.note}>
              Registro de evaluación para uso docente.
              La calificación debe validarse antes
              de ingresarla en Moodle.
            </p>

            <Field
              label="Nombre del docente evaluador"
              value={data.evaluator}
              onChange={(value) =>
                setField("evaluator", value)
              }
            />

            {RUBRIC.map((criterion, index) => (
              <div
                key={criterion.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) 110px",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <span>
                  {criterion.name}
                  <small style={{ display: "block" }}>
                    Máximo: {criterion.max} puntos
                  </small>
                </span>

                <input
                  type="number"
                  min={0}
                  max={criterion.max}
                  step={1}
                  style={S.input}
                  value={data.scores[index]}
                  onChange={(event) => {
                    const value = event.target.value;

                    if (value === "") {
                      setArrayItem(
                        "scores",
                        index,
                        ""
                      );
                      return;
                    }

                    const number = Number(value);

                    if (!Number.isFinite(number)) {
                      return;
                    }

                    const bounded = Math.max(
                      0,
                      Math.min(
                        criterion.max,
                        number
                      )
                    );

                    setArrayItem(
                      "scores",
                      index,
                      String(bounded)
                    );
                  }}
                />
              </div>
            ))}

            <div
              style={{
                padding: 18,
                borderRadius: 10,
                background: "#eef2f7",
                marginTop: 18,
                marginBottom: 18,
              }}
            >
              <strong style={{ fontSize: 26 }}>
                {total}/100
              </strong>

              <p style={S.note}>
                {evaluationComplete
                  ? "Todos los criterios están evaluados."
                  : "Evaluación incompleta: faltan criterios por puntuar."}
              </p>
            </div>

            <Field
              label="Observaciones del comité"
              multiline
              value={data.observations}
              onChange={(value) =>
                setField("observations", value)
              }
            />
          </Card>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Semana 18 - Defensa y rúbrica"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              Integrantes: data.members,
              Evaluador: data.evaluator,

              ...Object.fromEntries(
                RUBRIC.map((criterion, index) => [
                  `${criterion.name} (máximo ${criterion.max})`,
                  data.scores[index] === ""
                    ? "Pendiente"
                    : data.scores[index],
                ])
              ),

              "Puntuación registrada": total,
              "Evaluación completa":
                evaluationComplete ? "Sí" : "No",

              ...Object.fromEntries(
                QUESTIONS.map((question, index) => [
                  `Pregunta ${index + 1}: ${question}`,
                  data.defenseAnswers[index],
                ])
              ),

              Observaciones: data.observations,
            }}
          />
        </>
      )}

      {activeKind === "seo18-reflection" && (
        <>
          {slide?.id === 9 && (
            <Card title="Prioridades de implementación">
              <p style={S.note}>
                Imagina que la empresa aprueba
                únicamente una acción para comenzar.
                Selecciona la más importante y
                explica su impacto, esfuerzo y viabilidad.
              </p>

              <Field
                label="¿Qué implementarías primero y por qué?"
                multiline
                value={data.priorityAction}
                onChange={(value) =>
                  setField("priorityAction", value)
                }
              />
            </Card>
          )}

          {slide?.id === 10 && (
            <Card title="Reflexión sobre analítica">
              <p style={S.note}>
                Diferencia los hallazgos observados,
                los datos de la web académica y
                los resultados simulados.
              </p>

              <Field
                label="¿Qué aprendiste sobre los datos y sus limitaciones?"
                multiline
                value={data.dataLearning}
                onChange={(value) =>
                  setField("dataLearning", value)
                }
              />
            </Card>
          )}

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Semana 18 - Reflexión estratégica"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Primera acción recomendada":
                data.priorityAction,
              "Aprendizaje sobre analítica":
                data.dataLearning,
            }}
          />
        </>
      )}

      {activeKind === "seo18-portfolio" && (
        <>
          <Card title="Construye tu portafolio profesional">
            <p style={S.note}>
              Selecciona tres productos del semestre
              que demuestren tus competencias
              en posicionamiento y analítica digital.
            </p>

            {PORTFOLIO_PROMPTS.map((prompt, index) => (
              <Field
                key={index}
                label={`Pieza ${index + 1}: ${prompt}`}
                value={data.portfolio[index]}
                onChange={(value) =>
                  setArrayItem(
                    "portfolio",
                    index,
                    value
                  )
                }
              />
            ))}

            <Field
              label="Autoevaluación: ¿qué competencia desarrollaste más?"
              multiline
              value={data.selfEvaluation}
              onChange={(value) =>
                setField("selfEvaluation", value)
              }
            />
          </Card>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Semana 18 - Portafolio profesional"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Pieza 1": data.portfolio[0],
              "Pieza 2": data.portfolio[1],
              "Pieza 3": data.portfolio[2],
              Autoevaluación: data.selfEvaluation,
            }}
          />
        </>
      )}

      {activeKind === "seo18-final" && (
        <>
          <Card title="Cierre del proyecto integrador">
            <p>
              Durante dieciocho semanas desarrollaste
              un proyecto de consultoría digital,
              desde el diagnóstico hasta la defensa
              de una propuesta estratégica.
            </p>

            <p>
              El resultado no es solamente un informe:
              es un portafolio de competencias
              aplicadas a un caso empresarial real.
            </p>
          </Card>

          <Card title="Compromiso profesional">
            <Field
              label="¿Qué mejorarías si continuaras este proyecto?"
              multiline
              value={data.finalCommitment}
              onChange={(value) =>
                setField(
                  "finalCommitment",
                  value
                )
              }
            />
          </Card>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Semana 18 - Cierre del semestre"
            answers={{
              Equipo: data.team,
              Empresa: data.company,
              "Compromiso profesional":
                data.finalCommitment,
              Autoevaluación: data.selfEvaluation,
            }}
          />
        </>
      )}
    </section>
  );
}
