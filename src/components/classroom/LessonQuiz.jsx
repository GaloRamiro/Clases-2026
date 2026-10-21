
import { useState } from "react";

const questions = [
  {
    question: "¿Qué debe influir principalmente en la elección de una plataforma?",
    options: [
      "La popularidad personal del docente",
      "La audiencia y el objetivo",
      "El número de publicaciones",
    ],
    correct: 1,
    explanation: "La plataforma se elige según el público y el objetivo.",
  },
  {
    question: "¿Cuál es un ejemplo de contenido PULL?",
    options: [
      "Aprende a preparar café en casa",
      "Compra ahora con descuento",
      "Reserva hoy tu pedido",
    ],
    correct: 0,
    explanation: "Un tutorial atrae mediante contenido útil.",
  },
  {
    question: "¿Qué busca principalmente una promoción PUSH?",
    options: [
      "Explicar la historia del café",
      "Enseñar una técnica",
      "Estimular una acción comercial",
    ],
    correct: 2,
    explanation: "PUSH impulsa activamente un mensaje comercial.",
  },
  {
    question: "¿Por qué es importante diferenciar una marca?",
    options: [
      "Para copiar a la competencia",
      "Para ofrecer una razón relevante para elegirla",
      "Para publicar en todas las plataformas",
    ],
    correct: 1,
    explanation: "La diferenciación conecta una propuesta con una necesidad.",
  },
  {
    question: "¿Qué haremos con la audiencia inicial en la Semana 2?",
    options: [
      "Investigaremos nuestra hipótesis",
      "La consideraremos definitiva",
      "Dejaremos de analizarla",
    ],
    correct: 0,
    explanation: "La hipótesis inicial debe investigarse y validarse.",
  },
];

export default function LessonQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const completed = Object.keys(answers).length === questions.length;
  const score = questions.filter(
    (question, index) => answers[index] === question.correct
  ).length;

  return (
    <div className="interactive-panel">
      <div className="workshop-heading">
        <div>
          <span className="lesson-kicker">EVALUACIÓN FORMATIVA</span>
          <h3>Comprueba lo aprendido</h3>
        </div>
        <strong>{questions.length} preguntas</strong>
      </div>

      {questions.map((item, index) => (
        <fieldset className="quiz-question" key={index} disabled={submitted}>
          <legend>
            {index + 1}. {item.question}
          </legend>

          {item.options.map((option, optionIndex) => (
            <label className="quiz-option" key={optionIndex}>
              <input
                type="radio"
                name={`quiz-question-${index}`}
                checked={answers[index] === optionIndex}
                onChange={() =>
                  setAnswers((previous) => ({
                    ...previous,
                    [index]: optionIndex,
                  }))
                }
              />
              <span>{option}</span>
            </label>
          ))}

          {submitted && (
            <p className="quiz-feedback">
              {answers[index] === item.correct ? "Correcto. " : "Revisar. "}
              {item.explanation}
            </p>
          )}
        </fieldset>
      ))}

      {submitted && (
        <div className="quiz-result" role="status">
          <h3>Resultado: {score} de {questions.length}</h3>
          <p>
            Esta evaluación sirve para reforzar tu aprendizaje.
          </p>
        </div>
      )}

      <button
        type="button"
        className="lesson-action"
        disabled={!completed && !submitted}
        onClick={() => {
          if (submitted) {
            setAnswers({});
            setSubmitted(false);
          } else {
            setSubmitted(true);
          }
        }}
      >
        {submitted ? "Repetir evaluación" : "Evaluar mis respuestas"}
      </button>
    </div>
  );
}
