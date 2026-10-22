
import { useState } from "react";
import "../../styles/contenidoSemana08.css";

const DEFAULT_COLORS = [
  { role: "Principal", hex: "#263F36", reason: "" },
  { role: "Secundario", hex: "#B86B3D", reason: "" },
  { role: "Fondo", hex: "#EAD9BC", reason: "" },
  { role: "Texto", hex: "#25221F", reason: "" },
  { role: "Superficie", hex: "#F5F0E6", reason: "" },
];

const STEPS = [
  ["Dirección visual", 10],
  ["Paleta cromática", 10],
  ["Tipografías y logotipo", 10],
  ["Tres piezas rediseñadas", 20],
  ["Control de calidad", 5],
  ["Entrega y presentación", 5],
];

const createPiece = (type) => ({
  type,
  previous: "",
  changes: "",
  copy: "",
  cta: "",
  link: "",
});

function initialData() {
  return {
    team: "",
    brand: "",
    audience: "",
    concept: "",
    personality: "",
    moodboard: "",
    visualDirection: "",
    photography: "",
    colors: DEFAULT_COLORS.map((c) => ({ ...c })),
    aiNotes: "",
    headingFont: "",
    bodyFont: "",
    typographyReason: "",
    logoConcept: "",
    logoVariants: "",
    logoLink: "",
    logoReason: "",
    pieces: [
      createPiece("Publicación estática"),
      createPiece("Historia"),
      createPiece("Carrusel"),
    ],
    manualLink: "",
    templateLink: "",
    presentation: "",
    decisions: "",
    checks: [false, false, false, false, false],
    completed: Array(6).fill(false),
  };
}

function getKey(lessonId, studentName) {
  return `aula:contenido:semana08:${lessonId}:${String(
    studentName || "sin-nombre"
  ).trim().toLowerCase()}`;
}

function loadSaved(key) {
  const defaults = initialData();
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return defaults;

    return {
      ...defaults,
      ...saved,
      colors: defaults.colors.map((c, i) => ({
        ...c,
        ...(saved.colors?.[i] || {}),
      })),
      pieces: defaults.pieces.map((p, i) => ({
        ...p,
        ...(saved.pieces?.[i] || {}),
      })),
      checks: defaults.checks.map((_, i) =>
        Boolean(saved.checks?.[i])
      ),
      completed: defaults.completed.map((_, i) =>
        Boolean(saved.completed?.[i])
      ),
    };
  } catch {
    return defaults;
  }
}

function validHex(value) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

function luminance(hex) {
  const channels = [1, 3, 5].map((start) =>
    parseInt(hex.slice(start, start + 2), 16) / 255
  );
  const linear = channels.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );
  return (
    linear[0] * 0.2126 +
    linear[1] * 0.7152 +
    linear[2] * 0.0722
  );
}

