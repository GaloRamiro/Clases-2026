import { useState } from "react";
import { courses, getCourseWeeks } from "./data/courses";
import { getLesson } from "./data/lessons";
import LessonContent from "./components/classroom/LessonContent";
import { getStudentName, saveStudentName } from "./services/storage";
import { downloadClassPDF } from "./services/classPdf";
import "./styles/global.css";

function PDFIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D32F2F"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M7 17h10" />
      <path d="M7 13h10" />
    </svg>
  );
}

export default function App() {
  const [studentName, setStudentName] = useState(getStudentName);
  const [nameInput, setNameInput] = useState(getStudentName);
  const [courseId, setCourseId] = useState(null);
  const [weekNumber, setWeekNumber] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");

  const course = courses.find((item) => item.id === courseId);
  const weeks = course ? getCourseWeeks(courseId) : [];

  const lesson =
    course && weekNumber !== null ? getLesson(courseId, weekNumber) : null;

  function register(event) {
    event.preventDefault();

    const name = nameInput.trim().replace(/\s+/g, " ");

    if (name.length < 5 || !name.includes(" ")) {
      setError("Ingresa tu nombre y apellido.");
      return;
    }

    if (!saveStudentName(name)) {
      setError("No se pudo guardar el nombre en este navegador.");
      return;
    }

    setStudentName(name);
    setError("");
  }

  function home() {
    setCourseId(null);
    setWeekNumber(null);
    setSidebarOpen(true);
    setPdfError("");
  }

  function openCourse(id) {
    setCourseId(id);
    setWeekNumber(null);
    setSidebarOpen(true);
    setPdfError("");
  }

  function openWeek(number) {
    setWeekNumber(number);
    setSidebarOpen(false);
    setPdfError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function back() {
    setPdfError("");

    if (weekNumber !== null) {
      setWeekNumber(null);
      setSidebarOpen(true);
    } else {
      home();
    }
  }

  async function handleDownloadClassPDF() {
    if (!lesson || pdfLoading) return;

    setPdfLoading(true);
    setPdfError("");

    try {
      await downloadClassPDF({
        lesson,
        courseName: course.name,
      });
    } catch (err) {
      console.error("Error al generar PDF de clase:", err);
      setPdfError("No se pudo generar el PDF de clase. Revisa la consola.");
    } finally {
      setPdfLoading(false);
    }
  }

  if (!studentName) {
    return (
      <main className="student-entry">
        <form className="student-entry__card" onSubmit={register}>
          <span className="eyebrow">PLATAFORMA ACADÉMICA</span>

          <h1>Bienvenido a Aula Digital</h1>

          <p>
            Registra tu nombre y apellido. Se utilizarán en tus actividades y
            documentos académicos.
          </p>

          <label htmlFor="student-name">Nombre completo</label>

          <input
            id="student-name"
            autoComplete="name"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            placeholder="Nombre y apellido"
            required
          />

          {error && <p role="alert">{error}</p>}

          <button type="submit">Ingresar</button>

          <small>
            Los datos se guardan en este navegador. No se sincronizan entre
            dispositivos.
          </small>
        </form>
      </main>
    );
  }

  return (
    <div
      className={`app-shell ${
        sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
    >
      <aside className="sidebar">
        <div className="sidebar-header">
          {sidebarOpen && <div className="brand">AULA DIGITAL</div>}

          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((value) => !value)}
            aria-label={sidebarOpen ? "Contraer menú" : "Expandir menú"}
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        {sidebarOpen && (
          <nav className="sidebar-navigation">
            <button type="button" className="nav-button" onClick={home}>
              Inicio
            </button>

            <p className="sidebar-label">ASIGNATURAS</p>

            {courses.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`nav-button ${courseId === item.id ? "active" : ""}`}
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

          <div className="student-profile">
            <strong>{studentName}</strong>

            <div className="student-profile__actions">
              <button
                type="button"
                onClick={() => {
                  setNameInput(studentName);
                  setStudentName("");
                }}
              >
                Cambiar nombre
              </button>

              {lesson && (
                <button
                  type="button"
                  className="class-pdf-button"
                  onClick={handleDownloadClassPDF}
                  disabled={pdfLoading}
                  title="Descargar material de la clase en PDF"
                >
                  <PDFIcon />
                  <span>
                    {pdfLoading ? "Generando PDF..." : "Descargar PDF de clase"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </header>

        {pdfError && (
          <p role="alert" className="class-pdf-error">
            {pdfError}
          </p>
        )}

        {!course && (
          <>
            <div className="page-heading">
              <h1>Mis asignaturas</h1>
              <p>Selecciona una materia para comenzar.</p>
            </div>

            <div className="course-grid">
              {courses.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="course-card"
                  onClick={() => openCourse(item.id)}
                >
                  <span className="course-tag">ASIGNATURA</span>

                  <h2>{item.name}</h2>
                  <p>{item.description}</p>

                  <strong>{item.totalWeeks} semanas →</strong>
                </button>
              ))}
            </div>
          </>
        )}

        {course && (
          <>
            <button type="button" className="back-button" onClick={back}>
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
                  const available = Boolean(getLesson(course.id, week.number));

                  return (
                    <button
                      type="button"
                      key={week.id}
                      className="week-card"
                      disabled={!available}
                      onClick={() => openWeek(week.number)}
                    >
                      <span>{week.title}</span>

                      <small>{available ? "Ver clase →" : "Pendiente"}</small>
                    </button>
                  );
                })}
              </div>
            ) : lesson ? (
              <LessonContent lesson={lesson} studentName={studentName} />
            ) : (
              <p>Esta clase todavía está en preparación.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
