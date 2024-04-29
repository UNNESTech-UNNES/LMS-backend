import { Model } from "sequelize";

/**
 * @typedef CourseAttributes
 * @property {string} id
 * @property {string} name
 * @property {string} code
 * @property {number} price
 * @property {number} rating
 * @property {string} image
 * @property {boolean} premium
 * @property {string} author_id
 * @property {string[]} instructor_id
 * @property {string} course_category_id
 * @property {string} description
 * @property {string[]} target_audience
 * @property {string} telegram
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<CourseAttributes>} */
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName, any>} models
     */
    static associate(models) {
      this.hasMany(models.UserCourseEnrollment, {
        foreignKey: "course_id",
        as: "enrollments",
      });

      this.hasMany(models.CourseChapter, {
        foreignKey: "course_id",
        as: "chapters",
      });

      this.hasMany(models.InstructorContribution, {
        foreignKey: "course_id",
        as: "contributions",
      });

      this.belongsTo(models.User, {
        foreignKey: "author_id",
        as: "author",
      });

      this.belongsTo(models.CourseCategory, {
        foreignKey: "course_category_id",
        as: "course_category",
      });
    }
  }
  Course.init(
    // @ts-ignore
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
          msg: "Code must be unique.",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      premium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      author_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      instructor_id: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      course_category_id: {
        type: DataTypes.UUID,
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
