import { Model } from "sequelize";
import * as QuizQuestionModel from "./quiz_question.js";

/**
 * @typedef QuizAttributes
 * @property {string} id
 * @property {string} course_chapter_id
 * @property {string} title
 * @property {string} description
 * @property {boolean} is_public
 * @property {number} order_index
 * @property {boolean} retake
 * @property {Model<QuizQuestionModel.QuizQuestionAttributes>[]} questions
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<QuizAttributes>} */
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      this.belongsTo(models.CourseChapter, {
        foreignKey: "course_chapter_id",
        as: "chapter",
      });

      this.hasMany(models.QuizQuestion, {
        foreignKey: "quiz_id",
        as: "questions",
      });

      this.hasMany(models.HistoryAttempt, {
        foreignKey: "quiz_id",
        as: "history_attempts",
      });
    }
  }
  Quiz.init(
    // @ts-ignore
    {
      course_chapter_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      order_index: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      retake: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Quiz",
      tableName: "Quizzes",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Quiz;
};
