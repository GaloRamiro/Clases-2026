import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana15.css";

const STAGES = [
  ["Preparación del estudio y roles", 10],
  ["Captura de tres fotografías", 15],
  ["Grabación de cinco clips", 15],
  ["Selección y edición fotográfica", 10],
  ["Diseño del anuncio gráfico", 5],
  ["Organización y entrega", 5],
];

const PHOTO_TYPES = ["Producto", "Proceso", "Experiencia"];

const CLIP_TYPES = [
  ["General", "Presentar el escenario"],
  ["Detalle", "Mostrar granos o empaque"],
  ["Medio", "Mostrar la preparación"],
  ["Detalle", "Mostrar café servido"],
  ["Producto", "Cierre publicitario"],
];

function initialData() {
  return {
    team: "",
    brand: "",
    campaign: "",
    concept: "",
    objective: "",
    audience: "",
    product: "",
    location: "",
    background: "",
    lighting: "",
    props: "",
    roles: {
      direction: "",
      camera: "",
      lighting: "",
      product: "",
    },
    evidence: "",
    photos: PHOTO_TYPES.map((type, index) => ({
      id: index + 1,
      type,
      shot: "",
      composition: "",
      light: "",
      original: "",
      edited: "",
      changes: "",
      evaluation: "",
    })),
    clips: CLIP_TYPES.map(([shot, action], index) => ({
      id: index + 1,
      shot,
      action,
      duration: "4",
      movement: "",
      continuity: "",
      link: "",
      reviewed: false,
    })),
    ad: {
      headline: "",
      copy: "",
      cta: "",
      photo: "1",
      composition: "",
      link: "",
    },
    storyboard: Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      action: "",
      shot: "",
      duration: "",
      text: "",
    })),
    selection: "",
    improvements: "",
    folder: "",
    done: Array(6).fill(false),
  };
}

function loadSaved(key) {
  const base = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      roles: {
        ...base.roles,
        ...(saved.roles || {}),
      },
      photos: base.photos.map((photo, i) => ({
        ...photo,
        ...(saved.photos?.[i] || {}),
      })),
      clips: base.clips.map((clip, i) => ({
        ...clip,
        ...(saved.clips?.[i] || {}),
      })),
      ad: {
        ...base.ad,
        ...(saved.ad || {}),
      },
      storyboard: base.storyboard.map((scene, i) => ({
        ...scene,
        ...(saved.storyboard?.[i] || {}),
      })),
      done: base.done.map((_, i) => Boolean(saved.done?.[i])),
    };
  } catch {
    return base;
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
}) {
  return (
    <label className="studio15-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Stage({ index, done, onDone, children }) {
  const [title, minutes] = STAGES[index];

  return (
    <section className="studio15-panel">
      <div className="studio15-stagehead">
        <h3>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {title}
        </h3>
        <small>{minutes} min</small>
      </div>

      {children}

      <label className="studio15-complete">
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => onDone(e.target.checked)}
        />
        Etapa completada
      </label>
    </section>
  );
}

