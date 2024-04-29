import Sequelize from "sequelize";
import { sequelize, Course, CourseCategory, CourseChapter, CourseMaterial, CourseContent } from "../models/index.js";
import * as Types from "../../libs/types/common.js";
import * as Models from "../models/course.js";

export function getCourses() {
  return Course.findAll({
    include: ["course_category"],
    attributes: { include: [getTotalDuration(), getTotalMaterials()] },
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
    attributes: { include: [getTotalDuration(), getTotalMaterials()] },
  });
}

/** @param {string} id */
export function getCourseById(id) {
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
          },
        ],
      },
    ],
    order: [
      ["course_chapter", "order_index", "ASC"],
      ["course_chapter", "course_material", "order_index", "ASC"],
    ],
    attributes: { include: [getTotalDuration(), getTotalMaterials()] },
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
            as: "course_materials",
            include: [
              {
                model: CourseContent,
                as: "course_content",
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
