"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuid } = await import("uuid");
    const { getNormalUserId, getClassIdByName } = await import("../../libs/seed.js");
    const dataSample = [
      {
        id: uuid(),
        user_id: await getNormalUserId(),
        class_id: await getClassIdByName("Algorithm and Data Structure Class"),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert("UserClassStatuses", dataSample, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("UserClassStatuses", null, {});
  },
};
