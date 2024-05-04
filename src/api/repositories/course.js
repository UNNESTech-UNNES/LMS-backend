import Sequelize from "sequelize";
import { sequelize, Course, CourseCategory, CourseChapter, CourseMaterial, CourseContent, CourseMaterialCompletion, UserCourseEnrollment } from "../models/index.js";
import * as Types from "../../libs/types/common.js";
import * as Models from "../models/course.js";
import { getUserCourseByUserIdAndCourseId } from "./user_course_enrollment.js";

export function getCourses() {
  return Course.findAll({
    include: ["course_category"],
    attributes: { include: [getTotalDuration(), getTotalMaterials(), getUserTotalCompletedMaterials()] },
  });
}

export function getCoursesWithDetails() {
  return Course.findAll({
    order: [
      ["created_at", "DESC"],
      ["course_chapter", "order_index", "ASC"],
      ["course_chapter", "course_material", "order_index", "ASC"],
    ],
    include: [
      "course_category",
      {
        model: CourseChapter,
        as: "course_chapter",
        include: [
          {
            model: CourseMaterial,
            as: "course_material",
          },
        ],
      },
    ],
  });
}

/**
 * @param {Types.WhereOptions<Course>} whereOptions
 * @param {boolean} [sortByNewest=false] Default is `false`
 */
export async function getCoursesByFilter(whereOptions, sortByNewest) {
  return Course.findAll({
    where: whereOptions,
    include: ["course_category"],
    ...(sortByNewest && { order: [["created_at", "DESC"]] }),
    attributes: { include: [getTotalDuration(), getTotalMaterials(), getUserTotalCompletedMaterials()] },
  });
}

/** @param {string} id */
export function getCourseById(id) {
  return Course.findByPk(id, {
    include: [
      "course_category",
      {
        model: CourseChapter,
        as: "chapters",
        include: [
          {
            model: CourseMaterial,
            as: "materials",
          },
        ],
      },
    ],
    order: [
      ["chapters", "order_index", "ASC"],
      ["chapters", "materials", "order_index", "ASC"],
    ],
    attributes: { include: [getTotalDuration(), getTotalMaterials()] },
  });
}

/** @param {string} userId */
export function getUserCourses(userId) {
  return Course.findAll({
    include: [
      {
        model: UserCourseEnrollment,
        as: "user_course_enrollment",
        where: { user_id: userId },
        attributes: [],
      },
      {
        model: CourseCategory,
        as: "course_category",
      },
    ],
    attributes: {
      include: [getTotalDuration(true), getTotalMaterials(true), getUserTotalCompletedMaterials()],
    },
    replacements: { user_id: userId },
  });
}

/**
 * @param {string} id
 * @param {string} userId
 */
export function getCourseWithUserStatus(id, userId) {
  return Course.findByPk(id, {
    include: [
      "course_category",
      {
        model: CourseChapter,
        as: "course_chapter",
        include: [
          {
            model: CourseMaterial,
            as: "course_material",
            include: [
              {
                model: CourseMaterialCompletion,
                as: "course_material_completion",
                where: { user_id: userId },
              },
            ],
          },
        ],
      },
    ],
    order: [
      ["course_chapter", "order_index", "ASC"],
      ["course_chapter", "course_material", "order_index", "ASC"],
    ],
    attributes: {
      include: [getTotalDuration(), getTotalMaterials(), getUserTotalCompletedMaterials()],
    },
    replacements: { user_id: userId },
  });
}

/** @param {any} payload */
export function createCourse(payload) {
  return Course.create(payload, {
    include: [
      {
        model: CourseChapter,
        as: "chapters",
        include: [
          {
            model: CourseMaterial,
            as: "materials",
            include: [
              {
                model: CourseContent,
                as: "contents",
              },
            ],
          },
        ],
      },
    ],
  });
}

/**
 * @param {string} id
 * @param {Partial<Models.CourseAttributes>} payload
 */
export function updateCourse(id, payload) {
  return Course.update(payload, {
    where: { id },
    returning: true,
  });
}

/** @param {string} id */
export function deleteCourse(id) {
  return Course.destroy({ where: { id } });
}

/** @returns {Sequelize.ProjectionAlias} */
export function getTotalDuration(fromUserPaymentModel = false) {
  const referencedCourseIdFrom = fromUserPaymentModel ? '"UserPayment".course_id' : '"Course".id';

  return [
    sequelize.cast(
      sequelize.literal(
        `(
          SELECT SUM(cc.duration)
          FROM "Course_chapters" cc
          WHERE cc.course_id = ${referencedCourseIdFrom}
        )`
      ),
      "integer"
    ),
    "total_duration",
  ];
}

/** @returns {Sequelize.ProjectionAlias} */
export function getTotalMaterials(fromUserPaymentModel = false) {
  const referencedCourseIdFrom = fromUserPaymentModel ? '"UserPayment".course_id' : '"Course".id';

  return [
    sequelize.cast(
      sequelize.literal(
        `(
          SELECT COUNT(*)

          FROM "Course_materials" AS cm

          JOIN "Course_chapters" AS cc
            ON cm.course_chapter_id = cc.id

          JOIN "Courses" AS c
            ON cc.course_id = c.id
          WHERE c.id = ${referencedCourseIdFrom}
        )`
      ),
      "integer"
    ),
    "total_materials",
  ];
}

/** @returns {Sequelize.ProjectionAlias} */
function getUserTotalCompletedMaterials() {
  return [
    sequelize.cast(
      sequelize.literal(
        `(
          SELECT COUNT(*)

          FROM "Course_material_completions" AS cmc

          JOIN "Course_materials" AS cm
          ON cmc.course_material_id = cm.id

          JOIN "Course_chapters" AS cc
          ON cm.course_chapter_id = cc.id

          JOIN "Courses" AS c
          ON cc.course_id = c.id

          WHERE cmc.user_id = user_id
          AND cmc.completed = true
          AND c.id = "Course".id
        )`
      ),
      "integer"
    ),
    "total_completed_materials",
  ];
}
