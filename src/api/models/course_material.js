import { Model } from "sequelize";
import * as CourseContentModel from "./course_content.js";

/**
 * @typedef CourseMaterialAttributes
 * @property {string} id
 * @property {string} name
 * @property {number} order_index
 * @property {boolean} is_public
 * @property {string} course_chapter_id
 * @property {Model<CourseContentModel.CourseContentAttributes>[]} course_content
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

export default (sequelize, DataTypes) => {
  /** @extends {Model<CourseMaterialAttributes>} */
  class Course_material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      this.hasMany(models.CourseMaterialCompletion, {
        foreignKey: "course_material_id",
        as: "progress",
      });
      this.hasMany(models.CourseContent, {
        foreignKey: "course_material_id",
        as: "contents",
      });

      this.belongsTo(models.CourseChapter, {
        foreignKey: "course_chapter_id",
        as: "chapter",
      });
    }
  }
  Course_material.init(
    // @ts-ignore
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
        defaultValue: true,
      },
      course_chapter_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CourseMaterial",
      tableName: "Course_materials",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_material;
};
