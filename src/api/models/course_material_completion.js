import { Model } from "sequelize";

/**
 * @typedef CourseMaterialCompletionAttributes
 * @property {string} id
 * @property {boolean} completed
 * @property {number} percentage
 * @property {string} user_id
 * @property {string} course_material_id
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<CourseMaterialCompletionAttributes>} */
  class CourseMaterialCompletion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import("./index.js").ModelName, any>} models
     */
    static associate(models) {
      this.belongsTo(models.CourseMaterial, {
        foreignKey: "course_material_id",
        as: "course_material",
      });
    }
  }
  CourseMaterialCompletion.init(
    // @ts-ignore
    {
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      percentage: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      course_material_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CourseMaterialCompletion",
      tableName: "Course_material_completions",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return CourseMaterialCompletion;
};
