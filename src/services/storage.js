
const PREFIX = "aula_digital_v1";

export function getStudentName() {
  try {
    return localStorage.getItem("aula_student_name") || "";
  } catch {
    return "";
  }
}

export function saveStudentName(name) {
  try {
    localStorage.setItem("aula_student_name", name.trim());
    return true;
  } catch {
    return false;
  }
}

function lessonKey(courseId, weekNumber) {
  return `${PREFIX}_${courseId}_semana_${String(weekNumber).padStart(2, "0")}`;
}

export function getLessonWork(courseId, weekNumber) {
  try {
    const value = localStorage.getItem(lessonKey(courseId, weekNumber));
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
}

export function saveLessonWork(courseId, weekNumber, data) {
  try {
    const previous = getLessonWork(courseId, weekNumber);

    localStorage.setItem(
      lessonKey(courseId, weekNumber),
      JSON.stringify({
        ...previous,
        ...data,
        updatedAt: new Date().toISOString(),
      })
    );

    return true;
  } catch {
    return false;
  }
}

export function getDeliveryId(courseId, weekNumber) {
  const current = getLessonWork(courseId, weekNumber);

  if (current.deliveryId) {
    return current.deliveryId;
  }

  const randomPart =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().split("-")[0].toUpperCase()
      : Math.random().toString(36).slice(2, 10).toUpperCase();

  const id = `AD-${courseId.toUpperCase()}-S${String(weekNumber).padStart(2, "0")}-${randomPart}`;

  saveLessonWork(courseId, weekNumber, {
    deliveryId: id,
  });

  return id;
}
