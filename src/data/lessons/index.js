
import contenidoSemana01 from "./contenido/semana01";

const lessons = {
  contenido: {
    1: contenidoSemana01,
  },
  seo: {},
  crm: {},
};

export function getLesson(courseId, weekNumber) {
  return lessons[courseId]?.[weekNumber] ?? null;
}
