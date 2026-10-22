import { useState } from "react";
import "../../styles/contenidoSemana04.css";

const STEPS = [
  { title: "Voz y tono de marca", minutes: 10 },
  { title: "Cinco mensajes", minutes: 15 },
  { title: "Mejorar publicaciones", minutes: 10 },
  { title: "Pieza promocional", minutes: 15 },
  { title: "Revisión de calidad", minutes: 5 },
  { title: "Entrega y defensa", minutes: 5 },
];

const EMPTY = {
  team: "",
  brand: "",
  persona: "",
  consumerNeed: "",
  personality: "",
  trait1: "",
  trait2: "",
  trait3: "",
  voice: "",
  tone: "",
  wordsUse: "",
  wordsAvoid: "",
  exampleVoice: "",
  messageBrand: "",
  messageEducational: "",
  messageEmotional: "",
  messageCommercial: "",
  messageCta: "",
  previous1: "",
  improved1: "",
  reason1: "",
  previous2: "",
  improved2: "",
  reason2: "",
  promoTitle: "",
  promoBody: "",
  promoCta: "",
  promoCaption: "",
  promoGoal: "",
  promoAudience: "",
  promoLink: "",
  promoDesign: "",
  reviewClarity: false,
  reviewVoice: false,
  reviewSpelling: false,
  reviewEvidence: false,
  reviewCta: false,
  justification: "",
  presentation: "",
  deliveryLink: "",
  reflection: "",
  completed: [false, false, false, false, false, false],
};

function makeKey(lessonId, studentName) {
  return `aula:contenido:semana04:${lessonId}:${String(
    studentName || "sin-nombre",
  )
    .trim()
    .toLowerCase()}`;
}

