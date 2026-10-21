
import { useState } from "react";

const STORAGE_KEY = "aula_contenido_semana01_taller";

const initialData = {
  team: "",
  brand: "",
  concept: "",
  audience: "",
  platform: "Instagram",
  reason: "",
  push: "",
  pull: "",
  aiReview: "",
};

function readSavedData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...initialData, ...(saved || {}) };
  } catch {
    return { ...initialData };
  }
}

export default function BrandWorkshop({ studentName = "", lesson }) {
  const [form, setForm] = useState(readSavedData);
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    setSaved(false);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  function downloadActivity() {
    const content = document.getElementById("aula-print-content");
    if (!content) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Permite las ventanas emergentes para generar el PDF.");
      return;
    }

    const data = {
      student: studentName.trim() || "Sin especificar",
      ...form,
    };

    const rows = [
      ["Estudiante", data.student],
      ["Equipo", data.team],
      ["Marca", data.brand],
      ["Concepto diferenciador", data.concept],
      ["Público inicial", data.audience],
      ["Plataforma", data.platform],
      ["Justificación", data.reason],
      ["Contenido PUSH", data.push],
      ["Contenido PULL", data.pull],
      ["Revisión crítica con IA", data.aiReview],
    ];

    const escapeHTML = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);

    const rowsHTML = rows
      .map(
        ([label, value]) => `
          <section>
            <h3>${escapeHTML(label)}</h3>
            <p>${escapeHTML(value) || "Sin completar"}</p>
          </section>
        `
      )
      .join("");

    printWindow.document.write(`
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <title>Actividad Semana 01 - ${escapeHTML(data.brand || "Marca de café")}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #17243b;
              padding: 35px;
              line-height: 1.6;
            }
            h1 { margin-bottom: 5px; }
            h2 { color: #375b88; font-size: 16px; }
            h3 { font-size: 13px; margin-bottom: 4px; }
            section {
              padding: 12px 0;
              border-bottom: 1px solid #ddd;
              break-inside: avoid;
            }
            p { margin: 0; white-space: pre-wrap; }
            @page { size: A4; margin: 18mm; }
          </style>
        </head>
        <body>
          <h1>Aula Digital</h1>
          <h2>${escapeHTML(lesson.title)}</h2>
          <p>Diseño para Generación de Contenido · Semana 01</p>
          ${rowsHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <div className="interactive-panel">
      <div className="workshop-heading">
        <div>
          <span className="lesson-kicker">PROYECTO INTEGRADOR</span>
          <h3>Construye tu marca de café</h3>
          <p>
            Completa la ficha. Las respuestas se guardan
            automáticamente en este navegador.
          </p>
        </div>
        <span className="workshop-status">
          {saved ? "Guardado localmente" : "Ficha de trabajo"}
        </span>
      </div>

      <div className="workshop-grid">
        <label className="workshop-field">
          <span>Nombre del equipo</span>
          <input
            value={form.team}
            onChange={(e) => update("team", e.target.value)}
            placeholder="Ej. Equipo Creativo"
          />
        </label>

        <label className="workshop-field">
          <span>Nombre de la marca</span>
          <input
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            placeholder="Ej. Café Horizonte"
          />
        </label>

        <label className="workshop-field">
          <span>Concepto diferenciador</span>
          <select
            value={form.concept}
            onChange={(e) => update("concept", e.target.value)}
          >
            <option value="">Selecciona un concepto</option>
            <option value="Café artesanal">Café artesanal</option>
            <option value="Café prémium">Café prémium</option>
            <option value="Café para viajeros">Café para viajeros</option>
            <option value="Café juvenil">Café juvenil</option>
            <option value="Café sostenible">Café sostenible</option>
            <option value="Otro concepto">Otro concepto</option>
          </select>
        </label>

        <label className="workshop-field">
          <span>Plataforma principal</span>
          <select
            value={form.platform}
            onChange={(e) => update("platform", e.target.value)}
          >
            {lesson.platforms.map((platform) => (
              <option key={platform.name} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </label>

        {[
          ["audience", "¿A quién quieren llegar?"],
          ["reason", "¿Por qué eligieron esa plataforma?"],
          ["push", "Propuesta de contenido PUSH"],
          ["pull", "Propuesta de contenido PULL"],
          ["aiReview", "¿Qué sugerencia de IA aceptaron o rechazaron y por qué?"],
        ].map(([field, label]) => (
          <label className="workshop-field workshop-field--full" key={field}>
            <span>{label}</span>
            <textarea
              rows={3}
              value={form[field]}
              onChange={(e) => update(field, e.target.value)}
              placeholder="Escribe tu respuesta..."
            />
          </label>
        ))}
      </div>

      <div id="aula-print-content" className="workshop-footer">
        <p>
          El documento incluirá el nombre registrado en el encabezado
          de Aula Digital.
        </p>
        <button
          type="button"
          className="lesson-action"
          onClick={downloadActivity}
        >
          Preparar PDF de mi actividad
        </button>
      </div>
    </div>
  );
}
