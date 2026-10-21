import { useEffect, useState } from "react";
import DownloadPDF from "./DownloadPDF";
import PushPullLab from "./PushPullLab";
import { getLessonWork, saveLessonWork } from "../../services/storage";
import "../../styles/semana01.css";
import SeoWorkshop from "./SeoWorkshop";
import CrmWorkshop from "./CrmWorkshop";
import SeoDownloadPDF from "./SeoDownloadPDF";
import CrmWeek02Workshop from "./CrmWeek02Workshop";
import CrmWeek03Workshop from "./CrmWeek03Workshop";
import CrmWeek04Workshop from "./CrmWeek04Workshop";
import SeoKeywordWorkshop from "./SeoKeywordWorkshop.jsx";
const WORK_FIELDS = [
  ["team", "Nombre del equipo"],
  ["brand", "Nombre de la marca"],
  ["concept", "Concepto de la marca"],
  ["differentiation", "Diferenciación"],
  ["audience", "Público inicial"],
  ["platform", "Plataforma digital"],
  ["reason", "Justificación de la plataforma"],
  ["push", "Contenido PUSH y objetivo comercial"],
  ["pull", "Contenido PULL y valor para la audiencia"],
  ["aiReview", "Revisión crítica y mejoras"],
];

function ImageSpace({ src, hint, alt = "Referencia visual" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <div className="ad-image-space">
      {src && !failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      ) : (
        <div className="ad-image-placeholder">
          <span>ESPACIO PARA FOTOGRAFÍA</span>
          <p>{hint || "Incorpora una imagen relacionada con el tema."}</p>
          <small>{src}</small>
        </div>
      )}
    </div>
  );
}