export default function ContentWeek15Workshop({
  lessonId = "contenido-semana-15",
  studentName = "",
}) {
  const key = `aula:semana15:${lessonId}:${studentName || "anonimo"}`;

  const [session, setSession] = useState(() => ({
    key,
    data: loadSaved(key),
  }));

  const [notice, setNotice] = useState("");

  const data = session.key === key ? session.data : loadSaved(key);

  function save(next) {
    setSession({ key, data: next });

    try {
      localStorage.setItem(key, JSON.stringify(next));
      setNotice("Avance guardado en este navegador.");
    } catch {
      setNotice("No se pudo guardar el avance.");
    }
  }

  function setField(field, value) {
    save({ ...data, [field]: value });
  }

  function setRole(field, value) {
    save({
      ...data,
      roles: {
        ...data.roles,
        [field]: value,
      },
    });
  }

  function setArrayItem(group, index, field, value) {
    save({
      ...data,
      [group]: data[group].map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    });
  }

  function setAd(field, value) {
    save({
      ...data,
      ad: {
        ...data.ad,
        [field]: value,
      },
    });
  }

  function markStage(index, checked) {
    setField(
      "done",
      data.done.map((value, i) => (i === index ? checked : value)),
    );
  }

  const completed = data.done.filter(Boolean).length;

  const photosReady = data.photos.filter((photo) => photo.edited.trim()).length;

  const clipsReady = data.clips.filter((clip) => clip.link.trim()).length;

  function downloadReport() {
    const lines = [
      "LABORATORIO 15 — PRODUCCIÓN FOTOGRÁFICA",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Concepto: ${data.concept}`,
      `Objetivo: ${data.objective}`,
      `Público: ${data.audience}`,
      "",
      "PLAN DE PRODUCCIÓN",
      `Producto: ${data.product}`,
      `Lugar: ${data.location}`,
      `Fondo: ${data.background}`,
      `Iluminación: ${data.lighting}`,
      `Utilería: ${data.props}`,
      `Dirección: ${data.roles.direction}`,
      `Cámara: ${data.roles.camera}`,
      `Iluminación: ${data.roles.lighting}`,
      `Producto: ${data.roles.product}`,
      `Evidencia del montaje: ${data.evidence}`,
      "",
      "FOTOGRAFÍAS",
      ...data.photos.flatMap((photo) => [
        `Fotografía ${photo.id} — ${photo.type}`,
        `Plano: ${photo.shot}`,
        `Composición: ${photo.composition}`,
        `Luz: ${photo.light}`,
        `Original: ${photo.original}`,
        `Editada: ${photo.edited}`,
        `Cambios: ${photo.changes}`,
        `Evaluación: ${photo.evaluation}`,
        "",
      ]),
      "CLIPS AUDIOVISUALES",
      ...data.clips.flatMap((clip) => [
        `Clip ${clip.id}`,
        `Plano: ${clip.shot}`,
        `Acción: ${clip.action}`,
        `Duración: ${clip.duration} segundos`,
        `Movimiento: ${clip.movement}`,
        `Continuidad: ${clip.continuity}`,
        `Enlace: ${clip.link}`,
        `Revisado: ${clip.reviewed ? "Sí" : "No"}`,
        "",
      ]),
      "ANUNCIO GRÁFICO 4:5",
      `Fotografía: ${data.ad.photo}`,
      `Titular: ${data.ad.headline}`,
      `Copy: ${data.ad.copy}`,
      `CTA: ${data.ad.cta}`,
      `Composición: ${data.ad.composition}`,
      `Archivo: ${data.ad.link}`,
      "",
      "STORYBOARD INICIAL",
      ...data.storyboard.flatMap((scene) => [
        `Escena ${scene.id}`,
        `Acción: ${scene.action}`,
        `Plano: ${scene.shot}`,
        `Duración: ${scene.duration}`,
        `Texto: ${scene.text}`,
        "",
      ]),
      `Selección del material: ${data.selection}`,
      `Mejoras pendientes: ${data.improvements}`,
      `Carpeta de entrega: ${data.folder}`,
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "laboratorio-semana15.txt";
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="studio15">
      <header className="studio15-hero">
        <span>LABORATORIO 15 · 60 MINUTOS</span>
        <h2>Tu primera sesión fotográfica publicitaria</h2>
        <p>
          Prepara tu estudio, captura tres fotografías originales, graba cinco
          clips y diseña un anuncio con una fotografía propia.
        </p>

        <div className="studio15-progress">
          <strong>{completed}/6 etapas completadas</strong>
          <div>
            <span
              style={{
                width: `${(completed / 6) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      <section className="studio15-panel">
        <h3>Identificación del equipo</h3>

        <div className="studio15-grid">
          <Field
            label="Equipo"
            value={data.team}
            onChange={(v) => setField("team", v)}
          />

          <Field
            label="Marca de café"
            value={data.brand}
            onChange={(v) => setField("brand", v)}
          />
        </div>

        <Field
          label="Campaña"
          value={data.campaign}
          onChange={(v) => setField("campaign", v)}
        />
      </section>

      <Stage index={0} done={data.done[0]} onDone={(v) => markStage(0, v)}>
        <p>
          Organiza el escenario antes de tomar fotografías. Distribuye
          responsabilidades para que todos participen en la producción.
        </p>

        <div className="studio15-grid">
          <Field
            label="Concepto visual"
            value={data.concept}
            onChange={(v) => setField("concept", v)}
          />

          <Field
            label="Público objetivo"
            value={data.audience}
            onChange={(v) => setField("audience", v)}
          />
        </div>

        <Field
          label="Objetivo de las fotografías"
          value={data.objective}
          onChange={(v) => setField("objective", v)}
          multiline
        />

        <div className="studio15-grid">
          {[
            ["product", "Producto o prototipo"],
            ["location", "Lugar de la sesión"],
            ["background", "Fondo y superficie"],
            ["lighting", "Fuente y dirección de luz"],
            ["props", "Utilería y materiales"],
          ].map(([field, label]) => (
            <Field
              key={field}
              label={label}
              value={data[field]}
              onChange={(v) => setField(field, v)}
            />
          ))}
        </div>

        <h4>Responsables</h4>

        <div className="studio15-grid">
          {[
            ["direction", "Dirección de arte"],
            ["camera", "Cámara"],
            ["lighting", "Iluminación"],
            ["product", "Producto y escenario"],
          ].map(([field, label]) => (
            <Field
              key={field}
              label={label}
              value={data.roles[field]}
              onChange={(v) => setRole(field, v)}
              placeholder="Nombre del integrante"
            />
          ))}
        </div>

        <Field
          label="Enlace a la evidencia del montaje"
          value={data.evidence}
          onChange={(v) => setField("evidence", v)}
        />

        <div className="studio15-note">
          Materiales recomendados: teléfono cargado, taza o prototipo, mesa,
          tela o cartulina, reflector improvisado y trípode opcional.
        </div>
      </Stage>

      <Stage index={1} done={data.done[1]} onDone={(v) => markStage(1, v)}>
        <p>
          Captura tres fotografías originales: producto, proceso y experiencia.
          Utiliza planos distintos y deja espacio para futuros titulares.
        </p>

        <div className="studio15-three">
          {data.photos.map((photo, index) => (
            <div className="studio15-photo" key={photo.id}>
              <div className="studio15-photohead">
                <span>FOTO {photo.id}</span>
                <strong>{photo.type}</strong>
              </div>

              <Field
                label="Plano fotográfico"
                value={photo.shot}
                onChange={(v) => setArrayItem("photos", index, "shot", v)}
                placeholder="General, medio o detalle"
              />

              <Field
                label="Composición"
                value={photo.composition}
                onChange={(v) =>
                  setArrayItem("photos", index, "composition", v)
                }
                multiline
              />

              <Field
                label="Iluminación utilizada"
                value={photo.light}
                onChange={(v) => setArrayItem("photos", index, "light", v)}
              />

              <Field
                label="Enlace a fotografía original"
                value={photo.original}
                onChange={(v) => setArrayItem("photos", index, "original", v)}
              />
            </div>
          ))}
        </div>

        <div className="studio15-note">
          Las fotografías deben ser capturadas por el equipo. No se aceptan
          imágenes generadas por IA como sustituto de estas capturas.
        </div>
      </Stage>

      <Stage index={2} done={data.done[2]} onDone={(v) => markStage(2, v)}>
        <p>
          Graba cinco clips originales en vertical 9:16. Cada uno debe durar
          aproximadamente de 3 a 6 segundos y dejar margen para edición.
        </p>

        <div className="studio15-clips">
          {data.clips.map((clip, index) => (
            <div className="studio15-clip" key={clip.id}>
              <div className="studio15-cliphead">
                <strong>CLIP {clip.id}</strong>
                <span>{clip.shot}</span>
              </div>

              <Field
                label="Acción"
                value={clip.action}
                onChange={(v) => setArrayItem("clips", index, "action", v)}
              />

              <div className="studio15-grid">
                <label className="studio15-field">
                  <span>Duración</span>
                  <select
                    value={clip.duration}
                    onChange={(e) =>
                      setArrayItem("clips", index, "duration", e.target.value)
                    }
                  >
                    {[3, 4, 5, 6].map((seconds) => (
                      <option key={seconds} value={String(seconds)}>
                        {seconds} segundos
                      </option>
                    ))}
                  </select>
                </label>

                <Field
                  label="Movimiento de cámara"
                  value={clip.movement}
                  onChange={(v) => setArrayItem("clips", index, "movement", v)}
                  placeholder="Fijo, acercamiento..."
                />
              </div>

              <Field
                label="Continuidad"
                value={clip.continuity}
                onChange={(v) => setArrayItem("clips", index, "continuity", v)}
                placeholder="Luz, posición de objetos, dirección"
              />

              <Field
                label="Enlace al video original"
                value={clip.link}
                onChange={(v) => setArrayItem("clips", index, "link", v)}
              />

              <label className="studio15-check">
                <input
                  type="checkbox"
                  checked={clip.reviewed}
                  onChange={(e) =>
                    setArrayItem("clips", index, "reviewed", e.target.checked)
                  }
                />
                Clip revisado
              </label>
            </div>
          ))}
        </div>
      </Stage>

      <Stage index={3} done={data.done[3]} onDone={(v) => markStage(3, v)}>
        <p>
          Selecciona las tres mejores fotografías y mejóralas mediante recorte,
          exposición, contraste y color. Conserva los originales.
        </p>

        <div className="studio15-three">
          {data.photos.map((photo, index) => (
            <div className="studio15-photo" key={photo.id}>
              <h4>
                Fotografía {photo.id} · {photo.type}
              </h4>

              <Field
                label="Cambios realizados"
                value={photo.changes}
                onChange={(v) => setArrayItem("photos", index, "changes", v)}
                multiline
              />

              <Field
                label="Enlace a fotografía editada"
                value={photo.edited}
                onChange={(v) => setArrayItem("photos", index, "edited", v)}
              />

              <Field
                label="Evaluación de calidad"
                value={photo.evaluation}
                onChange={(v) => setArrayItem("photos", index, "evaluation", v)}
                multiline
                placeholder="Enfoque, luz, composición y coherencia"
              />
            </div>
          ))}
        </div>
      </Stage>

      <Stage index={4} done={data.done[4]} onDone={(v) => markStage(4, v)}>
        <p>
          Diseña un anuncio 4:5 utilizando una de tus fotografías originales
          editadas. Añade identidad visual, titular y CTA.
        </p>

        <div className="studio15-grid">
          <div>
            <label className="studio15-field">
              <span>Fotografía seleccionada</span>
              <select
                value={data.ad.photo}
                onChange={(e) => setAd("photo", e.target.value)}
              >
                {data.photos.map((photo) => (
                  <option key={photo.id} value={String(photo.id)}>
                    Fotografía {photo.id} · {photo.type}
                  </option>
                ))}
              </select>
            </label>

            <Field
              label="Titular publicitario"
              value={data.ad.headline}
              onChange={(v) => setAd("headline", v)}
            />

            <Field
              label="Copy"
              value={data.ad.copy}
              onChange={(v) => setAd("copy", v)}
              multiline
            />

            <Field
              label="CTA"
              value={data.ad.cta}
              onChange={(v) => setAd("cta", v)}
            />

            <Field
              label="Decisiones de composición"
              value={data.ad.composition}
              onChange={(v) => setAd("composition", v)}
              multiline
            />

            <Field
              label="Enlace al anuncio terminado"
              value={data.ad.link}
              onChange={(v) => setAd("link", v)}
            />
          </div>

          <div className="studio15-previewarea">
            <div className="studio15-preview">
              <small>{data.brand || "TU MARCA DE CAFÉ"}</small>

              <div className="studio15-previewimage">FOTOGRAFÍA ORIGINAL</div>

              <strong>{data.ad.headline || "Tu titular publicitario"}</strong>

              <span>{data.ad.cta || "Tu llamado a la acción"}</span>
            </div>

            <p>Maqueta conceptual · Formato 4:5</p>
          </div>
        </div>
      </Stage>

      <Stage index={5} done={data.done[5]} onDone={(v) => markStage(5, v)}>
        <p>
          Organiza los archivos y prepara la historia audiovisual que editarás
          en la Semana 16. El storyboard de seis escenas puede completarse y
          perfeccionarse como trabajo autónomo.
        </p>

        <h4>Storyboard inicial · Seis escenas</h4>

        <div className="studio15-storyboard">
          {data.storyboard.map((scene, index) => (
            <div className="studio15-scene" key={scene.id}>
              <div className="studio15-scenehead">ESCENA {scene.id}</div>

              <Field
                label="Acción"
                value={scene.action}
                onChange={(v) => setArrayItem("storyboard", index, "action", v)}
              />

              <Field
                label="Plano"
                value={scene.shot}
                onChange={(v) => setArrayItem("storyboard", index, "shot", v)}
              />

              <Field
                label="Duración estimada"
                value={scene.duration}
                onChange={(v) =>
                  setArrayItem("storyboard", index, "duration", v)
                }
                placeholder="Ej. 4 segundos"
              />

              <Field
                label="Texto o mensaje"
                value={scene.text}
                onChange={(v) => setArrayItem("storyboard", index, "text", v)}
              />
            </div>
          ))}
        </div>

        <div className="studio15-deliverables">
          {[
            ["Fotografías editadas", `${photosReady}/3`],
            ["Clips registrados", `${clipsReady}/5`],
            [
              "Anuncio gráfico",
              data.ad.link.trim() ? "Registrado" : "Pendiente",
            ],
            [
              "Evidencia del montaje",
              data.evidence.trim() ? "Registrada" : "Pendiente",
            ],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <Field
          label="¿Qué material utilizarán para el anuncio?"
          value={data.selection}
          onChange={(v) => setField("selection", v)}
          multiline
        />

        <Field
          label="¿Qué necesitan mejorar o volver a grabar?"
          value={data.improvements}
          onChange={(v) => setField("improvements", v)}
          multiline
        />

        <Field
          label="Carpeta de entrega"
          value={data.folder}
          onChange={(v) => setField("folder", v)}
        />

        <div className="studio15-rubric">
          <h4>Rúbrica · 50 puntos</h4>
          {[
            ["Planificación y roles", 5],
            ["Tres fotografías originales", 15],
            ["Cinco clips originales", 15],
            ["Anuncio con fotografía propia", 10],
            ["Presentación y justificación", 5],
          ].map(([label, points]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{points} pts.</strong>
            </div>
          ))}
        </div>
      </Stage>

      <footer className="studio15-footer">
        <div className="studio15-summary">
          <strong>{completed}/6 etapas</strong>
          <strong>{photosReady}/3 fotografías</strong>
          <strong>{clipsReady}/5 clips</strong>
        </div>

        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "contenido",
            number: 15,
            title: "De la pantalla al estudio. Ahora tú eres el fotógrafo.",
          }}
          title="Laboratorio 15: Producción fotográfica y audiovisual"
          answers={{
            "Nombre del equipo": data.team,
            "Marca de café": data.brand,
            Campaña: data.campaign,
            "Concepto visual": data.concept,
            "Objetivo de las fotografías": data.objective,
            "Público objetivo": data.audience,

            "PLAN DE PRODUCCIÓN - Producto": data.product,
            "PLAN DE PRODUCCIÓN - Lugar de la sesión": data.location,
            "PLAN DE PRODUCCIÓN - Fondo y superficie": data.background,
            "PLAN DE PRODUCCIÓN - Fuente y dirección de luz": data.lighting,
            "PLAN DE PRODUCCIÓN - Utilería y materiales": data.props,

            "RESPONSABLE - Dirección de arte": data.roles.direction,
            "RESPONSABLE - Cámara": data.roles.camera,
            "RESPONSABLE - Iluminación": data.roles.lighting,
            "RESPONSABLE - Producto y escenario": data.roles.product,

            "Enlace a evidencia del montaje": data.evidence,

            ...Object.fromEntries(
              data.photos.flatMap((photo, index) => {
                const prefix = `FOTOGRAFÍA ${index + 1}`;

                return [
                  [`${prefix} - Tipo`, photo.type],
                  [`${prefix} - Plano fotográfico`, photo.shot],
                  [`${prefix} - Composición`, photo.composition],
                  [`${prefix} - Iluminación utilizada`, photo.light],
                  [`${prefix} - Enlace original`, photo.original],
                  [`${prefix} - Enlace editada`, photo.edited],
                  [`${prefix} - Cambios realizados`, photo.changes],
                  [`${prefix} - Evaluación de calidad`, photo.evaluation],
                ];
              }),
            ),

            ...Object.fromEntries(
              data.clips.flatMap((clip, index) => {
                const prefix = `CLIP AUDIOVISUAL ${index + 1}`;

                return [
                  [`${prefix} - Plano`, clip.shot],
                  [`${prefix} - Acción`, clip.action],
                  [`${prefix} - Duración`, `${clip.duration} segundos`],
                  [`${prefix} - Movimiento de cámara`, clip.movement],
                  [`${prefix} - Continuidad`, clip.continuity],
                  [`${prefix} - Enlace al video`, clip.link],
                  [`${prefix} - Revisado`, clip.reviewed ? "Sí" : "No"],
                ];
              }),
            ),

            "ANUNCIO GRÁFICO - Formato": "4:5",
            "ANUNCIO GRÁFICO - Fotografía seleccionada": data.ad.photo,
            "ANUNCIO GRÁFICO - Titular publicitario": data.ad.headline,
            "ANUNCIO GRÁFICO - Copy": data.ad.copy,
            "ANUNCIO GRÁFICO - CTA": data.ad.cta,
            "ANUNCIO GRÁFICO - Decisiones de composición": data.ad.composition,
            "ANUNCIO GRÁFICO - Enlace al anuncio terminado": data.ad.link,

            ...Object.fromEntries(
              data.storyboard.flatMap((scene, index) => {
                const prefix = `STORYBOARD - ESCENA ${index + 1}`;

                return [
                  [`${prefix} - Acción`, scene.action],
                  [`${prefix} - Plano`, scene.shot],
                  [`${prefix} - Duración estimada`, scene.duration],
                  [`${prefix} - Texto o mensaje`, scene.text],
                ];
              }),
            ),

            "Material seleccionado para el anuncio": data.selection,
            "Mejoras pendientes o nuevas grabaciones": data.improvements,
            "Enlace a carpeta de entrega": data.folder,

            ...Object.fromEntries(
              data.done.map((checked, index) => [
                `Etapa ${index + 1} completada`,
                checked ? "Sí" : "No",
              ]),
            ),

            "Progreso general": `${completed} de 6 etapas`,
            "Fotografías editadas registradas": `${photosReady} de 3`,
            "Clips registrados": `${clipsReady} de 5`,
            "Anuncio gráfico registrado": data.ad.link.trim() ? "Sí" : "No",
            "Evidencia del montaje registrada": data.evidence.trim()
              ? "Sí"
              : "No",
          }}
        />

        <p>{notice}</p>

        <p>
          Trabajo autónomo: completa ocho fotografías originales editadas, tres
          anuncios gráficos acumulados y un storyboard de seis escenas. Organiza
          los clips para la edición audiovisual de la Semana 16.
        </p>
      </footer>
    </div>
  );
}
