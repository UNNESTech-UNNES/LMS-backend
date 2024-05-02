import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import * as courseMaterialCompletionRepository from "../repositories/course_material_completion.js";

/** @param {string} id */
export async function getCourseMaterialStatusById(id) {
  try {
    const courseMaterialStatus = await courseMaterialCompletionRepository.getCourseMaterialStatusById(id);

    if (!courseMaterialStatus) {
      throw new ApplicationError("Course material status not found", 404);
    }
    return courseMaterialStatus;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting course material status details", 500);
  }
}

/** @param {string} id */
export async function updateCourseMaterialStatus(id) {
  try {
    const [, [courseMaterialStatus]] = await courseMaterialCompletionRepository.updateCourseMaterialStatus(id);
    return courseMaterialStatus;
  } catch (err) {
    throw generateApplicationError(err, "Error while updating course material status", 500);
  }
}
