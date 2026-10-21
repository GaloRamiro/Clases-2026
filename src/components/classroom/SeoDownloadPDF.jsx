import { jsPDF } from "jspdf";

const STORAGE_PREFIX = "aula:seo:semana01";

function readSeoWork(lessonId, studentName) {
  const student = String(studentName || "")
    .trim()
    .toLowerCase();

  const key = `${STORAGE_PREFIX}:${lessonId}:${student}`;

  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

export default function SeoDownloadPDF({ lesson, studentName = "" }) {
  function downloadPDF() {
    const work = readSeoWork(lesson.id, studentName);

    if (!work) {
      alert("Primero completa las actividades de SEO.");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 18;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    function ensureSpace(height = 12) {
      if (y + height > pageHeight - 18) {
        doc.addPage();
        y = 20;
      }
    }

    function heading(text) {
      ensureSpace(18);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(16, 36, 56);
      doc.text(text, margin, y);
      y += 9;
    }

    function field(label, value) {
      const content = String(value || "Sin completar");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);

      const labelLines = doc.splitTextToSize(label, maxWidth);

      ensureSpace(labelLines.length * 5 + 5);
      doc.text(labelLines, margin, y);
      y += labelLines.length * 5;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(55, 70, 85);

      const lines = doc.splitTextToSize(content, maxWidth);

      for (const line of lines) {
        ensureSpace(6);
        doc.text(line, margin, y);
        y += 5;
      }

      y += 5;
      doc.setTextColor(16, 36, 56);
    }

    doc.setFillColor(16, 36, 56);
    doc.rect(0, 0, pageWidth, 43, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.text("DIAGNOSTICO INICIAL SEO", margin, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Semana 01 | SEO - SEM - AEO - GEO", margin, 29);
    doc.text(
      `Estudiante o equipo: ${studentName || "Sin identificar"}`,
      margin,
      36,
    );

    y = 54;

    heading("1. LABORATORIO DE BUSQUEDA");

    (work.searches || []).forEach((search, index) => {
      heading(`Busqueda ${index + 1}`);

      field("Consulta:", search.query);
      field("Buscador:", search.engine);
      field("Tipo de resultado:", search.resultType);
      field("URL del resultado:", search.resultUrl);
      field("URL de evidencia:", search.evidenceUrl);
      field("Observaciones:", search.observation);
      field("Justificacion:", search.reasoning);
    });

    heading("2. FICHA DE LA EMPRESA");

    const company = work.company || {};

    field("Empresa:", company.name);
    field("Sitio web:", company.website);
    field("Sector:", company.sector);
    field("Mercado:", company.market);
    field("Ubicacion:", company.location);
    field("Producto o servicio:", company.product);
    field("Publico objetivo:", company.audience);
    field("Propuesta de valor:", company.valueProposition);
    field("Objetivo comercial:", company.commercialGoal);

    heading("3. INVESTIGACION DE COMPETIDORES");

    (work.competitors || []).forEach((competitor, index) => {
      heading(`Competidor ${index + 1}`);

      field("Nombre:", competitor.name);
      field("Sitio web:", competitor.website);
      field("Busqueda:", competitor.searchQuery);
      field("Evidencia:", competitor.evidenceUrl);
      field("Observacion:", competitor.observation);
    });

    heading("4. OPORTUNIDADES");

    (work.opportunities || []).forEach((opportunity, index) => {
      heading(`Oportunidad ${index + 1}`);

      field("Descripcion:", opportunity.description);
      field("Justificacion:", opportunity.justification);
    });

    heading("5. PRESENTACION DEL DIAGNOSTICO");

    const presentation = work.presentation || {};

    field("Decision principal:", presentation.mainDecision);
    field("Evidencia que la respalda:", presentation.supportingEvidence);
    field("Conclusion:", presentation.conclusion);

    const totalPages = doc.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {
      doc.setPage(page);
      doc.setFontSize(9);
      doc.setTextColor(120, 135, 145);
      doc.text(
        `Aula Digital | Analisis SEO | Pagina ${page} de ${totalPages}`,
        margin,
        pageHeight - 10,
      );
    }

    const safeName = String(studentName || "estudiante")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-");

    doc.save(`SEO-Semana-01-${safeName}.pdf`);
  }

  return (
    <div className="ad-seo-download">
      <h3>Entrega académica — SEO</h3>

      <p>
        Descarga el diagnóstico inicial de tu empresa con las búsquedas,
        competidores, oportunidades y decisiones registradas.
      </p>

      <button type="button" onClick={downloadPDF}>
        Descargar PDF de actividades SEO
      </button>
    </div>
  );
}
