import { Model } from "sequelize";

/**
 * @typedef UserClassStatusAttributes
 * @property {string} id
 * @property {string} user_id
 * @property {string} class_id
 * @property {boolean} is_active
 * @property {Date} created_at
 * @property {Date} updated_at
 */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<UserClassStatusAttributes>} */
  class UserClassStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Record<import('./index.js').ModelName, any>} models
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      });

      this.belongsTo(models.Class, {
        foreignKey: "class_id",
        as: "class",
      });
    }
  }

  UserClassStatus.init(
    // @ts-ignore
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      class_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "UserClassStatus",
      tableName: "UserClassStatuses",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return UserClassStatus;
};