function Workshop({ lesson }) {
  const [work, setWork] = useState(() => ({
    ...getLessonWork(lesson.courseId, lesson.number).work,
  }));

  const [saved, setSaved] = useState(true);

  function update(key, value) {
    const next = { ...work, [key]: value };
    setWork(next);

    setSaved(
      saveLessonWork(lesson.courseId, lesson.number, {
        work: next,
      }),
    );
  }

  return (
    <div className="ad-workshop">
      <div className="ad-workshop__intro">
        <span>ACTIVIDAD EN EQUIPO · 60 MINUTOS</span>
        <h3>Construye una marca de café</h3>
        <p>
          Cada equipo desarrollará su propia propuesta. Las respuestas formarán
          parte del PDF final.
        </p>
      </div>

      <div className="ad-workshop__grid">
        {WORK_FIELDS.map(([key, label]) => (
          <label key={key}>
            <strong>{label}</strong>

            {key === "platform" ? (
              <select
                value={work[key] || ""}
                onChange={(event) => update(key, event.target.value)}
              >
                <option value="">Selecciona una plataforma</option>
                {(lesson.platforms || []).map((platform) => (
                  <option key={platform.name} value={platform.name}>
                    {platform.name}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                rows={key === "team" || key === "brand" ? 2 : 3}
                value={work[key] || ""}
                onChange={(event) => update(key, event.target.value)}
                placeholder={`Escribe aquí: ${label.toLowerCase()}`}
              />
            )}
          </label>
        ))}
      </div>

      <p className="ad-save-status" role="status">
        {saved
          ? "Tus respuestas se guardan automáticamente en este dispositivo."
          : "No se pudo guardar. Revisa el almacenamiento del navegador."}
      </p>
    </div>
  );
}

function Rows({ columns, rows }) {
  return (
    <div className="ad-table-wrap">
      <table className="ad-table">
        <thead>
          <tr>
            {(columns || []).map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows || []).map((row, index) => (
            <tr key={index}>
              {row.map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SlideBody({ slide, lesson, studentName }) {
  switch (slide.kind) {
    case "cover":
      return (
        <div className="ad-cover-layout">
          <div className="ad-cover-copy">
            <span className="ad-overline">UNIDAD 01 · SEMANA 01</span>
            <h2>{slide.title}</h2>
            <h3>{slide.subtitle}</h3>
            <p>{slide.body}</p>
            <div className="ad-cover-meta">
              <span>{lesson.duration || 180} MINUTOS</span>
              <span>
                {lesson.courseId === "seo"
                  ? "SEO · SEM · AEO · GEO"
                  : lesson.courseId === "crm"
                    ? "CRM · VENTAS · RELACIÓN CON EL CLIENTE"
                    : "ESTRATEGIA DIGITAL"}
              </span>
            </div>
          </div>
          <ImageSpace
            src={slide.image}
            hint={slide.imageHint}
            alt={slide.title || "Imagen de portada"}
          />
        </div>
      );

    case "brands":
      return (
        <>
          <p className="ad-lead">{slide.subtitle}</p>
          <div className="ad-brands">
            {(slide.brands || []).map((brand) => (
              <article className="ad-brand" key={brand.name}>
                <ImageSpace
                  src={brand.image}
                  hint={brand.hint}
                  alt={`Identidad de café ${brand.name}`}
                />
                <div className="ad-brand__copy">
                  <h3>{brand.name}</h3>
                  <p>{brand.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      );

    case "pillars":
      return (
        <div className="ad-split">
          <div>
            <p className="ad-lead">{slide.body}</p>
            <div className="ad-pillars">
              {(slide.pillars || []).map((item, index) => (
                <div key={item}>
                  <small>0{index + 1}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "table":
      return (
        <div className="ad-split">
          <div>
            <p className="ad-lead">{slide.subtitle}</p>
            <Rows columns={slide.columns} rows={slide.rows} />
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "platforms":
      return (
        <div className="ad-split">
          <div>
            <p className="ad-lead">{slide.body}</p>
            <div className="ad-platform-list">
              {(slide.platforms || []).map((platform, index) => (
                <div key={platform}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{platform}</strong>
                </div>
              ))}
            </div>
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "statement":
      return (
        <div className="ad-split ad-statement">
          <div>
            <span className="ad-strategy-label">{slide.accent}</span>
            <p className="ad-lead">{slide.body}</p>
            <blockquote>{slide.quote}</blockquote>
            <p className="ad-note">{slide.note}</p>
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "compare":
      return (
        <div className="ad-split">
          <Rows columns={slide.columns} rows={slide.rows} />
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "case":
      return (
        <div className="ad-split">
          <div>
            <span className="ad-overline">CASO DE ESTUDIO</span>
            <h3 className="ad-big-brand">{slide.brand}</h3>
            <p className="ad-lead">{slide.body}</p>
            <div className="ad-detail-list">
              {(slide.details || []).map(([label, value]) => (
                <div key={label}>
                  <strong>{label}</strong>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "twoideas":
      return (
        <div className="ad-ideas">
          {(slide.ideas || []).map((idea) => (
            <article key={idea.label}>
              <ImageSpace src={idea.image} hint={idea.hint} />
              <div className="ad-idea-copy">
                <span>{idea.label}</span>
                <small>OBJETIVO: {idea.goal}</small>
                <blockquote>{idea.text}</blockquote>
              </div>
            </article>
          ))}
        </div>
      );
    case "seo-search-lab":
    case "seo-company-workshop":
    case "seo-competitor-workshop":
      return (
        <SeoWorkshop
          kind={slide.kind}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "crm-glossary":
    case "crm-bitrix-lab":
    case "crm-followup":
      return (
        <CrmWorkshop
          kind={slide.kind}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "pushpull-lab":
      return <PushPullLab lessonId={lesson.id} studentName={studentName} />;

    case "workshop":
      return (
        <>
          <p className="ad-lead">{slide.subtitle}</p>

          <div className="ad-split">
            <div className="ad-timeline">
              {(slide.tasks || []).map(([time, task]) => (
                <div key={task}>
                  <strong>{time}</strong>
                  <span>{task}</span>
                </div>
              ))}
            </div>

            <ImageSpace src={slide.image} hint={slide.imageHint} />
          </div>

          <p className="ad-note">{slide.note}</p>

          <Workshop lesson={lesson} />
        </>
      );
    case "present":
      return (
        <div className="ad-split">
          <div>
            <p className="ad-lead">{slide.body}</p>
            <blockquote className="ad-feature-quote">{slide.quote}</blockquote>
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "questions":
      return (
        <div className="ad-split">
          <div>
            <div className="ad-questions">
              {(slide.questions || []).map((question, index) => (
                <div key={question}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{question}</p>
                </div>
              ))}
            </div>
            <p className="ad-note">{slide.note}</p>
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );

    case "homework":
      return (
        <div className="ad-split">
          <div>
            <p className="ad-lead">{slide.body}</p>
            <p className="ad-note">{slide.note}</p>
            <div className="ad-next-week">{slide.next}</div>
          </div>
          <ImageSpace src={slide.image} hint={slide.imageHint} />
        </div>
      );
    case "crm-client-segmentation":
    case "crm-contact-lab":
    case "crm-segmented-campaign":
      return (
        <CrmWeek02Workshop
          kind={slide.kind}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "crm-automation-rules":
    case "crm-automation-lab":
    case "crm-opportunity-recovery":
      return (
        <CrmWeek03Workshop
          kind={slide.kind}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "crm-loyalty-builder":
    case "crm-loyalty-lab":
    case "crm-loyalty-recovery":
      return (
        <CrmWeek04Workshop
          kind={slide.kind}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-keyword-lab":
    case "seo-keyword-matrix":
      return <SeoKeywordWorkshop slide={slide} />;
    default:
      return (
        <div>
          <p>{slide.body || "Contenido en preparación."}</p>
          {slide.image && (
            <ImageSpace src={slide.image} hint={slide.imageHint} />
          )}
        </div>
      );
  }
}

export default function LessonContent({ lesson, studentName = "" }) {
  const [mode, setMode] = useState("presentation");
  const [index, setIndex] = useState(0);
  const [showDelivery, setShowDelivery] = useState(false);

  const slides = lesson?.slides || [];
  const slide = slides[index];

  useEffect(() => {
    setIndex(0);
    setShowDelivery(false);
  }, [lesson?.id]);

  useEffect(() => {
    if (mode !== "presentation") return;

    function handleKey(event) {
      const target = event.target;
      const editing =
        target instanceof HTMLElement &&
        (target.matches("input, textarea, select") || target.isContentEditable);

      if (editing) return;

      if (event.key === "ArrowRight") {
        setIndex((current) => Math.min(current + 1, slides.length - 1));
      }

      if (event.key === "ArrowLeft") {
        setIndex((current) => Math.max(current - 1, 0));
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mode, slides.length]);

  if (!lesson) {
    return <p>La clase todavía no está disponible.</p>;
  }

  if (!slides.length) {
    return <p>Esta clase no tiene diapositivas registradas.</p>;
  }

  return (
    <section className={`ad-classroom ad-mode-${mode}`}>
      <div className="ad-classroom-toolbar">
        <div>
          <span>
            {lesson.courseId === "seo"
              ? "ANÁLISIS SEO"
              : lesson.courseId === "crm"
                ? "GESTIÓN Y RELACIÓN CON EL CLIENTE"
                : "DISEÑO PARA GENERACIÓN DE CONTENIDO"}
          </span>
          <strong>
            Semana {lesson.number} · {lesson.title}
          </strong>
        </div>

        <div className="ad-mode-switch">
          <button
            type="button"
            className={mode === "reading" ? "selected" : ""}
            onClick={() => setMode("reading")}
          >
            Lectura
          </button>
          <button
            type="button"
            className={mode === "presentation" ? "selected" : ""}
            onClick={() => setMode("presentation")}
          >
            Presentación
          </button>
        </div>
      </div>

      {mode === "presentation" ? (
        <>
          <article className="ad-slide" key={slide.id}>
            <div className="ad-slide-heading">
              <div>
                <span className="ad-overline">{slide.block}</span>
                {slide.kind !== "cover" && <h2>{slide.title}</h2>}
              </div>
              <span className="ad-slide-number">
                {slide.id} / {slides.length}
              </span>
            </div>

            <SlideBody
              slide={slide}
              lesson={lesson}
              studentName={studentName}
            />

            {slide.question && (
              <div className="ad-question">
                <span>PARA DISCUTIR</span>
                <p>{slide.question}</p>
              </div>
            )}
          </article>

          <nav className="ad-slide-navigation">
            <button
              disabled={index === 0}
              onClick={() => setIndex((value) => value - 1)}
            >
              ← Anterior
            </button>

            <span>
              {index + 1} de {slides.length}
            </span>

            <button
              disabled={index === slides.length - 1}
              onClick={() => setIndex((value) => value + 1)}
            >
              Siguiente →
            </button>
          </nav>
        </>
      ) : (
        <div className="ad-reading">
          {slides.map((item) => (
            <article className="ad-slide" key={item.id}>
              <div className="ad-slide-heading">
                <div>
                  <span className="ad-overline">{item.block}</span>
                  {item.kind !== "cover" && <h2>{item.title}</h2>}
                </div>
                <span className="ad-slide-number">{item.id}</span>
              </div>

              <SlideBody
                slide={item}
                lesson={lesson}
                studentName={studentName}
              />

              {item.question && (
                <div className="ad-question">
                  <span>PARA DISCUTIR</span>
                  <p>{item.question}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <div className="ad-delivery-area">
        <button
          type="button"
          className="ad-delivery-toggle"
          onClick={() => setShowDelivery((value) => !value)}
          aria-expanded={showDelivery}
        >
          {showDelivery
            ? "Ocultar entrega académica"
            : "Abrir entrega académica y PDF"}
        </button>

        {showDelivery &&
          (lesson.courseId === "seo" ? (
            <SeoDownloadPDF lesson={lesson} studentName={studentName} />
          ) : (
            <DownloadPDF studentName={studentName} />
          ))}
      </div>
    </section>
  );
}
