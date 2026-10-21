import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/*
 * AULA DIGITAL — PDF VISUAL DE CLASE
 *
 * Captura las diapositivas reales de LessonContent.
 * No modifica el PDF de talleres.
 * No exporta respuestas ni formularios de estudiantes.
 */

const PDF_CONFIG = {
  margin: 8,
  scale: 1.5,
  background: "#ffffff",
  imageQuality: 0.88,
};

function waitForRender() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForImages(element) {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map(async (image) => {
      if (image.complete) return;

      await Promise.race([
        new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });

          image.addEventListener("error", resolve, { once: true });
        }),
        wait(5000),
      ]);
    }),
  );

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
}

function createProgressOverlay() {
  const overlay = document.createElement("div");

  overlay.setAttribute("role", "status");

  overlay.setAttribute("aria-live", "polite");

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "99999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "rgba(15, 29, 49, 0.88)",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  });

  const card = document.createElement("div");

  Object.assign(card.style, {
    width: "min(100%, 420px)",
    padding: "36px",
    borderRadius: "16px",
    background: "#ffffff",
    color: "#172338",
    textAlign: "center",
    boxShadow: "0 24px 70px rgba(0,0,0,.2)",
  });

  const title = document.createElement("h2");
  title.textContent = "Preparando PDF de clase";

  Object.assign(title.style, {
    margin: "0 0 12px",
    fontSize: "23px",
    fontWeight: "800",
  });

  const description = document.createElement("p");
  description.textContent = "Preparando las diapositivas...";

  Object.assign(description.style, {
    margin: "0 0 22px",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#65748a",
  });

  const track = document.createElement("div");

  Object.assign(track.style, {
    height: "7px",
    overflow: "hidden",
    borderRadius: "20px",
    background: "#eaf3f6",
  });

  const bar = document.createElement("div");

  Object.assign(bar.style, {
    width: "0%",
    height: "100%",
    background: "#287c91",
    borderRadius: "20px",
    transition: "width .2s ease",
  });

  track.appendChild(bar);

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(track);
  overlay.appendChild(card);

  document.body.appendChild(overlay);

  return {
    update(current, total) {
      const percent = Math.round((current / total) * 100);

      description.textContent = `Procesando diapositiva ${current} de ${total}`;

      bar.style.width = `${percent}%`;
    },

    remove() {
      overlay.remove();
    },
  };
}

function createSafePlaceholder(documentClone, slide) {
  const panel = documentClone.createElement("div");

  Object.assign(panel.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "22px",
    flex: "1",
    minHeight: "300px",
    padding: "38px",
    border: "1px solid #dfe6ef",
    borderLeft: "5px solid #287c91",
    borderRadius: "14px",
    background: "#eaf3f6",
    color: "#172338",
  });

  const label = documentClone.createElement("span");
  label.textContent = "ACTIVIDAD PRÁCTICA";

  Object.assign(label.style, {
    color: "#287c91",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  });

  const title = documentClone.createElement("h3");
  title.textContent = slide.title || "Actividad en clase";

  Object.assign(title.style, {
    margin: "0",
    fontSize: "30px",
    lineHeight: "1.2",
  });

  const description = documentClone.createElement("p");

  description.textContent =
    slide.subtitle ||
    slide.body ||
    "Desarrolla la actividad práctica durante la sesión.";

  Object.assign(description.style, {
    margin: "0",
    fontSize: "19px",
    lineHeight: "1.6",
  });

  const note = documentClone.createElement("p");

  note.textContent =
    "Las respuestas del estudiante se entregan en el PDF de talleres.";

  Object.assign(note.style, {
    margin: "0",
    fontSize: "15px",
    color: "#65748a",
  });

  panel.appendChild(label);
  panel.appendChild(title);
  panel.appendChild(description);
  panel.appendChild(note);

  return panel;
}

