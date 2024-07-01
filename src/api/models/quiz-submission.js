import { Model } from "sequelize";

/**
 * @typedef QuizSubmissionAttributes
 * @property {string} id
 * @property {string} user_id
 * @property {string} question_id
 * @property {string} attempt_id
 * @property {string} answer
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class QuizSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName,any>} models
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      this.belongsTo(models.QuizQuestion, {
        foreignKey: "question_id",
        as: "question",
      });

      this.belongsTo(models.HistoryAttempt, {
        foreignKey: "attempt_id",
        as: "attempt",
      });
    }
  }
  QuizSubmission.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      attempt_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "QuizSubmission",
      tableName: "Quiz_submissions",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return QuizSubmission;
};
