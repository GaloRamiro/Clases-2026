
import { useState } from "react";

import {
  getLessonWork,
} from "../../services/storage";

import {
  downloadWeekOneWorkshopPDF,
} from "../../services/pdf";

const REQUIRED = [
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

export default function ContentWorkshopPDF({
  lesson,
  studentName = "",
}) {
  const [message, setMessage] = useState("");

  function download() {
    const name = studentName.trim();

    if (!name) {
      setMessage(
        "Primero registra tu nombre en Aula Digital."
      );
      return;
    }

    const saved = getLessonWork(
      lesson.courseId,
      lesson.number
    );

    const work = saved.work || {};

    const missing = REQUIRED.filter(
      (key) =>
        !String(work[key] || "").trim()
    );

    if (missing.length) {
      setMessage(
        `Faltan ${missing.length} campos por completar en el taller práctico.`
      );
      return;
    }

    try {
      const result =
        downloadWeekOneWorkshopPDF({
          studentName: name,
          work,
        });

      setMessage(
        `PDF generado: ${result.filename}`
      );
    } catch (error) {
      setMessage(
        error.message ||
          "No se pudo generar el taller."
      );
    }
  }

  return (
    <div className="ad-academic-download">
      <button
        type="button"
        className="ad-academic-download__button"
        onClick={download}
      >
        Descargar entrega 2: taller resuelto
      </button>

      <p className="ad-academic-download__hint">
        Completa las diez respuestas del taller.
        Este PDF es independiente del laboratorio
        y de las preguntas de cierre.
      </p>

      {message && (
        <p
          className="ad-save-status"
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  );
}
