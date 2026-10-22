import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";
import "../../styles/contenidoSemana16.css";

const STAGES = [
  ["Organización del material", 5],
  ["Construcción de la secuencia", 10],
  ["Montaje y ritmo", 15],
  ["Audio, títulos y subtítulos", 10],
  ["Identidad visual y acabado", 10],
  ["Exportación de dos versiones", 5],
  ["Portada, revisión y entrega", 5],
];

const initialScenes = [
  { start: 0, end: 4, shot: "Contexto", action: "", text: "", audio: "" },
  { start: 4, end: 10, shot: "Producto", action: "", text: "", audio: "" },
  { start: 10, end: 18, shot: "Preparación", action: "", text: "", audio: "" },
  { start: 18, end: 24, shot: "Experiencia", action: "", text: "", audio: "" },
  { start: 24, end: 30, shot: "Cierre", action: "", text: "", audio: "" },
];

function initialData() {
  return {
    team: "",
    brand: "",
    campaign: "",
    audience: "",
    message: "",
    objective: "",
    editor: "",
    folder: "",
    storyboard: "",
    footage: "",
    logo: "",
    typography: "",
    colors: "",
    soundtrack: "",
    soundtrackRights: "",
    voice: "",
    subtitles: "",
    rhythm: "Progresivo",
    transitions: "",
    continuity: "",
    editingDecisions: "",
    colorCorrection: "",
    headline: "",
    cta: "",
    silentViewing: "",
    scenes: initialScenes.map((scene) => ({ ...scene })),
    main: {
      duration: 30,
      resolution: "1080 × 1920",
      format: "MP4",
      codec: "H.264",
      fps: "30",
      audio: "AAC",
      link: "",
    },
    short: {
      duration: 15,
      hook: "",
      message: "",
      cta: "",
      link: "",
    },
    cover: {
      headline: "",
      composition: "",
      link: "",
    },
    feedback: "",
    pending: "",
    done: Array(7).fill(false),
  };
}

