"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuid } = await import("uuid");
    const { getNormalUserId, getCourseIdsByCategoryName, getClassIdByName } = await import("../../libs/seed.js");
    const courseIds = await getCourseIdsByCategoryName("Algorithm and Data Structure");
    const user = await getNormalUserId();
    const classSample = await getClassIdByName("Algorithm and Data Structure Class");
    const dataSample = courseIds.map((courseId) => ({
      id: uuid(),
      user_id: user,
      class_id: classSample,
      course_id: courseId,
      onboarded: true,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("User_Course_Enrollments", dataSample, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("User_Course_Enrollments", null, {});
  },
};
