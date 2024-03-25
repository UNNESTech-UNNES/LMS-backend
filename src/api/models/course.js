import { Model } from "sequelize";

/**
 * @typedef CourseAttributes
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {string} author_id
 * @property {string} image
 * @property {boolean} premium
 * @property {number} price
 * @property {string} description
 * @property {string[]} target_audience
 * @property {string} telegram
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
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      this.belongsTo(models.CourseCategory, {
        foreignKey: "course_category_id",
        as: "course_category",
      });
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "code",
          msg: "Code must be unique",
        },
      },
      author_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      target_audience: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      telegram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      course_category_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "Courses",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Course;
};
