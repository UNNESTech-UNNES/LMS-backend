import { Model } from "sequelize";

/**
 * @typedef CourseInstructorAttributes
 * @property {string} id
 * @property {string} user_id
 * @property {string} course_id
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Course_instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName, any>} models
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "instructor",
      });

      this.belongsTo(models.Course, {
        foreignKey: "course_id",
      });
    }
  }
  Course_instructor.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CourseInstructor",
      tableName: "Course_instructors",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_instructor;
};
