/* ==========================================
   AULA DIGITAL — REGISTRO DE CLASES
   ========================================== */

import contenidoSemana01 from "./contenido/semana01";
import seoSemana01 from "./seo/semana01";
import seoSemana02 from "./seo/semana02";
import crmSemana01 from "./crm/semana01";
import crmSemana02 from "./crm/semana02";
import crmSemana03 from "./crm/semana03";
import crmSemana04 from "./crm/semana04";
const lessons = {
  contenido: {
    1: contenidoSemana01,
  },

  seo: {
    1: seoSemana01,
    2: seoSemana02,
  },

  crm: {
    1: crmSemana01,
    2: crmSemana02,
    3: crmSemana03,
    4: crmSemana04,
  },
};

export function getLesson(courseId, weekNumber) {
  return lessons[courseId]?.[Number(weekNumber)] ?? null;
}

export default lessons;
