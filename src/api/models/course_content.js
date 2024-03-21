import { Model } from "sequelize";

/**
 * @typedef CourseContentAttributes
 * @property {string} id
 * @property {string} name
 * @property {number} order_index
 * @property {boolean} is_public
 * @property {string} course_chapter_id
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

export default (sequelize, DataTypes) => {
  class Course_content extends Model {
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
  Course_content.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_index: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      course_chapter_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Course_chapter",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Course_content",
      tableName: "Course_contents",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_content;
};
