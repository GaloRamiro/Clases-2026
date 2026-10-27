import { useEffect, useState } from "react";

import PushPullLab from "./PushPullLab";
import { getLessonWork, saveLessonWork } from "../../services/storage";
import "../../styles/semana01.css";
import SeoWorkshop from "./SeoWorkshop";
import SeoKeywordWorkshop from "./SeoKeywordWorkshop.jsx";
import SeoWeek03Workshop from "./SeoWeek03Workshop";
import SeoWeek04Workshop from "./SeoWeek04Workshop";
import SeoWeek05Workshop from "./SeoWeek05Workshop";
import SeoWeek06Workshop from "./SeoWeek06Workshop";
import SeoWeek07Workshop from "./SeoWeek07Workshop";
import SeoWeek08Workshop from "./SeoWeek08Workshop";
import SeoWeek09Workshop from "./SeoWeek09Workshop";
import SeoWeek10Workshop from "./SeoWeek10Workshop";
import SeoWeek11Workshop from "./SeoWeek11Workshop";
import SeoWeek12Workshop from "./SeoWeek12Workshop";
import SeoWeek13Workshop from "./SeoWeek13Workshop";
import SeoWeek14Workshop from "./SeoWeek14Workshop";
import SeoWeek14Resources from "./SeoWeek14Resources";
import SeoWeek15Workshop from "./SeoWeek15Workshop";
import SeoWeek15Resources from "./SeoWeek15Resources";
import SeoWeek16Workshop from "./SeoWeek16Workshop";
import SeoWeek16Resources from "./SeoWeek16Resources";
import SeoWeek17Workshop from "./SeoWeek17Workshop";
import SeoWeek17Resources from "./SeoWeek17Resources";
import SeoWeek18Workshop from "./SeoWeek18Workshop";
import SeoWeek18Resources from "./SeoWeek18Resources";
import CrmWorkshop from "./CrmWorkshop";
import CrmWeek02Workshop from "./CrmWeek02Workshop";
import CrmWeek03Workshop from "./CrmWeek03Workshop";
import CrmWeek04Workshop from "./CrmWeek04Workshop";
import ContentWeek02Workshop from "./ContentWeek02Workshop";
import ContentWeek03Workshop from "./ContentWeek03Workshop";
import ContentWeek04Workshop from "./ContentWeek04Workshop";
import ContentWeek05Workshop from "./ContentWeek05Workshop";
import ContentWeek06Workshop from "./ContentWeek06Workshop";
import ContentWeek07Workshop from "./ContentWeek07Workshop";
import ContentWeek08Workshop from "./ContentWeek08Workshop";
import ContentWeek09Workshop from "./ContentWeek09Workshop";
import ContentWeek10Workshop from "./ContentWeek10Workshop";
import ContentWeek11Workshop from "./ContentWeek11Workshop";
import ContentWeek12Workshop from "./ContentWeek12Workshop";
import ContentWeek13Workshop from "./ContentWeek13Workshop";
import ContentWeek14Workshop from "./ContentWeek14Workshop";
import ContentWeek15Workshop from "./ContentWeek15Workshop";
import ContentWeek16Workshop from "./ContentWeek16Workshop";
import ContentWeek17Workshop from "./ContentWeek17Workshop";
import ContentWeek18Workshop from "./ContentWeek18Workshop";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

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

