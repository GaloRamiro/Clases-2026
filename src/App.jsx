
import { useState } from "react";
import { courses, getCourseWeeks } from "./data/courses";
import { getLesson } from "./data/lessons";
import LessonContent from "./components/classroom/LessonContent";
import "./styles/global.css";

export default function App() {
  const [courseId, setCourseId] = useState(null);
  const [weekNumber, setWeekNumber] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [studentName, setStudentName] = useState(
    () => localStorage.getItem("aula_student_name") || ""
  );

  const course = courses.find((item) => item.id === courseId);
  const weeks = course ? getCourseWeeks(course.id) : [];

  const lesson =
    course && weekNumber !== null
      ? getLesson(course.id, weekNumber)
      : null;

  function updateName(value) {
    setStudentName(value);
    localStorage.setItem("aula_student_name", value);
  }

  function goHome() {
    setCourseId(null);
    setWeekNumber(null);
    setSidebarOpen(true);
  }

  function openCourse(id) {
    setCourseId(id);
    setWeekNumber(null);
    setSidebarOpen(true);
  }

  function openWeek(number) {
    setWeekNumber(number);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    if (weekNumber !== null) {
      setWeekNumber(null);
      setSidebarOpen(true);
    } else {
      goHome();
    }
  }

  return (
    <div
      className={`app-shell ${
        sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >
      <aside className="sidebar">
        <div className="sidebar-header">
          {sidebarOpen && (
            <div className="brand">AULA DIGITAL</div>
          )}

          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((previous) => !previous)}
            aria-label={
              sidebarOpen ? "Contraer menú" : "Expandir menú"
            }
            title={
              sidebarOpen ? "Contraer menú" : "Expandir menú"
            }
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        {sidebarOpen && (
          <nav className="sidebar-navigation">
            <button
              type="button"
              className="nav-button"
              onClick={goHome}
            >
              Inicio
            </button>

            <p className="sidebar-label">ASIGNATURAS</p>

            {courses.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`nav-button ${
                  courseId === item.id ? "active" : ""
                }`}
                onClick={() => openCourse(item.id)}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PLATAFORMA ACADÉMICA</p>
            <h2>Aula Digital</h2>
          </div>

          <input
            className="student-input"
            placeholder="Nombre del estudiante"
            value={studentName}
            onChange={(event) => updateName(event.target.value)}
            aria-label="Nombre del estudiante"
          />
        </header>

        {!course && (
          <>
            <div className="page-heading">
              <h1>Mis asignaturas</h1>
              <p>
                Selecciona una materia para acceder a sus clases.
              </p>
            </div>

            <div className="course-grid">
              {courses.map((item) => (
                <button
                  type="button"
                  className="course-card"
                  key={item.id}
                  onClick={() => openCourse(item.id)}
                >
                  <span className="course-tag">
                    ASIGNATURA
                  </span>

                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <strong>
                    {item.totalWeeks} semanas →
                  </strong>
                </button>
              ))}
            </div>
          </>
        )}

        {course && (
          <>
            <button
              type="button"
              className="back-button"
              onClick={goBack}
            >
              ← Volver
            </button>

            <div className="page-heading">
              <h1>{course.name}</h1>
              <p>
                {weekNumber === null
                  ? "18 semanas de aprendizaje"
                  : `Semana ${String(weekNumber).padStart(2, "0")}`}
              </p>
            </div>

            {weekNumber === null ? (
              <div className="weeks-grid">
                {weeks.map((week) => {
                  const available = Boolean(
                    getLesson(course.id, week.number)
                  );

                  return (
                    <button
                      type="button"
                      key={week.id}
                      className="week-card"
                      onClick={() => openWeek(week.number)}
                    >
                      <span>{week.title}</span>
                      <small>
                        {available
                          ? "Ver clase →"
                          : "Pendiente"}
                      </small>
                    </button>
                  );
                })}
              </div>
            ) : (
              <LessonContent
                lesson={lesson}
                studentName={studentName}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
