import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import * as contentRepository from "../repositories/course_content.js";

/**
 * @param {string} materialId
 */
export async function getContentsByMaterialId(materialId) {
  try {
    const contents = await contentRepository.getContentsByMaterialIdToShow(materialId);
    if (!contents) {
      throw new ApplicationError("Contents not found", 404);
    }
    return contents;
  } catch (err) {
    throw generateApplicationError(err, "Error while getting contents", 500);
  }
}
