
export const courses = [
  {
    id: "contenido",
    name: "Diseño para Generación de Contenido",
    description: "Estrategia, diseño y producción de contenido digital.",
    totalWeeks: 18,
  },
  {
    id: "seo",
    name: "Análisis SEO",
    description: "Posicionamiento orgánico y análisis de buscadores.",
    totalWeeks: 18,
  },
  {
    id: "crm",
    name: "Gestión y Relación con el Cliente",
    description: "Estrategias de relación y gestión de clientes.",
    totalWeeks: 18,
  },
];

export function getCourseWeeks(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return [];

  return Array.from({ length: course.totalWeeks }, (_, index) => ({
    id: `${courseId}-semana-${index + 1}`,
    number: index + 1,
    title: `Semana ${String(index + 1).padStart(2, "0")}`,
  }));
}
