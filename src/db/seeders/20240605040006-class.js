"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuid } = await import("uuid");
    const { getCategoryIdByName, getInstructorUserId, getSecondInstructorUserId } = await import("../../libs/seed.js");
    const data = [
      {
        id: uuid(),
        name: "Algorithm and Data Structure Class",
        description: "Master the fundamentals of algorithms and data structures to design efficient and scalable software solutions.",
        schedule: "Monday, Wednesday, Friday 10:00 - 12:00",
        quota: 30,
        duration: 6,
        registration_deadline: new Date("2024-08-30"),
        image: "https://www.example.com/algorithm.jpg",
        instructor_id: await getInstructorUserId(),
        course_category_id: await getCategoryIdByName("Algorithm and Data Structure"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Management System Information Class",
        description: "Learn how to design, implement, and manage information systems for organizations.",
        schedule: "Tuesday, Thursday 13:00 - 15:00",
        quota: 30,
        duration: 6,
        registration_deadline: new Date("2024-08-30"),
        image: "https://www.example.com/information-system.jpg",
        instructor_id: await getSecondInstructorUserId(),
        course_category_id: await getCategoryIdByName("Sistem Informasi Manajemen"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Introduction to Machine Learning Class",
        description: "Get started with machine learning and learn how to build and train models using TensorFlow.",
        schedule: "Saturday, Sunday 08:00 - 10:00",
        quota: 30,
        duration: 6,
        registration_deadline: new Date("2024-08-30"),
        image: "https://www.example.com/machine-learning.jpg",
        instructor_id: await getInstructorUserId(),
        course_category_id: await getCategoryIdByName("Machine Learning"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Advance Statistic Class",
        description: "Deepen your understanding of statistics and apply advanced techniques to data analysis.",
        schedule: "Monday, Wednesday, Friday 15:00 - 17:00",
        quota: 30,
        duration: 6,
        registration_deadline: new Date("2024-08-30"),
        image: "https://www.example.com/statistic.jpg",
        instructor_id: await getSecondInstructorUserId(),
        course_category_id: await getCategoryIdByName("Statistics"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Web Development",
        description: "Build dynamic web applications using the powerful Laravel PHP framework.",
        schedule: "Tuesday, Thursday 10:00 - 12:00",
        quota: 30,
        duration: 6,
        registration_deadline: new Date("2024-08-30"),
        image: "https://www.example.com/laravel.jpg",
        instructor_id: await getInstructorUserId(),
        course_category_id: await getCategoryIdByName("Web Development"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Information System Security Class",
        description: "Gain the knowledge and skills to protect information systems from cyber threats.",
        schedule: "Monday, Wednesday, Friday 13:00 - 15:00",
        quota: 30,
        duration: 6,
        registration_deadline: new Date("2024-08-30"),
        image: "https://www.example.com/security.jpg",
        instructor_id: await getSecondInstructorUserId(),
        course_category_id: await getCategoryIdByName("Cybersecurity"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Classes", data, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Classes", null, {});
  },
};
