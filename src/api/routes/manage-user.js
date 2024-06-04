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

  app.use("/manage-user", router);

  // SUPERADMIN AUTHORITIES
  router.get("/", authMiddleware.isAuthorized, authMiddleware.isSuperAdmin, userController.getAllUsers);
  router.post("/deactive/:id", authMiddleware.isAuthorized, authMiddleware.isSuperAdmin, userController.deactiveUser);
  router.delete("/:id", authMiddleware.isAuthorized, authMiddleware.isSuperAdmin, userController.deleteUser);

  // ADMIN AUTHORITIES
  router.get("/admin/users", authMiddleware.isAuthorized, authMiddleware.isAdmin, userController.getAllStudentsAndInstructor);
};
