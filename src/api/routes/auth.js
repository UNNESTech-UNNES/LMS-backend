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

  router.post("/login", authController.login);

  router.post("/register", authController.register);
  router.post("/student/register", authController.registerStudent);
  router.post("/instructor/register", authController.registerInstructor);
  router.post("/admin/register", authController.registerAdmin);

  router.post("/otp", authController.sendOtpRequest);
  router.post("/otp/verify", authController.verifyOtp);

  router.get("/password-reset/:token", authController.checkLinkToResetPassword);
  router.post("/password-reset", authController.sendVerifyToResetPassword);
  router.put("/password-reset", authController.changePassword);
};
