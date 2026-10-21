
/* ==========================================
   AULA DIGITAL — REGISTRO DE CLASES
   ========================================== */

import contenidoSemana01 from "./contenido/semana01";
import seoSemana01 from "./seo/semana01";

const lessons = {
  contenido: {
    1: contenidoSemana01,
  },

  seo: {
    1: seoSemana01,
  },

  crm: {},
};

export function getLesson(courseId, weekNumber) {
  return lessons[courseId]?.[Number(weekNumber)] ?? null;
}

export default lessons;
