import { Model } from "sequelize";

/**
 * @typedef CourseChapterAttributes
 * @property {string} id
 * @property {string} name
 * @property {number} duration
 * @property {number} order_index
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
  class Course_chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      // define association here
    }
  }
  Course_chapter.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_index: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Course",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Course_chapter",
      tableName: "Course_chapters",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_chapter;
};
