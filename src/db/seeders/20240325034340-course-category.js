/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { isTableHasRecords, generateRandomCourseCategory } = await import("../../libs/seed.js");

    if (await isTableHasRecords("Course_categories", queryInterface)) return;

    const courseCategories = [
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
        name: "Algorithm and Data Structure",
        image: "https://source.unsplash.com/random",
        description: "Memahami dan menguasai Algoritma dan Struktur Data yang efisien dan scalable.",
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0852",
        name: "Sistem Informasi Manajemen",
        image: "https://source.unsplash.com/random",
        description: "Belajar merancang, mengimplementasikan, dan mengelola sistem informasi untuk organisasi.",
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0853",
        name: "Machine Learning",
        image: "https://source.unsplash.com/random",
        description: "Memulai belajar Machine Learning dan membangun serta melatih model menggunakan TensorFlow.",
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0854",
        name: "Statistics",
        image: "https://source.unsplash.com/random",
        description: "Memperdalam pemahaman statistik dan menerapkan teknik-teknik lanjutan untuk analisis data.",
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0855",
        name: "Web Development",
        image: "https://source.unsplash.com/random",
        description: "Membangun aplikasi web dinamis menggunakan framework PHP Laravel yang powerful.",
      },
      {
        id: "d290f1ee-6c54-4b01-90e6-d701748f0856",
        name: "Cybersecurity",
        image: "https://source.unsplash.com/random",
        description: "Mendapatkan pengetahuan dan keterampilan untuk melindungi sistem informasi dari ancaman siber.",
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
