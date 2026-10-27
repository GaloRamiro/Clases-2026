import { useState } from "react";

const EVENTS = ["click_cta_principal", "click_cta_secundario", "faq_open"];

const FAQ_SCRIPT = `<script>
window.dataLayer = window.dataLayer || [];

document.querySelectorAll("details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    const question = item.querySelector("summary");

    window.dataLayer.push({
      event: "faq_open",
      faq_question: question
        ? question.textContent.trim()
        : "Pregunta sin título"
    });
  });
});
</script>`;

const styles = {
  root: {
    background: "#f8fafc",
    color: "#111b35",
    padding: 22,
    borderRadius: 16,
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
    gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
    gap: 12,
  },
  button: {
    background: "#ee7544",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "11px 16px",
    cursor: "pointer",
    fontWeight: 700,
    margin: "5px 8px 5px 0",
  },
  code: {
    display: "block",
    background: "#111b35",
    color: "#e2e8f0",
    padding: 16,
    borderRadius: 10,
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    fontSize: 12,
  },
  note: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.6,
  },
};

function downloadFile(name, content) {
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = name;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function GuideCard({ title, children }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function EventSimulator() {
  const [records, setRecords] = useState([]);

  function simulate(eventName) {
    setRecords((current) => [
      {
        id: `${Date.now()}-${current.length}`,
        eventName,
        time: new Date().toLocaleTimeString(),
      },
      ...current,
    ]);
  }

  const count = (name) =>
    records.filter((item) => item.eventName === name).length;

  return (
    <>
      <div style={styles.grid}>
        {EVENTS.map((name) => (
          <div key={name} style={styles.card}>
            <strong style={{ fontSize: 30 }}>{count(name)}</strong>
            <p style={styles.note}>{name}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        style={styles.button}
        onClick={() => simulate("click_cta_principal")}
      >
        Simular CTA principal
      </button>

      <button
        type="button"
        style={styles.button}
        onClick={() => simulate("click_cta_secundario")}
      >
        Simular CTA secundario
      </button>

      <button
        type="button"
        style={styles.button}
        onClick={() => simulate("faq_open")}
      >
        Simular apertura FAQ
      </button>

      <GuideCard title="Registro de eventos simulados">
        {records.length === 0 ? (
          <p>Aún no se han simulado interacciones.</p>
        ) : (
          <ol>
            {records.slice(0, 20).map((item) => (
              <li key={item.id}>
                {item.time} — {item.eventName}
              </li>
            ))}
          </ol>
        )}

        <button
          type="button"
          style={styles.button}
          onClick={() => setRecords([])}
        >
          Reiniciar
        </button>

        <button
          type="button"
          style={styles.button}
          onClick={() =>
            navigator.clipboard?.writeText(
              records
                .map((item) => `${item.time}: ${item.eventName}`)
                .join("\n"),
            )
          }
        >
          Copiar registro
        </button>
      </GuideCard>

      <p style={styles.note}>
        Este simulador funciona únicamente en Aula Digital. No envía datos a
        Google Analytics ni a Google Tag Manager.
      </p>
    </>
  );
}

export default function SeoWeek15Resources({ kind }) {
  if (kind === "seo15-flow") {
    return (
      <section style={styles.root}>
        <h2>¿Cómo funciona la medición digital?</h2>

        <GuideCard title="Recorrido de un evento">
          <ol>
            <li>El usuario interactúa con la web.</li>
            <li>GTM detecta el clic o recibe una señal dataLayer.</li>
            <li>Un activador cumple sus condiciones.</li>
            <li>Una etiqueta envía el evento hacia GA4.</li>
            <li>GA4 procesa el evento y lo muestra en sus herramientas.</li>
          </ol>
        </GuideCard>

        <GuideCard title="Conceptos principales">
          <p>
            <strong>Evento:</strong> interacción registrada.
          </p>
          <p>
            <strong>Etiqueta:</strong> configuración que envía datos.
          </p>
          <p>
            <strong>Activador:</strong> condición que ejecuta una etiqueta.
          </p>
          <p>
            <strong>Variable:</strong> valor que utiliza GTM.
          </p>
          <p>
            <strong>DebugView:</strong> herramienta de comprobación.
          </p>
          <p>
            <strong>Evento clave:</strong> acción importante para el objetivo de
            medición.
          </p>
        </GuideCard>

        <h3>Simulador académico de eventos</h3>
        <EventSimulator />
      </section>
    );
  }

  if (kind === "seo15-cta-guide") {
    return (
      <section style={styles.root}>
        <h2>Guía: configurar los dos botones</h2>

        <GuideCard title="Paso 1. Identificar los botones">
          <p>La plantilla de la Semana 14 ya contiene estos identificadores:</p>

          <pre style={styles.code}>
            {`id="cta-principal"
id="cta-secundario"`}
          </pre>

          <p>
            No necesitas modificar esos IDs si utilizaste la plantilla original.
          </p>
        </GuideCard>

        <GuideCard title="Paso 2. Habilitar Click ID">
          <ol>
            <li>Abre tu contenedor de Google Tag Manager.</li>
            <li>Entra a Variables.</li>
            <li>Selecciona Configure en las variables integradas.</li>
            <li>Activa Click ID.</li>
          </ol>

          <ExternalLink href="https://tagmanager.google.com/">
            Abrir Google Tag Manager
          </ExternalLink>
        </GuideCard>

        <GuideCard title="Paso 3. Crear los activadores">
          <p>
            Crea dos activadores de tipo
            <strong> Click - Just Links</strong>.
          </p>

          <p>
            <strong>Activador 1:</strong>
          </p>
          <pre style={styles.code}>
            {`Nombre: Clic CTA Principal
Tipo: Click - Just Links
Condición: Click ID equals cta-principal`}
          </pre>

          <p>
            <strong>Activador 2:</strong>
          </p>
          <pre style={styles.code}>
            {`Nombre: Clic CTA Secundario
Tipo: Click - Just Links
Condición: Click ID equals cta-secundario`}
          </pre>
        </GuideCard>

        <GuideCard title="Paso 4. Crear las etiquetas GA4 Event">
          <p>
            Crea dos etiquetas de tipo Google Analytics: GA4 Event, vinculadas a
            la configuración de Google tag.
          </p>

          <pre style={styles.code}>
            {`Etiqueta 1:
Nombre: GA4 - click_cta_principal
Event Name: click_cta_principal
Trigger: Clic CTA Principal

Etiqueta 2:
Nombre: GA4 - click_cta_secundario
Event Name: click_cta_secundario
Trigger: Clic CTA Secundario`}
          </pre>

          <p>
            Si la interfaz solicita el ID de medición, utiliza el ID G- real de
            tu flujo GA4.
          </p>
        </GuideCard>

        <GuideCard title="Paso 5. Comprobar">
          <ol>
            <li>Abre Preview en GTM.</li>
            <li>Conecta la URL pública de tu sitio.</li>
            <li>Haz clic en el CTA principal.</li>
            <li>Revisa si se ejecuta la etiqueta correspondiente.</li>
            <li>Repite con el CTA secundario.</li>
          </ol>
        </GuideCard>
      </section>
    );
  }

  if (kind === "seo15-faq-guide") {
    return (
      <section style={styles.root}>
        <h2>Guía: medir la apertura de preguntas frecuentes</h2>

        <GuideCard title="Paso 1. Descargar el script">
          <p>
            Descarga el recurso y agrégalo a tu archivo index.html,
            inmediatamente antes de la etiqueta de cierre del body.
          </p>

          <button
            type="button"
            style={styles.button}
            onClick={() => downloadFile("faq-evento.html.txt", FAQ_SCRIPT)}
          >
            Descargar código FAQ
          </button>

          <pre style={styles.code}>{FAQ_SCRIPT}</pre>

          <p style={styles.note}>
            El archivo descargado contiene el fragmento que debes copiar, no una
            página web completa.
          </p>
        </GuideCard>

        <GuideCard title="Paso 2. Actualizar GitHub Pages">
          <ol>
            <li>Abre el repositorio de la Semana 14.</li>
            <li>Edita index.html.</li>
            <li>Pega el script antes de cerrar body.</li>
            <li>Guarda los cambios con Commit changes.</li>
            <li>Espera a que termine el despliegue.</li>
          </ol>
        </GuideCard>

        <GuideCard title="Paso 3. Crear el activador">
          <p>
            En GTM, crea un activador de tipo
            <strong> Custom Event</strong>.
          </p>

          <pre style={styles.code}>
            {`Nombre: CE - FAQ Open
Tipo: Custom Event
Event name: faq_open`}
          </pre>
        </GuideCard>

        <GuideCard title="Paso 4. Crear la variable">
          <pre style={styles.code}>
            {`Nombre: DLV - faq_question
Tipo: Data Layer Variable
Data Layer Variable Name: faq_question
Data Layer Version: Version 2`}
          </pre>
        </GuideCard>

        <GuideCard title="Paso 5. Crear la etiqueta">
          <pre style={styles.code}>
            {`Nombre: GA4 - faq_open
Tipo: Google Analytics: GA4 Event
Event Name: faq_open
Event Parameter:
  faq_question = {{DLV - faq_question}}
Trigger: CE - FAQ Open`}
          </pre>

          <p>
            Utiliza el mismo ID de medición GA4 configurado en el Laboratorio 1.
          </p>
        </GuideCard>

        <GuideCard title="Paso 6. Probar">
          <ol>
            <li>Abre Preview en GTM.</li>
            <li>Abre una pregunta frecuente en la web.</li>
            <li>Comprueba que aparece faq_open.</li>
            <li>Verifica la ejecución de la etiqueta.</li>
            <li>Revisa DebugView de GA4.</li>
          </ol>

          <p style={styles.note}>
            No envíes nombres, correos ni datos personales dentro de
            faq_question.
          </p>
        </GuideCard>
      </section>
    );
  }

  return null;
}
