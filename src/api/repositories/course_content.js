import Sequelize from "sequelize";
import { sequelize, CourseContent } from "../models/index.js";
import * as Models from "../models/course_content.js";
import { Op } from "sequelize";

/** @param {Models.CourseContentAttributes} payload */
export function createCourseContent(payload) {
  return CourseContent.create(payload);
}

/**
 * @param {Models.CourseContentAttributes} payload
 * @param {string} contentId
 */
export function updateCourseContent(payload, contentId) {
  return CourseContent.update(payload, {
    where: { id: contentId },
  });
}

/** @param {string} id */
export function getContentById(id) {
  return CourseContent.findOne({
    where: { id },
  });
}

/** @param {string} materialId */
export function getContentsByMaterialId(materialId) {
  return CourseContent.findAll({
    where: { course_material_id: materialId },
    attributes: ["id"],
  });
}

/** @param {string[]} ids */
export function destroyContents(ids) {
  return CourseContent.destroy({
    where: { id: { [Op.in]: ids } },
  });
}
