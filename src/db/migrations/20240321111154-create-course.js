"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      premium: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      author_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      course_category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Course_categories",
          key: "id",
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      target_audience: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      telegram: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Courses");
  },
};
