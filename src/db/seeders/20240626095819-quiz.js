"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuid } = await import("uuid");
    const { getCourseChapterIdByName } = await import("../../libs/seed.js");

    const chapter1 = await getCourseChapterIdByName("Pengenalan Algoritma dan Pemrograman");
    const chapter2 = await getCourseChapterIdByName("Struktur Data");
    const chapter3 = await getCourseChapterIdByName("Latihan Menerapkan Algoritma dalam Pemrograman");

    const dataSample = [
      {
        id: uuid(),
        title: "Quiz Pengenalan Algoritma",
        description: "Quiz ini berisi soal-soal yang berkaitan dengan pengenalan algoritma",
        is_public: true,
        order_index: 1,
        retake: true,
        course_chapter_id: chapter1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        title: "Quiz Struktur Data",
        description: "Quiz ini berisi soal-soal yang berkaitan dengan struktur data",
        is_public: true,
        order_index: 1,
        retake: true,
        course_chapter_id: chapter2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        title: "Quiz Algoritma dalam Pemrograman",
        description: "Quiz ini berisi soal-soal yang berkaitan dengan algoritma dalam pemrograman",
        is_public: true,
        order_index: 1,
        retake: true,
        course_chapter_id: chapter3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        title: "Penilaian Algoritma Pemrograman dan Struktur Data",
        description: "Test ini bertujuan untuk menilai pemahaman mahasiswa terhadap algoritma pemrograman dan struktur data",
        is_public: true,
        order_index: 2,
        retake: false,
        course_chapter_id: chapter3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Quizzes", dataSample, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Quizzes", null, {});
  },
};
