import { generateApplicationError } from "../../libs/error.js";
import * as courseMaterialCompletionRepository from "../repositories/course_material_completion.js";

/**
 *  @param {string} id
 * @param {number} percentage
 */
export async function updateCourseMaterialStatus(id, percentage) {
  try {
    if (percentage === 100) {
      const [, [courseMaterialStatus]] = await courseMaterialCompletionRepository.updateCourseMaterialStatus(id, percentage);
      return courseMaterialStatus;
    } else {
      const [, [courseMaterialStatus]] = await courseMaterialCompletionRepository.updateCourseMaterialPercentage(id, percentage);
      return courseMaterialStatus;
    }
  } catch (err) {
    throw generateApplicationError(err, "Error while updating course material status", 500);
  }
}
