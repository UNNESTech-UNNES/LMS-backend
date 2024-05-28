import { Router } from "express";
import * as Types from "../../libs/types/common.js";
import * as authMiddleware from "../middlewares/auth.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use("/user", router);

  router.get(
    "/",
    authMiddleware.isAuthorized
    // userController.getUser
  );
};
