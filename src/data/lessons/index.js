/* ==========================================
   AULA DIGITAL — REGISTRO DE CLASES
   ========================================== */

import contenidoSemana01 from "./contenido/semana01";
import contenidoSemana02 from "./contenido/semana02";
import contenidoSemana03 from "./contenido/semana03";
import contenidoSemana04 from "./contenido/semana04";
import contenidoSemana05 from "./contenido/semana05";
import contenidoSemana06 from "./contenido/semana06";
import contenidoSemana07 from "./contenido/semana07";
import contenidoSemana08 from "./contenido/semana08";
import contenidoSemana09 from "./contenido/semana09";
import contenidoSemana10 from "./contenido/semana10";
import contenidoSemana11 from "./contenido/semana11";
import contenidoSemana12 from "./contenido/semana12";
import contenidoSemana13 from "./contenido/semana13";

import contenidoSemana14 from "./contenido/semana14";

import contenidoSemana15 from "./contenido/semana15";

import contenidoSemana16 from "./contenido/semana16";

import contenidoSemana17 from "./contenido/semana17";
import contenidoSemana18 from "./contenido/semana18";
import seoSemana01 from "./seo/semana01";
import seoSemana02 from "./seo/semana02";
import crmSemana01 from "./crm/semana01";
import crmSemana02 from "./crm/semana02";
import crmSemana03 from "./crm/semana03";
import crmSemana04 from "./crm/semana04";

const lessons = {
  contenido: {
    1: contenidoSemana01,
    2: contenidoSemana02,
    3: contenidoSemana03,
    4: contenidoSemana04,
    5: contenidoSemana05,
    6: contenidoSemana06,
    7: contenidoSemana07,
    8: contenidoSemana08,
    9: contenidoSemana09,
    10: contenidoSemana10,
    11: contenidoSemana11,
    12: contenidoSemana12,
    13: contenidoSemana13,
    14: contenidoSemana14,
    15: contenidoSemana15,
    16: contenidoSemana16,
    17: contenidoSemana17,
    18: contenidoSemana18,
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
