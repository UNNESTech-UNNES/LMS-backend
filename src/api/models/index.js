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
 * @property {ReturnType<typeof import('./course.js').default>} Course
 * @property {ReturnType<typeof import('./instructor.js').default>} Instructor
 * @property {ReturnType<typeof import('./course_category.js').default>} CourseCategory
 * @property {ReturnType<typeof import('./otp.js').default>} Otp
 * @property {ReturnType<typeof import('./password_reset.js').default>} PasswordReset
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

  for (const modelName of modelNames) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  }

  return /** @type {Database} */ (/** @type {unknown} */ (db));
}

export const { sequelize, User, Course, CourseCategory, Instructor, Otp, PasswordReset } = await initializeDatabase();
