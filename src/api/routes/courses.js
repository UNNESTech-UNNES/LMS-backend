import { Router } from "express";
import * as Types from "../../libs/types/common.js";
import * as courseController from "../controllers/course.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as uploadMiddleware from "../middlewares/upload.js";
import * as validationMiddleware from "../middlewares/validation.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use("/courses", router);

  router.get("/", authMiddleware.isLoggedIn, courseController.getCourses);
  router.get("/me", authMiddleware.isAuthorized, courseController.getUserCourses);
  router.get("/:id", authMiddleware.isLoggedIn, courseController.getCourseById);
  router.post("/", authMiddleware.isAuthorized, authMiddleware.isAdmin, uploadMiddleware.parseImage, uploadMiddleware.uploadCloudinary, courseController.createCourse);
  router.put("/:id", authMiddleware.isAuthorized, authMiddleware.isAdmin, validationMiddleware.isCourseExists, uploadMiddleware.parseImage, uploadMiddleware.uploadCloudinary, courseController.updateCourse);
  router.delete("/:id", authMiddleware.isAuthorized, authMiddleware.isAdmin, validationMiddleware.isCourseExists, courseController.destroyCourse);

  router.get("/preview-data/:id", authMiddleware.isAuthorized, authMiddleware.isAdmin, validationMiddleware.isCourseExists, courseController.getCoursePreviewData);
};
