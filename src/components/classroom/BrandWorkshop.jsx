
import { useState } from "react";
import { getLessonWork, saveLessonWork } from "../../services/storage";

const COURSE = "contenido";
const WEEK = 1;

const EMPTY = {
  team: "",
  brand: "",
  concept: "",
  differentiation: "",
  audience: "",
  platform: "",
  reason: "",
  push: "",
  pull: "",
  aiReview: "",
};

const fields = [
  {
    key: "team",
    label: "Nombre del equipo",
    type: "input",
    placeholder: "Ej. Equipo Creativo",
  },
  {
    key: "brand",
    label: "Nombre de la marca",
    type: "input",
    placeholder: "Ej. Café Horizonte",
  },
  {
    key: "concept",
    label: "Concepto de la marca",
    placeholder: "¿Qué representa nuestra marca?",
  },
  {
    key: "differentiation",
    label: "¿Qué nos hace diferentes?",
    placeholder: "Explica por qué alguien elegiría esta marca.",
  },
  {
    key: "audience",
    label: "Público inicial",
    placeholder: "¿A quién queremos llegar?",
  },
  {
    key: "reason",
    label: "¿Por qué elegimos esta plataforma?",
    placeholder: "Justifica según público, formato y objetivo.",
  },
  {
    key: "push",
    label: "Propuesta PUSH",
    placeholder: "Redacta el mensaje y explica qué acción buscas.",
  },
  {
    key: "pull",
    label: "Propuesta PULL",
    placeholder: "Redacta un contenido de valor y justifica su propósito.",
  },
  {
    key: "aiReview",
    label: "Revisión y mejora de la propuesta",
    placeholder: "¿Qué mejoraron? ¿Qué sugerencia de IA aceptaron o rechazaron y por qué?",
  },
];

export default function BrandWorkshop({ lesson }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    ...getLessonWork(COURSE, WEEK).work,
  }));

  const [status, setStatus] = useState("");

  const platforms = Array.isArray(lesson?.platforms)
    ? lesson.platforms
    : [];

  function update(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);

    const success = saveLessonWork(COURSE, WEEK, {
      work: next,
    });

    setStatus(
      success
        ? "Respuestas guardadas en este dispositivo."
        : "No se pudo guardar. Revisa el almacenamiento del navegador."
    );
  }

  return (
    <section className="interactive-panel brand-workshop">
      <div className="workshop-heading">
        <div>
          <span className="lesson-kicker">TALLER PRÁCTICO · 60 MINUTOS</span>
          <h3>Construye tu propia marca de café</h3>
          <p>
            Completa las decisiones de tu equipo. Estas respuestas
            se incorporarán al PDF final de la Semana 1.
          </p>
        </div>
      </div>

      <div className="workshop-grid">
        {fields.slice(0, 5).map((field) => (
          <label
            className="workshop-field workshop-field--full"
            key={field.key}
          >
            <span>{field.label}</span>
            {field.type === "input" ? (
              <input
                value={form[field.key]}
                placeholder={field.placeholder}
                onChange={(event) =>
                  update(field.key, event.target.value)
                }
              />
            ) : (
              <textarea
                rows={3}
                value={form[field.key]}
                placeholder={field.placeholder}
                onChange={(event) =>
                  update(field.key, event.target.value)
                }
              />
            )}
          </label>
        ))}

        <label className="workshop-field workshop-field--full">
          <span>Plataforma digital principal</span>
          <select
            value={form.platform}
            onChange={(event) =>
              update("platform", event.target.value)
            }
          >
            <option value="">Selecciona una plataforma</option>
            {platforms.map((platform) => (
              <option key={platform.name} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </label>

        {fields.slice(5).map((field) => (
          <label
            className="workshop-field workshop-field--full"
            key={field.key}
          >
            <span>{field.label}</span>
            <textarea
              rows={3}
              value={form[field.key]}
              placeholder={field.placeholder}
              onChange={(event) =>
                update(field.key, event.target.value)
              }
            />
          </label>
        ))}
      </div>

      <p className="workshop-save-status" role="status">
        {status || "Los cambios se guardan automáticamente."}
      </p>
    </section>
  );
}
