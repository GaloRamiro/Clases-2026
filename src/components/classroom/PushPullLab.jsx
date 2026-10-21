
import { useEffect, useState } from "react";
import "./PushPullLab.css";

const CASES = [
  {
    id: "case1",
    title: "Lanzamiento de un nuevo café",
    message:
      "¡Llegó nuestro nuevo café de origen! Conoce las presentaciones y realiza tu pedido hoy.",
    image: "/public/images/push.jpg",
    answer: "PUSH",
    explanation:
      "Promociona un producto y solicita una acción comercial directa.",
  },
  {
    id: "case2",
    title: "Aprende a preparar café",
    message:
      "Tres errores que debes evitar para conseguir un café con mejor sabor.",
    image: "/public/images/pull1.jpg",
    answer: "PULL",
    explanation:
      "Atrae al consumidor con información útil sin solicitar una compra inmediata.",
  },
  {
    id: "case3",
    title: "Promoción especial",
    message:
      "Esta semana tenemos un 20 % de descuento en nuestra selección de café.",
    image: "/public/images/push2.jpg",
    answer: "PUSH",
    explanation:
      "Presenta una oferta comercial para incentivar la compra.",
  },
  {
    id: "case4",
    title: "El origen del sabor",
    message:
      "¿Cómo influye la altura del cultivo en el sabor de una taza de café?",
    image: "/public/images/pull2.webp",
    answer: "PULL",
    explanation:
      "Genera interés mediante contenido educativo relacionado con el producto.",
  },
];

const EMPTY = {
  cases: {},
  creation: {
    push: "",
    pushReason: "",
    pull: "",
    pullReason: "",
    platform: "",
  },
  checked: false,
};

export const getPushPullLabKey = (lessonId, studentName) =>
  `aula:pushpull:${lessonId}:${studentName.trim().toLowerCase()}`;

export function readPushPullLab(lessonId, studentName) {
  try {
    const saved = JSON.parse(
      localStorage.getItem(getPushPullLabKey(lessonId, studentName)) || "null"
    );

    return {
      cases: saved?.cases || {},
      creation: { ...EMPTY.creation, ...saved?.creation },
      checked: Boolean(saved?.checked),
    };
  } catch {
    return {
      cases: {},
      creation: { ...EMPTY.creation },
      checked: false,
    };
  }
}

export function calculatePushPullLab(data) {
  const correct = CASES.filter(
    (item) => data.cases?.[item.id]?.choice === item.answer
  ).length;

  return {
    correct,
    selectionPoints: correct,
    maximumSelectionPoints: 4,
    justificationPoints: "Pendiente de revisión docente",
    maximumPoints: 8,
  };
}

function LabImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed || !src) {
    return (
      <div className="ppl-image-fallback">
        <span>ANÁLISIS DE CONTENIDO</span>
        <strong>{alt}</strong>
      </div>
    );
  }

  return (
    <img
      className="ppl-image"
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}