function readSaved(key) {
  const base = initialData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (!saved || typeof saved !== "object") return base;

    return {
      ...base,
      ...saved,
      scenes: base.scenes.map((scene, index) => ({
        ...scene,
        ...(saved.scenes?.[index] || {}),
      })),
      main: { ...base.main, ...(saved.main || {}) },
      short: { ...base.short, ...(saved.short || {}) },
      cover: { ...base.cover, ...(saved.cover || {}) },
      done: base.done.map((_, index) => Boolean(saved.done?.[index])),
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
  type = "text",
}) {
  return (
    <label className="video16-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function Stage({ index, done, onDone, children }) {
  const [name, minutes] = STAGES[index];

  return (
    <section className="video16-panel">
      <div className="video16-stagehead">
        <h3>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {name}
        </h3>
        <small>{minutes} min</small>
      </div>

      {children}

      <label className="video16-complete">
        <input
          type="checkbox"
          checked={done}
          onChange={(event) => onDone(event.target.checked)}
        />
        Etapa completada
      </label>
    </section>
  );
}

export default function ContentWeek16Workshop({
  lessonId = "contenido-semana-16",
  studentName = "",
}) {
  const key = `aula:semana16:${lessonId}:${studentName || "anonimo"}`;

  const [session, setSession] = useState(() => ({
    key,
    data: readSaved(key),
  }));

  const [notice, setNotice] = useState("");

  const data = session.key === key ? session.data : readSaved(key);

  function save(next) {
    setSession({ key, data: next });

    try {
      localStorage.setItem(key, JSON.stringify(next));
      setNotice("Avance guardado en este navegador.");
    } catch {
      setNotice("No se pudo guardar el avance.");
    }
  }

  function update(field, value) {
    save({ ...data, [field]: value });
  }

  function updateNested(group, field, value) {
    save({
      ...data,
      [group]: {
        ...data[group],
        [field]: value,
      },
    });
  }

  function updateScene(index, field, value) {
    save({
      ...data,
      scenes: data.scenes.map((scene, i) =>
        i === index ? { ...scene, [field]: value } : scene,
      ),
    });
  }

  function markDone(index, checked) {
    update(
      "done",
      data.done.map((value, i) => (i === index ? checked : value)),
    );
  }

  const completed = data.done.filter(Boolean).length;

  const totalDuration = data.scenes.reduce(
    (sum, scene) =>
      sum + Math.max(0, Number(scene.end || 0) - Number(scene.start || 0)),
    0,
  );

  const mainDuration = Number(data.main.duration);
  const shortDuration = Number(data.short.duration);

  const validMain = mainDuration >= 20 && mainDuration <= 30;
  const validShort = shortDuration >= 10 && shortDuration <= 15;

  function downloadReport() {
    const lines = [
      "SEMANA 16 — FICHA DE PRODUCCIÓN AUDIOVISUAL",
      "",
      `Equipo: ${data.team}`,
      `Marca: ${data.brand}`,
      `Campaña: ${data.campaign}`,
      `Público: ${data.audience}`,
      `Objetivo: ${data.objective}`,
      `Mensaje: ${data.message}`,
      `Editor: ${data.editor}`,
      "",
      "MATERIAL DE ORIGEN",
      `Carpeta: ${data.folder}`,
      `Storyboard: ${data.storyboard}`,
      `Clips originales: ${data.footage}`,
      `Logotipo: ${data.logo}`,
      "",
      "GUION DE EDICIÓN",
      ...data.scenes.flatMap((scene, index) => [
        `Escena ${index + 1}`,
        `Tiempo: ${scene.start}–${scene.end} s`,
        `Plano: ${scene.shot}`,
        `Acción: ${scene.action}`,
        `Texto: ${scene.text}`,
        `Audio: ${scene.audio}`,
        "",
      ]),
      "DECISIONES DE MONTAJE",
      `Ritmo: ${data.rhythm}`,
      `Transiciones: ${data.transitions}`,
      `Continuidad: ${data.continuity}`,
      `Decisiones: ${data.editingDecisions}`,
      "",
      "SONIDO Y SUBTÍTULOS",
      `Música: ${data.soundtrack}`,
      `Derechos: ${data.soundtrackRights}`,
      `Voz: ${data.voice}`,
      `Subtítulos: ${data.subtitles}`,
      `Comprensión sin sonido: ${data.silentViewing}`,
      "",
      "IDENTIDAD VISUAL",
      `Tipografía: ${data.typography}`,
      `Colores: ${data.colors}`,
      `Corrección de color: ${data.colorCorrection}`,
      `Titular: ${data.headline}`,
      `CTA: ${data.cta}`,
      "",
      "ANUNCIO PRINCIPAL",
      `Duración: ${data.main.duration} s`,
      `Resolución: ${data.main.resolution}`,
      `Contenedor: ${data.main.format}`,
      `Códec: ${data.main.codec}`,
      `FPS: ${data.main.fps}`,
      `Audio: ${data.main.audio}`,
      `Enlace: ${data.main.link}`,
      "",
      "VERSIÓN CORTA",
      `Duración: ${data.short.duration} s`,
      `Gancho: ${data.short.hook}`,
      `Mensaje: ${data.short.message}`,
      `CTA: ${data.short.cta}`,
      `Enlace: ${data.short.link}`,
      "",
      "PORTADA",
      `Titular: ${data.cover.headline}`,
      `Composición: ${data.cover.composition}`,
      `Enlace: ${data.cover.link}`,
      "",
      `Retroalimentación: ${data.feedback}`,
      `Mejoras pendientes: ${data.pending}`,
    ];

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "laboratorio-semana16.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="video16">
      <header className="video16-hero">
        <span>LABORATORIO 16 · 60 MINUTOS</span>
        <h2>Produce el anuncio audiovisual de tu marca</h2>
        <p>
          Transforma las grabaciones de la Semana 15 en una historia
          publicitaria de 20 a 30 segundos. Después crea una versión corta y su
          portada.
        </p>

        <div className="video16-progress">
          <strong>{completed}/7 etapas completadas</strong>
          <div>
            <span
              style={{
                width: `${(completed / 7) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      <section className="video16-panel">
        <h3>Datos del equipo</h3>

        <div className="video16-grid">
          <Field
            label="Equipo"
            value={data.team}
            onChange={(value) => update("team", value)}
          />
          <Field
            label="Marca de café"
            value={data.brand}
            onChange={(value) => update("brand", value)}
          />
        </div>

        <Field
          label="Nombre de campaña"
          value={data.campaign}
          onChange={(value) => update("campaign", value)}
        />
      </section>

      <Stage
        index={0}
        done={data.done[0]}
        onDone={(value) => markDone(0, value)}
      >
        <p>
          Recupera el material original y el storyboard de la Semana 15.
          Organiza los archivos antes de abrir el editor.
        </p>

        <div className="video16-grid">
          <Field
            label="Público objetivo"
            value={data.audience}
            onChange={(value) => update("audience", value)}
          />
          <Field
            label="Editor de video"
            value={data.editor}
            onChange={(value) => update("editor", value)}
            placeholder="CapCut, Clipchamp, DaVinci..."
          />
        </div>

        <Field
          label="Objetivo del anuncio"
          value={data.objective}
          onChange={(value) => update("objective", value)}
          multiline
        />

        <Field
          label="Mensaje principal"
          value={data.message}
          onChange={(value) => update("message", value)}
        />

        <div className="video16-grid">
          <Field
            label="Carpeta de producción"
            value={data.folder}
            onChange={(value) => update("folder", value)}
          />
          <Field
            label="Storyboard de Semana 15"
            value={data.storyboard}
            onChange={(value) => update("storyboard", value)}
          />
          <Field
            label="Carpeta de clips originales"
            value={data.footage}
            onChange={(value) => update("footage", value)}
          />
          <Field
            label="Archivo del logotipo"
            value={data.logo}
            onChange={(value) => update("logo", value)}
          />
        </div>

        <div className="video16-note">
          Antes de iniciar, confirma que tienes clips, logotipo, tipografías,
          música autorizada y storyboard. El objetivo es editar, no grabar
          nuevamente desde cero.
        </div>
      </Stage>

      <Stage
        index={1}
        done={data.done[1]}
        onDone={(value) => markDone(1, value)}
      >
        <p>
          Ordena cinco escenas. Registra el tiempo, la acción, el texto y el
          sonido previsto. Puedes modificar los tiempos de la plantilla.
        </p>

        <div className="video16-timeline">
          {data.scenes.map((scene, index) => {
            const duration = Math.max(
              0,
              Number(scene.end) - Number(scene.start),
            );

            return (
              <div className="video16-scene" key={index}>
                <div className="video16-scenehead">
                  <strong>ESCENA {index + 1}</strong>
                  <span>{duration} s</span>
                </div>

                <div className="video16-grid">
                  <Field
                    label="Inicio (segundos)"
                    type="number"
                    value={scene.start}
                    onChange={(value) => updateScene(index, "start", value)}
                  />

                  <Field
                    label="Final (segundos)"
                    type="number"
                    value={scene.end}
                    onChange={(value) => updateScene(index, "end", value)}
                  />
                </div>

                <Field
                  label="Plano"
                  value={scene.shot}
                  onChange={(value) => updateScene(index, "shot", value)}
                />

                <Field
                  label="Acción visual"
                  value={scene.action}
                  onChange={(value) => updateScene(index, "action", value)}
                />

                <Field
                  label="Texto en pantalla"
                  value={scene.text}
                  onChange={(value) => updateScene(index, "text", value)}
                />

                <Field
                  label="Sonido o música"
                  value={scene.audio}
                  onChange={(value) => updateScene(index, "audio", value)}
                />
              </div>
            );
          })}
        </div>

        <div className="video16-total">
          <strong>Duración acumulada de escenas: {totalDuration} s</strong>
          <span>Objetivo del anuncio: entre 20 y 30 segundos.</span>
        </div>

        <p className="video16-hint">
          La duración acumulada suma cada tramo registrado. Comprueba también
          que no existan huecos ni solapamientos involuntarios entre escenas.
        </p>
      </Stage>

      <Stage
        index={2}
        done={data.done[2]}
        onDone={(value) => markDone(2, value)}
      >
        <p>
          Importa los clips al editor y construye la secuencia. Ajusta cortes,
          duración y ritmo según el concepto publicitario.
        </p>

        <label className="video16-field">
          <span>Ritmo narrativo</span>
          <select
            value={data.rhythm}
            onChange={(event) => update("rhythm", event.target.value)}
          >
            <option>Rápido</option>
            <option>Pausado</option>
            <option>Progresivo</option>
            <option>Mixto</option>
          </select>
        </label>

        <Field
          label="Transiciones seleccionadas"
          value={data.transitions}
          onChange={(value) => update("transitions", value)}
          multiline
          placeholder="Cortes directos, fundidos o continuidad de movimiento"
        />

        <Field
          label="Cómo se mantiene la continuidad"
          value={data.continuity}
          onChange={(value) => update("continuity", value)}
          multiline
        />

        <Field
          label="Justificación de las decisiones de montaje"
          value={data.editingDecisions}
          onChange={(value) => update("editingDecisions", value)}
          multiline
        />

        <div className="video16-note">
          Revisa si el gancho aparece al inicio, si el desarrollo es
          comprensible y si el cierre presenta claramente la marca y el CTA.
        </div>
      </Stage>

      <Stage
        index={3}
        done={data.done[3]}
        onDone={(value) => markDone(3, value)}
      >
        <p>
          Incorpora sonido, música, títulos y subtítulos. El video debe ser
          comprensible incluso cuando se reproduce sin audio.
        </p>

        <Field
          label="Música y efectos utilizados"
          value={data.soundtrack}
          onChange={(value) => update("soundtrack", value)}
          multiline
        />

        <Field
          label="Origen y autorización del audio"
          value={data.soundtrackRights}
          onChange={(value) => update("soundtrackRights", value)}
          multiline
        />

        <Field
          label="Voz en off o sonido ambiente"
          value={data.voice}
          onChange={(value) => update("voice", value)}
        />

        <Field
          label="Textos y subtítulos"
          value={data.subtitles}
          onChange={(value) => update("subtitles", value)}
          multiline
        />

        <Field
          label="¿Cómo se entiende el anuncio sin sonido?"
          value={data.silentViewing}
          onChange={(value) => update("silentViewing", value)}
          multiline
        />
      </Stage>

      <Stage
        index={4}
        done={data.done[4]}
        onDone={(value) => markDone(4, value)}
      >
        <p>
          Aplica los colores, tipografías y recursos de tu marca. Realiza una
          corrección de color básica y añade un cierre publicitario.
        </p>

        <div className="video16-grid">
          <Field
            label="Tipografía de marca"
            value={data.typography}
            onChange={(value) => update("typography", value)}
          />

          <Field
            label="Colores de marca"
            value={data.colors}
            onChange={(value) => update("colors", value)}
          />
        </div>

        <Field
          label="Corrección de color realizada"
          value={data.colorCorrection}
          onChange={(value) => update("colorCorrection", value)}
          multiline
        />

        <div className="video16-grid">
          <Field
            label="Titular final"
            value={data.headline}
            onChange={(value) => update("headline", value)}
          />

          <Field
            label="CTA del anuncio"
            value={data.cta}
            onChange={(value) => update("cta", value)}
          />
        </div>

        <div className="video16-preview">
          <small>{data.brand || "TU MARCA"}</small>
          <div className="video16-preview-image">ESCENA FINAL DEL VIDEO</div>
          <strong>{data.headline || "Tu mensaje publicitario"}</strong>
          <span>{data.cta || "Tu llamado a la acción"}</span>
        </div>

        <p className="video16-hint">
          Esta es una maqueta del cierre. El archivo audiovisual real se edita
          en tu programa de video.
        </p>
      </Stage>

      <Stage
        index={5}
        done={data.done[5]}
        onDone={(value) => markDone(5, value)}
      >
        <p>
          Exporta el anuncio principal de 20 a 30 segundos y una versión de 10 a
          15 segundos derivada del mismo material.
        </p>

        <div className="video16-grid">
          <div className="video16-export">
            <h4>Anuncio principal</h4>

            <Field
              label="Duración (segundos)"
              type="number"
              value={data.main.duration}
              onChange={(value) => updateNested("main", "duration", value)}
            />

            <Field
              label="Resolución"
              value={data.main.resolution}
              onChange={(value) => updateNested("main", "resolution", value)}
            />

            <Field
              label="Contenedor"
              value={data.main.format}
              onChange={(value) => updateNested("main", "format", value)}
            />

            <Field
              label="Códec de video"
              value={data.main.codec}
              onChange={(value) => updateNested("main", "codec", value)}
            />

            <Field
              label="Fotogramas por segundo"
              value={data.main.fps}
              onChange={(value) => updateNested("main", "fps", value)}
            />

            <Field
              label="Códec de audio"
              value={data.main.audio}
              onChange={(value) => updateNested("main", "audio", value)}
            />

            <Field
              label="Enlace al MP4 principal"
              value={data.main.link}
              onChange={(value) => updateNested("main", "link", value)}
            />

            <div
              className={
                validMain
                  ? "video16-status video16-status--ok"
                  : "video16-status"
              }
            >
              {validMain
                ? "Duración dentro del rango solicitado"
                : "Ajusta la duración a 20–30 segundos"}
            </div>
          </div>

          <div className="video16-export">
            <h4>Versión corta</h4>

            <Field
              label="Duración (segundos)"
              type="number"
              value={data.short.duration}
              onChange={(value) => updateNested("short", "duration", value)}
            />

            <Field
              label="Gancho inicial"
              value={data.short.hook}
              onChange={(value) => updateNested("short", "hook", value)}
            />

            <Field
              label="Mensaje"
              value={data.short.message}
              onChange={(value) => updateNested("short", "message", value)}
              multiline
            />

            <Field
              label="CTA"
              value={data.short.cta}
              onChange={(value) => updateNested("short", "cta", value)}
            />

            <Field
              label="Enlace al MP4 corto"
              value={data.short.link}
              onChange={(value) => updateNested("short", "link", value)}
            />

            <div
              className={
                validShort
                  ? "video16-status video16-status--ok"
                  : "video16-status"
              }
            >
              {validShort
                ? "Duración dentro del rango solicitado"
                : "Ajusta la duración a 10–15 segundos"}
            </div>
          </div>
        </div>
      </Stage>

      <Stage
        index={6}
        done={data.done[6]}
        onDone={(value) => markDone(6, value)}
      >
        <p>
          Diseña una portada vertical de 1080 × 1920 px. Revisa los archivos
          finales y prepara su exhibición.
        </p>

        <div className="video16-grid">
          <div>
            <Field
              label="Titular de la portada"
              value={data.cover.headline}
              onChange={(value) => updateNested("cover", "headline", value)}
            />

            <Field
              label="Composición de la portada"
              value={data.cover.composition}
              onChange={(value) => updateNested("cover", "composition", value)}
              multiline
            />

            <Field
              label="Enlace a la portada"
              value={data.cover.link}
              onChange={(value) => updateNested("cover", "link", value)}
            />
          </div>

          <div className="video16-cover">
            <small>{data.brand || "MARCA DE CAFÉ"}</small>
            <div>PORTADA 9:16</div>
            <strong>{data.cover.headline || "Titular de la portada"}</strong>
          </div>
        </div>

        <h4>Estado de los entregables</h4>

        <div className="video16-deliverables">
          {[
            [
              "Anuncio principal MP4",
              data.main.link ? "Registrado" : "Pendiente",
            ],
            ["Versión corta MP4", data.short.link ? "Registrada" : "Pendiente"],
            ["Portada gráfica", data.cover.link ? "Registrada" : "Pendiente"],
            ["Storyboard", data.storyboard ? "Registrado" : "Pendiente"],
          ].map(([name, status]) => (
            <div key={name}>
              <span>{name}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>

        <Field
          label="Retroalimentación recibida"
          value={data.feedback}
          onChange={(value) => update("feedback", value)}
          multiline
        />

        <Field
          label="Mejoras para el trabajo autónomo"
          value={data.pending}
          onChange={(value) => update("pending", value)}
          multiline
        />

        <div className="video16-rubric">
          <h4>Rúbrica · 50 puntos</h4>

          {[
            ["Narrativa y coherencia", 10],
            ["Montaje, continuidad y ritmo", 15],
            ["Audio, textos y subtítulos", 10],
            ["Identidad, CTA y acabado técnico", 10],
            ["Versión corta, portada y presentación", 5],
          ].map(([name, points]) => (
            <div key={name}>
              <span>{name}</span>
              <strong>{points} pts.</strong>
            </div>
          ))}
        </div>
      </Stage>

      <footer className="video16-footer">
        <div className="video16-summary">
          <strong>{completed}/7 etapas</strong>
          <strong>Principal: {data.main.duration} s</strong>
          <strong>Versión corta: {data.short.duration} s</strong>
        </div>

        <WorkshopDownloadButton
          studentName={studentName}
          lesson={{
            courseId: "contenido",
            number: 16,
            title: "De cinco clips a un anuncio que cuenta una historia.",
          }}
          title="Laboratorio 16: Producción y edición audiovisual"
          answers={{
            Equipo: data.team,
            "Marca de café": data.brand,
            Campaña: data.campaign,
            "Público objetivo": data.audience,
            "Objetivo del anuncio": data.objective,
            "Mensaje principal": data.message,
            "Editor de video utilizado": data.editor,

            "MATERIAL - Carpeta de producción": data.folder,
            "MATERIAL - Storyboard Semana 15": data.storyboard,
            "MATERIAL - Clips originales": data.footage,
            "MATERIAL - Archivo del logotipo": data.logo,

            ...Object.fromEntries(
              data.scenes.flatMap((scene, index) => {
                const prefix = `GUION - ESCENA ${index + 1}`;

                return [
                  [`${prefix} - Inicio`, `${scene.start} segundos`],
                  [`${prefix} - Final`, `${scene.end} segundos`],
                  [
                    `${prefix} - Duración`,
                    `${Math.max(
                      0,
                      Number(scene.end || 0) - Number(scene.start || 0),
                    )} segundos`,
                  ],
                  [`${prefix} - Plano`, scene.shot],
                  [`${prefix} - Acción visual`, scene.action],
                  [`${prefix} - Texto en pantalla`, scene.text],
                  [`${prefix} - Sonido o música`, scene.audio],
                ];
              }),
            ),

            "Duración acumulada de escenas": `${totalDuration} segundos`,

            "MONTAJE - Ritmo narrativo": data.rhythm,
            "MONTAJE - Transiciones": data.transitions,
            "MONTAJE - Continuidad": data.continuity,
            "MONTAJE - Justificación de decisiones": data.editingDecisions,

            "AUDIO - Música y efectos": data.soundtrack,
            "AUDIO - Origen y autorización": data.soundtrackRights,
            "AUDIO - Voz en off o ambiente": data.voice,
            "AUDIO - Textos y subtítulos": data.subtitles,
            "AUDIO - Comprensión sin sonido": data.silentViewing,

            "IDENTIDAD - Tipografía": data.typography,
            "IDENTIDAD - Colores": data.colors,
            "IDENTIDAD - Corrección de color": data.colorCorrection,
            "IDENTIDAD - Titular final": data.headline,
            "IDENTIDAD - CTA": data.cta,

            "ANUNCIO PRINCIPAL - Duración": `${data.main.duration} segundos`,
            "ANUNCIO PRINCIPAL - Resolución": data.main.resolution,
            "ANUNCIO PRINCIPAL - Contenedor": data.main.format,
            "ANUNCIO PRINCIPAL - Códec de video": data.main.codec,
            "ANUNCIO PRINCIPAL - FPS": data.main.fps,
            "ANUNCIO PRINCIPAL - Códec de audio": data.main.audio,
            "ANUNCIO PRINCIPAL - Enlace MP4": data.main.link,
            "ANUNCIO PRINCIPAL - Duración válida": validMain ? "Sí" : "No",

            "VERSIÓN CORTA - Duración": `${data.short.duration} segundos`,
            "VERSIÓN CORTA - Gancho inicial": data.short.hook,
            "VERSIÓN CORTA - Mensaje": data.short.message,
            "VERSIÓN CORTA - CTA": data.short.cta,
            "VERSIÓN CORTA - Enlace MP4": data.short.link,
            "VERSIÓN CORTA - Duración válida": validShort ? "Sí" : "No",

            "PORTADA - Formato": "1080 × 1920 px",
            "PORTADA - Titular": data.cover.headline,
            "PORTADA - Composición": data.cover.composition,
            "PORTADA - Enlace": data.cover.link,

            "Retroalimentación recibida": data.feedback,
            "Mejoras para trabajo autónomo": data.pending,

            ...Object.fromEntries(
              data.done.map((checked, index) => [
                `Etapa ${index + 1} completada`,
                checked ? "Sí" : "No",
              ]),
            ),

            "Progreso general": `${completed} de 7 etapas`,

            "ESTADO - Anuncio principal": data.main.link.trim()
              ? "Registrado"
              : "Pendiente",

            "ESTADO - Versión corta": data.short.link.trim()
              ? "Registrada"
              : "Pendiente",

            "ESTADO - Portada": data.cover.link.trim()
              ? "Registrada"
              : "Pendiente",

            "ESTADO - Storyboard": data.storyboard.trim()
              ? "Registrado"
              : "Pendiente",
          }}
        />

        <p>{notice}</p>

        <p>
          Trabajo autónomo: perfeccionar ambas versiones, crear una tercera de
          6–8 segundos, completar dos portadas y preparar una ficha comparativa
          para la Semana 17.
        </p>
      </footer>
    </div>
  );
}
