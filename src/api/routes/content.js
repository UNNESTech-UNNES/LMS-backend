import { Router } from "express";
import * as Types from "../../libs/types/common.js";
import * as contentController from "../controllers/content.js";
import * as authMiddleware from "../middlewares/auth.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use("/content", router);

  router.get("/:id", authMiddleware.isLoggedIn, contentController.getContents);
};