export default function PushPullLab({
  lessonId = "contenido-semana-1",
  studentName = "",
}) {
  const [data, setData] = useState(() =>
    readPushPullLab(lessonId, studentName)
  );

  useEffect(() => {
    setData(readPushPullLab(lessonId, studentName));
  }, [lessonId, studentName]);

  function update(next) {
    setData(next);

    try {
      localStorage.setItem(
        getPushPullLabKey(lessonId, studentName),
        JSON.stringify(next)
      );
    } catch {
      // La interfaz sigue disponible aunque el navegador bloquee el guardado.
    }
  }

  function updateCase(id, key, value) {
    update({
      ...data,
      checked: false,
      cases: {
        ...data.cases,
        [id]: {
          ...data.cases[id],
          [key]: value,
        },
      },
    });
  }

  function updateCreation(key, value) {
    update({
      ...data,
      creation: {
        ...data.creation,
        [key]: value,
      },
    });
  }

  const complete = CASES.every(
    (item) =>
      data.cases[item.id]?.choice &&
      data.cases[item.id]?.reason?.trim()
  );

  const results = calculatePushPullLab(data);

  return (
    <section className="ppl-lab">
      <div className="ppl-heading">
        <div>
          <span className="ppl-eyebrow">
            LABORATORIO INTERACTIVO · PUSH Y PULL
          </span>
          <h3>¿Qué estrategia utiliza cada publicación?</h3>
          <p>
            Observa la imagen, analiza el mensaje, selecciona PUSH o
            PULL y justifica tu decisión.
          </p>
        </div>
        <div className="ppl-score-label">4 CASOS · 8 PUNTOS</div>
      </div>

      <div className="ppl-grid">
        {CASES.map((item, index) => {
          const response = data.cases[item.id] || {};
          const correct = response.choice === item.answer;

          return (
            <article className="ppl-case" key={item.id}>
              <div className="ppl-image-wrap">
                <LabImage src={item.image} alt={item.title} />
                <span className="ppl-image-number">
                  CASO {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="ppl-case-body">
                <h4>{item.title}</h4>

                <blockquote>{item.message}</blockquote>

                <fieldset>
                  <legend>Selecciona una estrategia</legend>

                  <div className="ppl-choices">
                    {["PUSH", "PULL"].map((option) => (
                      <label
                        key={option}
                        className={
                          response.choice === option
                            ? "ppl-choice selected"
                            : "ppl-choice"
                        }
                      >
                        <input
                          type="radio"
                          name={`${lessonId}-${item.id}`}
                          value={option}
                          checked={response.choice === option}
                          onChange={() =>
                            updateCase(item.id, "choice", option)
                          }
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="ppl-field">
                  <span>¿Por qué elegiste esa estrategia?</span>
                  <textarea
                    rows={3}
                    value={response.reason || ""}
                    onChange={(event) =>
                      updateCase(
                        item.id,
                        "reason",
                        event.target.value
                      )
                    }
                    placeholder="Explica qué busca conseguir la publicación."
                  />
                </label>

                {data.checked && (
                  <div
                    className={`ppl-feedback ${
                      correct ? "correct" : "incorrect"
                    }`}
                  >
                    <strong>
                      {correct
                        ? "Clasificación correcta"
                        : `Respuesta correcta: ${item.answer}`}
                    </strong>
                    <p>{item.explanation}</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="ppl-evaluation">
        <div>
          <h4>Evaluación de reconocimiento</h4>
          <p>
            Cada caso vale 2 puntos: 1 por la clasificación correcta
            y 1 por la justificación, que revisará el docente.
          </p>
        </div>

        <button
          type="button"
          disabled={!complete}
          onClick={() => update({ ...data, checked: true })}
        >
          Evaluar respuestas
        </button>

        {data.checked && (
          <div className="ppl-result" role="status">
            <strong>
              {results.selectionPoints} / 4
            </strong>
            <span>Clasificaciones correctas</span>
            <p>
              Las justificaciones están pendientes de revisión
              docente. La nota definitiva será sobre 8 puntos.
            </p>
          </div>
        )}
      </div>

      <div className="ppl-creation">
        <div className="ppl-heading">
          <div>
            <span className="ppl-eyebrow">
              APLICACIÓN · TU PROPIA MARCA
            </span>
            <h3>Ahora crea tus dos publicaciones</h3>
            <p>
              Utiliza la marca de café que desarrollaste con tu equipo.
              Escribe un mensaje comercial PUSH y uno de valor PULL.
            </p>
          </div>
        </div>

        <div className="ppl-creation-grid">
          <div className="ppl-creation-card">
            <span className="ppl-tag">PUSH</span>
            <p className="ppl-example">
              Ejemplo: “Conoce nuestras presentaciones de café y
              realiza tu pedido hoy”.
            </p>

            <label className="ppl-field">
              <span>Tu publicación PUSH</span>
              <textarea
                rows={4}
                value={data.creation.push}
                onChange={(event) =>
                  updateCreation("push", event.target.value)
                }
                placeholder="Escribe un mensaje que impulse una acción comercial."
              />
            </label>

            <label className="ppl-field">
              <span>¿Por qué es PUSH?</span>
              <textarea
                rows={3}
                value={data.creation.pushReason}
                onChange={(event) =>
                  updateCreation("pushReason", event.target.value)
                }
                placeholder="Explica qué acción comercial esperas conseguir."
              />
            </label>
          </div>

          <div className="ppl-creation-card">
            <span className="ppl-tag">PULL</span>
            <p className="ppl-example">
              Ejemplo: “¿Por qué la molienda cambia el sabor de tu
              café?”.
            </p>

            <label className="ppl-field">
              <span>Tu publicación PULL</span>
              <textarea
                rows={4}
                value={data.creation.pull}
                onChange={(event) =>
                  updateCreation("pull", event.target.value)
                }
                placeholder="Escribe un mensaje educativo o de interés."
              />
            </label>

            <label className="ppl-field">
              <span>¿Por qué es PULL?</span>
              <textarea
                rows={3}
                value={data.creation.pullReason}
                onChange={(event) =>
                  updateCreation("pullReason", event.target.value)
                }
                placeholder="Explica qué valor recibe la audiencia."
              />
            </label>
          </div>
        </div>

        <label className="ppl-field ppl-platform">
          <span>¿En qué plataforma publicarías tus contenidos?</span>
          <select
            value={data.creation.platform}
            onChange={(event) =>
              updateCreation("platform", event.target.value)
            }
          >
            <option value="">Selecciona una plataforma</option>
            {[
              "Instagram",
              "TikTok",
              "Facebook",
              "YouTube",
              "Sitio web",
            ].map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </label>

        <p className="ppl-save-note">
          Tus respuestas se guardan automáticamente en este navegador.
        </p>
      </div>
    </section>
  );
}
