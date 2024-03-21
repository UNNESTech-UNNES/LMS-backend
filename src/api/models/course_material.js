import { Model } from "sequelize";

/**
 * @typedef CourseMaterialAttributes
 * @property {string} id
 * @property {string} label
 * @property {number} order_index
 * @property {string} type
 * @property {string} url
 * @property {string} heading
 * @property {string} text_value
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

export default (sequelize, DataTypes) => {
  class Course_material extends Model {
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
  Course_material.init(
    {
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_index: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
      },
      heading: {
        type: DataTypes.TEXT,
      },
      text_value: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Course_material",
      tableName: "Course_materials",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course_material;
};
