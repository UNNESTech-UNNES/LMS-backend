import { Model } from "sequelize";
import * as CourseMaterialModel from "./course_material.js";

/**
 * @typedef CourseChapterAttributes
 * @property {string} id
 * @property {string} name
 * @property {number} duration
 * @property {number} order_index
 * @property {string} course_id
 * @property {Model<CourseMaterialModel.CourseMaterialAttributes>[]} course_material
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
      this.hasMany(models.CourseMaterial, {
        foreignKey: "course_chapter_id",
        as: "course_materials",
      });

      this.belongsTo(models.Course, {
        foreignKey: "course_id",
      });
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
      },
    },
    {
      sequelize,
      modelName: "CourseChapter",
      tableName: "Course_chapters",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_chapter;
};
