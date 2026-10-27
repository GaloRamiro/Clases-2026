import { useState } from "react";
import WorkshopDownloadButton from "./WorkshopDownloadButton";

const LESSON = {
  courseId: "seo",
  number: 15,
  title: "Google Analytics 4 y Google Tag Manager",
};

const EVENT_NAMES = ["click_cta_principal", "click_cta_secundario", "faq_open"];

const INSTALL_CHECKS = [
  "La web académica abre con HTTPS",
  "Se creó una propiedad GA4 y un flujo Web",
  "Se creó un contenedor GTM de tipo Web",
  "Se instalaron ambos fragmentos oficiales de GTM",
  "Se actualizó index.html en GitHub Pages",
  "Se configuró Google tag con el ID G-",
  "La etiqueta se ejecuta en Preview",
  "GA4 recibe un evento de prueba",
];

const EVENT_CHECKS = [
  "Se habilitó la variable Click ID",
  "Se crearon los activadores de ambos CTA",
  "Se crearon las dos etiquetas GA4 Event",
  "Se añadió el script dataLayer para FAQ",
  "Se creó el activador Custom Event faq_open",
  "Se creó la variable faq_question",
  "Se creó la etiqueta GA4 Event faq_open",
  "Los tres eventos se probaron en Preview",
  "Se revisó DebugView de GA4",
  "Se publicó una versión validada del contenedor",
];

const newEvent = (name) => ({
  name,
  action: "",
  trigger: "",
  tag: "",
  preview: "",
  debug: "",
  evidence: "",
  notes: "",
});

function createData() {
  return {
    team: "",
    website: "",
    repository: "",
    propertyName: "",
    streamUrl: "",
    measurementId: "",
    containerId: "",
    installationNotes: "",
    installationEvidence: "",
    installChecks: INSTALL_CHECKS.map(() => false),
    events: EVENT_NAMES.map(newEvent),
    eventChecks: EVENT_CHECKS.map(() => false),
    keyEvent: "click_cta_principal",
    keyReason: "",
    privacyNotes: "",
    debuggingNotes: "",
    finalEvidence: "",
    conclusion: "",
  };
}

function loadData(key) {
  const base = createData();

  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");

    if (!saved || typeof saved !== "object") {
      return base;
    }

    return {
      ...base,
      ...saved,
      installChecks: base.installChecks.map((_, index) =>
        Boolean(saved.installChecks?.[index]),
      ),
      eventChecks: base.eventChecks.map((_, index) =>
        Boolean(saved.eventChecks?.[index]),
      ),
      events: base.events.map((item, index) => ({
        ...item,
        ...(saved.events?.[index] || {}),
        name: item.name,
      })),
    };
  } catch {
    return base;
  }
}

const styles = {
  root: {
    padding: 22,
    borderRadius: 16,
    background: "#f8fafc",
    color: "#111b35",
  },
  card: {
    background: "#fff",
    padding: 18,
    border: "1px solid #dbe3ee",
    borderRadius: 12,
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    gap: 12,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 13,
    fontWeight: 650,
    marginBottom: 12,
  },
  input: {
    width: "100%",
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "#fff",
    color: "#111b35",
    font: "inherit",
    boxSizing: "border-box",
  },
  note: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 1.6,
  },
};

