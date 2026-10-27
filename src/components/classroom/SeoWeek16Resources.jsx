const SAMPLE = [
  ["evento", "cantidad", "tipo"],
  ["page_view", 80, "simulado"],
  ["click_cta_principal", 25, "simulado"],
  ["click_cta_secundario", 18, "simulado"],
  ["faq_open", 13, "simulado"],
];

const style = {
  root: {
    padding: 22,
    background: "#f8fafc",
    color: "#111b35",
    borderRadius: 16,
  },
  card: {
    padding: 18,
    marginBottom: 16,
    border: "1px solid #dbe3ee",
    borderRadius: 12,
    background: "#fff",
  },
  button: {
    padding: "12px 18px",
    border: 0,
    borderRadius: 9,
    background: "#ee7544",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};

function downloadCsv() {
  const csv = "\uFEFF" + SAMPLE.map((row) => row.join(",")).join("\r\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "semana16_eventos_simulados.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ResourceCard({ title, children }) {
  return (
    <div style={style.card}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default function SeoWeek16Resources({ kind }) {
  if (kind === "seo16-looker-guide") {
    return (
      <section style={style.root}>
        <h2>Recurso de clase: conectar Looker Studio</h2>

        <ResourceCard title="Parte A. Abre Looker Studio">
          <ol>
            <li>
              Ingresa a{" "}
              <a
                href="https://lookerstudio.google.com/"
                target="_blank"
                rel="noreferrer"
              >
                Looker Studio
              </a>
              .
            </li>
            <li>Accede con la cuenta autorizada del equipo.</li>
            <li>Selecciona Crear → Informe.</li>
            <li>Agrega una fuente de datos.</li>
            <li>Busca el conector Google Analytics.</li>
          </ol>
        </ResourceCard>

        <ResourceCard title="Parte B. Conecta GA4">
          <ol>
            <li>Autoriza el acceso cuando se solicite.</li>
            <li>Selecciona la cuenta del proyecto académico.</li>
            <li>Selecciona la propiedad GA4 de la Semana 15.</li>
            <li>Conecta la fuente de datos.</li>
            <li>Revisa los campos disponibles.</li>
          </ol>

          <p>
            Necesitas permisos suficientes en GA4 para conectar la propiedad.
          </p>
        </ResourceCard>

        <ResourceCard title="Parte C. Comprueba los campos">
          <p>Busca campos equivalentes a:</p>
          <ul>
            <li>Usuarios activos o total de usuarios.</li>
            <li>Sesiones.</li>
            <li>Recuento de eventos.</li>
            <li>Nombre del evento.</li>
            <li>Eventos clave, cuando estén disponibles.</li>
          </ul>

          <p>
            Los nombres visibles de campos pueden variar según la configuración
            y la interfaz.
          </p>
        </ResourceCard>

        <ResourceCard title="Parte D. Si no aparecen datos">
          <ol>
            <li>Revisa el período de fechas del informe.</li>
            <li>Comprueba que elegiste la propiedad correcta.</li>
            <li>Consulta los eventos registrados en GA4.</li>
            <li>Verifica los permisos de la fuente.</li>
            <li>
              Si no hay registros suficientes, utiliza el recurso de la
              diapositiva 9.
            </li>
          </ol>

          <p>
            Un sitio nuevo puede tener pocos datos. No debes inventar usuarios
            ni sesiones.
          </p>
        </ResourceCard>

        <a
          href="https://docs.cloud.google.com/data-studio/connect-to-google-analytics?hl=es"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar documentación oficial del conector GA4
        </a>
      </section>
    );
  }

  if (kind === "seo16-dashboard-resource") {
    return (
      <section style={style.root}>
        <h2>Recurso de clase: construye tu dashboard</h2>

        <ResourceCard title="Visualización 1. Tarjetas de usuarios y sesiones">
          <p>
            Inserta dos tarjetas de resultado con las métricas de usuarios y
            sesiones disponibles en tu GA4.
          </p>
          <p>
            Agrega el período de análisis y no confundas usuarios con visitas.
          </p>
        </ResourceCard>

        <ResourceCard title="Visualización 2. Total de eventos">
          <p>
            Inserta una tarjeta que presente el recuento total de eventos
            registrados en el período.
          </p>
        </ResourceCard>

        <ResourceCard title="Visualización 3. Eventos por nombre">
          <p>
            Inserta un gráfico de barras con la dimensión Nombre del evento y
            una métrica de recuento.
          </p>
          <p>
            Compara page_view, click_cta_principal, click_cta_secundario y
            faq_open, si existen.
          </p>
        </ResourceCard>

        <ResourceCard title="Visualización 4. Eventos clave">
          <p>
            Inserta una tarjeta, tabla o gráfico que muestre el evento clave
            académico de la Semana 15.
          </p>
          <p>
            Si no existen datos de eventos clave, explica esa ausencia en lugar
            de inventarlos.
          </p>
        </ResourceCard>

        <ResourceCard title="Recurso alternativo: datos simulados">
          <p>
            Si GA4 todavía no tiene suficientes datos, descarga este archivo CSV
            e impórtalo a Google Sheets.
          </p>

          <button type="button" style={style.button} onClick={downloadCsv}>
            Descargar CSV de práctica
          </button>

          <p>
            En{" "}
            <a
              href="https://sheets.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              Google Sheets
            </a>{" "}
            puedes importar el archivo y utilizar esa hoja como fuente en Looker
            Studio.
          </p>

          <p>
            <strong>Importante:</strong> el CSV contiene únicamente eventos
            ficticios. No incluye usuarios, sesiones ni eventos clave. Esos
            indicadores deben marcarse como no disponibles en el ejercicio
            alternativo, o presentarse aparte como ejemplos inequívocamente
            simulados.
          </p>
        </ResourceCard>

        <ResourceCard title="Diseño profesional">
          <ul>
            <li>Título del dashboard y nombre del equipo.</li>
            <li>Fuente de datos utilizada.</li>
            <li>Período de análisis.</li>
            <li>Cuatro visualizaciones o indicación de ausencia de datos.</li>
            <li>Tres conclusiones.</li>
            <li>Limitaciones de los resultados.</li>
          </ul>
        </ResourceCard>
      </section>
    );
  }

  return null;
}
