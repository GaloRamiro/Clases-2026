
import { useState } from "react";

const questions = [
  {
    message: "20 % de descuento en tu primer pedido de café.",
    answer: "PUSH",
    explanation:
      "La oferta busca impulsar una compra mediante un mensaje comercial directo.",
  },
  {
    message: "Tres errores que arruinan el sabor de tu café en casa.",
    answer: "PULL",
    explanation:
      "El contenido enseña algo útil y atrae a personas interesadas.",
  },
  {
    message: "Compra hoy tu café y recibe una promoción especial.",
    answer: "PUSH",
    explanation:
      "La comunicación está orientada a estimular una acción comercial.",
  },
  {
    message: "Descubre cómo los productores cultivan nuestro café.",
    answer: "PULL",
    explanation:
      "La historia busca generar interés mediante información relevante.",
  },
  {
    message: "Reserva ahora tu paquete de lanzamiento.",
    answer: "PUSH",
    explanation:
      "Existe una invitación comercial directa a realizar una reserva.",
  },
];

export default function PushPullGame() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = questions[index];
  const answer = answers[index];
  const score = questions.filter(
    (question, i) => answers[i] === question.answer
  ).length;

  function choose(value) {
    if (answer) return;
    setAnswers((previous) => ({ ...previous, [index]: value }));
  }

  function reset() {
    setAnswers({});
    setIndex(0);
  }

  return (
    <div className="interactive-panel">
      <div className="game-topline">
        <strong>Clasifica el mensaje</strong>
        <span>
          {index + 1} / {questions.length}
        </span>
      </div>

      <div className="game-progress">
        <div
          style={{
            width: `${((index + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="game-message">
        <span className="lesson-kicker">MENSAJE PUBLICITARIO</span>
        <h3>“{current.message}”</h3>
      </div>

      <div className="game-actions">
        {["PUSH", "PULL"].map((option) => (
          <button
            type="button"
            key={option}
            disabled={Boolean(answer)}
            className={`game-choice ${
              answer === option ? "is-selected" : ""
            }`}
            onClick={() => choose(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {answer && (
        <div className="game-feedback" role="status">
          <strong>
            {answer === current.answer
              ? "¡Respuesta correcta!"
              : `La respuesta adecuada es ${current.answer}`}
          </strong>
          <p>{current.explanation}</p>
        </div>
      )}

      {answer && (
        <div className="game-footer">
          <span>
            Aciertos: {score} / {questions.length}
          </span>

          {index < questions.length - 1 ? (
            <button
              className="lesson-action"
              type="button"
              onClick={() => setIndex((i) => i + 1)}
            >
              Siguiente pregunta →
            </button>
          ) : (
            <button
              className="lesson-action"
              type="button"
              onClick={reset}
            >
              Repetir ejercicio
            </button>
          )}
        </div>
      )}
    </div>
  );
}
