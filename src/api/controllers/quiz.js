import * as Types from "../../libs/types/common.js";
import * as quizService from "../services/quiz.js";
import { isLoggedIn, isAuthorized } from "../middlewares/auth.js";
import { ApplicationError } from "../../libs/error.js";

/**
 * @type {Types.Controller<typeof isLoggedIn>}
 * @returns {Promise<void>}
 */
export async function getQuizzes(req, res) {
  try {
    const { id } = req.params;
    const quiz = await quizService.getQuizById(id);
    res.status(200).json(quiz);
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.AuthorizedController}
 */
export async function submitQuiz(req, res) {
  try {
    const { id } = req.params;
    const user_id = res.locals.user.id;
    const { attempt } = req.body;
    await quizService.submitQuiz(id, user_id, attempt);
    res.status(200).json({ message: "Quiz submitted successfully" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.AuthorizedController}
 */
export async function getHistoryByQuizId(req, res) {
  try {
    const { id } = req.params;
    const user_id = res.locals.user.id;
    const history = await quizService.getHistory(id, user_id);
    res.status(200).json(history);
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
