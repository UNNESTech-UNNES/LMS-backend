"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuidv4 } = require("uuid");
    const { faker } = require("@faker-js/faker");
    const { getAllCourseMaterialIdsByCourseChapterName } = await import("./../../libs/seed.js");

    const materialsOnChapter1 = await getAllCourseMaterialIdsByCourseChapterName("Pengenalan Algoritma dan Pemrograman");
    const materialsOnChapter2 = await getAllCourseMaterialIdsByCourseChapterName("Struktur Data");
    const materialsOnChapter3 = await getAllCourseMaterialIdsByCourseChapterName("Latihan Menerapkan Algoritma dalam Pemrograman");

    const contentSample1 = [...materialsOnChapter1, ...materialsOnChapter2, ...materialsOnChapter3].map((materialId) => ({
      id: uuidv4(),
      label: faker.lorem.text(),
      order_index: 1,
      type: "text",
      url: "",
      heading: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      course_material_id: materialId,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    const contentSample2 = [...materialsOnChapter1, ...materialsOnChapter2, ...materialsOnChapter3].map((materialId) => ({
      id: uuidv4(),
      label: faker.lorem.text(),
      order_index: 2,
      type: "video",
      url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      heading: faker.lorem.sentence(),
      content: faker.lorem.sentence(),
      course_material_id: materialId,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("Course_contents", [...contentSample1, ...contentSample2], {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Course_contents", null, {});
  },
};
