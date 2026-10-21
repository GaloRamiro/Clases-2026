
import { useState, useEffect } from "react";
import LessonHero from "./LessonHero";
import PlatformExplorer from "./PlatformExplorer";
import PushPullGame from "./PushPullGame";
import BrandWorkshop from "./BrandWorkshop";
import LessonQuiz from "./LessonQuiz";
import "../../styles/lesson.css";
import SlideVisual from "./SlideVisual";
export default function LessonContent({ lesson, studentName = "" }) {
  const [mode, setMode] = useState("reading");
  const [slide, setSlide] = useState(0);

  const sections = [
    { id: "intro", title: "Introducción" },
    { id: "challenge", title: "El desafío" },
    { id: "theory", title: "Fundamentos" },
    { id: "platforms", title: "Plataformas" },
    { id: "strategies", title: "PUSH y PULL" },
    { id: "demo", title: "Café Raíz" },
    { id: "break", title: "Descanso" },
    { id: "workshop", title: "Laboratorio" },
    { id: "quiz", title: "Evaluación" },
    { id: "closing", title: "Cierre" },
  ];

const slideMedia = {
  intro: {
    title: "El nacimiento de una marca",
    description: "Fotografía principal de café y branding",
    src: null,
  },
  challenge: {
    title: "Tres marcas, tres propuestas",
    description: "Comparación visual de marcas de café",
    src: null,
  },
  theory: {
    title: "Estrategia de contenido",
    description: "Audiencia, objetivo y diferenciación",
    src: null,
  },
  platforms: {
    title: "Ecosistema digital",
    description: "Plataformas y formatos de contenido",
    src: null,
  },
  strategies: {
    title: "PUSH y PULL",
    description: "Comparación visual de estrategias",
    src: null,
  },
  demo: {
    title: "Café Raíz",
    description: "Identidad y aplicaciones de marca",
    src: null,
  },
  break: {
    title: "Pausa de la sesión",
    description: "Imagen ambiental de café",
    src: null,
  },
  workshop: {
    title: "Laboratorio creativo",
    description: "Equipos desarrollando su marca",
    src: null,
  },
  quiz: {
    title: "Evaluación",
    description: "Revisión de los aprendizajes",
    src: null,
  },
  closing: {
    title: "Próximo desafío",
    description: "Investigación de audiencias",
    src: null,
  },
};

  useEffect(() => {
    setSlide(0);
    setMode("reading");
  }, [lesson?.id]);

  if (!lesson) {
    return (
      <section className="topic-card">
        <h2>Clase en preparación</h2>
        <p>Esta semana todavía no tiene contenido publicado.</p>
      </section>
    );
  }

  function changeSlide(next) {
    setSlide(Math.max(0, Math.min(next, sections.length - 1)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderSection(id) {
    switch (id) {
      case "intro":
        return (
          <div className="lesson-section">
            <LessonHero lesson={lesson} />
            <div className="lesson-highlight">
              <span className="lesson-kicker">OBJETIVO DE APRENDIZAJE</span>
              <p>{lesson.objective}</p>
            </div>
            <h2>Ruta de aprendizaje</h2>
            <div className="lesson-timeline">
              {lesson.schedule.map((item) => (
                <div className="lesson-timeline__item" key={item.time}>
                  <strong>{item.time}</strong>
                  <span>{item.title}</span>
                  <small>{item.minutes} min</small>
                </div>
              ))}
            </div>
          </div>
        );

      case "challenge":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="01"
              title="El desafío de las marcas"
              description={lesson.challenge}
            />
            <div className="coffee-brands">
              {[
                {
                  name: "Origen",
                  type: "ARTESANAL",
                  message: "Tradición, origen y proceso",
                  color: "artisan",
                },
                {
                  name: "Élite",
                  type: "PRÉMIUM",
                  message: "Exclusividad y experiencia",
                  color: "premium",
                },
                {
                  name: "Ruta",
                  type: "JUVENIL",
                  message: "Accesibilidad y energía",
                  color: "youth",
                },
              ].map((brand) => (
                <div
                  className={`coffee-brand coffee-brand--${brand.color}`}
                  key={brand.name}
                >
                  <span>{brand.type}</span>
                  <div className="coffee-brand__cup" aria-hidden="true">
                    <div />
                  </div>
                  <h3>{brand.name}</h3>
                  <p>{brand.message}</p>
                </div>
              ))}
            </div>
            <div className="lesson-question">
              <strong>Debate de apertura</strong>
              <p>
                ¿Cuál comprarías? ¿Qué información necesitarías
                antes de tomar la decisión?
              </p>
            </div>
          </div>
        );

      case "theory":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="02"
              title="Fundamentos estratégicos"
              description="Comprende por qué una publicación necesita audiencia, propósito y diferenciación."
            />
            <div className="lesson-topic-grid">
              {lesson.topics.slice(0, 2).map((topic) => (
                <article className="lesson-topic" key={topic.title}>
                  <h3>{topic.title}</h3>
                  <p>{topic.content}</p>
                  <div className="lesson-example">
                    <strong>Ejemplo</strong>
                    <p>{topic.example}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case "platforms":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="03"
              title="Explorador de plataformas"
              description="Selecciona una plataforma para analizar cómo podría utilizarla una marca de café."
            />
            <PlatformExplorer platforms={lesson.platforms} />
          </div>
        );

      case "strategies":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="04"
              title="PUSH vs. PULL"
              description="Aprende a distinguir una acción comercial directa de un contenido que atrae por su valor."
            />
            <div className="strategy-grid">
              {lesson.topics.slice(2, 4).map((topic) => (
                <article className="strategy-card" key={topic.title}>
                  <h3>{topic.title}</h3>
                  <p>{topic.content}</p>
                  <blockquote>{topic.example}</blockquote>
                </article>
              ))}
            </div>
            <h3>Ahora decide tú</h3>
            <PushPullGame />
          </div>
        );

      case "demo":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="05"
              title="Demostración: Café Raíz"
              description="Observa cómo una idea se transforma en decisiones de comunicación."
            />
            <div className="demo-brand">
              <span className="lesson-kicker">MARCA DE EJEMPLO</span>
              <h3>{lesson.demonstration.brand}</h3>
              <p>{lesson.demonstration.concept}</p>
              <p><strong>Audiencia:</strong> {lesson.demonstration.audience}</p>
            </div>
            <div className="strategy-grid">
              <div className="lesson-topic">
                <h3>Contenido PULL</h3>
                <p>{lesson.demonstration.pull}</p>
              </div>
              <div className="lesson-topic">
                <h3>Contenido PUSH</h3>
                <p>{lesson.demonstration.push}</p>
              </div>
            </div>
            <ol className="lesson-steps">
              {lesson.demonstration.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        );

      case "break":
        return (
          <div className="lesson-section lesson-break">
            <span className="lesson-break__symbol" aria-hidden="true">☕</span>
            <span className="lesson-kicker">PAUSA PROGRAMADA</span>
            <h2>20 minutos de descanso</h2>
            <p>
              Al regresar, cada equipo comenzará a desarrollar
              su propia marca de café.
            </p>
          </div>
        );

      case "workshop":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="06"
              title="Laboratorio de marcas"
              description="60 minutos para crear el concepto de tu marca y preparar sus primeras propuestas de contenido."
            />
            <BrandWorkshop
              lesson={lesson}
              studentName={studentName}
            />
            <div className="lesson-highlight">
              <h3>Uso crítico de inteligencia artificial</h3>
              <p>{lesson.aiPrompt}</p>
              <button
                className="lesson-action lesson-action--outline"
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(lesson.aiPrompt)
                }
              >
                Copiar prompt
              </button>
            </div>
          </div>
        );

      case "quiz":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="07"
              title="Evaluación de aprendizaje"
              description="Responde las preguntas y revisa las explicaciones."
            />
            <LessonQuiz />
            <h3>Rúbrica del taller</h3>
            <div className="lesson-rubric">
              {lesson.rubric.map((item) => (
                <div key={item.criterion}>
                  <span>{item.criterion}</span>
                  <strong>{item.points} pts</strong>
                </div>
              ))}
            </div>
          </div>
        );

      case "closing":
        return (
          <div className="lesson-section">
            <SectionHeading
              number="08"
              title="Cierre y siguiente desafío"
              description="La marca que diseñaste hoy será el punto de partida del proyecto integrador."
            />
            <div className="lesson-highlight">
              <h3>Trabajo autónomo</h3>
              <p>{lesson.homework}</p>
            </div>
            <div className="lesson-highlight">
              <h3>Próxima semana</h3>
              <p>{lesson.nextWeek}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className={`classroom classroom--${mode}`}>
      <div className="classroom-toolbar">
        <div>
          <span className="lesson-kicker">
            DISEÑO PARA GENERACIÓN DE CONTENIDO
          </span>
          <strong>Semana {lesson.number}</strong>
        </div>

        <div className="classroom-mode-switch" role="group" aria-label="Modo de clase">
          <button
            type="button"
            className={mode === "reading" ? "is-active" : ""}
            onClick={() => setMode("reading")}
          >
            Lectura
          </button>
          <button
            type="button"
            className={mode === "presentation" ? "is-active" : ""}
            onClick={() => {
              setMode("presentation");
              setSlide(0);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Presentación
          </button>
        </div>
      </div>

      {mode === "reading" ? (
        <div className="classroom-reading">
          {sections.map((section) => (
            <section key={section.id} id={`section-${section.id}`}>
              {renderSection(section.id)}
            </section>
          ))}
        </div>
      ) : (
        <div className="classroom-presentation">
          <div className="classroom-slide" key={sections[slide].id}>
            {renderSection(sections[slide].id)}
          </div>

          <nav className="slide-navigation" aria-label="Navegación de presentación">
            <button
              type="button"
              onClick={() => changeSlide(slide - 1)}
              disabled={slide === 0}
            >
              ← Anterior
            </button>

            <span>
              {slide + 1} / {sections.length}
              <small>{sections[slide].title}</small>
            </span>

            <button
              type="button"
              onClick={() => changeSlide(slide + 1)}
              disabled={slide === sections.length - 1}
            >
              Siguiente →
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ number, title, description }) {
  return (
    <header className="lesson-section-heading">
      <span className="lesson-kicker">BLOQUE {number}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
