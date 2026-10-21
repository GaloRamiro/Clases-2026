
export default function LessonHero({ lesson }) {
  return (
    <section className="lesson-hero">
      <div className="lesson-hero__content">
        <span className="lesson-kicker">
          UNIDAD 1 · SEMANA {String(lesson.number).padStart(2, "0")}
        </span>

        <h1>{lesson.title}</h1>
        <p>{lesson.subtitle}</p>

        <div className="lesson-hero__meta">
          <span>180 minutos</span>
          <span>Proyecto integrador</span>
          <span>Marca de café</span>
        </div>
      </div>

      <div className="coffee-art" aria-hidden="true">
        <div className="coffee-art__halo" />
        <div className="coffee-art__cup">
          <div className="coffee-art__drink" />
        </div>
        <div className="coffee-art__bean bean-one" />
        <div className="coffee-art__bean bean-two" />
      </div>
    </section>
  );
}