function readSaved(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return { ...EMPTY, completed: [...EMPTY.completed] };
    }

    return {
      ...EMPTY,
      ...saved,
      completed: STEPS.map((_, index) => Boolean(saved.completed?.[index])),
    };
  } catch {
    return { ...EMPTY, completed: [...EMPTY.completed] };
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  hint = "",
}) {
  return (
    <label className="copy4-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );
}

function StepTitle({ index, description }) {
  const step = STEPS[index];

  return (
    <div className="copy4-step-title">
      <span className="copy4-step-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <span className="copy4-time">{step.minutes} MINUTOS</span>
        <h3>{step.title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Done({ checked, onChange }) {
  return (
    <label className="copy4-done">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      Etapa completada
    </label>
  );
}

export default function ContentWeek04Workshop({
  lessonId = "contenido-semana-4",
  studentName = "",
}) {
  const key = makeKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: readSaved(key),
  }));

  const data = stored.key === key ? stored.data : readSaved(key);

  function update(changes) {
    const next = { ...data, ...changes };

    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // La actividad sigue funcionando sin almacenamiento.
    }

    setStored({ key, data: next });
  }

  function change(field, value) {
    update({ [field]: value });
  }

  function finishStep(index, value) {
    const completed = [...data.completed];
    completed[index] = value;
    update({ completed });
  }

  const count = data.completed.filter(Boolean).length;
  const progress = Math.round((count / STEPS.length) * 100);

  const fields = (items) =>
    items.map((item) => (
      <Field
        key={item.key}
        label={item.label}
        value={data[item.key]}
        onChange={(value) => change(item.key, value)}
        placeholder={item.placeholder || ""}
        multiline={item.multiline ?? true}
      />
    ));

  const done = (index) => (
    <Done
      checked={data.completed[index]}
      onChange={(value) => finishStep(index, value)}
    />
  );

  return (
    <div className="copy4">
      <header className="copy4-hero">
        <span className="copy4-eyebrow">
          LABORATORIO 04 · DISEÑO PARA GENERACIÓN DE CONTENIDO
        </span>
        <h2>Dale voz a tu café.</h2>
        <p>
          No escribas solamente frases bonitas. Escribe mensajes que respondan a
          las necesidades de tu consumidor.
        </p>

        <div className="copy4-progress-label">
          <strong>Progreso del laboratorio</strong>
          <span>
            {count} de 6 etapas · {progress}%
          </span>
        </div>

        <div
          className="copy4-progress"
          role="progressbar"
          aria-label="Progreso del laboratorio"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section className="copy4-panel">
        <h3>Continuamos nuestra marca de café</h3>
        <p className="copy4-description">
          Recupera el Buyer Persona y la necesidad identificada en las semanas
          anteriores.
        </p>

        <div className="copy4-grid">
          {fields([
            {
              key: "team",
              label: "Nombre del equipo",
              placeholder: "Equipo 01",
              multiline: false,
            },
            {
              key: "brand",
              label: "Marca de café",
              placeholder: "Nombre de la marca",
              multiline: false,
            },
          ])}
        </div>

        {fields([
          {
            key: "persona",
            label: "¿Quién es nuestro Buyer Persona?",
            placeholder: "Describe al consumidor investigado.",
          },
          {
            key: "consumerNeed",
            label: "¿Qué necesidad vamos a atender?",
            placeholder: "Utiliza un hallazgo de la Semana 3.",
          },
        ])}
      </section>

      {/* ETAPA 1 */}
      <section className="copy4-panel">
        <StepTitle
          index={0}
          description="Define cómo habla tu marca y qué personalidad debe transmitir."
        />

        <div className="copy4-grid">
          {fields([
            {
              key: "personality",
              label: "Si tu marca fuera una persona, ¿cómo sería?",
              placeholder: "Ej. Amigable, experta, auténtica...",
            },
            {
              key: "voice",
              label: "Voz de marca",
              placeholder: "Describe su personalidad constante.",
            },
          ])}
        </div>

        <h4>Tres características del tono</h4>
        <div className="copy4-grid copy4-grid--three">
          {fields([
            {
              key: "trait1",
              label: "Característica 1",
              placeholder: "Ej. Cercano",
              multiline: false,
            },
            {
              key: "trait2",
              label: "Característica 2",
              placeholder: "Ej. Optimista",
              multiline: false,
            },
            {
              key: "trait3",
              label: "Característica 3",
              placeholder: "Ej. Claro",
              multiline: false,
            },
          ])}
        </div>

        {fields([
          {
            key: "tone",
            label: "¿Cómo cambia el tono según la situación?",
            placeholder: "Ej. Educativo al enseñar y directo al promocionar.",
          },
        ])}

        <div className="copy4-grid">
          {fields([
            {
              key: "wordsUse",
              label: "Palabras o expresiones que sí utilizaremos",
              placeholder: "Ej. Descubre, disfruta, aprende...",
            },
            {
              key: "wordsAvoid",
              label: "Palabras o expresiones que evitaremos",
              placeholder: "Ej. Promesas exageradas o lenguaje agresivo.",
            },
          ])}
        </div>

        {fields([
          {
            key: "exampleVoice",
            label: "Reescribe «Prueba nuestro café» con tu voz de marca",
            placeholder: "Escribe una versión coherente con tu personalidad.",
          },
        ])}

        {done(0)}
      </section>

      {/* ETAPA 2 */}
      <section className="copy4-panel">
        <StepTitle
          index={1}
          description="Redacta cinco mensajes con objetivos de comunicación diferentes."
        />

        <div className="copy4-hint">
          Cada mensaje debe tener un propósito. No utilices exactamente el mismo
          texto para todos los objetivos.
        </div>

        {fields([
          {
            key: "messageBrand",
            label: "1. Presentación de marca",
            placeholder:
              "¿Cómo presentarías tu marca a alguien que no la conoce?",
          },
          {
            key: "messageEducational",
            label: "2. Contenido educativo",
            placeholder: "¿Qué información útil puedes enseñar sobre café?",
          },
          {
            key: "messageEmotional",
            label: "3. Conexión emocional",
            placeholder: "¿Con qué experiencia o emoción puedes conectar?",
          },
          {
            key: "messageCommercial",
            label: "4. Promoción comercial",
            placeholder:
              "Presenta una oferta realista, sin descuentos inventados.",
          },
          {
            key: "messageCta",
            label: "5. Llamado a la acción",
            placeholder: "Ej. Descubre nuestras variedades de café.",
          },
        ])}

        {done(1)}
      </section>

      {/* ETAPA 3 */}
      <section className="copy4-panel">
        <StepTitle
          index={2}
          description="Recupera dos publicaciones de la Semana 3 y mejora sus textos."
        />

        <div className="copy4-subpanel">
          <h4>Publicación anterior 1</h4>
          {fields([
            {
              key: "previous1",
              label: "Texto original",
              placeholder: "Copia el mensaje anterior.",
            },
            {
              key: "improved1",
              label: "Texto mejorado",
              placeholder:
                "Reescribe con beneficio, voz de marca y CTA apropiado.",
            },
            {
              key: "reason1",
              label: "¿Por qué es mejor?",
              placeholder: "Explica la decisión de copywriting.",
            },
          ])}
        </div>

        <div className="copy4-subpanel">
          <h4>Publicación anterior 2</h4>
          {fields([
            {
              key: "previous2",
              label: "Texto original",
              placeholder: "Copia el segundo mensaje anterior.",
            },
            {
              key: "improved2",
              label: "Texto mejorado",
              placeholder: "Escribe la nueva versión.",
            },
            {
              key: "reason2",
              label: "¿Por qué es mejor?",
              placeholder: "Explica la mejora realizada.",
            },
          ])}
        </div>

        {done(2)}
      </section>

      {/* ETAPA 4 */}
      <section className="copy4-panel">
        <StepTitle
          index={3}
          description="Crea una nueva publicación promocional con un CTA claro y creíble."
        />

        <div className="copy4-grid">
          {fields([
            {
              key: "promoTitle",
              label: "Título de la pieza",
              placeholder: "Escribe un título breve.",
              multiline: false,
            },
            {
              key: "promoGoal",
              label: "Objetivo de comunicación",
              placeholder: "Ej. Solicitar información.",
              multiline: false,
            },
          ])}
        </div>

        {fields([
          {
            key: "promoAudience",
            label: "Público y necesidad",
            placeholder: "¿A quién va dirigida y por qué?",
          },
          {
            key: "promoBody",
            label: "Mensaje principal",
            placeholder: "Describe un beneficio relevante del producto.",
          },
          {
            key: "promoCta",
            label: "Llamado a la acción",
            placeholder: "¿Qué debe hacer el consumidor?",
          },
          {
            key: "promoCaption",
            label: "Texto de acompañamiento",
            placeholder: "Escribe el copy que acompañaría a la imagen.",
          },
          {
            key: "promoDesign",
            label: "Descripción visual",
            placeholder: "¿Cómo organizaste título, imagen, mensaje y CTA?",
          },
        ])}

        <Field
          label="Enlace al diseño terminado"
          value={data.promoLink}
          onChange={(value) => change("promoLink", value)}
          placeholder="Enlace de Canva, Slides o archivo compartido"
          hint="Comprueba que el enlace tenga permisos de visualización."
        />

        {done(3)}
      </section>

      {/* ETAPA 5 */}
      <section className="copy4-panel">
        <StepTitle
          index={4}
          description="Revisa la calidad de todos los mensajes antes de presentarlos."
        />

        <div className="copy4-checklist">
          {[
            ["reviewClarity", "Los mensajes son claros y comprensibles."],
            ["reviewVoice", "La voz de marca es coherente."],
            ["reviewSpelling", "Revisamos ortografía y redacción."],
            ["reviewEvidence", "No utilizamos promesas falsas."],
            ["reviewCta", "Los CTA proponen acciones concretas."],
          ].map(([field, label]) => (
            <label key={field}>
              <input
                type="checkbox"
                checked={data[field]}
                onChange={(e) => change(field, e.target.checked)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        {done(4)}
      </section>

      {/* ETAPA 6 */}
      <section className="copy4-panel">
        <StepTitle
          index={5}
          description="Prepara la entrega y explica por qué funcionarían tus mensajes."
        />

        {fields([
          {
            key: "justification",
            label: "Justificación de las decisiones",
            placeholder: "Relaciona voz, Buyer Persona, beneficio y CTA.",
          },
          {
            key: "presentation",
            label: "¿Qué mensaje presentará el equipo?",
            placeholder: "Explica qué necesidad atiende y qué respuesta busca.",
          },
          {
            key: "reflection",
            label: "¿Qué aprendimos sobre copywriting?",
            placeholder: "¿Qué cambió al revisar nuestros mensajes?",
          },
        ])}

        <Field
          label="Enlace a la entrega"
          value={data.deliveryLink}
          onChange={(value) => change("deliveryLink", value)}
          placeholder="Carpeta o archivo de entrega"
        />

        <div className="copy4-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Voz y tono de marca", 10],
            ["Cinco mensajes", 15],
            ["Mejora de dos publicaciones", 10],
            ["Nueva pieza promocional y CTA", 10],
            ["Justificación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points}</strong>
            </div>
          ))}
        </div>

        {done(5)}
      </section>

      <footer className="copy4-footer">
        <h3>
          {count === 6
            ? "Laboratorio completado"
            : `${count} de 6 etapas completadas`}
        </h3>
        <p>
          Tus respuestas se guardan automáticamente en este navegador. Entrega
          los diseños y las evidencias en Moodle.
        </p>
      </footer>
    </div>
  );
}