function Field({
  label,
  value = "",
  onChange,
  multiline = false,
  options,
  placeholder = "",
}) {
  return (
    <label style={styles.label}>
      {label}

      {options ? (
        <select
          style={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Seleccionar</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          rows={3}
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function Checklist({ items, values, onChange }) {
  return (
    <>
      {items.map((item, index) => (
        <label
          key={item}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          <input
            type="checkbox"
            checked={values[index]}
            onChange={(event) => onChange(index, event.target.checked)}
          />
          <span>{item}</span>
        </label>
      ))}

      <p style={styles.note}>
        Comprobaciones: {values.filter(Boolean).length}/{items.length}
      </p>
    </>
  );
}

export default function SeoWeek15Workshop({
  kind,
  slide,
  lessonId = "seo-semana-15",
  studentName = "",
}) {
  const activeKind = kind || slide?.kind;

  const storageKey =
    `aula:seo:semana15:${lessonId}:` +
    String(studentName || "sin-nombre")
      .trim()
      .toLowerCase();

  const [stored, setStored] = useState(() => ({
    key: storageKey,
    data: loadData(storageKey),
  }));

  const data = stored.key === storageKey ? stored.data : loadData(storageKey);

  function update(transform) {
    const next = transform(data);

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (error) {
      console.warn("No se pudo guardar Semana 15:", error);
    }

    setStored({
      key: storageKey,
      data: next,
    });
  }

  function setRoot(field, value) {
    update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function setCheck(field, index, value) {
    update((current) => ({
      ...current,
      [field]: current[field].map((item, i) => (i === index ? value : item)),
    }));
  }

  function setEvent(index, field, value) {
    update((current) => ({
      ...current,
      events: current.events.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  if (activeKind !== "seo15-install" && activeKind !== "seo15-events") {
    return null;
  }

  const installAnswers = Object.fromEntries(
    INSTALL_CHECKS.map((item, index) => [
      item,
      data.installChecks[index] ? "Comprobado" : "Pendiente",
    ]),
  );

  const eventAnswers = Object.fromEntries(
    data.events.flatMap((item, index) => [
      [`Evento ${index + 1}`, item.name],
      [`Acción ${index + 1}`, item.action],
      [`Activador ${index + 1}`, item.trigger],
      [`Etiqueta ${index + 1}`, item.tag],
      [`Preview ${index + 1}`, item.preview],
      [`DebugView ${index + 1}`, item.debug],
      [`Evidencia ${index + 1}`, item.evidence],
      [`Observaciones ${index + 1}`, item.notes],
    ]),
  );

  return (
    <section style={styles.root}>
      <span style={{ color: "#ee7544", fontWeight: 800 }}>
        ANÁLISIS SEO · SEMANA 15
      </span>

      <h2>{slide?.title || "Laboratorio de medición"}</h2>

      <p style={styles.note}>{slide?.instructions}</p>

      <p style={{ color: "#047857", fontSize: 13 }}>
        Guardado automático en este dispositivo.
      </p>

      <div style={styles.card}>
        <h3>Datos del equipo y de la web</h3>

        <div style={styles.grid}>
          <Field
            label="Equipo"
            value={data.team}
            onChange={(value) => setRoot("team", value)}
          />

          <Field
            label="URL pública de la web académica"
            value={data.website}
            placeholder="https://usuario.github.io/..."
            onChange={(value) => setRoot("website", value)}
          />

          <Field
            label="Repositorio GitHub"
            value={data.repository}
            onChange={(value) => setRoot("repository", value)}
          />
        </div>
      </div>

      {activeKind === "seo15-install" && (
        <>
          <div style={styles.card}>
            <h3>Laboratorio 1: conectar GA4 mediante GTM</h3>

            <p style={styles.note}>
              Utiliza las cuentas autorizadas del equipo. Copia los IDs reales
              de tu configuración. No agregues un segundo Google tag
              directamente en HTML para el mismo flujo.
            </p>

            <Field
              label="Nombre de la propiedad GA4"
              value={data.propertyName}
              onChange={(value) => setRoot("propertyName", value)}
            />

            <Field
              label="URL del flujo web"
              value={data.streamUrl}
              onChange={(value) => setRoot("streamUrl", value)}
            />

            <div style={styles.grid}>
              <Field
                label="ID de medición GA4"
                value={data.measurementId}
                placeholder="G-XXXXXXXXXX"
                onChange={(value) => setRoot("measurementId", value)}
              />

              <Field
                label="ID del contenedor GTM"
                value={data.containerId}
                placeholder="GTM-XXXXXXX"
                onChange={(value) => setRoot("containerId", value)}
              />
            </div>
          </div>

          <div style={styles.card}>
            <h3>Checklist de instalación</h3>

            <Checklist
              items={INSTALL_CHECKS}
              values={data.installChecks}
              onChange={(index, value) =>
                setCheck("installChecks", index, value)
              }
            />

            <p style={styles.note}>
              Marca solo las tareas que hayas comprobado. Las casillas no
              realizan una verificación automática.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Evidencias técnicas</h3>

            <Field
              label="Capturas o enlaces de evidencias"
              multiline
              value={data.installationEvidence}
              placeholder="Flujo GA4, contenedor GTM, Preview..."
              onChange={(value) => setRoot("installationEvidence", value)}
            />

            <Field
              label="Problemas y soluciones de instalación"
              multiline
              value={data.installationNotes}
              onChange={(value) => setRoot("installationNotes", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 1: Instalación GA4 mediante GTM"
            answers={{
              Equipo: data.team,
              "Web académica": data.website,
              Repositorio: data.repository,
              "Propiedad GA4": data.propertyName,
              "Flujo web": data.streamUrl,
              "ID de medición": data.measurementId,
              "Contenedor GTM": data.containerId,
              ...installAnswers,
              Evidencias: data.installationEvidence,
              "Problemas y soluciones": data.installationNotes,
              Nota: "Implementación únicamente en la web académica propia.",
            }}
          />
        </>
      )}

      {activeKind === "seo15-events" && (
        <>
          <div style={styles.card}>
            <h3>Laboratorio 2: matriz de eventos</h3>

            <p style={styles.note}>
              Configura los botones con la guía de la diapositiva 8 y la FAQ con
              el recurso de la 9. Registra los resultados observados en Preview
              y DebugView, no resultados supuestos.
            </p>
          </div>

          {data.events.map((item, index) => (
            <div key={item.name} style={styles.card}>
              <h3>
                Evento {index + 1}: {item.name}
              </h3>

              <Field
                label="Acción que mide"
                value={item.action}
                onChange={(value) => setEvent(index, "action", value)}
              />

              <div style={styles.grid}>
                <Field
                  label="Activador GTM"
                  value={item.trigger}
                  onChange={(value) => setEvent(index, "trigger", value)}
                />

                <Field
                  label="Etiqueta GTM"
                  value={item.tag}
                  onChange={(value) => setEvent(index, "tag", value)}
                />

                <Field
                  label="¿Funcionó en Preview?"
                  value={item.preview}
                  options={["Sí", "No", "Pendiente"]}
                  onChange={(value) => setEvent(index, "preview", value)}
                />

                <Field
                  label="¿Se observó en DebugView?"
                  value={item.debug}
                  options={["Sí", "No", "Pendiente"]}
                  onChange={(value) => setEvent(index, "debug", value)}
                />
              </div>

              <Field
                label="Evidencia de la prueba"
                multiline
                value={item.evidence}
                onChange={(value) => setEvent(index, "evidence", value)}
              />

              <Field
                label="Observaciones"
                multiline
                value={item.notes}
                onChange={(value) => setEvent(index, "notes", value)}
              />
            </div>
          ))}

          <div style={styles.card}>
            <h3>Checklist de eventos y depuración</h3>

            <Checklist
              items={EVENT_CHECKS}
              values={data.eventChecks}
              onChange={(index, value) => setCheck("eventChecks", index, value)}
            />
          </div>

          <div style={styles.card}>
            <h3>Evento clave académico</h3>

            <Field
              label="Evento elegido"
              value={data.keyEvent}
              options={EVENT_NAMES}
              onChange={(value) => setRoot("keyEvent", value)}
            />

            <Field
              label="¿Por qué lo considerarías importante?"
              multiline
              value={data.keyReason}
              onChange={(value) => setRoot("keyReason", value)}
            />

            <p style={styles.note}>
              Un clic de demostración no representa una venta ni una conversión
              comercial real.
            </p>
          </div>

          <div style={styles.card}>
            <h3>Informe técnico</h3>

            <Field
              label="Evidencias generales de Preview y DebugView"
              multiline
              value={data.finalEvidence}
              onChange={(value) => setRoot("finalEvidence", value)}
            />

            <Field
              label="Problemas de depuración y soluciones"
              multiline
              value={data.debuggingNotes}
              onChange={(value) => setRoot("debuggingNotes", value)}
            />

            <Field
              label="Consideraciones de privacidad"
              multiline
              value={data.privacyNotes}
              onChange={(value) => setRoot("privacyNotes", value)}
            />

            <Field
              label="Conclusión de la implementación"
              multiline
              value={data.conclusion}
              onChange={(value) => setRoot("conclusion", value)}
            />
          </div>

          <WorkshopDownloadButton
            studentName={studentName}
            lesson={LESSON}
            title="Laboratorio 2: Eventos y depuración GA4"
            answers={{
              Equipo: data.team,
              "Web académica": data.website,
              "ID GA4": data.measurementId,
              "ID GTM": data.containerId,
              ...eventAnswers,
              ...Object.fromEntries(
                EVENT_CHECKS.map((item, index) => [
                  item,
                  data.eventChecks[index] ? "Comprobado" : "Pendiente",
                ]),
              ),
              "Evento clave académico": data.keyEvent,
              Justificación: data.keyReason,
              Evidencias: data.finalEvidence,
              "Problemas y soluciones": data.debuggingNotes,
              Privacidad: data.privacyNotes,
              Conclusión: data.conclusion,
              Nota: "Los eventos son de práctica y no representan conversiones comerciales.",
            }}
          />
        </>
      )}
    </section>
  );
}
