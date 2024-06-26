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
        name: "Pengertian Algoritma",
        order_index: 1,
        is_public: true,
        course_chapter_id: chapter1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Sejarah Algoritma",
        order_index: 2,
        is_public: true,
        course_chapter_id: chapter1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Flowchart",
        order_index: 3,
        is_public: true,
        course_chapter_id: chapter1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Pseudocode",
        order_index: 4,
        is_public: true,
        course_chapter_id: chapter1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Pengenalan Pemrograman",
        order_index: 5,
        is_public: true,
        course_chapter_id: chapter1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Pengertian Data",
        order_index: 1,
        is_public: true,
        course_chapter_id: chapter2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Struktur Data",
        order_index: 2,
        is_public: true,
        course_chapter_id: chapter2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Karakter",
        order_index: 3,
        is_public: true,
        course_chapter_id: chapter2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Numerik",
        order_index: 4,
        is_public: true,
        course_chapter_id: chapter2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Boolean",
        order_index: 5,
        is_public: true,
        course_chapter_id: chapter2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Array dan Object",
        order_index: 6,
        is_public: true,
        course_chapter_id: chapter2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Percabangan",
        order_index: 1,
        is_public: true,
        course_chapter_id: chapter3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Perulangan",
        order_index: 2,
        is_public: true,
        course_chapter_id: chapter3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Fungsi dan Prosedur",
        order_index: 3,
        is_public: true,
        course_chapter_id: chapter3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Rekursif",
        order_index: 4,
        is_public: true,
        course_chapter_id: chapter3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: "Stack dan Queue",
        order_index: 5,
        is_public: true,
        course_chapter_id: chapter3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Course_materials", dataSample, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Course_materials", null, {});
  },
};
