import { Router } from "express";
import * as authController from "../controllers/auth.js";
import * as Types from "../../libs/types/common.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */

export default (app) => {
  const router = Router();

  app.use("/auth", router);

  router.post("/register", authController.register);
  router.post("/login", authController.login);
};
