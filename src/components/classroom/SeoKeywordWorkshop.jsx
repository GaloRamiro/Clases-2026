import { useEffect, useState } from "react";

const STORAGE_KEY = "aula-digital-seo-keywords-semana02";

const crearFila = (id) => ({
  id,
  keyword: "",
  intention: "",
  type: "",
  source: "",
  relevance: "",
  priority: false,
  justification: "",
});

const crearFilas = () =>
  Array.from({ length: 30 }, (_, index) => crearFila(index + 1));

function recuperarDatos() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (!guardado) return crearFilas();

    const datos = JSON.parse(guardado);
    if (!Array.isArray(datos)) return crearFilas();

    return crearFilas().map((fila, index) => ({
      ...fila,
      ...(datos[index] || {}),
      id: fila.id,
    }));
  } catch {
    return crearFilas();
  }
}

function escaparCSV(valor) {
  return `"${String(valor ?? "").replace(/"/g, '""')}"`;
}

export default function SeoKeywordWorkshop({ slide }) {
  const esMatriz = slide?.kind === "seo-keyword-matrix";
  const limite = esMatriz ? 30 : 20;

  const [filas, setFilas] = useState(recuperarDatos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filas));
  }, [filas]);

  const visibles = filas.slice(0, limite);

  const completadas = visibles.filter(
    (fila) => fila.keyword.trim() && fila.intention && fila.source.trim(),
  ).length;

  const seleccionadas = filas.filter((fila) => fila.priority).length;

  const actualizar = (id, campo, valor) => {
    setFilas((actuales) =>
      actuales.map((fila) =>
        fila.id === id ? { ...fila, [campo]: valor } : fila,
      ),
    );
  };

  const seleccionarPrioridad = (id, checked) => {
    if (checked && seleccionadas >= 12) {
      alert("Solamente puedes seleccionar 12 keywords estratégicas.");
      return;
    }

    actualizar(id, "priority", checked);
  };

  const exportarCSV = () => {
    const encabezados = [
      "N",
      "Keyword",
      "Intención",
      "Tipo",
      "Fuente",
      "Relevancia",
      "Estratégica",
      "Justificación",
    ];

    const contenido = [
      encabezados,
      ...visibles.map((fila) => [
        fila.id,
        fila.keyword,
        fila.intention,
        fila.type,
        fila.source,
        fila.relevance,
        fila.priority ? "Sí" : "No",
        fila.justification,
      ]),
    ]
      .map((fila) => fila.map(escaparCSV).join(";"))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", contenido], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = esMatriz
      ? "SEO_Semana02_Matriz_30_Keywords.csv"
      : "SEO_Semana02_Laboratorio01.csv";

    enlace.click();
    URL.revokeObjectURL(url);
  };

  const limpiar = () => {
    if (!window.confirm("¿Deseas borrar las 30 palabras clave?")) return;
    setFilas(crearFilas());
  };

  const estiloCampo = {
    width: "100%",
    minWidth: 120,
    padding: "10px",
    border: "1px solid #dce2ed",
    borderRadius: 8,
    background: "#fff",
    color: "#17213a",
    fontSize: 13,
  };

  return (
    <section
      style={{
        padding: 24,
        background: "#f8fafc",
        color: "#14213d",
        borderRadius: 18,
      }}
    >
      <header style={{ marginBottom: 22 }}>
        <p style={{ color: "#64748b", fontWeight: 700 }}>
          {esMatriz ? "LABORATORIO 02" : "LABORATORIO 01"}
        </p>

        <h2 style={{ fontSize: 28, marginBottom: 8 }}>
          {slide?.title ||
            (esMatriz
              ? "Construye tu matriz SEO"
              : "Descubre cómo busca tu mercado")}
        </h2>

        <p style={{ color: "#475569" }}>
          {slide?.instructions ||
            "Investiga palabras clave relacionadas con tu empresa."}
        </p>
      </header>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div style={tarjeta}>
          <strong>
            {completadas}/{limite}
          </strong>
          <span>Keywords completas</span>
        </div>

        <div style={tarjeta}>
          <strong>{seleccionadas}/12</strong>
          <span>Keywords estratégicas</span>
        </div>

        <div style={tarjeta}>
          <strong>{Math.round((completadas / limite) * 100)}%</strong>
          <span>Progreso del laboratorio</span>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontWeight: 700 }}>Instrucciones</p>

        <ol style={{ paddingLeft: 22, lineHeight: 1.8 }}>
          <li>Investiga palabras clave relacionadas con tu empresa.</li>
          <li>Clasifica su intención de búsqueda.</li>
          <li>Registra la herramienta o fuente utilizada.</li>
          {esMatriz && (
            <>
              <li>Completa 30 palabras clave.</li>
              <li>Evalúa su relevancia comercial.</li>
              <li>Selecciona exactamente 12 keywords estratégicas.</li>
              <li>Justifica por qué las seleccionaste.</li>
            </>
          )}
        </ol>
      </div>

      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table
          style={{
            width: "100%",
            minWidth: esMatriz ? 1100 : 650,
            borderCollapse: "separate",
            borderSpacing: "0 8px",
          }}
        >
          <thead>
            <tr>
              {[
                "#",
                "Palabra clave",
                "Intención",
                "Tipo",
                "Fuente",
                ...(esMatriz ? ["Relevancia", "Top 12", "Justificación"] : []),
              ].map((columna) => (
                <th
                  key={columna}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    fontSize: 12,
                  }}
                >
                  {columna}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibles.map((fila) => (
              <tr key={fila.id}>
                <td style={{ padding: 8 }}>{fila.id}</td>

                <td>
                  <input
                    style={estiloCampo}
                    value={fila.keyword}
                    placeholder="Ej. café en Quito"
                    onChange={(e) =>
                      actualizar(fila.id, "keyword", e.target.value)
                    }
                  />
                </td>

                <td>
                  <select
                    style={estiloCampo}
                    value={fila.intention}
                    onChange={(e) =>
                      actualizar(fila.id, "intention", e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option>Informativa</option>
                    <option>Navegacional</option>
                    <option>Comercial</option>
                    <option>Transaccional</option>
                  </select>
                </td>

                <td>
                  <select
                    style={estiloCampo}
                    value={fila.type}
                    onChange={(e) =>
                      actualizar(fila.id, "type", e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option>Short tail</option>
                    <option>Long tail</option>
                  </select>
                </td>

                <td>
                  <input
                    style={estiloCampo}
                    value={fila.source}
                    placeholder="Google Trends..."
                    onChange={(e) =>
                      actualizar(fila.id, "source", e.target.value)
                    }
                  />
                </td>

                {esMatriz && (
                  <>
                    <td>
                      <select
                        style={estiloCampo}
                        value={fila.relevance}
                        onChange={(e) =>
                          actualizar(fila.id, "relevance", e.target.value)
                        }
                      >
                        <option value="">Seleccionar</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                      </select>
                    </td>

                    <td style={{ textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={fila.priority}
                        onChange={(e) =>
                          seleccionarPrioridad(fila.id, e.target.checked)
                        }
                      />
                    </td>

                    <td>
                      <input
                        style={estiloCampo}
                        value={fila.justification}
                        placeholder="¿Por qué es importante?"
                        onChange={(e) =>
                          actualizar(fila.id, "justification", e.target.value)
                        }
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={exportarCSV}
          style={{
            ...boton,
            background: "#2563eb",
            color: "#fff",
          }}
        >
          Descargar CSV
        </button>

        <button
          onClick={limpiar}
          style={{
            ...boton,
            background: "#e2e8f0",
            color: "#334155",
          }}
        >
          Reiniciar laboratorio
        </button>
      </div>

      <p style={{ fontSize: 12, color: "#64748b", marginTop: 18 }}>
        Los datos se guardan automáticamente en este navegador. Descarga tu
        archivo antes de cambiar de dispositivo.
      </p>
    </section>
  );
}

const tarjeta = {
  flex: "1 1 160px",
  display: "flex",
  flexDirection: "column",
  gap: 6,
  background: "#fff",
  padding: 16,
  borderRadius: 12,
  border: "1px solid #e2e8f0",
};

const boton = {
  padding: "12px 18px",
  border: "none",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
};
