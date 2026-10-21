
import { useState } from "react";
import {
  getLessonWork,
  saveLessonWork,
  getDeliveryId,
} from "../../services/storage";
import { downloadWeekOnePDF } from "../../services/pdf";

const COURSE = "contenido";
const WEEK = 1;

const EMPTY_REFLECTION = {
  learning: "",
  improvement: "",
  application: "",
};

export default function DownloadPDF({ studentName = "" }) {
  const [reflection, setReflection] = useState(() => ({
    ...EMPTY_REFLECTION,
    ...getLessonWork(COURSE, WEEK).reflection,
  }));

  const [message, setMessage] = useState("");
  const [deliveryId] = useState(() =>
    getDeliveryId(COURSE, WEEK)
  );

  function update(field, value) {
    const next = { ...reflection, [field]: value };
    setReflection(next);

    saveLessonWork(COURSE, WEEK, {
      reflection: next,
    });

    setMessage("");
  }

  function download() {
    const name = studentName.trim();
    const saved = getLessonWork(COURSE, WEEK);
    const work = saved.work || {};

    if (!name) {
      setMessage("Primero escribe tu nombre en Aula Digital.");
      return;
    }

    const required = [
      "team",
      "brand",
      "concept",
      "differentiation",
      "audience",
      "platform",
      "reason",
      "push",
      "pull",
      "aiReview",
    ];

    const missingWork = required.some(
      (key) => !String(work[key] || "").trim()
    );

    const missingReflection = Object.values(reflection).some(
      (value) => !String(value || "").trim()
    );

    if (missingWork || missingReflection) {
      setMessage(
        "Completa el taller de marca y las tres reflexiones " +
        "antes de generar tu entrega."
      );
      return;
    }

    try {
      const result = downloadWeekOnePDF({
        studentName: name,
        work,
        reflection,
      });

      saveLessonWork(COURSE, WEEK, {
        lastGeneratedAt: new Date().toISOString(),
      });

      setMessage(
        `PDF generado: ${result.filename}. ` +
        "Revisa el documento antes de subirlo."
      );
    } catch (error) {
      setMessage(error.message || "No se pudo generar el PDF.");
    }
  }

  return (
    <section className="interactive-panel final-delivery">
      <span className="lesson-kicker">
        SEMANA 01 · ENTREGA ACADÉMICA
      </span>

      <h3>Prepara tu entrega final</h3>

      <p>
        Tu documento incluirá el desarrollo de la marca,
        las propuestas PUSH y PULL, las justificaciones
        y tu reflexión individual.
      </p>

      <div className="delivery-identity">
        <div>
          <small>ESTUDIANTE</small>
          <strong>{studentName.trim() || "Nombre pendiente"}</strong>
        </div>

        <div>
          <small>CÓDIGO DE ENTREGA</small>
          <strong>{deliveryId}</strong>
        </div>
      </div>

      <div className="workshop-grid">
        <label className="workshop-field workshop-field--full">
          <span>¿Qué aprendiste en esta clase?</span>
          <textarea
            rows={4}
            value={reflection.learning}
            onChange={(event) =>
              update("learning", event.target.value)
            }
            placeholder="Explica qué comprendiste sobre estrategia, plataformas y diferenciación."
          />
        </label>

        <label className="workshop-field workshop-field--full">
          <span>¿Qué decisión cambiarías de tu marca?</span>
          <textarea
            rows={4}
            value={reflection.improvement}
            onChange={(event) =>
              update("improvement", event.target.value)
            }
            placeholder="Justifica qué mejorarías y por qué."
          />
        </label>

        <label className="workshop-field workshop-field--full">
          <span>¿Cómo aplicarías PUSH y PULL en un caso real?</span>
          <textarea
            rows={4}
            value={reflection.application}
            onChange={(event) =>
              update("application", event.target.value)
            }
            placeholder="Describe una aplicación concreta."
          />
        </label>
      </div>

      <div className="delivery-actions">
        <p>
          El PDF se genera con tu nombre, un identificador
          de entrega y la fecha de creación.
        </p>

        <button
          type="button"
          className="lesson-action"
          onClick={download}
        >
          Generar PDF final de la Semana 1
        </button>
      </div>

      {message && (
        <p className="delivery-message" role="status">
          {message}
        </p>
      )}
    </section>
  );
}
