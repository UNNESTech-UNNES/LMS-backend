"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { getInstructorUserId, getSecondInstructorUserId, getCourseIdByName, isTableHasRecords } = await import("../../libs/seed.js");

    if (await isTableHasRecords("Course_instructors", queryInterface)) return;
    const instructorUserId = await getInstructorUserId();
    const secondInstructorUserId = await getSecondInstructorUserId();

    const dataCourse = [
      { name: "Computational Thinking" },
      { name: "Pemrograman Dasar dengan C++" },
      { name: "Struktur Data dan Algoritma" },
      { name: "Pengenalan Sistem Informasi" },
      { name: "Merancang Arsitektur Sistem Informasi" },
      { name: "Sistem Informasi Manajemen dalam Industri" },
      { name: "Pengenalan Machine Learning" },
      { name: "Pemrograman Python untuk Machine Learning" },
      { name: "Machine Learning dengan TensorFlow" },
      { name: "Statistika Dasar" },
      { name: "Statistika Inferensial" },
      { name: "Statistika Deskriptif" },
      { name: "Statistika Probabilitas" },
      { name: "Pengenalan Web Development dengan HTML dan CSS" },
      { name: "Pemrograman Web dengan JavaScript" },
      { name: "Pemrograman Web dengan React" },
      { name: "Pemrograman Web dengan Node.js" },
      { name: "Studi Kasus: Membuat Aplikasi Pemesanan Tiket Kereta Api" },
      { name: "Pengenalan Cybersecurity" },
      { name: "Pengenalan Kriptografi" },
      { name: "Pengenalan Ethical Hacking" },
      { name: "Pengenalan Digital Forensics" },
      { name: "Penetration Testing" },
      { name: "Keamanan Jaringan" },
    ];

    const dataCourseInstructor = await Promise.all(
      dataCourse.map(async (course, index) => {
        const courseId = /** @type {string} */ (await getCourseIdByName(course.name));
        return {
          course_id: courseId,
          user_id: index % 2 === 0 ? instructorUserId : secondInstructorUserId,
          created_at: new Date(),
          updated_at: new Date(),
        };
      })
    );
    await queryInterface.bulkInsert("Course_instructors", dataCourseInstructor, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Course_instructors", null, {});
  },
};
