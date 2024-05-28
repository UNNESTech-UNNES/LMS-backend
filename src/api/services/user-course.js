import { sequelize } from "../models/index.js";
import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import * as userCourseRepository from "../repositories/user_course_enrollment.js";
import * as courseMaterialRepository from "../repositories/course_material.js";
import * as courseMaterialCompletionRepository from "../repositories/course_material_completion.js";

/** @param {string} id */
export async function setOnboardedTrue(id) {
  try {
    const userCourse = await userCourseRepository.getUserCourseById(id);
    if (userCourse?.dataValues.onboarded === true) {
      throw new ApplicationError("User course already onboarded", 400);
    }

    await sequelize.transaction(async (transaction) => {
      const [, [updatedUserCourse]] = await userCourseRepository.setOnboardedTrue(id);
      if (!updatedUserCourse) {
        throw new ApplicationError("User course not found", 404);
      }

      // set course material progress
      const course_id = updatedUserCourse.dataValues.course_id;
      const courseMaterials = await courseMaterialRepository.getCourseMaterialByCourseId(course_id);
      console.log(courseMaterials, "courseMaterials");
      for (const courseMaterial of courseMaterials) {
        await courseMaterialCompletionRepository.setCourseMaterialStatus(
          {
            user_id: updatedUserCourse.dataValues.user_id,
            course_material_id: courseMaterial,
          },
          transaction
        );
      }
    });

    return;
  } catch (err) {
    throw generateApplicationError(err, "Error setting onboarded to true", 500);
  }
}
