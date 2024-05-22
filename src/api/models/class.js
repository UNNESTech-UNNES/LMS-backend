import { Model } from "sequelize";

/**
 * @typedef ClassAttributes
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {string} schedule
 * @property {string} instructor_id
 * @property {string} course_category_id
 * @property {Date} created_at
 * @property {Date} updated_at
 */
export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<ClassAttributes>} */
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName, any>} models
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "instructor_id",
        as: "instructor",
      });

      this.hasMany(models.UserCourseEnrollment, {
        foreignKey: "class_id",
      });

      this.hasMany(models.UserClassStatus, {
        foreignKey: "class_id",
      });

      this.belongsTo(models.CourseCategory, {
        foreignKey: "course_category_id",
        as: "course_category",
      });
    }
  }
  Class.init(
    // @ts-ignore
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      schedule: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructor_id: {
        type: DataTypes.UUID,
      },
      course_category_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Class",
      tableName: "Classes",
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );
  return Class;
};
