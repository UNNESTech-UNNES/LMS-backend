import Sequelize from "sequelize";
import { UserCourseEnrollment } from "../models/index.js";

/**
 * @param {any} payload
 * @param {Sequelize.Transaction} transaction
 */
export function createUserCourse(payload, transaction) {
  return UserCourseEnrollment.create(payload, {
    transaction: transaction,
  });
}

/**
 * @param {string} userId
 * @param {string} courseId
 */
export function getUserCourseByUserIdAndCourseId(userId, courseId) {
  return UserCourseEnrollment.findOne({
    where: { user_id: userId, course_id: courseId },
  });
}

/** @param {string} id */
export function setOnboardedTrue(id) {
  return UserCourseEnrollment.update(
    { onboarded: true },
    {
      where: { id: id },
      returning: true,
    }
  );
}
