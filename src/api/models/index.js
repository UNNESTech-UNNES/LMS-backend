import { readdir } from "fs/promises";
import { basename, dirname } from "path";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath } from "url";
import config from "../../db/config/database.js";

/**
 * @typedef Database
 * @property {Sequelize} sequelize
 * @property {Sequelize} Sequelize
 * @property {ReturnType<typeof import('./user.js').default>} User
 * @property {ReturnType<typeof import('./class.js').default>} Class
 * @property {ReturnType<typeof import('./user_class_status.js').default>} UserClassStatus
 * @property {ReturnType<typeof import('./course.js').default>} Course
 * @property {ReturnType<typeof import('./course_category.js').default>} CourseCategory
 * @property {ReturnType<typeof import('./course_instructor.js').default>} CourseInstructor
 * @property {ReturnType<typeof import('./course_chapter.js').default>} CourseChapter
 * @property {ReturnType<typeof import('./course_material.js').default>} CourseMaterial
 * @property {ReturnType<typeof import('./course_content.js').default>} CourseContent
 * @property {ReturnType<typeof import('./quiz.js').default>} Quiz
 * @property {ReturnType<typeof import('./quiz_question.js').default>} QuizQuestion
 * @property {ReturnType<typeof import('./quiz-submission.js').default>} QuizSubmission
 * @property {ReturnType<typeof import('./historyattempt.js').default>} HistoryAttempt
 * @property {ReturnType<typeof import('./course_material_completion.js').default>} CourseMaterialCompletion
 * @property {ReturnType<typeof import('./user_course_enrollment.js').default>} UserCourseEnrollment
 * @property {ReturnType<typeof import('./otp.js').default>} Otp
 * @property {ReturnType<typeof import('./password-reset.js').default>} PasswordReset
 */

/** @typedef {keyof Omit<Database, 'sequelize' | 'Sequelize'>} ModelName */

/** @returns {Promise<Database>} */
async function initializeDatabase() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const developmentConfig = /** @type {import('sequelize').Options} */ (config);

  /** @type {Record<string,any>} */
  const db = {};

  const sequelize = new Sequelize(developmentConfig);

  const dir = await readdir(__dirname);

  const files = dir.filter((file) => {
    const isFile = file.indexOf(".") !== 0;
    const isJsFile = file.slice(-3) === ".js";
    const isNotThisFile = file !== basename(__filename);

    return isFile && isJsFile && isNotThisFile;
  });

  for (const file of files) {
    const model = await import(`./${file}`);
    const namedModel = model.default(sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  }

  const modelNames = Object.keys(db);

  for (const modelName of modelNames) if (db[modelName].associate) db[modelName].associate(db);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return /** @type {Database} */ (/** @type {unknown} */ (db));
}

export const {
  sequelize,
  User,
  UserCourseEnrollment,
  Class,
  UserClassStatus,
  Course,
  CourseCategory,
  CourseInstructor,
  CourseChapter,
  CourseMaterial,
  CourseContent,
  CourseMaterialCompletion,
  Quiz,
  QuizQuestion,
  QuizSubmission,
  HistoryAttempt,
  Otp,
  PasswordReset,
} = await initializeDatabase();
