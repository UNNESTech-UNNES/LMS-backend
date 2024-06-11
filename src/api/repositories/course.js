import Sequelize from "sequelize";
import { sequelize, User, Class, Course, CourseCategory, CourseInstructor, CourseChapter, CourseMaterial, CourseContent, CourseMaterialCompletion, Quiz, QuizQuestion, UserCourseEnrollment } from "../models/index.js";
import * as Types from "../../libs/types/common.js";
import * as Models from "../models/course.js";

export function getCourses() {
  return Course.findAll({
    include: [
      "course_category",
      {
        model: CourseInstructor,
        as: "course_instructors",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "name", "email", "phone_number"],
          },
        ],
      },
    ],
    attributes: { include: [getTotalDuration(), getTotalQuizzes(), getTotalMaterials(), getTotalEnrollments()] },
  });
}

export function getCoursesWithDetails() {
  return Course.findAll({
    order: [
      ["created_at", "DESC"],
      ["chapters", "order_index", "ASC"],
      ["chapters", "materials", "order_index", "ASC"],
    ],
    include: [
      "course_category",
      {
        model: CourseInstructor,
        as: "course_instructors",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "name", "email", "phone_number"],
          },
        ],
      },
      {
        model: CourseChapter,
        as: "chapters",
        include: [
          {
            model: CourseMaterial,
            as: "materials",
          },
          {
            model: Quiz,
            as: "quizzes",
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
    include: [
      "course_category",
      {
        model: CourseInstructor,
        as: "course_instructors",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "name", "email", "phone_number"],
          },
        ],
      },
    ],
    ...(sortByNewest && { order: [["created_at", "DESC"]] }),
    attributes: { include: [getTotalDuration(), getTotalQuizzes(), getTotalMaterials(), getTotalEnrollments(), getUserTotalCompletedMaterials()] },
  });
}

/** @param {string} categoryId */
export async function getAllCourseIdByCategory(categoryId) {
  return Course.findAll({
    where: { course_category_id: categoryId },
    attributes: ["id"],
  });
}

/** @param {string} id */
export function getCourseById(id) {
  return Course.findByPk(id, {
    include: [
      "course_category",
      {
        model: CourseInstructor,
        as: "course_instructors",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "name", "email", "phone_number"],
          },
        ],
      },
      {
        model: CourseChapter,
        as: "chapters",
        include: [
          {
            model: CourseMaterial,
            as: "materials",
          },
          {
            model: Quiz,
            as: "quizzes",
          },
        ],
      },
    ],
    order: [
      ["chapters", "order_index", "ASC"],
      ["chapters", "materials", "order_index", "ASC"],
    ],
    attributes: { include: [getTotalDuration(), getTotalQuizzes(), getTotalMaterials(), getTotalEnrollments()] },
  });
}

/** @param {string} id */
export function getCourseByIdToPreview(id) {
  return Course.findByPk(id, {
    include: [
      "course_category",
      {
        model: CourseInstructor,
        as: "course_instructors",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "name", "email", "phone_number"],
          },
        ],
      },
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
          {
            model: Quiz,
            as: "quizzes",
            include: [
              {
                model: QuizQuestion,
                as: "questions",
              },
            ],
          },
        ],
      },
    ],
    order: [
      ["chapters", "order_index", "ASC"],
      ["chapters", "materials", "order_index", "ASC"],
    ],
    attributes: { include: [getTotalDuration(), getTotalQuizzes(), getTotalMaterials(), getTotalEnrollments()] },
  });
}

/** @param {string} userId */
export function getUserCourses(userId) {
  return Course.findAll({
    include: [
      {
        model: UserCourseEnrollment,
        as: "enrollments",
        where: { user_id: userId },
        attributes: [],
        include: [
          {
            model: Class,
            as: "classes",
          },
        ],
      },
      {
        model: CourseCategory,
        as: "course_category",
      },
    ],
    attributes: {
      include: [getTotalDuration(true), getTotalQuizzes(true), getTotalMaterials(true), getUserTotalCompletedMaterials()],
    },
    replacements: { user_id: userId },
  });
}

/**
 * @param {string} userId
 * @param {Types.WhereOptions<Course>} whereOptions
 * @param {boolean} [sortByNewest=false] Default is `false`
 */
export function getUserCoursesWithFilter(userId, whereOptions, sortByNewest) {
  return Course.findAll({
    where: whereOptions,
    include: [
      {
        model: UserCourseEnrollment,
        as: "enrollments",
        where: { user_id: userId },
        attributes: [],
        include: [
          {
            model: Class,
            as: "classes",
          },
        ],
      },
      {
        model: CourseCategory,
        as: "course_category",
      },
    ],
    ...(sortByNewest && { order: [["created_at", "DESC"]] }),
    attributes: {
      include: [getTotalDuration(), getTotalQuizzes(), getTotalMaterials(), getTotalEnrollments(), getUserTotalCompletedMaterials()],
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
        model: CourseInstructor,
        as: "course_instructors",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "name", "email", "phone_number"],
          },
        ],
      },
      {
        model: CourseChapter,
        as: "chapters",
        include: [
          {
            model: CourseMaterial,
            as: "materials",
            include: [
              {
                model: CourseMaterialCompletion,
                as: "progress",
                where: { user_id: userId },
              },
            ],
          },
        ],
      },
    ],
    order: [
      ["chapters", "order_index", "ASC"],
      ["chapters", "materials", "order_index", "ASC"],
    ],
    attributes: {
      include: [getTotalDuration(), getTotalQuizzes(), getTotalMaterials(), getTotalEnrollments(), getUserTotalCompletedMaterials()],
    },
    replacements: { user_id: userId },
  });
}

/** @param {any} payload */
export function createCourse(payload) {
  return Course.create(payload, {
    include: [
      {
        model: CourseInstructor,
        as: "course_instructors",
      },
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
          {
            model: Quiz,
            as: "quizzes",
            include: [
              {
                model: QuizQuestion,
                as: "questions",
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
  const referencedCourseIdFrom = '"Course".id';

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
  const referencedCourseIdFrom = '"Course".id';

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
export function getTotalQuizzes(fromUserPaymentModel = false) {
  const referencedCourseIdFrom = '"Course".id';

  return [
    sequelize.cast(
      sequelize.literal(
        `(
          SELECT COUNT(*)

          FROM "Quizzes" AS q

          JOIN "Course_chapters" AS cc
            ON q.course_chapter_id = cc.id

          JOIN "Courses" AS c
            ON cc.course_id = c.id
          WHERE c.id = ${referencedCourseIdFrom}
        )`
      ),
      "integer"
    ),
    "total_quizzes",
  ];
}

/** @returns {Sequelize.ProjectionAlias} */
function getTotalEnrollments() {
  const referencedCourseIdFrom = '"Course".id';
  return [
    sequelize.cast(
      sequelize.literal(
        `(
          SELECT COUNT(*)
          FROM "User_Course_Enrollments" AS uce
          WHERE uce.course_id = ${referencedCourseIdFrom}
        )`
      ),
      "integer"
    ),
    "total_enrollments",
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
