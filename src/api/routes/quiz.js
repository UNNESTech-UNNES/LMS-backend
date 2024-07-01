import { Router } from "express";
import * as Types from "../../libs/types/common.js";
import * as quizController from "../controllers/quiz.js";
import * as authMiddleware from "../middlewares/auth.js";

/**
 * @type {Types.Route}
 * @returns {void}
 */
export default (app) => {
  const router = Router();

  app.use("/quiz", router);

  router.get("/:id", authMiddleware.isLoggedIn, quizController.getQuizzes);
  router.post("/submit/:id", authMiddleware.isAuthorized, quizController.submitQuiz);
  router.get("/history/:id", authMiddleware.isAuthorized, quizController.getHistoryByQuizId);
};