function prepareClonedSlide(documentClone, slideIndex, slideData) {
  const target = documentClone.querySelector(
    `[data-class-pdf-index="${slideIndex}"]`,
  );

  if (!target) return;

  /*
   * No se incluyen respuestas personales.
   * El laboratorio se presenta como actividad,
   * sin los campos interactivos.
   */
  if (slideData?.kind === "pushpull-lab") {
    Array.from(target.children).forEach((child) => {
      if (!child.classList.contains("ad-slide-heading")) {
        child.remove();
      }
    });

    target.appendChild(createSafePlaceholder(documentClone, slideData));
  }

  /*
   * El taller mantiene el contenido de la
   * diapositiva, pero no sus formularios.
   */
  if (slideData?.kind === "workshop") {
    target
      .querySelectorAll(".ad-workshop")
      .forEach((element) => element.remove());
  }

  /*
   * Protección adicional:
   * no exportar campos editables.
   */
  target
    .querySelectorAll("input, textarea, select, [contenteditable='true']")
    .forEach((element) => element.remove());
}

function makeFilename(courseName, lesson) {
  const course = String(courseName || "Aula-Digital")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const week = String(lesson.number || 1).padStart(2, "0");

  return `${course}-Semana-${week}-Clase.pdf`;
}

export async function downloadClassPDF({ lesson, courseName }) {
  if (!lesson?.slides?.length) {
    throw new Error("No hay diapositivas para exportar.");
  }

  const classroom = document.querySelector(".ad-classroom");

  if (!classroom) {
    throw new Error("No se encontró la clase en pantalla.");
  }

  const readingButton = classroom.querySelector(
    ".ad-mode-switch button:first-child",
  );

  const presentationButton = classroom.querySelector(
    ".ad-mode-switch button:last-child",
  );

  if (!readingButton || !presentationButton) {
    throw new Error("No se encontraron los controles de la clase.");
  }

  const wasPresentation = presentationButton.classList.contains("selected");

  const previousScrollY = window.scrollY;
  const previousOverflow = document.body.style.overflow;

  let overlay = null;
  const markedSlides = [];

  try {
    overlay = createProgressOverlay();

    document.body.style.overflow = "hidden";

    /*
     * LessonContent ya tiene un modo Lectura
     * que muestra todas las diapositivas.
     * Lo utilizamos sin modificar ese archivo.
     */
    if (wasPresentation) {
      readingButton.click();
      await waitForRender();
    }

    await wait(150);

    const slides = Array.from(
      classroom.querySelectorAll(".ad-reading > .ad-slide"),
    );

    if (slides.length !== lesson.slides.length) {
      throw new Error("No se pudieron preparar todas las diapositivas.");
    }

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageHeight = pdf.internal.pageSize.getHeight();

    const availableWidth = pageWidth - PDF_CONFIG.margin * 2;

    const availableHeight = pageHeight - PDF_CONFIG.margin * 2;

    for (let index = 0; index < slides.length; index++) {
      const slideElement = slides[index];
      const slideData = lesson.slides[index];

      slideElement.setAttribute("data-class-pdf-index", String(index));

      markedSlides.push(slideElement);

      overlay.update(index + 1, slides.length);

      await waitForImages(slideElement);

      const canvas = await html2canvas(slideElement, {
        backgroundColor: PDF_CONFIG.background,

        scale: PDF_CONFIG.scale,

        useCORS: true,

        allowTaint: false,

        logging: false,

        scrollX: 0,

        scrollY: -window.scrollY,

        onclone: (documentClone) => {
          prepareClonedSlide(documentClone, index, slideData);
        },
      });

      if (index > 0) {
        pdf.addPage();
      }

      const imageData = canvas.toDataURL("image/jpeg", PDF_CONFIG.imageQuality);

      const imageWidth = canvas.width;
      const imageHeight = canvas.height;

      const scale = Math.min(
        availableWidth / imageWidth,
        availableHeight / imageHeight,
      );

      const renderedWidth = imageWidth * scale;

      const renderedHeight = imageHeight * scale;

      const x = (pageWidth - renderedWidth) / 2;

      const y = (pageHeight - renderedHeight) / 2;

      pdf.addImage(
        imageData,
        "JPEG",
        x,
        y,
        renderedWidth,
        renderedHeight,
        undefined,
        "FAST",
      );

      /*
       * Liberar memoria entre capturas.
       */
      canvas.width = 0;
      canvas.height = 0;
    }

    pdf.save(makeFilename(courseName, lesson));
  } finally {
    markedSlides.forEach((element) => {
      element.removeAttribute("data-class-pdf-index");
    });

    if (wasPresentation) {
      presentationButton.click();
      await waitForRender();
    }

    document.body.style.overflow = previousOverflow;

    window.scrollTo({
      top: previousScrollY,
      behavior: "instant",
    });

    overlay?.remove();
  }
}
