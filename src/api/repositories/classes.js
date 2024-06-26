import Sequelize from "sequelize";
import { sequelize, Class, CourseCategory, User, UserClassStatus } from "../models/index.js";
import * as ClassModels from "../models/class.js";
import * as UserClassStatusModels from "../models/user_class_status.js";

/**
 * @param {UserClassStatusModels.UserClassStatusAttributes} payload
 */
export function registerClass(payload) {
  return UserClassStatus.create(payload);
}

/** @param {string} id */
export function getUnActiveClassStatusByPk(id) {
  return UserClassStatus.findByPk(id);
}

/**
 * @param {string} user_id
 * @param {string} class_id
 */
export function getUnActiveClassStatusById(user_id, class_id) {
  return UserClassStatus.findOne({
    where: {
      user_id,
      class_id,
      is_active: false,
    },
  });
}

export function getAllUnActiveClassesStatus() {
  return UserClassStatus.findAll({
    where: {
      is_active: false,
    },
    include: [
      {
        model: Class,
        as: "class",
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email", "phone_number", "verified"],
      },
    ],
  });
}

/**
 *  @param {string} id
 *  @param {Sequelize.Transaction} transaction
 */
export function setTrueClassStatus(id, transaction) {
  return UserClassStatus.update(
    { is_active: true },
    {
      where: {
        id,
      },
      returning: true,
      transaction: transaction,
    }
  );
}

export function getClasses() {
  return Class.findAll({
    attributes: {
      include: [getTotalMemberInClass()],
    },
  });
}

/** @param {string} id */
export function getClassById(id) {
  return Class.findByPk(id, {
    include: [
      {
        model: User,
        as: "instructor",
        attributes: ["id", "name", "email", "phone_number"],
      },
      {
        model: CourseCategory,
        as: "course_category",
      },
    ],
    attributes: {
      include: [getTotalMemberInClass()],
    },
  });
}

/** @param {string} user_id */
export function getUserClasses(user_id) {
  return Class.findAll({
    include: [
      {
        model: UserClassStatus,
        as: "class_status",
        where: {
          user_id,
          is_active: true,
        },
        attributes: [],
      },
      {
        model: User,
        as: "instructor",
        attributes: ["id", "name", "email", "phone_number"],
      },
      {
        model: CourseCategory,
        as: "course_category",
      },
    ],
    attributes: {
      include: [getTotalMemberInClass()],
      exclude: ["registration_deadline", "instructor_id"],
    },
  });
}

/** @param {any} payload */
export function createClass(payload) {
  return Class.create(payload);
}

/**
 * @param {any} payload
 * @param {string} id
 */
export function updateClass(payload, id) {
  return Class.update(payload, {
    where: {
      id,
    },
  });
}

/** @param {string} id */
export function deleteClass(id) {
  return Class.destroy({
    where: {
      id,
    },
  });
}

/** @returns {Sequelize.ProjectionAlias} */
function getTotalMemberInClass() {
  const referencedClassIdFrom = '"Class".id';
  return [
    sequelize.cast(
      sequelize.literal(
        `(
        SELECT COUNT(*)
        FROM "UserClassStatuses" AS ucs
        WHERE ucs.class_id = ${referencedClassIdFrom} AND ucs.is_active = true    
        )`
      ),
      "integer"
    ),
    "total_member",
  ];
}
