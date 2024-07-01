import { faker } from "@faker-js/faker";
import { User, Class, Course, CourseCategory, CourseChapter, CourseMaterial, Quiz } from "../api/models/index.js";

export function generateRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(["ADMIN", "INSTRUCTOR", "STUDENT", "GENERAL"]),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
    phone_number: faker.string.numeric("+628##########"),
  };
}

export function generateRandomCourseCategory() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    image: faker.image.urlLoremFlickr({ category: "animals" }),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  };
}

export function generateRandomCourse() {
  return {
    name: faker.commerce.product(),
    code: faker.string.alpha(8),
    price: faker.number.int({ min: 10_000, max: 1_000_000 }),
    image: faker.image.urlLoremFlickr({ category: "animals" }),
    premium: faker.datatype.boolean(),
    telegram: faker.internet.url(),
    description: faker.commerce.productDescription(),
    target_audience: Array.from({ length: 3 }, () => faker.commerce.productDescription()),
    author_id: faker.string.uuid(),
    course_category_id: faker.string.uuid(),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  };
}

export function generateRandomCourseChapter() {
  return {
    duration: faker.number.int({ min: 1, max: 60 }),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
  };
}

export function generateRandomCourseMaterial() {
  return {
    name: faker.commerce.product(),
    is_public: faker.datatype.boolean(),
    order_index: faker.number.int({ min: 1, max: 10 }),
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

/** @param {string} name */
export async function getCategoryIdByName(name) {
  return CourseCategory.findOne({
    where: { name },
  }).then((model) => model?.dataValues.id);
}

/** @param {string} name */
export async function getClassIdByName(name) {
  return Class.findOne({
    where: { name },
  }).then((model) => model?.dataValues.id);
}

/** @param {string} name */
export async function getCourseIdByName(name) {
  return Course.findOne({
    where: { name },
  }).then((model) => model?.dataValues.id);
}

/** @param {string} name */
export async function getCourseIdsByCategoryName(name) {
  return Course.findAll({
    where: { course_category_id: await getCategoryIdByName(name) },
  }).then((models) => models.map((model) => model.dataValues.id));
}

/** @param {string} name */
export async function getCourseChapterIdByName(name) {
  return CourseChapter.findOne({
    where: { name },
  }).then((model) => model?.dataValues.id);
}

/** @param {string} name */
export async function getAllCourseMaterialIdsByCourseChapterName(name) {
  return CourseMaterial.findAll({
    where: { course_chapter_id: await getCourseChapterIdByName(name) },
  }).then((models) => models.map((model) => model.dataValues.id));
}

/** @param {string} title */
export async function getQuizIdByTitle(title) {
  return Quiz.findOne({
    where: { title },
  }).then((model) => model?.dataValues.id);
}

export async function getAdminUserId() {
  return User.findOne({
    where: { role: "ADMIN", email: "luthfiyantooo@gmail.com" },
  }).then((model) => model?.dataValues.id);
}

export async function getInstructorUserId() {
  return User.findOne({
    where: { role: "INSTRUCTOR", email: "lulufaridaalfani73@gmail.com" },
  }).then((model) => model?.dataValues.id);
}

export async function getSecondInstructorUserId() {
  return User.findOne({
    where: { role: "INSTRUCTOR", email: "simanjuntak101001@gmail.com" },
  }).then((model) => model?.dataValues.id);
}

export async function getNormalUserId() {
  return User.findOne({
    where: { role: "USER", email: "iyandoang219@gmail.com" },
  }).then((model) => model?.dataValues.id);
}
