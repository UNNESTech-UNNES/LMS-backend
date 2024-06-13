import { Router } from "express";
import * as Types from "../../libs/types/common.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as userController from "../controllers/user.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use("/instructor", router);

  router.get("/", userController.getAllInstructor);
};
