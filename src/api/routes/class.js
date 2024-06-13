import { Router } from "express";
import * as authMiddleware from "../middlewares/auth.js";
import * as validationMiddleware from "../middlewares/validation.js";
import * as classController from "../controllers/classes.js";
import * as Types from "../../libs/types/common.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */

export default (app) => {
  const router = Router();

  app.use("/class", router);

  router.get("/", classController.getClasses);
  router.get("/me", authMiddleware.isAuthorized, classController.getUserClasses);
  router.get("/:id", validationMiddleware.isClassExists, classController.getClassById);
  router.post("/", authMiddleware.isAuthorized, authMiddleware.isAdmin, classController.createClass);
  router.put("/:id", authMiddleware.isAuthorized, authMiddleware.isAdmin, validationMiddleware.isClassExists, classController.updateClass);
  router.delete("/:id", authMiddleware.isAuthorized, authMiddleware.isAdmin, validationMiddleware.isClassExists, classController.deleteClass);

  router.post("/register", authMiddleware.isAuthorized, classController.register);
  router.get("/status/pending", authMiddleware.isAuthorized, authMiddleware.isAdmin, classController.getAllUnActiveClassesStatus);
  router.put("/status/activate", authMiddleware.isAuthorized, authMiddleware.isAdmin, classController.activateClassStatus);
};
