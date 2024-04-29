import { Router } from "express";
import * as Types from "../../libs/types/common.js";
import * as courseController from "../controllers/course.js";
import * as authMiddleware from "../middlewares/auth.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use("/courses", router);

  router.get("/", authMiddleware.isLoggedIn, courseController.getCourses);
  router.post("/", authMiddleware.isAuthorized, authMiddleware.isAdmin, courseController.createCourse);
  router.put("/:id", authMiddleware.isAuthorized, authMiddleware.isAdmin, courseController.updateCourse); // still on development, wait the update
  router.delete("/:id", courseController.destroyCourse);
};
