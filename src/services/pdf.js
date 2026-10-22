
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getDeliveryId } from "./storage";

const COLORS = {
  navy: [19, 34, 57],
  blue: [39, 79, 130],
  orange: [208, 123, 55],
  muted: [101, 116, 139],
  light: [240, 244, 249],
  white: [255, 255, 255],
};

function clean(value) {
  return String(value ?? "").trim() || "Sin completar";
}

function safeFileName(value) {
  return String(value || "estudiante")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 50);
}

// ======================================================
// PDF ACADÉMICO ORIGINAL - SEMANA 1 DE CONTENIDO
// ======================================================

export function downloadWeekOnePDF({
  studentName,
  work,
  reflection,
}) {
  const name = String(studentName || "").trim();

  if (!name) {
    throw new Error("Debes registrar tu nombre antes de descargar.");
  }

  const safeWork = work || {};
  const safeReflection = reflection || {};

  const courseId = "contenido";
  const weekNumber = 1;
  const deliveryId = getDeliveryId(courseId, weekNumber);
  const generatedAt = new Date();

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const usableWidth = pageWidth - margin * 2;

  function footer(page) {
    doc.setDrawColor(...COLORS.light);
    doc.line(
      margin,
      pageHeight - 18,
      pageWidth - margin,
      pageHeight - 18
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);

    doc.text(
      "AULA DIGITAL | EVIDENCIA DE APRENDIZAJE",
      margin,
      pageHeight - 12
    );

    doc.text(
      `Página ${page}`,
      pageWidth - margin,
      pageHeight - 12,
      { align: "right" }
    );
  }

  function heading(title, subtitle = "") {
    doc.setFillColor(...COLORS.navy);
    doc.rect(0, 0, pageWidth, 33, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.white);
    doc.text("AULA DIGITAL", margin, 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      "DISEÑO PARA GENERACIÓN DE CONTENIDO",
      margin,
      23
    );

    doc.setTextColor(...COLORS.navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text(title, margin, 46);

    if (subtitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...COLORS.muted);

      const lines = doc.splitTextToSize(
        subtitle,
        usableWidth
      );

      doc.text(lines, margin, 54);
    }
  }

  // ====================================================
  // PORTADA
  // ====================================================

  doc.setFillColor(...COLORS.navy);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(...COLORS.orange);
  doc.rect(margin, 42, 34, 3, "F");

  doc.setTextColor(...COLORS.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("AULA DIGITAL", margin, 33);

  doc.setFontSize(12);
  doc.setTextColor(215, 225, 237);

  doc.text(
    "EVIDENCIA DE APRENDIZAJE / SEMANA 01",
    margin,
    72
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(29);

  const coverTitle = doc.splitTextToSize(
    "EL NACIMIENTO DE UNA MARCA DE CAFÉ",
    usableWidth
  );

  doc.text(coverTitle, margin, 94);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(215, 225, 237);

  doc.text(
    "Plataformas digitales y estrategias PUSH y PULL",
    margin,
    133
  );

  doc.setDrawColor(85, 104, 130);
  doc.line(
    margin,
    161,
    pageWidth - margin,
    161
  );

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.white);

  doc.text("ESTUDIANTE", margin, 178);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.text(
    doc.splitTextToSize(name, usableWidth),
    margin,
    187
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `Equipo: ${clean(safeWork.team)}`,
    margin,
    210
  );

  doc.text(
    `Marca: ${clean(safeWork.brand)}`,
    margin,
    219
  );

  doc.text(
    `Fecha: ${generatedAt.toLocaleDateString("es-EC")}`,
    margin,
    228
  );

  doc.setFontSize(9);
  doc.setTextColor(215, 225, 237);

  doc.text(
    "IDENTIFICADOR DE ENTREGA",
    margin,
    251
  );

  doc.setFont("helvetica", "bold");
  doc.text(deliveryId, margin, 260);

  // ====================================================
  // CONSTRUCCIÓN DE MARCA
  // ====================================================

  doc.addPage();

  heading(
    "01 / Construcción de marca",
    "Decisiones estratégicas desarrolladas durante el taller."
  );

  autoTable(doc, {
    startY: 65,
    margin: {
      left: margin,
      right: margin,
    },
    head: [
      ["CRITERIO", "DESARROLLO DEL ESTUDIANTE"],
    ],
    body: [
      ["Equipo", clean(safeWork.team)],
      ["Marca", clean(safeWork.brand)],
      ["Concepto", clean(safeWork.concept)],
      [
        "Diferenciación",
        clean(safeWork.differentiation),
      ],
      [
        "Público inicial",
        clean(safeWork.audience),
      ],
      [
        "Plataforma elegida",
        clean(safeWork.platform),
      ],
      [
        "Justificación",
        clean(safeWork.reason),
      ],
    ],
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 5,
      overflow: "linebreak",
      valign: "top",
      lineColor: [222, 230, 239],
    },
    headStyles: {
      fillColor: COLORS.blue,
      textColor: COLORS.white,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 253],
    },
    columnStyles: {
      0: {
        cellWidth: 45,
        fontStyle: "bold",
      },
      1: {
        cellWidth: usableWidth - 45,
      },
    },
  });

  // ====================================================
  // ESTRATEGIAS PUSH Y PULL
  // ====================================================

  doc.addPage();

  heading(
    "02 / Estrategias de contenido",
    "Dos propuestas diferentes para comunicar la misma marca."
  );

  autoTable(doc, {
    startY: 65,
    margin: {
      left: margin,
      right: margin,
    },
    head: [
      ["ESTRATEGIA", "PROPUESTA Y JUSTIFICACIÓN"],
    ],
    body: [
      ["PUSH", clean(safeWork.push)],
      ["PULL", clean(safeWork.pull)],
      [
        "Revisión crítica",
        clean(safeWork.aiReview),
      ],
    ],
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 6,
      overflow: "linebreak",
      valign: "top",
      lineColor: [222, 230, 239],
    },
    headStyles: {
      fillColor: COLORS.blue,
      textColor: COLORS.white,
    },
    columnStyles: {
      0: {
        cellWidth: 45,
        fontStyle: "bold",
      },
      1: {
        cellWidth: usableWidth - 45,
      },
    },
  });

  // ====================================================
  // REFLEXIÓN INDIVIDUAL
  // ====================================================

  doc.addPage();

  heading(
    "03 / Reflexión individual",
    "Conclusiones y decisiones del proceso de aprendizaje."
  );

  autoTable(doc, {
    startY: 65,
    margin: {
      left: margin,
      right: margin,
    },
    body: [
      [
        "¿Qué aprendí?",
        clean(safeReflection.learning),
      ],
      [
        "¿Qué cambiaría?",
        clean(safeReflection.improvement),
      ],
      [
        "¿Cómo aplicaré PUSH y PULL?",
        clean(safeReflection.application),
      ],
    ],
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 6,
      overflow: "linebreak",
      valign: "top",
      lineColor: [222, 230, 239],
    },
    columnStyles: {
      0: {
        cellWidth: 55,
        fontStyle: "bold",
      },
      1: {
        cellWidth: usableWidth - 55,
      },
    },
  });

  let y = (doc.lastAutoTable?.finalY || 140) + 16;

  if (y > pageHeight - 65) {
    doc.addPage();
    y = 35;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.navy);

  doc.text(
    "DECLARACIÓN DE AUTORÍA",
    margin,
    y
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);

  const declaration = doc.splitTextToSize(
    "Declaro que he revisado esta entrega y que las decisiones, " +
      "justificaciones y reflexiones consignadas representan " +
      "mi trabajo y aprendizaje.",
    usableWidth
  );

  doc.text(declaration, margin, y + 9);

  const totalPages = doc.getNumberOfPages();

  for (let page = 2; page <= totalPages; page++) {
    doc.setPage(page);
    footer(page);
  }

  const filename =
    `AulaDigital_S01_${safeFileName(name)}_${deliveryId}.pdf`;

  doc.save(filename);

  return {
    deliveryId,
    filename,
  };
}