function Workshop({ lesson, studentName }) {
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
          Cada equipo desarrollará su propia propuesta de marca. Las respuestas
          se guardarán automáticamente y podrán descargarse en PDF al finalizar
          el taller.
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

      <WorkshopDownloadButton
        studentName={studentName}
        lesson={lesson}
        title="Un café, múltiples marcas"
        answers={Object.fromEntries(
          WORK_FIELDS.map(([key, label]) => [label, work[key] || ""]),
        )}
      />
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
  console.log("DIAGNÓSTICO AULA DIGITAL", {
    semana: lesson.number,
    slide: slide.id,
    kind: slide.kind,
  });
  switch (slide.kind) {
    case "cover":
      return (
        <div className="ad-cover-layout">
          <div className="ad-cover-copy">
            <span className="ad-overline">
              {slide.block ||
                `SEMANA ${String(lesson.number).padStart(2, "0")}`}
            </span>
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
    case "seo-architecture-lab":
    case "seo-onpage-lab":
    case "seo-peer-review":
      return (
        <SeoWeek04Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-crawl-audit":
    case "seo-performance-audit":
      return (
        <SeoWeek05Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-offpage-research":
    case "seo-offpage-strategy":
      return (
        <SeoWeek06Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-integral-audit":
    case "seo-roadmap-lab":
      return (
        <SeoWeek07Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-sem-research":
    case "seo-sem-brief":
      return (
        <SeoWeek08Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-sem-keywords":
    case "seo-sem-campaign":
      return (
        <SeoWeek09Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-sem-ad-copy":
    case "seo-sem-landing-ab":
      return (
        <SeoWeek10Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-multichannel-funnel":
    case "seo-multichannel-media":
      return (
        <SeoWeek11Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-sem-performance":
    case "seo-sem-optimization":
      return (
        <SeoWeek12Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-aeo-audit":
    case "seo-aeo-content":
      return (
        <SeoWeek13Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );
    case "seo-geo-audit":
    case "seo-geo-publish":
      return (
        <SeoWeek14Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );

    case "seo-geo-template":
    case "seo-geo-publish-guide":
      return <SeoWeek14Resources kind={slide.kind} />;
    case "seo15-install":
    case "seo15-events":
      return (
        <SeoWeek15Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );

    case "seo15-flow":
    case "seo15-cta-guide":
    case "seo15-faq-guide":
      return <SeoWeek15Resources kind={slide.kind} />;
    case "seo16-gsc-lab":
    case "seo16-dashboard-lab":
      return (
        <SeoWeek16Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );

    case "seo16-looker-guide":
    case "seo16-dashboard-resource":
      return <SeoWeek16Resources kind={slide.kind} />;
    case "seo17-diagnosis-lab":
    case "seo17-roadmap-lab":
    case "seo17-presentation-lab":
    case "seo17-peer-review":
      return (
        <SeoWeek17Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );

    case "seo17-priority-guide":
    case "seo17-report-guide":
    case "seo17-presentation-guide":
      return <SeoWeek17Resources kind={slide.kind} />;

    case "seo18-checklist":
    case "seo18-evidence":
    case "seo18-defense":
    case "seo18-reflection":
    case "seo18-portfolio":
    case "seo18-final":
      return (
        <SeoWeek18Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );

    case "seo18-rules":
    case "seo18-presentation-guide":
      return <SeoWeek18Resources kind={slide.kind} />;
    case "crm-glossary":
    case "crm-bitrix-lab":
    case "crm-followup":
      return (
        <CrmWorkshop
          kind={slide.kind}
          slide={slide}
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

          <Workshop lesson={lesson} studentName={studentName} />
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

    case "seo-competitor-map":
    case "seo-benchmark-lab":
    case "seo-competitive-plan":
      return (
        <SeoWeek03Workshop
          kind={slide.kind}
          slide={slide}
          lessonId={lesson.id}
          studentName={studentName}
        />
      );

    case "content-buyer-lab":
      return (
        <ContentWeek02Workshop lessonId={lesson.id} studentName={studentName} />
      );
    case "content-empathy-lab":
      return (
        <ContentWeek03Workshop lessonId={lesson.id} studentName={studentName} />
      );
    case "content-copywriting-lab":
      return (
        <ContentWeek04Workshop lessonId={lesson.id} studentName={studentName} />
      );
    case "content-formats-lab":
      return (
        <ContentWeek05Workshop lessonId={lesson.id} studentName={studentName} />
      );
    case "content-creative-brief-lab":
      return (
        <ContentWeek06Workshop lessonId={lesson.id} studentName={studentName} />
      );
    case "content-storytelling-lab":
      return (
        <ContentWeek07Workshop lessonId={lesson.id} studentName={studentName} />
      );
    case "content-visual-identity-lab":
      return (
        <ContentWeek08Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-cronopost-lab":
      return (
        <ContentWeek09Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-campaign-lab":
      return (
        <ContentWeek10Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-funnel-lab":
      return (
        <ContentWeek11Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-kpi-lab":
      return (
        <ContentWeek12Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-microcontent-lab":
      return (
        <ContentWeek13Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-art-direction-lab":
      return (
        <ContentWeek14Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-photo-production-lab":
      return (
        <ContentWeek15Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-video-editing-lab":
      return (
        <ContentWeek16Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-multiplatform-lab":
      return (
        <ContentWeek17Workshop lessonId={lesson.id} studentName={studentName} />
      );

    case "content-final-defense-lab":
      return (
        <ContentWeek18Workshop lessonId={lesson.id} studentName={studentName} />
      );

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

  const slides = lesson?.slides || [];
  const slide = slides[index];

  useEffect(() => {
    setIndex(0);
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
    </section>
  );
}
