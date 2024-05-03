import { Model } from "sequelize";

/**
 * @typedef InstructorContributionAttributes
 * @property {string} id
 * @property {string} course_id
 * @property {string} user_id
 * @property {string} user_profil
 * @property {Date} created_at
 * @property {Date} updated_at
 */

const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class InstructorContribution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName, any>} models
     */
    static associate(models) {
      this.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
      });

      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  InstructorContribution.init(
    {
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_profil: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "InstructorContribution",
      tableName: "InstructorContributions",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return InstructorContribution;
};
