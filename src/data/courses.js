
export const courses = [
  {
    id: "contenido",
    name: "Diseño para Generación de Contenido",
    description:
      "Estrategia, creatividad, producción y comunicación para plataformas digitales.",
    totalWeeks: 18,
  },
  {
    id: "seo",
    name: "Análisis SEO",
    description:
      "Posicionamiento orgánico, análisis de sitios web y optimización para buscadores.",
    totalWeeks: 18,
  },
  {
    id: "crm",
    name: "Gestión y Relación con el Cliente",
    description:
      "Estrategias de relación con clientes, procesos comerciales y herramientas CRM.",
    totalWeeks: 18,
  },
];

export function getCourseWeeks(courseId) {
  const course = courses.find((item) => item.id === courseId);

  if (!course) return [];

  return Array.from({ length: course.totalWeeks }, (_, index) => {
    const number = index + 1;

    return {
      id: `${courseId}-semana-${number}`,
      number,
      title: `Semana ${String(number).padStart(2, "0")}`,
    };
  });
}
