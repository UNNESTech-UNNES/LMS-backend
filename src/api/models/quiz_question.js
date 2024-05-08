import { Model } from "sequelize";

/**
 * @typedef QuizQuestionAttributes
 * @property {string} id
 * @property {string} quiz_id
 * @property {string} label
 * @property {string} question
 * @property {string[]} options
 * @property {string} correct_option
 * @property {string} summary
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<QuizQuestionAttributes>} */
  class QuizQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      this.belongsTo(models.Quiz, {
        foreignKey: "quiz_id",
        as: "quiz",
      });
    }
  }
  QuizQuestion.init(
    // @ts-ignore
    {
      quiz_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      label: {
        type: DataTypes.TEXT,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      options: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      correct_option: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "QuizQuestion",
      tableName: "Quiz_questions",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return QuizQuestion;
};
