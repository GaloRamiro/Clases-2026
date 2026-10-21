
import semana01 from "./contenido/semana01";

const lessons = {
  contenido: {
    1: semana01,
  },
  seo: {},
  crm: {},
};

export function getLesson(courseId, weekNumber) {
  return lessons[courseId]?.[Number(weekNumber)] ?? null;
}

export default lessons;
