"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const { isTableHasRecords, generateRandomUser } = await import("../../libs/seed.js");

    if (await isTableHasRecords("Users", queryInterface)) return;

    const superAdminUser = {
      ...generateRandomUser(),
      id: "b3d4d5c1-0dbf-4a85-adec-5c92ca80acce",
      name: "Super Admin",
      image: null,
      role: "SUPER_ADMIN",
      email: "luthfiyanto1425@gmail.com",
      verified: true,
      password: "$2b$10$JqfYeXyHwsSgZUi7zG9lUuyx.KeO24NEmmDq5aRCsCekSWw8uzqMK", // luthfiyanto
      phone_number: "+6282313735701",
    };

    const adminUser = {
      ...generateRandomUser(),
      id: "643c5965-6690-4b15-9721-80dc6d95a762",
      name: "Luthfiyanto",
      image: null,
      role: "ADMIN",
      email: "luthfiyantooo@gmail.com",
      verified: true,
      password: "$2b$10$d8dY9IGinvY7DkI.tmmSz.GLU0DVP3Ngb0z/jn9jC5uQF5FB7w02C", //luthfiey
      phone_number: "+6282313735700",
    };

    const instructorUser = {
      ...generateRandomUser(),
      id: "12ab32a3-d242-40be-8426-6a1b8d57700f",
      name: "Lulu Farida Alfani",
      image: null,
      role: "INSTRUCTOR",
      email: "lulufaridaalfani73@gmail.com",
      verified: true,
      password: "$2b$10$F1bHlqYYlGNIzOUbGn.T0uMkazcpiKr71L9fbsBPHYiR6RYQSWtV.", // lulufarida
      phone_number: "+6285888832098",
    };

    const instructor2User = {
      ...generateRandomUser(),
      id: "59a6b19e-bf8c-452c-9b6a-62a0246ba073",
      name: "Robert Simanjuntak",
      image: null,
      role: "INSTRUCTOR",
      email: "simanjuntak101001@gmail.com",
      verified: true,
      password: "$2b$10$dnt/AESRTKIRy9l0lJqOT.TzkNHJb7/6kh1JgO.4HCwG9Ra1.PZZC", //simanjuntak
      phone_number: "+6285888876298",
    };

    const normalUser = {
      ...generateRandomUser,
      id: "0dbf6cae-b3d4-4a85-adec-5c92ca80acce",
      name: "Riyandi Novan",
      image: null,
      role: "USER",
      email: "iyandoang219@gmail.com",
      verified: true,
      password: "$2b$10$paYDiJnYgxJfCF3dETJ4e.hwjSi7OzXgbuxOAw5Gjci8GrSpvIHBa", // iyaniyan
      phone_number: "+6285601617292",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const seedUsers = [superAdminUser, adminUser, instructorUser, instructor2User, normalUser];

    return queryInterface.bulkInsert("Users", seedUsers);
  },

  async down(queryInterface, _Sequelize) {
    // @ts-ignore
    return queryInterface.bulkDelete("Users", null, {});
  },
};
