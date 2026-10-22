import { downloadWorkshopPDF } from "../../services/pdf";

export default function WorkshopDownloadButton({
  studentName,
  lesson,
  title,
  answers,
}) {
  function handleDownload() {
    try {
      downloadWorkshopPDF({
        studentName,
        courseId: lesson.courseId,
        weekNumber: lesson.number,
        title: title || lesson.title,
        answers,
      });
    } catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <button
      type="button"
      className="ad-delivery-toggle"
      onClick={handleDownload}
    >
      Descargar taller práctico en PDF
    </button>
  );
}
