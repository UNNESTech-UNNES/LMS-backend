import * as courseCategoriesService from "../services/course-categories.js";
import * as Types from "../../libs/types/common.js";
import { ApplicationError } from "../../libs/error.js";

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function getCourseCategories(_req, res) {
  try {
    const data = await courseCategoriesService.getCourseCategories();

    if (!data) throw new ApplicationError("No course categories found", 404);
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function createCourseCategory(req, res) {
  try {
    const payload = req.body;
    const data = await courseCategoriesService.createCourseCategory(payload);

    res.status(201).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.Controller}
 * @returns {Promise<void>}
 */
export async function deleteCourseCategory(req, res) {
  const { id } = req.params;
  try {
    await courseCategoriesService.deleteCourseCategory(id);
    res.status(204).end();
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
