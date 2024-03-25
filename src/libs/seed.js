import { faker } from "@faker-js/faker";
import { CourseCategory } from "../api/models/index.js";

export function generateRandomCourseCategory() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    image: faker.image.urlLoremFlickr({ category: "animals" }),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  };
}

/**
 * @param {string} tableName
 * @param {import('sequelize').QueryInterface} queryInterface
 */
export async function isTableHasRecords(tableName, queryInterface) {
  // @ts-ignore
  return queryInterface.select(null, tableName, { limit: 1 }).then((data) => data.length === 1);
}
