import { generateApplicationError, ApplicationError } from "../../libs/error.js";
import * as courseCategoryRepository from "../repositories/course-categories.js";
import * as Models from "../models/course_category.js";

export async function getCourseCategories() {
  try {
    const categories = await courseCategoryRepository.getCourseCategories();
    return categories;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting course categories", 500);
  }
}

/**
 *
 * @param {Models.CourseCategoryAttributes} payload
 */
export async function createCourseCategory(payload) {
  try {
    const category = await courseCategoryRepository.createCourseCategory(payload);
    return category;
  } catch (err) {
    throw generateApplicationError(err, "Error while creating course category", 500);
  }
}

/**
 * @param {string} id
 */
export async function deleteCourseCategory(id) {
  try {
    const data = await courseCategoryRepository.getCourseCategoryById(id);
    if (!data) throw new ApplicationError("No course category found", 404);
    return await courseCategoryRepository.destroyCourseCategory(id);
  } catch (err) {
    throw generateApplicationError(err, "Error while deleting course category", 500);
  }
}
