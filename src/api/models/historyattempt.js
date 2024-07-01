import { Model } from "sequelize";

/**
 * @typedef HistoryAttemptAttributes
 * @property {string} id
 * @property {string} user_id
 * @property {string} quiz_id
 * @property {number} score
 * @property {Date} attempted_at
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class HistoryAttempt extends Model {
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

      this.belongsTo(models.Quiz, {
        foreignKey: "quiz_id",
        as: "quiz",
      });

      this.hasMany(models.QuizSubmission, {
        foreignKey: "attempt_id",
        as: "submissions",
      });
    }
  }
  HistoryAttempt.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quiz_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      attempted_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "HistoryAttempt",
      tableName: "History_attempts",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return HistoryAttempt;
};
