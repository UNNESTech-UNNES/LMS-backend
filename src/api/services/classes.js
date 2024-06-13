import { sequelize } from "../models/index.js";
import * as classRepository from "../repositories/classes.js";
import * as classModels from "../models/class.js";
import * as userClassStatusModels from "../models/user_class_status.js";
import * as userEnrollmentRepository from "../repositories/user_course_enrollment.js";
import * as courseRepository from "../repositories/course.js";
import * as Types from "../../libs/types/common.js";
import { ApplicationError, generateApplicationError } from "../../libs/error.js";
import { omitPropertiesFromObject } from "../../libs/utils.js";

/**
 * @param {string} user_id
 * @param {string} class_id
 */
export async function registerClass(user_id, class_id) {
  try {
    const payload = /** @type {userClassStatusModels.UserClassStatusAttributes} */ ({
      user_id: user_id,
      class_id: class_id,
      is_active: false,
    });
    const getUnActiveClassStatusById = await classRepository.getUnActiveClassStatusById(user_id, class_id);
    if (getUnActiveClassStatusById) {
      if (getUnActiveClassStatusById.dataValues.is_active === false) {
        throw new ApplicationError("User already registered, The class request is on proceed", 400);
      } else {
        throw new ApplicationError("User already registered for this class", 400);
      }
    }
    const data = await classRepository.registerClass(payload);
    return data;
  } catch (err) {
    throw generateApplicationError(err, "Error while registering class", 500);
  }
}

export async function getAllUnActiveClassesStatus() {
  try {
    const data = await classRepository.getAllUnActiveClassesStatus();
    if (data.length === 0) {
      throw new ApplicationError("No unactive classes found", 404);
    }
    return data;
  } catch (err) {
    throw generateApplicationError(err, "Error while fetching all unactive classes", 500);
  }
}

/** @param {string} id */
export async function activateClassStatus(id) {
  try {
    const classStatus = await classRepository.getUnActiveClassStatusByPk(id);
    if (!classStatus) {
      throw new ApplicationError("Class status not found", 404);
    }
    if (classStatus.dataValues.is_active === true) {
      throw new ApplicationError("Class status already activated", 400);
    }
    await sequelize.transaction(async (transaction) => {
      const [, activatedClassStatus] = await classRepository.setTrueClassStatus(id, transaction);
      const class_id = activatedClassStatus[0].dataValues.class_id;
      const user_id = activatedClassStatus[0].dataValues.user_id;
      const activatedClass = await getClassById(class_id);
      const categoryId = await activatedClass.dataValues.course_category_id;

      const getAllCourseByCategory = await courseRepository.getAllCourseIdByCategory(categoryId);

      // Backfilling the user enrollment table with the courses of the category
      for (const courseIndex in getAllCourseByCategory) {
        const payload = {
          course_id: getAllCourseByCategory[courseIndex].dataValues.id,
          class_id: class_id,
          user_id: user_id,
        };

        await userEnrollmentRepository.createUserCourse(payload, transaction);
      }
    });

    // send notification
  } catch (err) {
    throw generateApplicationError(err, "Error while setting true class status", 500);
  }
}

export async function getClasses() {
  try {
    const data = await classRepository.getClasses();
    return data;
  } catch (err) {
    throw generateApplicationError(err, "Error while fetching classes", 500);
  }
}

/** @param {string} id */
export async function getClassById(id) {
  try {
    const data = await classRepository.getClassById(id);
    if (!data) {
      throw new ApplicationError("Class not found", 404);
    }
    return data;
  } catch (err) {
    throw generateApplicationError(err, "Error while fetching class", 500);
  }
}

/** @param {string} id */
export async function getUserClasses(id) {
  try {
    const data = await classRepository.getUserClasses(id);
    if (data.length === 0) {
      throw new ApplicationError("No classes found", 404);
    }
    return data;
  } catch (err) {
    throw generateApplicationError(err, "Error while fetching user classes", 500);
  }
}

/** @param {classModels.ClassAttributes} payload */
export async function createClass(payload) {
  const parsedPayload = omitPropertiesFromObject(payload, ["id", "created_at", "updated_at"]);
  try {
    const newClass = await classRepository.createClass(parsedPayload);
    return newClass;
  } catch (err) {
    throw generateApplicationError(err, "Error while creating class", 500);
  }
}

/**
 * @param {string} id
 * @param {classModels.ClassAttributes} payload
 */
export async function updateClass(id, payload) {
  const parsedPayload = omitPropertiesFromObject(payload, ["id", "created_at", "updated_at"]);
  try {
    await classRepository.updateClass(parsedPayload, id);
    const updatedClass = await classRepository.getClassById(id);
    return updatedClass;
  } catch (err) {
    throw generateApplicationError(err, "Error while updating class", 500);
  }
}

/** @param {string} id */
export async function deleteClass(id) {
  try {
    await classRepository.deleteClass(id);
  } catch (err) {
    throw generateApplicationError(err, "Error while deleting class", 500);
  }
}
