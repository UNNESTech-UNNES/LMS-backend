import Sequelize from "sequelize";
import { User, sequelize, UserCourseEnrollment, CourseMaterialCompletion } from "../models/index.js";
import course from "../models/course.js";

/**
 * @param {any} payload
 * @param {Sequelize.Transaction} transaction
 */
export function setCourseMaterialStatus(payload, transaction) {
  return CourseMaterialCompletion.create(payload, { transaction: transaction });
}
/**
 * @param {string} courseId
 * @param {string} courseMaterialId
 */
export async function backfillCourseMaterialStatus(courseId, courseMaterialId) {
  const users = await User.findAll({
    include: [
      {
        model: UserCourseEnrollment,
        where: { course_id: courseId },
      },
    ],
  });

  await sequelize.transaction(async (transaction) => {
    for (const user of users) {
      await setCourseMaterialStatus(
        {
          user_id: user.dataValues.id,
          course_material_id: courseMaterialId,
        },
        transaction
      );
    }
  });
}

/**
 * @param {string} id
 * @param {number} percentage
 */
export function updateCourseMaterialPercentage(id, percentage) {
  return CourseMaterialCompletion.update(
    { completed: false, percentage },
    {
      where: { id: id },
      returning: true,
    }
  );
}

/**
 * @param {string} id
 * @param {number} percentage
 */
export function updateCourseMaterialStatus(id, percentage) {
  return CourseMaterialCompletion.update(
    { completed: true, percentage },
    {
      where: { id: id },
      returning: true,
    }
  );
}
