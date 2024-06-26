"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuidv4 } = require("uuid");
    const { getNormalUserId, getAllCourseMaterialIdsByCourseChapterName } = await import("./../../libs/seed.js");
    const user_id = await getNormalUserId();
    const materialsOnChapter1 = await getAllCourseMaterialIdsByCourseChapterName("Pengenalan Algoritma dan Pemrograman");
    const materialsOnChapter2 = await getAllCourseMaterialIdsByCourseChapterName("Struktur Data");
    const materialsOnChapter3 = await getAllCourseMaterialIdsByCourseChapterName("Latihan Menerapkan Algoritma dalam Pemrograman");

    const dataSample = [...materialsOnChapter1, ...materialsOnChapter2, ...materialsOnChapter3].map((materialId) => ({
      id: uuidv4(),
      completed: false,
      percentage: 0,
      user_id: user_id,
      course_material_id: materialId,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("Course_material_completions", dataSample, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Course_material_completions", null, {});
  },
};
