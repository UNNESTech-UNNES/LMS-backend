import { Model } from "sequelize";
import isMobilePhone from "validator/lib/isMobilePhone.js";

/**
 * @typedef InstructorAttributes
 * @property {string} id
 * @property {string} name
 * @property {string} nip
 * @property {string | null} image
 * @property {string} position
 * @property {boolean} verified
 * @property {string} description
 * @property {string} password
 * @property {string} email
 * @property {string} phone_number
 * @property {object} social_media
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

export default (sequelize, DataTypes) => {
  class Instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      this.hasMany(models.Otp, {
        foreignKey: "user_id",
      });

      // this.hasMany(models.PasswordReset, {
      //   foreignKey: "user_id",
      // });
    }
  }
  Instructor.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "email",
          msg: "Email already exists. Please use another email",
        },
        validate: {
          isEmail: {
            msg: "Invalid email address",
          },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "phone_number",
          msg: "Phone number already exists. Please use another phone number.",
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
      social_media: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Instructor",
      tableName: "Instructors",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Instructor;
};
