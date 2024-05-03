/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { isTableHasRecords, generateRandomCourseCategory } = await import("../../libs/seed.js");

    if (await isTableHasRecords("Course_categories", queryInterface)) return;

    const courseCategories = [
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        name: "Sistem Informasi",
        image: "https://source.unsplash.com/random",
        description: "Deskripsi Sistem Informasi",
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
        name: "Teknik Informatika",
        image: "https://source.unsplash.com/random",
        description: "Deskripsi Teknik Informatika",
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0853",
        name: "Teknik Elektro",
        image: "https://source.unsplash.com/random",
        description: "Deskripsi Teknik Elektro",
      },
    ];

    const seedCourseCategories = courseCategories.map((category) => ({
      ...generateRandomCourseCategory(),
      ...category,
    }));

    return queryInterface.bulkInsert("Course_categories", seedCourseCategories);
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    return queryInterface.bulkDelete("Course_categories", null, {});
  },
};