// ======================================================
// NUEVO PDF UNIVERSAL DE TALLERES PRÁCTICOS
// CONTENIDO / SEO / CRM
// ======================================================

export function downloadWorkshopPDF({
  studentName,
  courseId,
  weekNumber,
  title,
  answers,
}) {
  const name = String(studentName || "").trim();

  if (!name) {
    throw new Error(
      "Debes registrar tu nombre antes de descargar."
    );
  }

  const entries = Object.entries(answers || {}).filter(
    ([, value]) =>
      value !== null &&
      value !== undefined
  );

  if (
    !entries.length ||
    entries.every(
      ([, value]) => !String(value).trim()
    )
  ) {
    throw new Error(
      "Primero debes completar el taller práctico."
    );
  }

  const courses = {
    contenido:
      "DISEÑO PARA GENERACIÓN DE CONTENIDO",
    seo:
      "SEO · SEM · AEO · GEO",
    crm:
      "GESTIÓN COMERCIAL Y CRM",
  };

  const courseName =
    courses[courseId] ||
    String(courseId || "CURSO").toUpperCase();

  const week = String(weekNumber).padStart(2, "0");

  const deliveryId = getDeliveryId(
    courseId,
    weekNumber
  );

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const margin = 20;
  const pageWidth =
    doc.internal.pageSize.getWidth();

  const pageHeight =
    doc.internal.pageSize.getHeight();

  const usableWidth =
    pageWidth - margin * 2;

  // ====================================================
  // ENCABEZADO DEL TALLER
  // ====================================================

  doc.setFillColor(...COLORS.navy);
  doc.rect(
    0,
    0,
    pageWidth,
    48,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(12);
  doc.setTextColor(...COLORS.white);

  doc.text(
    "AULA DIGITAL",
    margin,
    17
  );

  doc.setFontSize(9);

  doc.text(
    courseName,
    margin,
    27
  );

  doc.setFontSize(13);

  doc.text(
    `TALLER PRÁCTICO / SEMANA ${week}`,
    margin,
    39
  );

  // ====================================================
  // DATOS DEL ESTUDIANTE
  // ====================================================

  doc.setTextColor(...COLORS.navy);
  doc.setFontSize(17);

  const titleLines =
    doc.splitTextToSize(
      title ||
        "Desarrollo del taller práctico",
      usableWidth
    );

  doc.text(
    titleLines,
    margin,
    63
  );

  let y =
    63 +
    titleLines.length * 8 +
    5;

  doc.setFontSize(10);
  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    `Estudiante: ${name}`,
    margin,
    y
  );

  y += 8;

  doc.text(
    `Fecha: ${new Date().toLocaleDateString("es-EC")}`,
    margin,
    y
  );

  y += 8;

  doc.text(
    `Código: ${deliveryId}`,
    margin,
    y
  );

  // ====================================================
  // RESPUESTAS DEL TALLER
  // ====================================================

  const rows = entries.map(
    ([label, value]) => [
      label,
      clean(value),
    ]
  );

  autoTable(doc, {
    startY: y + 14,

    margin: {
      left: margin,
      right: margin,
      bottom: 25,
    },

    head: [
      [
        "ACTIVIDAD / CRITERIO",
        "RESPUESTA DEL ESTUDIANTE",
      ],
    ],

    body: rows,

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 5,
      overflow: "linebreak",
      valign: "top",
      lineColor: [222, 230, 239],
    },

    headStyles: {
      fillColor: COLORS.blue,
      textColor: COLORS.white,
      fontStyle: "bold",
    },

    alternateRowStyles: {
      fillColor: [248, 250, 253],
    },

    columnStyles: {
      0: {
        cellWidth: 55,
        fontStyle: "bold",
      },

      1: {
        cellWidth:
          usableWidth - 55,
      },
    },
  });

  // ====================================================
  // PIE DE PÁGINA
  // ====================================================

  const totalPages =
    doc.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    doc.setDrawColor(
      ...COLORS.light
    );

    doc.line(
      margin,
      pageHeight - 18,
      pageWidth - margin,
      pageHeight - 18
    );

    doc.setFontSize(8);

    doc.setTextColor(
      ...COLORS.muted
    );

    doc.text(
      "AULA DIGITAL | TALLER PRÁCTICO",
      margin,
      pageHeight - 12
    );

    doc.text(
      `Página ${page} de ${totalPages}`,
      pageWidth - margin,
      pageHeight - 12,
      {
        align: "right",
      }
    );
  }

  // ====================================================
  // DESCARGA
  // ====================================================

  const filename =
    `Taller_${safeFileName(courseId)}_S${week}_${safeFileName(name)}.pdf`;

  doc.save(filename);

  return {
    filename,
    deliveryId,
  };
}
