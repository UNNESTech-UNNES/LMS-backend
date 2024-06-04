"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { getInstructorUserId, getSecondInstructorUserId, getCourseIdByName, isTableHasRecords } = await import("../../libs/seed.js");

    if (await isTableHasRecords("Course_instructors", queryInterface)) return;
    const instructorUserId = await getInstructorUserId();
    const secondInstructorUserId = await getSecondInstructorUserId();

    const dataCourseInstructor = [
      {
        user_id: instructorUserId,
        course_id: await getCourseIdByName("Intro to Design System"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: secondInstructorUserId,
        course_id: await getCourseIdByName("Intro to Design System"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: instructorUserId,
        course_id: await getCourseIdByName("Product Management Fundamentals"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: secondInstructorUserId,
        course_id: await getCourseIdByName("Web Development Microservice: Website Kelas Online"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: instructorUserId,
        course_id: await getCourseIdByName("Full-Stack Web Developer"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: instructorUserId,
        course_id: await getCourseIdByName("SwiftUI & iOS Engineer: The Complete App Development Bootcamp"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: instructorUserId,
        course_id: await getCourseIdByName("SQL for Beginners: Learn SQL using MySQL and Database Design"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: secondInstructorUserId,
        course_id: await getCourseIdByName("Full-Stack Web Developer"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: secondInstructorUserId,
        course_id: await getCourseIdByName("Flutter Developer: Provider State Management"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: secondInstructorUserId,
        course_id: await getCourseIdByName("Learn Flutter & Adobe XD: Build a Complete Mobile App"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Course_instructors", dataCourseInstructor, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Course_instructors", null, {});
  },
};
