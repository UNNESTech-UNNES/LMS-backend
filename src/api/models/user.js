import { Model } from "sequelize";
import isMobilePhone from "validator/lib/isMobilePhone.js";

/**
 * @typedef UserAttributes
 * @property {string} id
 * @property {string} name
 * @property {string | null} image
 * @property {Roles} role
 * @property {string} email
 * @property {boolean} verified
 * @property {string} password
 * @property {string} phone_number
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

const ROLES = /** @type {const} */ (["USER", "STUDENT", "INSTRUCTOR", "ADMIN", "SUPER_ADMIN"]);

/** @typedef {(typeof ROLES)[number]} Roles */

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<UserAttributes>} */
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      this.hasMany(models.Otp, {
        foreignKey: "user_id",
      });

      this.hasMany(models.PasswordReset, {
        foreignKey: "user_id",
      });

      this.hasMany(models.Course, {
        foreignKey: "author_id",
      });

      this.hasMany(models.CourseInstructor, {
        foreignKey: "user_id",
      });

      this.hasMany(models.UserCourseEnrollment, {
        foreignKey: "user_id",
      });

      this.hasMany(models.Class, {
        foreignKey: "instructor_id",
        as: "instructor",
      });

      this.hasMany(models.UserClassStatus, {
        foreignKey: "user_id",
      });

      this.hasMany(models.QuizSubmission, {
        foreignKey: "user_id",
      });

      this.hasMany(models.HistoryAttempt, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    // @ts-ignore
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM(...ROLES),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "email",
          msg: "Email already exists",
        },
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "phone_number",
          msg: "Phone number already exists",
        },
        validate: {
          /** @param {string | number} value */
          isPhoneNumber(value) {
            if (!isMobilePhone.default(String(value), "id-ID", { strictMode: true })) {
              throw new Error("Invalid phone number");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
