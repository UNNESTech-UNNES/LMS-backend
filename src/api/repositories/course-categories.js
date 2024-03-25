import { CourseCategory } from "../models/index.js";
import * as Models from "../models/course_category.js";

export function getCourseCategories() {
  return CourseCategory.findAll();
}

/**
 * @param {string} id
 */
export function getCourseCategoryById(id) {
  return CourseCategory.findByPk(id);
}

/**
 * @param {Models.CourseCategoryAttributes} payload
 */
export function createCourseCategory(payload) {
  return CourseCategory.create(payload);
}

/**
 *
 * @param {string} id
 */
export function destroyCourseCategory(id) {
  return CourseCategory.destroy({ where: { id } });
}
