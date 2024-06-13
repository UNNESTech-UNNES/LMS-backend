import { CourseInstructor } from "../models/index.js";
import * as CourseInstructorModels from "../models/course_instructor.js";

/** @param {Partial<CourseInstructorModels.CourseInstructorAttributes>} payload */
export function createCourseInstructor(payload) {
  return CourseInstructor.create(payload);
}

/** @param {string} id */
export function getCourseInstructorById(id) {
  return CourseInstructor.findOne({
    where: { id },
  });
}

/** @param {string} courseId */
export function getCourseInstructorsByCourseId(courseId) {
  return CourseInstructor.findAll({
    where: { course_id: courseId },
    attributes: ["id"],
  });
}

/**
 * @param {CourseInstructorModels.CourseInstructorAttributes} payload
 * @param {string} instructorId
 */
export function updateCourseInstructor(payload, instructorId) {
  return CourseInstructor.update(payload, {
    where: { id: instructorId },
  });
}

/** @param {string[]} instructorIds */
export function destroyCourseInstructor(instructorIds) {
  return CourseInstructor.destroy({ where: { id: instructorIds } });
}
