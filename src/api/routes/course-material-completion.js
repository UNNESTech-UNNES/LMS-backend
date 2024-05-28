import { Router } from "express";
import * as Types from "../../libs/types/common.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as validationMiddleware from "../middlewares/validation.js";
import * as courseMaterialCompletionController from "../controllers/course-material-completion.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use("/course-material-completion", router);

  router.put("/:id", authMiddleware.isAuthorized, validationMiddleware.isCourseMaterialCompletionExists, courseMaterialCompletionController.updateCourseMaterialCompletion);
};