function contrastRatio(a, b) {
  if (!validHex(a) || !validHex(b)) return null;
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) /
    (Math.min(l1, l2) + 0.05);
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = true,
}) {
  return (
    <label className="identity8-field">
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
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function StepHeader({ index, description }) {
  return (
    <div className="identity8-step-header">
      <span className="identity8-step-number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <small>{STEPS[index][1]} MINUTOS</small>
        <h3>{STEPS[index][0]}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function ContentWeek08Workshop({
  lessonId = "contenido-semana-8",
  studentName = "",
}) {
  const key = getKey(lessonId, studentName);

  const [stored, setStored] = useState(() => ({
    key,
    data: loadSaved(key),
  }));

  const data = stored.key === key ? stored.data : loadSaved(key);

  function update(changes) {
    const next = { ...data, ...changes };
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // El formulario continúa funcionando.
    }
    setStored({ key, data: next });
  }

  function setField(name, value) {
    update({ [name]: value });
  }

  function updateColor(index, changes) {
    update({
      colors: data.colors.map((c, i) =>
        i === index ? { ...c, ...changes } : c
      ),
    });
  }

  function updatePiece(index, changes) {
    update({
      pieces: data.pieces.map((p, i) =>
        i === index ? { ...p, ...changes } : p
      ),
    });
  }

  function toggleCheck(index, value) {
    update({
      checks: data.checks.map((c, i) =>
        i === index ? value : c
      ),
    });
  }

  function toggleStep(index, value) {
    update({
      completed: data.completed.map((c, i) =>
        i === index ? value : c
      ),
    });
  }

  const completedCount = data.completed.filter(Boolean).length;
  const progress = Math.round((completedCount / 6) * 100);

  const color = (index) =>
    validHex(data.colors[index].hex)
      ? data.colors[index].hex
      : DEFAULT_COLORS[index].hex;

  const contrast = contrastRatio(
    data.colors[3].hex,
    data.colors[2].hex
  );

  const prompt = `Actúa como director de arte especializado en identidad visual.

MARCA: ${data.brand || "[Nombre de marca]"}
AUDIENCIA: ${data.audience || "[Buyer Persona]"}
CONCEPTO DE CAMPAÑA: ${data.concept || "[Concepto]"}
PERSONALIDAD: ${data.personality || "[Personalidad]"}
MOODBOARD: ${data.moodboard || "[Referencias]"}
DIRECCIÓN VISUAL: ${data.visualDirection || "[Dirección]"}

Propón tres direcciones cromáticas diferentes.

Para cada dirección incluye:
- Cinco colores con códigos HEX.
- Función de cada color.
- Justificación relacionada con la audiencia.
- Combinaciones recomendadas de texto y fondo.
- Estilo visual y fotográfico sugerido.

Evita propuestas genéricas.
No inventes resultados de investigación.
No afirmes que un contraste es accesible sin verificarlo.
Presenta las alternativas en una tabla.`;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      window.prompt("Copia el siguiente prompt:", prompt);
    }
  }

  const field = (name, label, placeholder = "", multiline = true) => (
    <Field
      label={label}
      value={data[name]}
      onChange={(value) => setField(name, value)}
      placeholder={placeholder}
      multiline={multiline}
    />
  );

  const done = (index) => (
    <label className="identity8-done">
      <input
        type="checkbox"
        checked={data.completed[index]}
        onChange={(e) => toggleStep(index, e.target.checked)}
      />
      Marcar etapa como completada
    </label>
  );

  return (
    <div className="identity8">
      <header className="identity8-hero">
        <span className="identity8-eyebrow">
          AULA DIGITAL · LABORATORIO 08 · 60 MINUTOS
        </span>
        <h2>Diseña la identidad de tu café.</h2>
        <p>
          Convierte tu estrategia en un sistema visual
          reconocible, coherente y reutilizable.
        </p>

        <div className="identity8-progress-label">
          <strong>Progreso del laboratorio</strong>
          <span>{completedCount}/6 etapas · {progress}%</span>
        </div>
        <div
          className="identity8-progress"
          role="progressbar"
          aria-label="Progreso del laboratorio"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section className="identity8-panel">
        <h3>Recupera tu estrategia de marca</h3>
        <p className="identity8-description">
          Utiliza el Buyer Persona, el concepto creativo
          y el moodboard de las semanas anteriores.
        </p>
        <div className="identity8-grid">
          {field("team", "Equipo", "Equipo 01", false)}
          {field("brand", "Marca de café", "Nombre de la marca", false)}
        </div>
        {field("audience", "Buyer Persona", "Describe a tu consumidor.")}
        {field(
          "concept",
          "Concepto creativo de la Semana 6",
          "¿Qué idea conecta tu campaña?"
        )}
      </section>

      {/* ETAPA 1 */}
      <section className="identity8-panel">
        <StepHeader
          index={0}
          description="Analiza tu moodboard y define la personalidad gráfica de la marca."
        />
        {field(
          "personality",
          "Tres atributos de personalidad",
          "Ej. Cálida, artesanal, contemporánea."
        )}
        {field(
          "moodboard",
          "Hallazgos del moodboard",
          "¿Qué patrones observaste en las cinco referencias?"
        )}
        {field(
          "visualDirection",
          "Dirección visual elegida",
          "Describe cómo debe verse tu marca."
        )}
        {field(
          "photography",
          "Estilo fotográfico",
          "Luz, escenarios, encuadres, sujetos y tratamiento."
        )}
        <div className="identity8-hint">
          No elijas una estética solamente porque está de moda.
          Relaciónala con el consumidor y el concepto de campaña.
        </div>
        {done(0)}
      </section>

      {/* ETAPA 2 */}
      <section className="identity8-panel">
        <StepHeader
          index={1}
          description="Define cinco colores funcionales, comprueba el contraste y justifica tus decisiones."
        />

        <div className="identity8-palette">
          {data.colors.map((item, index) => (
            <div className="identity8-color-card" key={item.role}>
              <div
                className="identity8-color-swatch"
                style={{ backgroundColor: color(index) }}
              />
              <strong>{item.role}</strong>

              <div className="identity8-color-inputs">
                <input
                  type="color"
                  aria-label={`Elegir color ${item.role}`}
                  value={color(index)}
                  onChange={(e) =>
                    updateColor(index, { hex: e.target.value })
                  }
                />
                <input
                  type="text"
                  aria-label={`Código HEX ${item.role}`}
                  value={item.hex}
                  maxLength={7}
                  onChange={(e) =>
                    updateColor(index, {
                      hex: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>

              {!validHex(item.hex) && (
                <small className="identity8-error">
                  Introduce un HEX de seis dígitos.
                </small>
              )}

              <Field
                label="¿Por qué este color?"
                value={item.reason}
                onChange={(value) =>
                  updateColor(index, { reason: value })
                }
                placeholder="Justifica su función."
              />
            </div>
          ))}
        </div>

        <div className="identity8-preview-heading">
          <h4>Vista previa de identidad</h4>
          <span>Se actualiza con tu paleta</span>
        </div>

        <div
          className="identity8-brand-preview"
          style={{
            backgroundColor: color(2),
            color: color(3),
          }}
        >
          <div
            className="identity8-preview-top"
            style={{ backgroundColor: color(0) }}
          >
            <span style={{ color: color(4) }}>
              IDENTIDAD VISUAL · PRIMERA VERSIÓN
            </span>
          </div>

          <div className="identity8-preview-body">
            <span
              className="identity8-preview-kicker"
              style={{ color: color(0) }}
            >
              CAFÉ DE AUTOR
            </span>
            <h3>{data.brand || "TU MARCA DE CAFÉ"}</h3>
            <p>
              {data.concept ||
                "Aquí aparecerá el concepto creativo de tu campaña."}
            </p>
            <span
              className="identity8-preview-button"
              style={{
                backgroundColor: color(1),
                color: color(3),
              }}
            >
              Descubre nuestra historia
            </span>
          </div>
        </div>

        <div className="identity8-contrast">
          <div>
            <strong>Contraste: texto sobre fondo</strong>
            <p>
              Combinación: {data.colors[3].hex} /{" "}
              {data.colors[2].hex}
            </p>
          </div>

          <div>
            <strong>
              {contrast === null
                ? "HEX inválido"
                : `${contrast.toFixed(2)}:1`}
            </strong>
            <span>
              {contrast === null
                ? "Corrige los colores"
                : contrast >= 4.5
                ? "Cumple AA para texto normal"
                : contrast >= 3
                ? "Solo alcanza AA para texto grande"
                : "Contraste insuficiente"}
            </span>
          </div>
        </div>

        <div className="identity8-hint">
          Para texto normal, WCAG AA exige al menos 4.5:1.
          Para texto grande, al menos 3:1.
          Comprueba también las demás combinaciones que utilices.
        </div>

        <div className="identity8-prompt">
          <div className="identity8-prompt-top">
            <strong>PROMPT DE EXPLORACIÓN CROMÁTICA</strong>
            <button
              type="button"
              className="identity8-button"
              onClick={copyPrompt}
            >
              Copiar prompt
            </button>
          </div>
          <pre>{prompt}</pre>
        </div>

        {field(
          "aiNotes",
          "¿Qué aceptaste, modificaste o descartaste de la IA?",
          "La decisión final debe estar fundamentada."
        )}

        {done(1)}
      </section>

      {/* ETAPA 3 */}
      <section className="identity8-panel">
        <StepHeader
          index={2}
          description="Selecciona tipografías disponibles y crea un logotipo inicial editable."
        />

        <div className="identity8-grid">
          {field(
            "headingFont",
            "Tipografía para títulos",
            "Ej. Montserrat",
            false
          )}
          {field(
            "bodyFont",
            "Tipografía para textos",
            "Ej. Open Sans",
            false
          )}
        </div>

        {field(
          "typographyReason",
          "Justificación tipográfica",
          "Explica personalidad, jerarquía y legibilidad."
        )}

        {field(
          "logoConcept",
          "Concepto del logotipo",
          "¿Qué elementos visuales representan a la marca?"
        )}

        {field(
          "logoVariants",
          "Variantes creadas",
          "Ej. Principal, monocromática, símbolo y horizontal."
        )}

        {field(
          "logoReason",
          "Justificación del logotipo",
          "Explica simplicidad, legibilidad y relación con la marca."
        )}

        {field(
          "logoLink",
          "Enlace al logotipo editable",
          "Enlace de Canva, Figma o Drive.",
          false
        )}

        <div className="identity8-hint">
          La vista previa de esta aplicación no sustituye
          el archivo editable del logotipo.
          Comprueba su lectura en tamaños pequeños.
        </div>

        {done(2)}
      </section>

      {/* ETAPA 4 */}
      <section className="identity8-panel">
        <StepHeader
          index={3}
          description="Rediseña tres publicaciones anteriores utilizando la identidad visual creada."
        />

        <div className="identity8-pieces">
          {data.pieces.map((piece, index) => (
            <div className="identity8-piece" key={index}>
              <div className="identity8-piece-heading">
                <strong>PIEZA {index + 1}</strong>
                <span>{piece.type}</span>
              </div>

              <Field
                label="Publicación original"
                value={piece.previous}
                onChange={(value) =>
                  updatePiece(index, { previous: value })
                }
                placeholder="¿Qué pieza de una semana anterior rediseñarás?"
              />

              <Field
                label="Cambios realizados"
                value={piece.changes}
                onChange={(value) =>
                  updatePiece(index, { changes: value })
                }
                placeholder="Color, tipografía, composición, imágenes."
              />

              <Field
                label="Copy final"
                value={piece.copy}
                onChange={(value) =>
                  updatePiece(index, { copy: value })
                }
                placeholder="Texto final de la publicación."
              />

              <Field
                label="CTA"
                value={piece.cta}
                onChange={(value) =>
                  updatePiece(index, { cta: value })
                }
                placeholder="Llamado a la acción."
                multiline={false}
              />

              <Field
                label="Enlace a la pieza rediseñada"
                value={piece.link}
                onChange={(value) =>
                  updatePiece(index, { link: value })
                }
                placeholder="https://..."
                multiline={false}
              />
            </div>
          ))}
        </div>

        <div className="identity8-hint">
          Conserva las versiones anteriores para demostrar
          el antes y después. Las tres piezas deben compartir
          un sistema visual, no necesariamente el mismo diseño.
        </div>

        {done(3)}
      </section>

      {/* ETAPA 5 */}
      <section className="identity8-panel">
        <StepHeader
          index={4}
          description="Revisa la calidad técnica y la coherencia del sistema visual."
        />

        <div className="identity8-checklist">
          {[
            "La paleta tiene cinco colores y funciones definidas.",
            "Las combinaciones de texto y fondo son legibles.",
            "Las tipografías tienen jerarquía y están disponibles.",
            "El logotipo funciona en distintos tamaños.",
            "Las tres piezas se reconocen como una misma marca.",
          ].map((label, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={data.checks[index]}
                onChange={(e) =>
                  toggleCheck(index, e.target.checked)
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        {done(4)}
      </section>

      {/* ETAPA 6 */}
      <section className="identity8-panel">
        <StepHeader
          index={5}
          description="Organiza las evidencias y prepara la defensa visual de tu marca."
        />

        {field(
          "decisions",
          "¿Qué decisiones visuales tomó el equipo?",
          "Justifica color, tipografía, logotipo y composición."
        )}

        {field(
          "presentation",
          "Argumentos para la presentación",
          "¿Por qué esta identidad representa al Buyer Persona?"
        )}

        <div className="identity8-grid">
          {field(
            "manualLink",
            "Enlace al mini manual",
            "PDF o documento de trabajo.",
            false
          )}
          {field(
            "templateLink",
            "Enlace a plantillas y evidencias",
            "Carpeta compartida.",
            false
          )}
        </div>

        <div className="identity8-rubric">
          <h4>Rúbrica del laboratorio · 50 puntos</h4>
          {[
            ["Paleta cromática y justificación", 10],
            ["Tipografías y jerarquía visual", 10],
            ["Logotipo inicial y aplicación", 10],
            ["Tres publicaciones rediseñadas", 15],
            ["Presentación y argumentación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points}</strong>
            </div>
          ))}
        </div>

        {done(5)}
      </section>

      <footer className="identity8-footer">
        <h3>
          {completedCount === 6
            ? "Laboratorio completado"
            : `${completedCount} de 6 etapas completadas`}
        </h3>
        <p>
          Las respuestas se guardan automáticamente en
          este navegador. Entrega el manual, el logotipo
          y las piezas editables en Moodle.
        </p>
      </footer>
    </div>
  );
}
