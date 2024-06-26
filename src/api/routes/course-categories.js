import { Router } from "express";
import * as courseCategoryController from "../controllers/course-categories.js";
import * as Types from "../../libs/types/common.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */

export default (app) => {
  const router = Router();

  app.use("/course-categories", router);

  router.get("/", courseCategoryController.getCourseCategories);
  router.post("/", courseCategoryController.createCourseCategory);
  router.delete("/:id", courseCategoryController.deleteCourseCategory);
};
